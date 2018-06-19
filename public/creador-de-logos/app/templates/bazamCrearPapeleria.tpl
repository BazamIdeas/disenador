<div ng-class="{'active':estado}" class="pop-papeleria-crear">
    <div class="categorias-papeleria" ng-show="papelerias">
        <span class="tab-papeleria" ng-show="papeleria.modelos.length > 0"ng-click="$parent.papeleriaActiva = papeleria.tipo" ng-repeat="papeleria in papelerias" ng-class="{'seleccionada': papeleriaActiva == papeleria.tipo}">{{papeleria.label}}
            <div class="ejemplo-tab" ng-bind-html="crearPapeleria.sce.trustAsHtml(papeleria.ejemplo)">
            </div>
        </span>
    </div>
    <div class="crear-directiva" ng-show="papelerias">
        <div ng-repeat="papeleria in papelerias" ng-show="papeleriaActiva == papeleria.tipo">
            <div ng-repeat="modelo in papeleria.modelos  track by $index" class="modelo-papeleria-crear {{papeleria.tipo}}">
                <span ng-bind-html="crearPapeleria.sce.trustAsHtml(modelo.svg)"></span>
                <div class="combinacion-box">
                    <span class="accion" style="bottom: 75%;" ng-click="crearPapeleria.enviarEditor($parent.$index, $index)">
                        <p>Usar Diseño</p>
                        <img src="assets/images/edit_white.svg" alt="">
                    </span>
                </div>
            </div>
        </div>
    </div>
    <md-button ng-show="tiene" ng-click="estado = false" class="boton-crear-papeleria ">GUARDADOS</md-button>
</div>