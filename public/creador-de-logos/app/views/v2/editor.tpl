	<style ng-repeat="fuente in editor.fuentes">
	    @font-face {
	        font-family: '{{fuente.nombre}}';
	        src: url('{{fuente.url}}');
	    }
	</style> 

    <section class="sub-header-principal">
            <div class="row margin-bottom-0">

                <div class="col s4 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8">
                	<div class="row opciones-sub-header margin-bottom-0">
	                    <div class="col l2 xl2">
	                    	<div color-picker color-picker-model="editor.colorFondo" ng-model="editor.colorFondo" color-picker-position="bottom" ng-click="editor.cuadricula = false" class="selector-fondo" ng-style="{'background-color': editor.colorFondo}" style="font-size: 0px;"></div>
	                    	<span class="principal">Fondo</span>
	                    </div>
	                    <div class="col l3 xl2">
	                    	<div class="selector-cuadricula" ng-class="{'active': editor.cuadricula }"  ng-click="editor.activarCuadricula()"><i class="material-icons">apps</i></div>
	                    	<span class="principal">Cuadricula</span>
	                    </div>
	                    <div class="col l7 xl6 offset-xl2">
							<button class="boton-oborder" ng-class="{'active': editor.borradores}" ng-click="editor.mostrarBorradores()"><i class="material-icons">queue</i> BORRADORES</button>

	                    	<button class="boton-oborder" ng-class="{'active': editor.preview}" ng-click="editor.mostrarPreviews()"><i class="material-icons">remove_red_eye</i> PREVIEW</button>

	                    	<button class="boton-oborder" ng-class="{'loading-purple': !editor.completadoGuardar}" ng-click="editor.guardarLogo(editor.svgFinal, 'Logo y nombre', editor.logo.icono.idElemento)"><i class="material-icons" >save</i> GUARDAR</button>

	                    	<button class="boton-oborder" ng-click="editor.buscarPlanes()"><i class="material-icons">shopping_cart</i> COMPRAR</button>
	                    </div>
	                </div>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">
                <form class="margin-bottom-0">
                    <div class="col s2 sidebar-1 scroll" ng-form="editor.datosForm">
                    	<p class="text-center principal titulo">TEXTO</p>
                        <div class="input-field col s12">
                            <input id="nombre" type="text" name="fuente" maxlength="12" ng-model="editor.logo.texto" ng-model-options="{allowInvalid: true}" ng-change="editor.cambioTexto(editor.logo.texto)">
                            <label for="nombre" class="active">Nombre</label>
                        </div>

						<md-input-container style="width:100%; padding: 0 0.75rem" >
						  	<md-select ng-model="editor.logo.fuente" placeholder="Fuente" ng-change="editor.cambioFuente(editor.logo.fuente)" md-no-asterisk required> 
						    	<md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}">{{fuente.nombre}}</md-option>
						  	</md-select>
						</md-input-container>
                        
                        <div class=" col s12 estilo-texto" style="font-size: 0px;" >
                    		<div color-picker color-picker-model="editor.colorTexto" ng-model="editor.colorTexto" ng-change="editor.cambioColor(editor.colorTexto, 'texto')" color-picker-position="right" class="color" style="background-color: {{editor.colorTexto}}"></div>               
                        </div>

                        <div class=" col s12 estilo-texto">
                    		<div class="negrita" ng-click="editor.cambioPropiedad('bold')">N</div>               
                    		<div class="cursiva" ng-click="editor.cambioPropiedad('cursive')">C</div>               
                        </div>
						<div class=" col s12 estilo-texto">
                    		<div class="menos" ng-click="editor.cambioTamano('texto', false)">-</div>               
                    		<div class="mas" ng-click="editor.cambioTamano('texto', true)">+</div>               
                        </div>
						

						<!--<div class="divisor"></div>

                        <div class="input-field col s12">
                            <input id="eslogan" type="text" value="Mi eslogan" required>
                            <label for="eslogan" class="active">Eslogan</label>
                        </div>

						<md-input-container style="width:100%; padding: 0 0.75rem" >
						  	<md-select ng-model="principal.datos.categoria" placeholder="Fuente" required> 
						    	<md-option>Arial</md-option>
						    	<md-option>Times new Roman</md-option>
						  	</md-select>
						</md-input-container>

                        <div class=" col s12 estilo-texto">
                    		<div class="negrita activo">N</div>               
                    		<div class="cursiva">C</div>               
                        </div>
						<div class=" col s12 estilo-texto">
                    		<div class="menos">-</div>               
                    		<div class="mas">+</div>               
                        </div>
						<div class=" col s12 estilo-texto">
                    		<div class="color"></div>               
                        </div>-->


                    </div>
                
                    <div class="col s2 sidebar-2 scrollbar-dynamic" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
                        <p class="text-center principal titulo">ICONO</p>

	                    <div class="col s12 text-center" ng-form="editor.iconosForm" style="display: flex;align-items: center;">
		                    <md-input-container style="width:80%; padding: 0 0.75rem" >
							  	<md-select ng-model="editor.categoriaIcono" placeholder="Categoria" ng-change="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" md-no-asterisk required> 
							    	<md-option ng-repeat="categoria in editor.categoriasPosibles track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
							  	</md-select>
							</md-input-container>
							<span style="background: var(--principal);color: white;border-radius: 3px;padding: 2;cursor: pointer;" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" ng-class="{ 'loading-white': !editor.completadoBuscar}">
                                <i class="material-icons">refresh</i>
                            </span>
	                    </div>

						<div class=" col s12 estilo-texto" style="font-size:0px">
                    		<div color-picker color-picker-model="editor.colorIcono" ng-model="editor.colorIcono" ng-change="editor.cambioColor(editor.colorIcono, 'icono')" color-picker-position="bottom" class="color" style="background-color: {{editor.colorIcono}}"></div>
                        </div>

						<div class=" col s12 estilo-texto">
                    		<div class="menos" ng-click="editor.cambioTamano('icono', false)">-</div>               
                    		<div class="mas" ng-click="editor.cambioTamano('icono', true)">+</div>               
                        </div>
						<div class=" col s12 estilo-texto">
                        	<p class="text-center principal" style="margin-top: 20px;">Orientación</p>
                        </div>

                        <div class=" col s12">
	                        <div class="cubo-logo-orientacion vertical" ng-click="editor.cambiarOrientacion('vertical')">
	                            <div>
	                                <span><i class="material-icons">thumb_up</i></span>
	                                <span>TU LOGO</span>
	                            </div>
	                        </div>

	                        <div class="cubo-logo-orientacion horizontal" ng-click="editor.cambiarOrientacion('horizontal')">
	                            <div>
	                                <span style="margin-right: 5px;"><i class="material-icons">thumb_up</i></span>
	                                <span>TU LOGO</span>
	                            </div>
	                        </div>
	                    </div>


                    </div>
                </form>

				
				<div class="contenedor-principal editor col s8" ng-class="{'cuadricula': editor.cuadricula}" style="display: flex;" ng-style="{'background-color': editor.colorFondo}">
					<div class="contenedor-svg">
				       <bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-svg-final="editor.svgFinal"></bazam-svg>
				    </div>
				    <div class="overlay-svg"  ng-class="{'abierto': (editor.borradores || editor.busquedaIconos) }"></div>
				    <div class="overlay-svg-previews"  ng-class="{'abierto': editor.preview }"></div>
				    <div class="contenedor-borradores" ng-class="{'abierto': editor.borradores}">
				    	<div class="cerrar-contenedor-bi">
				    		<i class="material-icons cerrar" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">clear</i>
				    	</div>
				    	<div class="row padding-bottom-0">
				    		<div class="col s2">
				    			<div class="agregar" ng-click="editor.realizarComparacion(editor.comparar)"><i class="material-icons">add</i> <span>AGREGAR</span></div>
				    		</div>
				    		<div class="col s10">
				    			<div class="opcion-borrador" ng-repeat="comparacion in editor.comparaciones track by comparacion.creacion">
				    				<div class="overlay-opcion"></div>
				    				<span class="usar">
				    					<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
            							<i class="material-icons" ng-click="editor.restaurarComparacion(comparacion.svg)">file_upload</i>
            						</span>
				    				<span class="remover">
				    					<md-tooltip md-delay="2" md-direction="top">Remover</md-tooltip>
				    					<i class="material-icons" ng-click="editor.comparaciones.splice($index, 1)">delete</i>
				    				</span>
				    				<bazam-visualizar data-svg="comparacion.svg">
                                    </bazam-visualizar>
                                    
				    			</div>
                                <div ng-show="!editor.comparaciones.length" layout-padding style="height: 100%;display: flex;align-items: center;justify-content: center;font-family: 'futura-heavy' !important;font-size: 20px;">
                                    No existe ningun borrador
                                </div>
				    		</div>
				    	</div>
				    </div>
					<div class="contenedor-iconos" ng-class="{'abierto': editor.busquedaIconos}">
				    	<div class="cerrar-contenedor-bi">
				    		<i class="material-icons cerrar" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">clear</i>
				    	</div>
				    	<div class="row padding-bottom-0">
				    		<div class="col s10">

				    			<div class="opcion-icono" ng-repeat="icono in editor.iconos" >
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
					<div class="contenedor-previews" ng-class="{'abierto': editor.preview}">
						<div class="cerrar-contenedor-p">
				    		<i class="material-icons cerrar" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">clear</i>
				    	</div>	
						<div class="row padding-bottom-0">
				    		<div class="col s12">
                                
				    		</div>
				    	</div>				    						
					</div>
				</div>
            </div>
        </section>