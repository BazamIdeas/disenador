<section class="body pay">
	
	<div class="row">

		<div class="card pay col s6 offset-s3">
				
			<div class="row">
				
				<div class="logo col s6">
					<div>
						<bazam-visualizar data-svg="pago.pedido.logo"></bazam-visualizar>
					</div>
				</div>

				<div class="checkout col s6">
					<p>Resumen de su pedido</p>

					<div style="display: flex;flex-flow:column;width: 100%;">
						<div style="display: flex;justify-content: space-evenly;">
							<div style="flex: 1;"><p>{{::pago.pedido.plan.nombre}}</p></div>
							<div style="flex: 1;"><p>{{pago.pedido.precio.moneda.simbolo}} {{pago.pedido.precio.monto}}</p></div>
							<br>
						</div>
						<div style="display: flex;justify-content: space-evenly;" ng-if="pago.pedido.impuesto">
							<div style="flex: 1;"><p>Impuesto</p></div>
							<div style="flex: 1;"><p>{{::$parent.impuestoTotal = (pago.pedido.precio.monto * (pago.pedido.impuesto / 100))}} ) {{::pago.pedido.impuesto}}%</p></div>
							<br>
						</div>

						<hr style="width:80%">

						<div style="display: flex;justify-content: space-evenly;">
							<div style="flex: 1;"><p>TOTAL</p></div>
							<div style="flex: 1;"><p>{{::pago.pedido.precio.moneda.simbolo}} {{::pago.pedido.precio.monto+impuestoTotal}}</p></div>
						</div>

						<br>

						<div style="text-align: center">
							<input type="checkbox" class="filled-in" id="terminos" ng-model="pago.terminos" />
							<label for="terminos" style="color:black;font-size:12px;">Acepto los
								<a href="#">Términos de Condiciones y Uso</a>
							</label>
						</div>

						<br><br>

						<div style="display: flex;justify-content: space-evenly;">

							<div class="metodos">

								<div ng-repeat="pasarela in pago.pasarelas track by $index">
									<input type="radio" id="{{pasarela.pasarela}}" ng-model="pago.pasarelaElegida" ng-value="pasarela"/>
									<label style="display: flex;" for="{{pasarela.pasarela}}">
										
										<img  ng-if="pasarela.pasarela == 'Paypal'"  width="50" height="auto"  src="assets/images/svg-icons/paypal_color.svg">

										<img  ng-if="pasarela.pasarela == 'Stripe'"  width="25" height="auto" src="assets/images/svg-icons/credit_black.svg">

									</label>

									<div class="credit" ng-if="pasarela.pasarela == 'Stripe'" ng-show="pasarela.mostrar" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index :10; background-color:#1a1a1a9e">
										<div ng-click="pasarela.mostrar = false" class="close-prev">
											<md-icon>close</md-icon>
										</div>
										<stripe-payment-form data-pasarela="pasarela.idPasarela" data-icono="pago.pedido.idElemento" data-atributos="pago.pedido.atributos" data-svg="pago.base64.encode(pago.pedido.logo)" data-precio="pago.pedido.precio.idPrecio"></stripe-payment-form>
									</div>

								</div>

							</div>

							<div style="display: flex; align-items: center;">
								<button ng-if="pago.pasarelaElegida.pasarela == 'Paypal'" type="submit" ng-class="{'loading-white': !pago.completado}" ng-click="pago.pagar(pago.pasarelaElegida.idPasarela, pago.terminos)">COMPRAR</button>

								<button ng-if="pago.pasarelaElegida.pasarela == 'Stripe'" type="submit" ng-class="{'loading-white': !pago.completado}" ng-click="pago.mostrarMetodo(pago.pasarelaElegida.idPasarela, pago.terminos)">COMPRAR</button>
							</div>

						</div>

						<br><br>

						<div style="display: flex;width: 100%;justify-content: space-between;">
							<img width="100%" height="auto" style="padding-bottom: 12px;" src="assets/images/svg-icons/payment_color.svg">
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>
</section>