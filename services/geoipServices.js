'use strict';

var MMDBReader = require('mmdb-reader');
var configuracion = require('../configuracion.js');

exports.iso = function(ip){
 if configuracion.servidor = "Desarrollo"{
  ip = "190.246.249.12";
 }
 
 var reader = new MMDBReader('./GeoIP2-Country.mmdb')

 return reader.lookup(ip).country.iso_code; // { city: { ... }, continent: { ... } }

}