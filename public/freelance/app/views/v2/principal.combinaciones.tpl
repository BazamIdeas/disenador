<style ng-repeat="fuente in $parent.principal.fuentes | filter: {estado: true}">
    @font-face {
        font-family:'{{fuente.nombre}}';
        src:url('{{fuente.url}}');
    }

</style>
<div class="row margin-bottom-0 lienzo">
    <div class="col s2">
        <button class="boton-verde" ng-click="$parent.principal.solicitarElementos()" ng-class="{ 'loading-white': !$parent.principal.completado}">REFRESCAR</button>
    </div>
    <div class="col s8">
        <p class="text-center tercero margin-bottom-0">Selecciona las fuentes y iconos que prefieras</p>
    </div>


    <div class="col s12">

            <div class="cubos-logos" ng-repeat="logo in logos = $parent.principal.logos track by $index">
                    <div fondo-contraste color="principalCombinaciones.convertidor(logo.atributos)['color-primario']" class="margin-right-20" ng-click="principalCombinaciones.avanzar($index)">
                        <div class="overlay-combinacion"></div>
                        <span class="seleccionar">
                            <md-tooltip md-delay="2" md-direction="top">Seleccionar</md-tooltip>
                            <i class="material-icons">check</i>
                        </span>
                        <bazam-svg-text data-icono="{{principalCombinaciones.base64.decode(logo.icono.svg)}}" data-fuente="{{logo.fuente.nombre}}" data-texto="{{$parent.$parent.principal.datos.nombre}}"></bazam-svg-text>
                    </div>
                </div>

    </div>

</div>
