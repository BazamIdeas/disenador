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
            var nuevoScope = scope.$new()

            attributes.$observe('icono', function () {



                if (element.children()[0]) {


                    element.children().remove();

                    element.append(attributes.icono);

                    var svg = element.children()[0];

                    svg.setAttribute("bazam-guardar-comparar", "");
                    svg.setAttribute("data-guardar", attributes.guardar);
                    svg.setAttribute("data-comparadores", attributes.comparadores);
                    svg.setAttribute("data-tipo-guardar", "{{" + attributes.tipoGuardar + "}}");

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

                    $compile(svg)(nuevoScope);


                } else {
                    var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

                    texto.setAttributeNS(null, "x", attributes.textoX);
                    texto.setAttributeNS(null, "y", attributes.textoY);

                    var textoNode = document.createTextNode(attributes.texto);

                    texto.appendChild(textoNode);

                    //Creacion del svg y agregado del texto al mismo

                    element.append(attributes.icono);

                    element.children().html("<g ng-class='proceso.posicion.claseG'>" + element.children().html() + "</g><g ng-class='proceso.posicion.clase'></g>");

                    var svg = element.children()[0];

                    svg.setAttribute("bazam-guardar-comparar", "");
                    svg.setAttribute("data-guardar", attributes.guardar);
                    svg.setAttribute("data-comparadores", attributes.comparadores);
                    svg.setAttribute("data-tipo-guardar", "{{" + attributes.tipoGuardar + "}}");


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

                    $compile(svg)(nuevoScope);
                }
            })

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

.directive("bazamGuardarComparar", ["compararLogosFactory", "$base64", function (compararLogosFactory, $base64) {


    return {

        restrict: 'AE',
        scope: {

            comparadores: "=comparadores",
            guardar: "=guardar"

        },

        link: function (scope, element, attributes) {

            var cant = 0;


            var detener = scope.$watch("guardar", function (valor, viejoValor) {

                if (cant) {

                    if (valor !== viejoValor) {

                        if (element[0].tagName == "svg") {


                            var clon = element.clone();

                            //remover atributos del tag svg
                            clon.removeAttr("bazam-guardar-comparar");
                            clon.removeAttr("data-guardar");
                            clon.removeAttr("class");
                            clon.removeAttr("data-comparadores");
                            clon.removeAttr("data-tipo-guardar");


                            var svg_clonado = clon[0];

                            //remover atributos de los g globales
                            svg_clonado.firstChild.removeAttribute("ng-class");
                            svg_clonado.lastChild.removeAttribute("ng-class");


                            //remover atributos de los hijos del primer g
                            angular.forEach(svg_clonado.firstChild.childNodes, function (valor, llave) {

                                var fragmentoSvg = svg_clonado.firstChild.childNodes[llave];

                                //si es nodo tipo "elemento"
                                if (fragmentoSvg.nodeType == 1) {

                                    fragmentoSvg.removeAttribute("bazam-cambio-color-fuente");
                                    fragmentoSvg.removeAttribute("data-color");
                                    fragmentoSvg.removeAttribute("data-bazam-activo");
                                    fragmentoSvg.removeAttribute("ng-click");
                                    fragmentoSvg.removeAttribute("class");

                                }

                            })

                            //remover atributos del primer 
                            angular.forEach(svg_clonado.lastChild.childNodes, function (valor, llave) {

                                var fragmentoSvg = svg_clonado.lastChild.childNodes[llave];


                                fragmentoSvg.removeAttribute("bazam-cambio-texto");
                                fragmentoSvg.removeAttribute("data-texto");
                                fragmentoSvg.removeAttribute("bazam-cambio-color-fuente");
                                fragmentoSvg.removeAttribute("data-color");
                                fragmentoSvg.removeAttribute("data-bazam-activo");
                                fragmentoSvg.removeAttribute("data-fuente");
                                fragmentoSvg.removeAttribute("ng-click");
                                fragmentoSvg.removeAttribute("class");



                            })

                            var tipo = attributes.tipoGuardar;

                            //compararLogosFactory.definir($base64.encode(svg_clonado.outerHTML), tipo);

                            // var logosGuardados = compararLogosFactory.obtener(tipo);


                            if (tipo == "comparar") {

                                scope.comparadores.push($base64.encode(svg_clonado.outerHTML));

                            } else if (tipo == "comprar")

                            {
                                //scope.
                            }
                        }
                    }

                } else {
                    cant++;
                }

            }, true)


        }

    }



}])
