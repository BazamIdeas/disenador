const Mongo = require('./mongo.js');
const ObjectId = require('mongodb').ObjectID;

let idioma = {}

idioma.ObtenerTodos = (callback) =>
{ 
	Mongo.connection((db) => {
		const collection = db.collection('idiomas');
		collection.find({}).toArray((err, docs) => {
			if(err)	throw err;
		  	callback(null, docs);
		});
	})
}

idioma.ObtenerPorCodigo = (codigo, callback) =>
{ 
	Mongo.connection((db) => {
		const collection = db.collection('idiomas');
		collection.findOne({'codigo': codigo}, (err, doc) => {
            if(err)	throw err;
		  	callback(null, doc);
		});
	})
}
 
idioma.Guardar = (idiomaData, callback) =>
{
	Mongo.connection((db) => {
		const collection = db.collection('idiomas');
		collection.insertOne(idiomaData, (err, doc) => {
			if(err)	throw err;
		  	callback(null, {'insertId': doc._id});
		});
	})
}

idioma.Actualizar = (_id, idiomaData, callback) =>
{
	Mongo.connection((db) => {
		const collection = db.collection('idiomas');
		collection.updateOne({'_id': new ObjectId(_id)}, idiomaData, (err, doc) => {
			if(err)	throw err;
		  	callback(null, {'affectedRows': doc.matchedCount});
		});
	})
}

idioma.Borrar = (id, callback) =>
{
	Mongo.connection((db) => {
		const collection = db.collection('idiomas');
		collection.deleteOne({'_id': new ObjectId(id)}, (err, doc) => {
			if(err)	throw err;
		  	callback(null, {'affectedRows': doc.deletedCount});
		});
	})
}

module.exports = idioma;