<div class="contenedor-planes" ng-class="{'verlogo': verlogo, 'verplanes': !verlogo}">
    <div class="plan">
        <div>
            <div class="plan-header">
                <div class="plan-nombre">PLAN GRATUITO</div>
                <div class="plan-precio">GRATIS</div>
            </div>
            <div class="plan-body">
                <div>
                    <ul class="plan-lista">
                        <li>Versión pequeña de su logo</li>
                    </ul>
                </div>
            </div>
            <div class="text-center">
                <md-button ng-disabled="listarPlanes.peticion" ng-click="listarPlanes.verificarLogin(true)" class="md-raised md-primary boton-plan">
                    SELECCIONAR
                </md-button>
            </div>
        </div>
    </div>
    <div class="plan" ng-repeat="plan in listarPlanes.planes | filter: listarPlanes.comprobarMonedas track by $index">
        <div>
            <div class="plan-header">
                <div class="plan-nombre">{{plan.plan}}</div>
                <div class="plan-precio">{{::listarPlanes.precioSeleccionado(plan.precios, listarPlanes.moneda)}}</div>
            </div>
            <div class="plan-body">
                <div>
                    <ul class="plan-lista">
                        <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{::carac.descripcion}}</li>
                    </ul>
                </div>
            </div>
            <div class="text-center">
                <md-button ng-disabled="listarPlanes.peticion" ng-click="listarPlanes.verificarLogin(plan)" class="md-raised md-primary boton-crear-logo">
                    SELECCIONAR
                </md-button>
            </div>
        </div>
    </div>
</div>