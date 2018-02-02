<div style="background-color:white">
    <div ng-repeat="disenador in disenadores.disenadores" ui-sref="disenador({id: disenador.idCliente})">
        <div ng-if="disenadores.verificarBase64(disenador.foto)">
            <img ng-src="{{'data:image/svg+xml;base64,' + disenador.foto}}">
        </div>
        <div ng-if="!disenadores.verificarBase64(disenador.foto)">
            <img ng-src="{{disenador.foto}}">
        </div>

        <div>Califiación: {{disenador.promedioCal}}</div>
        <div>Nombre: {{disenador.nombreCliente}}</div>
    </div>
</div>