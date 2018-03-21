<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col s2 logo">
            <h5 class="secundario" ui-sref="inicio">
                <i class="material-icons md-48 aling-top">fingerprint</i>
                <span>DISEÑADOR</span>
            </h5>
        </div>
        <div class="col s10 texto text-login">
            <h5 class="principal">INGRESO</h5>
        </div>

    </div>
</section>

<section style="height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
    <div class="row margin-bottom-0" style="overflow: hidden;">

        <div class="col s6 offset-s3">
            <div class="login-form-flex">
                <div ng-switch="login.formPasos">
                    <div class="cubo-form login row" ng-switch-default>
                        <div class="login-form col s6">
                            <p class="text-center tercero">INGRESA</p>
                            <form name="login.loginForm" novalidate ng-submit="login.login(login.datosLogin, login.loginForm.$valid)">
                                <div class="input-field col s12">
                                    <input id="correo" name="correo" type="email" ng-model="login.datosLogin.correo" required>
                                    <label for="correo">Correo</label>

                                    <div ng-messages="login.loginForm.correo.$error" ng-if="login.loginForm.$submitted || login.loginForm.correo.$dirty">
                                        <div ng-message="required">Este campo es requerido.</div>
                                        <div ng-message="email">Debe ser un email válido.</div>
                                    </div>

                                </div>
                                <div class="input-field col s12">
                                    <input id="pass" name="pass" type="password" ng-model="login.datosLogin.pass" ng-minlength="6" ng-maxlength="20" required>
                                    <label for="pass">Contraseña</label>

                                    <div ng-messages="login.loginForm.pass.$error" ng-if="login.loginForm.$submitted || login.loginForm.pass.$dirty">
                                        <div ng-message="required">Este campo es requerido.</div>
                                        <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                        <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                    </div>

                                    <small ng-click="login.formPasos = 1">
                                        <b>Olvidaste tu contraseña?</b>
                                    </small>
                                </div>


                                <br>
                                <div class="text-center">
                                    <button class="boton-verde" ng-class="{'loading-white': !login.completadoLogin}">ENVIAR</button>
                                </div>
                            </form>
                        </div>

                        <div class="registro-form col s6">
                            <p class="text-center tercero">REGISTRATE</p>
                            <form name="login.registroForm" novalidate ng-submit="login.registrar(login.datosRegistro, login.registroForm.$valid)">
                                <div class="input-field col s12">
                                    <input id="nombre" type="text" name="nombreCliente" ng-model="login.datosRegistro.nombreCliente" required>
                                    <label for="nombre">Nombre</label>

                                    <div ng-messages="login.registroForm.nombreCliente.$error" ng-if="login.registroForm.$submitted || login.registroForm.nombreCliente.$dirty">
                                        <div ng-message="required">Este campo es requerido.</div>
                                    </div>

                                </div>
                                <div class="input-field col s12">
                                    <input id="correo2" type="email" name="correo" ng-model="login.datosRegistro.correo" bazam-mail required>
                                    <label for="correo2">Correo</label>

                                    <div ng-messages="login.registroForm.correo.$error" ng-if="login.registroForm.$submitted || login.registroForm.correo.$dirty">
                                        <div ng-message="required">Este campo es requerido.</div>
                                        <div ng-message="email">Debe ser un email válido.</div>
                                        <div ng-message="disponible">Este email no esta disponible.</div>
                                    </div>
                                    <div ng-messages="login.registroForm.correo.$pending">
                                        <div ng-message="disponible">Verificando la disponibilidad del email.</div>
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
                                            <md-option ng-repeat="(llave, valor) in login.paises track by $index" ng-value="llave" ng-selected="llave == login.paisDefecto">{{valor}}</md-option>
                                        </md-select>
                                    </md-input-container>
                                </div>
                                <div class="text-center">
                                    <button class="boton-verde">ENVIAR</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="cubo-form login row" ng-switch-when="1">
                        <div class="col s12">
                            <div ng-switch="login.rc">
                                <p class="text-center tercero">RECUPERAR CONTRASEÑA</p>
                                <br>
                                <div ng-switch-default>
                                    <form name="olvido" ng-submit="login.forgotPass(login.olvido, olvido.$valid)" novalidate class="formulario-ingreso">
                                        <md-input-container class="md-block">
                                            <label>Correo</label>
                                            <input style="margin-bottom:0;" type="email" ng-model="login.olvido.correo" name="correo" required ng-minlength="5">
                                        </md-input-container>
                                        <div ng-messages="olvido.correo.$error" style="color:maroon" role="alert" ng-show="olvido.$submitted">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="minlength">Debe contener minimo 3 caracteres</div>
                                            <div ng-message="email">Debe ser un email válido</div>
                                        </div>
                                        <div layout layout-align="space-between">
                                            <button class="boton-verde" ng-click="login.formPasos='default'" ng-disabled="login.peticion">Regresar</button>
                                            <button ng-disabled="login.peticion" class="boton-verde" type="submit">Enviar</button>
                                        </div>
                                    </form>
                                </div>
                                <div ng-switch-when="2">
                                    <md-input-container class="md-block">
                                        <label>Codigo de coonfirmación:</label>
                                        <input style="margin-bottom:0;" type="password" ng-model="login.olvido.token">
                                    </md-input-container>
                                    <div layout layout-align="space-between">
                                        <button class="boton-verde" ng-click="login.rc=1">Regresar</button>
                                        <button ng-disabled="login.peticion" class="boton-verde" ng-click="login.confirmarToken(false)">Enviar</button>
                                    </div>
                                </div>
                                <div ng-switch-when="3">
                                    <form name="formRecuperar" ng-submit="login.confirmarToken(true,formRecuperar.$valid)" novalidate>
                                        <md-input-container class="md-block">
                                            <label>Nueva Contraseña:</label>
                                            <input type="password" style="margin-bottom:0;" ng-model="login.olvido.pass" name="pass" required ng-minlength="6">
                                        </md-input-container>
                                        <div ng-messages="formRecuperar.pass.$error" style="color:maroon" role="alert" ng-show="formRecuperar.$submitted">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="minlength">Debe contener minimo 6 caracteres</div>
                                        </div>
                                        <div layout layout-align="space-between">
                                            <button ng-disabled="login.peticion" class="boton-verde" ng-click="login.mostrarForm=1">Regresar</button>
                                            <button ng-disabled="login.peticion" class="boton-verde" type="submit">Cambiar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>