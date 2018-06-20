<div style="display: flex;" ng-show="papeleriaEditor.papeleria">
    <bazam-menu-papeleria ng-class="{'oculto': papeleriaEditor.caraSeleccionada.hooks.length == 0}"></bazam-menu-papeleria>
    <div class="papeleria-editor-container">
        <div class="esquema-colores">
            <div class="esquema-color" ng-class="{'active': papeleriaEditor.esquemaActivo == 'original'}" ng-click="papeleriaEditor.rePintarLienzo(false)" style="background: {{papeleriaEditor.logo.atributos['color-icono']}};
                background: -moz-linear-gradient(-45deg,  {{papeleriaEditor.logo.atributos['color-icono']}} 50%,  {{papeleriaEditor.logo.atributos['color-nombre']}} 51%);
                background: -webkit-linear-gradient(-45deg,  {{papeleriaEditor.logo.atributos['color-icono']}} 50%, {{papeleriaEditor.logo.atributos['color-nombre']}} 51%);
                background: linear-gradient(135deg, {{papeleriaEditor.logo.atributos['color-icono']}} 50%, {{papeleriaEditor.logo.atributos['color-nombre']}} 51%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=' {{papeleriaEditor.logo.atributos['color-icono']}}', endColorstr=' {{papeleriaEditor.logo.atributos['color-nombre']}}',GradientType=1 );"></div>
            <div ng-repeat="esquema in papeleriaEditor.papeleria.modelo.esquemas" class="esquema-color" ng-class="{'active': papeleriaEditor.esquemaActivo == $index}" ng-click="papeleriaEditor.rePintarLienzo($index)" style="background: {{esquema.primario}};
                background: -moz-linear-gradient(-45deg, {{esquema.primario}} 50%, {{esquema.secundario}} 51%);
                background: -webkit-linear-gradient(-45deg, {{esquema.primario}} 50%,{{esquema.secundario}} 51%);
                background: linear-gradient(135deg,{{esquema.primario}} 50%,{{esquema.secundario}} 51%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='{{esquema.primario}}', endColorstr='{{esquema.secundario}}',GradientType=1 );"></div>
        </div>

        <bazam-papeleria class="{{papeleriaEditor.papeleria.tipo}}" ng-class="{'open': papeleriaEditor.selectorfuentes}"></bazam-papeleria>
        <div class="combinacion-box">
            <span class="accion" ng-disable="!papeleriaEditor.peticion" ng-click="papeleriaEditor.guardar()" style="top: 5%;">
                <p ng-class="{'loading-white': papeleriaEditor.peticionB}">GUARDAR</p>
                <img src="assets/images/save.svg" alt="">
            </span>

            <span class="accion" ng-disable="!papeleriaEditor.peticion" ng-click="papeleriaEditor.descargarPieza()" style="top: 15%;">
                <p>DESCARGAR</p>
                <img src="assets/images/file_download.svg" alt="">
            </span>

            <span class="accion" ng-click="papeleriaEditor.volver()" style="top: 25%;">
                <p>PAPELERIAS</p>
                <md-icon style="color:white;">arrow_left</md-icon>
            </span>
        </div>
        <div class="caras-miniaturas" ng-show="papeleriaEditor.papeleria.modelo.caras.length > 1">
            <div ng-repeat="tabMenu in papeleriaEditor.papeleria.modelo.caras track by $index" ng-click="papeleriaEditor.selectorfuentes = false; papeleriaEditor.caraSeleccionada = tabMenu;  menuPapeleria.menuActivo = tabMenu.nombre; papeleriaEditor.cambiarCara($index); papeleriaEditor.mostrarMenuI = null;"
                ng-class="{'active': menuPapeleria.menuActivo == tabMenu.nombre}" class="caras-miniaturas-item-svg --pequena"
                ng-bind-html="papeleriaEditor.sce.trustAsHtml(tabMenu.svg)">
            </div>
        </div>
    </div>
</div>

<style>
    .papeleria-editor-container {
        background: #f4f2f2;
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        min-height: calc(100% - 60px);
        transition: width 0.3s;
    }


    bazam-menu-papeleria.oculto {
        width: 0;
    }

    bazam-menu-papeleria.oculto+.papeleria-editor-container {
        width: 100%;
    }


    bazam-papeleria {
        position: relative;
        left: 0;
        transition: left 0.5s;
    }

    bazam-papeleria.etiqueta-para-productos, bazam-papeleria.etiqueta-para-precios {
        width: 6cm;
    height: 56%;
    }

    bazam-papeleria.tarjeta, bazam-papeleria.sobre-sin-ventana {
        width: 17cm;
        height: 55%;
    }

    bazam-papeleria.hoja {
        width: 19cm;
        margin-top: 2%;
        height: 12.8cm;
        overflow-x: hidden;
        overflow-y: scroll;
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


/*     bazam-papeleria>svg {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    } */

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

    .text-styles.text-styles-papeleria {
        margin-top: 20px;
        justify-content: space-around;
    }

    .text-styles.text-styles-papeleria div {
        width: 30px;
        height: 30px;
        font-size: 20px;
    }

    .element-color-picker{
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
    .esquema-colores {
        position: absolute;
        left: 0%;
        top: 1%;
    }

    .esquema-color {
        width: 50px;
        height: 50px;
        display: inline-block;
        margin-left: 10px;
        border-radius: 10px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
        border: 2px solid silver;
        cursor: pointer;
    }

    .esquema-color.active {
        border: 2px solid black;
    }
</style>