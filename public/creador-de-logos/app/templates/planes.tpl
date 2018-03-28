<div class="contenedor-principal-planes" ng-class="{'activo': estado, 'oculto': !estado}">
	<section style="height:100%; background-color: white; overflow: hidden;     position: absolute;
    width: 100vw;
    height: 100vh;">
		<div ng-click="estado = false" class="boton-planes-unico activo">
			<md-icon>arrow_drop_down</md-icon>Planes
		</div>
		<h5 class="principal-x titulo-planes" style="text-align:center;">ESCOJA EL MEJOR PLAN PARA USTED</h5>
		<div class="row margin-bottom-0" style="overflow: hidden;">

			<div class="col s9" style="padding: 0 40px;">

				<div class="contenedor-planes">
					<bazam-listar-planes datos="datos" guardar-logo="guardarLogo" data-id="id"></bazam-listar-planes>
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
					<div class="row padding-bottom-0 margin-bottom-0 " ng-if="datos.logo">
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 25%;position: absolute;left: calc(40% - 23%);top: 32%;transform: rotate(-48deg);">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<div style="width: 25%;position: absolute;left: calc(93% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(100%) invert(80%) contrast(100%);">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/tarjeta.png" width="100%">
							</div>
						</div>
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 30.5%;position: absolute;left: calc(54% - 18%);top: 30%;">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/camiseta.jpg" width="100%">
							</div>
						</div>
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 30%;position: absolute;left: calc(28% - 18%);top: 6%;opacity: 0.9;filter: grayscale(1);">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<div style="width: 23%;position: absolute;left: calc(85% - 18%);top: 72%;filter: grayscale(1);opacity: 0.8;">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/sobre.jpg" width="100%">
							</div>
						</div>
						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 14%;position: absolute;left: calc(66% - 18%);top: 32%;">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 32%;">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 62%;">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/red.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 22%;position: absolute;left: calc(73% - 18%);top: 30%;filter: blur(0.4px) grayscale(0.5);">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/camioneta.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 43%;position: absolute;left: calc(52% - 18%);top: 34%;filter: blur(0.6px) grayscale(0.5);opacity: 0.8;">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/taza.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 33%;position: absolute;left: calc(50% - 18%);top: 17.5%;opacity: 0.9;">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/envase.jpg" width="100%">
							</div>
						</div>

						<div class="col s12" style="padding:0">

							<div style="position: relative;">
								<div style="width: 40%;position: absolute;left: calc(47.7% - 18%);top: 46%;transform: rotate(89deg);filter: grayscale(100%) contrast(50%);">
									<bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
								</div>
								<img src="assets/images/mockups/etiqueta.jpg" width="100%">
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<!-- ng-if="planes.promocion" -->
		<promocion class="md-whiteframe-6dp" ng-if="planes.promocion">
			<div>
				<cerrar-pop>
					<md-button ng-click="planes.promocion = false" class="back-principal md-primary md-fab md-mini">
						<md-icon>close</md-icon>
					</md-button>
				</cerrar-pop>
				<h5 class="principal-x" style="text-align:center; ">GRACIAS POR TOMAR NUESTRO PLAN GRATIS</h5>
				<h6 style="text-align: center; font-size: 22px; " class="pricipal-x">
					<b>¿Deseas elegir otro plan?</b>
				</h6>
				<div layout layout-align="space-between" class="flex-80 layout-align-space-between-stretch layout-row margin-auto" style="padding-top:  8%;">
					<md-button class="md-raised md-primary back-principal" ng-click="planes.promocion = false">
						ELEGIR OTRO PLAN
					</md-button>
					<md-button class="md-raised md-primary back-principal" ng-click="$parent.estado = false; planes.promocion = false">
						SEGUIR EDITANDO MI LOGO
					</md-button>
				</div>
			</div>
		</promocion>
	</section>

	<style>
		.contenedor-principal-planes {
			position: absolute;
			bottom: 0;
			z-index: 13;
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

		.boton-planes-unico.activo:hover {
			background: var(--principal) !important;
			color: white !important;
		}

		.boton-planes-unico.activo:hover md-icon.material-icons {
			color: white;
		}

		.plan:hover button {
			transform: scale(1.1);
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

		.principal-x {
			font-family: futura-heavy;
			margin-top: 5%;
		}

		/* PROMOCION*/

		promocion {
			position: fixed;
			top: 25%;
			left: 25%;
			width: 50%;
			height: 50vh;
			background: white;
			box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
			padding: 2%;
		}

		.back-principal,
		.back-principal:focus {
			background: var(--tercero) !important;
		}

		.plan.plan-secundario .plan-header,
		.plan.plan-secundario .boton-verde {
			background-color: var(--principal) !important;
		}

		.plan.plan-secundario .subtitulo-plan,
		.plan.plan-secundario .plan-precio {
			color: var(--principal) !important;
		}

		.plan.plan-principal .plan-header,
		.plan.plan-principal .boton-verde {
			background-color: var(--secundario) !important;
		}

		.plan.plan-principal .subtitulo-plan,
		.plan.plan-principal .plan-precio {
			color: var(--secundario) !important;
		}

		cerrar-pop {
			position: absolute;
			right: 1%;
			top: 1%;
		}
	</style>
</div>