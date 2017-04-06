angular.module("disenador-de-logos")

.directive('bazamSvgText', function ($compile) {
    return {
        restrict: 'AE',
        link: function (scope, element, attributes) {


            var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

            texto.setAttributeNS(null, "x", attributes.textoX);
            texto.setAttributeNS(null, "y", attributes.textoY);

            var textoNode = document.createTextNode(attributes.texto);

            texto.appendChild(textoNode);

            //Creacion del svg y agregado del texto al mismo


            element.append(attributes.icono);

            // element.children()[0].innerHTML;

            element.children().html("<g ng-class='proceso.posicion.claseG'>" + element.children().html() + "</g><g ng-class='proceso.posicion.clase'></g>");

            var svg = element.children()[0];


            svg.lastChild.appendChild(texto);
            svg.lastChild.children[0].setAttribute("text-anchor", "middle");
            svg.lastChild.children[0].setAttribute("font-family", attributes.fuente);


            //compilar dentro del contexto de angular
            $compile(svg.firstChild)(scope);
            $compile(svg.lastChild)(scope);


        }

    }

})


.directive('bazamSvgText2', function ($compile) {
    return {
        restrict: 'AE',
        /* scope: {
             bazamActivo: "=bazamActivo"
         },*/
        link: function (scope, element, attributes) {


            var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

            texto.setAttributeNS(null, "x", attributes.textoX);
            texto.setAttributeNS(null, "y", attributes.textoY);

            var textoNode = document.createTextNode(attributes.texto);

            texto.appendChild(textoNode);

            //Creacion del svg y agregado del texto al mismo

            element.append(attributes.icono);

            element.children().html("<g ng-class='proceso.posicion.claseG'>" + element.children().html() + "</g><g ng-class='proceso.posicion.clase'></g>");

            var svg = element.children()[0];

            //directiva que escucha cambios de color para los hijos del primer g

            //svg.firstChild.setAttribute("bazam-cambio-color", "")
            //svg.firstChild.setAttribute("data-color", "editor.color")


            //evento click a cada hijo del primer g tag

            angular.forEach(svg.firstChild.childNodes, function (valor, llave) {

                var llaveNueva = 'elemento' + llave;

                var fragmentoSvg = svg.firstChild.childNodes[llave];
                
                //si es nodo tipo "elemento"
                if (fragmentoSvg.nodeType == 1) {
                    
                    fragmentoSvg.setAttribute("bazam-cambio-color-fuente", "");
                    fragmentoSvg.setAttribute("data-color", "editor.color");
                    fragmentoSvg.setAttribute("data-bazam-activo", "{{editor.activo.elementos[" + llave + "]}}");
                    fragmentoSvg.setAttribute("ng-click", "editor.activar('elemento', " + llave + ")");
                
                }

            });

            // console.log(scope.bazamActivo);


            svg.lastChild.appendChild(texto);
            svg.lastChild.children[0].setAttribute("text-anchor", "middle");
            svg.lastChild.children[0].setAttribute("font-family", attributes.fuente);

            //directiva de cambio de texto
            svg.lastChild.children[0].setAttribute("bazam-cambio-texto", "");
            svg.lastChild.children[0].setAttribute("data-texto", "{{editor.logo.texto}}");

            //directiva de cambio de color del texto
            svg.lastChild.children[0].setAttribute("bazam-cambio-color-fuente", "");
            svg.lastChild.children[0].setAttribute("data-color", "editor.color");
            svg.lastChild.children[0].setAttribute("data-fuente", "editor.logo.fuente.nombre");


            svg.lastChild.children[0].setAttribute("data-bazam-activo", "{{editor.activo.texto}}");
            svg.lastChild.children[0].setAttribute("ng-click", "editor.activar('texto')");

            //compilar dentro del contexto de angular
            $compile(svg.firstChild)(scope);
            $compile(svg.lastChild)(scope);


        }

    }

})

.directive('bazamCambioTexto', function () {

    return {

        restrict: 'AE',
        link: function (scope, element, attributes) {

            attributes.$observe('texto', function (valor) {

                element.text(valor);

            })

        }



    }

})


.directive('bazamCambioColorFuente', function ($compile) {
    return {

        restrict: 'AE',
        scope: {

            color: "=color",
            fuente: "=fuente"

        },
        link: function (scope, element, attributes) {

            scope.$watch("color", function (valor) {

                if (valor) {


                    if (attributes.bazamActivo == 'si') {

                        if (scope.fuente) {

                            element.attr("style", "fill: " + valor + "; font-family: " + scope.fuente);

                        } else {

                            element.attr("style", "fill: " + valor)
                        }

                    }


                }


            })

            scope.$watch("fuente", function (valor) {

                if (valor) {

                    element.attr("style", "fill: " + scope.color + "; font-family: " + valor);

                }


            })

        }

    }

})
