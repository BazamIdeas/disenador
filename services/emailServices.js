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

        this.template = fs.readFileSync('./email-templates/header.html' ,'utf8');
        this.template += fs.readFileSync('./email-templates/'+template+'/content.html' ,'utf8');
        this.template += fs.readFileSync('./email-templates/footer.html' ,'utf8');

        this.data.css = fs.readFileSync('./email-templates/'+template+'/styles.css' ,'utf8');

        this.data.baseurl = "http://test.logo.pro";

        this.message.html = this.template;

        this.replaceInTemplate()

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

    replaceInTemplate() {

        var keys = Object.keys(this.data);

        for(var key in keys){
            while(this.message.html.indexOf("${"+keys[key]+"}") != -1){
                this.message.html = this.message.html.replace("${"+keys[key]+"}", this.data[keys[key]]);
            }
        }
    }
}

module.exports = emailService;