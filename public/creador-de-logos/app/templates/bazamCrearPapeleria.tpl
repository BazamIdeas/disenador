<div ng-class="{'active':estado}" class="pop-papeleria-crear">
    <div class="categorias-papeleria" ng-show="papelerias">
        <span class="tab-papeleria" ng-click="$parent.papeleriaActiva = papeleria.tipo" ng-repeat="papeleria in papelerias" ng-class="{'seleccionada': papeleriaActiva == papeleria.tipo}">{{papeleria.tipo}}</span>
    </div>
    <div class="crear-directiva" ng-show="papelerias">
        <div ng-repeat="papeleria in papelerias" ng-show="papeleriaActiva == papeleria.tipo">
            <div ng-repeat="modelo in papeleria.modelos | orderBy: 'nombre'" class="modelo-papeleria-crear">
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
    <md-button ng-show="tiene" ng-click="estado = false" class="boton-crear-papeleria">GUARDADAS</md-button>
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
        height: 80%;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 1%;

    }

    .crear-directiva>div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin: auto;
        justify-content: space-around;
    }

    .modelo-papeleria-crear {
        position: relative;
        width: 31%;
        margin-bottom: 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
</style>