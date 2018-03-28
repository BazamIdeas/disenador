<div class="row" style="margin-bottom:0;" ng-class="{'verlogo': verlogo, 'verplanes': !verlogo}">
    <div class="plan col s4 plan-gratis" style="border-radius:0px;" ng-class="listarPlanes.desabilitado" ng-disable="listarPlanes.desabilitado">
        <div>
            <div class="logo-plan">
                <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
            </div>

            <div class="plan-body">
                <div class="plan-header">Plan Gratis</div>
                <p class="subtitulo-plan">Ten una prueba gratis de tu logo</p>
                <div style="padding:10px; 0">
                    <div class="plan-precio">GRATIS</div>
                    <div class="text-center">
                        <button style="background:silver !important; color:white !important;" ng-disabled="listarPlanes.peticion" ng-class="{'loading-white': listarPlanes.peticion}" class="boton-planes" ng-click="listarPlanes.avanzarCheckout(true)">DESCARGAR</button>
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
                <div style="padding:10px; 0">
                    <div class="plan-precio">{{::listarPlanes.precioSeleccionado(plan.precios, listarPlanes.moneda)}}</div>

                    <div class="text-center">
                        <button ng-disabled="listarPlanes.peticion" ng-class="{'loading-white':listarPlanes.peticion}" class="boton-planes" ng-click="listarPlanes.avanzarCheckout(plan, listarPlanes.moneda, true)">SELECCIONAR</button>
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
    .verlogo .plan>div {
        min-height: 90vh !important;
        border-radius: 0.8em;
        padding: 0 40px;
        padding-top: 16px;
    }


    .plan-body {
        text-align: center;
        line-height: 25px;
    }

    .plan-header {
        font-weight: bold;
        font-size: 20px;
        padding-top: 5%;
        font-family: maven-regular;
    }

    .plan-precio {
        font-size: 25px;
        text-align: center;
        font-family: maven-regular;
    }

    .boton-planes{
        background-color: white;
        border: none;
        border-radius: 4px;
        padding: 12px 10px 10px 10px;
        line-height: 13px;
        margin-top: 11px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        font-family: 'futura-heavy' !important;

    }

    .plan button:focus{
        background-color: none;
    }

    /* GRATIS */


    .plan-gratis>div {
        background: rgb(246, 246, 246);
    }

    .plan.col.s4.plan-gratis > div * {
        fill: #777777 !important;
        color: #777777 !important;
    }

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
        color:{{datos.fondo}} !important;
    }

        .plan.plan-primario .boton-planes{
        background-color:{{datos.fondo}} !important;
        color:{{datos.colores.nombre}};
    }

    div.contenedor-planes .plan .plan-header,
    div.contenedor-planes .plan .plan-body {
        border-radius: 0;
        font-family: 'futura-heavy' !important;
    }

    .logo-plan {
        width: 50%;
        margin: auto;
        background: white;
        border-radius: 50%;
        padding: 12px;
    }

    div.contenedor-planes .plan .plan-header {
        padding: 10px;
        text-align: center;
        color: white;
        font-size: 18px;
        border-radius: 5px 5px 0 0;
    }

    div.contenedor-planes .plan .plan-body {
        padding: 20px 30px;
        text-align: justify;
        color: gray;
        font-size: 12px;
        border-radius: 0 0 5px 5px;
    }

    .subtitulo-plan {
        font-size: 13px;
        font-family: maven-regular !important;
        margin-top: 0;
    }

ul.plan-lista {
    font-family: maven-regular;
    font-size: 13px;
}

</style>