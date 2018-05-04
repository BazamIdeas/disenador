<!-- <div class="categorias-papeleria">
    <div ng-click="papeleriaCtrl.crearPapeleria = true">Crear Papeleria</div>
    <div ng-repeat="papeleria in papeleriaCtrl.papelerias" ng-click="papeleriaCtrl.papeleriaActiva = papeleria.tipo">{{papeleria.tipo}}</div>
</div>
<div ng-repeat="papeleria in papeleriaCtrl.papelerias" ng-show="papeleriaCtrl.papeleriaActiva == papeleria.tipo" class="papeleria-ejemplos">
    <div ng-repeat="modelo in papeleria.modelos">
        <div>
            <span ng-bind-html="papeleriaCtrl.sce.trustAsHtml(modelo.svg)"></span>
            <h4>{{modelo.nombre}}</h4>
        </div>
    </div>
</div> -->

<button ng-click="papeleriaCtrl.crearPapeleria = true">Abrir</button>

<bazam-crear-papeleria estado ="papeleriaCtrl.crearPapeleria"></bazam-crear-papeleria>

<style>
    .categorias-papeleria>div {
        padding: 10px;
        font-size: 25pt;
        text-transform: capitalize;
        margin-right: 20px;
        cursor: pointer;
    }

    .categorias-papeleria {
        display: flex;
        justify-content: center;
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
        width: 25vw;
        height: 25vw;
        border: 5px solid #d3e6ec;
        margin: 0;
        padding: 0;
    }

    .papeleria-ejemplos>div img {
        width: 60%;
        margin: auto;
        display: block;
    }

    .boton-ejemplo-papeleria {
        padding: 8px;
        border: 1px solid black;
        border-radius: 30px;
        width: 30%;
        font-size: 14pt;
        margin: 9px auto;
    }
</style>