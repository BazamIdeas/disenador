<div class="categorias-papeleria" ng-show="papeleriaCtrl.papelerias">
    <span class="tab-papeleria" ng-click="papeleriaCtrl.papeleriaActiva = papeleria.tipo" ng-class="{'seleccionada':papeleria.tipo == papeleriaCtrl.papeleriaActiva, 'hidden': !papeleria.tienePiezas}"
        ng-repeat="papeleria in papeleriaCtrl.papelerias">{{papeleria.tipo}}</span>
</div>
<div class="contenedor-papelerias" ng-show="papeleriaCtrl.papelerias">
    <div ng-repeat="papeleria in papeleriaCtrl.papelerias" class="papeleria-ejemplos" ng-show="papeleria.tipo == papeleriaCtrl.papeleriaActiva">
        <div ng-repeat="modelo in papeleria.modelos" ng-class="{'hidden': modelo.piezas == undefined}">
            <div class="flip-container {{papeleria.tipo}}" ng-repeat="piezaUsuario in modelo.piezas" ng-class="{'hover': piezaActiva == $index && piezaUsuario.caras[1]}">
                <div class="flipper">
                    <div class='overlay a-gif' ng-show="(papeleriaCtrl.peticion && papeleriaCtrl.papeleriaIndexElemento == $index)"></div>
                    <div class="front">
                        <span class="modelo-papeleria" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[0].svg)"></span>
                        <div class="combinacion-box">
                            <div ng-click="piezaActiva = (piezaActiva == $index) ? null : piezaActiva = $index" style="position: absolute; width: 100%; height: 100%; top: 0px; left:0px;"></div>
                            <span class="accion" style="bottom: 75%;" ng-click="  papeleriaCtrl.enviarEditor($parent.$parent.$index,$parent.$index,$index)">
                                <p>EDITAR</p>
                                <img src="assets/images/edit_white.svg" alt="">
                            </span>
                            <span class="accion" style="bottom: 54%;" ng-click="papeleriaCtrl.descargarPieza(piezaUsuario._id)">
                                <p>DESCARGAR</p>
                                <img src="assets/images/svg-icons/download.svg" alt="">
                            </span>
                            <span class="accion" style="bottom: 33%;" ng-click=" papeleriaCtrl.duplicarPieza(papeleria.tipo, modelo, piezaUsuario)">
                                <p>DUPLICAR</p>
                                <img src="assets/images/duplicate.png" alt="">
                            </span>
                            <span class="accion" style="bottom: 11%;" ng-click=" papeleriaCtrl.papeleriaIndexElemento = $index; papeleriaCtrl.eliminarPieza(modelo.piezas, piezaUsuario, $index)">
                                <p>ELIMINAR</p>
                                <img src="assets/images/close.png" alt="">
                            </span>
                        </div>
                    </div>
                    <div class="back">
                        <span class="modelo-papeleria" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[1].svg)"></span>
                        <div class="combinacion-box">
                            <div ng-click="piezaActiva = (piezaActiva == $index) ? null : piezaActiva = $index" style="position: absolute; width: 100%; height: 100%; top: 0px; left:0px;"></div>
                            <span class="accion" style="bottom: 75%;" ng-click=" papeleriaCtrl.enviarEditor($parent.$parent.$index,$parent.$index,$index)">
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
                            <span class="accion" style="bottom: 11%;" ng-click="papeleriaCtrl.papeleriaIndexElemento = $index; papeleriaCtrl.eliminarPieza(modelo.piezas, piezaUsuario, $index)">
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