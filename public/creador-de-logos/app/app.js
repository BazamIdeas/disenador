angular.module("disenador-de-logos", ["angular-messages", "angular-ui-router"])

.config(function($stateProvider){
    
    
    var inicio = {
        name: 'inicio',
        url: '/',
        template: '<h3>hello world!</h3>'
    }
    
    
     $stateProvider.state(inicio);
});