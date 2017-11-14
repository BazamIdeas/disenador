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
                svg.lastChild.children[0].setAttribute("text-anchor", "inherit");
                svg.lastChild.children[0].setAttribute("font-family", attributes.fuente);


                //compilar dentro del contexto de angular
                $compile(svg.firstChild)(scope);
                $compile(svg.lastChild)(scope);


            }

        }

    })


    //////////////////////////////
    //////EDICION DEL SVG/////////
    //////////////////////////////

    .directive('bazamSvg', function () {
        return {
            restrict: 'AE',
            template: "<g data-seccion-icono></g><g data-seccion-texto></g>",
            scope: {

                svg: "=svg",
                colorTexto: "=colorTexto",
                colorIcono: "=colorIcono",
                texto: "=texto",
                fuente: "=fuente",
                tamanoFuente: "=tamanoFuente",
                textoPosicion: "=textoPosicion",
                iconoPosicion: "=iconoPosicion",
                escala: "=escala",
                cursive: "=cursive",
                bold: "=bold",
                svgFinal: "=svgFinal",
                comparaciones: "=comparaciones",
                comparar: "=comparar",
                switch: "=switch"

            },
            controller: function ($scope)

            {

                $scope.svgSaneado = $scope.svg.trim()

                var posicion1 = $scope.svgSaneado.search(">");

                //svg tag
                $scope.svgTag = $scope.svgSaneado.substr(0, posicion1 + 1) + "</svg>";

                var posicion2 = $scope.svgSaneado.substr(posicion1 + 1).search("</svg>");

                //contenido del svg
                $scope.seccionInterna = $scope.svgSaneado.substr(posicion1 + 1).substr(0, posicion2);



                //recipiente de secciones del svg original
                $scope.seccionInternaElementos = []

                //indices del elemento
                $scope.elementosIndices = []


                //division en partes del svg
                $scope.seccionInterna.trim().split(">").forEach(function (parte, index) {
                    var indiceParte = " data-indice='" + index + "'";
                    if (parte != "") { //si no es un tag de cerrar
                        if (parte.search("</") == -1) {
                            //si es un tag compuesto, ej: 
                            if (parte.search("/") == -1) {
                                $scope.seccionInternaElementos.push(parte + indiceParte + ">");
                            }
                            //si no es un tag compuesto, ej: path
                            else {
                                $scope.seccionInternaElementos.push(parte.replace("/", "") + indiceParte + "/>");
                            }
                            //si es un tag de cerrar
                        } else {
                            $scope.seccionInternaElementos.push(parte + ">");
                        }
                    }
                    $scope.elementosIndices.push(false);
                });
                //union del nuevo contenido
                $scope.seccionInterna = $scope.seccionInternaElementos.join("");

                // TAMAÑO FUENTE
                $scope.tamano = 70;

            },
            link: {
                pre: function (scope, element, attributes) {


                    
                    //encerramos el contenido en el svg
                    element.find("[data-seccion-icono], [data-seccion-texto]").wrapAll(scope.svgTag);

                    //agregamos el Style Tag al svg
                    element.children().prepend("<style>@font-face: { font-family: '" + scope.fuente.nombre + "'; src: url('" + scope.fuente.url + "')}</style>")

                    
                    //viewbox del nuevo svg
                    var viewBox = element.children().attr("viewBox").split(" ");

                    //el valor Y se aumenta 20% para permitir la entrada del texto
                    viewBox[3] = parseInt(viewBox[3]) * 1.20;

                    //posicion del texto
                    var posicionTexto = {
                        x: parseInt(viewBox[2]) / 2,
                        y: viewBox[3] * 0.95
                    }

                    //el valor X se aumenta x2
                    viewBox[2] = parseInt(viewBox[2]) * 1.2;
                    viewBox[0] = (-1 * (viewBox[2] * 0.09)) + parseInt(viewBox[0]);

                    var viewBoxFinal = viewBox.join(" ");

                    element.children().attr("viewBox", viewBoxFinal)

                    //buscamos la seccion que contendra el icono y lo agregamos
                    element.find("[data-seccion-icono]").append(scope.seccionInterna);

                    //buscamos la seccion que contendra el texto y lo agregamos
                    element.find("[data-seccion-texto]").append("<text x='" + posicionTexto.x + "' y='" + posicionTexto.y + "' text-anchor='middle' style='font-family: " + scope.fuente.nombre + ";'>" + scope.texto + "</text>");

                    //definimos el tamaño dela fuente;
                    element.find("g[data-seccion-texto] > text:first-child").css("font-size", "70px");

                    //agregamos un tag al svg para discernir si ya fue procesado
                    element.children().attr("bazam-procesado", "true");



                },
                post: function (scope, element, attributes) {

                    //reinsertamos el svg para permitir que se muestre
                    element.html(element.html());

                    //agregamos el svg a la variable de compra
                    scope.svgFinal = element.html();

                    element.find("g:last-child").on('click', function () {
                        scope.switch = 0;
                    })

                    //evento para los hijos directos de seccion-icono
                    element.find("g[data-seccion-icono] [data-indice]:not(g)").on("click", function () {
                        scope.switch = 2;
                        $(".seleccionado").removeClass("seleccionado");
                        $(this).addClass("seleccionado");

                        //obtenemos el indice que es espejo del array
                        var indiceParte = $(this).attr("data-indice");

                        //definimos en false todos los valores del array
                        scope.elementosIndices.forEach(function (valor, indice) {

                            scope.elementosIndices[indice] = false;

                        })

                        //definimos en true la seccion objetivo
                        scope.elementosIndices[indiceParte] = true;

                    })

                    ////////////////////////////////////////////
                    //vigilamos el cambio de color del icono////
                    ////////////////////////////////////////////
                    scope.$watch("colorIcono", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //buscamos el indice que esta activo
                            var indice = scope.elementosIndices.indexOf(true);

                            //cambiamos el color al correcto
                            element.find("g[data-seccion-icono] [data-indice=" + indice + "]").css("fill", nuevoValor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }



                    })


                    ////////////////////////////////////////////
                    //vigilamos el cambio de color del texto////
                    ////////////////////////////////////////////
                    scope.$watch("colorTexto", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //cambiamos el color al correcto
                            element.find("g[data-seccion-texto] > text:first-child").css("fill", nuevoValor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();


                        }
                    })

                    ////////////////////////////////////////////
                    ////////vigilamos el cambio de texto////////
                    ////////////////////////////////////////////
                    scope.$watch("texto", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //cambiamos el color al correcto
                            element.find("g[data-seccion-texto] > text:first-child").text(nuevoValor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();


                        }
                    })

                    /////////////////////////////////////////////
                    ///vigilamos el cambio de fuente del texto///
                    /////////////////////////////////////////////
                    scope.$watchCollection("fuente", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //cambiamos la font-family al correcto
                            element.find("g[data-seccion-texto] > text:first-child").css("font-family", nuevoValor.nombre);

                            element.find("style").text("<style>@font-face: { font-family: '" + scope.fuente.nombre + "'; src: url('" + scope.fuente.url + "')}</style>");



                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();


                        }

                    })


                    ///////////////////////////////////////////////////////
                    ///vigilamos el cambio de tamaño de fuente del texto///
                    ///////////////////////////////////////////////////////
                    scope.$watch("tamanoFuente", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            var tamano = nuevoValor + scope.tamano;

                            //cambiamos la font-family al correcto
                            element.find("g[data-seccion-texto] > text:first-child").css("font-size", tamano + "px");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();


                        }
                    })

                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de posicion del texto/////
                    /////////////////////////////////////////////////
                    scope.$watchCollection("textoPosicion", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {


                            element.find("g[data-seccion-texto] > text:first-child").css("transform", "translate(" + nuevoValor.x + "px," + nuevoValor.y + "px )");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }


                    })


                    ///////////////////////////////////////////////
                    ///vigilamos el cambio de tamaño del icono/////
                    ///////////////////////////////////////////////
                    scope.$watch("escala", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            element.find("g[data-seccion-icono]").css("transform", "scale(" + nuevoValor + "," + nuevoValor + ") translate(" + scope.iconoPosicion.x + "px," + scope.iconoPosicion.y + "px)");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }

                    })

                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de posicion del icono/////
                    /////////////////////////////////////////////////
                    scope.$watchCollection("iconoPosicion", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            element.find("g[data-seccion-icono]").css("transform", "scale(" + scope.escala + "," + scope.escala + ") translate(" + nuevoValor.x + "px," + nuevoValor.y + "px)");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }

                    })

                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de grosor del texto///////
                    /////////////////////////////////////////////////
                    scope.$watch("cursive", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            var cursiva = (nuevoValor) ? "italic" : "normal";

                            element.find("g[data-seccion-texto] > text:first-child").css("font-style", cursiva);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }

                    })


                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de tematica del texto/////
                    /////////////////////////////////////////////////
                    scope.$watch("bold", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            var grosor = (nuevoValor) ? "bold" : "normal";

                            element.find("g[data-seccion-texto] > text:first-child").css("font-weight", grosor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();



                        }

                    })


                    /////////////////////////////////////////////////////
                    ////// Vigilamos si debemos comparar/////////////////
                    /////////////////////////////////////////////////////
                    scope.$watch("comparar", function (nuevoValor, viejoValor) {


                        if (nuevoValor !== viejoValor) {

                            scope.comparaciones.push(scope.svgFinal);

                        }


                    })

                }
            }
        }
    })


    //////////////////////////////
    //////EDICION DEL SVG/////////
    //////////////////////////////
    .directive('bazamSvgModificado', function () {
        return {
            restrict: 'AE',
            template: "<g data-seccion-icono ></g><g data-seccion-texto></g>",
            scope: {

                svg: "=svg",
                colorTexto: "=colorTexto",
                colorIcono: "=colorIcono",
                texto: "=texto",
                fuente: "=fuente",
                tamanoFuente: "=tamanoFuente",
                textoPosicion: "=textoPosicion",
                iconoPosicion: "=iconoPosicion",
                escala: "=escala",
                cursive: "=cursive",
                bold: "=bold",
                svgFinal: "=svgFinal",
                comparaciones: "=comparaciones",
                comparar: "=comparar"

            },
            controller: function ($scope) {

                //obtenemos el nombre de la fuente 
                //$scope.fuente.nombre = $scope.svg.split("data-seccion-texto")[1].split("font-family: ")[1].split(";")[0];

                $scope.elementosIndices = [];

                //obtenemos texto del svg
                $scope.texto = $scope.svg.split("data-seccion-texto")[1].split("font-family: ")[1].split(">")[1].split("</t")[0];

                //creamos el array espejo
                $scope.svg.split('data-indice="').forEach(function (valor, indice) {

                    var indiceEspejo = valor.split('"')[0];

                    $scope.elementosIndices[indiceEspejo] = false;

                });

                //
                var atributosIconoG = $scope.svg.split("data-seccion-icono")[1].split(">")[0];


                //verificamos que [data-seccion-icono] tenga un atributo transform: scale
                if (atributosIconoG.indexOf("scale") != -1) {

                    //obtenemos un array con las escalas
                    var escalas = atributosIconoG.split("scale(")[1].split(")", 1)[0].split(",");
                    var escalaFinal = (parseFloat(escalas[0]) + parseFloat(escalas[1])) / 2;

                    //asignamos el valor de la escala del svg a la escala del scope
                    $scope.escala = escalaFinal;


                } else { //si no existe, el la escala es 1:1

                    $scope.escala = 1;
                }


                if (atributosIconoG.indexOf("translate") != -1) {
              
                    //obtenemos un array con los translate
                    var posicion = atributosIconoG.split("translate(")[1].split(")", 1)[0].split(",");

                    $scope.iconoPosicion = {

                        x: parseInt(posicion[0].split("px")[0]),
                        y: parseInt(posicion[1].split("px")[0])

                    }


                } else { //si no existe, el translate es 0,0
                
                    $scope.iconoPosicion = {
                        x: 0,
                        y: 0
                    };

                }





                //verificamos que [data-seccion-texto] tenga un atributo transform: translate
                var atributosTextoG = $scope.svg.split("data-seccion-texto")[1].split(">")[1];
                if (atributosTextoG.indexOf("translate") != -1) {

                    //obtenemos un array con los translate
                    var posicion = atributosTextoG.split("translate(")[1].split(")", 1)[0].split(",");

                    $scope.textoPosicion = {

                        x: parseInt(posicion[0].split("px")[0]),
                        y: parseInt(posicion[1].split("px")[0])

                    }
                } else { //si no existe, el translate es 0,0

                    $scope.textoPosicion = {
                        x: 0,
                        y: 0
                    };

                }








                //verificamos el tamaño de la fuente y lo actualizamos en base al svg
                $scope.tamano = parseInt($scope.tamano = $scope.svg.split("data-seccion-texto")[1].split("font-size: ")[1].split("px", 1)[0]);

                $scope.tamanoFuente = $scope.tamano - 70;





            },
            link: {
                pre: function (scope, element, attributes) {

                    element.html(scope.svg);

                },
                post: function (scope, element, attributes) {

                    //reinsertamos el svg para permitir que se muestre
                    element.html(element.html());

                    //agregamos el svg a la variable de compra
                    scope.svgFinal = element.html();

                    //evento para los hijos directos de seccion-icono
                    element.find("g[data-seccion-icono] [data-indice]:not(g)").on("click", function () {

                        //obtenemos el indice que es espejo del array
                        var indiceParte = $(this).attr("data-indice");

                        //definimos en false todos los valores del array
                        scope.elementosIndices.forEach(function (valor, indice) {

                            scope.elementosIndices[indice] = false;

                        })

                        //definimos en true la seccion objetivo
                        scope.elementosIndices[indiceParte] = true;

                    })

                    ////////////////////////////////////////////
                    //vigilamos el cambio de color del icono////
                    ////////////////////////////////////////////
                    scope.$watch("colorIcono", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //buscamos el indice que esta activo
                            var indice = scope.elementosIndices.indexOf(true);

                            //cambiamos el color al correcto
                            element.find("g[data-seccion-icono] [data-indice=" + indice + "]").css("fill", nuevoValor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }



                    })


                    ////////////////////////////////////////////
                    //vigilamos el cambio de color del texto////
                    ////////////////////////////////////////////
                    scope.$watch("colorTexto", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //cambiamos el color al correcto
                            element.find("g[data-seccion-texto] > text:first-child").css("fill", nuevoValor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();


                        }
                    })

                    ////////////////////////////////////////////
                    ////////vigilamos el cambio de texto////////
                    ////////////////////////////////////////////
                    scope.$watch("texto", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //cambiamos el color al correcto
                            element.find("g[data-seccion-texto] > text:first-child").text(nuevoValor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();


                        }
                    })

                    /////////////////////////////////////////////
                    ///vigilamos el cambio de fuente del texto///
                    /////////////////////////////////////////////
                    scope.$watchCollection("fuente", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            //cambiamos la font-family al correcto
                            element.find("g[data-seccion-texto] > text:first-child").css("font-family", nuevoValor.nombre);

                            element.find("style").text("<style>@font-face: { font-family: '" + scope.fuente.nombre + "'; src: url('" + scope.fuente.url + "')}</style>");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();


                        }

                    })


                    ///////////////////////////////////////////////////////
                    ///vigilamos el cambio de tamaño de fuente del texto///
                    ///////////////////////////////////////////////////////
                    scope.$watch("tamanoFuente", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            var tamano = nuevoValor + scope.tamano;

                            //cambiamos la font-family al correcto
                            element.find("g[data-seccion-texto] > text:first-child").css("font-size", tamano + "px");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }
                    })

                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de posicion del texto/////
                    /////////////////////////////////////////////////
                    scope.$watchCollection("textoPosicion", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {


                            element.find("g[data-seccion-texto] > text:first-child").css("transform", "translate(" + nuevoValor.x + "px," + nuevoValor.y + "px )");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }


                    })


                    ///////////////////////////////////////////////
                    ///vigilamos el cambio de tamaño del icono/////
                    ///////////////////////////////////////////////
                    scope.$watch("escala", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            element.find("g[data-seccion-icono]").css("transform", "scale(" + nuevoValor + "," + nuevoValor + ") translate(" + scope.iconoPosicion.x + "px," + scope.iconoPosicion.y + "px)");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }

                    })

                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de posicion del icono/////
                    /////////////////////////////////////////////////
                    scope.$watchCollection("iconoPosicion", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            element.find("g[data-seccion-icono]").css("transform", "scale(" + scope.escala + "," + scope.escala + ") translate(" + nuevoValor.x + "px," + nuevoValor.y + "px)");

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }

                    })

                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de grosor del texto///////
                    /////////////////////////////////////////////////
                    scope.$watch("cursive", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            var cursiva = (nuevoValor) ? "italic" : "normal";

                            element.find("g[data-seccion-texto] > text:first-child").css("font-style", cursiva);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }

                    })


                    /////////////////////////////////////////////////
                    ///vigilamos el cambio de tematica del texto/////
                    /////////////////////////////////////////////////
                    scope.$watch("bold", function (nuevoValor, viejoValor) {

                        if (nuevoValor !== viejoValor) {

                            var grosor = (nuevoValor) ? "bold" : "normal";

                            element.find("g[data-seccion-texto] > text:first-child").css("font-weight", grosor);

                            //agregamos el svg a la variable de compra
                            scope.svgFinal = element.html();

                        }

                    })


                    /////////////////////////////////////////////////////
                    ////// Vigilamos si debemos comparar/////////////////
                    /////////////////////////////////////////////////////
                    scope.$watch("comparar", function (nuevoValor, viejoValor) {


                        if (nuevoValor !== viejoValor) {


                            scope.comparaciones.push(scope.svgFinal);


                        }


                    })

                }
            }
        }
    })


    //////////////////////////////////////////
    ////VISUALIZA EL SVG SIN ACCION ALGUNA////
    //////////////////////////////////////////
    .directive('bazamVisualizar', function () {

        return {
            restrict: 'AE',
            scope: {

                svg: "=svg"

            },
            link: function (scope, element, attributes) {

                element.html(scope.svg);
                element.html(element.html());


            }
        }

    })