                    <div class="row margin-bottom-0 lienzo scrollbar-dynamic" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
						<div class="col l2" bazam-ayuda data-titulo="Buscar" data-texto="Cambie sus preferencias y realice una nueva busqueda de elementos" data-clases="['corner-lt']" data-identificador="ayuda-buscar" data-orientacion="right" data-paso="4" bazam-pasos-ayuda>
                            <button class="boton-verde" ng-click="$parent.principal.solicitarElementos()" ng-class="{ 'loading-white': !$parent.principal.completado}" >BUSCAR</button>
                        </div>
                       	<div class="col l7">
                            <p class="text-center tercero margin-bottom-0">Selecciona los simbolos y tipografias que prefieras</p>
                        </div>
                        <div class="col l3 text-right" bazam-ayuda data-titulo="Generar" data-texto="Genere las combinaciones para su logo" data-clases="['corner-rt']" data-identificador="ayuda-generar" data-orientacion="left" data-paso="6" bazam-pasos-ayuda>
                            <button class="boton-verde" ng-click="principalOpciones.combinar(!principalOpciones.deshabilitado, $parent.principal.datosForm.$valid)" ng-class="{'deshabilitado': principalOpciones.deshabilitado || !$parent.principal.datosForm.$valid}">GENERAR OPCIONES</button>
                        </div>

                        <div class="col l12 xl9" bazam-ayuda data-titulo="Iconos y Fuentes" data-texto="Seleccione los elementos y estilos de tipografia que quiera combinar" data-clases="['corner-lt']" data-identificador="ayuda-iconos-fuentes" data-orientacion="right" data-paso="5" bazam-pasos-ayuda>
                            
                            <div  class="row cubos-logos-opciones" ng-repeat="icono in iconos = ($parent.principal.iconos) track by icono.idElemento" ng-if="$first || (($index+1) % 4) == 0">
                                
                                <div class="col l3 xl9A" ng-repeat="repeticion in [1,2,3,4] track by $index" ng-if="$parent.$index < 3 && ((iconos.length - 1) >= $index)">

                                    <div ng-class="{'seleccionado': iconos[$index].estado}" ng-click="principalOpciones.agregarElemento($index, 'iconos')">
                                        
                                        <bazam-visualizar data-svg="principalOpciones.base64.decode(iconos[$index].svg)"></bazam-visualizar>
                                
                                    </div>

                                </div>
                                
                                
                               <div class="col l3 xl3" ng-repeat="repeticion in [1,2,3,4] track by $index" ng-if="$parent.$index >= 3 && ((iconos.length - 1) >= ($parent.$index + $index + 1))" ng-click="principalOpciones.agregarElemento($parent.$parent.$index + $index + 1, 'iconos')">
                
                                    <div ng-class="{'seleccionado': iconos[$parent.$parent.$index + $index + 1].estado}">
                                        
                                        <bazam-visualizar data-svg="principalOpciones.base64.decode(iconos[$parent.$parent.$index + $index + 1].svg)"></bazam-visualizar>
                                    
                                    </div>

                                </div> 
                          
                            </div>

                        </div>

                        <div class="col l12 xl3" style="padding: 0 28px;">
                        	<div bazam-ayuda data-texto="Selecciona tres fuentes de tu gusto" data-clases="['corner-rt']" data-identificador="ayuda-fuentes" data-orientacion="left" data-retraso="3000"  class="row cubo-fuentes-opciones">
                                <div class="col l3 xl12" ng-repeat="fuente in fuentes = ($parent.principal.fuentes) track by fuente.idElemento">
                        		    <div class="texto" style="font-family: '{{fuente.nombre}}' !important" ng-click="principalOpciones.agregarElemento($index, 'fuentes')" ng-class="{'seleccionado': fuentes[$index].estado}">{{$parent.principal.datos.nombre}} </div>
                        	    </div>
                            </div>
                        </div>
                    </div>