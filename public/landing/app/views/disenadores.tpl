<div style="background-color:white" class="flex layout">
    <div ng-repeat="disenador in disenadores.disenadores" ui-sref="disenador({id: disenador.idCliente})">
        <div ng-if="disenador.foto && disenadores.verificarBase64(disenador.foto)">
            <img ng-src="{{'data:image/svg+xml;base64,' + disenador.foto}}">
        </div>
        <div ng-if="disenador.foto && !disenadores.verificarBase64(disenador.foto)">
            <img ng-src="{{disenador.foto}}">
        </div>

        <div>Califiación: {{disenador.promedioCal}}</div>
        <div>Nombre: {{disenador.nombreCliente}}</div>
    </div>
</div>