//const Connection = __mongoClient;
const objectId = require('./mongo.js').objectId;

const NounProject = require("the-noun-project")
const translate = require('google-translate-api');
const fetch = require('node-fetch');
var base64 = require("base-64");


let etiqueta = {}

etiqueta.ObtenerTodos = callback => 
{
    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $unwind: '$traducciones'
        }, {
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        }, {
            $unwind: '$idioma'
        }, {
            $group: {
                _id: '$_id',
                traducciones: {
                    $push: {
                        idioma: '$idioma',
                        valor: '$traducciones.valor'
                    }
                }
            }
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

etiqueta.ObtenerConIconos = (_id, callback) => 
{
    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $match: { _id : objectId(_id) }
        },{
            $unwind: '$traducciones'
        }, {
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        }, {
            $unwind: '$idioma',
        }, {
            $group: {
                _id: '$_id',
                traducciones: {
                    $push: {
                        idioma: '$idioma',
                        valor: '$traducciones.valor'
                    }
                },
                iconos:  {
                    $first: '$iconos'
                }

            }
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

etiqueta.ObtenerPorIcono = (id, callback) => 
{
    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $match: {
                'iconos': +id
            }
        }, {
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        }, {
            $unwind: '$idioma'
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

etiqueta.Guardar = (etiquetaData, callback) => 
{
    etiquetaData.traducciones.forEach((traduccion, key) => {
        etiquetaData.traducciones[key].idioma = objectId(traduccion.idioma);
    })

    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.insertOne(etiquetaData, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'insertId': doc.insertedId
            });
        });
    })
}

etiqueta.Actualizar = (_id, etiquetaData, callback) => 
{
    delete etiquetaData._id;

    etiquetaData.traducciones.forEach((el, key) => {
        delete etiquetaData.traducciones[key].codigo;
        delete etiquetaData.traducciones[key].nombre;

        etiquetaData.traducciones[key]._id = objectId(etiquetaData.traducciones[key]._id);
    })

    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({
            '_id': objectId(_id)
        }, {
            $set: {
                traducciones: etiquetaData.traducciones
            }
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.AsignarIconos = (_id, iconos, callback) => 
{
    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({
            '_id': objectId(_id)
        }, {
            $addToSet: {
                'iconos': {
                    $each: iconos
                }
            }
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.DesasignarIcono = (_id, icono, callback) => 
{
    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({
            '_id': objectId(_id)
        }, {
            $pull: {
                'iconos': {
                    $in: icono
                }
            }
        }, {
            multi: true,
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.Borrar = (_id, callback) => 
{
    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndDelete({
            '_id': objectId(_id)
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.Analizar = (tags, callback) => 
{
    let iconos = [];

    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([ {
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        },{
            $unwind: '$traducciones'
        }, {
            $match: {
                'traducciones.valor': {
                    '$in': tags
                }
            }
        }, {
            $addFields: {
                valor: '$traducciones.valor'
            }
        }, {
            $project: {
                traducciones: false
            }
        }]).toArray((err, docs) => {
            if (err) throw err;

            else {

                docs.forEach(doc => doc.iconos.forEach(i => iconos.push(i)))

                Array.prototype.sortByFrequency = function() {
                    return function () {
                        var frequency = {};
                    
                        this.forEach(function(value) { frequency[value] = 0; });
                    
                        var uniques = this.filter(function(value) {
                            return ++frequency[value] == 1;
                        });
                    
                        return uniques.sort(function(a, b) {
                            return frequency[b] - frequency[a];
                        });
                    }
                }();

                callback(null, iconos.sortByFrequency());
            }
        })
    })
}

etiqueta.AnalizarNOUN = (lang, tags, callback) => 
{
    let tagsResponse = { noExistentes: [], ingles: [] };

    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $unwind: '$traducciones'
        }, {
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        }, {
            $unwind: '$idioma'
        }, {
            $addFields: {
                'traducciones.idioma': '$idioma.codigo'
            }
        }, {
            $group: {
                _id: '$_id',
                traducciones: {
                    $addToSet: {
                        idioma: '$idioma.codigo',
                        valor: '$traducciones.valor'
                    }
                }
            }
        }, {
            $match: {
                'traducciones': {
                    '$elemMatch': {
                        'idioma': 'es',
                        'valor': {
                            '$in': tags
                        }
                    }
                }
            }
        }, {
            $project: {
                iconos: false,
                idioma: false
            }
        }]).toArray((err, docs) => {
            if (err) throw err;

            else {

                formatedDocs = {}

                docs.forEach(doc => {
                    doc.traducciones.forEach(tra => {
                        if (formatedDocs[tra.idioma] == undefined) formatedDocs[tra.idioma] = [];
                        formatedDocs[tra.idioma].push(tra.valor);
                    })                    
                });

                tags.forEach(tag => {
                    if (formatedDocs[lang].indexOf(tag) == -1) {
                        tagsResponse.noExistentes.push(tag);
                    }
                });

                tagsResponse.ingles = formatedDocs.en;
                
                callback(null, tagsResponse);

                /*
                Array.prototype.sortByFrequency = function() {
                    return function () {
                        var frequency = {};
                    
                        this.forEach(function(value) { frequency[value] = 0; });
                    
                        var uniques = this.filter(function(value) {
                            return ++frequency[value] == 1;
                        });
                    
                        return uniques.sort(function(a, b) {
                            return frequency[b] - frequency[a];
                        });
                    }
                }();
                */
            }
        })
    })
}

etiqueta.TraducirGuardar = async (tags, lang, callback) => {

    let tagsTraducidas = [];

    for (let tag of tags) {
        
        let trad = {}

        try {
            trad.en = await translate(tag, {from: lang, to: 'en'});
            trad.es = await translate(tag, {from: lang, to: 'es'});
            trad.pr = await translate(tag, {from: lang, to: 'pt'});
        } catch (error) {
            callback(error);
            return
        }
        
        if (trad[lang].from.language.iso == lang) {

            if ( (trad.en.text === trad.es.text && trad.en.text === trad.pr.text) === false ) {

                tagsTraducidas.push({ en: trad.en.text, es: trad.es.text, pr: trad.pr.text });

            }

        }

    }
    
    callback(null, tagsTraducidas);
}

etiqueta.BuscarIconosNOUN = async (tags, ids, callback) => {

    let Nproject = new NounProject({
        key: "049d89ea99f6415c837e7f0de9040b96",
        secret: "58dd191936204d42885a5ab4de7a6663"
    })

    let icons = [], salto = 0;

    while (icons.length < 12) {

        console.log('vuelta', 'iconos', icons.length)

        let promises = [];

        tags.map((tag) => {
            
            const promise = new Promise((resolve) => {

                Nproject.getIconsByTerm(tag, { limit: 50, offset: salto, limit_to_public_domain: 0}, (err, data) => {
                    
                    if (!err && data && data.icons.length) {

                        resolve({data: data.icons})
                        
                    } else {

                        resolve(false)
                        
                    }
                    
                });
                
            });

            salto = salto + 50;

            promises.push(promise)
        });


        try {
            
            let iconsCollections = await Promise.all(promises);

            iconsCollections.forEach(coll => {

                coll.data.forEach(icon => {

                    if (icon.icon_url && ids.indexOf(icon.id) == -1) {
                        ids.push(icon.id);
                        icons.push(icon);
                    }
                })
            });

        } catch (error) {

            callback(error);
            return
        }
    }

    callback(null, icons);
}

etiqueta.TransformarSvg = async (iconos , callback) => {

    let promises = [];

    iconos.forEach((icono) => {

        let promise = fetch(icono.icon_url).then(res => {
            return res.text(); 
        }).then(body => {
            return body;
        });

        promises.push(promise);
    });

    try {
            
        let svgCollection = await Promise.all(promises);

        svgCollection.forEach( (svg, i) => {

			var str = "<svg" + svg.split("<svg")[1];
            var dd = str.replace(/fill=/gi, "nofill=");
            console.log(dd);

            iconos[i] = { idElemento : iconos[i].id, svg: base64.encode(dd) };
        });

    } catch (error) {
        callback(error);
        return
    }


    callback(null, iconos)
}


module.exports = etiqueta;