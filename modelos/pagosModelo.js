var paypal = require('paypal-rest-sdk');
var impuesto=require('./impuestosModelo.js');
var DB=require('./DB.js');
var configuracion = require('../configuracion.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pago = {};

paypal.configure(configuracion.paypal);

pago.paypal = function(datos,callback)
{ 
  var confirmacion;
  /// VERIFICAR IMPUESTO

  impuesto.getImpuesto(datos.localidad,function(error, data){
    
    if (typeof data !== 'undefined' && data.length > 0){

      var impuesto = datos.precio * (data[0].impuesto/100)
      var total = datos.precio + impuesto

      if (datos.tipoPago == "paypal"){
        var payment = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
       "redirect_urls": {
        "return_url": configuracion.url+"/app/pedido/pagado/"+datos.idElemento+"/"+datos.idLogo+"/"+datos.tipoElemento+"/"+datos.token+"/",
        "cancel_url": configuracion.url+"/app/pedido/no/pago/"+datos.token+"/"
        },

        "transactions": [{
            "amount": {
                "total": parseInt(total),
                "currency": datos.moneda,
            },
            "description": datos.descripcion
        }]
      };
    }

    if (datos.tipoPago == "credit_card")
    {
      var payment =   {
        "intent": "sale",
        "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
                "credit_card": {
                    "type": datos.tTarjeta,
                    "number": datos.nTarjeta,
                    "expire_month": datos.expire_month,
                    "expire_year": datos.expire_year
                }
            }]
        },
        "transactions": [{
            "amount": {
                "total": parseInt(total),
                "currency": datos.moneda,
                "details": {
                    "subtotal": datos.precio,
                    "tax": parseInt(impuesto)
                }
            },
            "description": datos.descripcion
        }]
      };
    }
    //console.log(payment.payer.funding_instruments[0])
    //console.log(payment.transactions[0].amount)
      paypal.payment.create(payment, function (error, payment) {
      if (error) {
        callback(null,{"res":false,"msg":"error al validar los datos"});
        //console.log(error);
          
      } else {
        if(payment.payer.payment_method === 'paypal') {
          console.log(payment);
          for(var i=0; i < payment.links.length; i++) {
            var link = payment.links[i];
            if (link.method === 'REDIRECT') {
              confirmacion = {"res": true, "link":link.href} ;
            }
          }
          callback(null,confirmacion)
        }

        if(payment.payer.payment_method === 'credit_card') {
            confirmacion = {"res": payment.state, "msg":"Pago enviado" };
            callback(null,confirmacion)
        }
      }
    });
    }
    else{
      callback(null,{"msg":"Error de impuesto"})
    }
  });

}

    
module.exports = pago;