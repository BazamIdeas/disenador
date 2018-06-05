<div ng-controller="headerController as h" style="background: white;">
    <bazam-form-login mostrar="h.mostrarLogin" callback="h.callback" opcion="h.opcionMostrarLogin"></bazam-form-login>
    <header class="header" id="comienzo" layout-padding>
        <div layout layout-align="space-between">
            <div class="logo grande" ui-sref="comienzo">
                <img src="/landing/assets/img/logo.pro.svg">
            </div>
            <div layout flex layout-align="end center">
                <div ng-switch="h.autorizado" class="login" ng-cloak>
                    <div ng-switch-when="false" class="acceder not-ing" style="cursor: pointer">
                        <span ng-click="h.opcionMostrarLogin = false; h.mostrarLogin = true">Acceder</span>
                        <span ng-click="h.opcionMostrarLogin = true;h.mostrarLogin = true">Registro</span>
                    </div>
                    <div ng-switch-default class="acceder" style="cursor: pointer">
                        <span ng-click="h.navegar.cliente('')">
                            <md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Crear logo</md-tooltip>
                            <i class="material-icons">add_circle_outline</i>
                        </span>
                        <span ng-click="h.navegar.cliente('logos')">
                            <md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Tus logos</md-tooltip>
                            <i class="material-icons">favorite</i>
                        </span>
                        <span ng-click="h.navegar.cliente('cuenta')">
                            <md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Mi cuenta</md-tooltip>
                            <i class="material-icons">account_circle</i>
                        </span>
                        <span ng-click="h.salir()">
                            <md-tooltip class="tooltip-header" md-delay="2" md-direction="bottom">Cerrar Sesion</md-tooltip>
                            <i class="material-icons">power_settings_new</i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</div>