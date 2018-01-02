var paypal = require('paypal-rest-sdk');
var configuracion = require('../configuracion.js');

exports.paypal = function(datos,callback)
{ 
  paypal.configure(configuracion.paypal);

  var confirmacion;

      var impuesto = datos.precio * (datos.impuesto/100)
      var total = datos.precio + impuesto

      var payment = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
       "redirect_urls": {
        "return_url": "http://"+configuracion.url+"/app/pedido/pagado/"+datos.idElemento+"/"+datos.idLogo+"/"+datos.tipoElemento+"/"+datos.token+"/"+datos.idPedido+"/",
        "cancel_url": "http://"+configuracion.url+"/app/pedido/no/pago/"+datos.token+"/"
        },

        "transactions": [{
            "amount": {
                "total": parseInt(total),
                "currency": datos.moneda,
            },
            "description": datos.descripcion
        }]
      };

      paypal.payment.create(payment, function (error, payment) {
        if (error) {
          callback(null,{"res":false,"msg":"error al validar los datos"});
          //console.log(error);
        } 

        else {

          if(payment.payer.payment_method === 'paypal') {
            //console.log(payment);
            for(var i=0; i < payment.links.length; i++) {
              var link = payment.links[i];
              if (link.method === 'REDIRECT') {
                confirmacion = {"res": true, "link":link.href} ;
              }
            }
            return callback(null,confirmacion)
          }

          else callback(null,{"res" : false, "msg":"Error de medio de pago"})

        }

      });
}
