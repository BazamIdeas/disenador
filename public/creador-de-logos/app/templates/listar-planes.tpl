<div class="row">
    <div class="plan col s4" style="border-radius:0px;" ng-class="listarPlanes.desabilitado" ng-disable="listarPlanes.desabilitado">
        <div>
            <div class="plan-header">Plan Gratis</div>
            <div class="plan-body">
                <p class="subtitulo-plan">descripcion</p>

                <ul class="plan-lista">
                    <li>Poderosamente gratis</li>
                </ul>

                <div class="plan-precio">GRATIS</div>

                <div class="text-center">
                    <button ng-disabled="listarPlanes.peticion" ng-class="{'loading-white': listarPlanes.peticion}" class="boton-verde" ng-click="listarPlanes.avanzarCheckout(true)">DESCARGAR</button>
                </div>
            </div>
        </div>
    </div>

    <div class="plan col s4" ng-repeat="plan in listarPlanes.planes | filter: listarPlanes.comprobarMonedas track by $index"
        style="border-radius:0px;" ng-class="{'plan-principal': plan.plan == 'Plan Profesional', 'plan-secundario': plan.plan == 'Plan Básico'}">
        <div>
            <div class="plan-header">{{::plan.plan}}</div>
            <div class="plan-body">
                <p class="subtitulo-plan">{{::plan.info}}</p>

                <ul class="plan-lista">
                    <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{::carac.descripcion}}</li>
                </ul>

                <div class="plan-precio">{{::listarPlanes.precioSeleccionado(plan.precios, listarPlanes.moneda)}}</div>

                <div class="text-center">
                    <button ng-disabled="listarPlanes.peticion" ng-class="{'loading-white':listarPlanes.peticion}" class="boton-verde" ng-click="listarPlanes.avanzarCheckout(plan, listarPlanes.moneda, true)">SELECCIONAR</button>
                </div>
            </div>
        </div>
    </div>
</div>