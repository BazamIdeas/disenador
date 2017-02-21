angular.module("disenador-de-logos")

.directive('bazamSvgText', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attributes) {
            
            var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");
            texto.setAttributeNS(null, "x", attributes.textoX);
            texto.setAttributeNS(null, "y", attributes.textoY);
           
            
            var textoNode = document.createTextNode(attributes.texto);
            
            texto.appendChild(textoNode);
            
            
            element.append(attributes.icono).children().append(texto)
        }

    }

});
