'use strict';
var nodemailer = require('nodemailer');


exports.enviar_email= function(req,res){ 

// metodo para configurar SMTP
 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'michelnovellino.programador@gmail.com',
        pass: 'MichLid2016!'
    }               
});

// Configuracion de los datos del correo
 var mailOptions = {
    from: '"Liderlogo 👻" <michelnovellino.programador@gmail.com>', // remitente
    to: 'michelnovellino.programador@gmail.com', // receptor o receptores
    text: 'Hello world ?', // correo en texto plano
   
    //si se borra el atributo text se enviara tolo el html y viceversa
    // si se colocan los 2 html es prioridad en el mensaje
};

// envio del correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
        }

        res.status(200).send('enviado con exito')
    console.log('Message %s sent: %s', info.messageId, info.response);
});
}
