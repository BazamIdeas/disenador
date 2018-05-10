<div class="categorias-papeleria" ng-show="papeleriaCtrl.papelerias">
    <span class="tab-papeleria" ng-click="papeleriaCtrl.papeleriaActiva = papeleria.tipo" ng-class="{'seleccionada':papeleria.tipo == papeleriaCtrl.papeleriaActiva, 'hidden': !papeleria.tienePiezas}"
        ng-repeat="papeleria in papeleriaCtrl.papelerias">{{papeleria.tipo}}</span>
</div>
<div class="contenedor-papelerias" ng-show="papeleriaCtrl.papelerias">
    <div ng-repeat="papeleria in papeleriaCtrl.papelerias" class="papeleria-ejemplos" ng-show="papeleria.tipo == papeleriaCtrl.papeleriaActiva">
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
<md-button ng-show="papeleriaCtrl.papelerias" ng-click="papeleriaCtrl.crearPapeleria = !papeleriaCtrl.crearPapeleria" class="md-primary md-raised boton-crear-papeleria">Crear Papeleria</md-button>

<div ng-show="!papeleriaCtrl.papelerias" style="    height: calc(100% - 60px);
display: flex;
justify-content: center;
align-items: center;">
    <img style="width: 20%;" style="display: block; margin: auto;" src="assets/images/gifs/c.gif">
</div>

<bazam-crear-papeleria id-logo="papeleriaCtrl.idLogo" ng-if="papeleriaCtrl.papelerias" estado="papeleriaCtrl.crearPapeleria" papelerias="papeleriaCtrl.papelerias"></bazam-crear-papeleria>

<style>
    .categorias-papeleria {
        display: flex;
        padding: 10px 0px;
        height: 10%;
    }

    .categorias-papeleria .tab-papeleria {
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: capitalize;
        font-size: 18pt;
        cursor: pointer;
    }

    .tab-papeleria.seleccionada {
        color: #5981bc;
    }

    .contenedor-papelerias {
        height: 70%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .papeleria-ejemplos span.accion, .modelo-papeleria-crear span.accion,
    .papeleria-ejemplos span.comprar {
        opacity: 1;
    }

    .papeleria-ejemplos>div {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
    }

    .papeleria-ejemplos>div>div {
        width: 30vw;
        position: relative;
        margin-left: 20px;
        margin-bottom: 20px;
    }

    .hidden {
        display: none !important;
    }

    .boton-crear-papeleria {
        margin: auto !important;
        display: block !important;
        background: transparent !important;
        box-shadow: none !important;
        color: black !important;
        border: 1px solid !important;
        border-radius: 5px;
        font-size: 15pt;
        padding: 5px 25px;
    }
</style>