<div class="row margin-bottom-0 lienzo">
    <div class="col s12" ng-if="$parent.principal.completado && !principalComenzar.logoCompartido.logo">
        <p class="text-center tercero margin-bottom-0">LOGOS PREDISEÑADOS DESTACADOS</p>
    </div>
    <div class="col s12 cubos-logos" ng-if="$parent.principal.completado && !principalComenzar.logoCompartido.logo">


        <div  ng-repeat="aprobado in $parent.principal.aprobados | limitTo : 6 track by aprobado.idLogo ">
            <div class="overlay-combinacion"></div>
            <span class="seleccionar" ng-click="$parent.principal.avanzarPredisenado(aprobado.idLogo)">
                            <md-tooltip md-delay="2" md-direction="top">Seleccionar</md-tooltip>
                            <i class="material-icons">check</i>
                        </span>
            <bazam-visualizar data-svg="principalComenzar.base64.decode(aprobado.logo)"></bazam-visualizar>
        </div>

        <div ng-if="!$parent.principal.aprobados.length">  <p style="text-align: center;"> No hay diseños </p> </div>

    </div>
    <div class="row" ng-if="$parent.principal.aprobados.length">
        <div class="col s6 offset-s3" style="text-align: center;">
            <button class="boton-verde" ng-click="$parent.principal.cargarMas($parent.principal.aprobados[$parent.principal.aprobados.length - 1])" ng-class="{'loading-white': !$parent.principal.completadoCarga}">VER MÁS</button>
        </div>
    </div>




    <div class="col l4 offset-l4 logo-compartido" ng-if="principalComenzar.logoCompartido.logo">
        <bazam-visualizar data-svg="principalComenzar.base64.decode(principalComenzar.logoCompartido.logo)"></bazam-visualizar>
    </div>


    <div class="col s12" ng-if="!$parent.principal.completado">
        GIF
    </div>
</div>
