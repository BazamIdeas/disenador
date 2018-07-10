<style>
	input#nombre {
		font-family: '{{editor.logo.fuente.nombre}}' !important;
	}

	input#eslogan {
		font-family: '{{editor.logo.fuenteEslogan.nombre}}' !important;
	}
</style>

<section class="body">
	<div class="row">
		<div class="col s2 sidebar editor" ng-form="editor.datosForm" ng-init="editor.menuSwitch = 1">

			<div class="col s4 tab-title" ng-click="::editor.cerrarContenedores(); editor.menuSwitch = 1;" ng-class="{'active': editor.menuSwitch == 1}">
				<div class="tab">
					<span>T</span>
				</div>
			</div>
			<div class="col s4 tab-title" ng-click="::editor.cerrarContenedores(); editor.menuSwitch = 2; " ng-class="{'active': editor.menuSwitch == 2}" bazam-ayuda data-titulo="Nombre y Eslogan" data-texto="Modifique el estilo del texto de su nombre o eslogan"
			    data-clases="['corner-lt']" data-identificador="ayuda-nombre-eslogan" data-orientacion="right" data-paso="7" bazam-pasos-ayuda>
				<div class="tab">
					<span>t</span>
				</div>
			</div>
			<div class="col s4 tab-title" ng-click="::editor.cerrarContenedores(); editor.menuSwitch = 3; " ng-class="{'active': editor.menuSwitch == 3}" >
				<div class="tab">
					<span><i class="fas fa-star"></i></span>
				</div>
			</div>

			<div class="col s12">
				<div class="tab" ng-show="editor.menuSwitch == 1">
					<div class="row">
						<div class="input-field col s12" style="padding: 0 !important">
							<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Nombre del logo</md-tooltip>
							<input id="nombre" type="text" name="fuente" maxlength="40" ng-model="editor.logo.texto" ng-model-options="{allowInvalid: true}"
								ng-change="editor.cambioTexto(editor.logo.texto)">
							<label style="padding:0 !important" for="nombre" class="active">Nombre</label>
						</div>

						<div class="col s12 title-styles">
							<p>Estilo de tipografia</p>
						</div>

						<div class="estilos col s12" style="padding: 0 !important;position: relative">
							<md-radio-group name="fuente" required ng-model="editor.categoriaTextoSeleccionada" ng-change="editor.categoriaEsloganSeleccionada = false"
								class="md-primary">
								<md-radio-button ng-repeat="fuenteCategoria in editor.fuentesCategorias track by fuenteCategoria.idCategoria" ng-value="::fuenteCategoria.idCategoria" ng-click="::editor.abrirContenedor('fuentes', true)">
									<md-tooltip md-direction="bottom">{{::fuenteCategoria.nombreCategoria}}</md-tooltip>
									<span class="estilo" ng-class="{'estilo-1':fuenteCategoria.nombreCategoria == 'Clásicas', 'estilo-4':fuenteCategoria.nombreCategoria == 'Moderna', 'estilo-2':fuenteCategoria.nombreCategoria == 'Llamativas', 'estilo-3':fuenteCategoria.nombreCategoria == 'Minimalista'}">.</span>
								</md-radio-button>
							</md-radio-group>

							<!-- VALIDACION -->
							<div ng-messages="inicio.datosForm.fuente.$error " style="color:maroon;" role="alert " ng-show="inicio.datosForm.$submitted ">
								<div ng-message="required" style="top: 64px;">Debes elegir un estilo de Tipografía.</div>
								</br>
							</div>
						</div>

						<div class="col s12 title-styles">
							<p>Texto</p>
							<p>Tamaño</p>
						</div>

						<div class="col s12 text-styles" style="padding:0;" bazam-ayuda data-titulo="Negrita, Cursiva, Tamaño" data-texto="Cambia a Negrita (N), Cursiva (C), Aumente (+) o disminuya (-) el tamaño del texto"
						    data-clases="['corner-lt']" data-identificador="ayuda-estilo-fuentes" data-orientacion="right" data-paso="9" bazam-pasos-ayuda>
							<div class="bold" ng-click="::editor.cambioPropiedad('bold')">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Negrita</md-tooltip>
								N
							</div>
							<div class="curve" ng-click="::editor.cambioPropiedad('cursive')">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Cursiva</md-tooltip>
								C
							</div>

							<div class="less" ng-click="::editor.cambioTamano('texto', false)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Disminuir tamaño</md-tooltip>
								-
							</div>
							<div class="more" ng-click="::editor.cambioTamano('texto', true)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Aumentar tamaño</md-tooltip>
								+
							</div>
						</div>
					</div>
				</div>
				<!--ESLOGAN-->
				<div class="tab" ng-show="editor.menuSwitch == 2">
					<div class="row">
						<div class=" col s12">
							<button class="boton-verde" ng-if="!editor.esloganActivo" ng-click="::editor.agregarEslogan()" style="margin-top: 8px;
							width: 100%;">
								Agregar Eslogan
							</button>
						</div>
						<div ng-if="editor.esloganActivo">
							<div class="input-field col s12" style="padding: 0 !important">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Eslogan del logo</md-tooltip>
								<input id="eslogan" type="text" name="fuenteEslogan" maxlength="100" ng-model="editor.logo.eslogan" ng-click="editor.quitarEsloganDefault(editor.logo.eslogan)" ng-model-options="{allowInvalid: true}"
									ng-change="editor.cambioTexto(editor.logo.eslogan, true)" ng-blur="editor.verificarEslogan(editor.logo.eslogan)">
								<label style="padding:0 !important" for="nombre" class="active">Eslogan</label>
							</div>

							<div class="col s12 title-styles">
								<p>Estilo de tipografia</p>
							</div>

							<div class="estilos col s12" style="padding: 0 !important;position: relative">
								<md-radio-group name="fuente" required ng-model="editor.categoriaEsloganSeleccionada" ng-change="editor.categoriaTextoSeleccionada = false"
								    class="md-primary">
									<md-radio-button ng-repeat="fuenteCategoria in editor.fuentesCategorias track by fuenteCategoria.idCategoria" ng-value="::fuenteCategoria.idCategoria" ng-click="::editor.abrirContenedor('fuentes', true)">
										<md-tooltip md-direction="bottom">{{::fuenteCategoria.nombreCategoria}}</md-tooltip>
										<span class="estilo" ng-class="{'estilo-2':fuenteCategoria.nombreCategoria == 'Clásicas', 'estilo-4':fuenteCategoria.nombreCategoria == 'Moderna', 'estilo-3':fuenteCategoria.nombreCategoria == 'Llamativas', 'estilo-1':fuenteCategoria.nombreCategoria == 'Minimalista'}">.</span>
									</md-radio-button>
								</md-radio-group>

								<!-- VALIDACION -->
								<div ng-messages="inicio.datosForm.fuente.$error " style="color:maroon;" role="alert " ng-show="inicio.datosForm.$submitted ">
									<div ng-message="required" style="top: 64px;">Debes elegir un estilo de Tipografía.</div>
									</br>
								</div>
							</div>

							<div class="col s12 title-styles">
								<p>Texto</p>
								<p>Tamaño</p>
							</div>

							<div class=" col s12 text-styles">
								<div class="bold" ng-click="::editor.cambioPropiedad('bold', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Negrita</md-tooltip>
									N
								</div>
								<div class="curve" ng-click="::editor.cambioPropiedad('cursive', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Cursiva</md-tooltip>
									C
								</div>
								<div class="less" ng-click="::editor.cambioTamano('eslogan', false)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Disminuir tamaño</md-tooltip>
									-
								</div>
								<div class="more" ng-click="::editor.cambioTamano('eslogan', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Aumentar tamaño</md-tooltip>
									+
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="tab" ng-show="editor.menuSwitch == 3">
					<div class="row">
						<div class="col s12 no-padding">
							<md-chips style="padding:0;" md-add-on-blur="true" ng-change="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" ng-model="editor.etiquetasSeleccionadas" md-separator-keys="[32,186,9,36,188,13,27]"
							    md-autocomplete-snap md-transform-chip="editor.etiquetasFunciones.transformChip($chip)" >
								<label>Etiquetas</label>
								<md-autocomplete md-selected-item="editor.selectedItem" md-search-text="editor.searchText" md-items="item in editor.etiquetasFunciones.querySearch(editor.searchText, editor.etiquetas)"
								    md-item-text="item.traduccion.valor" placeholder="Etiquetas (Opcional)">
									<span md-highlight-text="editor.searchText">{{::item.traduccion.valor}}</span>
								</md-autocomplete>
								<md-chip-template>
									<span>
										<strong>{{$chip.traduccion.valor}}</strong>
									</span>
								</md-chip-template>
							</md-chips>
							<br/>
						</div>
						<div class="col s12 text-center no-padding" ng-form="editor.iconosForm" style="display: flex;align-items: center;">
							<md-input-container style="width:87%; padding: 0 0.75rem 0 0">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Categoria del icono</md-tooltip>
								<md-select flex ng-model="editor.categoriaIcono" placeholder="Buscar simbolos" ng-change="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)"
								    md-no-asterisk>
									<md-option class="iconos" ng-repeat="categoria in editor.categoriasPosibles track by categoria.idCategoria" ng-value="::categoria.idCategoria">{{::categoria.nombreCategoria}}</md-option>
								</md-select>
							</md-input-container>
							<span class="refresh-icon" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" ng-class="{ 'loading-white': !editor.completadoBuscar}"
							    ng-disabled="!editor.completadoBuscar" style="margin-bottom: 8px;">
								<i class="material-icons">search</i>
							</span>
						</div>

						<div class="col s6 title-styles" style="height: 37px; align-items: center;">
							<p>Tamaño</p>
						</div>

						<div class=" col s6 text-styles" style="padding:0;">
							<div class="less" ng-click="::editor.cambioTamano('icono', false)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Disminuir tamaño</md-tooltip>
								-
							</div>
							<div class="more" ng-click="::editor.cambioTamano('icono', true)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Aumentar tamaño</md-tooltip>
								+
							</div>
						</div>

					</div>
				</div>
			</div>

			<div class="col s12 hr" style="padding:0;">
				<hr>
			</div>

			<div class="col s12 title-styles">
				<p>Orientación</p>
			</div>

			<div class="col s12 cube-orientation">

				<div class="vertical" ng-click="::editor.cambiarOrientacion('vertical')">
					<svg viewbox="0 0 100 100"></svg>
					<div>
						<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo arriba</md-tooltip>
						<span>
							<i class="material-icons">thumb_up</i>
						</span>
						<span>TU LOGO</span>
					</div>
				</div>

				<div class="horizontal" ng-click="::editor.cambiarOrientacion('horizontal')">
					<svg viewbox="0 0 100 100"></svg>
					<div>
						<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo a la izquierda</md-tooltip>
						<span style="margin-right: 5px;">
							<i class="material-icons">thumb_up</i>
						</span>
						<span>TU LOGO</span>
					</div>
				</div>

			</div>

			<div class="col s12 hr" style="padding:0;">
				<hr>
			</div>

			<div class="col s12 background-grid" style="margin-bottom:10px;">

				<div style="width:50%;">
				    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Fondo</md-tooltip>
				    <bazam-color-picker data-color="editor.colorFondo"></bazam-color-picker>
				</div>
				<div style="width:50%;">
				    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Cuadricula</md-tooltip>
				    <div class="grid-selector" ng-class="{'active': editor.cuadricula }" ng-click="::editor.activarCuadricula();">
					    <i class="material-icons">apps</i>
				   </div>
				</div>
			</div>

			<div class="col s12 hr" style="padding:0;">
				<hr>
			</div>

			<div class=" col s12">
				<md-button style="width:100%;" ui-sref="inicio">
					VOLVER
				</md-button>
			</div>
		</div>

		<div class="principal-container editor col s7" ng-class="{'grid': editor.cuadricula}">
				
			<span class="accion" ng-click="editor.preGuardarLogo(editor.svgFinal, editor.logo.icono.idElemento, 'Logo y nombre', editor.categoria)" style="top: 5%;"> <p>GUARDAR</p><img src="assets/images/save.svg" alt=""></span>
			
			<span class="accion" ng-click="::editor.buscarPlanes()" style="top: 15%;"> <p>COMPRAR</p><img src="assets/images/shop.svg" alt=""></span>

			<div class="svg-container" style="position:relative" ng-style="{'background-color': editor.colorFondo}">
				<bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-svg-final="editor.svgFinal" data-id-logo="editor.logo.idLogo" data-id-padre="editor.idLogoPadre" data-eslogan="editor.logo.eslogan" data-color-icono="editor.colorIcono" data-color-texto="editor.colorTexto" ></bazam-svg>
				<div class='overlay-logo loading-purple' ng-hide="editor.svgFinal"></div>
			</div>
			<div class="overlay-top-bottom" ng-class="{'open': editor.contenedores.busquedaIconos }"></div>
			<div class="overlay-right-left" ng-class="{'open': editor.contenedores.fuentes }"></div>

			<div class="fonts-container" ng-class="{'open': editor.contenedores.fuentes}">
				<div class="close" ng-click="::editor.cerrarContenedores()">
					<i class="material-icons cerrar">clear</i>
				</div>
				<div class="row padding-bottom-0 margin-bottom-0">
					<div class="col l12" style="position: relative; padding:0 !important; border-bottom: 1px solid var(--principal);cursor:pointer; overflow-y: scroll;
					max-height: 91vh;">

						<!-- TEXTO PRINCIPAL LISTA DE FUENTES -->
						<md-radio-group ng-model="editor.logo.fuente" ng-change="editor.cambioFuente(editor.logo.fuente, 'texto')" class="md-primary">
							<md-radio-button class="font-option" ng-repeat="fuente in editor.fuentes | filter: {'categorias_idCategoria': editor.categoriaTextoSeleccionada } track by fuente.idElemento"
								ng-value="{url:fuente.url, nombre: fuente.nombre}">
								<!--ng-disabled=" d.isDisabled "-->
								<span style="{{'font-family:' + fuente.nombre + '!important'}}; {{editor.logo.fuente.nombre == fuente.nombre ? 'color: var(--principal) !important;    transform: scale(1.2) !important' : 'color: black !important'}};     letter-spacing: 2px;">{{::fuente.nombre}}</span>
							</md-radio-button>
						</md-radio-group>

						<!-- ESLOGAN LISTA DE FUENTES -->
						<md-radio-group class="font" ng-model="editor.logo.fuenteEslogan" ng-change="editor.cambioFuente(editor.logo.fuenteEslogan, 'eslogan')"
							class="md-primary">
							<md-radio-button class="font-option" ng-repeat="fuente in editor.fuentes | filter: {'categorias_idCategoria': editor.categoriaEsloganSeleccionada } track by fuente.idElemento"
								ng-value="{url:fuente.url, nombre: fuente.nombre}">
								<!--ng-disabled=" d.isDisabled "-->
								<span style="{{'font-family:' + fuente.nombre + '!important'}}; {{editor.logo.fuenteEslogan.nombre == fuente.nombre ? 'color: var(--principal) !important;    transform: scale(1.2) !important' : 'color: black !important'}};     letter-spacing: 2px;">{{::fuente.nombre}}</span>
							</md-radio-button>
						</md-radio-group>
					</div>
				</div>
			</div>

			<!--<div class="contenedor-borradores" ng-class="{'abierto': editor.contenedores.borradores}">
				<div class="cerrar-contenedor-bi" ng-click="::editor.cerrarContenedores()">
					<i class="material-icons cerrar">clear</i>
				</div>
				<div class="row padding-bottom-0 margin-bottom-0">
					<div class="col l11 xl11" style="position: relative;">

						<div class="col l2 xl2 contenedor-opcion-icono">
							<div class="agregar" ng-click="editor.realizarComparacion(editor.comparar)">
								<img style="width:100%" src="assets/images/a.png" alt="">
								<div style="position:absolute;display: flex;
									flex-flow: column;
									text-align: center;">
									<i class="material-icons">add</i>
									<span>AGREGAR</span>
								</div>
							</div>
						</div>

						<div class="col l2 xl2 contenedor-opcion-icono" ng-repeat="comparacion in editor.comparaciones track by comparacion.creacion">

							<div class="opcion-borrador">
								<div class="overlay-opcion"></div>
								<span class="usar">
									<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
									<i class="material-icons" ng-click="::editor.cerrarContenedores();editor.restaurarComparacion(comparacion.svg); ">file_upload</i>
								</span>
								<span class="remover">
									<md-tooltip md-delay="2" md-direction="top">Remover</md-tooltip>
									<i class="material-icons" ng-click="editor.comparaciones.splice($index, 1)">delete</i>
								</span>
								<bazam-visualizar style="width: 100%;" data-svg="::comparacion.svg">
								</bazam-visualizar>

							</div>

						</div>

						<div ng-show="!editor.comparaciones.length" layout-padding style="height: 105px;display: flex;align-items: center;justify-content: center;font-family: 'futura-heavy' !important;font-size: 20px;">
							No existe ningun borrador
						</div>

					</div>
				</div>
			</div>-->

			<div class="icons-container" ng-class="{'open': editor.contenedores.busquedaIconos}">
				<div class="close" ng-click="::editor.cerrarContenedores();">
					<i class="material-icons cerrar">clear</i>
				</div>
				<div class="row padding-bottom-0 margin-bottom-0">
					<div class="col s12" style="position: relative; padding: 0;">

						<div class="col l3 xl2 icon-option" ng-if="!editor.iconos.length" ng-repeat="icono in [1,2,3,4,5,6]">
							<div class="icon loading-purple">
								<div class="agregar" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)">
									<img style="width:100%" src="assets/images/a.png" alt="">
									<div style="position:absolute;display: flex;
										flex-flow: column;top: 0;height: 100%;
										justify-content: center; text-align:center; width:100%;">
									</div>
								</div>
							</div>
						</div>

						<!--FIXME:-->
						<div class="col l3 xl2 icon-option" ng-repeat="icono in editor.iconos track by icono.idElemento">
							<div class="icon" ng-click="::editor.cerrarContenedores();editor.reemplazarIcono(icono);">
								<img style="width:100%" src="assets/images/a.png" alt="">
								<bazam-visualizar data-svg="::editor.base64.decode(icono.svg)">
								</bazam-visualizar>
							</div>
						</div>

						<div class="col l3 xl2 icon-option" ng-if="editor.iconos.length">
							<div class="opcion-icon" ng-class="{ 'loading-purple': !editor.completadoBuscar}">
								<div class="add" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)">
									<img style="width:100%" src="assets/images/a.png" alt="">
									<div ng-class="{'color-trans': !editor.completadoBuscar}" style="position:absolute;display: flex;
									flex-flow: column;top: 0;height: 100%;
									justify-content: center; text-align:center; width:100%;color: white">
										<i class="material-icons">search</i>
										<span>CARGAR</span><span> MÁS</span>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<button ng-click="::editor.buscarPlanes()" class="open-plans">
				<md-icon>arrow_drop_up</md-icon>
				Planes
			</button>
		</div>

		<div class="previews-container col s3">
			<div class="row padding-bottom-0 margin-bottom-0">
				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 25%;position: absolute;left: calc(40% - 23%);top: 32%;transform: rotate(-48deg);">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<div style="width: 25%;position: absolute;left: calc(93% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(0) invert(1);">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/tarjeta.png" width="100%">
					</div>
				</div>
				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 30.5%;position: absolute;left: calc(54% - 18%);top: 30%;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/camiseta.jpg" width="100%">
					</div>
				</div>
				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 14%;position: absolute;left: calc(66% - 18%);top: 32%;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 32%;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 62%;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/red.jpg" width="100%">
					</div>
				</div>

				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 30%;position: absolute;left: calc(28% - 18%);top: 6%;opacity: 0.9;filter: grayscale(1);">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<div style="width: 23%;position: absolute;left: calc(85% - 18%);top: 72%;filter: grayscale(1);opacity: 0.8;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/sobre.jpg" width="100%">
					</div>
				</div>

				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 22%;position: absolute;left: calc(73% - 18%);top: 30%;filter: blur(0.4px) grayscale(0.5);">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/camioneta.jpg" width="100%">
					</div>
				</div>

				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 43%;position: absolute;left: calc(52% - 18%);top: 34%;filter: blur(0.6px) grayscale(0.5);opacity: 0.8;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/taza.jpg" width="100%">
					</div>
				</div>
				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 40%;position: absolute;left: calc(47.7% - 18%);top: 46%;transform: rotate(89deg);filter: grayscale(100%) contrast(50%);">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/etiqueta.jpg" width="100%">
					</div>
				</div>

				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 33%;position: absolute;left: calc(50% - 18%);top: 17.5%;opacity: 0.9;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/envase.jpg" width="100%">
					</div>
				</div>

			</div>
		</div>

	</div>
</section>

<div ng-if="editor.mostrarFormDisenador" class="disenador-input-tags">
	<span style="position: absolute; top: 5%; right: 5%;" ng-click="editor.mostrarFormDisenador = false;">X</span>
	<form ng-submit="editor.guardarLogo(editor.svgFinal, editor.logo.icono.idElemento, 'Logo y nombre', editor.categoria)">
		
		<textarea rows="5">Aqui van las tags</textarea>

		<button>GUARDAR</button>
	
	</form>
</div>

<bazam-planes estado="editor.abrirPlanes" datos="editor.datosComprar" guardar-logo="editor.guardarLogo"></bazam-planes>