<style ng-repeat="fuente in $parent.principal.fuentes | filter: {estado: true}">
    @font-face {
        font-family:'{{fuente.nombre}}';
        src:url('{{fuente.url}}');
    }

</style>
<div class="row margin-bottom-0 lienzo">
    <div class="col s2">
        <button class="boton-verde">REFRESCAR</button>
    </div>
    <div class="col s8">
        <p class="text-center tercero margin-bottom-0">Selecciona las fuentes y iconos que prefieras</p>
    </div>


    <div class="col s12">

        <div class="cubos-logos" ng-repeat="logo in logos = ($parent.principal.logos) track by $index" ng-if="$first || (($index+1) % 3) == 0">
            <div class="margin-right-20" ng-repeat="x in [1,2,3] track by $index" ng-if="$parent.$index < 2 && ((logos.length - 1) >= $index)">
                <div class="overlay-combinacion"></div>
                <span class="seleccionar">
                    <md-tooltip md-delay="2" md-direction="top">Seleccionar</md-tooltip>
                    <i class="material-icons">check</i>
                </span>
                <bazam-svg-text data-icono="{{principalCombinaciones.base64.decode(logos[$index].icono.svg)}}" data-fuente="{{logos[$index].fuente.nombre}}" data-texto="{{$parent.$parent.$parent.principal.datos.nombre}}"></bazam-svg-text>
            </div>

            <div class="margin-right-20" ng-repeat="x in [1,2,3] track by $index" ng-if="$parent.$index >= 2 && ((logos.length - 1) >= ($parent.$index + $index + 1))">
                <bazam-svg-text data-icono="{{principalCombinaciones.base64.decode(logos[$parent.$parent.$index + $index + 1].icono.svg)}}" data-fuente="{{logos[$parent.$parent.$index + $index + 1].fuente.nombre}}" data-texto="{{$parent.$parent.$parent.principal.datos.nombre}}"></bazam-svg-text>
            </div>

        </div>

    </div>

</div>
