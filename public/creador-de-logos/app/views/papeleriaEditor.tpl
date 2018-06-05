<div style="display: flex;" ng-show="papeleriaEditor.papeleria">
    <bazam-menu-papeleria></bazam-menu-papeleria>
    <div class="papeleria-editor-container">
        <bazam-papeleria ng-class="{'open': papeleriaEditor.selectorfuentes}"></bazam-papeleria>
        <div class="combinacion-box">
            <span class="accion" ng-disable="papeleriaEditor.peticion" ng-click="papeleriaEditor.guardar()" style="top: 5%;">
                <p ng-class="{'loading-white': papeleriaEditor.peticion}">GUARDAR</p>
                <img src="assets/images/save.svg" alt="">
            </span>

            <span class="accion" ng-click="papeleriaEditor.descargarPieza()" style="top: 15%;">
                <p ng-class="{'loading-white': papeleriaEditor.peticion}">DESCARGAR</p>
                <img src="assets/images/file_download.svg" alt="">
            </span>

            <span class="accion" ng-click="papeleriaEditor.volver()" style="top: 25%;">
                <p>VOLVER</p>
                <md-icon style="color:white;">arrow_left</md-icon>
            </span>
        </div>
        <div class="caras-miniaturas">
            <div ng-repeat="tabMenu in papeleriaEditor.papeleria.modelo.caras track by $index" ng-click="papeleriaEditor.selectorfuentes = false; menuPapeleria.menuActivo = tabMenu.nombre; papeleriaEditor.cambiarCara($index)"
                ng-class="{'active': menuPapeleria.menuActivo == tabMenu.nombre}" class="caras-miniaturas-item-svg --pequena"
                ng-bind-html="papeleriaEditor.sce.trustAsHtml(tabMenu.svg)">
            </div>
        </div>
    </div>
</div>

<style>
    .papeleria-editor-container {
        background: #f4f2f2;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }


    bazam-papeleria {
        width: 14cm;
        height: calc(80% - 60px);
        position: relative;
        display: flex;
        left: 0;
        justify-content: center;
        align-items: center;
        transition: left 0.5s;
    }

    bazam-papeleria.open {
        left: 11%;
    }

    .bazam-loader-papeleria {
        background-color: white;
        width: 100%;
        top: 60px;
        position: fixed;
        z-index: 2;
        height: calc(100% - 60px);
        display: flex;
        justify-content: center;
        align-items: center;

    }

    bazam-papeleria>svg {
        margin-bottom: 10px;
        position: absolute;
    }


    bazam-papeleria .hook-seleccionado g {
        animation-name: parpadeo;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: initial;
        animation-fill-mode: both;
        -webkit-animation-name: parpadeo;
        -webkit-animation-duration: 1s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-fill-mode: both;
    }


    bazam-papeleria>svg * {
        overflow: visible !important;
    }

    bazam-papeleria>svg *:not(.rect-bz, .contenedor-logo) {
        pointer-events: none;
    }

    bazam-papeleria>svg .hook>svg * {

        pointer-events: bounding-box;
    }

    [movimiento-bz] {
        fill: transparent;
        stroke: black;
        stroke-width: 1px;
        stroke-dasharray: 3px;
    }

    @keyframes picker-activo {
        from {
            transform: scale(0.1);
        }

        to {
            transform: scale(1);
        }
    }

    .papeleria-editor-container .element-color-picker.color-picker-activo {
        animation-duration: 0.5s;
        animation-name: picker-activo;
        animation-fill-mode: forwards;
    }

    .multi-logo-color-container {
        display: flex;
        justify-content: space-around;
    }

    .logo-color-container {
        background-color: #bcbcbc;
        width: 18%;
        display: inline-block;
    }


    .combinacion-box .accion {
        opacity: 1;
        z-index: 2;
    }

    .papeleria-editor-container span.accion:hover {
        width: 180px !important;
    }

    span.accion:hover p {
        background-color: transparent !important;
        border: none !important;
    }
</style>