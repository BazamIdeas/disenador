
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

        <section style="padding:0 0 0 30px;height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">

            	<div class="col s3 offset-s1" style="padding: 0 40px;">
            		<p class="tercero text-center">Mi logo</p>
            		<div class="logo-final">
                        <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
            		</div>
                    <div class="row">
                        <p class="tercero text-center"></p>
                        <div class="col l6" style="padding: 0 .75rem 0 0">
                            <div class="formato" style="width: 100%; margin-bottom: 20px; position: relative; padding-top: 100%"  ng-click="descargar.seleccionar(descargar.formatosNoSociales[0])">
                                <img style="width:100%; height:74%;position: absolute; top: 0; padding: 10px; 0" ng-src="/creador-de-logos/assets/images/descarga/svg.png">
                                <p class="tercero text-center">SVG</p>
                            </div>
                        </div>
                        <div class="col l6" style="padding: 0 0 0 .75rem">
                            <div class="formato" style="width: 100%; margin-bottom: 20px; position: relative; padding-top: 100%"  ng-click="descargar.seleccionar(descargar.formatosNoSociales[1])">
                                <img style="width:100%; height:74%;position: absolute; top: 0; padding: 10px; 0" ng-src="/creador-de-logos/assets/images/descarga/papeleria.png">
                                <p class="tercero text-center">PAPELERIA</p>
                            </div>
                        </div>
                    </div>
            	</div>
				
				<div class="col s4" style="padding: 0 40px;">

					<p class="tercero text-center">Sociales</p>
					
					<div class="contenedor-planes">
						
						<div class="row">
					
                            <div class="col l2" ng-repeat="formato in descargar.formatos">
                              <div class="formato" style="width: 50px; height: 50px; margin-bottom: 20px"  ng-click="descargar.seleccionar(formato)">
                                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">{{formato.nombre | uppercase}}</md-tooltip>
                                  <img style="width:100%" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                              </div>
                            </div>

						</div>
					
					</div>

				</div>
				
                <div class="col s4 text-center" style="background-color: white;height: 100%">
                    
                    <p class="tercero text-center">Preview</p>

				    
                    <button class="boton-verde" ng-click="descargar.descargar(descargar.formatoSeleccionado.nombre, descargar.formatoSeleccionado.ancho)">DESCARGAR {{descargar.formatoSeleccionado.nombre | uppercase}}</button>
                </div>

            </div>
        </section>