
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal">DESCARGUE SU LOGO EN EL TAMAÑO PERFECTO</h5>
                </div>

            </div>
        </section>

        <section style="padding:0 0 0 30px;height: calc(100vh - 135px) !important;overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">

            	<div class="col s3" style="padding: 0 40px;">
            		<p class="tercero text-center" style="visibility: hidden;">Mi logo</p>
            		<div class="logo-final">
                        <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
            		</div>

            	</div>
				
				<div class="col s5" style="padding: 0 40px;">		
						
					<div class="row caja logos">

                        <p class="tercero text-center">Formatos</p>

                        <div class="col s1" style="height: 100%"></div>
				
                        <div class="col l2" ng-repeat="formato in descargar.formatosNoSociales">
                          <div class="formato" style=" margin-bottom: 20px;padding-top:0%;max-height: 68.83px;"  ng-click="descargar.seleccionar(formato)">
                                <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                              <img style="width:100%;padding-top: 9%;max-height: 68.83px;" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                          </div>
                        </div>

                        <div class="col l2" ng-repeat="formato in descargar.formatos">
                          <div class="formato" style=" margin-bottom: 20px"  ng-click="descargar.seleccionar(formato)">
                                <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                              <img style="width:100%" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                          </div>
                        </div>

                        <div class="col s1" style="height: 100%"></div>

					</div>

				</div>
				
                <div class="col s4 text-center" style="background-color: white;height: 100%">
                    
                    <p class="tercero text-center">Preview</p>

				    
                    <button class="boton-verde" ng-click="descargar.descargar(descargar.formatoSeleccionado.nombre, descargar.formatoSeleccionado.ancho)">DESCARGAR {{descargar.formatoSeleccionado.nombre | uppercase}}</button>
                </div>

            </div>
        </section>