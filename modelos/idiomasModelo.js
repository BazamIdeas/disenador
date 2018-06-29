const objectId = require('./mongo.js').objectId;

let idioma = {}

idioma.ObtenerTodos = callback =>
{ 
	__mongoClient(db => {
		const collection = db.collection('idiomas');
		collection.find({}).toArray((err, docs) => {
			if(err)	throw err;
		  	callback(null, docs);
		});
	})
}

idioma.Obtener = (_id, callback) =>
{ 
	__mongoClient(db => {
		const collection = db.collection('idiomas');
		collection.findOne({'_id': objectId(_id) }, (err, doc) => {
            if(err)	throw err;
		  	callback(null, doc);
		});
	})
}

idioma.ObtenerPorCodigo = (codigo, callback) =>
{ 
	__mongoClient(db => {
		const collection = db.collection('idiomas');
		collection.findOne({'codigo': codigo}, (err, doc) => {
            if(err)	throw err;
		  	callback(null, doc);
		});
	})
}
 
idioma.Guardar = (idiomaData, callback) =>
{
	__mongoClient(db => {
		const collection = db.collection('idiomas');
		collection.insertOne(idiomaData, (err, doc) => {
			if(err)	throw err;
		  	callback(null, { 'insertId': doc.insertedId });
		});
	})
}

idioma.Actualizar = (_id, idiomaData, callback) =>
{
	__mongoClient(db => {
		const collection = db.collection('idiomas');
		collection.findOneAndUpdate({ '_id': objectId(_id) }, { $set: idiomaData }, (err, doc) => {
			if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
	})
}

idioma.Borrar = (_id, callback) =>
{
	__mongoClient(db => {
		const collection = db.collection('idiomas');
		collection.findOneAndDelete({ '_id': objectId(_id) }, (err, doc) => {
            if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
	})
}

module.exports = idioma;