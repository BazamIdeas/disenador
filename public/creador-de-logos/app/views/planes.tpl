<div class="contenedor-principal-planes" ng-class="{'activo': estado, 'oculto': !estado}">
	<div ng-click="estado = false" class="boton-planes-unico activo">
		<md-icon>arrow_drop_down</md-icon>{{textos[2]}}
	</div>
	<h5 class="principal-x titulo-planes" style="text-align:center;">{{textos[0]}}</h5>

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
				<h5 class="principal-x" style="text-align:center; ">{{textos[3]}}</h5>
				<h6 style="text-align: center; font-size: 22px; " class="pricipal-x">
					<b>{{textos[4]}}</b>
				</h6>
				<div layout layout-align="space-between" class="flex-80 layout-align-space-between-stretch layout-row margin-auto" style="padding-top:  8%;">
					<md-button class="md-raised md-primary back-principal" ng-click="planes.promocion = false">
						{{textos[5]}}
					</md-button>
					<md-button class="md-raised md-primary back-principal" ng-click="$parent.estado = false; planes.promocion = false">
						{{textos[6]}}
					</md-button>
				</div>
			</div>
		</promocion>
	</div>
</div>
