        <style ng-repeat="fuente in principal.fuentes">
            @font-face {
                font-family: '{{fuente.nombre}}';
                src: url('{{fuente.url}}');
            }
        </style>

        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col l2 logo">
                    <h5 class="secundario" ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col l10 texto">
                    <h5 class="principal"> CREE SU LOGO PROFESIONAL EN MINUTOS</h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">
                <form class="margin-bottom-0">
                    <div class="col l2 sidebar-1 scroll" ng-form="principal.datosForm">
                        <div class="input-field col s12">
                            <input id="nombre" type="text"  ng-model="principal.datos.nombre" required>
                            <label for="nombre" class="active">Nombre</label>
                        </div>
                        <!--
                        <div class="input-field col s12">
                            <input id="slogan" type="text">
                            <label for="slogan">Slogan</label>
                        </div> 
                        -->

						<md-input-container style="width:100%; padding: 0 0.75rem" >
						  	<md-select ng-model="principal.datos.categoria.icono" placeholder="Categoria" required> 
						    	<md-option ng-repeat="categoria in principal.categoriasPosibles.iconos track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
						  	</md-select>
						</md-input-container>
                        
                        <md-input-container style="width:100%; padding: 0 0.75rem" >
						  	<md-select ng-model="principal.datos.categoria.fuente" placeholder="Estilo de fuente" required> 
						    	<md-option ng-repeat="categoria in principal.categoriasPosibles.fuentes track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
						  	</md-select>
						</md-input-container>
                        

                        <div class=" col s12 preferencias">
                            <p class="text-center principal" style="margin-top: 1rem;">Preferencias</p>
                                
                            <div class="slider-input" ng-repeat="preferencia in principal.datos.preferencias track by $index">                            
                                <p class="label-slider-input-left">{{preferencia.nombre1}}</p> 
                                <p class="label-slider-input-right">{{preferencia.nombre2}}</p>
                                <md-slider ng-model="preferencia.valor" value="2" min="1" max="3"></md-slider>
                            </div>
                                          
                        </div>
                    </div>
                
                    <div class="col l2 sidebar-2" ng-class="{'offset-l2': principal.datosForm.$valid, 'ocultar': !principal.datosForm.$valid, 'mostrar': principal.datosForm.$valid}">
                        <p class="text-center principal">Forma de su logo</p>

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

				
				<div ui-view class="contenedor-principal col " ng-class="{'l10': !principal.datosForm.$valid, 'l8': principal.datosForm.$valid}">
				       
				</div>

            </div>
        </section>

        <div class="overlay" ng-class="{'show': principal.mostrarModalLogin, 'hide': !principal.mostrarModalLogin}"> 
            <div class="row margin-bottom-0">
                <div class="col s6 offset-s3">

                    <div class="login-form-flex"> 

                        <div class="cubo-form row">

                            <i class="material-icons cerrar" ng-click="principal.mostrarModalLogin = false">clear</i>

                            <div class="login-form col s6">
                                <p class="text-center tercero">INGRESA</p>
                                <form name="principal.loginForm" novalidate ng-submit="principal.login(principal.datosLogin, principal.loginForm.$valid)">
                                    <div class="input-field col s12">
                                        <input id="correo" name="correo" type="email" class="validate" ng-model ="principal.datosLogin.correo" required>
                                        <label for="correo">Correo</label>
                                    </div>  
                                    <div class="input-field col s12">
                                        <input id="pass" name="pass" type="password" class="validate" ng-model ="principal.datosLogin.pass" required>
                                        <label for="pass">Contraseña</label>
                                    </div>
                                    <div class="text-center">
                                        <button class="boton-verde">ENVIAR</button>
                                    </div>                               
                                </form>
                            </div>

                            <div class="registro-form col s6">
                                <p class="text-center tercero">REGISTRATE</p>
                                <form>
                                    <div class="input-field col s12">
                                        <input id="nombre" type="text" class="validate" required>
                                        <label for="nombre">Nombre</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="correo" type="email" class="validate" required>
                                        <label for="correo">Correo</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="pass" type="password" class="validate" required>
                                        <label for="pass">Contraseña</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="telefono" type="text" class="validate" required>
                                        <label for="telefono">Telefóno</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="pais" type="text" class="validate" required>
                                        <label for="pais">Pais</label>
                                    </div>  
                                    <div class="text-center">
                                        <button class="boton-verde">ENVIAR</button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>