<div flex layout="column">
    <div layout="row" layout-align="center" ng-switch="login.mostrarForm" class="margen_superior margen_inferior">
        <div flex="25" ng-switch-default layout-padding class="pasos formularios-login">
            <form name="formLogin" ng-submit="login.login(login.datos.login, formLogin.$valid)" novalidate>
                <div>
                    <h3 class="text-center">Ingresar</h3>
                    <div>
                        <md-input-container class="md-block">
                            <label>Correo</label>
                            <input type="email" ng-model="login.datos.login.correo" name="correo" required ng-minlength="3">
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
                    <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                </div>
                <div layout layout-align="center" ng-show="login.loaderCargando" class="margen_superior">
                    <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                </div>
            </form>
        </div>
        <div ng-switch-when="3" layout-padding flex="25" class=" formularios-login md-whiteframe-5dp margen_superior margen-inferior pasos">
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
