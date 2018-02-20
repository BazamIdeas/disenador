<style ng-repeat="fuente in $parent.principal.fuentes | filter: {estado: true}">
    @font-face {
        font-family:'{{fuente.nombre}}';
        src:url('{{fuente.url}}');
    }

</style>
<div class="row margin-bottom-0 lienzo" style="overflow:hidden">
    <div class="col s2">
        <button class="boton-verde" ng-click="$parent.principal.solicitarElementos()" ng-class="{ 'loading-white': !$parent.principal.completado}">BUSCAR</button>
    </div>
    <div class="col s8">

    </div>


    <carousel-combinaciones logos="$parent.principal.logos" nombre="$parent.principal.datos.nombre" callback="$parent.principal.preAvanzar"></carousel-combinaciones>

</div>
