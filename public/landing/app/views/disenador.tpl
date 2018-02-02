<div style="background-color: white">
    
    <div>
        <div ng-if="disenador.verificarBase64(disenador.disenador.foto)">
            <img ng-src="{{'data:image/svg+xml;base64,' + disenador.disenador.foto}}">
        </div>
        <div ng-if="!disenador.verificarBase64(disenador.disenador.foto)">
            <img ng-src="{{disenador.disenador.foto}}">
        </div>
        
        <div>Califiación: {{disenador.disenador.promedioCal}}</div>
        <div>Nombre: {{disenador.disenador.nombreCliente}}</div>
    </div>
    <div>
        <div></div>
        <div></div>
    </div>

</div>