<div class="contenedor-principal-planes" ng-class="{'activo': estado, 'oculto': !estado}">
		<div ng-click="estado = false" class="boton-planes-unico activo">
			<md-icon>arrow_drop_down</md-icon>Planes
		</div>
		<h5 class="principal-x titulo-planes" style="text-align:center;">ESCOJA EL MEJOR PLAN PARA USTED</h5>
		<div class="row margin-bottom-0" style="overflow: hidden;">

			<div class="col s12" style="padding: 0 40px;">

				<div class="contenedor-planes">
					<bazam-listar-planes datos="datos" guardar-logo="guardarLogo" data-id="id" promocion="planes.promocion"></bazam-listar-planes>
				</div>

			</div>
		</div>
		<!-- ng-if="planes.promocion" -->
		<div style="position: relative;">
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
		</div>

	<style>


		.contenedor-principal-planes {
			position: absolute;
			bottom: 0;
			z-index: 10;
			height:100%; 
			background-color: white; 
			overflow-y: scroll;
			overflow-x:hidden;
			width: 100vw;		
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

		.boton-planes-unico.activo:hover {
			background: var(--principal) !important;
			color: white !important;
		}

		.boton-planes-unico.activo:hover md-icon.material-icons {
			color: white;
		}

		.principal-x {
			font-family: futura-heavy;
			margin-top: 2%;
			color: var(--tercero);
			  font-size: 2.3rem;
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

		cerrar-pop {
			position: absolute;
			right: 1%;
			top: 1%;
		}
	</style>
</div>