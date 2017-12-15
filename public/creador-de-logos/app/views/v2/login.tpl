
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal"></h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">
				
				<div class="col s6 offset-s3">

	                <div class="login-form-flex"> 
	                    
	                    <div class="cubo-form login row">
	                    	
	                        <div class="login-form col s6">
	                            <p class="text-center tercero">INGRESA</p>
	                            <form name="login.loginForm" novalidate ng-submit="login.login(login.datosLogin, login.loginForm.$valid)">
                                    <div class="input-field col s12">
                                        <input id="correo" name="correo" type="email" class="validate" ng-model ="login.datosLogin.correo" required>
                                        <label for="correo">Correo</label>
                                        
                                        <div ng-messages="login.loginForm.correo.$error">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="email">Debe ser un email válido.</div>
                                        </div>
                                        
                                    </div>  
                                    <div class="input-field col s12">
                                        <input id="pass" name="pass" type="password" class="validate" ng-model ="login.datosLogin.pass" ng-minlength="6" ng-maxlength="20" required>
                                        <label for="pass">Contraseña</label>
                                        
                                        <div ng-messages="login.loginForm.pass.$error">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                            <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button class="boton-verde" ng-class="{'loading-white': !login.completadoLogin}">ENVIAR</button>
                                    </div>                               
                                </form>
	                        </div>
	                        
	                        <div class="registro-form col s6">
	                            <p class="text-center tercero">REGISTRATE</p>
	                            <form name="login.registroForm" novalidate ng-submit="login.registrar(login.datosRegistro, login.registroForm.$valid)">
	                                <div class="input-field col s12">
	                                    <input id="nombre" type="text" class="validate" ng-model="login.datosRegistro.nombreCliente" required>
	                                    <label for="nombre">Nombre</label>
	                                </div>
	                                <div class="input-field col s12">
	                                    <input id="correo2" type="email" class="validate" ng-model="login.datosRegistro.correo" required>
	                                    <label for="correo2">Correo</label>
	                                </div>
	                                <div class="input-field col s12">
	                                    <input id="pass2" type="password" class="validate" ng-model="login.datosRegistro.pass" required>
	                                    <label for="pass2">Contraseña</label>
	                                </div>
	                                <div class="input-field col s12">
	                                    <input id="telefono" type="text" class="validate" ng-model="login.datosRegistro.telefono" required>
	                                    <label for="telefono">Telefóno</label>
	                                </div>
	                                <div class="input-field col s12">
	                                                                     
                                        <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;">
                                            <md-select ng-model="login.datosRegistro.pais" placeholder="Pais" required> 
                                                <md-option ng-repeat="(llave, valor) in login.paises track by $index" ng-value="llave"  ng-selected="llave == login.paisDefecto">{{valor}}</md-option>
                                            </md-select>
                                        </md-input-container>
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
        </section>