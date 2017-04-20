<div layout="column" flex layout-align="center center" ng-switch="analisis.animacionTexto">
    <div layout layout-align="center" class="loader-textos">
        <h2 ng-switch-when="1" layout="column" class=" texto-animacion-entrada pasos analisis-icon"><md-icon>done</md-icon>Verificando los datos</h2>
        <h2 ng-switch-when="2" layout="column" class=" texto-animacion-entrada pasos analisis-icon"><md-icon>autorenew</md-icon>Analizando sus preferencias</h2>
        <h2 ng-switch-when="3" layout="column" class=" texto-animacion-entrada pasos analisis-icon"><md-icon>av_timer</md-icon>Evaluando las posibilidades</h2>
        <h2 ng-switch-when="4" layout="column" class=" texto-animacion-entrada pasos analisis-icon"><md-icon>build</md-icon>Construyendo las mejores opciones</h2>
    </div>

    <div id="preloader6">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
