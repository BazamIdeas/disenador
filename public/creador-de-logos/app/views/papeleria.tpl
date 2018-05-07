<div class="categorias-papeleria">
    <md-button ng-click="papeleriaCtrl.crearPapeleria = !papeleriaCtrl.crearPapeleria" class="md-primary md-raised" style="position: absolute;">Crear Papeleria</md-button>
    <div>Creaciones Guardadas</div>
</div>
<div ng-repeat="papeleria in papeleriaCtrl.papelerias" class="papeleria-ejemplos">

    <div ng-repeat="modelo in papeleria.modelos">
        <div ng-repeat="piezaUsuario in modelo.piezas">
            <span class="modelo-papeleria" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[0].svg)"></span>
            <div class="boton-ejemplo-papeleria" ng-click="papeleriaCtrl.enviarEditor($parent.$parent.$index,$parent.$index,$index)">MODIFICAR PIEZA</div>
        </div>
        <div ng-repeat="piezaUsuario in modelo.piezas">
            <span class="modelo-papeleria" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[0].svg)"></span>
            <div class="boton-ejemplo-papeleria" ng-click="papeleriaCtrl.enviarEditor($parent.$parent.$index,$parent.$index,$index)">MODIFICAR PIEZA</div>
        </div>
    </div>
</div>

<bazam-crear-papeleria id-logo="papeleriaCtrl.idLogo" estado="papeleriaCtrl.crearPapeleria"></bazam-crear-papeleria>

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

    .papeleria-ejemplos {
        display: flex;
        flex-wrap: wrap;
        height: 75%;
        overflow-y: scroll;
        overflow-x: hidden;
        justify-content: space-around;
    }

    .papeleria-ejemplos>div {
        width: 32vw;
        height: 21vw;
        margin: 0;
        padding: 0;
    }

    /* .papeleria-ejemplos>div span.modelo-papeleria {
        width: 50%;
        display: block;
        margin: auto;
    } */

    .papeleria-ejemplos>div img {
        width: 60%;
        margin: auto;
        display: block;
    }

    .boton-ejemplo-papeleria {
        padding: 8px;
        border: 1px solid black;
        border-radius: 30px;
        width: 55%;
        text-align: center;
        font-size: 14pt;
        margin: 9px auto;
        cursor: pointer;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .12);
    }
</style>