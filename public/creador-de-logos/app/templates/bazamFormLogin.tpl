<div class="row" style="width:100%;">
    <div class="col s8 offset-s2 ">
        <div class="login-form-flex" ng-class="{'full-height': bazamLogin.vistaActual != 'login'}">
            <div ng-switch="bazamLogin.formPasos" style="height: 92%;">

                <div class="login row" style="margin:0;height: 92%;" ng-switch-default>

                    <div class="login-form col s6  offset-s3" style="position:relative;" ng-hide="bazamLogin.ingresar">
                        <i ng-if="bazamLogin.vistaActual != 'login'" style=" right: 23px; top: 5%;" class="material-icons cerrar-pop" ng-click="$root.mostrarModalLogin = false">clear</i>
                        <div>
                            <img class="key-image" src="/assets/images/iconos_login/keys.svg">
                            <p class="text-center tercero">{{textos.login.titulo}}</p>
                            <small class="subtitle">
                                <B>{{textos.login.subtitulo}}</B>
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

                            <form name="bazamLogin.loginForm" novalidate ng-submit="bazamLogin.login(bazamLogin.datosLogin, bazamLogin.loginForm.$valid)"
                                autocomplete="on">
                                <div class="input-field col s12">
                                    <input name="correo" type="email" ng-model="bazamLogin.datosLogin.correo" required>
                                    <label for="correo">{{textos.login.form.correo.label}}</label>

                                    <div ng-messages="bazamLogin.loginForm.correo.$error" ng-if="bazamLogin.loginForm.$submitted || bazamLogin.loginForm.correo.$dirty">
                                        <div ng-message="required">{{textos.login.form.validaciones[0]}}</div>
                                        <div ng-message="email">{{textos.login.form.validaciones[1]}}.</div>
                                    </div>
                                </div>
                                <div class="input-field col s12">
                                    <input name="pass" type="password" ng-model="bazamLogin.datosLogin.pass" ng-minlength="6" ng-maxlength="20" required>
                                    <label for="pass">{{textos.login.form.contrasena.label}}</label>

                                    <div ng-messages="bazamLogin.loginForm.pass.$error" ng-if="bazamLogin.loginForm.$submitted || bazamLogin.loginForm.pass.$dirty">
                                        <div ng-message="required">{{textos.login.form.contrasena.validaciones[0]}}</div>
                                        <div ng-message="minlength">{{textos.login.form.contrasena.validaciones[1]}}</div>
                                        <div ng-message="maxlength">{{textos.login.form.contrasena.validaciones[2]}}</div>
                                    </div>
                                </div>

                                <div class="input-field col s12">
                                    <small ng-click="bazamLogin.formPasos = 1">
                                        <b class="olvido-small-tag">{{textos.login.form.olvido_contrasena}}</b>
                                    </small>
                                </div>
                                <div ng-if="bazamLogin.loginForm.falloLogin" class="col s12 no-padding">
                                    <div style="    font-weight: bold; font-size: 9pt;
    padding: 16px 0;     color: rgb(181, 70, 43);
">Hubo un error al ingresar por favor verifique los datos y vuelva a intentarlo.</div>
                                </div>

                                <div class="text-center col s12 no-padding">
                                    <button class="boton-verde __block" ng-class="{'loading-white': !bazamLogin.completadoLogin}">{{textos.login.form.boton_submit}}</button>
                                </div>

                            </form>
                            <div style="text-align: center">
                                <small ng-click="bazamLogin.ingresar = true">
                                    <b>{{textos.login.form.cuenta}}</b>
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="registro-form" style="position:relative;" ng-hide="!bazamLogin.ingresar">
                        <i ng-show="bazamLogin.vistaActual != 'login'" style=" right: 30px; top: 5%;" class="material-icons cerrar-pop" ng-click="$root.mostrarModalLogin = false">clear</i>
                        <div class="row" style="margin-bottom: 0;">
                            <div class="col s5 offset-s1 parte-izquierda-form">
                                <div>
                                    <img class="key-image" src="/assets/images/iconos_login/keys.svg">
                                    <p class="text-center tercero">{{textos.registro.titulo}}</p>
                                    <small class="subtitle">
                                        <B>{{textos.registro.subtitulo}}</B>
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
                                    <form name="bazamLogin.registroForm" novalidate ng-submit="bazamLogin.registrar(bazamLogin.datosRegistro, bazamLogin.registroForm.$valid)"
                                        autocomplete="on">
                                        <div class="input-field col s12">
                                            <input type="text" name="nombreCliente" ng-model="bazamLogin.datosRegistro.nombreCliente" required>
                                            <label for="nombre2">{{textos.registro.form.nombre.label}}</label>

                                            <div ng-messages="bazamLogin.registroForm.nombreCliente.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.nombreCliente.$dirty">
                                                <div ng-message="required">{{textos.registro.form.nombre.validaciones[0]}}</div>
                                            </div>
                                        </div>
                                        <div class="input-field col s12">
                                            <input type="email" name="correo" ng-model="bazamLogin.datosRegistro.correo" bazam-mail required>
                                            <label for="correo2">{{textos.registro.form.correo.label}}</label>

                                            <div ng-messages="bazamLogin.registroForm.correo.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.correo.$dirty">
                                                <div ng-message="required">{{textos.registro.form.correo.validaciones[0]}}</div>
                                                <div ng-message="email">{{textos.registro.form.correo.validaciones[1]}}</div>
                                                <div ng-message="disponible">{{textos.registro.form.correo.validaciones[2]}}</div>
                                            </div>
                                            <div ng-messages="bazamLogin.registroForm.correo.$pending">
                                                <div ng-message="disponible">{{textos.registro.form.correo.validaciones[3]}}</div>
                                            </div>



                                        </div>
                                        <div class="input-field col s12">
                                            <input type="password" ng-model="bazamLogin.datosRegistro.pass" ng-minlength="6" ng-maxlength="20" required>
                                            <label for="pass2">{{textos.registro.form.contrasena.label}}</label>

                                            <div ng-messages="bazamLogin.registroForm.pass.$error" ng-if="bazamLogin.registroForm.$submitted || bazamLogin.registroForm.pass.$dirty">
                                                <div ng-message="required">{{textos.registro.form.contrasena.validaciones[0]}}</div>
                                                <div ng-message="minlength">{{textos.registro.form.contrasena.validaciones[1]}}</div>
                                                <div ng-message="maxlength">{{textos.registro.form.contrasena.validaciones[2]}}</div>
                                            </div>
                                        </div>

                                        <div ng-messages="bazamLogin.registroForm." ng-if=" bazamLogin.registroForm.falleRegistro">
                                            <div ng-message="error">Hubo un error al registrarlo por favor verifique los datos y vuelva a intentarlo.</div>
                                        </div>

                                        <div class="text-center col s12 no-padding">
                                            <button class="boton-verde __block">{{textos.registro.form.boton_submit}}</button>
                                        </div>
                                    </form>
                                </div>
                                <small class="subtitle" style="cursor:pointer;" ng-click="bazamLogin.ingresar = false">
                                    <b>{{textos.registro.form.cuenta}}</b>
                                </small>
                            </div>

                            <div class="ventajas-loguear col s6">
                                <div ng-repeat="imagen in textos.registro.imagenes">
                                    <md-icon ng-if="imagen.icon" style="display: block; margin-right: 38px; font-size: 50pt;">{{imagen.url_imagen}}</md-icon>

                                    <img ng-if="!imagen.icon" class="{{imagen.class}}" src="/assets/images/iconos_login/{{imagen.url_imagen}}">
                                    <span>
                                        <b>{{imagen.titulo}}</b>
                                        <br>
                                        <small>{{imagen.descripcion}}</small>
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
                            <p class="text-center tercero">{{textos.olvido.titulo}}</p>
                            <small class="subtitle">
                                <B>{{textos.olvido.subtitulo}}</B>
                            </small>
                            <br>
                            <div ng-switch-default>
                                <form name="olvido" ng-submit="bazamLogin.forgotPass(bazamLogin.olvido, olvido.$valid)" novalidate class="formulario-ingreso"
                                    autocomplete="on">
                                    <div class="input-field col s12">

                                        <input type="email" ng-model="bazamLogin.olvido.correo" name="correo" required ng-minlength="5">
                                        <label for="correo">{{textos.olvido.form.correo.label}}</label>
                                    </div>
                                    <div ng-messages="olvido.correo.$error" style="color:maroon" role="alert" ng-show="olvido.$submitted">
                                        <div ng-message="required">{{textos.olvido.form.correo.validaciones[0]}}</div>
                                        <div ng-message="minlength">{{textos.olvido.form.correo.validaciones[1]}}</div>
                                        <div ng-message="email">{{textos.olvido.form.correo.validaciones[2]}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="text-center col s12 no-padding">
                                            <button class="boton-verde __block" ng-click="bazamLogin.formPasos='default'" ng-disabled="bazamLogin.peticion">{{textos.olvido.regresar}}</button>
                                        </div>
                                        <div class="text-center col s12 no-padding"></div>
                                        <button ng-disabled="bazamLogin.peticion" class="boton-verde __block" type="submit">{{textos.olvido.boton_submit}}</button>
                                    </div>
                            </div>
                            </form>
                        </div>
                        <div ng-switch-when="2">
                            <md-input-container class="md-block">
                                <label>{{textos.olvido.codigo.label}}</label>
                                <input style="margin-bottom:0;" type="password" ng-model="bazamLogin.olvido.token">
                            </md-input-container>
                            <div layout layout-align="space-between">
                                <button class="boton-verde" ng-click="bazamLogin.rc=1">{{textos.olvido.regresar}}</button>
                                <button ng-disabled="bazamLogin.peticion" class="boton-verde" ng-click="::bazamLogin.confirmarToken(false)">{{textos.olvido.boton_submit}}</button>
                            </div>
                        </div>
                        <div ng-switch-when="3">
                            <form name="formRecuperar" ng-submit="bazamLogin.confirmarToken(true,formRecuperar.$valid)" novalidate autocomplete="on">
                                <md-input-container class="md-block">
                                    <label>{{textos.olvido.form.contrasena.label}}</label>
                                    <input type="password" style="margin-bottom:0;" ng-model="bazamLogin.olvido.pass" name="pass" required ng-minlength="6">
                                </md-input-container>
                                <div ng-messages="formRecuperar.pass.$error" style="color:maroon" role="alert" ng-show="formRecuperar.$submitted">
                                    <div ng-message="required">{{textos.olvido.form.correo.validaciones[0]}}</div>
                                    <div ng-message="minlength">{{textos.olvido.form.correo.validaciones[1]}}</div>
                                </div>
                                <div layout layout-align="space-between">
                                    <button ng-disabled="bazamLogin.peticion" class="boton-verde" ng-click="bazamLogin.mostrarForm=1">{{textos.olvido.regresar}}</button>
                                    <button ng-disabled="bazamLogin.peticion" class="boton-verde" type="submit">{{textos.olvido.boton_submit}}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>