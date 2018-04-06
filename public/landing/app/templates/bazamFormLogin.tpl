<div class="overlay" ng-class="{'show': mostrar, 'hide': !mostrar}" style="position: fixed; z-index: 10; width: 100%; height: 100%;">
    <div class="row margin-bottom-0">
        <div class="col s8 offset-s2">
            <div class="login-form-flex">
                <div ng-switch="bazamLogin.formPasos">

                    <div class="login row" ng-switch-default>

                        <div class="login-form col s6  offset-s3" style="position:relative;" ng-hide="bazamLogin.ingresar">
                            <i style="background: #009688e0;
                                border: none;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                position: absolute;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: white;
                                right: 23px;
                                top: 5%;
                                cursor: pointer;" class="material-icons cerrar" ng-click="$parent.mostrar = false">clear</i>
                            <div class="md-whiteframe-12dp">
                                <p class="text-center tercero">Ingresa a tu Cuenta</p>
                                <small class="subtitle">
                                    <B>Mira tus creaciones en cualquier momento</B>
                                </small>
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
                                    <div class=" col s12">
                                        <div class="social__or" style="    padding: 4% 0 3% 0;">
                                            <hr> o
                                            <hr>
                                        </div>
                                        <div class="ingreso-redes-sociales">
                                            <div class="ingreso__facebook" ng-click="bazamLogin.social('fb')">

                                                <i class="fab fa-facebook"></i>
                                            </div>
                                            <div class="ingreso__google" ng-click="bazamLogin.social('gg')">
                                                <i class="fab fa-google-plus-g"></i>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="text-center">
                                        <button class="boton-verde __block" ng-class="{'loading-white': !bazamLogin.completadoLogin}">ENVIAR</button>
                                    </div>
                                </form>
                                <small class="subtitle" style="cursor:pointer; padding-top: 5%;
                                    display: block;" ng-click="bazamLogin.ingresar = true">
                                    <b>Aun no posees una cuenta? Registrate.</b>
                                </small>
                            </div>
                        </div>

                        <div class="registro-form" style="position:relative;" ng-hide="!bazamLogin.ingresar">
                            <i style="background: white;
                                border: none;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                position: absolute;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: black;
                                right: 30px;
                                top: 5%;
                                cursor: pointer;" class="material-icons cerrar" ng-click="$parent.mostrar = false">clear</i>
                            <div class="row">
                                <div class="col s5 offset-s1 md-whiteframe-12dp" style="    padding: 18px; display: flex;flex-direction: column; justify-content: space-between; height: 80%;    background-color: white;border-top-left-radius: 18px; border-bottom-left-radius: 18px;">
                                    <div>
                                        <p class="text-center tercero">Crea una Cuenta</p>
                                        <small class="subtitle">
                                            <B>Busca los mejores diseños y guardalos solo para ti.</B>
                                        </small>
                                        <div>
                                            <div class="ingreso-redes-sociales">
                                                <div class="ingreso__facebook" ng-click="bazamLogin.social('fb')">

                                                    <i class="fab fa-facebook"></i>
                                                </div>
                                                <div class="ingreso__google" ng-click="bazamLogin.social('gg')">
                                                    <i class="fab fa-google-plus-g"></i>
                                                </div>
                                            </div>
                                            <div class="social__or">
                                                <hr> o
                                                <hr>
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
                                            <!--<div class="input-field col s12">
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
                                            </div>-->
                                            <div class="text-center">
                                                <button class="boton-verde __block">ENVIAR</button>
                                            </div>
                                        </form>
                                    </div>
                                    <small class="subtitle" style="cursor:pointer;" ng-click="bazamLogin.ingresar = false">
                                        <b>Ya tienes una cuenta? Ingresa.</b>
                                    </small>
                                </div>

                                <div class="ventajas-loguear col s6 md-whiteframe-12dp">
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
                    <div class="login olvido-contrasena" style="position:relative;" ng-switch-when="1">
                        <div class="md-whiteframe-12dp">
                            <div ng-switch="bazamLogin.rc">
                                <p class="text-center tercero">Olvido de Contraseña</p>
                                <small class="subtitle">
                                    <B>Segui los pasos y listo</B>
                                </small>
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

<style>
    /* LOGIN */

    .login-form>div,
    .olvido-contrasena>div {
        background-color: white;
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
        justify-content: center;
    }

    .ingreso-redes-sociales>div {
        width: calc(53% - 16px);
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


    .overlay.show {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: #808080d9;
        /*dim the background*/
    }

    .overlay.hide {
        height: 0%;
        z-index: 0;
        display: none
    }

    div.login-form-flex {
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .login-form,
    .registro-form {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column;
        flex-flow: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    button.boton-verde {
        background-color: var(--tercero);
        border: none;
        border-radius: 4px;
        color: #fff;
        padding: 8px 8px;
        margin-top: 11px;
        -webkit-transition: 0.3 all;
        transition: 0.3 all;
        font-family: 'futura-heavy' !important;
    }

    button.boton-verde:hover {
        background-color: #4aaf57;
    }

    .input-field input {
        margin-bottom: 0;
    }

    /*END LOGIN MODAL*/
</style>