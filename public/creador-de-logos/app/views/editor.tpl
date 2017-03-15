<style ng-repeat="fuente in editor.fuentes">
    @font-face {
        font-family: {{fuente.nombre}};
        src: url('{{fuente.url}}');
    }

</style>

<div flex layout="column" ng-cloak layout-align="space-between" id="popupContainer-editor">
    <div layout layout="column" layout-align="center">
        <div layout="row" class="relative" layout-align="center" layout-padding>
            <md-fab-speed-dial md-open="editor.estado2" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado.estado2=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-primary">
                        <md-icon class="logo_icon_editor" md-svg-src="assets/svg/txt.svg"></md-icon>
                    </md-button>
                </md-fab-trigger>
                <md-fab-actions>
                    <md-button aria-label="Face" class="md-fab md-raised md-mini" ng-click="editor.Categorias($event)">
                        <md-icon>format_align_left
                        </md-icon>
                    </md-button>
                    <md-button aria-label="Label" class="md-fab md-raised md-mini" ng-click="editor.Etiquetas($event)">
                        <md-icon>format_align_right</md-icon>
                    </md-button>
                    <md-button aria-label="Algo" class="md-fab md-raised md-mini" ng-click="editor.Caracteristicas($event)">
                        <md-icon>format_align_center</md-icon>
                    </md-button>
                    <md-button aria-label="Algo" class="md-fab md-raised md-mini" ng-click="editor.Caracteristicas($event)">
                        <md-icon>vertical_align_top</md-icon>
                    </md-button>
                </md-fab-actions>
            </md-fab-speed-dial>
            <md-fab-speed-dial md-open="editor.estado3" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado.estado3=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-primary">
                        <md-icon class="logo_icon_editor">remove_red_eye
                        </md-icon>
                    </md-button>
                </md-fab-trigger>
                <md-fab-actions>
                </md-fab-actions>
            </md-fab-speed-dial>
            <md-fab-speed-dial md-open="editor.estado4" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado.estado4=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-primary">
                        <md-icon class="logo_icon_editor">save</md-icon>
                    </md-button>
                </md-fab-trigger>
                <md-fab-actions>
                    <md-button aria-label="Face" class="md-fab md-raised md-mini" ng-click="editor.Categorias($event)">
                        <md-icon>face</md-icon>
                    </md-button>
                    <md-button aria-label="Label" class="md-fab md-raised md-mini" ng-click="editor.Etiquetas($event)">
                        <md-icon>label</md-icon>
                    </md-button>
                    <md-button aria-label="Algo" class="md-fab md-raised md-mini" ng-click="editor.Caracteristicas($event)">
                        <md-icon>lightbulb_outline</md-icon>
                    </md-button>
                </md-fab-actions>
            </md-fab-speed-dial>
        </div>
    </div>

    <div class="logo_grande_editor_cont md-whiteframe-2dp">
        <div class="logo-editor">
            <bazam-svg-text-2 class="logo_grande_editor" bazam-svg-text-pos data-icono="{{editor.logo.icono.elemento}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="editor.logo.texto" data-bazam-activo="editor.activo"></bazam-svg-text-2>
        </div>

        <div class="edicion">
            <div class="color-animacion" ng-class="editor.mostrar.color">
                <color-picker ng-model="editor.color" class="md-whiteframe-2dp" ng-class="editor.mostrar">
                </color-picker>
                
                
                <md-select ng-model="editor.logo.fuente.nombre" placeholder="{{editor.logo.fuente.nombre}}" style="max-width: 100%;" ng-style="{'font-family' : editor.fuente}">
                    <md-option ng-value="fuente" ng-style="{'font-family' : fuente.nombre}" ng-repeat="fuente in editor.fuentes" ng-click="cambiarFuente(fuente.nombre)">{{fuente.nombre}}</md-option>
                </md-select>
                
                
            </div>

            <div>
                <md-input-container class="md-block color-animacion" ng-class="editor.mostrar.texto">
                    <input name="fuente" maxlength="12" ng-required="true" ng-model="editor.logo.texto" ng-class="editor.mostrar">
                </md-input-container>
            </div>
        </div>
    </div>
    <div layout="row" layout-align="space-between">
        <div flex layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="proceso">Atras</md-button>
            <md-button class="md-raised md-primary" ui-sref="metodo">Comprar</md-button>
        </div>
    </div>
</div>
