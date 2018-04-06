<!--<section class="section-pago">
	
	<div class="row margin-bottom-0">

		<div class="col s6" style="padding:0;">

			<div style="width: 100%;height: 100%;padding: 50px 90px; background-color:white">
				<div>
					<bazam-visualizar data-svg="pago.pedido.logo"></bazam-visualizar>
				</div>
			</div>

		</div>

		<div class="col s6" style="padding:0;">

			<div class="row">

				<div class="su-pedido col" ng-class="{'s2': pago.pedido.impuesto, 's4': !pago.pedido.impuesto}">
					<div>
						<div class="th">PLAN</div>
						<div class="td">{{::pago.pedido.plan.nombre}}</div>
					</div>
				</div>

				<div class="su-pedido col" ng-class="{'s2': pago.pedido.impuesto, 's4': !pago.pedido.impuesto}">
					<div>
						<div class="th">PRECIO</div>
						<div class="td">{{pago.pedido.precio.moneda.simbolo}} {{pago.pedido.precio.monto}}</div>
					</div>
				</div>

				<div class="su-pedido col s2" ng-if="pago.pedido.impuesto">
					<div>
						<div class="th">IMPUESTO</div>
						<div class="td">( {{::$parent.impuestoTotal = (pago.pedido.precio.monto * (pago.pedido.impuesto / 100))}} ) {{::pago.pedido.impuesto}}%</div>
					</div>
				</div>

				<div class="su-pedido final col s4">
					<div>
						<div class="th">TOTAL</div>
						<div class="td">{{::pago.pedido.precio.moneda.simbolo}} {{::pago.pedido.precio.monto+impuestoTotal}}</div>
					</div>
				</div>

			</div>

			<div class="row">

				<div class="col s12">
					<input type="checkbox" class="filled-in" id="terminos" ng-model="pago.terminos" />
					<label for="terminos">Acepto los
						<a href="#">Términos de Condiciones y Uso</a>
					</label>
				</div>

			</div>

			<div class="row" ng-if="pago.terminos">

					<div class="col s12" style="padding: 0">
			
						<p class="principal">Puedes pagar con</p>
			
						<div class="row">
			
							<div class="col s12" style="padding: 0; margin-bottom: 30px;" ng-repeat="pasarela in pago.pasarelas track by $index">
			
								Paypal
								<div class="metodo" ng-if="pasarela.pasarela == 'Paypal'">
									<div class="icono-metodo" ng-click="pago.mostrarMetodo(pasarela.idPasarela)">
										<img width="100%" height="100%" src="https://img.purch.com/r/520x520/aHR0cDovL3d3dy50b3B0ZW5yZXZpZXdzLmNvbS9pL3Jldi9wcm9kL2xhcmdlLzY3NjMwLXBheXBhbC1ib3guanBn">
									</div>
									<div class="texto-metodo" ng-class="{'seleccionado': pasarela.mostrar}">
										Paypal
										<button class="boton-verde pagar" ng-class="{'deshabilitado': !pago.terminos, ' loading-white': !pago.completado}" ng-click="pago.pagar(pasarela.idPasarela, pago.terminos)">PAGAR</button>
									</div>
								</div>
								Stripe
								<div class="metodo" ng-if="pasarela.pasarela == 'Stripe'">
									<div class="icono-metodo" ng-click="pago.mostrarMetodo(pasarela.idPasarela)">
										<img width="100%" height="100%" src="https://stripe.com/img/v3/home/twitter.png">
									</div>
									<div ng-show="pasarela.mostrar" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index :10; background-color:#1a1a1a9e">
										<div ng-click="pasarela.mostrar = false" class="cerrar-prev" role="button">
											<md-icon class="material-icons" role="img" aria-label="close">close</md-icon>
										</div>
										<stripe-payment-form data-pasarela="pasarela.idPasarela" data-icono="pago.pedido.idElemento" data-atributos="pago.pedido.atributos" data-svg="pago.base64.encode(pago.pedido.logo)" data-precio="pago.pedido.precio.idPrecio"></stripe-payment-form>
									</div>
									
								</div>
								PayU
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
			


</section>-->

<section style="height:100%; background-color: var(--fondo);overflow: hidden;">

		<div class="row padding-bottom-0" style="overflow: hidden; padding-top: 6% !important;">
	
			<div class="col s8 offset-s2">
				<div class="registro-form">
					<div class="row">
						<div class="col s5 offset-s1 md-whiteframe-13dp" style="padding: 18px; display: flex;flex-direction: column; justify-content: space-between; height: 60%;    background-color: var(--blanco);border-top-left-radius: 18px;
						border-bottom-left-radius: 18px;">
						    <div style="width: 100%;height: 100%;padding: 24px 0px; background-color:white">
								<div>
									<bazam-visualizar data-svg="pago.pedido.logo"></bazam-visualizar>
								</div>
							</div>
						</div>

						<div class="ventajas-loguear col s5 md-whiteframe-13dp" style="padding-left:0 !important; height: 60%">
							<p class="text-center">Resumen de su pedido</p>

							<div style="flex-flow:column;">
								<div style="display: flex;width: 60%;">
									<div style="width:50%"><p>{{::pago.pedido.plan.nombre}}</p></div>
									<div style="width:50%; text-align:right"><p>{{pago.pedido.precio.moneda.simbolo}} {{pago.pedido.precio.monto}}</p></div>
									<br>
								</div>
								<div style="display: flex;width: 60%;" ng-if="pago.pedido.impuesto">
									<div style="width:50%"><p>Impuesto</p></div>
									<div style="width:50%; text-align:right"><p>{{::$parent.impuestoTotal = (pago.pedido.precio.monto * (pago.pedido.impuesto / 100))}} ) {{::pago.pedido.impuesto}}%</p></div>
									<br>
								</div>

								<hr style="width:60%">

								<div style="display: flex;width: 60%;">
									<div style="width:50%"><p>TOTAL</p></div>
									<div style="width:50%; text-align:right"><p>{{::pago.pedido.precio.moneda.simbolo}} {{::pago.pedido.precio.monto+impuestoTotal}}</p></div>
								</div>

								<br>

								<div>
									<input type="checkbox" class="filled-in" id="terminos" ng-model="pago.terminos" />
									<label for="terminos" style="color:white;font-size:12px;">Acepto los
										<a href="#" style="color:var(--tercero)">Términos de Condiciones y Uso</a>
									</label>
								</div>

								<br><br>

								<div style="display: flex;width: 60%;justify-content: space-between;">

									<div class="metodo" ng-repeat="pasarela in pago.pasarelas track by $index">

										<button ng-if="pasarela.pasarela == 'Paypal'" ng-class="{'deshabilitado': !pago.terminos, ' loading-white': !pago.completado}" ng-click="pago.pagar(pasarela.idPasarela, pago.terminos)" style="background-color:transparent; border:none; padding:0;">
											<img width="110" height="auto" style="padding-bottom: 12px;" src="/assets/images/paypal.png">
										</button>

										<button ng-if="pasarela.pasarela == 'Stripe'" ng-class="{'deshabilitado': !pago.terminos, ' loading-white': !pago.completado}" ng-click="pago.mostrarMetodo(pasarela.idPasarela)" style="background-color:transparent; border:none; padding:0;">
											<img width="60" height="auto" src="/assets/images/credit-card.svg">
										</button>

										<div ng-if="pasarela.pasarela == 'Stripe'" ng-show="pasarela.mostrar" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index :10; background-color:#1a1a1a9e">
											<div ng-click="pasarela.mostrar = false" class="cerrar-prev" role="button">
												<md-icon style="width: 35px;" class="material-icons" role="img" aria-label="close">close</md-icon>
											</div>
											<stripe-payment-form data-pasarela="pasarela.idPasarela" data-icono="pago.pedido.idElemento" data-atributos="pago.pedido.atributos" data-svg="pago.base64.encode(pago.pedido.logo)" data-precio="pago.pedido.precio.idPrecio"></stripe-payment-form>
										</div>

									</div>

								</div>

								<br><br>

								<div style="display: flex;width: 100%;justify-content: space-between;">
									<img width="100%" height="auto" style="padding-bottom: 12px;" src="/assets/images/card-brands.svg">
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
	
		</div>
	</section>