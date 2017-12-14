
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
					
<<<<<<< HEAD
                            <div class="col l2" ng-repeat="formato in descargar.formatos">
                              <div class="formato" style="width: 50px; height: 50px; margin-bottom: 20px">
                                  <img style="width:100%" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png" ng-click="descargar.descargar(formato.nombre, formato.ancho)">
=======
                            <div class="col l1" ng-repeat="formato in descargar.formatos">
                              <div class="formato" style="width: 50px; height: 50px; margin-bottom: 20px" ng-click="descargar.descargar(formato.nombre, formato.ancho)">
                                  <img style="width:100%" ng-src="/creador-de-logos/assets/images/descarga/{{formato.nombre}}.png" >
>>>>>>> eec764e8c14564e800249e5c4cc149d2a6490425
                              </div>
                            </div>

						</div>
					
					</div>

				</div>

            </div>
        </section>