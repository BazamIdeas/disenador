//const Connection = __mongoClient;
const objectId = require('./mongo.js').objectId;
const fetch = require("node-fetch");
const NounProject = require("the-noun-project")
const translate = require('google-translate-api');
var base64 = require("base-64");


let etiqueta = {}

etiqueta.ObtenerTodos = callback => {
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


etiqueta.ObtenerTodosPorPalabra = (search, lang, callback) => {

    var regex = new RegExp('^' + search);

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
            $match: {
                "idioma.codigo": lang,
                "traducciones.valor": { $regex: regex }
            }
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

etiqueta.ObtenerTodoDeIdioma = (lang, callback) => {
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
            $match: {
                "idioma.codigo": lang
            }
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

etiqueta.ObtenerConIconos = (_id, callback) => {
    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $match: { _id: objectId(_id) }
        }, {
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
                iconos: {
                    $first: '$iconos'
                }

            }
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

etiqueta.ObtenerPorIcono = (id, callback) => {
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

etiqueta.Guardar = (etiquetaData, callback) => {
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

etiqueta.Actualizar = (_id, etiquetaData, callback) => {
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

etiqueta.AsignarIconos = (_id, iconos, callback) => {
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

etiqueta.AsignarLogos = (_ids, idLogo, callback) => {

    _ids.forEach((e, i) => {
        _ids[i] = objectId(e);
    })

    __mongoClient(db => {
        const collection = db.collection('logos');
        collection.findOneAndUpdate({
            'idLogo': idLogo
        }, {
                $addToSet: {
                    'etiquetas': {
                        $each: _ids
                    }
                }
            }, (err, doc) => {
                if (err) throw err;

                if (doc.value !== null) {
                    callback(null, {
                        'affectedRow': doc.value
                    });
                } else {

                    collection.insertOne({
                        'idLogo': idLogo,
                        'etiquetas': _ids
                    }, (err, doc) => {
                        if (err) throw err;
                        callback(null, {
                            'insertId': doc.insertedId
                        });
                    });

                }
            });
    })
}

etiqueta.DesasignarIcono = (_id, icono, callback) => {
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
                const iconos = db.collection('iconos');

                iconos.deleteMany({ 'idNoun': { '$in': icono } }, (err, result) => {
                    if (err) throw err;

                    callback(null, {
                        'affectedRow': doc.value
                    });
                })
            });
    })
}

etiqueta.Borrar = (_id, callback) => {
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

etiqueta.Analizar = (tags, callback) => {
    let iconos = [];

    __mongoClient(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        }, {
            $unwind: '$traducciones'
        }, {
            $match: {
                'traducciones.valor': {
                    '$in': Object.keys(tags)
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

                Array.prototype.sortByFrequency = function () {
                    return function () {
                        var frequency = {};

                        this.forEach(function (value) { frequency[value] = 0; });

                        var uniques = this.filter(function (value) {
                            return ++frequency[value] == 1;
                        });

                        return uniques.sort(function (a, b) {
                            return frequency[b] - frequency[a];
                        });
                    }
                }();

                callback(null, iconos.sortByFrequency());
            }
        })
    })
}

etiqueta.AnalizarNOUN = (lang, tags, callback) => {
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
                },

            }
        }, {
            $match: {
                'traducciones': {
                    '$elemMatch': {
                        'idioma': lang,
                        'valor': {
                            '$in': Object.keys(tags)
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

                formatedDocs = { en: [] };
                formatedDocs[lang] = [];

                docs.forEach((doc, index) => {
                    let traducciones = {}
                    doc.traducciones.forEach(tra => {
                        traducciones[tra.idioma] = tra.valor;
                    })
                    docs[index].traducciones = traducciones;
                });

                Object.keys(tags).forEach(tag => {
                    docs.map(doc => {
                        if (doc.traducciones[lang] == tag) {
                            tags[tag].en = doc.traducciones.en;
                        }
                    })
                });

                callback(null, tags);
            }
        })
    })
}

etiqueta.AnalizarMONGO = (lang, tags, callback) => {

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
                },
                iconos: {
                    $push: { iconos: '$iconos' }
                }
            }
        }, {
            $match: {
                'traducciones': {
                    '$elemMatch': {
                        'idioma': lang,
                        'valor': {
                            '$in': Object.keys(tags)
                        }
                    }
                }
            }
        }, {
            $project: {
                idioma: false
            }
        }]).toArray((err, docs) => {
            if (err) throw err;

            else {

                var formatedDocs = { en: [] };
                formatedDocs[lang] = [];

                iconos = []

                docs.forEach((doc, index) => {
                    let traducciones = {}
                    doc.traducciones.forEach(tra => {
                        traducciones[tra.idioma] = tra.valor;
                    })

                    if (doc.iconos.length) {
                        doc.iconos.forEach(arr_iconos => {
                            if (arr_iconos.iconos.length) {
                                arr_iconos.iconos.forEach(icono => {
                                    if (iconos.indexOf(icono) == -1) iconos.push(icono);
                                })
                            }
                        })
                    }

                    docs[index].traducciones = traducciones;
                });



                Object.keys(tags).forEach(tag => {
                    docs.map(doc => {
                        if (doc.traducciones[lang] == tag) {
                            tags[tag].en = doc.traducciones.en;
                        }
                    })
                });

                callback(null, { tags: tags, iconos: iconos });
            }
        })
    })
}

etiqueta.TraducirGuardar = async (tags, lang, callback) => {

    let tagsTraducidas = [];

    for (let tag of tags) {

        let trad = {}

        try {
            trad.en = await translate(tag, { from: lang, to: 'en' });
            trad.es = await translate(tag, { from: lang, to: 'es' });
            trad.pr = await translate(tag, { from: lang, to: 'pt' });
        } catch (error) {
            callback(error);
            return
        }

        if (trad[lang].from.language.iso == lang) {

            if ((trad.en.text === trad.es.text && trad.en.text === trad.pr.text) === false) {

                tagsTraducidas.push({ en: trad.en.text, es: trad.es.text, pr: trad.pr.text });

            }

        }

    }

    __mongoClient(db => {
        const idiomas = db.collection('idiomas');
        idiomas.find({}).toArray((err, docs) => {
            if (err) throw err;

            let tagsParaGuardar = [];

            for (let tag of tagsTraducidas) {

                let tagLista = { traducciones: [], iconos: [] };

                let idiomas = Object.keys(tag);

                for (let idioma of idiomas) {

                    let _id

                    docs.forEach(doc => {
                        if (doc.codigo == idioma) {
                            _id = doc._id;
                        }
                    });

                    if (_id !== undefined) {
                        tagLista.traducciones.push({ idioma: objectId(_id), valor: tag[idioma] });
                    }
                }
                tagsParaGuardar.push(tagLista);
            }

            const etiquetas = db.collection('etiquetas');


            if (tagsParaGuardar.length) {
                etiquetas.insertMany(tagsParaGuardar, function (err, r) {
                    if (err) throw err;
                    callback(null, r.ops);
                });
            } else {
                callback(null, []);
            }
        });
    });
}

etiqueta.TraducirGuardarNOUN = async (tags, lang, callback) => {

    let tagsTraducidas = [];

    for (let tag of Object.keys(tags)) {

        if (tags[tag].en == undefined) {

            let trad = {}

            try {
                trad.en = await translate(tag, { from: lang, to: 'en' });
                trad.es = await translate(tag, { from: lang, to: 'es' });
                trad.pr = await translate(tag, { from: lang, to: 'pt' });
            } catch (error) {
                callback(error);
                return
            }

            if (trad[lang].from.language.iso == lang) {

                if ((trad.en.text === trad.es.text && trad.en.text === trad.pr.text) === false) {

                    tagsTraducidas.push({ en: trad.en.text, es: trad.es.text, pr: trad.pr.text });
                    tags[tag].en = trad.en.text;

                }

            }
        }
    }

    __mongoClient(db => {
        const idiomas = db.collection('idiomas');
        idiomas.find({}).toArray((err, docs) => {
            if (err) throw err;

            let tagsParaGuardar = [];

            for (let tag of tagsTraducidas) {

                let tagLista = { traducciones: [], iconos: [] };

                let idiomas = Object.keys(tag);

                for (let idioma of idiomas) {

                    let _id

                    docs.forEach(doc => {
                        if (doc.codigo == idioma) {
                            _id = doc._id;
                        }
                    });

                    if (_id !== undefined) {
                        tagLista.traducciones.push({ idioma: objectId(_id), valor: tag[idioma] });
                    }
                }
                tagsParaGuardar.push(tagLista);
            }

            const etiquetas = db.collection('busquedas');


            if (tagsParaGuardar.length) {
                etiquetas.insertMany(tagsParaGuardar, function (err, r) {
                    if (err) throw err;
                });
            }
        });
    });

    callback(null, tags);
}

etiqueta.BuscarIconosNOUN = async (tags, callback) => {


    //console.time('Busqueda de Iconos');

    let Nproject = new NounProject({
        key: "049d89ea99f6415c837e7f0de9040b96",
        secret: "58dd191936204d42885a5ab4de7a6663"
    })

    let icons = [], vueltas = 1;

    let next = true;

    setTimeout(() => {
        next = false;
    }, 20000);

    let tagsArray = Object.keys(tags);

    while (icons.length < 8 && next) {

        //console.log({ vueltas: vueltas })
        let promises = [];

        tagsArray.map((tag) => {

            //console.log(tags[tag]);

            if (tags[tag].salto !== false) {

                const promise = new Promise((resolve) => {

                    Nproject.getIconsByTerm(tags[tag].en, { limit: 100, offset: tags[tag].salto, limit_to_public_domain: 0 }, (err, data) => {


                        //console.log(data)



                        if (!err && data && data.icons.length) {

                            resolve({ tag: tag, icons: data.icons })

                        } else {

                            resolve({ tag: tag, icons: [] })

                        }

                    });

                });

                promises.push(promise)

            }
        });


        try {
            //console.time('Esperando coleccion');
            let iconsCollections = await Promise.all(promises);
            //console.timeEnd('Esperando coleccion');
            let i = 0

            while (i < 100) {

                if (icons.length < 8) {

                    for (let coll of iconsCollections) {

                        if (coll.icons.length) {


                            if (coll.icons[i] != undefined && coll.icons[i].icon_url) {

                                try {
                                    let svg = await fetch(coll.icons[i].icon_url).then(res => res.text()).then(body => body);

                                    let str = "<svg" + svg.split("<svg")[1];
                                    let dd = str.replace(/fill=/gi, "nofill=");

                                    base64.encode(dd)
                                    icons.push({ idElemento: coll.icons[i].id, svg: base64.encode(dd) });

                                } catch (error) {
                                    //console.log(error);
                                }
                            }

                        } else {
                            tags[coll.tag].salto = false;
                        }
                    }

                } else {

                    Object.keys(tags).map((tag) => {
                        if (tags[tag].salto !== false) {
                            tags[tag].salto = tags[tag].salto + i;
                        }
                        //console.log(icons.length, i, tag, tags[tag].salto)
                    })
                    break;

                }

                if (i == 99) {

                    Object.keys(tags).map((tag) => {
                        if (tags[tag].salto !== false) {
                            tags[tag].salto = tags[tag].salto + 100;
                        }
                    })

                }

                i++;
            }

            //console.log({nIcons: icons.length});

        } catch (error) {
            //console.log(error)
            callback(error);
            return
        }

        vueltas++;

        let falses = 0;

        Object.keys(tags).forEach((tag) => {
            if (tags[tag].salto == false) falses++;

            if (falses == Object.keys(tags).length) {
                next = false
            }

            //console.log(tag, falses);
        })
    }

    //console.timeEnd('Busqueda de Iconos');
    callback(null, { tags: tags, iconos: icons });
}

etiqueta.BuscarIconosMONGO = async (iconos, excluidos, callback) => {

    var iconosRamdon = []
    var i = 1;
    var length = iconos.length;
    while (i < 17) {
        var random = Math.floor(Math.random() * (length + 1));
        if (iconos.length && iconosRamdon.indexOf(iconos[random]) == -1) {

            if (excluidos.indexOf(iconos[random]) == -1) {
                iconosRamdon.push(iconos[random]);
                i++;
            }

            iconos.splice(random, 1);
            length = iconos.length;
        } else if (!iconos.length) {
            break;
        }
    }

    __mongoClient(db => {
        const iconos = db.collection('iconos');
        iconos.find({ idNoun: { $in: iconosRamdon } }).toArray((err, docs) => {

            iconosRamdon = iconosRamdon.concat(excluidos);

            callback(null, { idsIconos: iconosRamdon, iconos: docs });

        })
    })

}

etiqueta.TransformarSvg = async (iconos, callback) => {

    //console.time('Descarga de Iconos')

    let promises = [];

    iconos.forEach((icono) => {

        let promise = fetch(icono.icon_url).then(res => {
            return res.text();
        }).then(body => {
            return body;
        });
        //catch promise

        promises.push(promise);
    });

    try {

        let svgCollection = await Promise.all(promises);

        svgCollection.forEach((svg, i) => {

            var str = "<svg" + svg.split("<svg")[1];
            var dd = str.replace(/fill=/gi, "nofill=");

            try {
                base64.encode(dd)
                iconos[i] = { idElemento: iconos[i].id, svg: base64.encode(dd) };
            } catch (error) {
                console.log(error);
            }
        });

    } catch (error) {
        console.log(error)
        callback(error);
        return
    }

    console.timeEnd('Descarga de Iconos')

    callback(null, iconos)
}

etiqueta.ObtenerPorLogo = (data, lang, callback) => {

    let promises = [];

    data.forEach((logo, i) => {

        let promise = new Promise((resolve, reject) => {

            __mongoClient(db => {

                const logos = db.collection('logos');
                logos.findOne({ idLogo: logo.idLogo }, (err, doc) => {

                    if (err) reject(err);

                    if (doc) {

                        const etiquetas = db.collection('etiquetas');

                        let promisesEt = [];

                        doc.etiquetas.forEach(el => {

                            let pr = etiquetas.aggregate([{
                                $match: {
                                    "_id": objectId(el)
                                }
                            }, {
                                $unwind: '$traducciones'
                            }, {
                                $lookup: {
                                    from: 'idiomas',
                                    localField: 'traducciones.idioma',
                                    foreignField: '_id',
                                    as: 'idioma'
                                }
                            }, {
                                $match: {
                                    "idioma.codigo": lang
                                }
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
                            }]).toArray();
                            promisesEt.push(pr);
                        });

                        Promise.all(promisesEt).then(res => {
                            logo.etiquetas = res[0]
                            resolve(logo)
                        }).catch(err => {
                            reject(err)
                        });
                    } else {
                        logo.etiquetas = []
                        resolve(logo)
                    }
                })
            })
        })

        promises.push(promise);
    });


    Promise.all(promises).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    });
}

etiqueta.importarIconos = function (idTag, svgs, callback) {

    idsNoun = [];

    svgs.forEach(svg => {
        idsNoun.push(svg.idNoun);
    });

    if (idsNoun.length) {

        __mongoClient(db => {

            const etiquetas = db.collection('etiquetas');

            etiquetas.updateOne({ _id: objectId(idTag) }, {
                $push: {
                    iconos: {
                        $each: idsNoun
                    }
                }
            },
                function (err, result) {
                    if (err) return callback(err);

                    if (result.result.nModified) {

                        const iconos = db.collection('iconos');

                        iconos.insertMany(svgs, function (err, r) {
                            if (err) return callback(err);

                            callback(null, { insertedCount: r.insertedCount });

                        });

                    } else {
                        callback(null, { nModified: result.result.nModified });
                    }

                });
        })


    }
}

module.exports = etiqueta;