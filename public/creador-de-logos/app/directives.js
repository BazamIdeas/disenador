angular.module("disenador-de-logos")

.directive('bazamSvgText', function ($compile) {
    return {
        restrict: 'AE',
        link: function (scope, element, attributes) {

            //creacion del texto

            var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

            texto.setAttributeNS(null, "x", attributes.textoX);
            texto.setAttributeNS(null, "y", attributes.textoY);

            var textoNode = document.createTextNode(attributes.texto);

            texto.appendChild(textoNode);

            //Creacion del svg y agregado del texto al mismo

            element.append(attributes.icono);

            // element.children()[0].innerHTML;

            element.children().html("<g ng-class='proceso.posicion.claseG'>" + element.children().html() + "</g>");
            element.children().append(texto);

            element.children()[0].lastChild.setAttribute("text-anchor", "middle");
            element.children()[0].lastChild.setAttribute("bazam-svg-text-pos", "");
            element.children()[0].lastChild.setAttribute("data-bazam-pos", "proceso.posicion");
            element.children()[0].lastChild.setAttribute("ng-class", "proceso.posicion.clase");

            //compilar dentro del contexto de angular
            $compile(element.children()[0].firstChild)(scope);
            $compile(element.children()[0].lastChild)(scope);


        }

    }

})

.directive('bazamSvgTextPos', function () {

    return {
        restrict: 'AE',
        scope: {

            posicion: "=bazamPos"
        },
        link: function (scope, element, attributes) {


            /*   attributes.$observe('bazamPosY', function(value) {
           
                console.log("scope:" + scope.posicion);
                console.log("element:" + element.attr("data-bazam-pos-y"));
                console.log("attr:" + attributes.bazamPosY);
                console.log("observe:" + value)
                
                
                element.attr("y", value);
               
               
  }); 



            scope.$watch("posicion", function (valor) {
                if (valor != undefined) {
                    element.attr("y", scope.posicion.y);
                    element.attr("x", scope.posicion.x)
                }
            })

*/

        }

    }

})
