<style ng-repeat="fuente in editor.fuentes">
    @font-face {
        font-family: '{{fuente.nombre}}';
        src: url('{{fuente.url}}');
    }
</style>
<div layout layout-fill id="Previsu">
    <!-- --------------------------  MENU -------------------------------------- -->
    <div class="menu" ng-switch="editor.menu">
        <div class="menu-editor md-whiteframe-2dp">
            <div class="menu-link {{elemento.estadoF}}" ng-class="elemento.estado" ng-repeat="elemento in editor.elementosMenu" ng-click="editor.efectoClick($index, elemento )">
                <div>
                    <md-icon>{{elemento.icono}}</md-icon>
                    <h4>{{elemento.nombre}}</h4>
                </div>
            </div>
            <div class="menu-link" ui-sref="proceso">
                <div>
                    <md-icon>keyboard_arrow_left</md-icon>
                    <h4>Atras</h4>
                </div>
            </div>
        </div>
        <div class="elementos" layout-fill>
            <!---------------->
            <!---- NOMBRE ----->
            <!---------------->
            <div class="elemento md-whiteframe-2dp" ng-switch-when="0">
                <div>
                    <div layout layout-align="space-between">
                        <h4>MODIFICAR NOMBRE</h4>
                    </div>
                    <md-input-container class="md-block">
                        <input name="fuente" maxlength="12" ng-required="true" ng-model="editor.logo.texto" aria-label="fuente">
                    </md-input-container>
                </div>
                <div>
                    <h4>Fuente</h4>
                    <md-select ng-model="editor.logo.fuente" placeholder="{{editor.logo.fuente.nombre}}" style="max-width: 100%;" ng-style="{'font-family' : editor.fuente}">
                        <md-option ng-value="fuente" ng-style="{'font-family' : fuente.nombre}" ng-repeat="fuente in editor.fuentes">{{fuente.nombre}}</md-option>
                    </md-select>
                </div>
                <!-- POSICIONES-->
                <div layout>
                    <div flex="70">
                        <div>
                            <h4>Mover</h4>
                        </div>
                        <div class="arrows">
                            <div class="arrow-center">
                                <button ng-mousedown="editor.modificarPosicion('y', false, 'texto')" ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_up</md-icon>
                                </button>
                            </div>
                            <div class="double-arrow">
                                <button ng-mousedown="editor.modificarPosicion('x', false , 'texto')" ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_left</md-icon>
                                </button>
                                <button ng-mousedown="editor.modificarPosicion('x', true, 'texto')" ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_right</md-icon>
                                </button>
                            </div>
                            <div class="arrow-center">
                                <button ng-mousedown="editor.modificarPosicion('y', true, 'texto')" ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_down</md-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div flex="20">
                        <div>
                            <h4>Tamaño</h4>
                        </div>
                        <div class="mas-menos">
                            <md-button ng-mousedown="editor.modificarTamano(true)" ng-mouseup="editor.detenerIntervalo()">
                                +
                            </md-button>
                            <md-button ng-mousedown=" editor.modificarTamano(false)"  ng-mouseup="editor.detenerIntervalo()">
                                -
                            </md-button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Propiedades</h4>
                    <div class="propiedades ">
                        <div class="bold " ng-click="editor.modificarPropiedadTexto( 'bold') ">
                            <p>Bold</p>
                        </div>
                        <div class="cursiva " ng-click="editor.modificarPropiedadTexto( 'cursive') ">
                            <p>Cursiva</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div layout layout-align="space-between ">
                        <h4>Edita el Color</h4>
                    </div>
                    <div layout layout-align="center ">
                        <color-picker ng-model="editor.colorTexto " class="md-whiteframe-2dp " ng-class="editor.mostrar ">
                        </color-picker>
                    </div>
                </div>
            </div>
            <!---------------->
            <!---- SLOGAN ---->
            <!---------------->
            <div class="elemento md-whiteframe-2dp " ng-switch-when="1">
                <div>
                    <div layout layout-align="space-between ">
                        <h4>MODIFICAR SLOGAN</h4>
                    </div>

                    <md-input-container class="md-block">
                        <input name="fuente" maxlength="12" ng-required="true" ng-model="editor.logo.texto" aria-label="fuente">
                    </md-input-container>
                </div>
                <div>
                    <h4>Fuente</h4>
                    <md-select ng-model="editor.logo.fuente " placeholder="{{editor.logo.fuente.nombre}} " style="max-width: 100%; " ng-style="{ 'font-family' : editor.fuente} ">
                        <md-option ng-value="fuente " ng-style="{ 'font-family' : fuente.nombre} " ng-repeat="fuente in editor.fuentes " ng-click="cambiarFuente(fuente.nombre) ">{{fuente.nombre}}</md-option>
                    </md-select>
                </div>
                <!-- POSICIONES-->
               <div layout>
                    <div flex="70">
                        <div>
                            <h4>Mover</h4>
                        </div>
                        <div class="arrows">
                            <div class="arrow-center">
                                <button>
                                    <md-icon>keyboard_arrow_up</md-icon>
                                </button>
                            </div>
                            <div class="double-arrow">
                                <button>
                                    <md-icon>keyboard_arrow_left</md-icon>
                                </button>
                                <button>
                                    <md-icon>keyboard_arrow_right</md-icon>
                                </button>
                            </div>
                            <div class="arrow-center">
                                <button>
                                    <md-icon>keyboard_arrow_down</md-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div flex="20">
                        <div>
                            <h4>Tamaño</h4>
                        </div>
                        <div class="mas-menos">
                            <md-button>
                                +
                            </md-button>
                            <md-button>
                                -
                            </md-button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Propiedades</h4>
                    <div class="propiedades ">
                        <div class="bold ">
                            <p>Bold</p>
                        </div>
                        <div class="cursiva ">
                            <p>Cursiva</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div layout layout-align="space-between ">
                        <h4>Edita el Color</h4>
                    </div>
                    <div layout layout-align="center ">
                        <color-picker ng-model="editor.color " class="md-whiteframe-2dp " ng-class="editor.mostrar ">
                        </color-picker>
                    </div>
                </div>
            </div>
            <!---------------->
            <!---- ICONO ----->
            <!---------------->
            <div class="elemento md-whiteframe-2dp" ng-switch-when="2">
                <div layout layout-align="space-between ">
                    <h4>MODIFICAR ICONO</h4>
                </div>
                <!-- POSICIONES-->
                <div layout>
                    <div flex="70">
                        <div>
                            <h4>Mover</h4>
                        </div>
                        <div class="arrows ">
                            <div class="arrow-center ">
                                <button ng-mousedown="editor.modificarPosicion( 'y', false, 'icono') " ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_up</md-icon>
                                </button>
                            </div>
                            <div class="double-arrow ">
                                <button ng-mousedown="editor.modificarPosicion( 'x', false , 'icono') " ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_left</md-icon>
                                </button>
                                <button ng-mousedown="editor.modificarPosicion( 'x', true, 'icono') " ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_right</md-icon>
                                </button>
                            </div>
                            <div class="arrow-center ">
                                <button ng-mousedown="editor.modificarPosicion( 'y', true, 'icono') " ng-mouseup="editor.detenerIntervalo()">
                                    <md-icon>keyboard_arrow_down</md-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div flex="20">
                        <div>
                            <h4>Tamaño</h4>
                        </div>
                        <div class="mas-menos">
                            <md-button ng-mousedown="editor.modificarEscala(editor.escala, true) " ng-mouseup="editor.detenerIntervalo()">
                                +
                            </md-button>
                            <md-button ng-mousedown="editor.modificarEscala(editor.escala, false) " ng-mouseup="editor.detenerIntervalo()">
                                -
                            </md-button>
                        </div>
                    </div>
                </div>
                <div>
                    <div layout layout-align="space-between ">
                        <h4>Edita el Color</h4>
                    </div>
                    <div layout layout-align="center ">
                        <color-picker ng-model="editor.colorIcono " class="md-whiteframe-2dp " ng-class="editor.mostrar ">
                        </color-picker>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Categoria</h4>
                    </div>
                    <md-select ng-model="editor.categoria ">
                        <md-option ng-value="categoria.idCategoria " ng-repeat="categoria in editor.categoriasPosibles ">{{categoria.nombreCategoria}}</md-option>
                    </md-select>
                    <div layout class="margen_superior ">
                        <div layout="row " flex layout-align="end ">
                            <md-button class="md-primary md-raised" ng-click="cancel('categoria', categoria)">Cambiar</md-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fin elemento -->
            <div class="elemento md-whiteframe-2dp" ng-switch-when="3">
                <div layout layout-align="space-between">
                    <h4>Mis Comparaciones</h4>
                </div>
                <div layout="column">
                    <bazam-visualizar class="elemento-prev-editor md-whiteframe-2dp" data-svg="comparacion " ng-repeat="comparacion in editor.comparaciones track by $index " ng-click="editor.visualizar(comparacion)">
                    </bazam-visualizar>
                </div>
            </div>
        </div>
    </div>
    <!-- --------------------------  EDITOR -------------------------------------- -->
    <div class="contenedor-editor " id="popupContainer-editor ">
        <div class="botones-editor ">
            <div>
                <md-fab-speed-dial md-open="editor.fabEditor" md-direction="left " class="md-scale " ng-click="editor.fabEditor=true " ng-mouseleave="editor.fabEditor=false ">
                    <md-fab-trigger>
                        <md-button class="md-fab md-primary ">
                            <md-tooltip md-direction="top " md-visible="tooltipVisible ">Compartir</md-tooltip>
                            <md-icon class="material-icon ">share</md-icon>
                        </md-button>
                    </md-fab-trigger>
                    <md-fab-actions>
                        <md-button aria-label="Twitter" class="md-fab md-raised md-mini ">
                            <md-tooltip md-direction="top" md-visible="tooltipVisible ">Twitter</md-tooltip>
                            <md-icon aria-label="Twitter" md-svg-src="assets/svg-no-borrar/twitter-logo-silhouette.svg" socialshare socialshare-provider="twitter"></md-icon>
                        </md-button>
                        <md-button aria-label="Facebook" class="md-fab md-raised md-mini">
                            <md-tooltip md-direction="bottom" md-visible="tooltipVisible">Facebook</md-tooltip>
                            <md-icon aria-label="facebook" md-svg-src="assets/svg-no-borrar/facebook-letter-logo.svg" socialshare socialshare-provider="facebook"></md-icon>
                        </md-button>
                        <md-button aria-label="Google Hangout " class="md-fab md-raised md-mini">
                            <md-tooltip md-direction="left " md-visible="tooltipVisible">Email</md-tooltip>
                            <md-icon aria-label="email" md-svg-src="assets/svg-no-borrar/mail.svg" socialshare socialshare-provider="email"></md-icon>
                        </md-button>
                    </md-fab-actions>
                </md-fab-speed-dial>
            </div>
            <div>
                <md-button class="md-fab md-primary " ng-click="editor.gLogo( null, 'Editable', editor.svgFinal, editor.logo.icono.tipo, editor.autorizado, editor.logo.icono.idElemento) ">
                    <md-tooltip md-direction="top " md-visible="tooltipVisible ">Guardar</md-tooltip>
                    <md-icon class=" material-icon ">save</md-icon>
                </md-button>
            </div>
            <!--
            ui-sref="metodo({ logoSvg64: editor.codificar(editor.svgFinal), idFuente: editor.logo.fuente.id, idPrecio: 1, idIcono: editor.logo.icono.idElemento, tipoLogo: editor.logo.icono.tipo})">
            -->
            <div ui-sref="metodo({ logoSvg64: editor.codificar(editor.svgFinal), idFuente: editor.logo.fuente.id, idPrecio: 1, idIcono: editor.logo.icono.idElemento, tipoLogo: editor.logo.icono.tipo})">
                <md-button class="md-fab md-primary ">
                    <md-tooltip md-direction="top " md-visible="tooltipVisible ">Comprar</md-tooltip>
                    <md-icon class="material-icon ">shopping_cart</md-icon>
                </md-button>
            </div>
            <div>
                <md-button class="md-fab md-primary " ng-click="editor.mostrarDialogo($event)">
                    <md-tooltip md-direction="top " md-visible="tooltipVisible ">Previsualizar</md-tooltip>
                    <md-icon class="material-icon ">remove_red_eye</md-icon>
                </md-button>
            </div>
            <div>
                <md-button class="md-fab md-primary " ng-click="editor.cambiarMenu( 'ayuda')">
                    <md-tooltip md-direction="top " md-visible="tooltipVisible ">Ayuda</md-tooltip>
                    <md-icon class="material-icon ">help_outline</md-icon>
                </md-button>
            </div>
            <md-sidenav class="md-sidenav-right md-whiteframe-4dp " md-component-id="right" style="width:40%; " ng-switch="editor.tipoNav ">
                <div ng-switch-when="ayuda ">
                    <md-toolbar class="transparencia ">
                        <div class="md-toolbar-tools ">
                            <div>AYUDA</div>
                        </div>
                    </md-toolbar>
                    <div>
                        <md-button class="md-raised md-primary " ng-click="editor.cambiarMenu() ">CERRAR</md-button>
                    </div>
                </div>
            </md-sidenav>
        </div>

        <div class="cont-logo-editor">
            
            <!--- directiva si se utiliza un svg nunca modificado ---->
            
            <div id="logo-share" class="logo-editor margen_superior" ng-class="editor.fondo" ng-if="!editor.restauracionIniciada">
                <bazam-svg data-svg="editor.base64(editor.logo.icono.svg)" data-color-icono="editor.colorIcono" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-tamano-fuente="editor.tamano" data-texto-posicion="editor.posicionTexto" data-escala="editor.escala" data-icono-posicion="editor.posicionIcono" data-bold="editor.propiedadesTexto.bold" data-cursive="editor.propiedadesTexto.cursive" data-color-texto="editor.colorTexto" data-svg-final="editor.svgFinal" data-comparaciones="editor.comparaciones" data-comparar="editor.comparar"></bazam-svg>

            </div>
            <!---- Directiva si se utiliza un svg modificado  --->

            
            <div id="logo-share" class="logo-editor" ng-class="editor.fondo" ng-repeat="restauracion in editor.restauraciones">
                <bazam-svg-modificado data-svg="restauracion" data-color-icono="editor.colorIcono" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-tamano-fuente="editor.tamano" data-texto-posicion="editor.posicionTexto" data-escala="editor.escala" data-icono-posicion="editor.posicionIcono" data-bold="editor.propiedadesTexto.bold" data-cursive="editor.propiedadesTexto.cursive" data-color-texto="editor.colorTexto" data-svg-final="editor.svgFinal" data-comparaciones="editor.comparaciones" data-comparar="editor.comparar"></bazam-svg-modificado>

            </div>
            <!------- directiva si existen visualizaciones ------>
            <div class="logo-editor md-whiteframe-2dp " ng-repeat="visualizacion in editor.visualizaciones "  ng-if="!editor.visualizacionUsada ">
                <bazam-visualizar data-svg="visualizacion " ng-click="editor.realizarRestauracion(visualizacion) "></bazam-visualizar>
            </div>
        </div>
        <div style="position: absolute; top: 0; ">
            <md-button class="md-raised md-primary " ng-click="editor.realizarComparacion(editor.comparar) ">
                <md-tooltip md-direction="right " md-visible="tooltipVisible ">Comparar</md-tooltip>
                <md-icon>filter</md-icon>
            </md-button>
        </div>
        <div class="tono-background " style="position: absolute; ">
            <div class="regilla " ng-click="editor.fondo='regilla' ">.</div>
            <div class="negro " ng-click="editor.fondo='negro' ">.</div>
            <div class="blanco " ng-click="editor.fondo='blanco' ">.</div>
        </div>
    </div>
</div>
