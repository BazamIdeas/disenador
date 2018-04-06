
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8 texto">
                    <h5 class="principal"> MIS LOGOS</h5>
                </div>

            </div>
        </section>

        <section class="scrollbar-dynamic section-cliente" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
            
            
            <div class="row margin-bottom-0" ng-if="logos.datos.idCliente && !logos.facturacion.length" >
                <div class="col s12 aviso-facturacion">
                    ¡Importante! Para retirar saldo de su cuenta debe poseer un método de cobro registrado. Puede registrarlo haciendo <span ui-sref="cuenta">click aquí</span>. 
                </div>
            </div>
            <div class="tab-freelance col s12">
                <button ng-click="logos.opcionMostrar='borradores'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='borradores'}" class="boton-verde">BORRADORES</button>
                <button ng-click="logos.opcionMostrar='pendientes'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='pendientes'}" class="boton-verde">PENDIENTES POR APROBACIÓN</button>
                <button ng-click="logos.opcionMostrar='aprobados'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='aprobados'}" class="boton-verde">APROBADOS</button>
                <button ng-click="logos.opcionMostrar='vendidos'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='vendidos'}" class="boton-verde">VENDIDOS</button>
            </div>
            <div class="row margin-bottom-0" ng-switch="logos.opcionMostrar">
				<!--PENDIENTES DE APROBACION-->
				<div class="col s12" ng-switch-when="pendientes">
                    <carousel-mis-logos ng-if="logos.terminados.pendientes" logos="logos.pendientes" callback="['pendientes']"></carousel-mis-logos>
                </div>
                <!--APROBADOS-->
				<div class="col s12" ng-switch-when="aprobados">
                    <carousel-mis-logos ng-if="logos.terminados.aprobados" logos="logos.aprobados" callback="['aprobados']"></carousel-mis-logos>
                </div>
                <!--VENDIDOS-->
                <div class="col s12" ng-switch-when="vendidos">
                    <carousel-mis-logos ng-if="logos.terminados.vendidos" logos="logos.vendidos" callback="['vendidos']"></carousel-mis-logos>               
                </div>
                <!--BORRADORES-->
                <div class="col s12" ng-switch-when="borradores">
                    <carousel-mis-logos ng-if="logos.terminados.borradores" logos="logos.borradores" callback="['borradores',logos.borrarLogo, logos.buscarAtributo]"></carousel-mis-logos>
                </div>
                
            </div>
        </section>
