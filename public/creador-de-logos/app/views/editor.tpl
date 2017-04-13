<style ng-repeat="fuente in editor.fuentes">
    @font-face {
        font-family: {
            {
                fuente.nombre
            }
        }
        ;
        src: url('{{fuente.url}}');
    }

</style>
<div layout layout-fill>
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
                    <md-icon>font_download</md-icon>
                    <h4>Icono</h4>
                </div>
            </div>
            <div class="menu-link" ng-click="editor.menuItem(3)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>font_download</md-icon>
                    <h4>Colores</h4>
                </div>
            </div>
            <div class="menu-link" ng-click="editor.menuItem(5)" ng-class="editor.menuActivo">
                <div>
                    <md-icon>font_download</md-icon>
                    <h4>Previsualizar</h4>
                </div>
            </div>
        </div>

        <div class="elementos" layout-fill>
            <div class="elemento md-whiteframe-2dp" ng-switch-when="1">
                <div>
                    <div layout layout-align="space-around">
                        <h4>Texto</h4>
                        <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon>
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
                    <md-select ng-model="editor.logo.fuente" placeholder="{{editor.logo.fuente.nombre}}" style="max-width: 100%;" ng-style="{'font-family' : editor.fuente}">
                        <md-option ng-value="fuente" ng-style="{'font-family' : fuente.nombre}" ng-repeat="fuente in editor.fuentes" ng-click="cambiarFuente(fuente.nombre)">{{fuente.nombre}}</md-option>
                    </md-select>
                </div>

                <div>
                    <h4>Posición</h4>
                    <div class="propiedades">
                        <div class="horizontal">
                            <B>Horizontal</B>
                        </div>
                        <div class="vertical">
                            <B>Vertical</B>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Propiedades</h4>
                    <div class="propiedades">
                        <div class="bold">
                            <B>B</B>
                        </div>
                        <div class="cursiva">
                            <B>C</B>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fin elemento -->
            <div class="elemento md-whiteframe-2dp" ng-switch-when="4">
                <div>
                    <div layout layout-align="space-around">
                        <h4>Texto</h4>
                        <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon>
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
                    <h4>Propiedades</h4>
                    <div class="propiedades">
                        <div class="bold">
                            <B>B</B>
                        </div>
                        <div class="cursiva">
                            <B>C</B>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fin elemento -->

            <div class="elemento md-whiteframe-2dp" ng-switch-when="2">
                <div layout layout-align="space-around">
                    <h4>Posición</h4>
                    <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon>
                </div>

                <div>
                    <div class="x-y">

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
                <div layout layout-align="space-around">
                    <h4>Edita el Color</h4>
                    <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon>
                </div>
                <div layout layout-align="center">
                    <color-picker ng-model="editor.color" class="md-whiteframe-2dp" ng-class="editor.mostrar">
                    </color-picker>
                </div>
            </div>
            
            <!-- Fin elemento -->
            
            <div class="elemento md-whiteframe-2dp" ng-switch-when="5">
                <div layout layout-align="space-around">
                    <h4>Previsualizar</h4>
                    <md-icon class="text-white" ng-click="editor.menuItem(0)">keyboard_arrow_left</md-icon>
                </div>

                <div>
                   
                </div>
            </div>
        </div>
    </div>

    <div class="contenedor-editor" id="popupContainer-editor">
        <div class="botones-editor">
            <div ng-class="editor.modoSeleccionado" ng-click="editor.menuItem(0)">
                <md-button class="md-fab md-primary">
                    <md-icon class="logo_icon_editor">save</md-icon>
                </md-button>
            </div>
            <div ng-class="editor.modoSeleccionado" ng-click="editor.estado.estado2=true">
                <md-button class="md-fab md-primary">
                    <md-icon class="logo_icon_editor">shopping_cart</md-icon>
                </md-button>
            </div>
        </div>
        <div class="cont-logo-editor">
            <div class="logo-editor">
                <bazam-svg-text-2 class="logo_grande_editor" bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo"></bazam-svg-text-2>
            </div>
        </div>

        <div>
            <md-button class="md-raised md-primary" ui-sref="proceso">Atras</md-button>
        </div>
    </div>
</div>
