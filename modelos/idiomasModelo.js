const Mongo = require('./mongo.js');
const Connection = Mongo.connection;
const objectId = Mongo.objectId;

let idioma = {}

idioma.ObtenerTodos = callback =>
{ 
	Connection(db => {
		const collection = db.collection('idiomas');
		collection.find({}).toArray((err, docs) => {
			if(err)	throw err;
		  	callback(null, docs);
		});
	})
}

idioma.Obtener = (_id, callback) =>
{ 
	Connection(db => {
		const collection = db.collection('idiomas');
		collection.findOne({'_id': objectId(_id) }, (err, doc) => {
            if(err)	throw err;
		  	callback(null, doc);
		});
	})
}

idioma.ObtenerPorCodigo = (codigo, callback) =>
{ 
	Connection(db => {
		const collection = db.collection('idiomas');
		collection.findOne({'codigo': codigo}, (err, doc) => {
            if(err)	throw err;
		  	callback(null, doc);
		});
	})
}
 
idioma.Guardar = (idiomaData, callback) =>
{
	Connection(db => {
		const collection = db.collection('idiomas');
		collection.insertOne(idiomaData, (err, doc) => {
			if(err)	throw err;
		  	callback(null, { 'insertId': doc.insertedId });
		});
	})
}

idioma.Actualizar = (_id, idiomaData, callback) =>
{
	Connection(db => {
		const collection = db.collection('idiomas');
		collection.findOneAndUpdate({ '_id': objectId(_id) }, { $set: idiomaData }, (err, doc) => {
			if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
	})
}

idioma.Borrar = (_id, callback) =>
{
	Connection(db => {
		const collection = db.collection('idiomas');
		collection.findOneAndDelete({ '_id': objectId(_id) }, (err, doc) => {
            if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
	})
}

module.exports = idioma;