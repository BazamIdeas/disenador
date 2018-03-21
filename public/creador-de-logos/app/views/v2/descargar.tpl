<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col s2 logo">
            <h5 class="secundario" ui-sref="cuenta">
                <i class="material-icons md-48 aling-top">fingerprint</i>
                <span>DISEÑADOR</span>
            </h5>
        </div>
        <div class="col s10 texto">
            <h5 class="principal">DESCARGUE SU LOGO EN EL TAMAÑO PERFECTO</h5>
        </div>

    </div>
</section>
<style>
    .aumentar-plan {
        position: absolute;
        top: 0%;
        margin-top: 0px !important;
        width: 100%;
        opacity: 0.3;
    }

    .aumentar-plan:hover {
        opacity: 1;
    }

    planes-superiores {
        background: white;
        width: 100%;
        height: 0;
        position: absolute;
        bottom: 0;
        z-index: 2;
        transition: all 0.5s;
    }

    planes-superiores.activo {
        height: 100vh;
    }

    .necesita-aumentar {

        opacity: 0.4;
        filter: grayscale(100%);
        cursor: not-allowed;
    }

    .candado-bloqueado {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 12px);
        z-index: 2;
    }

    cerrar-pop {
        position: absolute;
        right: 1%;
        top: 1%;
    }

    .back-principal,
    .back-principal:focus {
        background: var(--tercero) !important;
    }
</style>

<section style="height: calc(100vh - 135px) !important;overflow: hidden;">
    <div class="row margin-bottom-0" style="overflow: hidden;">

        <div class="col s4 offset-s1">

            <div class="col l9 logo-final" style="padding: 0;margin-top: 20px; position: relative">
                <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                <button class="boton-verde aumentar-plan" ng-if="descargar.mostrarAumento" ng-click="descargar.mostrarPlanesSuperiores = true">
                    <i class="material-icons" style="vertical-align: middle;">monetization_on</i>
                    <span style="vertical-align: middle;">MEJORAR MI PLAN</span>
                </button>

            </div>

            <div class="col l9" style="padding: 0;margin-top: 5px; text-align:center;">
                <!--BLOQUEADO -->
                <div ng-if="!(descargar.plan.manual.valor == '1')" style="position: relative;">

                    <button style="margin:auto; display:block;width: 100%;" class="boton-verde manual necesita-aumentar">
                        <span>MANUAL DE IDENTIDAD</span>
                    </button>
                    <i class="material-icons candado-bloqueado">lock</i>
                </div>

                <!--DESBLOQUEADO -->
                <button ng-disabled="descargar.esperaManual" style="margin:auto; display:block;width: 100%" class="boton-verde manual" style="background-color: var(--principal)"
                    ng-class="{'en-espera': descargar.esperaManual}" ng-click="descargar.manualMarca(descargar.logo.id)" ng-if="descargar.plan.manual.valor == '1'">
                    <span ng-if="!descargar.esperaManual">MANUAL DE IDENTIDAD</span>
                    <md-progress-circular ng-if="descargar.esperaManual" style="margin:auto;" class="md-hue-2" md-diameter="20px"></md-progress-circular>
                </button>



            </div>
            <!--<div class="col l9" style="padding: 0;margin-top: 5px" ng-if="!(descargar.plan.manual.valor == '1')" >
                <button style="margin:auto; visibility: hidden; width: 100%; " class="boton-verde manual">X</button>
            </div>
        -->

        </div>
        <!-- ng-if="descargar.plan.png.valor == '1' || descargar.plan.editable.valor == '1'"-->
        <div class="col s6 text-center" style="background-color: white;padding:0 .75rem; max-height: 323px">

            <div ng-repeat="formato in descargar.formatosNoSociales | filter: {'nombre': descargar.formatoSeleccionado.nombre} track by formato.nombre"
                style="position: relative;margin-top: 20px;background: #fff; border-radius: 5px;;-webkit-box-shadow: 0px 1px 2px 1px #dedede;box-shadow: 0px 1px 2px 1px #dedede; height: 323px;width: 660.5px;">

                <div ng-if="descargar.formatoSeleccionado.nombre == 'editable'" style="width: 48%;position: absolute;left: calc(49% - 23%);top: 0%;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>

                <div ng-if="descargar.formatoSeleccionado.nombre == 'papeleria'" style="width: 12%;position: absolute;left: calc(57% - 23%);top: 32%;transform: rotate(-48deg);">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <div ng-if="descargar.formatoSeleccionado.nombre == 'papeleria'" style="width: 12%;position: absolute;left: calc(89% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(100%) invert(80%) contrast(100%);">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <img ng-if="descargar.formatoSeleccionado.nombre == 'papeleria'" src="assets/images/mockups/tarjeta.png" style="max-width:100%; height: 323px">
            </div>

            <div ng-repeat="formato in descargar.formatos track by formato.nombre" ng-if="descargar.formatoSeleccionado.nombre == formato.nombre"
                style="position: relative;margin-top: 20px;background: #fff; border-radius: 5px;;-webkit-box-shadow: 0px 1px 2px 1px #dedede;box-shadow: 0px 1px 2px 1px #dedede;width: 660.5px;">

                <div ng-if="descargar.formatoSeleccionado.nombre == 'facebook'" style="width: 11.5%;position: absolute;left: calc(33% - 18%);top: 8%;background: #fff;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <div ng-if="descargar.formatoSeleccionado.nombre == 'facebook'" style="width: 21.5%;position: absolute;left: calc(64% - 18%);top: 6.8%;background: #fff;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'whatsapp'" style="width: 24.5%;position: absolute;border-radius: 50%;left: calc(55.6% - 18%);top: 25.5%;background: transparent;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'instagram'" style="width: 4.6%;position: absolute;border-radius: 50%;left: calc(44.34% - 18%);top: 21%;background: #fff;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <div ng-if="descargar.formatoSeleccionado.nombre == 'instagram'" style="width: 32.5%;position: absolute;left: calc(52.3% - 18%);top: 33.8%;background: #fff0;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'google-plus'" style="width: 3.45%;position: absolute;left: calc(68.3% - 18%);top: 38.3%;background: #fff;border-radius: 50%;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <div ng-if="descargar.formatoSeleccionado.nombre == 'google-plus'" style="width: 13.5%;position: absolute;left: calc(73.3% - 18%);top: 9.8%;background: #fff0;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>

                <div ng-if="descargar.formatoSeleccionado.nombre == 'youtube'" style="width: 7.5%;position: absolute;left: calc(61% - 18%);top: 7.3%;background: #fff;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <div ng-if="descargar.formatoSeleccionado.nombre == 'youtube'" style="width: 14.5%;position: absolute;left: calc(70.3% - 18%);top: 5.8%;background: #fff0;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'twitter'" style="width: 7.4%;position: absolute;left: calc(46.1% - 18%);top: 34.2%;background: #fff;border-radius: 50%;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <div ng-if="descargar.formatoSeleccionado.nombre == 'twitter'" style="width: 17.6%;position: absolute;left: calc(60.3% - 18%);top: 5.8%;background: #fff0;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'linkedin'" style="width: 5%;position: absolute;left: calc(47.8% - 18%);top: 6.6%;background: #fff;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'pinterest'" style="width: 6.3%;position: absolute;left: calc(50.3% - 18%);top: 18.2%;background: #fff;border-radius: 50%;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'telegram'" style="width: 5.1%;position: absolute;left: calc(69.8% - 18%);top: 11.3%;background: #fff;border-radius: 50%;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>


                <div ng-if="descargar.formatoSeleccionado.nombre == 'vimeo'" style="width: 19.8%;position: absolute;left: calc(46.3% - 18%);top: 23%;background: #fff;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>

                <img src="assets/images/redes/{{formato.nombre}}.jpg" style="max-width:100%; height: 323px">
            </div>
            <div ng-if="descargar.plan.png.valor == '1' || descargar.plan.editable.valor == '1'">
                <button class="boton-verde" style="background-color: var(--principal); width:100%; margin-top: 5px" ng-click="descargar.descargar(descargar.formatoSeleccionado.nombre, descargar.formatoSeleccionado.ancho)">DESCARGAR {{descargar.formatoSeleccionado.nombre | uppercase}} ({{descargar.formatoSeleccionado.ancho}} x
                    {{descargar.formatoSeleccionado.ancho}})
                </button>
            </div>

            <div ng-if="!(descargar.plan.png.valor == '1' || descargar.plan.editable.valor == '1')" style="position: relative;">
                <button class="boton-verde necesita-aumentar" style="background-color: var(--principal); width:100%; margin-top: 5px">DESCARGAR {{descargar.formatoSeleccionado.nombre | uppercase}} ({{descargar.formatoSeleccionado.ancho}} x
                    {{descargar.formatoSeleccionado.ancho}})

                </button>
                <i class="material-icons candado-bloqueado">lock</i>
            </div>



        </div>



        <div class="col s10 offset-s1" style="display:flex; padding: 20px 0;">

            <div ng-repeat="formato in descargar.formatosNoSociales track by formato.nombre">
                <!--DESBLOQUEADO-->
                <div class="formato" style="margin-bottom: 20px;padding-top:0%;" ng-click="descargar.seleccionar(formato)" ng-if="(formato.nombre == 'editable' && descargar.plan.editable.valor == '1') || (formato.nombre == 'papeleria' && descargar.plan.png.valor == '1') || (formato.nombre != 'editable' && formato.nombre != 'papeleria')">
                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                    <img ng-class="{'img-filter': descargar.formatoSeleccionado.nombre !== formato.nombre}" style="width:80%;background-color: #e7ebee; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                </div>
                <!--BLOQUEADO-->
                <div class="formato" style="margin-bottom: 20px;padding-top:0%; position: relative;" ng-if="(formato.nombre == 'editable' && descargar.plan.editable.valor == '0') || (formato.nombre == 'papeleria' && descargar.plan.png.valor == '0') || (formato.nombre != 'editable' && formato.nombre != 'papeleria')">
                    <img style="width:80%;background-color: #e7ebee; max-width: 96px;" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png"
                        class="necesita-aumentar">
                    <i class="material-icons candado-bloqueado">lock</i>
                </div>
            </div>

            <!--BLOQUEADOS-->
            <div ng-repeat="formato in descargar.formatos track by formato.nombre" ng-if="descargar.plan.png.valor == '0'">


                <div class="formato" style=" margin-bottom: 20px; text-align: center; position: relative;">
                    <img style="width:80%; max-width: 96px;" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png" class="necesita-aumentar">
                    <i class="material-icons candado-bloqueado">lock</i>
                </div>
            </div>

            <!--DESBLOQUEADOS-->
            <div ng-repeat="formato in descargar.formatos track by formato.nombre" ng-if="descargar.plan.png.valor == '1'">
                <div class="formato" style=" margin-bottom: 20px; text-align: center;" ng-click="descargar.seleccionar(formato)">
                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                    <img ng-class="{'img-filter': descargar.formatoSeleccionado.nombre !== formato.nombre}" style="width:80%; max-width: 96px;"
                        ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                </div>
            </div>


        </div>
    </div>



</section>

<planes-superiores ng-class="{'activo': descargar.mostrarPlanesSuperiores}">
    <div>
        <cerrar-pop>
            <md-button ng-click="descargar.mostrarPlanesSuperiores = false" class="back-principal md-primary md-fab md-mini">
                <md-icon>close</md-icon>
            </md-button>
        </cerrar-pop>
        <h4 class="principal titulo-planes" style="text-align:center;">ESCOJA EL MEJOR PLAN PARA USTED</h4>
    </div>
    <div class="row margin-bottom-0">

        <div class="col s3" style="padding: 0 40px;">
            <p class="principal text-center">Cambiar moneda de pago:</p>
            <md-input-container style="width:100%; padding: 10px;">
                <md-select ng-model="descargar.moneda" ng-change="descargar.mps = true" placeholder="Moneda">
                    <md-option ng-value="moneda" ng-repeat="moneda in descargar.monedas">{{moneda.simbolo}}

                    </md-option>
                </md-select>
            </md-input-container>
        </div>
        <div class="col s9" style="padding: 0 40px;">

            <p class="tercero text-center"></p>

            <div class="contenedor-planes" ng-if="descargar.mps">

                <div class="row">

                    <div class="plan col s4" ng-repeat="plan in descargar.planes | filter: descargar.comprobarMonedas">
                        <div>
                            <div class="plan-header">{{plan.plan}}</div>
                            <div class="plan-body">
                                <p>{{plan.info}}</p>

                                <ul class="plan-lista">
                                    <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{carac.descripcion}}</li>
                                </ul>

                                <div class="plan-precio">{{descargar.precioSeleccionado(plan.precios, descargar.moneda)}}</div>

                                <div class="text-center">
                                    <button class="boton-verde" ng-click="descargar.aumentarPlan(plan, descargar.moneda)">SELECCIONAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</planes-superiores>