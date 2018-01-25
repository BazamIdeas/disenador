angular.module("administrador")

    .controller('disenadoresController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', 'monedasService', '$base64', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService, monedasService, $base64) {

        var bz = this;

        /* DATOS */
        bz.logos
        bz.disenadores = {};
        bz.vista = 0;
        bz.monedas = monedasValue;
        bz.paises = paisesValue;
        bz.monedasDisponibles = {};

        monedasService.listarMonedas().then(function (res) {
            bz.monedas = res.data;
        })

        /***************************/
        /**********LOGOS***********/
        /***************************/

        bz.listarLogos = function (v) {
            bz.listaL = !bz.listaL;
            /*
            designerService.logos().then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })
            */
        }

        bz.aprobarLogo = function (i) {
            bz.cal = !bz.cal;
            bz.modfire = i;


            designerService.aprobarLogo(datos).then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })
        }

        bz.ponerCalificacion = function (i) {
            bz.cal2 = !bz.cal2;
            bz.cal = !bz.cal;
            notificacionService.mensaje('Calificacion Modificada!');
        }

        bz.verLogo = function(logo){
            if(bz.vista == 3){
                bz.vista = 0;
            }else{
                bz.vista = 3;
            }

            bz.logoVisualizar = logo;
        }

        /***************************/
        /********DISEÑADORES********/
        /***************************/

        bz.listarDisenadores = function (v) {
            bz.listaD = !bz.listaD;
            designerService.logos(datos).then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })
        }

        bz.logosDisenador = function (id) {
            bz.listaL = !bz.listaL;

            designerService.logosDisenador(id).then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })

        }

        bz.bloquearDisenador = function (id, ) {
            bz.listaD = !bz.listaD;
            designerService.bloquearDisenador().then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })
        }

        bz.notificarDisenador = function (id) {
            bz.listaD = !bz.listaD;
            designerService.notificarDisenador().then(function (res) {

            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })
        }


        bz.mostrar = function (opcion, index, nombreDesigner) {
            if (opcion == 'logos-designer') {
                bz.vista = 1;
                bz.nombreDesigner = nombreDesigner;
            } else if (opcion == 'historial') {
                bz.vista = 2;
                bz.nombreDesigner = nombreDesigner;

                designerService.historialPagos(id).then(function (res) {

                }).catch(function (res) {
                    notificacionService.mensaje(res.data.msg);
                })

            } else if (opcion == 'calificacion-aprobados') {
                bz.cal2 = !bz.cal2;
                bz.modfire = 1;
            }
        }

        /* UTILIDADES */

        bz.modFun = function (i) {
            bz.modfire = 1;
            bz.modInit = !bz.modInit;
        }

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }


        bz.logoPrueba = 'PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHN0eWxlPkBmb250LWZhY2UgeyBmb250LWZhbWlseTogJ0F1ZGlvd2lkZSc7IHNyYzogdXJsKCcvZnVlbnRlcy9BdWRpb3dpZGUtUmVndWxhci50dGYnKX08L3N0eWxlPjxnIGNsYXNzPSJjb250ZW5lZG9yLWljb25vIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIzLjczNzM3MzczNzM3Mzc0NCAyNC40OTQ5NDk0OTQ5NDk1MDIpIj48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHdpZHRoPSIyNy4yNjUwMTU3OTI4NDY2OHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIxMS42NzM1MjM5MDI4OTMwNjYiIHk9IjM3Ljg2NzQ5MTcyMjEwNjkzNCIgdmlld0JveD0iMCAwIDUxMS45OTggNTExLjk5OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjk5OCA1MTEuOTk4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaGVpZ2h0PSIyNy4yNjUwMTU3OTI4NDY2OHB4Ij48cGF0aCBzdHlsZT0iZmlsbDojMjlBQkUyOyIgZD0iTTI4NS45NTMsMzkuODg1aC01OS45MDljLTUuMTEzLDAtOC44NjYtNC44MDYtNy42MjUtOS43NjZsMi45MzctMTEuNzUKCWMxLjU0My02LjE3Miw3LjA4OC0xMC41MDEsMTMuNDQ5LTEwLjUwMWg0Mi4zODZjNi4zNjIsMCwxMS45MDcsNC4zMywxMy40NDksMTAuNTAxbDIuOTM3LDExLjc1CglDMjk0LjgxOCwzNS4wNzksMjkxLjA2NiwzOS44ODUsMjg1Ljk1MywzOS44ODV6IiBkYXRhLWluZGljZT0iMCI+PC9wYXRoPgo8cGF0aCBzdHlsZT0iZmlsbDojRjc5MzFFOyIgZD0iTTI5NS44ODMsNTA0LjEzMmgtNzkuNzdjLTE3Ljc1OCwwLTMyLjE1NC0xNC4zOTUtMzIuMTU0LTMyLjE1NFYyNjUuMjc1CgljMC0zNy43NTEsOC4xOTItNzUuMDUzLDI0LjAxMi0xMDkuMzI5bDAuMDAxLTAuMDAxYzE1LjgyLTM0LjI3NiwyNC4wMTItNzEuNTc3LDI0LjAxMi0xMDkuMzI4di02LjczM2g0OC4wMjV2Ni43MzIKCWMwLDM3Ljc1MSw4LjE5Myw3NS4wNTMsMjQuMDEzLDEwOS4zM2wwLDBjMTUuODIsMzQuMjc2LDI0LjAxMyw3MS41NzgsMjQuMDEzLDEwOS4zM3YyMDYuNzAzCglDMzI4LjAzNiw0ODkuNzM3LDMxMy42NDEsNTA0LjEzMiwyOTUuODgzLDUwNC4xMzJ6IiBkYXRhLWluZGljZT0iMSIgY2xhc3M9IiI+PC9wYXRoPgo8cGF0aCBzdHlsZT0iZmlsbDojRkFCRTc4OyIgZD0iTTMwMy41MTIsMTU1Ljk0NmMtMTUuODItMzQuMjc2LTIzLjYwNC03MS41NzgtMjMuNjA0LTEwOS4zM3YtNi4zMTJoLTI0LjEyOXY2LjMxMgoJYzAsMzcuNzUyLDguMzA5LDc1LjA1NCwyNC4xMjksMTA5LjMzYzE1LjgyLDM0LjI3NiwyNC4xMjksNzEuNTc4LDI0LjEyOSwxMDkuMzN2MjA2LjcwMmMwLDE3Ljc1OC0xNC40MDgsMzIuMDE2LTMyLjE2NywzMi4wMTYKCWgyNC4wMTNjMTcuNzU4LDAsMzEuMjMzLTE0LjI1OCwzMS4yMzMtMzIuMDE2VjI2NS4yNzZDMzI3LjExNiwyMjcuNTI1LDMxOS4zMzIsMTkwLjIyMywzMDMuNTEyLDE1NS45NDZ6IiBkYXRhLWluZGljZT0iMiI+PC9wYXRoPgo8cGF0aCBzdHlsZT0iZmlsbDojQUE1RTA0OyIgZD0iTTIwOC4wNDYsMTU1Ljk0NmMxNS44Mi0zNC4yNzYsMjMuNjA0LTcxLjU3OCwyMy42MDQtMTA5LjMzdi02LjMxMmgyNC4xMjl2Ni4zMTIKCWMwLDM3Ljc1Mi03Ljc4NCw3NS4wNTQtMjMuNjA0LDEwOS4zM3MtMjMuNjA0LDcxLjU3OC0yMy42MDQsMTA5LjMzdjIwNi43MDJjMCwxNy43NTgsMTMuNzk2LDMyLjAxNiwzMS41NTUsMzIuMDE2aC0yNC4wMTMKCWMtMTcuNzU4LDAtMzEuNjctMTQuMjU4LTMxLjY3LTMyLjAxNlYyNjUuMjc2QzE4NC40NDIsMjI3LjUyNSwxOTIuMjI2LDE5MC4yMjMsMjA4LjA0NiwxNTUuOTQ2eiIgZGF0YS1pbmRpY2U9IjMiPjwvcGF0aD4KPGcgZGF0YS1pbmRpY2U9IjQiPgoJPHBvbHlnb24gc3R5bGU9ImZpbGw6IzI5QUJFMjsiIHBvaW50cz0iMjk2LjAxOSwxMzUuOTM1IDIxNS45NzYsMTM1LjkzNSAyMjMuOTgxLDk1LjkxNCAyODguMDE1LDk1LjkxNCAJIiBkYXRhLWluZGljZT0iNSI+PC9wb2x5Z29uPgoJPHJlY3QgeD0iMTgzLjk2MyIgeT0iNDE2LjA4MiIgc3R5bGU9ImZpbGw6IzI5QUJFMjsiIHdpZHRoPSIxNDQuMDc5IiBoZWlnaHQ9IjI0LjAxMyIgZGF0YS1pbmRpY2U9IjYiPjwvcmVjdD4KPC9nPgo8cmVjdCB4PSIxODMuOTYzIiB5PSIzMDQuMDMxIiBzdHlsZT0iZmlsbDojRkZGRkZGOyIgd2lkdGg9IjE0NC4wNzkiIGhlaWdodD0iMTEyLjA2MiIgZGF0YS1pbmRpY2U9IjgiPjwvcmVjdD4KPGNpcmNsZSBzdHlsZT0iZmlsbDojQzdCMjk5OyIgY3g9IjI1Ni4wMDMiIGN5PSIzMDQuMDMxIiByPSI0MC4wMjIiIGRhdGEtaW5kaWNlPSI5Ij48L2NpcmNsZT4KPGcgZGF0YS1pbmRpY2U9IjEwIj4KCTxyZWN0IHg9IjE4My45NjMiIHk9IjI4MC4wMTgiIHN0eWxlPSJmaWxsOiMyOUFCRTI7IiB3aWR0aD0iMzIuMDE3IiBoZWlnaHQ9IjI0LjAxMyIgZGF0YS1pbmRpY2U9IjExIj48L3JlY3Q+Cgk8cmVjdCB4PSIyOTYuMDI1IiB5PSIyODAuMDE4IiBzdHlsZT0iZmlsbDojMjlBQkUyOyIgd2lkdGg9IjMyLjAxNyIgaGVpZ2h0PSIyNC4wMTMiIGRhdGEtaW5kaWNlPSIxMiI+PC9yZWN0PgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMjlBQkUyOyIgY3g9IjI1Ni4wMDMiIGN5PSIzMDQuMDMxIiByPSIxNi4wMDkiIGRhdGEtaW5kaWNlPSIxMyIgY2xhc3M9IiI+PC9jaXJjbGU+CjwvZz4KPHBhdGggZD0iTTI1NS45OTgsMzI3LjkwMmMtMTMuMTY2LDAtMjMuODc3LTEwLjcxMS0yMy44NzctMjMuODc3czEwLjcxMS0yMy44NzcsMjMuODc3LTIzLjg3N3MyMy44NzcsMTAuNzExLDIzLjg3NywyMy44NzcKCVMyNjkuMTYzLDMyNy45MDIsMjU1Ljk5OCwzMjcuOTAyeiBNMjU1Ljk5OCwyOTUuODg1Yy00LjQ4OSwwLTguMTQxLDMuNjUyLTguMTQxLDguMTQxYzAsNC40ODksMy42NTIsOC4xNDEsOC4xNDEsOC4xNDEKCWM0LjQ4OSwwLDguMTQxLTMuNjUyLDguMTQxLTguMTQxQzI2NC4xMzksMjk5LjUzNywyNjAuNDg2LDI5NS44ODUsMjU1Ljk5OCwyOTUuODg1eiIgZGF0YS1pbmRpY2U9IjE1Ij48L3BhdGg+CjxyZWN0IHg9IjIwOC41NzQiIHk9IjM4NC40MDEiIHdpZHRoPSI5NS40NjUiIGhlaWdodD0iMTUuNzM2IiBkYXRhLWluZGljZT0iMTYiPjwvcmVjdD4KPHJlY3QgeD0iMjIzLjI2MSIgeT0iMzYwLjI3MiIgd2lkdGg9IjY1LjA0MiIgaGVpZ2h0PSIxNS43MzYiIGRhdGEtaW5kaWNlPSIxNyIgY2xhc3M9IiI+PC9yZWN0Pgo8Y2lyY2xlIHN0eWxlPSJmaWxsOiNDN0IyOTk7IiBjeD0iMjU2LjAwMyIgY3k9IjEzNS45MzkiIHI9IjE2LjAwOSIgZGF0YS1pbmRpY2U9IjE4Ij48L2NpcmNsZT4KPHBhdGggZD0iTTMxMS4xNjcsMTUyLjY1Yy0xNS4wOTQtMzIuNzA2LTIzLjEyNi02OC45OTctMjMuMjc0LTEwNS4wMjFjNC4xMjEtMC41MDQsNy44NTgtMi41OTYsMTAuNDU2LTUuOTI0CgljMy4wMDEtMy44NDQsNC4wNDQtOC43NjMsMi44NjItMTMuNDk0bC0yLjkzNy0xMS43NUMyOTUuODUxLDYuNzY5LDI4Ny4xODEsMCwyNzcuMTkxLDBoLTQyLjM4NmMtOS45OSwwLTE4LjY2LDYuNzY5LTIxLjA4MiwxNi40NgoJbC0yLjkzNywxMS43NWMtMS4xODMsNC43MzItMC4xNCw5LjY0OSwyLjg2MiwxMy40OTRjMi41OTksMy4zMjgsNi4zMzUsNS40MjEsMTAuNDU3LDUuOTI0CgljLTAuMTQ4LDM2LjAyNS04LjE4MSw3Mi4zMTgtMjMuMjc1LDEwNS4wMjFjLTE2LjE4MywzNS4wNjMtMjQuNzM3LDc0LjAwOS0yNC43MzcsMTEyLjYyNXYyMDYuNzAzCgljMCwyMi4wNjgsMTcuOTU0LDQwLjAyMSw0MC4wMjEsNDAuMDIxaDc5Ljc3YzIyLjA2OCwwLDQwLjAyMS0xNy45NTMsNDAuMDIxLTQwLjAyMVYyNjUuMjc2CglDMzM1LjkwNCwyMjYuNjU4LDMyNy4zNSwxODcuNzEyLDMxMS4xNjcsMTUyLjY1eiBNMjc4LjY1OCwxMjguNDI2Yy0zLjE1Ni05LjQ5Ni0xMi4xMTgtMTYuMzY4LTIyLjY2LTE2LjM2OAoJYy0xMC41NDIsMC0xOS41MDQsNi44Ny0yMi42NiwxNi4zNjhoLTYuMjkzYzIuNTI3LTcuOTM0LDQuNzA1LTE1Ljk4OCw2LjQ5NC0yNC4xMjloNDQuOTE5YzEuNzg5LDguMTQxLDMuOTY3LDE2LjE5Myw2LjQ5NCwyNC4xMjkKCUgyNzguNjU4eiBNMjY0LjEzOCwxMzUuOTM1YzAsNC40ODgtMy42NTIsOC4xNDEtOC4xNDEsOC4xNDFjLTQuNDg5LDAtOC4xNDEtMy42NTItOC4xNDEtOC4xNDFjMC00LjQ4OSwzLjY1Mi04LjE0MSw4LjE0MS04LjE0MQoJQzI2MC40ODYsMTI3Ljc5NSwyNjQuMTM4LDEzMS40NDgsMjY0LjEzOCwxMzUuOTM1eiBNMjcyLjE0Niw0Ny43NTRjMC4wNiwxMy42MywxLjIwMiwyNy4yOTMsMy4zNDksNDAuODA4aC0zOC45OTMKCWMyLjE0Ni0xMy41MTYsMy4yOS0yNy4xNzgsMy4zNS00MC44MDhIMjcyLjE0NnogTTIzNC44MDUsMTUuNzM2aDQyLjM4NmMyLjc1NiwwLDUuMTQ5LDEuODY3LDUuODE3LDQuNTQxbDIuOTY1LDExLjczOAoJYzAsMC0wLjAwNiwwLjAwMS0wLjAxOSwwLjAwMWgtNTkuOWwyLjkzNS0xMS43MzlDMjI5LjY1NywxNy42MDMsMjMyLjA0OSwxNS43MzYsMjM0LjgwNSwxNS43MzZ6IE0yMTUuMTE2LDE1OS4yNDMKCWMyLjI4NS00Ljk1MSw0LjQtOS45ODcsNi4zNzgtMTUuMDhoMTIuMDg4YzMuMzU5LDkuMTI1LDEyLjE0LDE1LjY1LDIyLjQxNSwxNS42NWMxMC4yNzYsMCwxOS4wNTYtNi41MjUsMjIuNDE1LTE1LjY1aDEyLjA4NwoJYzEuOTc5LDUuMDk0LDQuMDkzLDEwLjEzLDYuMzc4LDE1LjA4MWMxNS4yMzYsMzMuMDEsMjMuMjg4LDY5LjY3NiwyMy4yODgsMTA2LjAzM3Y2Ljg3MmgtMjguNDcyCgljLTguNzc1LTkuODE4LTIxLjUyNS0xNi4wMTMtMzUuNjk5LTE2LjAxM2MtMTQuMTc0LDAtMjYuOTIzLDYuMTk1LTM1LjY5OSwxNi4wMTNoLTI4LjQ3MnYtNi44NzQKCUMxOTEuODI4LDIyOC45MiwxOTkuODgxLDE5Mi4yNTQsMjE1LjExNiwxNTkuMjQzeiBNMTkxLjgyOCw0MDguNTI4di05Ni41MTRoMTYuOTZjMy44MTUsMjIuNjE2LDIzLjUyNiwzOS45MDEsNDcuMjEsMzkuOTAxCglzNDMuMzk1LTE3LjI4Nyw0Ny4yMS0zOS45MDFoMTYuOTZ2OTYuNTE0SDE5MS44Mjh6IE0zMjAuMTY4LDQyNC4yNjR2Ny4zNDRoLTEyOC4zNHYtNy4zNDRIMzIwLjE2OHogTTIwOC43NDQsMjk2LjI3N2gtMTYuOTE3Cgl2LTguMzkzaDE5LjA4N0MyMDkuOTQ3LDI5MC41NzksMjA5LjIxNywyOTMuMzg1LDIwOC43NDQsMjk2LjI3N3ogTTIyMy44NDQsMzA0LjAyNmMwLTE3LjcyOSwxNC40MjQtMzIuMTUzLDMyLjE1My0zMi4xNTMKCXMzMi4xNTMsMTQuNDI0LDMyLjE1MywzMi4xNTNjMCwxNy43MjktMTQuNDI0LDMyLjE1My0zMi4xNTMsMzIuMTUzQzIzOC4yNjgsMzM2LjE3OSwyMjMuODQ0LDMyMS43NTUsMjIzLjg0NCwzMDQuMDI2egoJIE0zMDMuMjUxLDI5Ni4yNzdjLTAuNDczLTIuODkyLTEuMjAyLTUuNjk5LTIuMTcxLTguMzkzaDE5LjA4N3Y4LjM5M0gzMDMuMjUxeiBNMjk1Ljg4Myw0OTYuMjY0aC03OS43NwoJYy0xMy4zOTEsMC0yNC4yODUtMTAuODk1LTI0LjI4NS0yNC4yODV2LTI0LjYzNGgxMjguMzR2MjQuNjM0QzMyMC4xNjgsNDg1LjM2OSwzMDkuMjczLDQ5Ni4yNjQsMjk1Ljg4Myw0OTYuMjY0eiIgZGF0YS1pbmRpY2U9IjE5IiBjbGFzcz0iIj48L3BhdGg+CjxnIGRhdGEtaW5kaWNlPSIyMCI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjIyIj4KPC9nPgo8ZyBkYXRhLWluZGljZT0iMjQiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSIyNiI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjI4Ij4KPC9nPgo8ZyBkYXRhLWluZGljZT0iMzAiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSIzMiI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjM0Ij4KPC9nPgo8ZyBkYXRhLWluZGljZT0iMzYiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSIzOCI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjQwIj4KPC9nPgo8ZyBkYXRhLWluZGljZT0iNDIiPgo8L2c+CjxnIGRhdGEtaW5kaWNlPSI0NCI+CjwvZz4KPGcgZGF0YS1pbmRpY2U9IjQ2Ij4KPC9nPgo8ZyBkYXRhLWluZGljZT0iNDgiPgo8L2c+PC9zdmc+PC9nPjx0ZXh0IHg9IjQwLjkzODU0MDQ1ODY3OTIiIHRleHQtYW5jaG9yPSJsZWZ0IiBmb250LWZhbWlseT0iQXVkaW93aWRlIiBjbGFzcz0idGV4dG9QcmluY2lwYWwiIHN0eWxlPSJmb250LXNpemU6IDIwLjEzMjVweDsgZm9udC1zdHlsZTogbm9ybWFsOyIgeT0iNTMuMDMzMTI1IiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIC0zMS41NjU2NTY1NjU2NTY1NjggLTQuMDQwNDA0MDQwNDA0MDQxNikiPk1pIGxvZ288L3RleHQ+PC9zdmc+';

    }])