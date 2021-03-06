<div ng-class="{'active':estado}" class="pop-papeleria-crear">
    <div class="categorias-papeleria" ng-show="papelerias">
        <span class="tab-papeleria" ng-click="$parent.papeleriaActiva = papeleria.tipo" ng-repeat="papeleria in papelerias" ng-class="{'seleccionada': papeleriaActiva == papeleria.tipo}">
            <md-tooltip md-direction="right">{{papeleria.label}}</md-tooltip>
            <img ng-src="/assets/images/iconos-descarga/{{papeleria.tipo}}.png">
        </span>
    </div>
    <div class="crear-directiva" ng-show="papelerias">
        <div ng-repeat="papeleria in papelerias" ng-show="papeleriaActiva == papeleria.tipo">
            <div ng-repeat="modelo in papeleria.modelos  track by $index" class="modelo-papeleria-crear {{papeleria.tipo}}" data-modelo="{{modelo.nombre}}"
                data-index="{{modelo._id}}">
                <span ng-bind-html="crearPapeleria.sce.trustAsHtml(modelo.svg)"></span>
                <div class="combinacion-box">
                    <span ng-show="$parent.$parent.planBajo" class="accion" style="bottom: 75%;" ng-click="crearPapeleria.enviarEditor($parent.$index, $index)">
                        <p>{{::crearPapeleria.lang[7]}}</p>
                        <img src="assets/images/edit_white.svg" alt="">
                    </span>

                    <span ng-show="!$parent.$parent.planBajo" class="accion" style="bottom: 75%;" ng-click="crearPapeleria.activarPlanesSuperiores()">
                        <p>{{::crearPapeleria.lang[10]}}</p>
                        <img src="assets/images/payment.png" alt="">
                    </span>
                </div>
            </div>
        </div>
    </div>
    <md-button ng-show="tiene" ng-click="estado = false" class="boton-crear-papeleria ">{{::crearPapeleria.lang[9]}}</md-button>
    <div ng-show="!papelerias" style="height:100%;
display: flex;
justify-content: center;
align-items: center; width: 100%;">
        <img style="width: 25%;" style="display: block; margin: auto;" src="assets/images/gifs/c.gif">
    </div>
</div>