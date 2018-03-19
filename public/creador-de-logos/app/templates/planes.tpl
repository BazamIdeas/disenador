<div class="contenedor-principal-planes" ng-class="{'activo': estadoDirectiva, 'oculto': !estadoDirectiva}">
	<section style="height:100%; background-color: white; overflow: hidden;">
		<div ng-click="planes.cerrarPop()" class="boton-planes-unico activo">
			<md-icon>arrow_drop_down</md-icon>Planes
		</div>
		<h5 class="principal titulo-planes" style="text-align:center;">ESCOJA EL MEJOR PLAN PARA USTED</h5>
		<div class="row margin-bottom-0" style="overflow: hidden;">

			<div class="col s9" style="padding: 0 40px;">

				<div class="contenedor-planes">

					<div class="row">

						<div class="plan col s4" style="border-radius:0px;" ng-class="planes.desabilitado" ng-disable="planes.desabilitado">
							<div>
								<div class="plan-header">Plan Gratis</div>
								<div class="plan-body">
									<p class="subtitulo-plan">descripcion</p>

									<ul class="plan-lista">
										<li>Poderosamente gratis</li>
									</ul>

									<div class="plan-precio">GRATIS</div>

									<div class="text-center">
										<button class="boton-verde" ng-click="planes.avanzarCheckout(true)" ng-disabled="planes.peticion">DESCARGAR</button>
									</div>
								</div>
							</div>
						</div>

						<div class="plan col s4" ng-repeat="plan in planes.planes | filter: planes.comprobarMonedas" style="border-radius:0px;">
							<div>
								<div class="plan-header">{{plan.plan}}</div>
								<div class="plan-body">
									<p class="subtitulo-plan">{{plan.info}}</p>

									<ul class="plan-lista">
										<li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{carac.descripcion}}</li>
									</ul>

									<div class="plan-precio">{{planes.precioSeleccionado(plan.precios, planes.moneda)}}</div>

									<div class="text-center">
										<button class="boton-verde" ng-click="planes.avanzarCheckout(plan, planes.moneda, true)">SELECCIONAR</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="col s3" style="    padding: 0 40px 0 0;">
				<div style="    
			font-family: 'futura-heavy';
			padding: 18px 0;
			text-align: center;
			color: var(--principal);">Tu logo donde quierás</div>
				<div style="
			padding: 0px !important;
			max-height: calc(100vh - 9rem);
			overflow-y: auto;
			position: relative;
			height: 61%;">
					<div class="row padding-bottom-0 margin-bottom-0 ">
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 25%;position: absolute;left: calc(40% - 23%);top: 32%;transform: rotate(-48deg);">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<div style="width: 25%;position: absolute;left: calc(93% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(100%) invert(80%) contrast(100%);">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/tarjeta.png" width="100%">
							</div>
						</div>
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 30.5%;position: absolute;left: calc(54% - 18%);top: 30%;">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/camiseta.jpg" width="100%">
							</div>
						</div>
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 30%;position: absolute;left: calc(28% - 18%);top: 6%;opacity: 0.9;filter: grayscale(1);">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<div style="width: 23%;position: absolute;left: calc(85% - 18%);top: 72%;filter: grayscale(1);opacity: 0.8;">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/sobre.jpg" width="100%">
							</div>
						</div>
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 14%;position: absolute;left: calc(66% - 18%);top: 32%;">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 32%;">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 62%;">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/red.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 22%;position: absolute;left: calc(73% - 18%);top: 30%;filter: blur(0.4px) grayscale(0.5);">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/camioneta.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 43%;position: absolute;left: calc(52% - 18%);top: 34%;filter: blur(0.6px) grayscale(0.5);opacity: 0.8;">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/taza.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 33%;position: absolute;left: calc(50% - 18%);top: 17.5%;opacity: 0.9;">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/envase.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 40%;position: absolute;left: calc(47.7% - 18%);top: 46%;transform: rotate(89deg);filter: grayscale(100%) contrast(50%);">
									<bazam-visualizar data-svg="planes.logo"></bazam-visualizar>
								</div>
								<img src="assets/images/mockups/etiqueta.jpg" width="100%">
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<promocion ng-if="promocion">
			PRUEBA
		</promocion>
	</section>

	<style>
		.contenedor-principal-planes {
			position: absolute;
			bottom: 0;
			z-index: 999;

		}

		.contenedor-principal-planes {
			transition: height 1s;
			height: 0;
		}

		.contenedor-principal-planes.activo {
			height: 100%;
		}

		.contenedor-principal-planes.activo .boton-planes-unico.activo {
			position: absolute;
			top: 0;
			left: 7%;
			bottom: auto;
			padding: 8px 20px;
			background: white;
			color: var(--principal);
			font-size: 15px;
			font-family: 'futura-heavy';
			visibility: visible;
		}

		.contenedor-principal-planes.activo .boton-planes-unico.activo md-icon {
			color: var(--principal);
		}

		.contenedor-principal-planes.oculto .boton-planes-unico.activo {
			visibility: hidden;
		}

		section {
			position: relative;
		}


		.plan {
			padding-top: 6% !important;
		}

		div.contenedor-planes .plan .plan-header,
		div.contenedor-planes .plan .plan-body {
			border-radius: 0;
		}

		.contenedor-planes {
			padding-left: 5%;
		}

		.principal {
			font-family: futura-heavy;
			margin-top: 5%;
		}
	</style>
</div>