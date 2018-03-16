<style ng-repeat="fuente in editor.fuentes">
	@font-face {
		font-family: '{{fuente.nombre}}';
		src: url('{{fuente.url}}');
	}
</style>

<section class="sub-header-principal">
	<div class="row margin-bottom-0">

		<div class="col s4 logo">
			<h5 class="secundario" ui-sref="principal.comenzar">
				<i class="material-icons md-48 aling-top">fingerprint</i>
				<span>DISEÑADOR</span>
			</h5>
		</div>
		<div class="col s8">
			<div class="row opciones-sub-header margin-bottom-0">
				<div class="col l2 xl2" bazam-ayuda data-titulo="Fondo" data-texto="Visualice su logo en un color de fondo diferente." data-clases="['corner-lt']"
				    data-identificador="ayuda-fondo" data-orientacion="right" data-paso="10" bazam-pasos-ayuda>
					<div color-picker color-picker-model="editor.colorFondo" ng-model="editor.colorFondo" color-picker-position="bottom" ng-click="editor.cuadricula = false"
					    class="selector-fondo" ng-style="{'background-color': editor.colorFondo}" style="font-size: 0px;"></div>
					<span class="principal">Fondo</span>
				</div>
				<div class="col l3 xl2" bazam-ayuda data-titulo="Cuadricula" data-texto="Utiice la cuadricula para orientar los elementos de su logo "
				    data-clases="['corner-lt']" data-identificador="ayuda-cuadricula" data-orientacion="right" data-paso="11" bazam-pasos-ayuda>
					<div class="selector-cuadricula" ng-class="{'active': editor.cuadricula }" ng-click="editor.activarCuadricula()">
						<i class="material-icons">apps</i>
					</div>
					<span class="principal">Cuadricula</span>
				</div>
				<div class="col l7 xl6 offset-xl2">
					<button class="boton-oborder" ng-class="{'active': editor.borradores}" ng-click="editor.mostrarBorradores()" bazam-ayuda
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

					<button class="boton-oborder" ng-click="editor.buscarPlanes()">
						<i class="material-icons">shopping_cart</i> COMPRAR</button>
				</div>
			</div>
		</div>

	</div>
</section>

<section style="height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
	<div class="row margin-bottom-0" style="overflow: hidden;">
		<form class="margin-bottom-0">
			<div class="col s3 editor-p sidebar-1 scrollbar-dynamic" data-jquery-scrollbar="editor.jqueryScrollbarOptions" ng-form="editor.datosForm"
			    style="padding-top: 10px !important;text-align: center; width: 100% !important;" ng-init="editor.menuSwitch = 1">

				<div class="col s4" style="padding: 0">
					<div ng-click="editor.menuSwitch = 1" ng-class="{'seleccionadoo': editor.menuSwitch == 1}" class="tab">
						<p class="text-center principal titulo" style="margin-bottom: 10px">NOMBRE</p>
					</div>
				</div>
				<div class="col s4" style="padding: 0" bazam-ayuda data-titulo="Nombre y Eslogan" data-texto="Modifique el estilo del texto de su nombre o eslogan"
				    data-clases="['corner-lt']" data-identificador="ayuda-nombre-eslogan" data-orientacion="right" data-paso="7" bazam-pasos-ayuda>
					<div ng-click="editor.menuSwitch = 2" ng-class="{'seleccionadoo': editor.menuSwitch == 2}" class="tab">
						<p class="text-center principal titulo" style="margin-bottom: 10px">ESLOGAN</p>
					</div>
				</div>

				<div class="col s4" style="padding: 0">
					<div ng-click="editor.menuSwitch =3" ng-class="{'seleccionadoo': editor.menuSwitch == 3}" class="tab">
						<p class="text-center principal titulo" style="margin-bottom: 10px">ICONO</p>
					</div>
				</div>

				<div class="tabs-textos" ng-switch="editor.menuSwitch" style="width: 100%">
					<div ng-switch-when="1">
						<!--<p class="text-center principal titulo" ng-if="!editor.esloganActivo">TEXTO</p>-->
						<div class="input-field col s12">
							<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Nombre del logo</md-tooltip>
							<input id="nombre" type="text" name="fuente" maxlength="20" ng-model="editor.logo.texto" ng-model-options="{allowInvalid: true}"
							    ng-change="editor.cambioTexto(editor.logo.texto)">
						</div>

						<md-input-container style="width:100%; padding: 0 0.75rem">
							<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Tipografia</md-tooltip>
							<md-select class="cat-fuente" ng-style="{'font-family': editor.logo.fuente.nombre}" ng-model="editor.logo.fuente" placeholder="Fuente"
							    ng-change="editor.cambioFuente(editor.logo.fuente, 'texto')" md-no-asterisk required>
								<md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}"
								    ng-selected="editor.logo.fuente.nombre == fuente.nombre">{{fuente.nombre}}</md-option>
							</md-select>
						</md-input-container>

						<!--<div class=" col s12 estilo-texto" style="font-size: 0px;" bazam-ayuda data-titulo="Color" data-texto="Seleccione un area del simbolo y cambie el color" data-clases="['corner-lt']" data-identificador="ayuda-color" data-orientacion="right" data-paso="8" bazam-pasos-ayuda>
                                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Color</md-tooltip>
                                    <div color-picker color-picker-model="editor.colorTexto" ng-model="editor.colorTexto" ng-change="editor.cambioColor(editor.colorTexto, 'texto')" color-picker-position="right" class="color" style="background-color: {{editor.colorTexto}}"></div>               
                                </div>-->

						<div class=" col s12 estilo-texto" bazam-ayuda data-titulo="Negrita, Cursiva, Tamaño" data-texto="Cambia a Negrita (N), Cursiva (C), Aumente (+) o disminuya (-) el tamaño del texto"
						    data-clases="['corner-lt']" data-identificador="ayuda-estilo-fuentes" data-orientacion="right" data-paso="9" bazam-pasos-ayuda>
							<div class="negrita" ng-click="editor.cambioPropiedad('bold')">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Negrita</md-tooltip>
								N
							</div>
							<div class="cursiva" ng-click="editor.cambioPropiedad('cursive')">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Cursiva</md-tooltip>
								C
							</div>
						</div>
						<div class=" col s12 estilo-texto">
							<div class="menos" ng-click="editor.cambioTamano('texto', false)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
								-
							</div>
							<div class="mas" ng-click="editor.cambioTamano('texto', true)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
								+
							</div>
						</div>
					</div>
					<!--ESLOGAN-->
					<div ng-switch-when="2">
						<div class=" col s12" style="padding: 0">
							<button class="boton-verde" ng-if="!editor.esloganActivo" ng-click="editor.agregarEslogan()" style="margin-top: 40px;">
								Agregar Eslogan
							</button>
						</div>
						<div ng-if="editor.esloganActivo">
							<!--<p class="text-center principal titulo" style="margin-top: 40px;">ESLOGAN</p>-->
							<div class="input-field col s12">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Eslogan del logo</md-tooltip>
								<input id="nombre" type="text" name="fuenteEslogan" maxlength="20" ng-model="editor.logo.eslogan" ng-model-options="{allowInvalid: true}"
								    ng-change="editor.cambioTexto(editor.logo.eslogan, true)">
							</div>

							<md-input-container style="width:100%; padding: 0 0.75rem">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Tipografia</md-tooltip>
								<md-select class="cat-fuente" ng-style="{'font-family': editor.logo.fuenteEslogan.nombre}" ng-model="editor.logo.fuenteEslogan"
								    placeholder="Fuente" ng-change="editor.cambioFuente(editor.logo.fuenteEslogan, 'eslogan')" md-no-asterisk required>
									<md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}"
									    ng-selected="editor.logo.fuenteEslogan.nombre == fuente.nombre">{{fuente.nombre}}</md-option>
								</md-select>
							</md-input-container>

							<!--<div class=" col s12 estilo-texto" style="font-size: 0px;" >
                                        <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Color</md-tooltip>
                                        <div color-picker color-picker-model="editor.colorEslogan" ng-model="editor.colorEslogan" ng-change="editor.cambioColor(editor.colorEslogan, 'eslogan')" color-picker-position="right" class="color" style="background-color: {{editor.colorEslogan}}"></div>               
                                    </div>-->

							<div class=" col s12 estilo-texto">
								<div class="negrita" ng-click="editor.cambioPropiedad('bold', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Negrita</md-tooltip>
									N
								</div>
								<div class="cursiva" ng-click="editor.cambioPropiedad('cursive', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Cursiva</md-tooltip>
									C
								</div>
							</div>

							<div class=" col s12 estilo-texto">
								<div class="menos" ng-click="editor.cambioTamano('eslogan', false)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
									-
								</div>
								<div class="mas" ng-click="editor.cambioTamano('eslogan', true)">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
									+
								</div>
							</div>

						</div>
					</div>

					<div ng-switch-when="3">
						<div class="col s12 text-center" ng-form="editor.iconosForm" style="display: flex;align-items: center;">
							<md-input-container style="width:80%; padding: 0 0.75rem">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Categoria del icono</md-tooltip>
								<md-select ng-model="editor.categoriaIcono" placeholder="Buscar simbolos" ng-change="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)"
								    md-no-asterisk required>
									<md-option ng-repeat="categoria in editor.categoriasPosibles track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
								</md-select>
							</md-input-container>
							<span style="background: var(--principal);color: white;border-radius: 3px;padding: 2;cursor: pointer;" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)"
							    ng-class="{ 'loading-white': !editor.completadoBuscar}">
								<i class="material-icons">refresh</i>
							</span>
						</div>

						<!--<div class=" col s12 estilo-texto" style="font-size:0px">
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Color del área seleccionada</md-tooltip>
									<div color-picker color-picker-model="editor.colorIcono" ng-model="editor.colorIcono" ng-change="editor.cambioColor(editor.colorIcono, 'icono')" color-picker-position="bottom" class="color" style="background-color: {{editor.colorIcono}}"></div>
								</div>-->

						<div class=" col s12 estilo-texto">
							<div class="menos" ng-click="editor.cambioTamano('icono', false)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
								-
							</div>
							<div class="mas" ng-click="editor.cambioTamano('icono', true)">
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
								+
							</div>
						</div>
						<div class=" col s12 estilo-texto">
							<p class="text-center principal" style="margin-top: 20px;">Orientación</p>
						</div>

						<div class=" col s12">
							<div class="cubo-logo-orientacion vertical" ng-click="editor.cambiarOrientacion('vertical')">
								<div>
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo arriba</md-tooltip>
									<span>
										<i class="material-icons">thumb_up</i>
									</span>
									<span>TU LOGO</span>
								</div>
							</div>

							<div class="cubo-logo-orientacion horizontal" ng-click="editor.cambiarOrientacion('horizontal')">
								<div>
									<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo a la izquierda</md-tooltip>
									<span style="margin-right: 5px;">
										<i class="material-icons">thumb_up</i>
									</span>
									<span>TU LOGO</span>
								</div>
							</div>
						</div>

					</div>
				</div>



			</div>
			<!--
                    <div class="col s2 sidebar-2 scrollbar-dynamic" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions" style="width: 100% !important;">
                        <p class="text-center principal titulo">ICONO</p>

	                    <div class="col s12 text-center" ng-form="editor.iconosForm" style="display: flex;align-items: center;">
		                    <md-input-container style="width:80%; padding: 0 0.75rem" >
								<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Categoria del icono</md-tooltip>
							  	<md-select ng-model="editor.categoriaIcono" placeholder="Buscar simbolos" ng-change="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" md-no-asterisk required> 
							    	<md-option ng-repeat="categoria in editor.categoriasPosibles track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
							  	</md-select>
							</md-input-container>
							<span style="background: var(--principal);color: white;border-radius: 3px;padding: 2;cursor: pointer;" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" ng-class="{ 'loading-white': !editor.completadoBuscar}">
                                <i class="material-icons">refresh</i>
                            </span>
	                    </div>

						<!--<div class=" col s12 estilo-texto" style="font-size:0px">
							<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Color del área seleccionada</md-tooltip>
                    		<div color-picker color-picker-model="editor.colorIcono" ng-model="editor.colorIcono" ng-change="editor.cambioColor(editor.colorIcono, 'icono')" color-picker-position="bottom" class="color" style="background-color: {{editor.colorIcono}}"></div>
                        </div>--

						<div class=" col s12 estilo-texto">
                    		<div class="menos" ng-click="editor.cambioTamano('icono', false)">
                    			<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
                    			-
                    		</div>               
                    		<div class="mas" ng-click="editor.cambioTamano('icono', true)">
                    			<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
                    			+
                    		</div>               
                        </div>
						<div class=" col s12 estilo-texto">
                        	<p class="text-center principal" style="margin-top: 20px;">Orientación</p>
                        </div>

                        <div class=" col s12">
	                        <div class="cubo-logo-orientacion vertical" ng-click="editor.cambiarOrientacion('vertical')">
	                            <div>
	                            	<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo arriba</md-tooltip>
	                                <span><i class="material-icons">thumb_up</i></span>
	                                <span>TU LOGO</span>
	                            </div>
	                        </div>

	                        <div class="cubo-logo-orientacion horizontal" ng-click="editor.cambiarOrientacion('horizontal')">
	                            <div>
	                            	<md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Simbolo a la izquierda</md-tooltip>
	                                <span style="margin-right: 5px;"><i class="material-icons">thumb_up</i></span>
	                                <span>TU LOGO</span>
	                            </div>
	                        </div>
	                    </div>


                    </div>-->
		</form>


		<div class="contenedor-principal editor col s7" ng-class="{'cuadricula': editor.cuadricula,'preview-abierto': editor.preview}"
		    style="display: flex;" ng-style="{'background-color': editor.colorFondo}">
			<div class="contenedor-svg">
				<bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente"
				    data-svg-final="editor.svgFinal" data-id-logo="editor.logo.idLogo" data-id-padre="editor.idLogoPadre" data-eslogan="editor.logo.eslogan"></bazam-svg>
			</div>
			<div class="overlay-svg" ng-class="{'abierto': (editor.borradores || editor.busquedaIconos) }"></div>
			<div class="overlay-svg-previews" ng-class="{'abierto': editor.preview }"></div>

			<div class="contenedor-borradores" ng-class="{'abierto': editor.borradores}">
				<div class="cerrar-contenedor-bi" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
					<i class="material-icons cerrar">clear</i>
				</div>
				<div class="row padding-bottom-0 margin-bottom-0">
					<div class="col l3 xl2" style="padding: 0.42rem .35rem !important;">
						<div class="agregar" ng-click="editor.realizarComparacion(editor.comparar)">
							<i class="material-icons">add</i>
							<span>AGREGAR</span>
						</div>
					</div>
					<div class="col l8 xl9" style="position: relative;">

						<div class="col l3 xl2 contenedor-opcion-icono" ng-repeat="comparacion in editor.comparaciones track by comparacion.creacion">

							<div class="opcion-borrador">
								<div class="overlay-opcion"></div>
								<span class="usar">
									<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
									<i class="material-icons" ng-click="editor.restaurarComparacion(comparacion.svg)">file_upload</i>
								</span>
								<span class="remover">
									<md-tooltip md-delay="2" md-direction="top">Remover</md-tooltip>
									<i class="material-icons" ng-click="editor.comparaciones.splice($index, 1)">delete</i>
								</span>
								<bazam-visualizar style="width: 100%;" data-svg="comparacion.svg">
								</bazam-visualizar>

							</div>

						</div>

						<div ng-show="!editor.comparaciones.length" layout-padding style="height: 105px;display: flex;align-items: center;justify-content: center;font-family: 'futura-heavy' !important;font-size: 20px;">
							No existe ningun borrador
						</div>

					</div>
				</div>
			</div>

			<div class="contenedor-iconos" ng-class="{'abierto': editor.busquedaIconos}">
				<div class="cerrar-contenedor-bi" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
					<i class="material-icons cerrar">clear</i>
				</div>
				<div class="row padding-bottom-0 margin-bottom-0">
					<div class="col s10 offset-s1" style="position: relative;">


						<div class="col l3 xl2 contenedor-opcion-icono" ng-repeat="icono in editor.iconos">
							<div fondo-contraste color="icono.color" class="opcion-icono">
								<div class="overlay-opcion"></div>
								<span class="seleccionar">
									<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
									<i class="material-icons" ng-click="editor.reemplazarIcono(icono)">check</i>
								</span>
								<bazam-visualizar data-svg="editor.base64.decode(icono.svg)">
								</bazam-visualizar>
							</div>
						</div>


					</div>
				</div>
			</div>

			<div ng-click="editor.buscarPlanes()" class="boton-planes-unico">
				<md-icon>arrow_drop_up</md-icon>
				Planes
			</div>
		</div>

		<div class="contenedor-previews scrollbar-dynamic col s2" style="position:static" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
			<div class="cerrar-contenedor-p" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
				<i class="material-icons cerrar">clear</i>
			</div>
			<div class="row padding-bottom-0 margin-bottom-0">
				<div class="col s12" style="padding:0">

					<div style="position: relative;">
						<div style="width: 25%;position: absolute;left: calc(40% - 23%);top: 32%;transform: rotate(-48deg);">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<div style="width: 25%;position: absolute;left: calc(93% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(100%) invert(80%) contrast(100%);">
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
						<div style="width: 33%;position: absolute;left: calc(50% - 18%);top: 17.5%;opacity: 0.9;">
							<bazam-actualizar data-svg="editor.svgFinal"></bazam-actualizar>
						</div>
						<img src="assets/images/mockups/envase.jpg" width="100%">
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

			</div>
		</div>

	</div>
</section>

<bazam-planes estado="editor.abrirPlanes" datos="editor.datosComprar" ng-if="editor.abrirPlanes"></bazam-planes>