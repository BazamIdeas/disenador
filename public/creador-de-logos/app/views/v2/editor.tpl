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
	                    <div class="col s2 offset-s4">
	                    	<button class="boton-oborder"><i class="material-icons">save</i> GUARDAR</button>
	                    </div>
	                    <div class="col s2">
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
                    	<p class="text-center principal">TEXTO</p>
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
                        <p class="text-center principal">ICONO</p>

                        <div class="cubo-logo">
                            <div ng-click="principal.solicitarElementos(principal.botonesTipo[0], principal.datos, principal.datosForm.$valid )" ng-class="{'tipo-inactivo': !principal.botonesTipo[0].activo}">
                                <span><i class="material-icons">thumb_up</i></span>
                                <span>TU LOGO</span>
                            </div>
                        </div>

                        <div class="cubo-logo">
                            <div ng-click="principal.solicitarElementos(principal.botonesTipo[1], principal.datos, principal.datosForm.$valid)" ng-class="{'tipo-inactivo': !principal.botonesTipo[1].activo}">
                                <span class="texto">M</span>
                                <span>TU LOGO</span>
                            </div>
                        </div>

                        <div class="cubo-logo">
                            <div ng-click="principal.solicitarElementos(principal.botonesTipo[2], principal.datos, principal.datosForm.$valid)" ng-class="{'tipo-inactivo': !principal.botonesTipo[2].activo}">
                                <span>TU LOGO</span>
                            </div>
                        </div>
                    </div>
                </form>

				
				<div ui-view class="contenedor-principal col s8">
				       
				</div>

            </div>
        </section>