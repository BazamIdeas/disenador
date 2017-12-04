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
							<button class="boton-oborder" ng-click="editor.borradores = !editor.borradores"><i class="material-icons">queue</i> BORRADORES</button>

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
						    	<md-option ng-value="fuente" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}">{{fuente.nombre}}</md-option>
						  	</md-select>
						</md-input-container>

                        <div class=" col s12 estilo-texto">
                    		<div class="negrita activo" ng-click="editor.cambioPropiedad('bold')">N</div>               
                    		<div class="cursiva" ng-click="editor.cambioPropiedad('cursive')">C</div>               
                        </div>
						<div class=" col s12 estilo-texto">
                    		<div class="menos" ng-click="editor.cambioTamano('texto', false)">-</div>               
                    		<div class="mas" ng-click="editor.cambioTamano('texto', true)">+</div>               
                        </div>
						<div class=" col s12 estilo-texto">
                    		<div class="color"></div>               
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

						<div class=" col s12 estilo-texto">
                    		<div class="color"></div>               
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

	                    <div class="col s12 text-center">
		                    <md-input-container style="width:100%; padding: 0 0.75rem" >
							  	<md-select ng-model="principal.datos.categoria" placeholder="Categoria" required> 
							    	<md-option ng-repeat="categoria in principal.categoriasPosibles track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
							  	</md-select>
							</md-input-container>

							<button class="boton-oborder" style="margin-bottom: 20px;" ng-click="editor.busquedaiconos = !editor.busquedaiconos"><i class="material-icons">search</i> BUSCAR</button>
	                    </div>

                    </div>
                </form>

				
				<div class="contenedor-principal col s8" style="display: flex;">
					<div class="contenedor-svg">
				       <bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-svg-final="editor.svgFinal"></bazam-svg>
				    </div>
				    <div class="overlay-svg"  ng-class="{'abierto': (editor.borradores || editor.busquedaiconos || editor.preview) }"></div>
				    <div class="contenedor-borradores" ng-class="{'abierto': editor.borradores}">
				    	<div class="row padding-bottom-0">
				    		<div class="col s2">
				    			<div class="agregar" ng-click="editor.realizarComparacion(editor.comparar)"><i class="material-icons">add</i> <span>AGREGAR</span></div>
				    		</div>
				    		<div class="col s10">
				    			<div class="opcion-borrador" ng-repeat="comparacion in editor.comparaciones track by $index">
				    				<div class="overlay-opcion"></div>
				    				<span class="usar" ng-click="editor.restaurarComparacion(comparacion)">
				    					<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
            							<i class="material-icons">file_upload</i>
            						</span>
				    				<span class="remover" ng-click="editor.comparaciones.splice($index, 1)">
				    					<md-tooltip md-delay="2" md-direction="top">Remover</md-tooltip>
				    					<i class="material-icons">delete</i>
				    				</span>
				    				<bazam-visualizar class="md-whiteframe-2dp" data-svg="comparacion"  ng-click="editor.restaurarComparacion(comparacion)">
                                    </bazam-visualizar>
                                    
				    			</div>
                                <div ng-show="!editor.comparaciones.length" layout-padding style="text-align:center;">
                                        No existe ningun borrador
                                </div>
				    		</div>
				    	</div>
				    </div>
					<div class="contenedor-iconos" ng-class="{'abierto': editor.busquedaiconos}">
				    	<div class="row padding-bottom-0">
				    		<div class="col s10">

				    			<div class="opcion-icono" ng-repeat="x in [1,2,3,4]">
				    				<div class="overlay-opcion"></div>
				    				<span class="seleccionar">
				    					<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
            							<i class="material-icons">check</i>
            						</span>
				    				<bazam-visualizar data-svg="principalOpciones.base64.decode(iconos[$index].svg)" class="ng-isolate-scope"> <svg version="1.1" id="Layer_1" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path style="fill:#965500;" d="M94.041,206.163L72.761,174.88c-42.806,2.777-75.373,39.862-72.596,82.668 	c1.345,20.736,10.685,39.707,26.298,53.419c14.319,12.574,32.341,19.345,51.224,19.345c1.707,0,3.425-0.055,5.145-0.167 	l11.209-32.35V206.163z"></path> <path style="fill:#D37B93;" d="M80.804,298.865c-12.381,0.806-24.334-3.263-33.655-11.45c-9.323-8.187-14.899-19.513-15.702-31.894 	c-1.658-25.557,17.786-47.7,43.344-49.357L80.804,298.865z"></path> <path style="fill:#703F00;" d="M417.959,206.163l21.279-31.281c42.806,2.776,75.373,39.861,72.596,82.667 	c-1.346,20.736-10.685,39.708-26.299,53.419c-14.319,12.573-32.341,19.344-51.224,19.344c-1.707,0-3.425-0.055-5.144-0.166 	l-11.209-32.35V206.163"></path> <path style="fill:#9D5B6E;" d="M431.196,298.865c12.381,0.806,24.334-3.263,33.655-11.45c9.323-8.187,14.899-19.513,15.702-31.894 	c1.658-25.557-17.786-47.7-43.344-49.358L431.196,298.865"></path> <path style="fill:#965500;" d="M173.716,429.55C99.71,396.915,51.891,323.576,51.891,242.71 	c0-112.547,91.562-204.109,204.109-204.109c112.546,0,204.108,91.562,204.108,204.109c0,80.863-47.817,154.201-121.819,186.838 	L173.716,429.55"></path> <path style="fill:#EFC589;" d="M256,473.399c-57.766,0-104.762-46.996-104.762-104.763c0-10.026,1.378-19.793,4.113-29.204 	c-36.004-13.075-61.309-47.785-61.309-87.38c0-51.233,41.682-92.915,92.915-92.915c26.865,0,51.701,11.346,69.044,30.666 	c17.345-19.32,42.179-30.666,69.044-30.666c51.233,0,92.914,41.682,92.914,92.915c0,39.594-25.303,74.305-61.309,87.38 	c2.734,9.41,4.114,19.178,4.114,29.204C360.763,426.403,313.766,473.399,256,473.399"></path> <g> 	<path style="fill:#333333;" d="M206.869,378.547c0-9.058,7.261-16.393,16.183-16.393c8.934,0,16.194,7.335,16.194,16.393 		c0,9.056-7.26,16.399-16.194,16.399C214.13,394.945,206.869,387.603,206.869,378.547z"></path> 	<path style="fill:#333333;" d="M172.98,253.796c0-11.513,9.229-20.836,20.57-20.836c11.355,0,20.582,9.324,20.582,20.836 		c0,11.511-9.227,20.843-20.582,20.843C182.208,274.639,172.98,265.307,172.98,253.796z"></path> 	<path style="fill:#333333;" d="M339.02,253.796c0-11.597-9.288-20.998-20.724-20.998c-11.451,0-20.738,9.401-20.738,20.998 		c0,11.597,9.288,20.998,20.738,20.998C329.732,274.794,339.02,265.394,339.02,253.796"></path> </g> <path style="fill:#BDBDBF;" d="M484.491,311.871c-0.011,0.009-0.023,0.02-0.034,0.029 	C484.468,311.891,484.478,311.881,484.491,311.871 M484.655,311.732c-0.02,0.018-0.039,0.032-0.059,0.05 	C484.616,311.764,484.635,311.748,484.655,311.732 M484.816,311.594c-0.023,0.02-0.045,0.038-0.068,0.057 	C484.772,311.631,484.793,311.613,484.816,311.594 M484.984,311.45c-0.026,0.023-0.053,0.046-0.08,0.069 	C484.93,311.496,484.957,311.473,484.984,311.45 M485.148,311.307c-0.029,0.025-0.059,0.051-0.088,0.076 	C485.089,311.359,485.119,311.333,485.148,311.307 M485.321,311.157c-0.034,0.03-0.068,0.06-0.102,0.089 	C485.254,311.216,485.287,311.187,485.321,311.157 M485.536,310.969c-0.053,0.047-0.106,0.093-0.159,0.139 	C485.43,311.062,485.484,311.015,485.536,310.969 M511.85,257.312c0,0.005-0.001,0.012-0.001,0.017 	C511.85,257.322,511.85,257.32,511.85,257.312 M511.864,257.077c0,0.008-0.001,0.015-0.001,0.023 	C511.863,257.093,511.863,257.085,511.864,257.077 M511.878,256.845c0,0.007-0.001,0.013-0.001,0.02 	C511.877,256.861,511.877,256.851,511.878,256.845 M511.89,256.615c0,0.005-0.001,0.01-0.001,0.016 	C511.889,256.627,511.889,256.621,511.89,256.615"></path> <path style="fill:#703F00;" d="M256.522,38.606v150.62c17.319-18.969,41.927-30.089,68.522-30.089 	c51.233,0,92.914,41.682,92.914,92.915c0,39.594-25.303,74.305-61.309,87.38c2.734,9.41,4.114,19.178,4.114,29.204 	c0,21.85-6.724,42.159-18.21,58.966c43.75-20.502,77.936-55.397,97.905-97.545c0.003,0,0.005,0,0.008-0.001 	c5.335-11.26,9.654-23.035,12.869-35.193c4.438-16.778,6.773-34.281,6.773-52.153c0-10.242-0.758-20.304-2.22-30.146 	c-1.865-12.541-4.875-24.718-8.92-36.413c-0.004-0.001-0.007-0.001-0.013-0.002C421.348,96.342,345.546,38.831,256.522,38.606"></path> <path style="fill:#B19267;" d="M288.826,395.068c-9.009,0-16.316-7.397-16.316-16.521c0-9.125,7.308-16.522,16.316-16.522 	c8.998,0,16.306,7.397,16.306,16.522C305.131,387.671,297.823,395.068,288.826,395.068 M318.296,274.794 	c-11.451,0-20.738-9.401-20.738-20.998s9.288-20.998,20.738-20.998c11.436,0,20.724,9.401,20.724,20.998 	S329.732,274.794,318.296,274.794 M325.044,159.137c-26.596,0-51.203,11.12-68.522,30.089v284.165 	c35.698-0.176,67.231-18.294,86.022-45.785c0.003-0.001,0.006-0.003,0.008-0.004c11.487-16.807,18.211-37.116,18.211-58.966 	c0-10.026-1.378-19.793-4.114-29.204c36.006-13.075,61.31-47.784,61.31-87.379C417.959,200.819,376.277,159.137,325.044,159.137"></path> <path style="fill:#333333;" d="M288.826,362.026c-9.009,0-16.316,7.397-16.316,16.522c0,9.124,7.308,16.521,16.316,16.521 	c8.998,0,16.306-7.397,16.306-16.521C305.131,369.422,297.823,362.026,288.826,362.026"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg></bazam-visualizar>
				    			</div>

				    		</div>
				    	</div>
					</div>
					<div class="contenedor-previews" ng-class="{'abierto': editor.preview}">
					</div>
				</div>
            </div>
        </section>