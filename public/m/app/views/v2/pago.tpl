        <section class="sub-menu">
            <div class="row margin-bottom-0">

                <div class="col s12 titulo">
                    <h6 class="principal"> DETALLES DE SU PEDIDO</h6>
                </div>

            </div>
        </section>

        <section class="section-pago scrollbar-dynamic" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
            <div class="row margin-bottom-0">

				
				<div class="col s12" style="padding: 50px 30px 20px 30px;">
						
					<div class="row" style="box-shadow: 0px 0px 2px 1px #d4d4d4;" ng-if="!pago.terminos">
						
						<div>
							
							<div class="su-pedido primera col s12">
								<div>
									<div class="td">
										<div class="thumbail">
	        								<bazam-visualizar data-svg="pago.pedido.logo"></bazam-visualizar>
	        							</div>
									</div>
								</div>
							</div>	

							<div class="su-pedido col s12" ng-class="{'s2': pago.pedido.impuesto, 's3': !pago.pedido.impuesto}">
								<div>
									<div class="td"><h5>{{pago.pedido.plan.nombre}}</h5></div>
								</div>
							</div>						

							<div class="su-pedido col" ng-class="{'s4': pago.pedido.impuesto, 's6': !pago.pedido.impuesto}">
								<div>
									<div class="th">PRECIO</div>
									<div class="td">{{pago.pedido.precio.moneda.simbolo}} {{pago.pedido.precio.monto}}</div>
								</div>
							</div>	

							<div class="su-pedido col s4" ng-if="pago.pedido.impuesto">
								<div>
									<div class="th">IMPUESTO</div>
									<div class="td">( {{$parent.impuestoTotal = (pago.pedido.precio.monto * (pago.pedido.impuesto / 100))}} ) {{pago.pedido.impuesto}}%</div>
								</div>
							</div>	

							<div class="su-pedido final col " ng-class="{'s4': pago.pedido.impuesto, 's6': !pago.pedido.impuesto}">
								<div>
									<div class="th">TOTAL</div>
									<div class="td">{{pago.pedido.precio.moneda.simbolo}} {{pago.pedido.precio.monto+impuestoTotal}}</div>
								</div>
							</div>	

						</div>

					</div>
                    
          <div class="row">
              
              <div class="col s12">
                  <input type="checkbox" class="filled-in" id="terminos" ng-model="pago.terminos" />
                  <label for="terminos">Acepto los <a href="#">Términos de Condiciones y Uso</a></label>
              </div>
              
          </div>

					<div class="row" ng-if="pago.terminos">
						
						<div class="col s12" style="padding: 0">

							<p class="principal">Puedes pagar con</p>
						
							<div class="row">
								
								<div class="col s12" style="padding: 0; margin-bottom: 30px;" ng-repeat="pasarela in pago.pasarelas track by $index">
                                    
                                    <!--Paypal-->
									<div class="metodo" ng-if="pasarela.idPasarela == 1">
										<div class="icono-metodo" ng-click="pago.mostrarMetodo(pasarela.idPasarela)">
											<img width="100%" height="100%" src="https://img.purch.com/r/520x520/aHR0cDovL3d3dy50b3B0ZW5yZXZpZXdzLmNvbS9pL3Jldi9wcm9kL2xhcmdlLzY3NjMwLXBheXBhbC1ib3guanBn">
										</div>
										<div class="texto-metodo" ng-class="{'seleccionado': pasarela.mostrar}">
											Esto explica porque Paypal no sirve como pasarela
											<button class="boton-verde pagar" ng-class="{'deshabilitado': !pago.terminos, ' loading-white': !pago.completado}" ng-click="pago.pagar(pasarela.idPasarela, pago.terminos)">PAGAR</button>
										</div>
									</div>
                                    <!--Strype-->
                                    <div class="metodo" ng-if="pasarela.idPasarela == 2">
										<div class="icono-metodo" ng-click="pago.mostrarMetodo(pasarela.idPasarela)">
											<img width="100%" height="100%" src="https://stripe.com/img/v3/home/twitter.png">
										</div>
										<div class="texto-metodo" ng-class="{'seleccionado': pasarela.mostrar}">
											Stripe es torito
											<button class="boton-verde pagar" ng-class="{'deshabilitado': !pago.terminos, ' loading-white': !pago.completado}" ng-clicl="pago.pagar(pasarela.idPasarela, pago.terminos)">PAGAR</button>
										</div>
									</div>
                                    <!--PayU-->
                                    <div class="metodo" ng-if="pasarela.idPasarela == 3">
										<div class="icono-metodo" ng-click="pago.mostrarMetodo(pasarela.idPasarela)">
											<img width="100%" height="100%" src="https://www.versionone.com/wp-content/uploads/2015/08/logo-payu.jpg">
										</div>
										<div class="texto-metodo" ng-class="{'seleccionado': pasarela.mostrar}">
											PayU 100%
											<button class="boton-verde pagar" ng-class="{'deshabilitado': !pago.terminos, ' loading-white': !pago.completado}" ng-click="pago.pagar(pasarela.idPasarela, pago.terminos)">PAGAR</button>
										</div>
									</div>

								</div>

						

							</div>

						</div>

					</div>

				</div>

            </div>
        </section>