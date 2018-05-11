<div class="categorias-papeleria" ng-show="papeleriaCtrl.papelerias">
    <span class="tab-papeleria" ng-click="papeleriaCtrl.papeleriaActiva = papeleria.tipo" ng-class="{'seleccionada':papeleria.tipo == papeleriaCtrl.papeleriaActiva, 'hidden': !papeleria.tienePiezas}"
        ng-repeat="papeleria in papeleriaCtrl.papelerias">{{papeleria.tipo}}</span>
</div>
<div class="contenedor-papelerias" ng-show="papeleriaCtrl.papelerias">
    <div ng-repeat="papeleria in papeleriaCtrl.papelerias" class="papeleria-ejemplos" ng-show="papeleria.tipo == papeleriaCtrl.papeleriaActiva">
        <div ng-repeat="modelo in papeleria.modelos" ng-class="{'hidden': modelo.piezas == undefined}">
            <div class="flip-container" ng-repeat="piezaUsuario in modelo.piezas" ng-click="piezaActiva = (piezaActiva == $index) ? null : piezaActiva = $index" ng-class="{'hover': piezaActiva == $index && piezaUsuario.caras[1]}">
                <div class="flipper">
                    <div class="front">
                        <span class="modelo-papeleria" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[0].svg)"></span>
                        <div class="combinacion-box">
                                <span class="accion" style="bottom: 75%;" ng-click="papeleriaCtrl.enviarEditor($parent.$parent.$index,$parent.$index,$index)">
                                    <p>EDITAR</p>
                                    <img src="assets/images/edit_white.svg" alt="">
                                </span>
                                <span class="accion" style="bottom: 54%;" ng-click="papeleriaCtrl.descargarPieza(piezaUsuario._id)">
                                    <p>DESCARGAR</p>
                                    <img src="assets/images/svg-icons/download.svg" alt="">
                                </span>
                                <span class="accion" style="bottom: 33%;" ng-click="papeleriaCtrl.duplicarPieza(papeleria.tipo, modelo, piezaUsuario)">
                                    <p>DUPLICAR</p>
                                    <img src="assets/images/duplicate.png" alt="">
                                </span>
                                <span class="accion" style="bottom: 11%;" ng-click="papeleriaCtrl.eliminarPieza(modelo.piezas, piezaUsuario, $index)">
                                    <p>ELIMINAR</p>
                                    <img src="assets/images/close.png" alt="">
                                </span>
                            </div>
                    </div>
                    <div class="back">
                        <span class="modelo-papeleria" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[1].svg)"></span>
                        <div class="combinacion-box">
                            <span class="accion" style="bottom: 75%;" ng-click="papeleriaCtrl.enviarEditor($parent.$parent.$index,$parent.$index,$index)">
                                <p>EDITAR</p>
                                <img src="assets/images/edit_white.svg" alt="">
                            </span>
                            <span class="accion" style="bottom: 54%;" ng-click="papeleriaCtrl.descargarPieza(piezaUsuario._id)">
                                <p>DESCARGAR</p>
                                <img src="assets/images/svg-icons/download.svg" alt="">
                            </span>
                            <span class="accion" style="bottom: 33%;" ng-click="papeleriaCtrl.duplicarPieza(papeleria.tipo, modelo, piezaUsuario)">
                                <p>DUPLICAR</p>
                                <img src="assets/images/duplicate.png" alt="">
                            </span>
                            <span class="accion" style="bottom: 11%;" ng-click="papeleriaCtrl.eliminarPieza(modelo.piezas, piezaUsuario, $index)">
                                <p>ELIMINAR</p>
                                <img src="assets/images/close.png" alt="">
                            </span>
                        </div>
                    </div>
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

<bazam-crear-papeleria id-logo="papeleriaCtrl.idLogo" ng-if="papeleriaCtrl.papelerias" estado="papeleriaCtrl.crearPapeleria"
    papelerias="papeleriaCtrl.papelerias"></bazam-crear-papeleria>

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

    .papeleria-ejemplos>div>div:hover span.accion,
    .modelo-papeleria-crear:hover span.accion {
        opacity: 1;
        background: rgba(0, 0, 0, 0.5);
    }

    .contenedor-papelerias > div {
        height: 100%;
    }

    .papeleria-ejemplos>div {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        margin: auto;
    }

    .papeleria-ejemplos>div>div {
        width: 23%;
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


    /* entire container, keeps perspective */

    .flip-container {
        perspective: 1000px;
    }

    /* flip the pane when hovered */

    .flip-container.hover .flipper {
        transform: rotateY(180deg);
    }

    /* flip speed goes here */

    .flipper {
        transition: 0.6s;
        transform-style: preserve-3d;
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    /* hide back of pane during swap */

    .front,
    .back {
        backface-visibility: hidden;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
    }

    .front:hover,
    .back:hover{
        box-shadow: 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12);
    }

    /* front pane, placed above back */

    .front {
        z-index: 2;
        /* for firefox 31 */
        transform: rotateY(0deg);
    }

    /* back, initially hidden pane */

    .back {
        transform: rotateY(180deg);
    }
</style>