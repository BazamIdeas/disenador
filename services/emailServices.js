'use strict';
var nodemailer = require('nodemailer');
var fs = require('fs');

class emailService {

    constructor(options, data = {}){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'danieljtorres94@gmail.com',
                pass: 'csxhngwmzjowufxs'
            }               
        });
        this.message = options;
        this.message.from = "'LogoPro' <contacto@logopro.com>";
        this.data = data;
    }

    setHtml(template) {
        this.template = fs.readFileSync('./emailtemplates/'+template ,'utf8', (err) => {
            if (err) throw err;
        });
        for(var key in this.data){
            this.message.html = this.template.replace('{#'+key+'#}', this.data[key]);
        }
        return this;
    } 

    setAttachs(attachs) {
        this.message.attachments = attachs;
        return this;
    }

    send(cb){
        this.transporter.sendMail(this.message, (err,info) => {
            if(err) return cb(err, null);
            return cb(null, info);
        });
    }
}

module.exports = emailService;

/*exports.enviar = function(template, datos = {}, subject = "Hola desde liderlogo ", to = "jtorresdevelop@gmail.com", from = "'Liderlogo' <contacto@liderlogo.com>"){ 

    // metodo para configurar SMTP
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danieljtorres94@gmail.com',
            pass: 'csxhngwmzjowufxs'
        }               
    });

    var template = fs.readFileSync('./emailtemplates/'+template ,'utf8', (err, data) => {
	  	if (err) throw err;
	});

    // var dummy = {uno : "Hola", dos: "Hola de nuevo"};

    for(var key in datos){
        template = template.replace('{#'+key+'#}', datos[key]);
    }

    // res.status(200).send(template);

    // Configuracion de los datos del correo
    var mailOptions = {
        from: from, // remitente
        to: to, // receptor o receptores
        subject: subject, // Asunto del correo
        // text: 'Hello world ?', // correo en texto plano
        html: template // html body 
       
        // si se borra el atributo text se enviara tolo el html y viceversa
        // si se colocan los 2 html es prioridad en el mensaje
    };

    // envio del correo
    return transporter.sendMail(mailOptions);
}*/