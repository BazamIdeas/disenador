
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal">ESCOJA ENTRE MULTIPLES FORMATOS</h5>
                </div>

            </div>
        </section>

        <section style="padding:0 30px;height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">

            	<div class="col s3 offset-s2" style="padding: 0 40px;">
            		<p class="tercero text-center"></p>
            		<div class="logo-final">
                        <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
            		</div>
            	</div>
				
				<div class="col s4" style="padding: 0 40px;">

					<p class="tercero text-center"></p>
					
					<div class="contenedor-planes">
						
						<div class="row">
					
                            <div class="col l2" ng-repeat="formato in descargar.formatos">
                              <div class="formato" style="width: 50px; height: 50px; margin-bottom: 20px" ng-click="descargar.descargar(formato.nombre, formato.ancho)">
                                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                                  <img style="width:100%" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                              </div>
                            </div>

						</div>
					
					</div>

				</div>

            </div>
        </section>


        <div class="opciones-descarga" ng-class="{'abierto': (logos.opcionesAdquiridos && !logos.opcionesGuardados) && (logos.logoSeleccionado != NULL)}">
            <ul>
                <li ui-sref="descargar({id: logos.logoSeleccionado})">
                    <i class="material-icons">file_download</i>
                    Descargar
                </li>
                <li>
                    <i class="material-icons">share</i>
                    Compartir
                </li>
                <li ng-click="logos.logoSeleccionado = null">
                    <i class="material-icons">expand_more</i>
                </li>
            </ul>
        </div>