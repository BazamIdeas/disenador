<div flex layout="column" layout-align="center " ng-cloak id="popupContainer-editor">
    <div layout="column" layout-align="center center">
        <div layout="row" class="margen_inferior relative" layout-align="center" layout-padding>
            <md-fab-speed-dial md-open="editor.estado1" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado.estado1=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab  md-primary">
                        <md-icon class="logo_icon_editor ">view_stream</md-icon>
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
    <div class="logo_grande_editor_cont">
        <div class="md-whiteframe-2dp">
            <bazam-svg-text-2 class="logo_grande_editor" bazam-svg-text-pos data-icono="{{editor.logo.icono.elemento}}" data-fuente="{{editor.logo.fuente.nombre}}" data-texto-x="{{editor.logo.posicion.coordenadas.x}}" data-texto-y="{{editor.logo.posicion.coordenadas.y}}" data-texto="BAZAM" data-bazam-activo="editor.activo"></bazam-svg-text-2>
        </div>
        <div class="color-animacion color-animacion-entrada">
            <md-input-container class="md-block md-whiteframe-2dp layout-padding">
                <input name="fuente" ng-required="true" ng-model="editor.logo.texto">
            </md-input-container>
            <color-picker ng-model="editor.color" class="md-whiteframe-2dp">
            </color-picker>
        </div>
    </div>
    <div layout="row" class="margen_superior" layout-align="space-between">
        <div flex layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="proceso">Atras</md-button>
            <md-button class="md-raised md-primary" ui-sref="metodo">Comprar</md-button>
        </div>
    </div>
</div>
