var express = require('express');

var app = express();

app.use('/', express.static(__dirname + '/public/'))

app.use('/angular', express.static(__dirname + '/node_modules/angular'))
app.use('/angular-material', express.static(__dirname + '/node_modules/angular-material'))

app.use('/angular-messages', express.static(__dirname + '/node_modules/angular-messages'))
app.use('/angular-animate', express.static(__dirname + '/node_modules/angular-animate'))
app.use('/angular-aria', express.static(__dirname + '/node_modules/angular-aria'))
app.use('/angular-ui-router', express.static(__dirname + '/node_modules/angular-ui-router/release'))


app.listen(8080);
