<div class="contenedor-principal-planes" ng-class="{'activo': estado, 'oculto': !estado}">
	<div ng-click="estado = false" class="boton-planes-unico activo">
		<md-icon>arrow_drop_down</md-icon>Planes
	</div>
	<h5 class="principal-x titulo-planes" style="text-align:center;">ESCOJA EL MEJOR PLAN PARA USTED</h5>

	<bazam-listar-planes datos="datos" guardar-logo="guardarLogo" data-id="id" promocion="planes.promocion"></bazam-listar-planes>

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
</div>
