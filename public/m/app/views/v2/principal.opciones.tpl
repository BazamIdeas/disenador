                    <div class="row margin-bottom-0 lienzo">
						<!---<div class="col l2">
                            <button class="boton-verde" ng-click="$parent.principal.solicitarElementos()" ng-class="{ 'loading-white': !$parent.principal.completado}">REFRESCAR</button>
                        </div>-->
                       	<div class="col s12">
                            <p class="text-center tercero">Selecciona las fuentes y iconos que prefieras</p>
                        </div>
                        <!--<div class="col l2 text-right">
                            <button class="boton-verde" ng-click="principalOpciones.combinar(!principalOpciones.deshabilitado, $parent.principal.datosForm.$valid)" ng-class="{'deshabilitado': principalOpciones.deshabilitado || !$parent.principal.datosForm.$valid}">COMBINAR</button>
                        </div>-->

                        
                        <div ng-switch="$parent.principal.pasosFormulario">
                            <div class="col s12" ng-switch-when="4">

                                <div class="row cubos-logos-opciones margin-bottom-0" ng-repeat="icono in iconos = ($parent.principal.iconos) track by icono.idElemento" ng-if="$first || (($index+1) % 4) == 0">

                                    <div class="col s12 m4 l3" ng-repeat="repeticion in [1,2,3,4] track by $index" ng-if="$parent.$index < 3 && ((iconos.length - 1) >= $index)">

                                        <div ng-class="{'seleccionado': iconos[$index].estado}" ng-click="principalOpciones.agregarElemento($index, 'iconos')">

                                            <bazam-visualizar data-svg="principalOpciones.base64.decode(iconos[$index].svg)"></bazam-visualizar>

                                        </div>

                                    </div>


                                   <div class="col s12 m4 l3" ng-repeat="repeticion in [1,2,3,4] track by $index" ng-if="$parent.$index >= 3 && ((iconos.length - 1) >= ($parent.$index + $index + 1))" ng-click="principalOpciones.agregarElemento($parent.$parent.$index + $index + 1, 'iconos')">

                                        <div ng-class="{'seleccionado': iconos[$parent.$parent.$index + $index + 1].estado}">

                                            <bazam-visualizar data-svg="principalOpciones.base64.decode(iconos[$parent.$parent.$index + $index + 1].svg)"></bazam-visualizar>

                                        </div>

                                    </div> 

                                </div>

                            </div>

                            <div class="col s12 m12" ng-switch-when="5">
                                <div class="row cubo-fuentes-opciones">
                                    <div class="col s12 m3 l2" ng-repeat="fuente in fuentes = ($parent.principal.fuentes) track by fuente.idElemento">
                                        <div class="texto" style="font-family: '{{fuente.nombre}}' !important" ng-click="principalOpciones.agregarElemento($index, 'fuentes')" ng-class="{'seleccionado': fuentes[$index].estado}">{{$parent.principal.datos.nombre}} </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>