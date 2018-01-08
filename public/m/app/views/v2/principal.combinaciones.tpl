<style ng-repeat="fuente in $parent.principal.fuentes | filter: {estado: true}">
    @font-face {
        font-family:'{{fuente.nombre}}';
        src:url('{{fuente.url}}');
    }

</style>
<div class="row margin-bottom-0 lienzo">
    <div class="col s12">
        <p class="text-center tercero margin-bottom-0">Selecciona las fuentes que prefieras</p>
    </div>


    <div class="col s12">

        <div class="row cubos-logos-opciones margin-bottom-0">
            
            <div class="col s12 m4 l3" ng-click="principalCombinaciones.avanzar($index)" ng-repeat="logo in logos = ($parent.principal.logos) track by $index">
                <div ng-class="{'seleccionado': logo.estado}" ng-click="principalCombinaciones.seleccionarLogo($index)">
                    <bazam-svg-text data-icono="{{principalCombinaciones.base64.decode(logo.icono.svg)}}" data-fuente="{{logo.fuente.nombre}}" data-texto="{{$parent.$parent.principal.datos.nombre}}"></bazam-svg-text>
                </div>
            </div>

            <!--<div class="margin-right-20" ng-repeat="x in [1,2,3] track by $index" ng-if="$parent.$index >= 2 && ((logos.length - 1) >= ($parent.$index + $index + 1))" ng-click="principalCombinaciones.avanzar($parent.$parent.$index + $index + 1)">
                <div class="overlay-combinacion"></div>
                <span class="seleccionar">
                    <md-tooltip md-delay="2" md-direction="top">Seleccionar</md-tooltip>
                    <i class="material-icons">check</i>
                </span>
                <bazam-svg-text data-icono="{{principalCombinaciones.base64.decode(logos[$parent.$parent.$index + $index + 1].icono.svg)}}" data-fuente="{{logos[$parent.$parent.$index + $index + 1].fuente.nombre}}" data-texto="{{$parent.$parent.$parent.principal.datos.nombre}}"></bazam-svg-text>
            </div>-->

        </div>

    </div>

</div>
