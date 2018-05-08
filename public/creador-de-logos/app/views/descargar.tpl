<section class="body descargar">
    <div class="row">

        <div class="col s3 offset-s1">

            <div class="logo" style="height: 308px;">
                <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>

            </div>

            <div class="col l12" style="padding: 0;margin-top: 10px; text-align:center;">

                <div ng-if="!(descargar.plan.manual.valor == '1')" style="position: relative;">

                    <button style="margin:auto; display:block;width: 100%;" class="boton-verde manual necesita-aumentar" disabled>
                        <span>MANUAL DE IDENTIDAD</span>
                    </button>
                    <i class="material-icons candado-bloqueado">lock</i>
                </div>

                
                <button ng-disabled="descargar.esperaManual" style="margin:auto; display:block;width: 100%" class="manual"
                    ng-class="{'en-espera': descargar.esperaManual}" ng-click="descargar.manualMarca(descargar.logo.id)" ng-if="descargar.plan.manual.valor == '1'">
                    <span ng-if="!descargar.esperaManual">MANUAL DE IDENTIDAD</span>
                    <md-progress-circular ng-if="descargar.esperaManual" style="margin:auto;" class="md-hue-2" md-diameter="20px"></md-progress-circular>
                </button>

            </div>

        </div>
        <!-- ng-if="descargar.plan.png.valor == '1' || descargar.plan.editable.valor == '1'"-->
        <div class="col s7 previews">
            <div style="overflow:hidden; height: 308px;">
                <div ng-repeat="formato in descargar.formatosNoSociales | filter: {'nombre': descargar.formatoSeleccionado.nombre} track by formato.nombre" style="position: relative;margin-top: 20px;background: #fff; -webkit-box-shadow: 0px 1px 2px 1px #dedede;box-shadow: 0px 1px 2px 1px #dedede; text-align:center">
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'editable'" style="width: 48%;position: absolute;left: calc(49% - 23%);top: 0%;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'papeleria'" style="width: 12%;position: absolute;left: calc(57% - 23%);top: 32%;transform: rotate(-48deg);">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'papeleria'" style="width: 12%;position: absolute;left: calc(89% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(100%) invert(80%) contrast(100%);">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                    <img ng-if="descargar.formatoSeleccionado.nombre == 'papeleria'" src="assets/images/mockups/tarjeta.png" style="max-width:100%; height: 308px">
                </div>
                
                <div ng-repeat="formato in descargar.formatos track by formato.nombre" ng-if="descargar.formatoSeleccionado.nombre == formato.nombre" style="position: relative;background: #fff;-webkit-box-shadow: 0px 1px 2px 1px #dedede;box-shadow: 0px 1px 2px 1px #dedede; text-align:center">
                
                    <svg ng-if="descargar.formatoSeleccionado.nombre == 'facebook'" style="position: absolute; height:100%;" height="250" viewBox="0 0 400 250" preserveAspectRatio="xMinYMin meet">
                        <foreignObject x="20" y="20" width="62" height="62">
                            <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                        </foreignObject>
                    </svg>
                    <svg ng-if="descargar.formatoSeleccionado.nombre == 'facebook'" style="position: absolute; height:100%;" height="250" viewBox="0 0 400 250" preserveAspectRatio="xMinYMin meet">
                        <foreignObject x="20" y="20" width="62" height="62">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </svg>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'whatsapp'" style="width: 24.5%;position: absolute;border-radius: 50%;left: calc(55.6% - 18%);top: 25.5%;background: transparent;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'instagram'" style="width: 4.6%;position: absolute;border-radius: 50%;left: calc(44.34% - 18%);top: 21%;background: #fff;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'instagram'" style="width: 32.5%;position: absolute;left: calc(52.3% - 18%);top: 33.8%;background: #fff0;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'google-plus'" style="width: 3.45%;position: absolute;left: calc(68.3% - 18%);top: 38.3%;background: #fff;border-radius: 50%;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'google-plus'" style="width: 13.5%;position: absolute;left: calc(73.3% - 18%);top: 9.8%;background: #fff0;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'youtube'" style="width: 7.5%;position: absolute;left: calc(61% - 18%);top: 7.3%;background: #fff;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'youtube'" style="width: 14.5%;position: absolute;left: calc(70.3% - 18%);top: 5.8%;background: #fff0;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'twitter'" style="width: 7.4%;position: absolute;left: calc(46.1% - 18%);top: 34.2%;background: #fff;border-radius: 50%;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'twitter'" style="width: 17.6%;position: absolute;left: calc(60.3% - 18%);top: 5.8%;background: #fff0;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'linkedin'" style="width: 5%;position: absolute;left: calc(47.8% - 18%);top: 6.6%;background: #fff;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'pinterest'" style="width: 6.3%;position: absolute;left: calc(50.3% - 18%);top: 18.2%;background: #fff;border-radius: 50%;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'telegram'" style="width: 5.1%;position: absolute;left: calc(69.8% - 18%);top: 11.3%;background: #fff;border-radius: 50%;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                
                    <div ng-if="descargar.formatoSeleccionado.nombre == 'vimeo'" style="width: 19.8%;position: absolute;left: calc(46.3% - 18%);top: 23%;background: #fff;">
                        <bazam-visualizar data-svg="::descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                    </div>
                
                    <img src="assets/images/redes/{{::formato.nombre}}.jpg" style="max-width:100%; height: 308px">
                </div>
            </div>

            <div ng-if="descargar.plan.png.valor == '1' || descargar.plan.editable.valor == '1'" style="margin-top: 10px;">
                <button class="boton-verde" style="width:49.5%; margin-top: 10px; margin-right: 0.5% !important;" ng-click="descargar.descargar(descargar.formatoSeleccionado.nombre, descargar.formatoSeleccionado.ancho)">DESCARGAR {{descargar.formatoSeleccionado.nombre | uppercase}} ({{descargar.formatoSeleccionado.ancho}}px)
                </button><!--
                --><button style="width:49.5%; margin-top: 5px; margin-left: 0.5% !important;" ng-click="descargar.descargarTodo()">DESCARGAR TODO
                </button>
            </div>

            <div ng-if="!(descargar.plan.png.valor == '1' || descargar.plan.editable.valor == '1')" style="position: relative;">
                <button class="necesita-aumentar" style="width:49.5%; margin-top: 5px; margin-left: 0.5% !important;">DESCARGAR {{descargar.formatoSeleccionado.nombre | uppercase}} ({{descargar.formatoSeleccionado.ancho}} x
                    {{descargar.formatoSeleccionado.ancho}})

                </button>
                <i class="material-icons candado-bloqueado">lock</i>
            </div>
        </div>
    </div>

    <div class="row">

        <div class="col s10 offset-s1 formats" style="margin-top: 30px;">

            <div class="col s1" ng-repeat="formato in descargar.formatosNoSociales track by formato.nombre">
                
                <div class="formato" style="margin-bottom: 20px;padding-top:0%;" ng-click="descargar.seleccionar(formato)" ng-if="(formato.nombre == 'editable' && descargar.plan.editable.valor == '1') || (formato.nombre == 'papeleria' && descargar.plan.png.valor == '1') || (formato.nombre != 'editable' && formato.nombre != 'papeleria')">
                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                    <img ng-if="descargar.formatoSeleccionado.nombre == formato.nombre" style="width:100%;background-color: #e7ebee; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{::formato.nombre}}_active.png">

                    <img ng-if="descargar.formatoSeleccionado.nombre != formato.nombre" style="width:100%;background-color: #e7ebee; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{::formato.nombre}}_normal.png">
                </div>
                
                <div class="formato" style="margin-bottom: 20px;padding-top:0%; position: relative;" ng-if="(formato.nombre == 'editable' && descargar.plan.editable.valor == '0') || (formato.nombre == 'papeleria' && descargar.plan.png.valor == '0') || (formato.nombre != 'editable' && formato.nombre != 'papeleria')">
                    <img ng-if="descargar.formatoSeleccionado.nombre == formato.nombre" style="width:100%;background-color: #e7ebee; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{::formato.nombre}}_active.png" class="necesita-aumentar">

                    <img ng-if="descargar.formatoSeleccionado.nombre != formato.nombre" style="width:100%;background-color: #e7ebee; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{::formato.nombre}}_normal.png" class="necesita-aumentar">
                    <i class="material-icons candado-bloqueado">lock</i>
                </div>
            </div>

            <div class="col s1" ng-repeat="formato in descargar.formatos track by formato.nombre" ng-if="descargar.plan.png.valor == '0'">

                <div class="formato" style=" margin-bottom: 20px; text-align: center; position: relative;">
                    <img style="width:100%; max-width: 96px;" ng-src="/creador-de-logos/assets/images/descarga/{{::formato.nombre}}_normal.png" class="necesita-aumentar">
                    <i class="material-icons candado-bloqueado">lock</i>
                </div>
            </div>

            <div class="col s1" ng-repeat="formato in descargar.formatos track by formato.nombre" ng-if="descargar.plan.png.valor == '1'">
                <div class="formato" style=" margin-bottom: 20px; text-align: center;" ng-click="descargar.seleccionar(formato)">
                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                    <img ng-if="descargar.formatoSeleccionado.nombre == formato.nombre" style="width:100%; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{::formato.nombre}}_active.png">

                    <img ng-if="descargar.formatoSeleccionado.nombre != formato.nombre" style="width:100%; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{::formato.nombre}}_normal.png">
                </div>
            </div>


        </div>
    </div>

    <div class="row">

        <div class="col s10 offset-s1" style="text-align: center">
                <button class="boton-verde aumentar-plan" ng-if="descargar.mostrarAumento" ng-click="descargar.mostrarPlanesSuperiores = true">
                    <i class="material-icons" style="vertical-align: middle;">monetization_on</i>
                    <span style="vertical-align: middle;">MEJORAR MI PLAN</span>
                </button>
        </div>

    </div>

</section>

<planes-superiores ng-class="{'activo': descargar.mostrarPlanesSuperiores}">
    <div style="padding: 2%;">
        <cerrar-pop>
            <md-button ng-click="descargar.mostrarPlanesSuperiores = false" class="back-principal md-primary md-fab md-mini">
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
                    <md-select ng-model="descargar.moneda" ng-change="descargar.mps = true" placeholder="Moneda">
                        <md-option ng-value="moneda" ng-repeat="moneda in descargar.monedas">{{moneda.simbolo}}

                        </md-option>
                    </md-select>
                </md-input-container>
            </div>
        -->
        <div class="col s12" style="padding: 0 40px;">
            <div class="contenedor-planes" ng-if="descargar.mps">
                    <div class="plan" ng-repeat="plan in descargar.planes | filter: descargar.comprobarMonedas track by $index" ng-init="plan.indice = $index">
                        <div style="    border-right: 1px solid silver;
                        border-left: 1px solid silver;">
                            <div class="plan-header">
                                <div class="plan-nombre">{{plan.plan}}</div>
                                <div class="plan-precio">{{::descargar.precioSeleccionado(plan.precios, descargar.moneda)}}</div>
                            </div>
                            <div class="plan-body">
                                <div>
                                    <ul class="plan-lista">
                                        <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{::carac.descripcion}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="text-center">
                                <!--<md-button ng-disabled="descargar.peticion" ng-class="{'loading-purple':descargar.peticion}" class="md-raised md-primary boton-crear-logo">
                                    <!--ng-click="descargar.aumentarPlan(plan, descargar.moneda)"
                                    SELECCIONAR
                                </md-button>-->

                                <div style="display: flex;justify-content: space-evenly;">

                                        <div class="metodos">
            
                                            <div ng-repeat="pasarela in descargar.pasarelas track by $index">
                                                <input type="radio" id="{{pasarela.pasarela}}{{plan.indice}}" ng-model="plan.pasarelaElegida" ng-value="pasarela"/>
                                                <label style="display: flex;" for="{{pasarela.pasarela}}{{plan.indice}}">
                                                    
                                                    <img  ng-if="pasarela.pasarela == 'Paypal'"  width="50" height="auto"  src="assets/images/svg-icons/paypal_color.svg">
            
                                                    <img  ng-if="pasarela.pasarela == 'Stripe'"  width="25" height="auto" src="assets/images/svg-icons/credit_black.svg">
            
                                                </label>

                                                
                                            </div>
            
                                        </div>
            
                                        <div style="display: flex; align-items: center;">
                                            <button ng-if="plan.pasarelaElegida.pasarela == 'Paypal'" type="submit" ng-class="{'loading-white': !descargar.completado}" ng-click="descargar.paypal(plan.pasarelaElegida.idPasarela, plan)">COMPRAR</button>
            
                                            <button ng-if="plan.pasarelaElegida.pasarela == 'Stripe'" type="submit" ng-class="{'loading-white': !descargar.completado}" ng-click="descargar.mostrarStripe(plan.pasarelaElegida.idPasarela, plan)">COMPRAR</button>
                                        </div>

                            </div>
                        </div>
                    </div>
                </div>


                <!---STRIPE-->
                
                <div class="credit" ng-if="descargar.datosStripe" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index :10; background-color:#1a1a1a9e">
                    <div ng-click="descargar.datosStripe = null" class="close-prev">
                        <md-icon>close</md-icon>
                    </div>
                    
                    <stripe-payment-form data-pasarela="descargar.datosStripe.idStripe" data-logo="descargar.datosStripe.idLogo" data-precio="descargar.datosStripe.idPrecio"></stripe-payment-form>
                </div>
                

            </div>
        </div>
    </div>
</planes-superiores>