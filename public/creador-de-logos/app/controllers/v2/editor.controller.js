angular.module("disenador-de-logos")

    /* Editor */

    .controller('editorController', ['$scope', '$stateParams', '$state', '$base64','categoriasService', 'logosService', 'clientesService', 'mockupsValue', "historicoResolve", "$rootScope", function ($scope, $stateParams, $state, $base64, categoriasService, logosService, clientesService, mockupsValue, historicoResolve, $rootScope) {

        var bz = this;

        bz.base64 = $base64;

        bz.borradores = false;
        
        bz.busquedaIconos = false;

        //////////////////////////////////////////////
        ///////////////LOCAL STORAGE//////////////////
        //////////////////////////////////////////////

        if (historicoResolve.logoModificado) { //si es un logo previamente modificado
            /*
            bz.restauracionIniciada = true;

            bz.logo = {
                icono: {
                    tipo: historicoResolve.logoModificado.tipo,
                    idElemento: historicoResolve.logoModificado.idElemento
                }
            }
            
            */

        } else { //si no es logo modificado, se revisa el localStorage
          
            bz.logo = historicoResolve.logo;
            bz.logo.texto = historicoResolve.texto;
            bz.fuentes = historicoResolve.fuentes;
            bz.categoria = historicoResolve.logo.icono.categorias_idCategoria;
         
        }

       
     

        /* CATEGORIAS EXISTENTES */

        bz.categoriasPosibles = [];
        categoriasService.listaCategorias().then(function (res) {
            angular.forEach(res, function (valor, llave) {
                bz.categoriasPosibles.push(valor);
            })
        })

        /* LOGOS */
     
        bz.gLogo = function (logo, tipoLogo, idElemento) {

            logosService.guardarLogo(logo, tipoLogo, idElemento).then(function (res) {

                //SweetAlert.swal("Bien Hecho", "Tu logo ha sido guardado!", "success");

            })

        }



        /////////////////////////////////////
        //////////CAMBIO DE COLOR////////////
        /////////////////////////////////////

        bz.cambioColor = function (color, objetivo) {

            $rootScope.$broadcast("editor:color", {color: color, objetivo: objetivo});
            
        }
        
        
        /////////////////////////////////////
        //////////CAMBIO DE TEXTO////////////
        /////////////////////////////////////        
        
        bz.cambioTexto = function (texto) {
           
            $rootScope.$broadcast("editor:texto", texto);
            
        }
        
        
        /////////////////////////////////////
        /////////CAMBIO DE FUENTE////////////
        ///////////////////////////////////// 
        
        bz.cambioFuente = function (fuente) {

            $rootScope.$broadcast("editor:fuente", fuente);

        }
        
        /////////////////////////////////////
        ////////CAMBIO DE PROPIEDAS//////////
        ///////////////////////////////////// 
        
        bz.cambioPropiedad = function (propiedad) {

            $rootScope.$broadcast("editor:propiedad", propiedad);

        }
        
        /////////////////////////////////////
        /////////CAMBIO DE TAMAÑO////////////
        ///////////////////////////////////// 
        
        bz.cambioTamano = function (objetivo, accion) {

            $rootScope.$broadcast("editor:tamano", {objetivo: objetivo, accion: accion});

        }      
        
        /////////////////////////////////////////////////////////////////////////
        ////Disparar el guardado de un svg como copia de comparacion/////////////
        /////////////////////////////////////////////////////////////////////////

        bz.comparaciones = [];

        bz.realizarComparacion = function (valor) {
           
            
            $rootScope.$broadcast("editor:comparar", true);
            
        }
        
        $scope.$on("directiva:comparar", function(evento, valor){
           
            bz.comparaciones.push(valor)
            
        })
        
        //////////////////////////////////////////
        ///////////CAMBIAR ORIENTACION////////////
        //////////////////////////////////////////
        
        
        bz.cambiarOrientacion = function (orientacion) {
            
            
            $rootScope.$broadcast("editor:orientacion", orientacion);
            
        }
        
  
        //////////////////////////////////////////
        ////////RESTAURAR COMPARACIONES///////////
        //////////////////////////////////////////

        bz.restaurarComparacion = function (comparacion) {
        
            $rootScope.$broadcast("editor:restaurar", comparacion);
            
        }

        /* PREVISUALIZAR */

        bz.modeloPrevisualizar = mockupsValue;


        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('login');

        });


    }])