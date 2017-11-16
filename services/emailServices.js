'use strict';
var nodemailer = require('nodemailer');
var fs = require('fs');


exports.enviarEmail = function(datos, subjetc, from, to){ 

    // metodo para configurar SMTP
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danieljtorres94@gmail.com',
            pass: 'csxhngwmzjowufxs'
        }               
    });

    var template = fs.readFileSync('./emailtemplates/ejemplo.html','utf8');

    //var dummy = {'uno' : "Hola", 'dos': "Hola de nuevo"};

    for(var key in datos){
        template = template.replace('{#'+key+'#}', datos[key]);
    }

    //res.status(200).send(template);

    //Configuracion de los datos del correo
    var mailOptions = {
        from: from, // remitente
        to: to, // receptor o receptores
        subject: subject, // Asunto del correo
        //text: 'Hello world ?', // correo en texto plano
        html: template // html body 
       
        //si se borra el atributo text se enviara tolo el html y viceversa
        // si se colocan los 2 html es prioridad en el mensaje
    };

    // envio del correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        	console.log(error);
            return false;
        }

        console.log('Message %s sent: %s', info.messageId, info.response);
        return true;
    });
}