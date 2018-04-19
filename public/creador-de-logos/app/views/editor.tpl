<style>
	/*@font-face {
		font-family: '{{fuente.nombre}}';
		src: url('{{fuente.url}}');
	}*/

	input#nombre {
		font-family: '{{editor.logo.fuente.nombre}}' !important;
	}

	input#eslogan {
		font-family: '{{editor.logo.fuenteEslogan.nombre}}' !important;
	}
</style>

<!--<section class="sub-header-principal">
	<div class="row margin-bottom-0">

		<div class="col s2 logo">
			<h5 class="secundario" ui-sref="inicio">
				<i class="material-icons md-48 aling-top">fingerprint</i>
				<span>DISEÑADOR</span>
			</h5>
		</div>
		<div class="col s10">
			<div class="row opciones-sub-header margin-bottom-0">
				<div class="col l2 xl2" bazam-ayuda data-titulo="Fondo" data-texto="Visualice su logo en un color de fondo diferente." data-clases="['corner-lt']"
				    data-identificador="ayuda-fondo" data-orientacion="right" data-paso="10" bazam-pasos-ayuda>
					<div color-picker color-picker-model="editor.colorFondo" ng-model="editor.colorFondo" color-picker-position="bottom" ng-click="editor.cuadricula = false"
					    class="selector-fondo" ng-style="{'background-color': editor.colorFondo}" style="font-size: 0px;"></div>
					<span class="principal">Fondo</span>
				
					<bazam-color-picker data-color="editor.colorFondo"></bazam-color-picker>
					<span class="principal">Fondo</span>
				</div>
				<div class="col l3 xl2" bazam-ayuda data-titulo="Cuadricula" data-texto="Utiice la cuadricula para orientar los elementos de su logo "
				    data-clases="['corner-lt']" data-identificador="ayuda-cuadricula" data-orientacion="right" data-paso="11" bazam-pasos-ayuda>
					<div class="selector-cuadricula" ng-class="{'active': editor.cuadricula }" ng-click="::editor.activarCuadricula()">
						<i class="material-icons">apps</i>
					</div>
					<span class="principal">Cuadricula</span>
				</div>
				<div class="col l5 xl4 offset-xl4">
					<button class="boton-oborder" ng-class="{'active': editor.borradores}" ng-click="::editor.abrirContenedor('borradores')" bazam-ayuda
					    data-titulo="Borradores" data-texto="Guarde versiones de su logo para compararlos y restaurar la mejor opción" data-clases="['corner-lt']"
					    data-identificador="ayuda-borradores" data-orientacion="right" data-paso="12" bazam-pasos-ayuda>
						<i class="material-icons">queue</i> BORRADORES</button>
					
					<button class="boton-oborder" ng-class="{'active': editor.preview}" ng-click="editor.mostrarPreviews()" bazam-ayuda data-titulo="Previews"
					    data-texto="Previsualice su logo en diferentes elementos publicitarios y de papelería" data-clases="['corner-lt']" data-identificador="ayuda-preview"
					    data-orientacion="right" data-paso="13" bazam-pasos-ayuda>
						<i class="material-icons">remove_red_eye</i> PREVIEW</button>

					<button class="boton-oborder" ng-class="{'loading-purple': !editor.completadoGuardar}" ng-click="editor.guardarLogo(editor.svgFinal, 'Logo y nombre', editor.logo.icono.idElemento)"
					    bazam-ayuda data-titulo="Guardar" data-texto="Guarde su logo para su posterior edicion" data-clases="['corner-lt']"
					    data-identificador="ayuda-guardar" data-orientacion="right" data-paso="14" bazam-pasos-ayuda>
						<i class="material-icons">save</i> GUARDAR</button>

					<button class="boton-oborder" ng-click="::editor.buscarPlanes()">
						<i class="material-icons">shopping_cart</i> COMPRAR</button>
				</div>
			</div>
		</div>

	</div>
</section>-->

<section class="section-container">
	<div class="row margin-bottom-0" style="overflow: hidden;">
		<div class="col s2 editor-p sidebar-1" ng-form="editor.datosForm" style="     overflow: visible; padding: 10px 0px 0px 0px !important;text-align: center;"
		    ng-init="editor.menuSwitch = 1">

			<div class="col s4 no-padding">
				<div ng-click="::editor.cerrarContenedores(); editor.menuSwitch = 1;" ng-class="{'seleccionadoo': editor.menuSwitch == 1}" class="tab">
					<p class="text-center principal titulo" style="margin-bottom: 10px">NOMBRE</p>
				</div>
			</div>
			<div class="col s4 no-padding" bazam-ayuda data-titulo="Nombre y Eslogan" data-texto="Modifique el estilo del texto de su nombre o eslogan"
			    data-clases="['corner-lt']" data-identificador="ayuda-nombre-eslogan" data-orientacion="right" data-paso="7" bazam-pasos-ayuda>
				<div ng-click="::editor.cerrarContenedores(); editor.menuSwitch = 2; " ng-class="{'seleccionadoo': editor.menuSwitch == 2}" class="tab">
					<p class="text-center principal titulo" style="margin-bottom: 10px">ESLOGAN</p>
				</div>
			</div>

			<div class="col s4 no-padding">
				<div ng-click="::editor.cerrarContenedores(); editor.menuSwitch = 3; " ng-class="{'seleccionadoo': editor.menuSwitch == 3}" class="tab">
					<p class="text-center principal titulo" style="margin-bottom: 10px">ICONO</p>
				</div>
			</div>

			<div class="col s12 tabs-textos" style="width: 100%">
				<div class="tab-editor" ng-show="editor.menuSwitch == 1">
					<div class="row">
						<div class="input-field col s12" style="padding: 0 !important">
							<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Nombre del logo</md-tooltip>
							<input id="nombre" type="text" name="fuente" maxlength="20" ng-model="editor.logo.texto" ng-model-options="{allowInvalid: true}"
							    ng-change="editor.cambioTexto(editor.logo.texto)">
						</div>

						<div class="estilos-fuentes col s12" style="padding: 0 !important;position: relative">
							<md-radio-group name="fuente" required ng-model="editor.categoriaTextoSeleccionada" ng-change="editor.categoriaEsloganSeleccionada = false"
							    class="md-primary">
								<md-radio-button ng-repeat="fuenteCategoria in editor.fuentesCategorias track by fuenteCategoria.idCategoria" ng-value="::fuenteCategoria.idCategoria" ng-click="::editor.abrirContenedor('fuentes', true)">
									<!--ng-disabled=" d.isDisabled "-->
									<md-tooltip md-direction="top">{{::fuenteCategoria.nombreCategoria}}</md-tooltip>
									<span class="estilo" ng-class="{'amatic':fuenteCategoria.nombreCategoria == 'Clásicas', 'niconne':fuenteCategoria.nombreCategoria == 'Moderna', 'julee':fuenteCategoria.nombreCategoria == 'Llamativas', 'cabin':fuenteCategoria.nombreCategoria == 'Minimalista'}">A</span>
								</md-radio-button>
							</md-radio-group>

							<!-- VALIDACION -->
							<div ng-messages="inicio.datosForm.fuente.$error " style="color:maroon;" role="alert " ng-show="inicio.datosForm.$submitted ">
								<div ng-message="required" style="top: 64px;">Debes elegir un estilo de Tipografía.</div>
								</br>
							</div>
						</div>

						<!--<md-input-container style="width:100%;">
							<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Tipografia</md-tooltip>
							<md-select style="width:100%" class="cat-fuente" ng-style="{'font-family': editor.logo.fuente.nombre}" ng-model="editor.logo.fuente"
							    placeholder="Fuente" ng-change="editor.cambioFuente(editor.logo.fuente, 'texto')" md-no-asterisk required>
								<md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}"
								    ng-selected="editor.logo.fuente.nombre == fuente.nombre">{{fuente.nombre}}</md-option>
							</md-select>
						</md-input-container>-->

						<!--<div class=" col s12 estilo-texto" style="font-size: 0px;" bazam-ayuda data-titulo="Color" data-texto="Seleccione un area del simbolo y cambie el color" data-clases="['corner-lt']" data-identificador="ayuda-color" data-orientacion="right" data-paso="8" bazam-pasos-ayuda>
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Color</md-tooltip>
									<div color-picker color-picker-model="editor.colorTexto" ng-model="editor.colorTexto" ng-change="editor.cambioColor(editor.colorTexto, 'texto')" color-picker-position="right" class="color" style="background-color: {{editor.colorTexto}}"></div>               
								</div>-->

						<div class="col s6 estilo-texto" style="padding:0;" bazam-ayuda data-titulo="Negrita, Cursiva, Tamaño" data-texto="Cambia a Negrita (N), Cursiva (C), Aumente (+) o disminuya (-) el tamaño del texto"
						    data-clases="['corner-lt']" data-identificador="ayuda-estilo-fuentes" data-orientacion="right" data-paso="9" bazam-pasos-ayuda>
							<div class="negrita" ng-click="::editor.cambioPropiedad('bold')">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Negrita</md-tooltip>
								N
							</div>
							<div class="cursiva" ng-click="::editor.cambioPropiedad('cursive')">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Cursiva</md-tooltip>
								C
							</div>
						</div>
						<div class=" col s6 estilo-texto" style="padding:0;">
							<div class="menos" ng-click="::editor.cambioTamano('texto', false)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
								-
							</div>
							<div class="mas" ng-click="::editor.cambioTamano('texto', true)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
								+
							</div>
						</div>
					</div>
				</div>
				<!--ESLOGAN-->
				<div class="tab-editor" ng-show="editor.menuSwitch == 2">
					<div class="row">
						<div class=" col s12 no-padding">
							<button class="boton-verde" ng-if="!editor.esloganActivo" ng-click="::editor.agregarEslogan()" style="margin-top: 8px;
							width: 100%;">
								Agregar Eslogan
							</button>
						</div>
						<div ng-if="editor.esloganActivo">
							<!--<p class="text-center principal titulo" style="margin-top: 40px;">ESLOGAN</p>-->
							<div class="input-field col s12" style="padding: 0 !important">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Eslogan del logo</md-tooltip>
								<input id="eslogan" type="text" name="fuenteEslogan" maxlength="20" ng-model="editor.logo.eslogan" ng-click="editor.quitarEsloganDefault(editor.logo.eslogan)" ng-model-options="{allowInvalid: true}"
								    ng-change="editor.cambioTexto(editor.logo.eslogan, true)" ng-blur="editor.verificarEslogan(editor.logo.eslogan)">
							</div>

							<div class="estilos-fuentes col s12" style="padding: 0 !important;position: relative">
								<md-radio-group name="fuente" required ng-model="editor.categoriaEsloganSeleccionada" ng-change="editor.categoriaTextoSeleccionada = false"
								    class="md-primary">
									<md-radio-button ng-repeat="fuenteCategoria in editor.fuentesCategorias track by fuenteCategoria.idCategoria" ng-value="::fuenteCategoria.idCategoria" ng-click="::editor.abrirContenedor('fuentes', true)">
										<!--ng-disabled=" d.isDisabled "-->
										<md-tooltip md-direction="top">{{::fuenteCategoria.nombreCategoria}}</md-tooltip>
										<span class="estilo" ng-class="{'amatic':fuenteCategoria.nombreCategoria == 'Clásicas', 'niconne':fuenteCategoria.nombreCategoria == 'Moderna', 'julee':fuenteCategoria.nombreCategoria == 'Llamativas', 'cabin':fuenteCategoria.nombreCategoria == 'Minimalista'}">A</span>
									</md-radio-button>
								</md-radio-group>

								<!-- VALIDACION -->
								<div ng-messages="inicio.datosForm.fuente.$error " style="color:maroon;" role="alert " ng-show="inicio.datosForm.$submitted ">
									<div ng-message="required" style="top: 64px;">Debes elegir un estilo de Tipografía.</div>
									</br>
								</div>
							</div>

							<!--<md-input-container style="width:100%;">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Tipografia</md-tooltip>
								<md-select style="width:100%;" class="cat-fuente" ng-style="{'font-family': editor.logo.fuenteEslogan.nombre}" ng-model="editor.logo.fuenteEslogan"
								    placeholder="Fuente" ng-change="editor.cambioFuente(editor.logo.fuenteEslogan, 'eslogan')" md-no-asterisk required>
									<md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}"
									    ng-selected="editor.logo.fuenteEslogan.nombre == fuente.nombre">{{fuente.nombre}}</md-option>
								</md-select>
							</md-input-container>-->

							<!--<div class=" col s12 estilo-texto" style="font-size: 0px;" >
										<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Color</md-tooltip>
										<div color-picker color-picker-model="editor.colorEslogan" ng-model="editor.colorEslogan" ng-change="editor.cambioColor(editor.colorEslogan, 'eslogan')" color-picker-position="right" class="color" style="background-color: {{editor.colorEslogan}}"></div>               
									</div>-->

							<div class=" col s6 estilo-texto" style="padding:0;">
								<div class="negrita" ng-click="::editor.cambioPropiedad('bold', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Negrita</md-tooltip>
									N
								</div>
								<div class="cursiva" ng-click="::editor.cambioPropiedad('cursive', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Cursiva</md-tooltip>
									C
								</div>
							</div>

							<div class=" col s6 estilo-texto" style="padding:0;">
								<div class="menos" ng-click="::editor.cambioTamano('eslogan', false)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
									-
								</div>
								<div class="mas" ng-click="::editor.cambioTamano('eslogan', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
									+
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="tab-editor" ng-show="editor.menuSwitch == 3">
					<div class="row">
						<div class="col s12 no-padding">
							<md-chips style="padding:0;" md-add-on-blur="true" ng-model="editor.etiquetasSeleccionadas" md-separator-keys="[32,186,9,36,188,13,27]"
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
								    md-no-asterisk required>
									<md-option class="iconos" ng-repeat="categoria in editor.categoriasPosibles track by categoria.idCategoria" ng-value="::categoria.idCategoria">{{::categoria.nombreCategoria}}</md-option>
								</md-select>
							</md-input-container>
							<span class="refresh-icon" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" ng-class="{ 'loading-white': !editor.completadoBuscar}"
							    ng-disabled="!editor.completadoBuscar">
								<i class="material-icons">search</i>
							</span>
						</div>

						<div class=" col s12 estilo-texto" style="padding:0;">
							<div class="menos" ng-click="::editor.cambioTamano('icono', false)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
								-
							</div>
							<div class="mas" ng-click="::editor.cambioTamano('icono', true)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
								+
							</div>
						</div>

					</div>
				</div>

			</div>

			<hr style="margin: 5px 8px;
			background-color: var(--principal);
			height: 0px;">

			<div class=" col s12 estilo-texto" style="padding:0;">
				<p class="text-center principal" style="margin-top: 0px; margin-bottom:0px;">Orientación</p>
			</div>

			<div class=" col s6" style="padding:0; margin-bottom:10px;">
				<div class="cubo-logo-orientacion vertical" ng-click="::editor.cambiarOrientacion('vertical')">
					<div>
						<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo arriba</md-tooltip>
						<span>
							<i class="material-icons">thumb_up</i>
						</span>
						<span>TU LOGO</span>
					</div>
				</div>

			</div>
			<div class=" col s6" style="padding:0; margin-bottom:10px;">
				<div class="cubo-logo-orientacion horizontal" ng-click="::editor.cambiarOrientacion('horizontal')">
					<div>
						<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo a la izquierda</md-tooltip>
						<span style="margin-right: 5px;">
							<i class="material-icons">thumb_up</i>
						</span>
						<span>TU LOGO</span>
					</div>
				</div>
			</div>

			<hr style="margin: 10px 8px;
			background-color: var(--principal);
			height: 0px;">

			<div class="col s6" style="margin-bottom:10px;" bazam-ayuda data-titulo="Fondo" data-texto="Visualice su logo en un color de fondo diferente." data-clases="['corner-lt']"
			data-identificador="ayuda-fondo" data-orientacion="right" data-paso="10" bazam-pasos-ayuda>
				<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Fondo</md-tooltip>
				<bazam-color-picker data-color="editor.colorFondo"></bazam-color-picker>
			</div>
			<div class="col s6" style="margin-bottom:10px;" bazam-ayuda data-titulo="Cuadricula" data-texto="Utiice la cuadricula para orientar los elementos de su logo "
				data-clases="['corner-lt']" data-identificador="ayuda-cuadricula" data-orientacion="right" data-paso="11" 		bazam-pasos-ayuda>
				<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Cuadricula</md-tooltip>
				<div class="selector-cuadricula" ng-class="{'active': editor.cuadricula }" ng-click="::editor.activarCuadricula()">
					<i class="material-icons">apps</i>
				</div>
			</div>

			<hr style="margin: 10px 8px;
			background-color: var(--principal);
			height: 0px;">

			<div class=" col s12">
				<md-button style="margin:5px 0 0 0; font-weight:bold; font-family: futura-heavy;width:100%; border-radius:4px; background-color: var(--principal); color:white;" ui-sref="inicio">
					Volver
				</md-button>
			</div>


		</div>

		<div class="contenedor-principal editor col s7" ng-class="{'cuadricula': editor.cuadricula,'preview-abierto': editor.preview}"
			style="display: flex;">
			
			<span class="seleccionar" ng-click="editor.preGuardarLogo(editor.svgFinal, 'Logo y nombre', editor.logo.icono.idElemento, editor.logo.fuente.idElemento)" style="top: 5%;"> <p>GUARDAR</p><img src="assets/images/save.svg" alt=""></span>
			
			<span class="seleccionar" ng-click="::editor.buscarPlanes()" style="  top: 15%;"> <p>COMPRAR</p><img src="assets/images/shop.svg" alt=""></span>

			<div class="contenedor-svg" style="position:relative" ng-style="{'background-color': editor.colorFondo}">
				<bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente"
				    data-svg-final="editor.svgFinal" data-id-logo="editor.logo.idLogo" data-id-padre="editor.idLogoPadre" data-eslogan="editor.logo.eslogan"
				    data-color-icono="editor.colorIcono" data-color-texto="editor.colorTexto" ></bazam-svg>
				<div class='overlay-logo loading-purple' ng-hide="editor.svgFinal"></div>
			</div>
			<div class="overlay-svg" ng-class="{'abierto': (editor.contenedores.borradores || editor.contenedores.busquedaIconos) }"></div>
			<div class="overlay-svg-previews" ng-class="{'abierto': editor.contenedores.fuentes }"></div>

			<div class="contenedor-fuentes" ng-class="{'abierto': editor.contenedores.fuentes}">
				<div class="cerrar-contenedor-bi fuentes" ng-click="::editor.cerrarContenedores()">
					<i class="material-icons cerrar">clear</i>
				</div>
				<div class="row padding-bottom-0 margin-bottom-0">
					<div class="col l12" style="position: relative; padding:0 !important; border-bottom: 1px solid var(--principal);cursor:pointer; overflow-y: scroll;
					max-height: 91vh;">
						<!-- <div class="fuente" ng-repeat="fuente in editor.fuentes">
                            <p class="text-center">{{}}</p>
						</div>-->

						<!-- TEXTO PRINCIPAL LISTA DE FUENTES -->
						<md-radio-group ng-model="editor.logo.fuente" ng-change="editor.cambioFuente(editor.logo.fuente, 'texto')" class="md-primary">
							<md-radio-button class="opcion-fuente" ng-repeat="fuente in editor.fuentes | filter: {'categorias_idCategoria': editor.categoriaTextoSeleccionada } track by fuente.idElemento"
							    ng-value="{url:fuente.url, nombre: fuente.nombre}">
								<!--ng-disabled=" d.isDisabled "-->
								<span style="{{'font-family:' + fuente.nombre + '!important'}}; {{editor.logo.fuente.nombre == fuente.nombre ? 'color: var(--principal) !important;    transform: scale(1.2) !important' : 'color: black !important'}};     letter-spacing: 2px;">{{::fuente.nombre}}</span>
							</md-radio-button>
						</md-radio-group>

						<!-- ESLOGAN LISTA DE FUENTES -->
						<md-radio-group class="fuente" ng-model="editor.logo.fuenteEslogan" ng-change="editor.cambioFuente(editor.logo.fuenteEslogan, 'eslogan')"
						    class="md-primary">
							<md-radio-button class="opcion-fuente" ng-repeat="fuente in editor.fuentes | filter: {'categorias_idCategoria': editor.categoriaEsloganSeleccionada } track by fuente.idElemento"
							    ng-value="{url:fuente.url, nombre: fuente.nombre}">
								<!--ng-disabled=" d.isDisabled "-->
								<span style="{{'font-family:' + fuente.nombre + '!important'}}; {{editor.logo.fuenteEslogan.nombre == fuente.nombre ? 'color: var(--principal) !important;    transform: scale(1.2) !important' : 'color: black !important'}};     letter-spacing: 2px;">{{::fuente.nombre}}</span>
							</md-radio-button>
						</md-radio-group>
					</div>
				</div>
			</div>

			<div class="contenedor-borradores" ng-class="{'abierto': editor.contenedores.borradores}">
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
			</div>

			<div class="contenedor-iconos" ng-class="{'abierto': editor.contenedores.busquedaIconos}">
				<div class="cerrar-contenedor-bi" ng-click="::editor.cerrarContenedores();">
					<i class="material-icons cerrar">clear</i>
				</div>
				<div class="row padding-bottom-0 margin-bottom-0">
					<div class="col s11" style="position: relative;">


						<div class="col l3 xl2 contenedor-opcion-icono" ng-if="!editor.iconos.length" ng-repeat="icono in [1,2,3,4,5,6]">
							<div class="opcion-icono loading-purple">
								<div class="agregar" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)">
									<img style="width:100%" src="assets/images/a.png" alt="">
									<div style="position:absolute;display: flex;
										flex-flow: column;top: 0;height: 100%;
										justify-content: center; text-align:center; width:100%;">
									</div>
								</div>
							</div>
						</div>


						<div class="col l3 xl2 contenedor-opcion-icono" ng-repeat="icono in editor.iconos track by icono.idElemento">
							<div class="opcion-icono" ng-click="::editor.cerrarContenedores();editor.reemplazarIcono(icono);">
								<bazam-visualizar data-svg="::editor.base64.decode(icono.svg)">
								</bazam-visualizar>
							</div>
						</div>

						<div class="col l3 xl2 contenedor-opcion-icono" ng-if="editor.iconos.length">
							<div class="opcion-icono" ng-class="{ 'loading-purple': !editor.completadoBuscar}">
								<div class="agregar" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)">
									<img style="width:100%" src="assets/images/a.png" alt="">
									<div ng-class="{'color-trans': !editor.completadoBuscar}" style="position:absolute;display: flex;
									flex-flow: column;top: 0;height: 100%;
									justify-content: center; text-align:center; width:100%;color: var(--principal)">
										<i class="material-icons">search</i>
										<span>CARGAR</span><span> MÁS</span>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<div ng-click="::editor.buscarPlanes()" class="boton-planes-unico">
				<md-icon>arrow_drop_up</md-icon>
				Planes
			</div>
		</div>

		<div class="contenedor-previews col s3" style="position:static; padding:0; overflow-y: auto">
			<div class="cerrar-contenedor-p" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
				<i class="material-icons cerrar">clear</i>
			</div>
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

<bazam-planes estado="editor.abrirPlanes" datos="editor.datosComprar" guardar-logo="editor.guardarLogo"></bazam-planes>