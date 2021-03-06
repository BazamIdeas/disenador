
        <section class="sub-menu">
            <div class="row margin-bottom-0">

                <div class="col s6 login tab" ng-class="{'active': login.tab == 1}" ng-click="login.tab = 1">
                    <h5 class="principal"> Ingreso </h5>
                </div>
                <div class="col s6 registro tab" ng-class="{'active': login.tab == 2}" ng-click="login.tab = 2">
                    <h5 class="principal"> Registro </h5>
                </div>

            </div>
        </section>

        <section class="section-login scrollbar-dynamic" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
            <div class="row margin-bottom-0">
				
	           <div class="login-form-flex" ng-switch="login.tab"> 
	                    	
                    <div class="login-form col s12 m8 l6 " ng-switch-when="1" style="margin-left: 0;">

                        <form name="login.loginForm" novalidate ng-submit="login.login(login.datosLogin, login.loginForm.$valid)" style="width: 100%">
                            <div class="input-field col s12">
                                <input id="correo" name="correo" type="email"  ng-model ="login.datosLogin.correo" required>
                                <label for="correo">Correo</label>
                                
                                <div ng-messages="login.loginForm.correo.$error" ng-if="login.loginForm.$submitted || login.loginForm.correo.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="email">Debe ser un email válido.</div>
                                </div>
                                
                            </div>  
                            <div class="input-field col s12">
                                <input id="pass" name="pass" type="password" ng-model ="login.datosLogin.pass" ng-minlength="6" ng-maxlength="20" required>
                                <label for="pass">Contraseña</label>
                                
                                <div ng-messages="login.loginForm.pass.$error" ng-if="login.loginForm.$submitted || login.loginForm.pass.$dirty">
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
	                        
                    <div class="registro-form col s12 m8 l6 " ng-switch-when="2" style="margin-left: 0;">
                        <form name="login.registroForm" novalidate ng-submit="login.registrar(login.datosRegistro, login.registroForm.$valid)">
                            <div class="input-field col s12">
                                <input id="nombre" type="text" name="nombreCliente" ng-model="login.datosRegistro.nombreCliente" required>
                                <label for="nombre">Nombre</label>
                                
                                <div ng-messages="login.registroForm.nombreCliente.$error" ng-if="login.registroForm.$submitted || login.registroForm.nombreCliente.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                </div>
                                
                            </div>
                            <div class="input-field col s12">
                                <input id="correo2" type="email" name="correo" ng-model="login.datosRegistro.correo" required>
                                <label for="correo2">Correo</label>
                                
                                <div ng-messages="login.registroForm.correo.$error" ng-if="login.registroForm.$submitted || login.registroForm.correo.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="email">Debe ser un email válido.</div>
                                </div>
                            </div>
                            <div class="input-field col s12">
                                <input id="pass2" type="password" name="pass" ng-model="login.datosRegistro.pass" ng-minlength="6" ng-maxlength="20" required>
                                <label for="pass2">Contraseña</label>
                                
                                <div ng-messages="login.registroForm.pass.$error" ng-if="login.registroForm.$submitted || login.registroForm.pass.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                    <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                </div>
                            </div>
                            <div class="input-field col s12">
                                <input id="telefono" type="text" ng-model="login.datosRegistro.telefono" name="telefono" required>
                                <label for="telefono">Telefóno</label>
                                
                                <div ng-messages="login.registroForm.telefono.$error" ng-if="login.registroForm.$submitted || login.registroForm.telefono.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                </div>
                                
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
        </section>