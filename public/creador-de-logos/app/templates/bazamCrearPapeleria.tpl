<div ng-show="estado">
    <form>
        <md-radio-group name="tipoPapeleria" required ng-model="crearPapeleria.datos.papeleria" class="md-primary">
            <md-radio-button ng-repeat="papeleria in crearPapeleria.papelerias" ng-value="papeleria">
                <md-tooltip md-direction="top">{{papeleria.tipo}}</md-tooltip>
                {{papeleria.tipo}}
                <span ng-bind-html="crearPapeleria.sce.trustAsHtml(papeleria.svg)">
            </md-radio-button>
        </md-radio-group>

        <div ng-repeat="papeleria in crearPapeleria.papelerias" ng-show="crearPapeleria.datos.papeleria.tipo == papeleria.tipo" class="papeleria-ejemplos">
            <div ng-repeat="modelo in papeleria.modelos">
                <div>
                    <span ng-bind-html="crearPapeleria.sce.trustAsHtml(modelo.svg)"></span>
                    <h4>{{modelo.nombre}}</h4>
                </div>
                <div class="boton-ejemplo-papeleria" ng-click="crearPapeleria.enviarEditor(modelo)">CREAR</div>
            </div>
        </div>
    </form>


</div>

<style>
</style>