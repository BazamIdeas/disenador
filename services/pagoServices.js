var paypal = require('paypal-rest-sdk');
var configuracion = require('../configuracion.js');

exports.paypal = function(datos,callback)
{ 
  paypal.configure(configuracion.paypal);

  var confirmacion;

      var impuesto = datos.precio * (datos.impuesto/100)
      var total = datos.precio + impuesto

      var return_url = ''; 
      
      if(!datos.aumento){
        return_url = configuracion.url+"/app/pedido/pagado/"+datos.idElemento+"/"+datos.idLogo+"/"+datos.tipoElemento+"/"+datos.token+"/"+datos.idPedido+"/";
      }else{
        return_url = configuracion.url+"app/pedido/aumento/"+datos.idPedido+"/"+datos.idLogo+"/";
      }
    
      if(datos.padre){
        return_url = return_url + datos.padre+"/";
      }

      var payment = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
       "redirect_urls": {
        "return_url": return_url,
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
