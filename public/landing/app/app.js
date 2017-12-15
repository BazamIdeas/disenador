angular.module("landing", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "mp.colorPicker", "base64", '720kb.socialshare', 'oitozero.ngSweetAlert'])

.config(function ($stateProvider, $mdThemingProvider, socialshareConfProvider,  $urlRouterProvider) {

    /* COMPARTIR EN REDES SOCIALES */

    socialshareConfProvider.configure([
        {
            'provider': 'twitter',
            'conf': {
                'url': 'http://720kb.net',
                'text': '720kb is enough',
                'via': 'npm',
                'hashtags': 'Creador de logos, LIDERLOGO',
                'trigger': 'click'
            }
    },
        {
            'provider': 'facebook',
            'conf': {
                'url': 'http://720kb.net',
                'trigger': 'click',
                'socialshareUrl': 'http://720kb.net',
                'socialshareText': 'Creador de logos',
                'socialshareTitle': 'Creador de logos',
                'socialshareDescription': 'Creador de logos',
                'socialsharemedia': '#logo-share',
                'socialshareHashtags': ''
            }
    }, {
            'provider': 'email',
            'conf': {
                'trigger': 'click',
                'socialsharesSubject': 'Creador de logos',
                'socialsharesBody': 'Hola',
                'socialsharesTo': 'luisdtc2696@gmail.com',
                'socialsharesCc': '',
                'socialsharesBcc': ''
            }
    }


  ])

    /*------------------Material Angular --------------*/

    $mdThemingProvider.theme('default')
        .warnPalette('orange')


    /*------------------------ Ui router states ----------------------*/

    $stateProvider.state({
        name: 'comienzo',
        url: '',
        templateUrl: 'landing/app/views/comienzo.tpl',
        controller: 'comienzoController as comienzo',
        params: {
            datos: null
        }
    })

    $urlRouterProvider.otherwise('');
})
