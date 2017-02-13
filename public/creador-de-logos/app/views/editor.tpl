<div flex layout="column" layout-align="center " ng-cloak id="popupContainer-editor">
    <div layout="column" layout-align="center center">
        <div layout="row" class="margen_inferior relative" layout-align="center" layout-padding>
            <md-fab-speed-dial md-open="editor.estado1" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado1=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-warn">
                        <md-icon class="logo_icon_editor" md-svg-src="../assets/svg/google-glasses.svg"></md-icon>
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
            <md-fab-speed-dial md-open="editor.estado2" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado2=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-warn">
                        <md-icon class="logo_icon_editor" md-svg-src="../assets/svg/txt.svg"></md-icon>
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
            <md-fab-speed-dial md-open="editor.estado3" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado3=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-warn">
                        <md-icon class="logo_icon_editor" md-svg-src="../assets/svg/webcam.svg"></md-icon>
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
            <md-fab-speed-dial md-open="editor.estado4" md-direction="down" ng-class="editor.modoSeleccionado" ng-click="editor.estado4=true">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-warn">
                        <md-icon class="logo_icon_editor" md-svg-src="../assets/svg/folder.svg"></md-icon>
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
    <div layout="row" class="logo_grande_editor_cont" layout-align="center" layout-padding>
        <div layout="row" layout-align="center" class="md-whiteframe-2dp">
            <md-icon class="logo_grande_editor" md-svg-src="../assets/svg/earth-globe.svg"></md-icon>
        </div>
    </div>
    <div layout="row" class="margen_superior" layout-align="space-between">
        <div flex layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="proceso">Atras</md-button>
            <md-button class="md-raised md-primary" ui-sref="metodo">Comprar</md-button>
        </div>
    </div>
</div>
