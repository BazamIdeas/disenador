
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

            	<div class="col s3" style="padding: 0 40px;">
            		<p class="tercero text-center"></p>
            		<div class="logo-final">
                        <bazam-visualizar data-svg="descargar.base64.decode(descargar.logo.logo)" ng-if="descargar.logo.logo"></bazam-visualizar>
            		</div>
            	</div>
				
				<div class="col s9" style="padding: 0 40px;">

					<p class="tercero text-center"></p>
					
					<div class="contenedor-planes">
						
						<div class="row">
					
							<div class="plan col s4" ng-repeat="plan in planes.planes | filter: planes.comprobarMonedas">
								<div>
									<div class="plan-header">{{plan.plan}}</div>
									<div class="plan-body">
										<p>{{plan.info}}</p>

										<ul class="plan-lista">
											<li>Atributo 1</li>
											<li>Atributo 2</li>
											<li>Atributo 3</li>
											<li>Atributo 4</li>
										</ul>

										<div class="plan-precio">{{planes.precioSeleccionado(plan.precios, planes.moneda)}}</div>

										<div class="text-center">
											<button class="boton-verde" ng-click="planes.avanzarCheckout(plan, planes.moneda)">SELECCIONAR</button>
										</div>
									</div>
								</div>
							</div>	
	

						</div>
					
					</div>

				</div>

            </div>
        </section>