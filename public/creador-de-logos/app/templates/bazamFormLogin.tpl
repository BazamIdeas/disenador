<div class="row" style="width:100%;">
    <div class="col s8 offset-s2 ">
        <div class="login-form-flex">
            <div ng-switch="bazamLogin.formPasos" style="height: 92%;">

                <div class="login row" style="margin:0;height: 92%;" ng-switch-default>

                    <div class="login-form col s6  offset-s3" style="position:relative;" ng-hide="bazamLogin.ingresar">
                        <i ng-if="bazamLogin.vistaActual != 'login'" style=" right: 23px; top: 5%;" class="material-icons cerrar-pop" ng-click="$root.mostrarModalLogin = false">clear</i>
                        <i ng-if="bazamLogin.vistaActual == 'login'" style=" right: 23px; top: 5%;" class="material-icons cerrar-pop" ng-click="bazamLogin.noLoguear()">clear</i>
                        <div>
                            <img class="key-image" src="/assets/images/iconos_login/keys.svg">
                            <p class="text-center tercero">Ingresa a tu Cuenta</p>
                            <small class="subtitle">
                                <B>Mira tus creaciones en cualquier momento</B>
                            </small>

                            <div class=" col s12">
                                <div class="ingreso-redes-sociales">
                                    <div class="ingreso__facebook" ng-click="bazamLogin.social('fb')">
                                
                                        <i class="fab fa-facebook-f"></i>
                                    </div>
                                    <div class="ingreso__google" ng-click="bazamLogin.social('gg')">
                                        <i class="fab fa-google"></i>
                                    </div>
                                </div>
                            </div>

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
                                        <b class="olvido-small-tag">Olvidaste tu contraseña?</b>
                                    </small>
                                </div>
                                <div ng-if="bazamLogin.loginForm.falloLogin" class="col s12 no-padding">
                                    <div style="    font-weight: bold; font-size: 9pt;
    padding: 16px 0;     color: rgb(181, 70, 43);
">Hubo un error al ingresar por favor verifique los datos y vuelva a intentarlo.</div>
                                </div>

                                <div class="text-center col s12 no-padding">
                                    <button class="boton-verde __block" ng-class="{'loading-white': !bazamLogin.completadoLogin}">ENVIAR</button>
                                </div>

                            </form>
                            <div style="text-align: center">
                                <small ng-click="bazamLogin.ingresar = true">
                                    <b>Aun no posees una cuenta? Registrate.</b>
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="registro-form" style="position:relative;" ng-hide="!bazamLogin.ingresar">
                        <i ng-if="bazamLogin.vistaActual != 'login'" style=" right: 30px; top: 5%;" class="material-icons cerrar-pop" ng-click="$root.mostrarModalLogin = false">clear</i>
                        <i ng-if="bazamLogin.vistaActual == 'login'" style=" right: 30px; top: 5%;" class="material-icons cerrar-pop" ng-click="bazamLogin.noLoguear()">clear</i>
                        <div class="row" style="margin-bottom: 0;">
                            <div class="col s5 offset-s1 parte-izquierda-form">
                                <div>
                                    <img class="key-image" src="/assets/images/iconos_login/keys.svg">
                                    <p class="text-center tercero">Crea una Cuenta</p>
                                    <small class="subtitle">
                                        <B>Busca los mejores diseños y guardalos solo para ti.</B>
                                    </small>
                                    <div>
                                        <div class="ingreso-redes-sociales">
                                            <div class="ingreso__facebook" ng-click="bazamLogin.social('fb')">
                                        
                                                <i class="fab fa-facebook-f"></i>
                                            </div>
                                            <div class="ingreso__google" ng-click="bazamLogin.social('gg')">
                                                <i class="fab fa-google"></i>
                                            </div>
                                        </div>
                                    </div>
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

                                        <div ng-messages="bazamLogin.registroForm." ng-if=" bazamLogin.registroForm.falleRegistro">
                                            <div ng-message="error">Hubo un error al registrarlo por favor verifique los datos y vuelva a intentarlo.</div>
                                        </div>

                                        <div class="text-center col s12 no-padding">
                                            <button class="boton-verde __block">ENVIAR</button>
                                        </div>
                                    </form>
                                </div>
                                <small class="subtitle" style="cursor:pointer;" ng-click="bazamLogin.ingresar = false">
                                    <b>Ya tienes una cuenta? Ingresa.</b>
                                </small>
                            </div>

                            <div class="ventajas-loguear col s6">
                                <div>
                                    <img class="eye-image" src="/assets/images/iconos_login/eye.svg">
                                    <span>
                                        <b>Ver tus logotipos</b>
                                        <br>
                                        <small>editarlos y crear nuevos diseños</small>
                                    </span>
                                </div>

                                <div>
<md-icon style="display: block; margin-right: 38px; font-size: 50pt;">favorite_border</md-icon>
                                    <span>
                                        <b>Guarda tus logos favoritos</b>
                                        <br>
                                        <small>y ve su diseño en tarjetas de visita, indumentaria, perfiles de redes sociales y
                                            mucho mas!</small>
                                    </span>
                                </div>

                                <div>
                                    <img class="gear-image" src="/assets/images/iconos_login/gear.svg">
                                    <span>
                                        <b>Personaliza tu logo</b>
                                        <br>
                                        <small>cambiando las fuentes, los colores, los iconos, el espaciado y más</small>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="login olvido-contrasena" style="position:relative;" ng-switch-when="1">
                    <div>
                        <div ng-switch="bazamLogin.rc">
                            <img class="key-image" src="/assets/images/iconos_login/keys.svg">
                            <p class="text-center tercero">Olvido de Contraseña</p>
                            <small class="subtitle">
                                <B>Segui los pasos y listo</B>
                            </small>
                            <br>
                            <div ng-switch-default>
                                <form name="olvido" ng-submit="bazamLogin.forgotPass(bazamLogin.olvido, olvido.$valid)" novalidate class="formulario-ingreso">
                                    <div class="input-field col s12">

                                        <input type="email" ng-model="bazamLogin.olvido.correo" name="correo" required ng-minlength="5">
                                        <label for="correo">Correo</label>
                                    </div>
                                    <div ng-messages="olvido.correo.$error" style="color:maroon" role="alert" ng-show="olvido.$submitted">
                                        <div ng-message="required">Este campo es requerido.</div>
                                        <div ng-message="minlength">Debe contener minimo 3 caracteres</div>
                                        <div ng-message="email">Debe ser un email válido</div>
                                    </div>
                                    <div class="row">
                                        <div class="text-center col s12 no-padding">
                                            <button class="boton-verde __block" ng-click="bazamLogin.formPasos='default'" ng-disabled="bazamLogin.peticion">REGRESAR</button>
                                        </div>
                                        <div class="text-center col s12 no-padding"></div>
                                        <button ng-disabled="bazamLogin.peticion" class="boton-verde __block" type="submit">ENVIAR</button>
                                    </div>
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