                    <div class="row margin-bottom-0 lienzo">
						<div class="col s2">
                            <button class="boton-verde">REFRESCAR</button>
                        </div>
                       	<div class="col s8">
                            <p class="text-center tercero margin-bottom-0">Selecciona las fuentes y iconos que prefieras</p>
                        </div>
                        <div class="col s2 text-right">
                            <button class="boton-verde" ng-click="principalOpciones.combinar(!principalOpciones.deshabilitado, $parent.principal.datosForm.$valid)" ng-class="{'deshabilitado': principalOpciones.deshabilitado || !$parent.principal.datosForm.$valid}">COMBINAR</button>
                        </div>

                        <div class="col s8">
                            
                            <div class="cubos-logos" ng-repeat="icono in iconos = ($parent.principal.iconos) track by $index" ng-if="$first || (($index+1) % 4) == 0">
                                
                                <div class="margin-right-20" ng-repeat="repeticion in [1,2,3,4] track by $index" ng-if="$parent.$index < 3 && ((iconos.length - 1) >= $index)" ng-click="principalOpciones.agregarElemento($index, 'iconos')" ng-class="{'seleccionado': iconos[$index].estado}">

                                    <bazam-visualizar data-svg="principalOpciones.base64.decode(iconos[$index].svg)"></bazam-visualizar>
                                
                                </div>
                                
                                
                               <div class="margin-right-20" ng-repeat="repeticion in [1,2,3,4] track by $index" ng-if="$parent.$index >= 3 && ((iconos.length - 1) >= ($parent.$index + $index + 1))" ng-click="principalOpciones.agregarElemento($parent.$parent.$index + $index + 1, 'iconos')" ng-class="{'seleccionado': iconos[$parent.$parent.$index + $index + 1].estado}">
                
                                     <bazam-visualizar data-svg="principalOpciones.base64.decode(iconos[$parent.$parent.$index + $index + 1].svg)"></bazam-visualizar>
                                    
                                </div> 
                          
                            </div>

                        </div>

                        <div class="col s4">
                        	<div class="cubo-fuentes">
                        		<div class="texto" style="font-family: '{{fuente.nombre}}' !important" ng-repeat="fuente in fuentes = ($parent.principal.fuentes) track by $index" ng-click="principalOpciones.agregarElemento($index, 'fuentes')" ng-class="{'seleccionado': fuentes[$index].estado}">{{$parent.principal.datos.nombre}} </div>
                        	</div>
                        </div>
                    </div>