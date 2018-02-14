<div style="background-color: white; width: 100%">
    <style> bazam-visualizar svg {width: 150px}</style>
    
    <div style="display: inline-block; width: 15%; min-width: 200px; padding: 20px">
        <div ng-if="disenador.verificarBase64(disenador.disenador.foto)">
            <img ng-src="{{'data:image/svg+xml;base64,' + disenador.disenador.foto}}">
        </div>
        <div ng-if="!disenador.verificarBase64(disenador.disenador.foto)">
            <img ng-src="{{disenador.disenador.foto}}">
        </div>
        <div style="text-align:center;">
            <div>Nombre: {{disenador.disenador.nombreCliente}}</div>
        </div>
        
    </div>
    <!--CAlificaciones -->
    <div style="display: inline-block; width: 500px;">
        <!--logos-->
        <div ng-repeat="logo in disenador.logos" style="border: 1px solid black">
            <div style="display: inline-block; width: 300px; vertical-align: middle; text-align: center;" ng-if="$odd">
                    <div class="estrellas">
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 1">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 1" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 2" ng-mouseover="logo.atributos['calificacion-cliente'] = 2">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 2" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 3" ng-mouseover="logo.atributos['calificacion-cliente'] = 3">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 3" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 4" ng-mouseover="logo.atributos['calificacion-cliente'] = 4">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 4" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 5" ng-mouseover="logo.atributos['calificacion-cliente'] = 5">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 5" >star</i>
                        </div>
                {{logo.atributos.comentario || "No hay comentarios"}}
            </div>
            
            <bazam-visualizar data-svg="disenador.base64.decode(logo.logo)" style="display: inline-block; vertical-align: middle"></bazam-visualizar>

            <div style="display: inline-block; width: 300px; vertical-align: middle; text-align: center;" ng-if="$even">
                    <div class="estrellas">
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 1">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 1" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 2" ng-mouseover="logo.atributos['calificacion-cliente'] = 2">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 2" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 3" ng-mouseover="logo.atributos['calificacion-cliente'] = 3">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 3" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 4" ng-mouseover="logo.atributos['calificacion-cliente'] = 4">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 4" >star</i>

                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] < 5" ng-mouseover="logo.atributos['calificacion-cliente'] = 5">star_border</i>
                            <i class="material-icons" ng-if="logo.atributos['calificacion-cliente'] >= 5" >star</i>
                        </div>
                    {{logo.atributos.comentario || "No hay comentarios"}}
            </div>
        </div>
    </div>

</div>