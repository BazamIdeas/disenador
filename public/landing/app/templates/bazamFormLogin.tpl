<div class="overlay" ng-class="{'show': mostrar, 'hide': !mostrar}" style="position: fixed; z-index: 10; width: 100%; height: 100%; background: grey"> 
    <div class="row margin-bottom-0">
        <div class="col s6 offset-s3">
<div></div>
            <div class="login-form-flex"> 

                <div class="cubo-form row">

                    <i class="material-icons cerrar" ng-click="mostrar = false">clear</i>

                    <div class="login-form col s6">
                        <p class="text-center tercero">INGRESA</p>
                        <form name="bazamLogin.loginForm" novalidate ng-submit="bazamLogin.login(bazamLogin.datosLogin, bazamLogin.loginForm.$valid)">
                            <div class="input-field col s12">
                                <input id="correo" name="correo" type="email" ng-model ="bazamLogin.datosLogin.correo" required>
                                <label for="correo">Correo</label>
                                
                                <div ng-messages="bazamLogin.loginForm.correo.$error" ng-if="bazamLogin.loginForm.$submitted || bazamLogin.loginForm.correo.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="email">Debe ser un email válido.</div>
                                </div>
                            </div>  
                            <div class="input-field col s12">
                                <input id="pass" name="pass" type="password" ng-model ="bazamLogin.datosLogin.pass" ng-minlength="6" ng-maxlength="20" required>
                                <label for="pass">Contraseña</label>
                                
                                <div ng-messages="bazamLogin.loginForm.pass.$error" ng-if="bazamLogin.loginForm.$submitted || bazamLogin.loginForm.pass.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                    <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button class="boton-verde" ng-class="{'loading-white': !bazamLogin.completadoLogin}">ENVIAR</button>
                            </div>                               
                        </form>
                    </div>

                    <div class="registro-form col s6">
                        <p class="text-center tercero">REGISTRATE</p>
                        <form name="bazamLogin.registroForm" novalidate ng-submit="bazamLogin.registrar(bazamLogin.datosRegistro, bazamLogin.registroForm.$valid)">
                            <div class="input-field col s12">
                                <input id="nombre2" type="text" name="nombreCliente" ng-model="bazamLogin.datosRegistro.nombreCliente" required>
                                <label for="nombre2">Nombre</label>
                                
                                <div ng-messages="bazamLogin.registroForm.nombreCliente.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.nombreCliente.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                </div>
                            </div>
                            <div class="input-field col s12">
                                <input id="correo2" type="email" name="correo" ng-model="bazamLogin.datosRegistro.correo" required>
                                <label for="correo2">Correo</label>
                                
                                <div ng-messages="bazamLogin.registroForm.correo.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.correo.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="email">Debe ser un email válido.</div>
                                </div>
                                
                            </div>
                            <div class="input-field col s12">
                                <input id="pass2" type="password" ng-model="bazamLogin.datosRegistro.pass" ng-minlength="6" ng-maxlength="20" required>
                                <label for="pass2">Contraseña</label>
                                
                                 <div ng-messages="bazamLogin.registroForm.pass.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.pass.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                    <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                </div>
                            </div>
                            <div class="input-field col s12">
                                <input id="telefono" type="text" name="telefono" ng-model="bazamLogin.datosRegistro.telefono" required>
                                <label for="telefono">Telefóno</label>
                                
                                <div ng-messages="bazamLogin.registroForm.telefono.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.telefono.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                </div>
                            </div>
                            <div class="input-field col s12">
                                                                 
                                <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;" >
                                    <md-select ng-model="bazamLogin.datosRegistro.pais" placeholder="Pais" required> 
                                        <md-option ng-repeat="(llave, valor) in bazamLogin.paises track by $index" ng-value="llave"  ng-selected="llave == bazamLogin.paisDefecto">{{valor}}</md-option>
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
</div>