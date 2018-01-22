angular.module("disenador-de-logos")

    .directive('bazamSvgText', function () {
        return {
            restrict: 'AE',
            link: function (scope, element, attributes) {

                var tamanoBase = 200;

                ////////////////////////////////////////////////////////////
                //////Insertamos el SVG del icono dentro del SVG padre//////
                ////////////////////////////////////////////////////////////

                element[0].innerHTML = "<svg  viewBox='0 0 " + tamanoBase + " " + tamanoBase + "'>" + attributes.icono + "</svg>";

                var svgIcono = element[0].children[0].children[0];

                svgIcono.setAttribute('height', (tamanoBase / 2) + 'px');

                /////////////////////////////////////////
                ////////creamos el elemento Text/////////
                /////////////////////////////////////////

                var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

                texto.setAttributeNS(null, "x", (tamanoBase / 2));

                var textoNode = document.createTextNode(attributes.texto);

                texto.appendChild(textoNode);

                element[0].children[0].appendChild(texto);

                var svgTexto = element[0].children[0].children[1];

                svgTexto.style.fontSize = (tamanoBase / 2) + "px";
                svgTexto.setAttribute("text-anchor", "middle");
                svgTexto.setAttribute("font-family", attributes.fuente);

                //////////////////////////////////////////////////////////////////////
                ////ajustamos el tamaño del texto en relacion al tamaño del icono/////
                //////////////////////////////////////////////////////////////////////

                
                while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

                    svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

                }

                ///////////////////////////////////
                /////centramos los elementos///////
                ///////////////////////////////////

                var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + parseFloat(svgTexto.style.fontSize))) / 2);

                svgIcono.y.baseVal.value = paddingTopIcono;

                var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + (parseFloat(svgTexto.style.fontSize) / 1.5)) + "px";

                svgTexto.setAttribute("y", paddingTopText);
                
                if ((parseFloat(svgTexto.style.fontSize) + svgIcono.height.baseVal.value) >= tamanoBase) {

                    while ((parseFloat(svgTexto.style.fontSize) + svgIcono.height.baseVal.value) >= tamanoBase) {

                        svgIcono.setAttribute('height', (parseFloat(svgIcono.getAttribute("height")) * 0.95) + 'px');

                        svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

                    }

                    var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + parseFloat(svgTexto.style.fontSize))) / 2);

                    svgIcono.y.baseVal.value = paddingTopIcono;

                    var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + (parseFloat(svgTexto.style.fontSize) / 1.5)) + "px";

                    svgTexto.setAttribute("y", paddingTopText);

                }


            }

        }

    })


    //////////////////////////////
    //////EDICION DEL SVG/////////
    //////////////////////////////

    .directive('bazamSvg', ["$rootScope", function ($rootScope) {
        return {
            restrict: 'AE',
            scope: {

                svg: "=svg",
                texto: "=texto",
                fuente: "=fuente",
                svgFinal: "=svgFinal",
                idLogo: "=idLogo",
                idPadre: "=idPadre",
                eslogan: "=eslogan"


            },
            controller: function ($scope)

            {
                if (!$scope.idLogo && !$scope.idPadre) { //si no es un logo previamente guardado
                    $scope.svgSaneado = $scope.svg.trim()

                    var posicion1 = $scope.svgSaneado.search(">");

                    //svg tag
                    $scope.svgTagIncompleto = $scope.svgSaneado.substr(0, posicion1 + 1);

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

                    $scope.svgTag = $scope.svgTagIncompleto + $scope.seccionInterna + "</svg>"

                } else if ($scope.idLogo || $scope.idPadre) { //si es un logo previamente guardado

                    $scope.elementosIndices = []

                }

            },
            link: {
                pre: function (scope, element, attributes) {

                    var tamanoBase = 100;

                    if (!scope.idLogo && !scope.idPadre) { // si no es un logo guardado previamente


                        ////////////////////////////////////////////////////////////
                        //////Insertamos el SVG del icono dentro del SVG padre//////
                        ////////////////////////////////////////////////////////////

                        element[0].innerHTML = "<svg viewBox='0 0 " + tamanoBase + " " + tamanoBase + "'><g class='contenedor-icono'>" + scope.svgTag + "</g></svg>";

                        var svgIcono = element[0].children[0].children[0].children[0];

                        svgIcono.setAttribute('height', (tamanoBase / 2) + 'px')

                        /////////////////////////////////////////
                        ////////creamos el elemento Text/////////
                        /////////////////////////////////////////

                        var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

                        texto.setAttributeNS(null, "x", (tamanoBase / 2));

                        var textoNode = document.createTextNode(scope.texto);

                        texto.appendChild(textoNode);

                        element[0].children[0].appendChild(texto);

                        var svgTexto = element[0].children[0].children[1];

                        svgTexto.style.fontSize = (tamanoBase / 2) + "px";
                        svgTexto.setAttribute("text-anchor", "middle");
                        svgTexto.setAttribute("font-family", scope.fuente.nombre);
                        svgTexto.setAttribute("class", "textoPrincipal");

                        //////////////////////////////////////////////////////////////////////
                        ////ajustamos el tamaño del texto en relacion al tamaño del icono/////
                        //////////////////////////////////////////////////////////////////////

                        while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

                            svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

                        }

                        ///////////////////////////////////
                        /////centramos los elementos///////
                        ///////////////////////////////////

                        var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + parseFloat(svgTexto.style.fontSize))) / 2);

                        svgIcono.y.baseVal.value = paddingTopIcono;

                        var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + (parseFloat(svgTexto.style.fontSize) / 1.5)) + "px"

                        svgTexto.setAttribute("y", paddingTopText);

                        if ((parseFloat(svgTexto.style.fontSize) + svgIcono.height.baseVal.value) >= tamanoBase) {

                            while ((parseFloat(svgTexto.style.fontSize) + svgIcono.height.baseVal.value) >= tamanoBase) {

                                svgIcono.setAttribute('height', (parseFloat(svgIcono.getAttribute("height")) * 0.95) + 'px');

                                svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

                            }

                            var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + parseFloat(svgTexto.style.fontSize))) / 2);

                            svgIcono.y.baseVal.value = paddingTopIcono;

                            var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + (parseFloat(svgTexto.style.fontSize) / 1.5)) + "px";

                            svgTexto.setAttribute("y", paddingTopText);

                        }


                        //agregamos el Style Tag al svg
                        element.children().prepend("<style> @font-face { font-family: '" + scope.fuente.nombre + "'; src: url('" + scope.fuente.url + "')}  </style>")

                    } else if (scope.idLogo || scope.idPadre) { // si es un logo previamenteguardado
                        
                        element.html(scope.svg);
                        
                        element.find("g.contenedor-icono > svg [data-indice]").each(function (indice) {

                            scope.elementosIndices[parseInt(this.getAttribute("data-indice"))] = false;

                        })
                        
                        
                        scope.texto = element.find("text.textoPrincipal").text();
                        
                        if(element.find("text.eslogan").length){
                            
                            
                             scope.eslogan = element.find("text.eslogan").text();
                        }


                    }

                },
                post: function (scope, element, attributes) {

                    //reinsertamos el svg para permitir que se muestre
                    element.html(element.html());

                    scope.svgFinal = element.html();
                    
                    var fuentes = {
                        principal: scope.fuente,
                        eslogan: null                        
                    }               
                    
                    

                    //evento para los hijos directos de seccion-icono

                    //element.find("g[data-seccion-icono] [data-indice]:not(g)").on("click", function () {
                    $("bazam-svg").on("click", "g.contenedor-icono > svg :not(g)", function () {

                        angular.element(document.querySelector(".seleccionado")).removeClass("seleccionado");
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
                    ///////////// cambio de color //////////////
                    ////////////////////////////////////////////
                    scope.$on("editor:color", function (evento, datos) {

                        if (datos.objetivo == 'icono') {
                            //buscamos el indice que esta activo
                            var indice = scope.elementosIndices.indexOf(true);

                            //cambiamos el color al correcto
                            element.find("[data-indice=" + indice + "]").css("fill", datos.color);

                        } else if (datos.objetivo == 'texto' || datos.objetivo == 'eslogan') {

                            var selector = datos.objetivo == 'eslogan' ? "text.eslogan" : "text.textoPrincipal";
                            element.find(selector).css("fill", datos.color);

                        }

                        obtenerSVGFinal();
                    })



                    ////////////////////////////////////////////
                    ////////vigilamos el cambio de texto////////
                    ////////////////////////////////////////////

                    scope.$on("editor:texto", function (evento, texto) {
                        
                        textoFinal = texto.texto;
                        
                        var selector = !texto.eslogan ? ".textoPrincipal" : ".eslogan";
                        
                        element.find(selector).text(textoFinal);
                        obtenerSVGFinal();

                    })

                    /////////////////////////////////////////////
                    ///vigilamos el cambio de fuente del texto///
                    /////////////////////////////////////////////
                    
                    scope.$on("editor:fuente", function (evento, datos) {
        
                        
                        var selector = datos.objetivo == 'texto' ? "text.textoPrincipal" : "text.eslogan";
                        var keyFuente = datos.objetivo == 'texto' ? "principal" : "eslogan";
                        
                        fuentes[keyFuente] = datos.fuente;
                        
                        var htmlStyle = "";
                        
                        
                        
                        if(fuentes.principal && fuentes.eslogan){
                            
                            htmlStyle = "@font-face { font-family: '" + fuentes.principal.nombre + "'; src: url('" + fuentes.principal.url + "')}\n @font-face { font-family: '" + fuentes.eslogan.nombre + "'; src: url('" + fuentes.eslogan.url + "')}";
                            
                        } else if(fuentes.principal) {
                            
                            htmlStyle = "@font-face { font-family: '" + fuentes.principal.nombre + "'; src: url('" + fuentes.principal.url + "')}";
                            
                        }
                        
                        //cambiamos la font-family al correcto
                        
                        element.find(selector).attr("font-family", datos.fuente.nombre);   

                        element.children().children("style").html(htmlStyle);

                        obtenerSVGFinal();

                    })

                    /////////////////////////////////////////////
                    /////vigilamos las propiedades del texto/////
                    /////////////////////////////////////////////

                    scope.$on("editor:propiedad", function (evento, propiedad) {

                        var selector = propiedad.eslogan ? "text.eslogan": "text.textoPrincipal";
                        
                        if (propiedad.propiedad == 'bold') {

                            var grosor = element.find(selector).attr("font-weight") == "bold" ? "normal" : "bold";

                            //cambiamos la font-weight al correcto
                            element.find(selector).attr("font-weight", grosor);

                        } else if (propiedad.propiedad == 'cursive') {

                            var estilo = element.find(selector)[0].style.fontStyle == "oblique" ? "normal" : "oblique";

                            //cambiamos la font-weight al correcto
                            element.find(selector).css("font-style", estilo);

                        }

                        obtenerSVGFinal();
                    })


                    /////////////////////////////////////////////
                    ///////vigilamos el cambio de tamaño/////////
                    /////////////////////////////////////////////

                    scope.$on("editor:tamano", function (evento, datos) {


                        if (datos.objetivo == 'texto' || datos.objetivo == 'eslogan') {
                            
                            
                            var selector = datos.objetivo == "eslogan" ? "text.eslogan" : "text.textoPrincipal";
                            var texto = element.find(selector);

                            if (datos.accion) {

                                var tamano = (parseFloat(texto.css("font-size")) + 1) + "px";

                            } else if (!datos.accion) {

                                var tamano = (parseFloat(texto.css("font-size")) - 1) + "px";

                            }

                            texto.css("font-size", tamano);

                        } else if (datos.objetivo == 'icono') {

                            var icono = element.find("g.contenedor-icono > svg");

                            var alto = parseFloat(icono.attr("height"));
                            var ancho = icono.attr("width") ? parseFloat(icono.attr("width")) : null;

                            if (datos.accion) {

                                var altoFinal = alto + 1;
                                var anchoFinal = ancho ? ancho + 1 : null;

                            } else if (!datos.accion) {

                                var altoFinal = alto - 1;
                                var anchoFinal = ancho ? ancho - 1 : null;

                            }

                            icono.attr("height", altoFinal + "px");

                            if (anchoFinal) {

                                icono.attr("width", anchoFinal + "px");

                            }
                        }

                        obtenerSVGFinal();

                    })



                    /////////////////////////////////////////////
                    ///////////vigilamos el movimiento///////////
                    /////////////////////////////////////////////


                    var selectedElement = null;
                    var currentX = 0;
                    var currentY = 0;
                    var currentMatrix = 0;

                    var intermediador = true;

                    $("bazam-svg").on("mousedown", "text.eslogan, text.textoPrincipal, g.contenedor-icono", function (evento) {

                        intermediador = false;

                        if (!$(this).attr("transform")) {

                            $(this).attr("transform", "matrix(1 0 0 1 0 0)");

                        }

                        $(this).attr("movimiento-bz", true);

                        selectedElement = evento.target;

                        currentX = evento.clientX;

                        currentY = evento.clientY;

                        currentMatrix = $(this).attr("transform").slice(7, -1).split(' ');

                        for (var i = 0; i < currentMatrix.length; i++) {

                            currentMatrix[i] = parseFloat(currentMatrix[i]);

                        }

                    })

                    $("bazam-svg").on("mousemove", "text.eslogan[movimiento-bz], text.textoPrincipal[movimiento-bz], g.contenedor-icono[movimiento-bz]", function (evento) {


                        if ($("[movimiento-bz]").length) {

                            dx = evento.clientX - currentX;
                            dy = evento.clientY - currentY;

                            var svgPadre = element[0].children[0];

                            var relacionX = (svgPadre.getClientRects()[0].width / parseFloat(element.children().attr("viewBox").split(" ")[2]));

                            var relacionY = (svgPadre.getClientRects()[0].height / parseFloat(element.children().attr("viewBox").split(" ")[3]));
                            
                           
                            
                            currentMatrix[4] += (dx / relacionY);
                            currentMatrix[5] += (dy / relacionX);


                            newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
                            
                          
                            
                            $(this).attr("transform", newMatrix);
                            currentX = evento.clientX;
                            currentY = evento.clientY;


                        };

                    });

                    angular.element(document.querySelector("body")).mouseup(function (evento) {

                        $("text.textoPrincipal, g.contenedor-icono, text.eslogan").removeAttr("movimiento-bz");

                        var clon = angular.element(document.querySelector("bazam-svg")).clone();

                        clon.find(".seleccionado").removeClass("seleccionado");
                        
                        scope.$apply(function() {
                            scope.svgFinal = clon.html();
                        })
                        intermediador = true;

                    });


                    angular.element(document.querySelector(".editor")).mouseup(function () {


                        if (intermediador) {

                            element.find(".seleccionado").removeClass("seleccionado");

                        }





                    })



                    ///////////////////////////////////////////
                    //////////////COMPARACION//////////////////
                    ///////////////////////////////////////////


                    scope.$on("editor:comparar", function (evento, datos) {

                        $rootScope.$broadcast("directiva:comparar", {
                            svg: element.html(),
                            creacion: Date.now()
                        });

                    })


                    /////////////////////////////////////////
                    //////////////ORIENTACION////////////////
                    /////////////////////////////////////////



                    scope.$on("editor:orientacion", function (evento, orientacion) {

                        var tamanoBase = 100;

                        if (orientacion == 'horizontal') {


                            var alturaSVG = tamanoBase;
                            var anchoSVG = tamanoBase;

                            var svgIcono = element.find("g.contenedor-icono > svg")[0];

                            svgIcono.setAttribute("height", (alturaSVG * 0.75) + "px");
                            svgIcono.setAttribute("width", (alturaSVG * 0.75) + "px");
                            svgIcono.parentElement.setAttribute("transform", '');


                            /////////////////////////////////////////
                            ////////creamos el elemento Text/////////
                            /////////////////////////////////////////

                            var svgTexto = element.find("text.textoPrincipal")[0];
                            var texto = element.find("text.textoPrincipal").text();

                            svgTexto.style.fontSize = ((alturaSVG * 0.75) / 2) + "px";
                            svgTexto.setAttribute("text-anchor", "left");
                            svgTexto.setAttribute("transform", '');
                            //////////////////////////////////////////////////////////////////////
                            ////ajustamos el tamaño del texto en relacion al tamaño del icono/////
                            //////////////////////////////////////////////////////////////////////

                            var anchoViewBox = parseInt(element[0].children[0].getAttribute("viewBox").split(" ")[3]);

                            while ((svgIcono.width.baseVal.value + (anchoSVG * 0.05) + svgTexto.getComputedTextLength()) > (anchoViewBox * 0.80)) {

                                svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";
                                svgIcono.setAttribute("width", (svgIcono.width.baseVal.value * 0.95) + "px");
                                svgIcono.setAttribute("height", (svgIcono.height.baseVal.value * 0.95) + "px");

                            }

                            ///////////////////////////////////
                            /////centramos los elementos///////
                            ///////////////////////////////////

                            //anchoSVG - (svgIcono.width.baseVal.value + (anchoSVG * 0.05) + svgTexto.getComputedTextLength())

                            var totalEspacioIconoFuente = (svgIcono.width.baseVal.value + (anchoSVG * 0.05) + svgTexto.getComputedTextLength());

                            var paddingLeft = (anchoSVG - totalEspacioIconoFuente) / 2;


                            svgIcono.setAttribute("y", (alturaSVG / 2) - (svgIcono.height.baseVal.value / 2));
                            svgIcono.setAttribute("x", paddingLeft);
                            svgTexto.setAttribute("x", paddingLeft + (svgIcono.width.baseVal.value + (anchoSVG * 0.05)));
                            svgTexto.setAttribute("y", (alturaSVG / 2) + (parseFloat(svgTexto.style.fontSize) / 4));
                            
                            //SI EXISTE EL ESLOGAN
                               
                            if(element.find("text.eslogan").length){
                                
                                var eslogan = element.find("text.eslogan")[0];
                               
                                eslogan.setAttribute("transform", '');
                                eslogan.setAttribute("text-anchor", "left");
                                
                           
                                eslogan.style.fontSize = svgTexto.style.fontSize;
                                
                                while((eslogan.getComputedTextLength() > (svgTexto.getComputedTextLength() * 0.8))){
                                    
                                                                 
                                    eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";
                                   
                                }
                                
                                
                                
                                eslogan.setAttribute("x", (paddingLeft + (svgIcono.width.baseVal.value + (anchoSVG * 0.05))) * 1.15);
                                eslogan.setAttribute("y", (alturaSVG / 1.7));
                                
                            }

                            

                        } else if (orientacion == 'vertical') {


                            ////////////////////////////////////////////////////////////
                            //////Insertamos el SVG del icono dentro del SVG padre//////
                            ////////////////////////////////////////////////////////////


                            var svgIcono = element.find("g.contenedor-icono > svg")[0];

                            svgIcono.setAttribute('height', (tamanoBase / 2) + 'px');
                            svgIcono.removeAttribute("width");
                            svgIcono.removeAttribute("x");
                            svgIcono.parentElement.setAttribute("transform", '')

                            /////////////////////////////////////////
                            ////////creamos el elemento Text/////////
                            /////////////////////////////////////////

                            var svgTexto = element.find("text.textoPrincipal")[0];

                            svgTexto.style.fontSize = (tamanoBase / 2) + "px";
                            svgTexto.setAttribute("text-anchor", "middle");

                            svgTexto.setAttribute("transform", '');
                            svgTexto.setAttribute("x", tamanoBase / 2);

                            //////////////////////////////////////////////////////////////////////
                            ////ajustamos el tamaño del texto en relacion al tamaño del icono/////
                            //////////////////////////////////////////////////////////////////////

                            while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

                                svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

                            }

                            ///////////////////////////////////
                            /////centramos los elementos///////
                            ///////////////////////////////////

                            var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + parseFloat(svgTexto.style.fontSize))) / 2);

                            svgIcono.setAttribute("y", paddingTopIcono);

                            var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + (parseFloat(svgTexto.style.fontSize) / 1.5)) + "px"

                            svgTexto.setAttribute("y", paddingTopText);

                            if ((parseFloat(svgTexto.style.fontSize) + svgIcono.height.baseVal.value) >= tamanoBase) {

                                while ((parseFloat(svgTexto.style.fontSize) + svgIcono.height.baseVal.value) >= tamanoBase) {

                                    svgIcono.setAttribute('height', (parseFloat(svgIcono.getAttribute("height")) * 0.95) + 'px');

                                    svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

                                }

                                var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + parseFloat(svgTexto.style.fontSize))) / 2);


                                svgIcono.setAttribute("y", paddingTopIcono);

                                paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + (parseFloat(svgTexto.style.fontSize) / 1.5)) + "px";

                                svgTexto.setAttribute("y", paddingTopText);

                            }
                            
                            
                           if(element.find("text.eslogan").length){
                                
                                var eslogan = element.find("text.eslogan")[0];
                               
                                eslogan.setAttribute("transform", '');
                                eslogan.setAttribute("text-anchor", "middle");
                                
                           
                                eslogan.style.fontSize = svgTexto.style.fontSize;
                                
                                while((eslogan.getComputedTextLength() > (svgTexto.getComputedTextLength() * 0.8))){
                                    
                                                                 
                                    eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";
                                   
                                }
                                
                                
                                
                            
                                eslogan.setAttribute("y", (parseFloat(paddingTopText) * 1.1) + "px");
                                eslogan.setAttribute("x", (tamanoBase / 2));
                                
                            }

                        }

                        obtenerSVGFinal();
                    })


                    ////////////////////////////////
                    ///////////REEMPLAZAR///////////
                    ////////////////////////////////

                    scope.$on("editor:reemplazar", function (evento, icono) {

                        var iconoSVG = element.find("g.contenedor-icono > svg");

                        var x = iconoSVG.attr("x");
                        var y = iconoSVG.attr("y");


                        var heightIcono = iconoSVG.attr("height");
                        var widthIcono = iconoSVG.attr("width");
                        var transform = iconoSVG.attr("transform");

                        iconoSVG.parent().html(icono);

                        var iconoSVGcambiado = element.find("g.contenedor-icono > svg");

                        iconoSVGcambiado.attr("x", x);
                        iconoSVGcambiado.attr("y", y);
                        iconoSVGcambiado.attr("height", heightIcono);

                        if (widthIcono) {

                            iconoSVGcambiado.attr("width", widthIcono);

                        }

                        if (transform) {

                            iconoSVGcambiado.attr("transform", transform);
                        }

                        var indices = [];
                        var seccionInternaElementos = [];

                        //division en partes del svg
                        iconoSVGcambiado.html().trim().split(">").forEach(function (parte, index) {
                            var indiceParte = " data-indice='" + index + "'";
                            if (parte != "") { //si no es un tag de cerrar
                                if (parte.search("</") == -1) {
                                    //si es un tag compuesto, ej: 
                                    if (parte.search("/") == -1) {
                                        seccionInternaElementos.push(parte + indiceParte + ">");
                                    }
                                    //si no es un tag compuesto, ej: path
                                    else {
                                        seccionInternaElementos.push(parte.replace("/", "") + indiceParte + "/>");
                                    }
                                    //si es un tag de cerrar
                                } else {
                                    seccionInternaElementos.push(parte + ">");
                                }
                            }
                            seccionInternaElementos.push(false);
                        });
                        //union del nuevo contenido
                        iconoSVGcambiado.html(seccionInternaElementos.join(""));

                        scope.elementosIndices = indices;

                        obtenerSVGFinal();

                    })


                    ////////////////////////////////
                    ///////////RESTAURAR////////////
                    ////////////////////////////////

                    scope.$on("editor:restaurar", function (evento, svg) {

                        element.html(svg);

                        var indices = [];

                        //division en partes del svg
                        element.find("g.contenedor-icono > svg [data-indice]").each(function (indice) {

                            indices[parseInt(this.getAttribute("data-indice"))] = false;

                        })

                        element.find(".seleccionado").removeClass("seleccionado");

                        scope.elementosIndices = indices;

                        var texto = element.find("text.textoPrincipal");         
                        scope.texto = texto.text();
                        
                        if(element.find("text.eslogan").length){
                            var eslogan = element.find("text.eslogan");
                            scope.eslogan = eslogan.text();
                            $rootScope.$broadcast("directiva:restaurarEslogan", {accion: true, fuente: eslogan.attr("font-family")});
                        } else { 
                            $rootScope.$broadcast("directiva:restaurarEslogan", {accion: false});
                        }

                        /*var nuevaFuente = {
                            url: angular.element(document.querySelector("bazam-svg > svg > style")).text().split("url('")[1].split("')")[0],
                            nombre: texto.attr("font-family")

                        }*/

                        //$rootScope.$broadcast("directiva:fuente", nuevaFuente);

                        //scope.fuente = nuevaFuente;


                        obtenerSVGFinal();

                    })


                    scope.$on("editor:planes", function () {

                        $rootScope.$broadcast("directiva:planes", scope.svgFinal);

                    })
                    
                    
                    scope.$on("editor:agregarEslogan", function (evento, datos) {

                        if(!element.find(".eslogan").length){
                            
                            var tamanoBase = 100;
                            
                            var textoEslogan = document.createElementNS("http://www.w3.org/2000/svg", "text");

                            textoEslogan.setAttributeNS(null, "x", tamanoBase/2);
                            textoEslogan.setAttributeNS(null, "y", tamanoBase*0.9);

                            var textoNodeEslogan = document.createTextNode(datos.eslogan);

                            textoEslogan.appendChild(textoNodeEslogan);
          
                            element.children()[0].appendChild(textoEslogan);
                            
                            var svgEslogan = element.children()[0].children[3];
                            
                            //var textoPrincipal = element.find("text.textoPrincipal");
     
                            svgEslogan.style.fontSize = (tamanoBase*0.1) + "px";
                            svgEslogan.setAttribute("text-anchor", "middle");
                            svgEslogan.setAttribute("font-family", datos.fuente.nombre);
                            svgEslogan.setAttribute("class", "eslogan");
     
                        }
                        
                        obtenerSVGFinal();

                    })
                    

                    var obtenerSVGFinal = function () {
                        
                        var elemento = element.clone()

                        //elemento.find("[data-indice]").removeAttr("data-indice");
                        elemento.find(".seleccionado").removeClass("seleccionado");

                        //scope.$apply(function() {
                            scope.svgFinal = elemento.html();
                        //});
                        
                        
                    }


                }
            }
        }
    }])


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

    /////////////////////////////////////////////
    //////REDIRECCIONAR EN CAMBIO DE TAMAÑO//////
    /////////////////////////////////////////////

    .directive('bazamRedireccionar', function ($window, $location) {

        return {
            restrict: 'AE',
            link: function (scope, element, attributes) {

                if(true){
                    
                    if($window.innerWidth < 1024){
                       
                      $window.location = "/m" + $location.url();
                    }
                    
                }
                
                angular.element(window).resize(function(){
                                     
                    if($window.innerWidth < 1024){
                       
                      $window.location = "/m" + $location.url();
                    }
                    
                })

            }
        }

    })
