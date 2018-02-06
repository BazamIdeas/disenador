<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col s2 logo">
            <h5 class="secundario" ui-sref="principal.comenzar">
                <i class="material-icons md-48 aling-top">fingerprint</i>
                <span>DISEÑADOR</span>
            </h5>
        </div>
        <div class="col s10 texto">
            <h5 class="principal">DESCARGUE SU LOGO EN EL TAMAÑO PERFECTO</h5>
        </div>

    </div>
</section>

<section style="height: calc(100vh - 135px) !important;overflow: hidden;">
    <div class="row margin-bottom-0" style="overflow: hidden;">

        <div class="col s2 offset-s1">

            <div class="row caja ">

                <p class="tercero text-center">MI LOGO</p>

                <div class="col l10 offset-l1 logo-final" style="margin-bottom: 30px">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>

            </div>

            <div class="row" ng-if="descargar.plan.manual">
                <button style="margin:auto; display:block;" class="boton-verde ng-binding" style="background-color: var(--principal)" ng-click="descargar.manualMarca(descargar.logo.id)">
                    MANUAL DE IDENTIDAD</button>
            </div>
        </div>

        <div class="col s4">

            <div class="row caja">

                <p class="tercero text-center">FORMATOS</p>

                <div class="col s10 offset-s1">

                    <div class="col l3" ng-repeat="formato in descargar.formatosNoSociales" ng-if="(formato.nombre == 'editable' && descargar.plan.editable) || (formato.nombre == 'papeleria' && descargar.plan.png) || (formato.nombre != 'editable' && formato.nombre != 'papeleria')">
                        <div class="formato" style=" margin-bottom: 20px;padding-top:0%;" ng-click="descargar.seleccionar(formato)">
                            <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                            <img style="width:100%;" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                        </div>
                    </div>

                    <div class="col l3" ng-repeat="formato in descargar.formatos" ng-if="descargar.plan.png">
                        <div class="formato" style=" margin-bottom: 20px" ng-click="descargar.seleccionar(formato)">
                            <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                            <img style="width:100%" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                        </div>
                    </div>
                </div>

                <div class="col s1" style="height: 60%"></div>

            </div>

        </div>

        <div class="col s4 text-center" style="background-color: white;height: 100%; margin-top: 15px;" ng-if="descargar.plan.png || descargar.plan.editable">


            <div style="position: relative;margin-top: 5px;box-shadow: 0px 0px 1px 1px #d4d4d4;">
                <div style="width: 14%;position: absolute;position: absolute;left: calc(26.85% - 18%);top: 33.8%;background: white;">
                    <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                </div>
                <img src="assets/images/facebook.png" width="100%">
            </div>
            <div>

                <button class="boton-verde" style="background-color: var(--principal)" ng-click="descargar.descargar(descargar.formatoSeleccionado.nombre, descargar.formatoSeleccionado.ancho)">DESCARGAR {{descargar.formatoSeleccionado.nombre | uppercase}}</button>
            </div>
        </div>


    </div>
</section>