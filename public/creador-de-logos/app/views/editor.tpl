<style ng-repeat="fuente in editor.fuentes">
    @font-face {font-family: {{fuente.nombre}};
        src: url('{{fuente.url}}');
    }
</style>
<div flex layout="column" ng-cloak layout-align="space-around" id="popupContainer-editor" ng-switch="editor.menu">
    <div layout layout-align="end">
        <div layout="row" class="relative" layout-align="center" layout-padding>
            <md-fab-speed-dial md-open="editor.estado4" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.menuItem(0)">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-primary">
                        <md-icon class="logo_icon_editor">save</md-icon>
                    </md-button>
                </md-fab-trigger>
            </md-fab-speed-dial>
            <md-fab-speed-dial md-open="editor.estado2" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado.estado2=true">
                <md-fab-trigger ui-sref="metodo">
                    <md-button aria-label="menu" class="md-fab md-primary">
                        <md-icon class="logo_icon_editor">shopping_cart</md-icon>
                    </md-button>
                </md-fab-trigger>
            </md-fab-speed-dial>
        </div>
    </div>
    <div class="contenedor-editor">
        <div class="menu-editor md-whiteframe-2dp">
            <div class="menu-link" ng-click="editor.menuItem(1)" ng-class="editor.menuActivo">
                <h4>Texto</h4>
                <div class="elemento md-whiteframe-2dp" ng-switch-when="1">
                    <div>
                        <div layout layout-align="space-between">
                            <h4>Nombre</h4>
                            <button  ng-click="editor.menuItem(0)"><h6>Cerrar</h6></button>
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
            </div>
            <div class="menu-link" ng-click="editor.menuItem(2)" ng-class="editor.menuActivo">
                <h4>Posiciones</h4>
                <div class="elemento md-whiteframe-2dp" ng-switch-when="2">
                    <div>
                        <div>
                            <h4>Posicion</h4>
                            <h6 ng-click="editor.menuItem(0)">Cerrar</h6>
                        </div>
                        <div class="propiedades">
                            <div class="bold">
                                <B>IZQUIERDA</B>
                            </div>
                            <div class="cursiva">
                                <B>DERECHO</B>
                            </div>
                            <div class="subrayado">
                                <B>ARRIBA</B>
                            </div>
                            <div class="subrayado">
                                <B>ABAJO</B>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-link" ng-click="editor.menuItem(3)" ng-class="editor.menuActivo">
                <h4>Colores</h4>
                <div class="elemento md-whiteframe-2dp" ng-switch-when="3">
                    <div>
                        <h4>EDITA EL COLOR</h4>
                        <h6 ng-click="editor.menuItem(0)">Cerrar</h6>
                    </div>
                    <div>
                        <color-picker ng-model="editor.color" class="md-whiteframe-2dp" ng-class="editor.mostrar">
                        </color-picker>
                    </div>
                </div>
            </div>
        </div>
        <div class="editor-lienzo">
            <div class="cont-logo-editor md-whiteframe-2dp">
                <div class="logo-editor">
                    <bazam-svg-text-2 class="logo_grande_editor" bazam-svg-text-pos data-icono="{{editor.base64(editor.logo.icono.svg)}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo"></bazam-svg-text-2>
                </div>
            </div>
        </div>
    </div>
    <div layout="row" layout-align="space-between">
        <div flex layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="proceso">Atras</md-button>
        </div>
    </div>
</div>
