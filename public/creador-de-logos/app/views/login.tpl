<div flex layout="column" ng-cloak >
    <div layout="row" layout-align="center" ng-switch="login.mostrarForm" class="margen_superior margen_inferior">

        <div flex="25" ng-switch-when="1" layout-padding class="md-whiteframe-5dp pasos formularios-login">
            <form name="formLogin" ng-submit="login.login('interno', login.datos.login, formLogin.$valid)" novalidate>

                <div>
                    <h3 class="text-center">Ingresar</h3>
                    <div>
                        <md-input-container class="md-block">
                            <label>Correo</label>
                            <input type="text" ng-model="login.datos.login.correo" name="correo" required ng-minlength="3">
                        </md-input-container>
                        <div ng-messages="formLogin.correo.$error" style="color:maroon" role="alert" ng-show="formLogin.$submitted">
                            <div ng-message="required">Este campo es requerido.</div>
                            <div ng-message="minlength">Debe contener minimo 3 caracteres</div>
                            <div ng-message="email">Debe ser un email válido</div>
                        </div>

                        <md-input-container class="md-block">
                            <label>Contraseña</label>
                            <input type="password" ng-model="login.datos.login.pass" name="pass" required ng-minlength="6">
                        </md-input-container>
                        
                        <div ng-messages="formLogin.pass.$error" style="color:maroon" role="alert" ng-show="formLogin.$submitted">
                            <div ng-message="required">Este campo es requerido.</div>
                            <div ng-message="minlength">Debe contener minimo 6 caracteres</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 ng-click="login.mostrarForm=3">Olvidaste tu contraseña? <b class="login-link-h6">Recuperar</b></h6>
                    <div layout layout-wrap>
                        <h6>No tienes una cuenta?</h6>
                        <h6 ng-click="login.mostrarForm=2"><b  class="login-link-h6">Registrate</b></h6>
                    </div>
                    <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                </div>
                <div class="login-social">
                    <div layout layout-align="center center">
                        <hr class="hr-login">
                        <p>O</p>
                        <hr class="hr-login">
                    </div>
                    <div layout="column" layout-align="center">
                        <md-button class="md-warn md-raised social-facebook md-block">
                            <md-icon class="material-icons icono_radio" style="width:12px; height: 12px; margin-right:10px;" md-svg-src="assets/svg/facebook.svg"></md-icon>Ingresa con Facebook</md-button>
                        <md-button class="md-primary md-raised social-gmail md-block">
                            <md-icon class="material-icons icono_radio" style="width:12px; height: 12px; margin-right:10px;" md-svg-src="assets/svg/gmail.svg"></md-icon>Ingresa con Gmail</md-button>
                    </div>
                </div>
                <div layout layout-align="center" ng-show="login.loaderCargando" class="margen_superior"><md-progress-circular md-mode="indeterminate"  md-diameter="40"></md-progress-circular></div>
            </form>
        </div>

        <div ng-switch-when="2" layout-padding flex="25" class="md-whiteframe-5dp margen_superior margen-inferior pasos">
            <form name="formRegistro">
                <div layout="column" layout-align="space-between">
                    <h3 class="text-center">Registrar</h3>
                    <div>
                        <md-input-container class="md-block">
                            <label>Nombre</label>
                            <input type="text" ng-model="login.datos.registrar.nombreCliente" name="nombre">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Correo</label>
                            <input type="email" ng-model="login.datos.registrar.correo" name="correo">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Contraseña</label>
                            <input type="password" ng-model="login.datos.registrar.pass" name="pass">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Teléfono</label>

                            <input type="text" ng-model="login.datos.registrar.telefono" name="telefono">

                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>País</label>
                            <input type="text" ng-model="login.datos.registrar.pais" name="pais">
                        </md-input-container>

                    </div>
                    <div layout>
                        <md-button class="md-raised md-primary" ng-click="login.registrar(login.datos.registrar)">Enviar</md-button>
                    </div>
                    <div layout layout-align="center" ng-show="login.loaderCargando" class="margen_superior"><md-progress-circular md-mode="indeterminate"  md-diameter="40"></md-progress-circular></div>
                    <div layout layout-wrap>
                        <h5 layout="row">Ya tienes una cuenta? </h5>
                        <h6 class="login-link-h6"><b ng-click="login.mostrarForm=1"> Ingresa</b></h6>
                    </div>
                </div>
            </form>
        </div>
        <div ng-switch-when="3" layout-padding flex="25" class="md-whiteframe-5dp margen_superior margen-inferior pasos">
            <form>
                <h3 class="text-center">Recuperar contraseña</h3>
                <div>
                    <md-input-container class="md-block">
                        <label>Correo</label>
                        <input>
                    </md-input-container>

                    <md-input-container class="md-block">
                        <label>Ingresa el codigo</label>
                        <input>
                    </md-input-container>
                </div>
                <div layout layout-align="space-between">
                    <md-button class="md-raised md-primary">Enviar</md-button>
                    <md-button class="md-raised md-primary" ng-click="login.mostrarForm=1">Regresar</md-button>
                </div>
            </form>
        </div>
    </div>
</div>
