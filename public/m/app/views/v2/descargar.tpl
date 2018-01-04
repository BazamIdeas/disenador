        <section class="sub-menu">
            <div class="row margin-bottom-0">

                <div class="col s12 titulo">
                    <h6 class="principal"> DESCARGAR</h6>
                </div>

            </div>
        </section>

        <section class="section-descargar scrollbar-dynamic" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions"">
            <div class="row margin-bottom-0">

            	<div class="col s8 offset-s2 m4">

                    <div class="row">

                        <p class="tercero text-center">MI LOGO</p>

                		<div class="col l10 offset-l1 logo-final">
                            <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
                		</div>

                    </div>

            	</div>
				
				<div class="col s10 offset-s1 m8">		
						
					<div class="row">

                        <p class="tercero text-center">FORMATOS</p>

                            <div class="col s3 m2 l2" ng-repeat="formato in descargar.formatosNoSociales">
                              <div class="formato" style=" margin-bottom: 10px;padding-top:0%;"  ng-click="descargar.seleccionar(formato)">
                                    
                                  <img style="width:100%;" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                              </div>
                            </div>

                            <div class="col s3 m2 l2" ng-repeat="formato in descargar.formatos">
                              <div class="formato" style=" margin-bottom: 20px"  ng-click="descargar.seleccionar(formato)">
                                   
                                  <img style="width:100%" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png">
                              </div>
                            </div>
                        </div>

					</div>

				</div>

            </div>
        </section>

        <div class="opciones-descarga" ng-class="{'abierto': descargar.formatoSeleccionado != null }">
            <ul>
                <li ng-click="descargar.descargar(descargar.formatoSeleccionado.nombre, descargar.formatoSeleccionado.ancho)">
                    <i class="material-icons">file_download</i>
                    Descargar {{descargar.formatoSeleccionado.nombre}}
                </li>
                <li ng-click="descargar.formatoSeleccionado = null">
                    <i class="material-icons">expand_more</i>
                </li>
            </ul>
        </div>