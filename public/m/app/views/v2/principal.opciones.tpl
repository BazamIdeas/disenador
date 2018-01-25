                    <div class="row margin-bottom-0 lienzo">
						<!---<div class="col l2">
                            <button class="boton-verde" ng-click="$parent.principal.solicitarElementos()" ng-class="{ 'loading-white': !$parent.principal.completado}">REFRESCAR</button>
                        </div>-->
                       	<div class="col s12">
                            
                        </div>
                        <!--<div class="col l2 text-right">
                            <button class="boton-verde" ng-click="principalOpciones.combinar(!principalOpciones.deshabilitado, $parent.principal.datosForm.$valid)" ng-class="{'deshabilitado': principalOpciones.deshabilitado || !$parent.principal.datosForm.$valid}">COMBINAR</button>
                        </div>-->

                        
                        <div ng-switch="$parent.principal.pasosFormulario">
                            <div class="col s12" ng-switch-when="4">

                                <p class="text-center tercero">Selecciona los iconos que prefieras</p>

                                <div class="row cubos-logos-opciones margin-bottom-0">

                                    <div class="col s12 m4 l3" ng-repeat="icono in iconos = ($parent.principal.iconos) track by icono.idElemento">


                                        <div ng-class="{'seleccionado': icono.estado}" ng-click="principalOpciones.agregarElemento($index, 'iconos')">

                                            <bazam-visualizar data-svg="principalOpciones.base64.decode(icono.svg)"></bazam-visualizar>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div class="col s12 m12" ng-switch-when="5">
                                <div class="row cubo-fuentes-opciones">

                                    <p class="text-center tercero">Selecciona las fuentes que prefieras</p>

                                    <div class="col s12 m3 l2" ng-repeat="fuente in fuentes = ($parent.principal.fuentes) track by fuente.idElemento">
                                        <div class="texto" style="font-family: '{{fuente.nombre}}' !important" ng-click="principalOpciones.agregarElemento($index, 'fuentes')" ng-class="{'seleccionado': fuentes[$index].estado}">{{$parent.principal.datos.nombre}} </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>