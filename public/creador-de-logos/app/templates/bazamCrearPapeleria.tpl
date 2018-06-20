<div ng-class="{'active':estado}" class="pop-papeleria-crear">
    <div class="categorias-papeleria" ng-show="papelerias">
        <span class="tab-papeleria" ng-show="papeleria.modelos.length > 0" ng-click="$parent.papeleriaActiva = papeleria.tipo" ng-repeat="papeleria in papelerias"
            ng-class="{'seleccionada': papeleriaActiva == papeleria.tipo}">
            <md-tooltip md-direction="right">{{papeleria.label}}</md-tooltip>
            <img src="/assets/images/iconos-descarga/{{papeleria.tipo}}.png"> 
        </span>
    </div>
    <div class="crear-directiva" ng-show="papelerias">
        <div ng-repeat="papeleria in papelerias" ng-show="papeleriaActiva == papeleria.tipo">

            <div ng-repeat="modelo in papeleria.modelos  track by $index" class="modelo-papeleria-crear {{papeleria.tipo}}" data-modelo="{{modelo.nombre}}"
                data-index="{{modelo._id}}">
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
    <md-button ng-show="botonCerrar && papelerias" ng-click="estado = false" class="boton-crear-papeleria ">CERRAR</md-button>
    <div ng-show="!papelerias" style="height:100%;
display: flex;
justify-content: center;
align-items: center;">
        <img style="width: 25%;" style="display: block; margin: auto;" src="assets/images/gifs/c.gif">
    </div>
</div>