<div flex layout="column" ng-cloak class="gradient">
    <div class="titulo-prev">
        <p>DETALLA TU LOGO EN DISTINTAS PLANTILLAS</p>
    </div>
    <div class="plantilla">
        <div class="elemento-prev md-whiteframe-2dp" ng-repeat="previsualizar in prev.modeloPrevisualizar" identidad="{{previsualizar.nombre}}" style="background:url('{{previsualizar.url}}')">
            <div class="layout-padding logo_previsualizar">
                <md-icon md-svg-src="data:image/svg+xml;base64,{{prev.svg}}"></md-icon>
            </div>
            <div>
                <texto>{{prev.texto}}</texto>
            </div>
        </div>

        <div class="ir-editor">
            <md-icon ui-sref="editor" class="material-icon">keyboard_arrow_left</md-icon>
        </div>
    </div>
</div>
</div>
