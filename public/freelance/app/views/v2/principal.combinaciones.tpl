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

    <carousel-combinaciones logos="$parent.principal.logos" nombre="$parent.principal.datos.nombre" callback="principalCombinaciones.avanzar"></carousel-combinaciones>

</div>
