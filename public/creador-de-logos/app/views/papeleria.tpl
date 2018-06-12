<div class="categorias-papeleria" ng-show="papeleriaCtrl.papelerias && papeleriaCtrl.tienePiezas">
    <span class="tab-papeleria" ng-click="papeleriaCtrl.papeleriaActiva = papeleria.tipo" ng-class="{'seleccionada':papeleria.tipo == papeleriaCtrl.papeleriaActiva, 'hidden': !papeleria.tienePiezas}"
        ng-repeat="papeleria in papeleriaCtrl.papelerias">{{papeleria.tipo}}</span>
</div>
<div class="contenedor-papelerias" ng-show="papeleriaCtrl.tienePiezas">
    <div ng-repeat="papeleria in papeleriaCtrl.papelerias" class="papeleria-ejemplos" ng-show="papeleria.tipo == papeleriaCtrl.papeleriaActiva">
            <div class="pieza {{papeleria.tipo}}" ng-repeat="piezaUsuario in papeleria.piezas" ng-class="{'hover': piezaActiva == piezaUsuario._id && piezaUsuario.caras[1]}">
                <div class='overlay a-gif' ng-show="papeleriaCtrl.peticion && papeleriaCtrl.papeleriaIndexElemento == piezaUsuario._id"></div>
                <span class="modelo-papeleria" ng-show="!piezaUsuario.caraActiva" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[0].svg)"></span>
                <span class="modelo-papeleria" ng-show="piezaUsuario.caraActiva" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[1].svg)"></span>

                <div class="combinacion-box">
                    <div ng-click="piezaActiva = (piezaActiva == piezaUsuario._id) ? null : piezaActiva = piezaUsuario._id" style="position: absolute; width: 100%; height: 100%; top: 0px; left:0px;     z-index: 3;"></div>
                    <span class="accion" style="bottom: 75%;" ng-click="  papeleriaCtrl.enviarEditor(piezaUsuario.indicePapeleria,piezaUsuario.indiceModelo,$index)">
                        <p>EDITAR</p>
                        <img src="assets/images/edit_white.svg" alt="">
                    </span>
                    <span class="accion" style="bottom: 51%;" ng-click="papeleriaCtrl.descargarPieza(piezaUsuario._id)">
                        <p>DESCARGAR</p>
                        <img src="assets/images/svg-icons/download.svg" alt="">
                    </span>
                    <span class="accion" style="bottom: 28%;" ng-click="  papeleriaCtrl.duplicarPieza(papeleria,piezaUsuario, $index)">
                        <p>DUPLICAR</p>
                        <img src="assets/images/duplicate.png" alt="">
                    </span>
                    <span class="accion" style="bottom: 4%;" ng-click="papeleriaCtrl.eliminarPieza(papeleria,$index)">
                        <p>ELIMINAR</p>
                        <img src="assets/images/close.png" alt="">
                    </span>
                </div>
<!--                 <div class="voltear-cara">
                    <md-icon>flip</md-icon>
                </div> -->
            </div>

    </div>
</div>
<div class="papeleria-nueva-mensaje" ng-if="papeleriaCtrl.papelerias && !papeleriaCtrl.tienePiezas">
    <h2>¿Aun no posees papelerias?</h2>
    <md-button ng-show="papeleriaCtrl.papelerias" ng-click="papeleriaCtrl.crearPapeleria = !papeleriaCtrl.crearPapeleria" class="boton-crear-papeleria">Crear Papeleria</md-button>
</div>
<md-button ng-show="papeleriaCtrl.papelerias && papeleriaCtrl.tienePiezas" ng-click="papeleriaCtrl.crearPapeleria = !papeleriaCtrl.crearPapeleria"
    class=" boton-crear-papeleria">Crear Papeleria</md-button>

<div ng-show="!papeleriaCtrl.papelerias" style="    height: calc(100% - 60px);
display: flex;
justify-content: center;
align-items: center;">
    <img style="width: 25%;" style="display: block; margin: auto;" src="assets/images/gifs/c.gif">
</div>

<bazam-crear-papeleria id-logo="papeleriaCtrl.idLogo" ng-if="papeleriaCtrl.papelerias" estado="papeleriaCtrl.crearPapeleria" tiene="papeleriaCtrl.tienePiezas"
    papelerias="papeleriaCtrl.papelerias" fuentes="papeleriaCtrl.fuentes"></bazam-crear-papeleria>