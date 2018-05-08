<div class="categorias-papeleria">
    <md-button ng-click="papeleriaCtrl.crearPapeleria = !papeleriaCtrl.crearPapeleria" class="md-primary md-raised" style="position: absolute;">Crear Papeleria</md-button>
    <div>Creaciones Guardadas</div>
</div>
<div class="contenedor-papelerias">
    <div ng-repeat="papeleria in papeleriaCtrl.papelerias" class="papeleria-ejemplos">
        <div ng-repeat="modelo in papeleria.modelos" ng-class="{'hidden': modelo.piezas == undefined}">
            <div ng-repeat="piezaUsuario in modelo.piezas" style="position: relative;">
                <span class="modelo-papeleria" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[0].svg)"></span>
                <div class="combinacion-box">
                    <span class="accion" style="bottom: 81%;" ng-click="papeleriaCtrl.enviarEditor($parent.$parent.$index,$parent.$index,$index)">
                        <p>EDITAR</p>
                        <img src="assets/images/edit_white.svg" alt="">
                    </span>
                    <span class="accion" style="bottom: 63%;" ng-click="papeleriaCtrl.descargarPieza(piezaUsuario._id)">
                        <p>DESCARGAR</p>
                        <img src="assets/images/svg-icons/download.svg" alt="">
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
<div ng-if="!papeleriaCtrl.papelerias">
    <img style="width: 50%;" style="display: block; margin: auto;" src="assets/logo.pro.svg">
</div>

<bazam-crear-papeleria id-logo="papeleriaCtrl.idLogo" estado="papeleriaCtrl.crearPapeleria" papelerias="papeleriaCtrl.papelerias"></bazam-crear-papeleria>

<style>
    .categorias-papeleria>div {
        padding: 10px;
        font-size: 25pt;
        text-transform: capitalize;
        flex: 1;
        text-align: center;
    }

    .categorias-papeleria {
        display: flex;
        padding: 20px 0px;
        height: 15%;
    }

    .contenedor-papelerias {
        height: 75%;
        display: flex;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .papeleria-ejemplos {
        padding-left: 1%;
    }

    .papeleria-ejemplos span.accion,
    .papeleria-ejemplos span.comprar {
        opacity: 1;
    }

    .papeleria-ejemplos>div {
        width: 32vw;
        height: 21vw;
        margin: 0;
        padding: 0;
    }

    .papeleria-ejemplos>div.hidden {
        display: none;
    }
</style>