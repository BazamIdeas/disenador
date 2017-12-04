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
                    <div class="col s2 sidebar-1 scroll" ng-form="principal.datosForm">
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
	                        <div class="cubo-logo-orientacion vertical">
	                            <div>
	                                <span><i class="material-icons">thumb_up</i></span>
	                                <span>TU LOGO</span>
	                            </div>
	                        </div>

	                        <div class="cubo-logo-orientacion horizontal">
	                            <div ng-click="principal.solicitarElementos(principal.botonesTipo[1], principal.datos, principal.datosForm.$valid)" ng-class="{'tipo-inactivo': !principal.botonesTipo[1].activo}">
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
				    <div class="overlay-svg"  ng-class="{'abierto': (editor.borradores || editor.busquedaIconos) }"></div>
				    <div class="contenedor-borradores" ng-class="{'abierto': editor.borradores, 'cerrado' : !editor.borradores}">
				    	<div class="row padding-bottom-0">
				    		<div class="col s2">
				    			<div class="agregar"><i class="material-icons">add</i> <span>AGREGAR</span></div>
				    		</div>
				    		<div class="col s10">
				    			<div class="opcion-borrador" ng-repeat="x in [1,2,3,4]">
				    				<div class="overlay-opcion"></div>
				    				<span class="usar">
				    					<md-tooltip md-delay="2" md-direction="top">Usar</md-tooltip>
            							<i class="material-icons">file_upload</i>
            						</span>
				    				<span class="remover">
				    					<md-tooltip md-delay="2" md-direction="top">Remover</md-tooltip>
				    					<i class="material-icons">delete</i>
				    				</span>
				    				<algo-l-svg-text data-icono=" <svg version=&quot;1.1&quot; id=&quot;Layer_1&quot; width=&quot;100%&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; x=&quot;0px&quot; y=&quot;0px&quot; 	 viewBox=&quot;0 0 512 512&quot; style=&quot;enable-background:new 0 0 512 512;&quot; xml:space=&quot;preserve&quot;> <g> 	<path style=&quot;fill:#FF8C46;&quot; d=&quot;M163.189,67.148C129.616,67.148,121.222,0,79.255,0C52.713,0,28.894,16.787,28.894,50.361 		s58.754,50.361,41.967,109.115L163.189,67.148z&quot;/> 	<path style=&quot;fill:#FF8C46;&quot; d=&quot;M347.845,67.148C381.419,67.148,389.812,0,431.78,0c26.542,0,50.361,16.787,50.361,50.361 		s-58.754,50.361-41.967,109.115L347.845,67.148z&quot;/> </g> <g> 	<path style=&quot;fill:#FFEBD2;&quot; d=&quot;M331.541,461.639C331.541,489.453,311.626,512,256,512s-75.541-22.547-75.541-50.361v-8.393h150.599 		L331.541,461.639z&quot;/> 	<path style=&quot;fill:#FFEBD2;&quot; d=&quot;M459.368,182.91c34.446,56.303,40.042,102.467,40.042,102.467h-16.787 		c0,0,16.787,41.443,16.787,67.148l-25.18-8.393c0,0,16.787,37.77,16.787,67.148c0,0.525-25.18-8.393-25.18-8.393 		s12.59,28.328,8.393,41.967c-0.154,0.501-25.18-8.393-25.18-8.393s7.344,19.585,0,33.574l-41.967-16.787 		c0,0-7.846,25.681-8.393,25.18c-18.361-16.787-41.967-25.18-41.967-25.18H155.279c0,0-23.607,8.393-41.967,25.18 		c-0.548,0.5-8.393-25.18-8.393-25.18l-41.967,16.787c-7.344-13.989,0-33.574,0-33.574s-25.026,8.895-25.18,8.393 		c-4.197-13.639,8.393-41.967,8.393-41.967s-25.18,8.918-25.18,8.393c0-29.377,16.787-67.148,16.787-67.148l-25.18,8.393 		c0-25.705,16.787-67.148,16.787-67.148H12.59c0,0,5.595-46.164,40.042-102.467H459.368z&quot;/> </g> <ellipse style=&quot;fill:#FFA54B;&quot; cx=&quot;255.517&quot; cy=&quot;230.82&quot; rx=&quot;209.836&quot; ry=&quot;197.246&quot;/> <g> 	 		<ellipse transform=&quot;matrix(-0.6042 -0.7968 0.7968 -0.6042 63.9475 499.8926)&quot; style=&quot;fill:#FFEBD2;&quot; cx=&quot;156.123&quot; cy=&quot;234.065&quot; rx=&quot;37.769&quot; ry=&quot;46.163&quot;/> 	 		<ellipse transform=&quot;matrix(-0.6042 0.7968 -0.7968 -0.6042 755.9204 92.7031)&quot; style=&quot;fill:#FFEBD2;&quot; cx=&quot;354.937&quot; cy=&quot;234.086&quot; rx=&quot;37.769&quot; ry=&quot;46.163&quot;/> </g> <path style=&quot;fill:#FF8C46;&quot; d=&quot;M255.524,260.197h-0.013c-28.711,0-55.045,18.268-68.536,47.511 	c-18.163,39.374-40.573,91.996-40.573,111.964h218.229c0-19.967-22.409-72.59-40.573-111.964 	C310.569,278.464,284.234,260.197,255.524,260.197z&quot;/> <path style=&quot;fill:#FFDEB7;&quot; d=&quot;M304.795,369.311c-19.393,0-36.855,6-49.278,15.588c-12.422-9.588-29.885-15.588-49.278-15.588 	c-37.682,0-68.23,22.547-68.23,50.361s30.548,50.361,68.23,50.361c15.728,0,30.187-3.947,41.716-10.554 	c4.764-2.73,10.357-2.73,15.122,0c11.529,6.607,25.988,10.554,41.716,10.554c37.682,0,68.23-22.547,68.23-50.361 	S342.478,369.311,304.795,369.311z&quot;/> <g> 	<path style=&quot;fill:#464655;&quot; d=&quot;M215.344,374.991l33.48,44.232c3.358,4.437,10.026,4.437,13.384,0l33.48-44.232 		c4.184-5.528,0.241-13.459-6.693-13.459h-4.5c-2.52,0-5.026,0.378-7.432,1.122l-14.116,4.361c-4.842,1.496-10.023,1.496-14.865,0 		l-14.116-4.361c-2.408-0.744-4.913-1.122-7.432-1.122h-4.499C215.103,361.532,211.16,369.463,215.344,374.991z&quot;/> 	<circle style=&quot;fill:#464655;&quot; cx=&quot;154.796&quot; cy=&quot;235.016&quot; r=&quot;16.787&quot;/> 	<circle style=&quot;fill:#464655;&quot; cx=&quot;356.239&quot; cy=&quot;235.016&quot; r=&quot;16.787&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M77.358,335.001l46.206-37.805c4.012-3.283,1.123-9.761-4.001-8.969l-61.478,9.5 		C63.123,310.86,69.618,323.331,77.358,335.001z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M121.493,382.577l25.052-66.807c1.922-5.125-4.494-9.256-8.364-5.385l-45.183,45.183 		C101.555,365.406,111.098,374.455,121.493,382.577z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M226.405,109.149l-6.633-72.667c-8.106,1.308-16.052,3.044-23.811,5.201l21.532,69.239 		C219.12,116.157,226.903,114.609,226.405,109.149z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M291.263,36.482l-6.633,72.667c-0.498,5.46,7.284,7.007,8.913,1.772l21.532-69.239 		C307.315,39.527,299.369,37.79,291.263,36.482z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M337.387,49.156l-20.509,47.449c-2.137,4.946,4.549,8.868,7.823,4.588l32.73-42.791 		C350.946,55.01,344.271,51.9,337.387,49.156z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M194.157,96.605l-20.509-47.449c-6.884,2.745-13.559,5.853-20.044,9.247l32.73,42.79 		C189.608,105.473,196.295,101.551,194.157,96.605z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M272.224,34.253c-5.518-0.408-11.077-0.679-16.707-0.679c-5.63,0-11.189,0.271-16.707,0.679 		l12.169,103.44c0.633,5.38,8.442,5.38,9.075,0L272.224,34.253z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M434.868,335.001l-46.206-37.805c-4.012-3.283-1.123-9.761,4.001-8.969l61.478,9.5 		C449.104,310.86,442.608,323.331,434.868,335.001z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M390.733,382.577l-25.052-66.807c-1.922-5.125,4.494-9.256,8.364-5.385l45.183,45.183 		C410.671,365.406,401.129,374.455,390.733,382.577z&quot;/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>" data-fuente="OTRA FUENTE" data-texto="Mi logo"><svg viewBox="0 0 200 200"> <svg version="1.1" id="Layer_1" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="25px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" height="100px"> <g> 	<path style="fill:#FF8C46;" d="M163.189,67.148C129.616,67.148,121.222,0,79.255,0C52.713,0,28.894,16.787,28.894,50.361 		s58.754,50.361,41.967,109.115L163.189,67.148z"></path> 	<path style="fill:#FF8C46;" d="M347.845,67.148C381.419,67.148,389.812,0,431.78,0c26.542,0,50.361,16.787,50.361,50.361 		s-58.754,50.361-41.967,109.115L347.845,67.148z"></path> </g> <g> 	<path style="fill:#FFEBD2;" d="M331.541,461.639C331.541,489.453,311.626,512,256,512s-75.541-22.547-75.541-50.361v-8.393h150.599 		L331.541,461.639z"></path> 	<path style="fill:#FFEBD2;" d="M459.368,182.91c34.446,56.303,40.042,102.467,40.042,102.467h-16.787 		c0,0,16.787,41.443,16.787,67.148l-25.18-8.393c0,0,16.787,37.77,16.787,67.148c0,0.525-25.18-8.393-25.18-8.393 		s12.59,28.328,8.393,41.967c-0.154,0.501-25.18-8.393-25.18-8.393s7.344,19.585,0,33.574l-41.967-16.787 		c0,0-7.846,25.681-8.393,25.18c-18.361-16.787-41.967-25.18-41.967-25.18H155.279c0,0-23.607,8.393-41.967,25.18 		c-0.548,0.5-8.393-25.18-8.393-25.18l-41.967,16.787c-7.344-13.989,0-33.574,0-33.574s-25.026,8.895-25.18,8.393 		c-4.197-13.639,8.393-41.967,8.393-41.967s-25.18,8.918-25.18,8.393c0-29.377,16.787-67.148,16.787-67.148l-25.18,8.393 		c0-25.705,16.787-67.148,16.787-67.148H12.59c0,0,5.595-46.164,40.042-102.467H459.368z"></path> </g> <ellipse style="fill:#FFA54B;" cx="255.517" cy="230.82" rx="209.836" ry="197.246"></ellipse> <g> 	 		<ellipse transform="matrix(-0.6042 -0.7968 0.7968 -0.6042 63.9475 499.8926)" style="fill:#FFEBD2;" cx="156.123" cy="234.065" rx="37.769" ry="46.163"></ellipse> 	 		<ellipse transform="matrix(-0.6042 0.7968 -0.7968 -0.6042 755.9204 92.7031)" style="fill:#FFEBD2;" cx="354.937" cy="234.086" rx="37.769" ry="46.163"></ellipse> </g> <path style="fill:#FF8C46;" d="M255.524,260.197h-0.013c-28.711,0-55.045,18.268-68.536,47.511 	c-18.163,39.374-40.573,91.996-40.573,111.964h218.229c0-19.967-22.409-72.59-40.573-111.964 	C310.569,278.464,284.234,260.197,255.524,260.197z"></path> <path style="fill:#FFDEB7;" d="M304.795,369.311c-19.393,0-36.855,6-49.278,15.588c-12.422-9.588-29.885-15.588-49.278-15.588 	c-37.682,0-68.23,22.547-68.23,50.361s30.548,50.361,68.23,50.361c15.728,0,30.187-3.947,41.716-10.554 	c4.764-2.73,10.357-2.73,15.122,0c11.529,6.607,25.988,10.554,41.716,10.554c37.682,0,68.23-22.547,68.23-50.361 	S342.478,369.311,304.795,369.311z"></path> <g> 	<path style="fill:#464655;" d="M215.344,374.991l33.48,44.232c3.358,4.437,10.026,4.437,13.384,0l33.48-44.232 		c4.184-5.528,0.241-13.459-6.693-13.459h-4.5c-2.52,0-5.026,0.378-7.432,1.122l-14.116,4.361c-4.842,1.496-10.023,1.496-14.865,0 		l-14.116-4.361c-2.408-0.744-4.913-1.122-7.432-1.122h-4.499C215.103,361.532,211.16,369.463,215.344,374.991z"></path> 	<circle style="fill:#464655;" cx="154.796" cy="235.016" r="16.787"></circle> 	<circle style="fill:#464655;" cx="356.239" cy="235.016" r="16.787"></circle> 	<path style="fill:#464655;" d="M77.358,335.001l46.206-37.805c4.012-3.283,1.123-9.761-4.001-8.969l-61.478,9.5 		C63.123,310.86,69.618,323.331,77.358,335.001z"></path> 	<path style="fill:#464655;" d="M121.493,382.577l25.052-66.807c1.922-5.125-4.494-9.256-8.364-5.385l-45.183,45.183 		C101.555,365.406,111.098,374.455,121.493,382.577z"></path> 	<path style="fill:#464655;" d="M226.405,109.149l-6.633-72.667c-8.106,1.308-16.052,3.044-23.811,5.201l21.532,69.239 		C219.12,116.157,226.903,114.609,226.405,109.149z"></path> 	<path style="fill:#464655;" d="M291.263,36.482l-6.633,72.667c-0.498,5.46,7.284,7.007,8.913,1.772l21.532-69.239 		C307.315,39.527,299.369,37.79,291.263,36.482z"></path> 	<path style="fill:#464655;" d="M337.387,49.156l-20.509,47.449c-2.137,4.946,4.549,8.868,7.823,4.588l32.73-42.791 		C350.946,55.01,344.271,51.9,337.387,49.156z"></path> 	<path style="fill:#464655;" d="M194.157,96.605l-20.509-47.449c-6.884,2.745-13.559,5.853-20.044,9.247l32.73,42.79 		C189.608,105.473,196.295,101.551,194.157,96.605z"></path> 	<path style="fill:#464655;" d="M272.224,34.253c-5.518-0.408-11.077-0.679-16.707-0.679c-5.63,0-11.189,0.271-16.707,0.679 		l12.169,103.44c0.633,5.38,8.442,5.38,9.075,0L272.224,34.253z"></path> 	<path style="fill:#464655;" d="M434.868,335.001l-46.206-37.805c-4.012-3.283-1.123-9.761,4.001-8.969l61.478,9.5 		C449.104,310.86,442.608,323.331,434.868,335.001z"></path> 	<path style="fill:#464655;" d="M390.733,382.577l-25.052-66.807c-1.922-5.125,4.494-9.256,8.364-5.385l45.183,45.183 		C410.671,365.406,401.129,374.455,390.733,382.577z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg><text x="100" text-anchor="middle" font-family="futura-heavy" style="font-size: 50px;" y="158.33333333333334px">Mi logo</text></svg></algo-l-svg-text>
				    			</div>

				    		</div>
				    	</div>
				    </div>
					<div class="contenedor-iconos" ng-class="{'abierto': editor.busquedaiconos, 'cerrado' : !editor.busquedaiconos}">
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
				</div>
            </div>
        </section>