	<style ng-repeat="fuente in editor.fuentes">
	    @font-face {
	        font-family: '{{fuente.nombre}}';
	        src: url('{{fuente.url}}');
	    }
	</style> 

    <section class="sub-header-principal">
            <div class="row margin-bottom-0">

                <div class="col s4 logo">
                    <h5 class="secundario" ui-sref="comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8">
                	<div class="row opciones-sub-header margin-bottom-0">
	                    <div class="col s2">
	                    	<div class="selector-fondo"></div>
	                    	<span class="principal">Fondo</span>
	                    </div>
	                    <div class="col s2">
	                    	<div class="selector-cuadricula"><i class="material-icons">apps</i></div>
	                    	<span class="principal">Cuadricula</span>
	                    </div>
	                    <div class="col s6 offset-s2">
							<button class="boton-oborder" ng-click="editor.mostrarBorradores()"><i class="material-icons">queue</i> BORRADORES</button>

	                    	<button class="boton-oborder"><i class="material-icons">remove_red_eye</i> PREVIEW</button>

	                    	<button class="boton-oborder"><i class="material-icons">save</i> GUARDAR</button>

	                    	<button class="boton-oborder"><i class="material-icons">shopping_cart</i> COMPRAR</button>
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
                    		<div class="negrita activo" ng-click="editor.cambioPropiedad('bold')">N</div>               
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
                
                    <div class="col s2 offset-s2 sidebar-2">
                        <p class="text-center principal titulo">ICONO</p>

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

	                    <div class="col s12 text-center" ng-form="editor.iconosForm">
		                    <md-input-container style="width:100%; padding: 0 0.75rem" >
							  	<md-select ng-model="editor.categoriaIcono" placeholder="Categoria"  md-no-asterisk required> 
							    	<md-option ng-repeat="categoria in editor.categoriasPosibles track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
							  	</md-select>
							</md-input-container>

							<button type="submit" class="boton-oborder" style="margin-bottom: 20px;" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)"><i class="material-icons">search</i> BUSCAR</button>
	                    </div>
                    </div>
                </form>

				
				<div class="contenedor-principal col s8" style="display: flex;">
					<div class="contenedor-svg">
				       <bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-svg-final="editor.svgFinal"></bazam-svg>
				    </div>
				    <div class="overlay-svg"  ng-class="{'abierto': (editor.borradores || editor.busquedaIconos || editor.preview) }"></div>
				    <div class="contenedor-borradores" ng-class="{'abierto': editor.borradores}">
				    	<div class="row padding-bottom-0">
				    		<div class="col s2">
				    			<div class="agregar" ng-click="editor.realizarComparacion(editor.comparar)"><i class="material-icons">add</i> <span>AGREGAR</span></div>
				    		</div>
				    		<div class="col s10">
				    			<div class="opcion-borrador" ng-repeat="comparacion in editor.comparaciones track by comparacion.creacion">
				    				<div class="overlay-opcion"></div>
				    				<span class="usar" ng-click="editor.restaurarComparacion(comparacion.svg)">
				    					<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
            							<i class="material-icons">file_upload</i>
            						</span>
				    				<span class="remover" ng-click="editor.comparaciones.splice($index, 1)">
				    					<md-tooltip md-delay="2" md-direction="top">Remover</md-tooltip>
				    					<i class="material-icons">delete</i>
				    				</span>
				    				<bazam-visualizar data-svg="comparacion.svg">
                                    </bazam-visualizar>
                                    
				    			</div>
                                <div ng-show="!editor.comparaciones.length" layout-padding style="text-align:center;">
                                        No existe ningun borrador
                                </div>
				    		</div>
				    	</div>
				    </div>
					<div class="contenedor-iconos" ng-class="{'abierto': editor.busquedaIconos}">
				    	<div class="row padding-bottom-0">
				    		<div class="col s10">

				    			<div class="opcion-icono" ng-repeat="icono in editor.iconos" ng-click="editor.reemplazarIcono(icono)">
				    				<div class="overlay-opcion"></div>
				    				<span class="seleccionar">
				    					<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
            							<i class="material-icons">check</i>
            						</span>
				    				<bazam-visualizar data-svg="editor.base64.decode(icono.svg)">
                                    </bazam-visualizar>
				    			</div>
                                
				    		</div>
				    	</div>
					</div>
					<div class="contenedor-previews" ng-class="{'abierto': editor.preview}">
					</div>
				</div>
            </div>
        </section>