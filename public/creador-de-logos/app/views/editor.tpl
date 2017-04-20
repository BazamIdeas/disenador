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
                    <h4>Texto</h4>
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
            <div class="menu-link" ng-click="editor.menuItem(5)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>remove_red_eye</md-icon>
                    <h4>Previsualizar</h4>
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

                    <md-select ng-model="categoria">
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

            <div class="elemento md-whiteframe-2dp" ng-switch-when="5">
                <div layout layout-align="space-between">
                    <h4>Previsualizar</h4>
                    <!-- <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon> -->
                </div>

                <div class="elemento-prev">
                    <div class="md-whiteframe-2dp layout-padding logo_previsualizar" >
                        <bazam-svg-text-2 bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo" data-guardar="editor.guardarComparar" data-comparadores="editor.comparadores" data-tipo-guardar="editor.tipoGuardar"></bazam-svg-text-2>
                    </div>
                    <div class="md-whiteframe-2dp layout-padding logo_previsualizar" >
                        <bazam-svg-text-2 bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo" data-guardar="editor.guardarComparar" data-comparadores="editor.comparadores" data-tipo-guardar="editor.tipoGuardar"></bazam-svg-text-2>
                    </div>
                    <div class="md-whiteframe-2dp layout-padding logo_previsualizar" >
                        <bazam-svg-text-2 bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo" data-guardar="editor.guardarComparar" data-comparadores="editor.comparadores" data-tipo-guardar="editor.tipoGuardar"></bazam-svg-text-2>
                    </div>
                    <div class="md-whiteframe-2dp layout-padding logo_previsualizar" >
                        <bazam-svg-text-2 bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo" data-guardar="editor.guardarComparar" data-comparadores="editor.comparadores" data-tipo-guardar="editor.tipoGuardar"></bazam-svg-text-2>
                    </div>
                </div>
            </div>

            <!-- Fin elemento -->

            <div class="elemento md-whiteframe-2dp" ng-switch-when="6">
                <div layout layout-align="space-between">
                    <h4>Mis Comparaciones</h4>
                    <!-- <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon> -->
                </div>

                <div class="elemento-prev">
                    <md-icon ng-repeat="comparador in editor.comparadores track by $index" class="logo_icon icono" md-svg-src="data:image/svg+xml;base64,{{comparador}}" ng-click="editor.recuperar(comparador)"></md-icon>
                </div>
            </div>
        </div>
    </div>

    <!-- --------------------------  EDITOR -------------------------------------- -->


    <div class="contenedor-editor" id="popupContainer-editor">
        <div class="botones-editor">
            <div>
                <md-fab-speed-dial md-open="editor.fabEditor" md-direction="left" ng-class="md-scale" ng-click="editor.fabEditor=true" ng-mouseleave="editor.fabEditor=false">
                    <md-fab-trigger>
                        <md-button class="md-fab md-primary">
                            <md-tooltip md-direction="top" md-visible="tooltipVisible">Compartir</md-tooltip>
                            <md-icon class="material-icon">share</md-icon>
                        </md-button>
                    </md-fab-trigger>

                    <md-fab-actions>
                        <md-button aria-label="Twitter" class="md-fab md-raised md-mini ">
                            <md-icon aria-label="Twitter" md-svg-src="/app/assets/svg-no-borrar/twitter-logo-silhouette.svg"></md-icon>
                        </md-button>
                        <md-button aria-label="Facebook" class="md-fab md-raised md-mini">
                            <md-icon aria-label="Facebook">share</md-icon>
                        </md-button>
                        <md-button aria-label="Google Hangout" class="md-fab md-raised md-mini">
                            <md-icon aria-label="Google Hangout">share</md-icon>
                        </md-button>
                    </md-fab-actions>
                </md-fab-speed-dial>
            </div>
            <div>
                <md-button class="md-fab md-primary">
                    <md-tooltip md-direction="top" md-visible="tooltipVisible">Guardar</md-tooltip>
                    <md-icon class="logo_icon_editor material-icon">save</md-icon>
                </md-button>
            </div>
            <div ui-sref="metodo">
                <md-button class="md-fab md-primary">
                    <md-tooltip md-direction="top" md-visible="tooltipVisible">Comprar</md-tooltip>
                    <md-icon class="logo_icon_editor material-icon" style="font-size: 30px;width: auto; height: auto;">shopping_cart</md-icon>
                </md-button>
            </div>

            <div>
                <md-button class="md-fab md-primary">
                    <md-tooltip md-direction="top" md-visible="tooltipVisible">Ayuda</md-tooltip>
                    <md-icon ng-click="editor.cambiarMenu()" class="material-icon" style="font-size: 30px;width: auto; height: auto;">help_outline</md-icon>
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
            <div class="logo-editor">
                <bazam-svg-text-2 class="logo_grande_editor" bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo" data-guardar="editor.guardarComparar" data-comparadores="editor.comparadores" data-tipo-guardar="editor.tipoGuardar"></bazam-svg-text-2>
            </div>
        </div>
        <div style="position: absolute; bottom: 0;">
            <md-button class="md-raised md-primary" ng-click="editor.guardar('comparar')">
                <md-tooltip md-direction="top" md-visible="tooltipVisible">Comparar</md-tooltip>
                <md-icon>filter</md-icon>
            </md-button>
        </div>

        <div class="tono-background" style="position: absolute;">
            <div class="negro" ng-click="editor.fondo='negro'">.</div>
            <div class="blanco" ng-click="editor.fondo='blanco'">.</div>
        </div>
    </div>
</div>
