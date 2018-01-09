'use strict';

var MMDBReader = require('mmdb-reader');

exports.iso = function(ip){

	var reader = new MMDBReader('./GeoIP2-Country.mmdb')

	return reader.lookup(ip).country.iso_code; // { city: { ... }, continent: { ... } }

}
