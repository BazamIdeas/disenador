'use strict';

var MMDBReader = require('mmdb-reader');

exports.iso = function(ip){

	ip = "190.246.249.12";

	var reader = new MMDBReader('./GeoIP2-Country.mmdb')

	return reader.lookup(ip).country.iso_code; // { city: { ... }, continent: { ... } }

}
