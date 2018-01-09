            <section class="sub-menu">
                <div class="row margin-bottom-0">

                    <div class="col s12 titulo">
                        <h6 class="principal"> ESCOJA EL MEJOR PLAN PARA USTED</h6>
                    </div>

                </div>
            </section>

            <section class="section-planes scrollbar-dynamic" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">

            <div class="row margin-bottom-0">

              	<div class="col s12 m4" style="padding: 0 25px;">
              		
                  <p class="principal text-center">Cambiar moneda de pago:</p>
                  <md-input-container style="width:100%; padding: 10px;" >
                      <md-select ng-model="planes.moneda" placeholder="Moneda" required> 
                        <md-option ng-selected="moneda.simbolo == planes.monedaDefault.simbolo" ng-value="moneda" ng-repeat="moneda in planes.monedas">{{moneda.simbolo}}</md-option>
                      </md-select>
                  </md-input-container>

              		<div class="logo-final">
                          <bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
              		</div>

              	</div>
  				
        				<div class="col s12 m8">

        					<p class="tercero text-center"></p>
        					
        					<div class="contenedor-planes">
        						
        						<div class="row">
        					
        							<div class="plan col s12 m6 l4" ng-repeat="plan in planes.planes | filter: planes.comprobarMonedas">
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