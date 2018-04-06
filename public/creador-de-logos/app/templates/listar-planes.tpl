<div class="row" style="margin-bottom:0;" ng-class="{'verlogo': verlogo, 'verplanes': !verlogo}">
    <div class="plan col s4 plan-gratis" style="border-radius:0px;">
        <div>
            <div class="logo-plan">
                <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
            </div>

            <div class="plan-body">
                <div class="plan-header">Plan Gratis</div>
                <p class="subtitulo-plan">Ten una prueba gratis de tu logo</p>
                <div style="padding:10px;">
                    <div class="plan-precio">GRATIS</div>
                    <div class="text-center">
                        <button style="background:silver !important; color:white !important;" ng-disabled="listarPlanes.peticion" ng-class="{'loading-white': listarPlanes.peticion}" class="boton-planes" ng-click="listarPlanes.verificarLogin(true)">DESCARGAR</button>
                    </div>
                </div>
                <ul class="plan-lista">
                    <li>Version pequeña de su logo</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="plan col s4" ng-repeat="plan in listarPlanes.planes | filter: listarPlanes.comprobarMonedas track by $index"
        style="border-radius:0px;" ng-class="{'plan-primario': plan.plan == 'Plan Profesional', 'plan-secundario': plan.plan == 'Plan Básico'}">
        <div>
            <div class="logo-plan">
                <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
            </div>
            <div class="plan-body">
                <div class="plan-header">{{::plan.plan}}</div>
                <p class="subtitulo-plan">{{::plan.info}}</p>
                <div style="padding:10px;">
                    <div class="plan-precio">{{::listarPlanes.precioSeleccionado(plan.precios, listarPlanes.moneda)}}</div>

                    <div class="text-center">
                        <button ng-disabled="listarPlanes.peticion" ng-class="{'loading-white':listarPlanes.peticion}" class="boton-planes" ng-click="listarPlanes.verificarLogin(plan)">SELECCIONAR</button>
                    </div>
                </div>

                <ul class="plan-lista">
                    <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{::carac.descripcion}}</li>
                </ul>

            </div>
        </div>
    </div>
</div>

<style>

    /* SECUNDARIO */

    .plan.plan-secundario>div {
        background-color:{{datos.colores.icono}} !important;
    }

    .plan.plan-secundario .plan-header, .plan.plan-secundario .plan-body, .plan.plan-secundario .plan-precio {
        color:{{datos.colores.nombre}} !important;
    }

    .plan.plan-secundario .boton-planes{
        background-color:{{datos.colores.nombre}} !important;
        color:{{datos.colores.icono}};
    }

    /* PRIMARIO */

    .plan.plan-primario>div {
        background-color:{{datos.colores.nombre}} !important;
    }

    .plan.plan-primario .plan-header,  .plan.plan-primario .plan-body, .plan.plan-primario .plan-precio {
        color:{{datos.colores.icono}} !important;
    }

    .plan.plan-primario .boton-planes{
        background-color:{{datos.colores.icono}} !important;
        color:{{datos.colores.nombre}};
    }

</style>