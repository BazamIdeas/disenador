<div ng-class="{'active':estado}" class="pop-papeleria-crear">
    <div class="categorias-papeleria" ng-show="papelerias">
        <span class="tab-papeleria" ng-click="$parent.papeleriaActiva = papeleria.tipo" ng-repeat="papeleria in papelerias" ng-class="{'seleccionada': papeleriaActiva == papeleria.tipo}">{{papeleria.tipo}}
            <div class="ejemplo-tab">
                <img class="{{papeleria.tipo}}" src="assets/images/{{papeleria.tipo}}.svg">
            </div>
        </span>
    </div>
    <div class="crear-directiva" ng-show="papelerias">
        <div ng-repeat="papeleria in papelerias" ng-show="papeleriaActiva == papeleria.tipo">
            <div ng-repeat="modelo in papeleria.modelos  track by $index" class="modelo-papeleria-crear {{papeleria.tipo}}">
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
    <md-button ng-show="tiene" ng-click="estado = false" class="boton-crear-papeleria ">GUARDADOS</md-button>
</div>

<style>
    .pop-papeleria-crear {
        position: absolute;
        bottom: 0;
        z-index: 10;
        height: 0%;
        background-color: white;
        overflow: hidden;
        width: 100vw;
        transition: height 0.5s;
    }

    .pop-papeleria-crear.active {
        height: 100vh;
    }

    .crear-directiva {
        height: calc(100vh - 30px);
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 1% 15px 1% 0%;
        background-color:#ECEFF0;
    }

    .crear-directiva>div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin: auto;
        justify-content: space-around;
    }
    
    .modelo-papeleria-crear.hoja, .pieza.hoja {
        width: calc((100% / 4 ) - 40px);
    }

    .modelo-papeleria-crear.tarjeta,.pieza.tarjeta{
        width: calc((100% / 3 ) - 40px);
    }

    .modelo-papeleria-crear {
        position: relative;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        margin:20px 0;
    }
</style>