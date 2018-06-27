<div class="bz-flex">
    <div class="categorias-papeleria" ng-show="papeleriaCtrl.papelerias && papeleriaCtrl.tienePiezas">
        <span class="tab-papeleria" ng-click="papeleriaCtrl.papeleriaActiva = papeleria.tipo" ng-class="{'seleccionada':papeleria.tipo == papeleriaCtrl.papeleriaActiva, 'hidden': papeleria.piezas.length == 0}"
            ng-repeat="papeleria in papeleriaCtrl.papelerias">
            <md-tooltip md-direction="right">{{papeleria.label}}</md-tooltip>
            <img ng-src="/assets/images/iconos-descarga/{{papeleria.tipo}}.png">
        </span>
    </div>
    <div class="contenedor-papelerias" ng-show="papeleriaCtrl.tienePiezas">
        <div ng-repeat="papeleria in papeleriaCtrl.papelerias" class="papeleria-ejemplos" ng-show="papeleria.tipo == papeleriaCtrl.papeleriaActiva">
            <div class="pieza {{papeleria.tipo}}" ng-repeat="piezaUsuario in papeleria.piezas" ng-class="{'hover': piezaActiva == piezaUsuario._id && piezaUsuario.caras[1]}">
                <div class='overlay a-gif' ng-show="papeleriaCtrl.peticion && papeleriaCtrl.papeleriaIndexElemento == piezaUsuario._id"></div>
                <span class="modelo-papeleria" ng-show="!piezaUsuario.caraActiva" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[0].svg)"></span>
                <span class="modelo-papeleria" ng-show="piezaUsuario.caraActiva" ng-bind-html="papeleriaCtrl.sce.trustAsHtml(piezaUsuario.caras[1].svg)"></span>

                <div class="combinacion-box">
                    <span class="accion" style="bottom: 75%;" ng-click="  papeleriaCtrl.enviarEditor(piezaUsuario.indicePapeleria,piezaUsuario.indiceModelo, piezaUsuario)">
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
                    <div class="voltear-cara" ng-show="piezaUsuario.caras.length > 1" ng-click="piezaUsuario.caraActiva = !piezaUsuario.caraActiva">
                        <md-icon>flip</md-icon>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <md-button ng-show="papeleriaCtrl.papelerias && papeleriaCtrl.tienePiezas" ng-click="papeleriaCtrl.crearPapeleria = !papeleriaCtrl.crearPapeleria"
        class=" boton-crear-papeleria">Crear Papeleria</md-button>


</div>

<div ng-show="!papeleriaCtrl.papelerias" style="height: calc(100% - 60px);
display: flex;
justify-content: center;
align-items: center; width:100%;">
    <img style="width: 25%;" style="display: block; margin: auto;" src="assets/images/gifs/c.gif">
</div>

<bazam-crear-papeleria mostrar-planes-superiores="papeleriaCtrl.mostrarPlanesSuperiores" plan-bajo="papeleriaCtrl.planBajo"
    id-logo="papeleriaCtrl.idLogo" ng-if="papeleriaCtrl.papelerias" estado="papeleriaCtrl.crearPapeleria" tiene="papeleriaCtrl.tienePiezas"
    papelerias="papeleriaCtrl.papelerias" fuentes="papeleriaCtrl.fuentes"></bazam-crear-papeleria>

    <planes-superiores ng-class="{'activo': papeleriaCtrl.mostrarPlanesSuperiores}">
        <div style="padding: 2%;">
            <cerrar-pop>
                <md-button ng-click="papeleriaCtrl.mostrarPlanesSuperiores = false" class="back-principal md-primary md-fab md-mini">
                    <md-icon>close</md-icon>
                </md-button>
            </cerrar-pop>
            <h4 class="principal titulo-planes" style="text-align:center;">AUMENTE SU PLAN Y OBTENGA MEJORES BENEFICIOS</h4>
        </div>
        <div class="row margin-bottom-0">
            <!--
                <div class="col s3" style="padding: 0 40px;">
                    <p class="principal text-center">Cambiar moneda de pago:</p>
                    <md-input-container style="width:100%; padding: 10px;">
                        <md-select ng-model="papeleriaCtrl.moneda" ng-change="papeleriaCtrl.mps = true" placeholder="Moneda">
                            <md-option ng-value="moneda" ng-repeat="moneda in papeleriaCtrl.monedas">{{moneda.simbolo}}
    
                            </md-option>
                        </md-select>
                    </md-input-container>
                </div>
            -->
            <div class="col s12" style="padding: 0 40px;">
                <div class="contenedor-planes" ng-if="papeleriaCtrl.mps" style="    padding-top: 2%;">
                        <div class="plan" ng-repeat="plan in papeleriaCtrl.planes | filter: papeleriaCtrl.comprobarMonedas track by $index" ng-init="plan.indice = $index">
                            <div ng-class="{'has-one-plan': papeleriaCtrl.planes.lenght == 1}" style="    border-right: 1px solid silver;
                            border-left: 1px solid silver;">
                                <div class="plan-header">
                                    <div class="plan-nombre">{{plan.plan}}</div>
                                    <div class="plan-precio">{{::papeleriaCtrl.precioSeleccionado(plan.precios, papeleriaCtrl.moneda)}}</div>
                                </div>
                                <div class="plan-body">
                                    <div>
                                        <ul class="plan-lista">
                                            <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{::carac.descripcion}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <!--<md-button ng-disabled="papeleriaCtrl.peticion" ng-class="{'loading-purple':papeleriaCtrl.peticion}" class="md-raised md-primary boton-crear-logo">
                                        <!--ng-click="papeleriaCtrl.aumentarPlan(plan, papeleriaCtrl.moneda)"
                                        SELECCIONAR
                                    </md-button>-->
    
                                    <div style="display: flex;justify-content: space-evenly;">
    
                                            <div class="metodos">
                
                                                <div ng-repeat="pasarela in papeleriaCtrl.pasarelas track by $index">
                                                    <input type="radio" id="{{pasarela.pasarela}}{{plan.indice}}" ng-model="plan.pasarelaElegida" ng-value="pasarela"/>
                                                    <label style="display: flex;" for="{{pasarela.pasarela}}{{plan.indice}}">
                                                        
                                                        <img  ng-if="pasarela.pasarela == 'Paypal'"  width="50" height="auto"  src="assets/images/svg-icons/paypal_color.svg">
                
                                                        <img  ng-if="pasarela.pasarela == 'Stripe'"  width="25" height="auto" src="assets/images/svg-icons/credit_black.svg">
                
                                                    </label>
    
                                                    
                                                </div>
                
                                            </div>
                
                                            <div style="display: flex; align-items: center;">
                                                <button ng-if="plan.pasarelaElegida.pasarela == 'Paypal'" type="submit" ng-click="papeleriaCtrl.paypal(plan.pasarelaElegida.idPasarela, plan)">COMPRAR</button>
                
                                                <button ng-if="plan.pasarelaElegida.pasarela == 'Stripe'" type="submit"  ng-click="papeleriaCtrl.mostrarStripe(plan.pasarelaElegida.idPasarela, plan)">COMPRAR</button>
                                            </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
    
    
                    <!---STRIPE-->
                    
                    <div class="credit" ng-if="papeleriaCtrl.datosStripe" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index :10; background-color:#1a1a1a9e">
                        <div ng-click="papeleriaCtrl.datosStripe = null" class="close-prev">
                            <md-icon>close</md-icon>
                        </div>
                        
                        <stripe-payment-form data-pasarela="papeleriaCtrl.datosStripe.idStripe" data-logo="papeleriaCtrl.datosStripe.idLogo" data-precio="papeleriaCtrl.datosStripe.idPrecio"></stripe-payment-form>
                    </div>
                </div>
            </div>
        </div>
    </planes-superiores>