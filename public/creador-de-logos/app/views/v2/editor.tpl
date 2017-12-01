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
                            <input id="nombre" type="text" value="Mi logo" required>
                            <label for="nombre" class="active">Nombre</label>
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
                    		<div class="menos">-</div>               
                    		<div class="mas">+</div>               
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
				       <algo-lo-svg-text data-icono=" <svg version=&quot;1.1&quot; id=&quot;Layer_1&quot; width=&quot;100%&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; x=&quot;0px&quot; y=&quot;0px&quot; 	 viewBox=&quot;0 0 512 512&quot; style=&quot;enable-background:new 0 0 512 512;&quot; xml:space=&quot;preserve&quot;> <g> 	<path style=&quot;fill:#FF8C46;&quot; d=&quot;M163.189,67.148C129.616,67.148,121.222,0,79.255,0C52.713,0,28.894,16.787,28.894,50.361 		s58.754,50.361,41.967,109.115L163.189,67.148z&quot;/> 	<path style=&quot;fill:#FF8C46;&quot; d=&quot;M347.845,67.148C381.419,67.148,389.812,0,431.78,0c26.542,0,50.361,16.787,50.361,50.361 		s-58.754,50.361-41.967,109.115L347.845,67.148z&quot;/> </g> <g> 	<path style=&quot;fill:#FFEBD2;&quot; d=&quot;M331.541,461.639C331.541,489.453,311.626,512,256,512s-75.541-22.547-75.541-50.361v-8.393h150.599 		L331.541,461.639z&quot;/> 	<path style=&quot;fill:#FFEBD2;&quot; d=&quot;M459.368,182.91c34.446,56.303,40.042,102.467,40.042,102.467h-16.787 		c0,0,16.787,41.443,16.787,67.148l-25.18-8.393c0,0,16.787,37.77,16.787,67.148c0,0.525-25.18-8.393-25.18-8.393 		s12.59,28.328,8.393,41.967c-0.154,0.501-25.18-8.393-25.18-8.393s7.344,19.585,0,33.574l-41.967-16.787 		c0,0-7.846,25.681-8.393,25.18c-18.361-16.787-41.967-25.18-41.967-25.18H155.279c0,0-23.607,8.393-41.967,25.18 		c-0.548,0.5-8.393-25.18-8.393-25.18l-41.967,16.787c-7.344-13.989,0-33.574,0-33.574s-25.026,8.895-25.18,8.393 		c-4.197-13.639,8.393-41.967,8.393-41.967s-25.18,8.918-25.18,8.393c0-29.377,16.787-67.148,16.787-67.148l-25.18,8.393 		c0-25.705,16.787-67.148,16.787-67.148H12.59c0,0,5.595-46.164,40.042-102.467H459.368z&quot;/> </g> <ellipse style=&quot;fill:#FFA54B;&quot; cx=&quot;255.517&quot; cy=&quot;230.82&quot; rx=&quot;209.836&quot; ry=&quot;197.246&quot;/> <g> 	 		<ellipse transform=&quot;matrix(-0.6042 -0.7968 0.7968 -0.6042 63.9475 499.8926)&quot; style=&quot;fill:#FFEBD2;&quot; cx=&quot;156.123&quot; cy=&quot;234.065&quot; rx=&quot;37.769&quot; ry=&quot;46.163&quot;/> 	 		<ellipse transform=&quot;matrix(-0.6042 0.7968 -0.7968 -0.6042 755.9204 92.7031)&quot; style=&quot;fill:#FFEBD2;&quot; cx=&quot;354.937&quot; cy=&quot;234.086&quot; rx=&quot;37.769&quot; ry=&quot;46.163&quot;/> </g> <path style=&quot;fill:#FF8C46;&quot; d=&quot;M255.524,260.197h-0.013c-28.711,0-55.045,18.268-68.536,47.511 	c-18.163,39.374-40.573,91.996-40.573,111.964h218.229c0-19.967-22.409-72.59-40.573-111.964 	C310.569,278.464,284.234,260.197,255.524,260.197z&quot;/> <path style=&quot;fill:#FFDEB7;&quot; d=&quot;M304.795,369.311c-19.393,0-36.855,6-49.278,15.588c-12.422-9.588-29.885-15.588-49.278-15.588 	c-37.682,0-68.23,22.547-68.23,50.361s30.548,50.361,68.23,50.361c15.728,0,30.187-3.947,41.716-10.554 	c4.764-2.73,10.357-2.73,15.122,0c11.529,6.607,25.988,10.554,41.716,10.554c37.682,0,68.23-22.547,68.23-50.361 	S342.478,369.311,304.795,369.311z&quot;/> <g> 	<path style=&quot;fill:#464655;&quot; d=&quot;M215.344,374.991l33.48,44.232c3.358,4.437,10.026,4.437,13.384,0l33.48-44.232 		c4.184-5.528,0.241-13.459-6.693-13.459h-4.5c-2.52,0-5.026,0.378-7.432,1.122l-14.116,4.361c-4.842,1.496-10.023,1.496-14.865,0 		l-14.116-4.361c-2.408-0.744-4.913-1.122-7.432-1.122h-4.499C215.103,361.532,211.16,369.463,215.344,374.991z&quot;/> 	<circle style=&quot;fill:#464655;&quot; cx=&quot;154.796&quot; cy=&quot;235.016&quot; r=&quot;16.787&quot;/> 	<circle style=&quot;fill:#464655;&quot; cx=&quot;356.239&quot; cy=&quot;235.016&quot; r=&quot;16.787&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M77.358,335.001l46.206-37.805c4.012-3.283,1.123-9.761-4.001-8.969l-61.478,9.5 		C63.123,310.86,69.618,323.331,77.358,335.001z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M121.493,382.577l25.052-66.807c1.922-5.125-4.494-9.256-8.364-5.385l-45.183,45.183 		C101.555,365.406,111.098,374.455,121.493,382.577z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M226.405,109.149l-6.633-72.667c-8.106,1.308-16.052,3.044-23.811,5.201l21.532,69.239 		C219.12,116.157,226.903,114.609,226.405,109.149z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M291.263,36.482l-6.633,72.667c-0.498,5.46,7.284,7.007,8.913,1.772l21.532-69.239 		C307.315,39.527,299.369,37.79,291.263,36.482z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M337.387,49.156l-20.509,47.449c-2.137,4.946,4.549,8.868,7.823,4.588l32.73-42.791 		C350.946,55.01,344.271,51.9,337.387,49.156z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M194.157,96.605l-20.509-47.449c-6.884,2.745-13.559,5.853-20.044,9.247l32.73,42.79 		C189.608,105.473,196.295,101.551,194.157,96.605z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M272.224,34.253c-5.518-0.408-11.077-0.679-16.707-0.679c-5.63,0-11.189,0.271-16.707,0.679 		l12.169,103.44c0.633,5.38,8.442,5.38,9.075,0L272.224,34.253z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M434.868,335.001l-46.206-37.805c-4.012-3.283-1.123-9.761,4.001-8.969l61.478,9.5 		C449.104,310.86,442.608,323.331,434.868,335.001z&quot;/> 	<path style=&quot;fill:#464655;&quot; d=&quot;M390.733,382.577l-25.052-66.807c-1.922-5.125,4.494-9.256,8.364-5.385l45.183,45.183 		C410.671,365.406,401.129,374.455,390.733,382.577z&quot;/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>" data-fuente="OTRA FUENTE" data-texto="Mi logo"><svg viewBox="0 0 200 200"> <svg version="1.1" id="Layer_1" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="25px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" height="100px"> <g> 	<path style="fill:#FF8C46;" d="M163.189,67.148C129.616,67.148,121.222,0,79.255,0C52.713,0,28.894,16.787,28.894,50.361 		s58.754,50.361,41.967,109.115L163.189,67.148z"></path> 	<path style="fill:#FF8C46;" d="M347.845,67.148C381.419,67.148,389.812,0,431.78,0c26.542,0,50.361,16.787,50.361,50.361 		s-58.754,50.361-41.967,109.115L347.845,67.148z"></path> </g> <g> 	<path style="fill:#FFEBD2;" d="M331.541,461.639C331.541,489.453,311.626,512,256,512s-75.541-22.547-75.541-50.361v-8.393h150.599 		L331.541,461.639z"></path> 	<path style="fill:#FFEBD2;" d="M459.368,182.91c34.446,56.303,40.042,102.467,40.042,102.467h-16.787 		c0,0,16.787,41.443,16.787,67.148l-25.18-8.393c0,0,16.787,37.77,16.787,67.148c0,0.525-25.18-8.393-25.18-8.393 		s12.59,28.328,8.393,41.967c-0.154,0.501-25.18-8.393-25.18-8.393s7.344,19.585,0,33.574l-41.967-16.787 		c0,0-7.846,25.681-8.393,25.18c-18.361-16.787-41.967-25.18-41.967-25.18H155.279c0,0-23.607,8.393-41.967,25.18 		c-0.548,0.5-8.393-25.18-8.393-25.18l-41.967,16.787c-7.344-13.989,0-33.574,0-33.574s-25.026,8.895-25.18,8.393 		c-4.197-13.639,8.393-41.967,8.393-41.967s-25.18,8.918-25.18,8.393c0-29.377,16.787-67.148,16.787-67.148l-25.18,8.393 		c0-25.705,16.787-67.148,16.787-67.148H12.59c0,0,5.595-46.164,40.042-102.467H459.368z"></path> </g> <ellipse style="fill:#FFA54B;" cx="255.517" cy="230.82" rx="209.836" ry="197.246"></ellipse> <g> 	 		<ellipse transform="matrix(-0.6042 -0.7968 0.7968 -0.6042 63.9475 499.8926)" style="fill:#FFEBD2;" cx="156.123" cy="234.065" rx="37.769" ry="46.163"></ellipse> 	 		<ellipse transform="matrix(-0.6042 0.7968 -0.7968 -0.6042 755.9204 92.7031)" style="fill:#FFEBD2;" cx="354.937" cy="234.086" rx="37.769" ry="46.163"></ellipse> </g> <path style="fill:#FF8C46;" d="M255.524,260.197h-0.013c-28.711,0-55.045,18.268-68.536,47.511 	c-18.163,39.374-40.573,91.996-40.573,111.964h218.229c0-19.967-22.409-72.59-40.573-111.964 	C310.569,278.464,284.234,260.197,255.524,260.197z"></path> <path style="fill:#FFDEB7;" d="M304.795,369.311c-19.393,0-36.855,6-49.278,15.588c-12.422-9.588-29.885-15.588-49.278-15.588 	c-37.682,0-68.23,22.547-68.23,50.361s30.548,50.361,68.23,50.361c15.728,0,30.187-3.947,41.716-10.554 	c4.764-2.73,10.357-2.73,15.122,0c11.529,6.607,25.988,10.554,41.716,10.554c37.682,0,68.23-22.547,68.23-50.361 	S342.478,369.311,304.795,369.311z"></path> <g> 	<path style="fill:#464655;" d="M215.344,374.991l33.48,44.232c3.358,4.437,10.026,4.437,13.384,0l33.48-44.232 		c4.184-5.528,0.241-13.459-6.693-13.459h-4.5c-2.52,0-5.026,0.378-7.432,1.122l-14.116,4.361c-4.842,1.496-10.023,1.496-14.865,0 		l-14.116-4.361c-2.408-0.744-4.913-1.122-7.432-1.122h-4.499C215.103,361.532,211.16,369.463,215.344,374.991z"></path> 	<circle style="fill:#464655;" cx="154.796" cy="235.016" r="16.787"></circle> 	<circle style="fill:#464655;" cx="356.239" cy="235.016" r="16.787"></circle> 	<path style="fill:#464655;" d="M77.358,335.001l46.206-37.805c4.012-3.283,1.123-9.761-4.001-8.969l-61.478,9.5 		C63.123,310.86,69.618,323.331,77.358,335.001z"></path> 	<path style="fill:#464655;" d="M121.493,382.577l25.052-66.807c1.922-5.125-4.494-9.256-8.364-5.385l-45.183,45.183 		C101.555,365.406,111.098,374.455,121.493,382.577z"></path> 	<path style="fill:#464655;" d="M226.405,109.149l-6.633-72.667c-8.106,1.308-16.052,3.044-23.811,5.201l21.532,69.239 		C219.12,116.157,226.903,114.609,226.405,109.149z"></path> 	<path style="fill:#464655;" d="M291.263,36.482l-6.633,72.667c-0.498,5.46,7.284,7.007,8.913,1.772l21.532-69.239 		C307.315,39.527,299.369,37.79,291.263,36.482z"></path> 	<path style="fill:#464655;" d="M337.387,49.156l-20.509,47.449c-2.137,4.946,4.549,8.868,7.823,4.588l32.73-42.791 		C350.946,55.01,344.271,51.9,337.387,49.156z"></path> 	<path style="fill:#464655;" d="M194.157,96.605l-20.509-47.449c-6.884,2.745-13.559,5.853-20.044,9.247l32.73,42.79 		C189.608,105.473,196.295,101.551,194.157,96.605z"></path> 	<path style="fill:#464655;" d="M272.224,34.253c-5.518-0.408-11.077-0.679-16.707-0.679c-5.63,0-11.189,0.271-16.707,0.679 		l12.169,103.44c0.633,5.38,8.442,5.38,9.075,0L272.224,34.253z"></path> 	<path style="fill:#464655;" d="M434.868,335.001l-46.206-37.805c-4.012-3.283-1.123-9.761,4.001-8.969l61.478,9.5 		C449.104,310.86,442.608,323.331,434.868,335.001z"></path> 	<path style="fill:#464655;" d="M390.733,382.577l-25.052-66.807c-1.922-5.125,4.494-9.256,8.364-5.385l45.183,45.183 		C410.671,365.406,401.129,374.455,390.733,382.577z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg><text x="100" text-anchor="middle" font-family="futura-heavy" style="font-size: 50px;" y="158.33333333333334px">Mi logo</text></svg></algo-lo-svg-text>
				    </div>
				    <div class="overlay-svg"  ng-class="{'abierto': (editor.borradores || editor.busquedaiconos) }"></div>
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

				    			<div class="opcion-borrador" ng-repeat="x in [1,2,3,4]">
				    				<span class="usar"><i class="material-icons">check</i></span>
				    				
				    			</div>

				    		</div>
				    	</div>
					</div>
				</div>
            </div>
        </section>