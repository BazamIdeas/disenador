<style>
    .registro-form,
    .login-form,
    .olvido-contrasena {
        padding-top: 3% !important;
    }

    .login-form>div,
    .olvido-contrasena>div {
        background-color: var(--blanco);
        border-radius: 18px;
        padding: 18px !important;
    }

    .registro-form p.tercero,
    .login-form p.tercero,
    .olvido-contrasena p.tercero {
        font-size: 24px;
        margin: 0;
        padding-bottom: 8px;
        padding-top: 3%;
    }

    .subtitle>b {
        text-align: center;
        display: block;
    }

    .ingreso-redes-sociales {
        display: flex;
        padding-top: 7%;
    }

    .ingreso-redes-sociales>div {
        width: calc(33% - 16px);
        margin: 10px 8px;
        padding: 10px;
        margin: 0 10px;
        border-radius: 4px;
        transition: all .3s ease;
        text-align: center;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1);
        cursor: pointer;
        color: white;
        font-size: 16px;
    }

    .ingreso-redes-sociales>div:hover {
        -webkit-transform: scale(1.03);
        transform: scale(1.03);
    }

    .ingreso-redes-sociales .ingreso__twitter {
        background-color: #1da1f2;
    }

    .ingreso-redes-sociales .ingreso__facebook {
        background-color: #3a5998;
    }

    .ingreso-redes-sociales .ingreso__google {
        background-color: #dd4b39;
    }

    .social__or {
        display: flex;
        padding: 8% 0 3% 0;
    }

    .social__or hr {
        width: 45%;
    }

    .ventajas-loguear md-icon {
        padding-right: 30px;
        font-size: 35px;
        width: 60px;
        height: auto;
        color: white;
        margin: 0;
    }

    .ventajas-loguear>div {
        display: flex;
        align-items: center;
    }

    .ventajas-loguear {

        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left: 5% !important;
        background: linear-gradient(-134deg, var(--principal), var(--tercero));
        color: white;
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
    }

    .boton-verde.__block {
        width: 100%;
        padding: 6px 0;
        font-size: 18px;
    }
</style>


<section style="height:100%; background-color: var(--fondo);overflow: hidden;">
    <div class="row " style="overflow: hidden;">

        <div class="col s8 offset-s2">
            <div class="login-form-flex">
                <div ng-switch="login.formPasos">
                    <div class="login" ng-switch-default>
                        <div class="login-form col s5 offset-s3" ng-hide="login.ingresar">
                            <div>
                                <p class="text-center tercero">Ingresa a tu Cuenta</p>
                                <small class="subtitle">
                                    <B>Mira tus creaciones en cualquier momento</B>
                                </small>
                                <div>
                                    <div class="ingreso-redes-sociales">
                                        <div class="ingreso__twitter">
                                            <i class="fab fa-facebook"></i>

                                        </div>
                                        <div class="ingreso__facebook">
                                            <i class="fab fa-twitter-square"></i>

                                        </div>
                                        <div class="ingreso__google">
                                            <i class="fab fa-google-plus-g"></i>

                                        </div>
                                    </div>
                                    <div class="social__or">
                                        <hr> o
                                        <hr>
                                    </div>
                                </div>
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
                                        <br>
                                        <small ng-click="login.formPasos = 1">
                                            <b>Olvidaste tu contraseña?</b>
                                        </small>
                                    </div>

                                    <br>
                                    <br>
                                    <div class="text-center">
                                        <button class="boton-verde __block" ng-class="{'loading-white': !login.completadoLogin}">ENVIAR</button>
                                    </div>
                                </form>
                                <small class="subtitle" style="cursor:pointer; padding-top: 5%;
                                display: block;" ng-click="login.ingresar = true">
                                    <b>Aun no posees una cuenta? Registrate.</b>
                                </small>
                            </div>

                        </div>

                        <div class="registro-form" ng-hide="!login.ingresar">
                            <div class="row">
                                <div class="col s5 offset-s1" style="    padding: 18px; display: flex;flex-direction: column; justify-content: space-between; height: 80%;    background-color: var(--blanco);border-top-left-radius: 18px;
                                border-bottom-left-radius: 18px;">
                                    <div>
                                        <p class="text-center tercero">Crea una Cuenta</p>
                                        <small class="subtitle">
                                            <B>Busca los mejores diseños y guardalos solo para ti.</B>
                                        </small>
                                        <div>
                                            <div class="ingreso-redes-sociales">
                                                <div class="ingreso__twitter">
                                                    <i class="fab fa-facebook"></i>

                                                </div>
                                                <div class="ingreso__facebook">
                                                    <i class="fab fa-twitter-square"></i>

                                                </div>
                                                <div class="ingreso__google">
                                                    <i class="fab fa-google-plus-g"></i>

                                                </div>
                                            </div>
                                            <div class="social__or">
                                                <hr> o
                                                <hr>
                                            </div>
                                        </div>
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
                                            <!--<div class="input-field col s12">
                                                            <input id="telefono" type="text" ng-model="login.datosRegistro.telefono" name="telefono" required>
                                                            <label for="telefono">Telefóno</label>
                        
                                                            <div ng-messages="login.registroForm.telefono.$error" ng-if="login.registroForm.$submitted || login.registroForm.telefono.$dirty">
                                                                <div ng-message="required">Este campo es requerido.</div>
                                                            </div>
                                                        
                                                        </div>
                                                        <div class="input-field col s12">
                        
                                                            <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;">
                                                                <md-select ng-model="login.datosRegistro.pais" placeholder="Pais" required>
                                                                    <md-option ng-repeat="(llave, valor) in login.paises track by $index" ng-value="llave" ng-selected="llave == login.paisDefecto">{{::valor}}</md-option>
                                                                </md-select>
                                                            </md-input-container>
                                                        </div>
                                                        -->
                                            <div class="text-center">
                                                <button class="boton-verde __block">ENVIAR</button>
                                            </div>
                                        </form>
                                    </div>
                                    <small class="subtitle" style="cursor:pointer;" ng-click="login.ingresar = false">
                                        <b>Ya tienes una cuenta? Ingresa.</b>
                                    </small>
                                </div>

                                <div class="ventajas-loguear col s5">
                                    <div>
                                        <md-icon>remove_red_eye</md-icon>
                                        <span>
                                            <b>Ver tus logotipos</b>
                                            <br>
                                            <small> y sigue generando más diseños</small>
                                        </span>
                                    </div>

                                    <div>
                                        <md-icon>stars</md-icon>
                                        <span>
                                            <b>Guarde sus favoritos</b>
                                            <br>
                                            <small>y ve cómo se ven en camisetas, tarjetas de visita y otros productos</small>
                                        </span>
                                    </div>

                                    <div>
                                        <md-icon>settings_applications</md-icon>
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

                    <div class="login row olvido-contrasena" ng-switch-when="1">
                        <div class="col s4 offset-s4">
                            <div ng-switch="login.rc">
                                <p class="text-center tercero">Olvido de Contraseña</p>
                                <small class="subtitle">
                                    <B>Segui los pasos y listo</B>
                                </small>
                                <br>
                                <div ng-switch-default>
                                    <form name="olvido" ng-submit="login.forgotPass(login.olvido, olvido.$valid)" novalidate class="formulario-ingreso">
                                        <md-input-container class="md-block">
                                            <label>Correo</label>
                                            <input style="margin-bottom:0;" type="email" ng-model="login.olvido.correo" name="correo" required ng-minlength="5">
                                            
                                        </md-input-container>
                                        <div ng-messages="olvido.correo.$error" style="color:maroon" role="alert" ng-show="olvido.$submitted">
                                                <div ng-message="required">Este campo es requerido.</div>
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