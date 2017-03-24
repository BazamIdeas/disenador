<div flex layout="column">
    <div layout="row" layout-align="center" ng-switch="login.mostrarForm">
        <div flex="25" ng-switch-when="1" layout-padding class="md-whiteframe-5dp margen_superior margen-inferior pasos">
            <form>
                <div>
                    <h3 class="text-center">Ingresar</h3>
                    <div>
                        <md-input-container class="md-block">
                            <label>Correo</label>
                            <input type="text" ng-model="login.datosLogin.correo">
                        </md-input-container>

                        <md-input-container class="md-block">
                            <label>Contraseña</label>
                            <input type="password" ng-model="login.datosLogin.pass">
                        </md-input-container>
                    </div>
                </div>
                <div>
                    <h6 ng-click="login.mostrarForm=3">Olvidaste tu contraseña? <b class="login-link-h6">Recuperar</b></h6>
                    <div layout layout-wrap>
                        <h6>No tienes una cuenta?</h6>
                        <h6 class="login-link-h6" ng-click="login.mostrarForm=2"><b>Registrate</b></h6>
                    </div>
                    <md-button class="md-raised md-primary" ng-click="login.login('interno', login.datosLogin)">Enviar</md-button>
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
            </form>
        </div>
        <div ng-switch-when="2" layout-padding flex="25" class="md-whiteframe-5dp margen_superior margen-inferior pasos">
            <form>
                <div layout="column" layout-align="space-between">
                    <h3 class="text-center">Registrar</h3>
                    <div layout="column" layout-align="space-around">
                        <md-input-container class="md-block">
                            <label>Nombre</label>
                            <input type="text" ng-model="login.datosRegistrar.nombreCliente">
                        </md-input-container>

                        <md-input-container class="md-block">
                            <label>Correo</label>
                            <input type="text" ng-model="login.datosRegistrar.correo">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Contraseña</label>
                            <input type="password" ng-model="login.datosRegistrar.pass">

                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Teléfono</label>
                            <input type="text" ng-model="login.datosRegistrar.telefono">

                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>País</label>
                            <input type="text" ng-model="login.datosRegistrar.pais">

                        </md-input-container>
                        
                    </div>
                    <div layout layout-align="space-between">
                        <md-button class="md-raised md-primary" ng-click="login.registrar(login.datosRegistrar)">Enviar</md-button>
                        <md-button class="md-raised md-warn" ng-click="login.mostrarForm=1">Regresar</md-button>
                    </div>
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
