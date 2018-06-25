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

    <style>

        .icono-opcion-container {
            display: flex;
            justify-content: space-around;
            position: absolute;
            bottom: -29%;
            background: white;
            width: 100%;
            left: 0;
            flex-wrap: wrap;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .papeleria-editor-container .icono-opcion-item {
            display: inline-block;
            height: 20px;
            width: 20px;
            margin: 5px;
        }

        .icono-opcion-container > p {
            width: 100%;
            text-align: center;
            margin: 0;
            padding: 5px 0;
        }

    </style>
</div>