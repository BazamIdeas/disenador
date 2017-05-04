<style ng-repeat="fuente in editor.fuentes">
    @font-face {
        font-family: '{{fuente.nombre}}';
        src: url('{{fuente.url}}');
    }

</style>
<div layout layout-fill>
    
   

    <!-- --------------------------  MENU -------------------------------------- -->

    <div class="menu" ng-switch="editor.menu">
        <div class="menu-editor md-whiteframe-2dp">
            <div class="menu-link" ng-click="editor.menuItem(1)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>font_download</md-icon>
                    <h4>Nombre</h4>
                </div>
            </div>

            <div class="menu-link" ng-click="editor.menuItem(4)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>font_download</md-icon>
                    <h4>Slogan</h4>
                </div>
            </div>
            <div class="menu-link" ng-click="editor.menuItem(2)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>stars</md-icon>
                    <h4>Icono</h4>
                </div>
            </div>
            <div class="menu-link" ng-click="editor.menuItem(3)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>color_lens</md-icon>
                    <h4>Colores</h4>
                </div>
            </div>
            <div class="menu-link" ng-click="editor.menuItem(6)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>filter</md-icon>
                    <h4>Comparaciones</h4>
                </div>
            </div>

            <div class="menu-link" ui-sref="proceso">
                <div>
                    <md-icon>arrow_back</md-icon>
                    <h4>Atras</h4>
                </div>
            </div>
        </div>

        <div class="elementos" layout-fill>
            <div class="elemento md-whiteframe-2dp" ng-switch-when="1">
                <div>
                    <div layout layout-align="space-between">
                        <h4>Texto</h4>
                        <!-- <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon> -->
                    </div>
                    <md-input-container class="md-block">
                        <input name="fuente" maxlength="12" ng-required="true" ng-model="editor.logo.texto">
                    </md-input-container>
                </div>

                <div>
                    <h4>Fuente</h4>
                    <md-select ng-model="editor.logo.fuente" placeholder="{{editor.logo.fuente.nombre}}" style="max-width: 100%;" ng-style="{'font-family' : editor.fuente}">
                        <md-option ng-value="fuente" ng-style="{'font-family' : fuente.nombre}" ng-repeat="fuente in editor.fuentes" ng-click="cambiarFuente(fuente.nombre)">{{fuente.nombre}}</md-option>
                    </md-select>
                </div>

                <div>
                    <h4>Tamaño</h4>
                    <div layout layout-align="center">
                        <md-slider flex="90" md-discrete ng-model="editor.nombre.tamano" step="1" min="1" max="30" aria-label="rating">
                        </md-slider>
                    </div>
                </div>

                <div>
                    <h4>Posición</h4>
                    <div class="x-y ">
                        <div layout>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1">X</span>
                            </div>
                            <md-slider flex="70" md-discrete ng-model="editor.nombre.x" step="1" min="1" max="200" aria-label="rating">
                            </md-slider>
                            <span flex> </span>
                        </div>

                        <div layout>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1"> Y</span>
                            </div>
                            <md-slider flex="70" md-discrete ng-model="editor.nombre.y" step="1" min="1" max="200" aria-label="rating">
                            </md-slider>
                            <span flex> </span>
                        </div>

                    </div>
                </div>
                <div>
                    <h4>Propiedades</h4>
                    <div class="propiedades">
                        <div class="bold">
                            <p>Bold</p>
                        </div>
                        <div class="cursiva">
                            <p>Cursiva</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fin elemento -->
            <div class="elemento md-whiteframe-2dp" ng-switch-when="4">
                <div>
                    <div layout layout-align="space-between">
                        <h4>Texto</h4>
                        <!-- <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon> -->
                    </div>
                    <md-input-container class="md-block">
                        <input name="fuente" maxlength="12" ng-required="true" ng-model="editor.logo.texto">
                    </md-input-container>
                </div>

                <div>
                    <h4>Fuente</h4>
                    <md-select ng-model="editor.logo.fuente" placeholder="{{editor.logo.fuente.nombre}}" style="max-width: 100%;" ng-style="{'font-family' : editor.fuente}">
                        <md-option ng-value="fuente" ng-style="{'font-family' : fuente.nombre}" ng-repeat="fuente in editor.fuentes" ng-click="cambiarFuente(fuente.nombre)">{{fuente.nombre}}</md-option>
                    </md-select>
                </div>

                <div>
                    <h4>Tamaño</h4>
                    <div layout layout-align="center center">
                        <md-slider flex="90" md-discrete ng-model="editor.slogan.tamano" step="1" min="1" max="20" aria-label="rating">
                        </md-slider>
                    </div>
                </div>

                <div>
                    <h4>Posición</h4>
                    <div class="x-y ">
                        <div layout>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1">X</span>
                            </div>
                            <md-slider flex="70" md-discrete ng-model="editor.nombre.x" step="1" min="1" max="200" aria-label="rating">
                            </md-slider>
                            <span flex> </span>
                        </div>

                        <div layout>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1"> Y</span>
                            </div>
                            <md-slider flex="70" md-discrete ng-model="editor.nombre.y" step="1" min="1" max="200" aria-label="rating">
                            </md-slider>
                            <span flex> </span>
                        </div>

                    </div>
                </div>

                <div>
                    <h4>Propiedades</h4>
                    <div class="propiedades">
                        <div class="bold">
                            <p>Bold</p>
                        </div>
                        <div class="cursiva">
                            <p>Cursiva</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fin elemento -->

            <div class="elemento md-whiteframe-2dp" ng-switch-when="2">
                <div layout layout-align="space-between">
                    <h4>Posición</h4>
                    <!-- <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon> -->
                </div>

                <div>
                    <div class="x-y ">
                        <div layout>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1">X</span>
                            </div>
                            <md-slider flex="70" md-discrete ng-model="editor.logo.x" step="1" min="1" max="200" aria-label="rating">
                            </md-slider>
                            <span flex> </span>
                        </div>

                        <div layout>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1"> Y</span>
                            </div>
                            <md-slider flex="70" md-discrete ng-model="editor.logo.y" step="1" min="1" max="200" aria-label="rating">
                            </md-slider>
                            <span flex> </span>
                        </div>

                    </div>

                    <div>
                        <h4>Categoria</h4>
                    </div>

                    <md-select ng-model="editor.categoria">
                        <md-option ng-value="categoria.idCategoria" ng-repeat="categoria in editor.categoriasPosibles">{{categoria.nombreCategoria}}</md-option>
                    </md-select>

                    <div layout class="margen_superior">
                        <div layout="row" flex layout-align="end">
                            <md-button class="md-primary  md-raised" ng-click="cancel('categoria', categoria)">Cambiar</md-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fin elemento -->

            <div class="elemento md-whiteframe-2dp" ng-switch-when="3">
                <div layout layout-align="space-between">
                    <h4>Edita el Color</h4>
                    <!-- <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon> -->
                </div>
                <div layout layout-align="center">
                    <color-picker ng-model="editor.color" class="md-whiteframe-2dp" ng-class="editor.mostrar">
                    </color-picker>
                </div>
                <p class="elemento-texto-ayuda">*Selecciona el elemento al que quieres cambiar de color</p>
            </div>

            <!-- Fin elemento -->

            <div class="elemento md-whiteframe-2dp" ng-switch-when="6">
                <div layout layout-align="space-between">
                    <h4>Mis Comparaciones</h4>
                    <!-- <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon> -->
                </div>

                <div class="elemento-prev-editor">
                    <md-icon ng-repeat="comparador in editor.comparadores track by $index" class="logo_comparar icono md-whiteframe-2dp" md-svg-src="data:image/svg+xml;base64,{{comparador}}" ng-click="editor.recuperar(comparador)"></md-icon>
                </div>
            </div>
        </div>
    </div>

    <!-- --------------------------  EDITOR -------------------------------------- -->


    <div class="contenedor-editor" id="popupContainer-editor">
        <div class="botones-editor">
            <div>
                <md-fab-speed-dial md-open="editor.fabEditor" md-direction="left" class="md-scale" ng-click="editor.fabEditor=true" ng-mouseleave="editor.fabEditor=false">
                    <md-fab-trigger>
                        <md-button class="md-fab md-primary">
                            <md-tooltip md-direction="top" md-visible="tooltipVisible">Compartir</md-tooltip>
                            <md-icon class="material-icon">share</md-icon>
                        </md-button>
                    </md-fab-trigger>

                    <md-fab-actions>
                        <md-button aria-label="Twitter" class="md-fab md-raised md-mini">
                            <md-tooltip md-direction="top" md-visible="tooltipVisible">Twitter</md-tooltip>
                            <md-icon aria-label="Twitter" md-svg-src="assets/svg-no-borrar/twitter-logo-silhouette.svg" socialshare socialshare-provider="twitter"></md-icon>
                        </md-button>
                        <md-button aria-label="Facebook" class="md-fab md-raised md-mini">
                            <md-tooltip md-direction="bottom" md-visible="tooltipVisible">Facebook</md-tooltip>
                            <md-icon aria-label="facebook" md-svg-src="assets/svg-no-borrar/facebook-letter-logo.svg" socialshare socialshare-provider="facebook"></md-icon>
                        </md-button>
                        <md-button aria-label="Google Hangout" class="md-fab md-raised md-mini">
                            <md-tooltip md-direction="left" md-visible="tooltipVisible">Email</md-tooltip>
                            <md-icon aria-label="email" md-svg-src="assets/svg-no-borrar/mail.svg" socialshare socialshare-provider="email"></md-icon>
                        </md-button>
                    </md-fab-actions>
                </md-fab-speed-dial>
            </div>
            <div>
                <md-button class="md-fab md-primary" ng-click="editor.gLogo( null, 'Editable', editor.logo.icono.svg, editor.logo.icono.tipo, 1, editor.logo.icono.idElemento, editor.autorizado)">
                    <md-tooltip md-direction="top" md-visible="tooltipVisible">Guardar</md-tooltip>
                    <md-icon class=" material-icon">save</md-icon>
                </md-button>
            </div>
<!--             logoSvg64: 'jvgdjvjdgsjgsrh', idFuente: null, idPrecio: 1, idIcono: null, tipoLogo: null-->
            <div ui-sref="metodo({ logoSvg64: editor.logo.icono.svg, idFuente: editor.logo.fuente.id, idPrecio: 1, idIcono: editor.logo.icono.idElemento, tipoLogo: editor.logo.icono.tipo})">
                <md-button class="md-fab md-primary">
                    <md-tooltip md-direction="top" md-visible="tooltipVisible">Comprar</md-tooltip>
                    <md-icon class="material-icon">shopping_cart</md-icon>
                </md-button>
            </div>

            <div>
                <md-button class="md-fab md-primary">
                    <md-tooltip md-direction="top" md-visible="tooltipVisible">Ayuda</md-tooltip>
                    <md-icon ng-click="editor.cambiarMenu()" class="material-icon">help_outline</md-icon>
                </md-button>
            </div>
            
            <md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="right">
                <md-toolbar class="transparencia">
                    <div class="md-toolbar-tools">
                        <div>AYUDA</div>
                    </div>
                </md-toolbar>
                <div>
                    <md-button class="md-primary md-hue-2" ng-click="editor.cambiarMenu()">CERRAR</md-button>
                </div>
            </md-sidenav>
        </div>
        <div class="cont-logo-editor" ng-class="editor.fondo">
            <div id="logo-share" class="logo-editor">
                <bazam-svg-text-2 class="logo_grande_editor" bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo" data-guardar="editor.guardarComparar" data-comparadores="editor.comparadores" data-tipo-guardar="editor.tipoGuardar"></bazam-svg-text-2>
            </div>
        </div>
        <div style="position: absolute;top: 7%;" ui-sref="previsualizar({datos: editor.logo.icono.svg})">
            <md-button class="md-raised md-primary" >
                <md-tooltip md-direction="top" md-visible="tooltipVisible">Previsualizar</md-tooltip>
                <md-icon>remove_red_eye</md-icon>
            </md-button>
        </div>
        <div style="position: absolute; top: 0;">
            <md-button class="md-raised md-primary"  ng-click="editor.guardar('comparar')">
                <md-tooltip md-direction="right" md-visible="tooltipVisible">Comparar</md-tooltip>
                <md-icon>filter</md-icon>
            </md-button>
        </div>

        <div class="tono-background" style="position: absolute;">
            <div class="negro" ng-click="editor.fondo='negro'">.</div>
            <div class="blanco" ng-click="editor.fondo='blanco'">.</div>
        </div>
    </div>
</div>
