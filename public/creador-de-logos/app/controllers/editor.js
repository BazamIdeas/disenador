angular.module("disenador-de-logos")

/* Editor */

.controller('editorController', ['$scope', '$stateParams', '$state', 'LS', '$timeout', '$base64', '$mdSidenav', 'categoriasService', 'Socialshare', 'logosService', 'SweetAlert', 'Auth', function ($scope, $stateParams, $state, LS, $timeout, $base64, $mdSidenav, categoriasService, Socialshare, logosService, SweetAlert, Auth) {

    var bz = this;


    bz.autorizado = Auth.$getAuth();

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });

    this.base64 = function (icono) {

        return $base64.decode(icono);

    }

    /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams.logo && $stateParams.posicion && $stateParams.texto) {
        this.definirInfo($state.current.name, $stateParams);
        this.datosEstadoAnterior = $stateParams;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('opciones');
    }

    /* *************** */

    /* MENU EDITOR */
    this.menu = 1;
    this.menuItem = function (mswitch) {

        this.menu = mswitch;
    }

    /* *************** */

    this.logo = this.datosEstadoAnterior.logo;
    this.logo.texto = this.datosEstadoAnterior.texto;
    this.logo.posicion = this.datosEstadoAnterior.posicion;


    /*********** Estado activo o inactivo de los elementos **********/

    this.activo = {

        elementos: {},
        texto: ''

    };

    this.mostrar = {}

    this.activar = function (tipo, llave = false) {

        if (tipo == 'elemento') {

            this.activo.texto = '';

            if (!this.mostrar.color) {

                this.mostrar.color = 'color-animacion-entrada';
            }

            if (this.mostrar.texto) {

                this.mostrar.texto = 'color-animacion-salida'
            }

            this.activo.elementos = {};

            this.activo.elementos[llave] = 'si';

        } else if (tipo == 'texto') {


            this.activo.elementos = {};



            if (!this.mostrar.texto || this.mostrar.texto == 'color-animacion-salida') {

                this.mostrar.texto = 'color-animacion-entrada';

            }


            if (!this.mostrar.color) {

                this.mostrar.color = 'color-animacion-entrada';
            }





            this.activo.texto = 'si';

        }
    }


    /***********************/

    /**********logos copias********/
    this.comparadores = [];


    this.tipoGuardar = "comparar";

    this.guardarComparar = 0;

    //guarda un logo en el listado de logos comparativos
    this.guardar = function (tipo) {

        //acepta dos tipos de guardado, comprar y comparar
        this.tipoGuardar = tipo;
        this.guardarComparar++;


    }

    this.recuperar = function (clon) {
        /* REVISAR */
        this.color = ""

        this.activo = {

            elementos: {},
            texto: ''

        };
        /*----------*/

        this.logo.icono.svg = clon;


    }

    /******************************/


    $scope.fuente = null;
    $scope.fuentes = null;

    this.cambiarFuente = function (fuente) {
        this.logo.fuente.nombre = fuente;
    };

    this.fuentes = [{
        id: 1,
        url: "../creador-de-logos/assets/fonts/Bahiana-Regular.ttf",
        nombre: "Bahiana-Regular"
        }, {
        id: 2,
        url: "../creador-de-logos/assets/fonts/Barrio-Regular.ttf",
        nombre: "Barrio-Regular"
        }, {
        id: 3,
        url: "../creador-de-logos/assets/fonts/CaveatBrush-Regular.ttf",
        nombre: "CaveatBrush-Regular"
        }, {
        id: 4,
        url: "../creador-de-logos/assets/fonts/DellaRespira-Regular.ttf",
        nombre: "DellaRespira-Regular"
        }, {
        id: 5,
        url: "../creador-de-logos/assets/fonts/IndieFlower.ttf",
        nombre: "IndieFlower"
        }, {
        id: 6,
        url: "../creador-de-logos/assets/fonts/Anton-Regular.ttf",
        nombre: "Anton-Regular"
        }, {
        id: 7,
        url: "../creador-de-logos/assets/fonts/FjallaOne-Regular.ttf",
        nombre: "FjallaOne-Regular"
        }, {
        id: 8,
        url: "../creador-de-logos/assets/fonts/Lobster-Regular.ttf",
        nombre: "Lobster-Regular"
        }, {
        id: 9,
        url: "../creador-de-logos/assets/fonts/Pacifico-Regular.ttf",
        nombre: "Pacifico-Regular"
        }]

    bz.fabEditor = false;

    bz.cambiarMenu = function (id) {

        return $mdSidenav(id).toggle();
    }

    bz.fondo = "blanco";

    /* CATEGORIAS EXISTENTES */
    this.categoria = this.datosEstadoAnterior.logo.icono.categorias_idCategoria;
    this.categoriasPosibles = [];
    categoriasService.listaCategorias.then(function (res) {
        angular.forEach(res.data, function (valor, llave) {
            bz.categoriasPosibles.push(valor);
        })
    })

    /* LOGOS */

    bz.gLogo = function (idLogo, estado, logo, tipoLogo, clientes_idCliente, elementos_idElemento, autorizado) {

        if (autorizado) {

            logosService.guardarLogo(idLogo, estado, logo, tipoLogo, clientes_idCliente, elementos_idElemento).then(function (res) {
                console.log(res);

                SweetAlert.swal("Bien Hecho", "Tu logo ha sido guardado!", "success");
            })

        }else{
            SweetAlert.swal("No disponible", "Tienes que ingresar primero!", "error");
        }
    }
    
    
    /* PREVISUALIZAR */
    
    bz.modeloPrevisualizar = [
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        }
    ]
}])
