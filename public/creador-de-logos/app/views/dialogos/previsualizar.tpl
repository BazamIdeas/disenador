<md-dialog aria-label="pestana.nombre" flex="40">
    <md-toolbar class="transparencia">
        <div class="md-toolbar-tools">
            <div>PREVISUALIZAR</div>
        </div>
    </md-toolbar>
    <md-dialog-content>
        <div flex layout="column" ng-cloak class="gradient previsualizar">
            <div class="titulo-prev">
                <p>DETALLA TU LOGO EN DISTINTAS PLANTILLAS</p>
            </div>

            <div class="plantilla">
                <div class="elemento-prev md-whiteframe-2dp" ng-repeat="previsualizar in modeloPrev" identidad="{{previsualizar.nombre}}" style="background:url('{{previsualizar.url}}')">
                    <bazam-visualizar data-svg="svgD" style="width:{{previsualizar.ancho}};">
                    </bazam-visualizar>
                </div>
            </div>
            <div layout class="margen_superior">
                <div layout="row" flex layout-align="end">
                    <md-button class="md-primary  md-raised" ng-click="cancel()">Cerrar</md-button>
                </div>
            </div>
    </md-dialog-content>
</md-dialog>
