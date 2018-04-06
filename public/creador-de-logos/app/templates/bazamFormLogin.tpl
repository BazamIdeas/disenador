<div class="overlay" ng-class="{'show': mostrar, 'hide': !mostrar}">
    <div class="row margin-bottom-0">
        <div class="col s6 offset-s3">

            <div class="login-form-flex">
                <div ng-switch="bazamLogin.formPasos">
                    <div class="cubo-form row" ng-switch-default>

                        <i class="material-icons cerrar" ng-click="mostrar = false">clear</i>

                        <div class="login-form col s6">
                            <p class="text-center tercero">INGRESA</p>
                            <form name="bazamLogin.loginForm" novalidate ng-submit="bazamLogin.login(bazamLogin.datosLogin, bazamLogin.loginForm.$valid)">
                                <div class="input-field col s12">
                                    <input id="correo" name="correo" type="email" ng-model="bazamLogin.datosLogin.correo" required>
                                    <label for="correo">Correo</label>

                                    <div ng-messages="bazamLogin.loginForm.correo.$error" ng-if="bazamLogin.loginForm.$submitted || bazamLogin.loginForm.correo.$dirty">
                                        <div ng-message="required">Este campo es requerido.</div>
                                        <div ng-message="email">Debe ser un email válido.</div>
                                    </div>
                                </div>
                                <div class="input-field col s12">
                                    <input id="pass" name="pass" type="password" ng-model="bazamLogin.datosLogin.pass" ng-minlength="6" ng-maxlength="20" required>
                                    <label for="pass">Contraseña</label>

                                    <div ng-messages="bazamLogin.loginForm.pass.$error" ng-if="bazamLogin.loginForm.$submitted || bazamLogin.loginForm.pass.$dirty">
                                        <div ng-message="required">Este campo es requerido.</div>
                                        <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                        <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                    </div>
                                </div>
                                <div class="input-field col s12">
                                    <small ng-click="bazamLogin.formPasos = 1">
                                        <b>Olvidaste tu contraseña?</b>
                                    </small>
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
                                    <input id="correo2" type="email" name="correo" ng-model="bazamLogin.datosRegistro.correo" bazam-mail required>
                                    <label for="correo2">Correo</label>

                                    <div ng-messages="bazamLogin.registroForm.correo.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.correo.$dirty">
                                        <div ng-message="required">Este campo es requerido.</div>
                                        <div ng-message="email">Debe ser un email válido.</div>
                                        <div ng-message="disponible">Este email no esta disponible.</div>
                                    </div>
                                    <div ng-messages="bazamLogin.registroForm.correo.$pending">
                                        <div ng-message="disponible">Verificando la disponibilidad del email.</div>
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

                                    <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;">
                                        <md-select ng-model="bazamLogin.datosRegistro.pais" placeholder="Pais" required>
                                            <md-option ng-repeat="(llave, valor) in bazamLogin.paises track by $index" ng-value="llave" ng-selected="llave == bazamLogin.paisDefecto">{{::valor}}</md-option>
                                        </md-select>
                                    </md-input-container>
                                </div>
                                <div class="text-center">
                                    <button class="boton-verde">ENVIAR</button>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="cubo-form login row" style="min-width: 25vw;" ng-switch-when="1">
                        <div class="col s12">
                            <div ng-switch="bazamLogin.rc">
                                <p class="text-center tercero">RECUPERAR CONTRASEÑA</p>
                                <br>
                                <div ng-switch-default>
                                    <form name="olvido" ng-submit="bazamLogin.forgotPass(bazamLogin.olvido, olvido.$valid)" novalidate class="formulario-ingreso">
                                        <md-input-container class="md-block">
                                            <label>Correo</label>
                                            <input style="margin-bottom:0;" type="email" ng-model="bazamLogin.olvido.correo" name="correo" required ng-minlength="5">
                                        </md-input-container>
                                        <div ng-messages="olvido.correo.$error" style="color:maroon" role="alert" ng-show="olvido.$submitted">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="minlength">Debe contener minimo 3 caracteres</div>
                                            <div ng-message="email">Debe ser un email válido</div>
                                        </div>
                                        <div layout layout-align="space-between">
                                            <button class="boton-verde" ng-click="bazamLogin.formPasos='default'" ng-disabled="bazamLogin.peticion">Regresar</button>
                                            <button ng-disabled="bazamLogin.peticion" class="boton-verde" type="submit">Enviar</button>
                                        </div>
                                    </form>
                                </div>
                                <div ng-switch-when="2">
                                    <md-input-container class="md-block">
                                        <label>Codigo de coonfirmación:</label>
                                        <input style="margin-bottom:0;" type="password" ng-model="bazamLogin.olvido.token">
                                    </md-input-container>
                                    <div layout layout-align="space-between">
                                        <button class="boton-verde" ng-click="bazamLogin.rc=1">Regresar</button>
                                        <button ng-disabled="bazamLogin.peticion" class="boton-verde" ng-click="::bazamLogin.confirmarToken(false)">Enviar</button>
                                    </div>
                                </div>
                                <div ng-switch-when="3">
                                    <form name="formRecuperar" ng-submit="bazamLogin.confirmarToken(true,formRecuperar.$valid)" novalidate>
                                        <md-input-container class="md-block">
                                            <label>Nueva Contraseña:</label>
                                            <input type="password" style="margin-bottom:0;" ng-model="bazamLogin.olvido.pass" name="pass" required ng-minlength="6">
                                        </md-input-container>
                                        <div ng-messages="formRecuperar.pass.$error" style="color:maroon" role="alert" ng-show="formRecuperar.$submitted">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="minlength">Debe contener minimo 6 caracteres</div>
                                        </div>
                                        <div layout layout-align="space-between">
                                            <button ng-disabled="bazamLogin.peticion" class="boton-verde" ng-click="bazamLogin.mostrarForm=1">Regresar</button>
                                            <button ng-disabled="bazamLogin.peticion" class="boton-verde" type="submit">Cambiar</button>
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
</div>