<div ng-class="{'active':estado}" class="pop-papeleria-crear">
    <div class="categorias-papeleria" ng-show="papelerias">
        <span class="tab-papeleria" ng-click="$parent.papeleriaActiva = papeleria.tipo" ng-repeat="papeleria in papelerias" ng-class="{'seleccionada': papeleriaActiva == papeleria.tipo}">{{papeleria.tipo}}</span>
    </div>
    <div class="crear-directiva" ng-show="papelerias">
        <div ng-repeat="papeleria in papelerias" ng-show="papeleriaActiva == papeleria.tipo">
            <div ng-repeat="modelo in papeleria.modelos" class="modelo-papeleria-crear">
                <span ng-bind-html="crearPapeleria.sce.trustAsHtml(papeleria.ejemplo)"></span>
                <div class="combinacion-box">
                    <span class="accion" style="bottom: 81%;" ng-click="crearPapeleria.enviarEditor($parent.$index, $index)">
                        <p>Usar Diseño</p>
                        <img src="assets/images/edit_white.svg" alt="">
                    </span>
                </div>
            </div>
        </div>
    </div>
    <md-button ng-show="papelerias" ng-click="estado = false" class="boton-crear-papeleria">GUARDADAS</md-button>
</div>

<style>
    .pop-papeleria-crear {
        position: absolute;
        bottom: 0;
        z-index: 10;
        height: 0%;
        background-color: white;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100vw;
        transition: height 0.5s;
    }

    .pop-papeleria-crear.active {
        height: 90%;
    }

    .crear-directiva {
        height: 78%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .crear-directiva>div {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        margin: auto;
    }

    .modelo-papeleria-crear {
        position: relative;
        width: 30%;
        margin-left: 20px;
        margin-bottom: 20px;
    }
</style>