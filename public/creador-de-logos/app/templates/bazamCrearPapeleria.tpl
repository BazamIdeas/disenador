<div ng-class="{'active':estado}" class="pop-papeleria-crear">
    <div ng-click="estado = false" class="boton-planes-unico mas-unico">
        <md-icon>arrow_drop_down</md-icon>Guardados
    </div>
    <div class="titulo">
        CREAR PAPELERIA
    </div>
    <form>
        <div class="radio-selector">
            <md-radio-group name="tipoPapeleria" required ng-model="crearPapeleria.datos.papeleria" class="md-primary ">
                <md-radio-button ng-repeat="papeleria in crearPapeleria.papelerias" ng-value="papeleria" ng-class="{'active': crearPapeleria.datos.papeleria.tipo == papeleria.tipo}">
                    {{papeleria.tipo}}
                </md-radio-button>
            </md-radio-group>
        </div>
        <div ng-repeat="papeleria in crearPapeleria.papelerias" ng-show="crearPapeleria.datos.papeleria.tipo == papeleria.tipo" class="papeleria-ejemplos">
            <div ng-repeat="modelo in papeleria.modelos">
                <div>
                    <span class="modelo-papeleria" ng-bind-html="crearPapeleria.sce.trustAsHtml(modelo.caras[0].svg)"></span>
                </div>
                <div class="boton-ejemplo-papeleria" ng-click="crearPapeleria.enviarEditor(modelo)">CREAR</div>
            </div>
        </div>
    </form>


</div>

<style>
    .pop-papeleria-crear {
        position: absolute;
        bottom: 0;
        z-index: 10;
        height: 0%;
        background-color: white;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100vw;
        transition: height 1s;
    }

    .pop-papeleria-crear.active {
        height: 100%;
    }

    .pop-papeleria-crear .titulo {
        font-family: futura-heavy;
        margin: 2% 0;
        color: var(--tercero);
        font-size: 2.3rem;
        text-align: center;
    }

    .boton-planes-unico.mas-unico {
        bottom: initial;
        top: 0;
    }

    .radio-selector md-radio-group .md-label {
        font-size: 20pt;
        text-transform: capitalize;
        border: 1px solid;
        padding: 8px 16px;
        border-radius: 30px;
    }

    .radio-selector md-radio-group .md-container {
        display: none;
    }

    .radio-selector {
        display: flex;
        justify-content: center;
    }

    md-radio-button.active .md-label {
        background: black;
        color: white;
    }

    .radio-selector md-radio-group {
        display: flex;
    }
</style>