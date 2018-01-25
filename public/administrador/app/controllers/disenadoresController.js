angular.module("administrador")

    .controller('disenadoresController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', 'monedasService', '$base64', 'designerService', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService, monedasService, $base64, designerService) {

        var bz = this;

        /* DATOS */
        bz.logos = [];
        bz.disenadores = [];
        bz.vista = 0;
        bz.monedas = monedasValue;
        bz.paises = paisesValue;
        bz.monedasDisponibles = {};

        /***************************/
        /**********LOGOS***********/
        /***************************/

        bz.listarLogos = function () {
            designerService.listarLogos().then(function (res) {
                bz.logos = res;
                bz.listaL = !bz.listaL;
            }).catch(function (res) {
                notificacionService.mensaje('No existen logos por aprobar!');
               // bz.listarDisenadores();
            })
        }

        bz.listarLogos();

        bz.aprobarLogo = function (i, id) {
            bz.cal = !bz.cal;
            bz.element = i;

            designerService.aprobarLogo(id).then(function (res) {
                notificacionService.mensaje('Aprobado!');
                bz.logos[i].estado = 'Aprobado';
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.borrarLogo = function (i, id) {
            designerService.borrarLogo(id).then(function (res) {
                notificacionService.mensaje('No Aprobado!');
                bz.logos.splice(i, 1);
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.ponerCalificacion = function (datos) {

            designerService.calificarLogo(datos).then(function (res) {
                bz.cal2 = !bz.cal2;
                bz.cal = !bz.cal;
                notificacionService.mensaje('Calificacion Colocada!');
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })

        }

        bz.verLogo = function(logo, v){
            if(v){
                bz.lda = true;
            }else{
                bz.lda = false; 
            }
            bz.vista = 3;
            bz.logoVisualizar = logo;
        }

        bz.mostrarPop = function(){
            if(bz.lda){
                bz.vista = 1;
            }else{
                bz.vista = 0;
            }
        }

        /***************************/
        /********DISEÑADORES********/
        /***************************/

        bz.listarDisenadores = function (v) {
            bz.listaD = !bz.listaD;
            designerService.listarDisenadores(datos).then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.bloquearDisenador = function (id, ) {
            designerService.bloquearDisenador().then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.notificarDisenador = function (id) {
            designerService.notificarDisenador().then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }


        bz.mostrar = function (opcion, index, id) {
            if (opcion == 'logos-designer') {
                bz.modfire = index;
                /*
                designerService.logosDisenador(id).then(function (res) {
                    bz.logosDisenador = res;
                    bz.vista = 1;
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })
*/
            } else if (opcion == 'historial') {
                bz.vista = 2;
                bz.nombreDesigner = nombreDesigner;

                designerService.historialPagos(id).then(function (res) {

                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })

            } else if (opcion == 'calificacion-aprobados') {
                bz.cal2 = !bz.cal2;
                bz.modfire = index;
            }
        }

        /* UTILIDADES */

        bz.modFun = function (i) {
            bz.modfire = i;
            bz.modInit = !bz.modInit;
        }

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

        bz.logoprueba = 'PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHN0eWxlPkBmb250LWZhY2UgeyBmb250LWZhbWlseTogJ0F1ZGlvd2lkZSc7IHNyYzogdXJsKCcvZnVlbnRlcy9BdWRpb3dpZGUtUmVndWxhci50dGYnKX08L3N0eWxlPjxnIGNsYXNzPSJjb250ZW5lZG9yLWljb25vIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIC0xMy4zODM4MzgzODM4MzgzODQgLTEuMjYyNjI2MjYyNjI2MjYxMikiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgd2lkdGg9IjI3LjI2NTAxNTc5Mjg0NjY4cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjExLjY3MzUyMzkwMjg5MzA2NiIgeT0iMzcuODY3NDkxNzIyMTA2OTM0IiB2aWV3Qm94PSIwIDAgNTExLjk5OCA1MTEuOTk4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTEuOTk4IDUxMS45OTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIiBoZWlnaHQ9IjI3LjI2NTAxNTc5Mjg0NjY4cHgiPjxwYXRoIHN0eWxlPSJmaWxsOiMyOUFCRTI7IiBkPSJNMjg1Ljk1MywzOS44ODVoLTU5LjkwOWMtNS4xMTMsMC04Ljg2Ni00LjgwNi03LjYyNS05Ljc2NmwyLjkzNy0xMS43NQoJYzEuNTQzLTYuMTcyLDcuMDg4LTEwLjUwMSwxMy40NDktMTAuNTAxaDQyLjM4NmM2LjM2MiwwLDExLjkwNyw0LjMzLDEzLjQ0OSwxMC41MDFsMi45MzcsMTEuNzUKCUMyOTQuODE4LDM1LjA3OSwyOTEuMDY2LDM5Ljg4NSwyODUuOTUzLDM5Ljg4NXoiIGRhdGEtaW5kaWNlPSIwIj48L3BhdGg+CjxwYXRoIHN0eWxlPSJmaWxsOiNGNzkzMUU7IiBkPSJNMjk1Ljg4Myw1MDQuMTMyaC03OS43N2MtMTcuNzU4LDAtMzIuMTU0LTE0LjM5NS0zMi4xNTQtMzIuMTU0VjI2NS4yNzUKCWMwLTM3Ljc1MSw4LjE5Mi03NS4wNTMsMjQuMDEyLTEwOS4zMjlsMC4wMDEtMC4wMDFjMTUuODItMzQuMjc2LDI0LjAxMi03MS41NzcsMjQuMDEyLTEwOS4zMjh2LTYuNzMzaDQ4LjAyNXY2LjczMgoJYzAsMzcuNzUxLDguMTkzLDc1LjA1MywyNC4wMTMsMTA5LjMzbDAsMGMxNS44MiwzNC4yNzYsMjQuMDEzLDcxLjU3OCwyNC4wMTMsMTA5LjMzdjIwNi43MDMKCUMzMjguMDM2LDQ4OS43MzcsMzEzLjY0MSw1MDQuMTMyLDI5NS44ODMsNTA0LjEzMnoiIGRhdGEtaW5kaWNlPSIxIj48L3BhdGg+CjxwYXRoIHN0eWxlPSJmaWxsOiNGQUJFNzg7IiBkPSJNMzAzLjUxMiwxNTUuOTQ2Yy0xNS44Mi0zNC4yNzYtMjMuNjA0LTcxLjU3OC0yMy42MDQtMTA5LjMzdi02LjMxMmgtMjQuMTI5djYuMzEyCgljMCwzNy43NTIsOC4zMDksNzUuMDU0LDI0LjEyOSwxMDkuMzNjMTUuODIsMzQuMjc2LDI0LjEyOSw3MS41NzgsMjQuMTI5LDEwOS4zM3YyMDYuNzAyYzAsMTcuNzU4LTE0LjQwOCwzMi4wMTYtMzIuMTY3LDMyLjAxNgoJaDI0LjAxM2MxNy43NTgsMCwzMS4yMzMtMTQuMjU4LDMxLjIzMy0zMi4wMTZWMjY1LjI3NkMzMjcuMTE2LDIyNy41MjUsMzE5LjMzMiwxOTAuMjIzLDMwMy41MTIsMTU1Ljk0NnoiIGRhdGEtaW5kaWNlPSIyIj48L3BhdGg+CjxwYXRoIHN0eWxlPSJmaWxsOiNBQTVFMDQ7IiBkPSJNMjA4LjA0NiwxNTUuOTQ2YzE1LjgyLTM0LjI3NiwyMy42MDQtNzEuNTc4LDIzLjYwNC0xMDkuMzN2LTYuMzEyaDI0LjEyOXY2LjMxMgoJYzAsMzcuNzUyLTcuNzg0LDc1LjA1NC0yMy42MDQsMTA5LjMzcy0yMy42MDQsNzEuNTc4LTIzLjYwNCwxMDkuMzN2MjA2LjcwMmMwLDE3Ljc1OCwxMy43OTYsMzIuMDE2LDMxLjU1NSwzMi4wMTZoLTI0LjAxMwoJYy0xNy43NTgsMC0zMS42Ny0xNC4yNTgtMzEuNjctMzIuMDE2VjI2NS4yNzZDMTg0LjQ0MiwyMjcuNTI1LDE5Mi4yMjYsMTkwLjIyMywyMDguMDQ2LDE1NS45NDZ6IiBkYXRhLWluZGljZT0iMyI+PC9wYXRoPgo8ZyBkYXRhLWluZGljZT0iNCI+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojMjlBQkUyOyIgcG9pbnRzPSIyOTYuMDE5LDEzNS45MzUgMjE1Ljk3NiwxMzUuOTM1IDIyMy45ODEsOTUuOTE0IDI4OC4wMTUsOTUuOTE0IAkiIGRhdGEtaW5kaWNlPSI1Ij48L3BvbHlnb24+Cgk8cmVjdCB4PSIxODMuOTYzIiB5PSI0MTYuMDgyIiBzdHlsZT0iZmlsbDojMjlBQkUyOyIgd2lkdGg9IjE0NC4wNzkiIGhlaWdodD0iMjQuMDEzIiBkYXRhLWluZGljZT0iNiI+PC9yZWN0Pgo8L2c+CjxyZWN0IHg9IjE4My45NjMiIHk9IjMwNC4wMzEiIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiB3aWR0aD0iMTQ0LjA3OSIgaGVpZ2h0PSIxMTIuMDYyIiBkYXRhLWluZGljZT0iOCI+PC9yZWN0Pgo8Y2lyY2xlIHN0eWxlPSJmaWxsOiNDN0IyOTk7IiBjeD0iMjU2LjAwMyIgY3k9IjMwNC4wMzEiIHI9IjQwLjAyMiIgZGF0YS1pbmRpY2U9IjkiPjwvY2lyY2xlPgo8ZyBkYXRhLWluZGljZT0iMTAiPgoJPHJlY3QgeD0iMTgzLjk2MyIgeT0iMjgwLjAxOCIgc3R5bGU9ImZpbGw6IzI5QUJFMjsiIHdpZHRoPSIzMi4wMTciIGhlaWdodD0iMjQuMDEzIiBkYXRhLWluZGljZT0iMTEiPjwvcmVjdD4KCTxyZWN0IHg9IjI5Ni4wMjUiIHk9IjI4MC4wMTgiIHN0eWxlPSJmaWxsOiMyOUFCRTI7IiB3aWR0aD0iMzIuMDE3IiBoZWlnaHQ9IjI0LjAxMyIgZGF0YS1pbmRpY2U9IjEyIj48L3JlY3Q+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiMyOUFCRTI7IiBjeD0iMjU2LjAwMyIgY3k9IjMwNC4wMzEiIHI9IjE2LjAwOSIgZGF0YS1pbmRpY2U9IjEzIj48L2NpcmNsZT4KPC9nPgo8cGF0aCBkPSJNMjU1Ljk5OCwzMjcuOTAyYy0xMy4xNjYsMC0yMy44NzctMTAuNzExLTIzLjg3Ny0yMy44NzdzMTAuNzExLTIzLjg3NywyMy44NzctMjMuODc3czIzLjg3NywxMC43MTEsMjMuODc3LDIzLjg3NwoJUzI2OS4xNjMsMzI3LjkwMiwyNTUuOTk4LDMyNy45MDJ6IE0yNTUuOTk4LDI5NS44ODVjLTQuNDg5LDAtOC4xNDEsMy42NTItOC4xNDEsOC4xNDFjMCw0LjQ4OSwzLjY1Miw4LjE0MSw4LjE0MSw4LjE0MQoJYzQuNDg5LDAsOC4xNDEtMy42NTIsOC4xNDEtOC4xNDFDMjY0LjEzOSwyOTkuNTM3LDI2MC40ODYsMjk1Ljg4NSwyNTUuOTk4LDI5NS44ODV6IiBkYXRhLWluZGljZT0iMTUiPjwvcGF0aD4KPHJlY3QgeD0iMjA4LjU3NCIgeT0iMzg0LjQwMSIgd2lkdGg9Ijk1LjQ2NSIgaGVpZ2h0PSIxNS43MzYiIGRhdGEtaW5kaWNlPSIxNiI+PC9yZWN0Pgo8cmVjdCB4PSIyMjMuMjYxIiB5PSIzNjAuMjcyIiB3aWR0aD0iNjUuMDQyIiBoZWlnaHQ9IjE1LjczNiIgZGF0YS1pbmRpY2U9IjE3IiBjbGFzcz0iIj48L3JlY3Q+CjxjaXJjbGUgc3R5bGU9ImZpbGw6I0M3QjI5OTsiIGN4PSIyNTYuMDAzIiBjeT0iMTM1LjkzOSIgcj0iMTYuMDA5IiBkYXRhLWluZGljZT0iMTgiPjwvY2lyY2xlPgo8cGF0aCBkPSJNMzExLjE2NywxNTIuNjVjLTE1LjA5NC0zMi43MDYtMjMuMTI2LTY4Ljk5Ny0yMy4yNzQtMTA1LjAyMWM0LjEyMS0wLjUwNCw3Ljg1OC0yLjU5NiwxMC40NTYtNS45MjQKCWMzLjAwMS0zLjg0NCw0LjA0NC04Ljc2MywyLjg2Mi0xMy40OTRsLTIuOTM3LTExLjc1QzI5NS44NTEsNi43NjksMjg3LjE4MSwwLDI3Ny4xOTEsMGgtNDIuMzg2Yy05Ljk5LDAtMTguNjYsNi43NjktMjEuMDgyLDE2LjQ2CglsLTIuOTM3LDExLjc1Yy0xLjE4Myw0LjczMi0wLjE0LDkuNjQ5LDIuODYyLDEzLjQ5NGMyLjU5OSwzLjMyOCw2LjMzNSw1LjQyMSwxMC40NTcsNS45MjQKCWMtMC4xNDgsMzYuMDI1LTguMTgxLDcyLjMxOC0yMy4yNzUsMTA1LjAyMWMtMTYuMTgzLDM1LjA2My0yNC43MzcsNzQuMDA5LTI0LjczNywxMTIuNjI1djIwNi43MDMKCWMwLDIyLjA2OCwxNy45NTQsNDAuMDIxLDQwLjAyMSw0MC4wMjFoNzkuNzdjMjIuMDY4LDAsNDAuMDIxLTE3Ljk1Myw0MC4wMjEtNDAuMDIxVjI2NS4yNzYKCUMzMzUuOTA0LDIyNi42NTgsMzI3LjM1LDE4Ny43MTIsMzExLjE2NywxNTIuNjV6IE0yNzguNjU4LDEyOC40MjZjLTMuMTU2LTkuNDk2LTEyLjExOC0xNi4zNjgtMjIuNjYtMTYuMzY4CgljLTEwLjU0MiwwLTE5LjUwNCw2Ljg3LTIyLjY2LDE2LjM2OGgtNi4yOTNjMi41MjctNy45MzQsNC43MDUtMTUuOTg4LDYuNDk0LTI0LjEyOWg0NC45MTljMS43ODksOC4xNDEsMy45NjcsMTYuMTkzLDYuNDk0LDI0LjEyOQoJSDI3OC42NTh6IE0yNjQuMTM4LDEzNS45MzVjMCw0LjQ4OC0zLjY1Miw4LjE0MS04LjE0MSw4LjE0MWMtNC40ODksMC04LjE0MS0zLjY1Mi04LjE0MS04LjE0MWMwLTQuNDg5LDMuNjUyLTguMTQxLDguMTQxLTguMTQxCglDMjYwLjQ4NiwxMjcuNzk1LDI2NC4xMzgsMTMxLjQ0OCwyNjQuMTM4LDEzNS45MzV6IE0yNzIuMTQ2LDQ3Ljc1NGMwLjA2LDEzLjYzLDEuMjAyLDI3LjI5MywzLjM0OSw0MC44MDhoLTM4Ljk5MwoJYzIuMTQ2LTEzLjUxNiwzLjI5LTI3LjE3OCwzLjM1LTQwLjgwOEgyNzIuMTQ2eiBNMjM0LjgwNSwxNS43MzZoNDIuMzg2YzIuNzU2LDAsNS4xNDksMS44NjcsNS44MTcsNC41NDFsMi45NjUsMTEuNzM4CgljMCwwLTAuMDA2LDAuMDAxLTAuMDE5LDAuMDAxaC01OS45bDIuOTM1LTExLjczOUMyMjkuNjU3LDE3LjYwMywyMzIuMDQ5LDE1LjczNiwyMzQuODA1LDE1LjczNnogTTIxNS4xMTYsMTU5LjI0MwoJYzIuMjg1LTQuOTUxLDQuNC05Ljk4Nyw2LjM3OC0xNS4wOGgxMi4wODhjMy4zNTksOS4xMjUsMTIuMTQsMTUuNjUsMjIuNDE1LDE1LjY1YzEwLjI3NiwwLDE5LjA1Ni02LjUyNSwyMi40MTUtMTUuNjVoMTIuMDg3CgljMS45NzksNS4wOTQsNC4wOTMsMTAuMTMsNi4zNzgsMTUuMDgxYzE1LjIzNiwzMy4wMSwyMy4yODgsNjkuNjc2LDIzLjI4OCwxMDYuMDMzdjYuODcyaC0yOC40NzIKCWMtOC43NzUtOS44MTgtMjEuNTI1LTE2LjAxMy0zNS42OTktMTYuMDEzYy0xNC4xNzQsMC0yNi45MjMsNi4xOTUtMzUuNjk5LDE2LjAxM2gtMjguNDcydi02Ljg3NAoJQzE5MS44MjgsMjI4LjkyLDE5OS44ODEsMTkyLjI1NCwyMTUuMTE2LDE1OS4yNDN6IE0xOTEuODI4LDQwOC41Mjh2LTk2LjUxNGgxNi45NmMzLjgxNSwyMi42MTYsMjMuNTI2LDM5LjkwMSw0Ny4yMSwzOS45MDEKCXM0My4zOTUtMTcuMjg3LDQ3LjIxLTM5LjkwMWgxNi45NnY5Ni41MTRIMTkxLjgyOHogTTMyMC4xNjgsNDI0LjI2NHY3LjM0NGgtMTI4LjM0di03LjM0NEgzMjAuMTY4eiBNMjA4Ljc0NCwyOTYuMjc3aC0xNi45MTcKCXYtOC4zOTNoMTkuMDg3QzIwOS45NDcsMjkwLjU3OSwyMDkuMjE3LDI5My4zODUsMjA4Ljc0NCwyOTYuMjc3eiBNMjIzLjg0NCwzMDQuMDI2YzAtMTcuNzI5LDE0LjQyNC0zMi4xNTMsMzIuMTUzLTMyLjE1MwoJczMyLjE1MywxNC40MjQsMzIuMTUzLDMyLjE1M2MwLDE3LjcyOS0xNC40MjQsMzIuMTUzLTMyLjE1MywzMi4xNTNDMjM4LjI2OCwzMzYuMTc5LDIyMy44NDQsMzIxLjc1NSwyMjMuODQ0LDMwNC4wMjZ6CgkgTTMwMy4yNTEsMjk2LjI3N2MtMC40NzMtMi44OTItMS4yMDItNS42OTktMi4xNzEtOC4zOTNoMTkuMDg3djguMzkzSDMwMy4yNTF6IE0yOTUuODgzLDQ5Ni4yNjRoLTc5Ljc3CgljLTEzLjM5MSwwLTI0LjI4NS0xMC44OTUtMjQuMjg1LTI0LjI4NXYtMjQuNjM0aDEyOC4zNHYyNC42MzRDMzIwLjE2OCw0ODUuMzY5LDMwOS4yNzMsNDk2LjI2NCwyOTUuODgzLDQ5Ni4yNjR6IiBkYXRhLWluZGljZT0iMTkiIGNsYXNzPSIiPjwvcGF0aD4KPGcgZGF0YS1pbmRpY2U9IjIwIj4KPC9nPgo8ZyBkYXRhLWluZGljZT0iMjIiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSIyNCI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjI2Ij4KPC9nPgo8ZyBkYXRhLWluZGljZT0iMjgiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSIzMCI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjMyIj4KPC9nPgo8ZyBkYXRhLWluZGljZT0iMzQiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSIzNiI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjM4Ij4KPC9nPgo8ZyBkYXRhLWluZGljZT0iNDAiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSI0MiI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjQ0Ij4KPC9nPgo8ZyBkYXRhLWluZGljZT0iNDYiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSI0OCI+CjwvZz48L3N2Zz48L2c+PHRleHQgeD0iNDAuOTM4NTQwNDU4Njc5MiIgdGV4dC1hbmNob3I9ImxlZnQiIGZvbnQtZmFtaWx5PSJBdWRpb3dpZGUiIGNsYXNzPSJ0ZXh0b1ByaW5jaXBhbCIgc3R5bGU9ImZvbnQtc2l6ZTogMjAuMTMyNXB4OyBmb250LXN0eWxlOiBub3JtYWw7IiB5PSI1My4wMzMxMjUiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgLTIyLjQ3NDc0NzQ3NDc0NzQ3OCA1LjU1NTU1NTU1NTU1NTU1NSkiPk1pIGxvZ288L3RleHQ+PC9zdmc+';

    }])