<div flex layout layout-margin layout-align="none start">
    <div flex="50" class="listar">

        <!-- LISTAR USUARIOS -->

        <div class="paneles individual md-whiteframe-2dp">
            <div layout layout-align="space-between center" layout-padding>
                <h3 ng-click="usuario.listarU()">LISTAR USUARIOS</h3>
            </div>
            <div ng-show="usuario.mostrarU">
                <div layout class="elemento">
                    <md-input-container flex style="margin-bottom:0;">
                        <input type="text" ng-model="usuario.buscar" class="md-block" aria-label="filtro" placeholder="Buscar:">
                    </md-input-container>
                </div>
                <div class="tabla">
                    <div>Nombre:</div>
                    <div style="flex:2;">Correo:</div>
                    <div>Acciones:</div>
                </div>
                <div layout="column" class="content-scroll">
                    <div layout layout-align="center" ng-show="usuario.loaderMostrar" class="margen_superior">
                        <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                    </div>
                    <div ng-repeat="elemento in usuario.usuarios | filter:usuario.buscar" class="elemento">
                        <div class="tabla-campo">
                            <div class="nombre">{{elemento.nombreUser}}</div>
                            <div style="flex:2;">{{elemento.correo}}</div>
                            <div>
                                <md-button class="md-primary md-raised" ng-click="usuario.modificarUsuario(elemento.idUsuario, elemento.nombreUser)">MODIFICAR</md-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- REGISTRAR USUARIO -->

        <div class="paneles individual md-whiteframe-2dp">
            <div layout layout-align="space-around center" layout-padding>
                <h3 flex ng-click="usuario.mostrarRegistro = true">Registrar Usuario</h3>
                <md-button ng-click="usuario.mostrarRegistro = false" style="margin:0;">
                    <md-icon>keyboard_arrow_left</md-icon>
                </md-button>
            </div>
            <div ng-show="usuario.mostrarRegistro" layout-padding class="formularios-login pasos">
                <form id="formularioRegistro" name="formRegistro" ng-submit="usuario.registrarU(usuario.datos.registrar)" novalidate>
                    <div layout="column" layout-align="space-between">
                        <h3 class="text-center">Registrar</h3>
                        <div>
                            <md-input-container class="md-block">
                                <label>Nombre</label>
                                <input type="text" ng-model="usuario.datos.registrar.nombreUser" name="nombre">
                            </md-input-container>
                            <md-input-container class="md-block">
                                <label>Correo</label>
                                <input type="email" ng-model="usuario.datos.registrar.correo" name="correo">
                            </md-input-container>
                            <md-input-container class="md-block">
                                <label>Contraseña</label>
                                <input type="password" ng-model="usuario.datos.registrar.pass" name="pass">
                            </md-input-container>
                            <md-input-container class="md-block">
                                <label>Teléfono</label>
                                <input type="text" ng-model="usuario.datos.registrar.telefono" name="telefono">
                            </md-input-container>
                            <md-input-container class="md-block">
                                <label>País</label>
                                <input type="text" ng-model="usuario.datos.registrar.pais" name="pais">
                            </md-input-container>
                        </div>
                        <div layout>
                            <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                        </div>
                        <div layout layout-align="center" ng-show="usuario.loaderCargando" class="margen_superior">
                            <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div flex="40" class="paneles md-whiteframe-2dp listar" ng-show="usuario.mostrarMo">

        <!-- MODIFICAR USUARIOS -->

        <div layout layout-align="space-between center" layout-padding>
            <h3>MODIFICAR USUARIO</h3>
            <md-button ng-click="usuario.mostrarMo = false" style="margin:0;">
                <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
        </div>
        <div layout-padding class="formularios-login pasos">
            <form id="formularioModificar" name="formModificar" ng-submit="usuario.modificarU(usuario.datos.modificar)" novalidate>
                <div layout="column" layout-align="space-between">
                    <h3 class="text-center">Modificar {{usuario.uMod}}</h3>
                    <div>
                        <md-input-container class="md-block">
                            <label>Nombre</label>
                            <input type="text" ng-model="usuario.datos.modificar.nombreUser" name="nombre">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Contraseña</label>
                            <input type="password" ng-model="usuario.datos.modificar.pass" name="pass">
                        </md-input-container>
                    </div>
                    <div layout>
                        <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                    </div>
                    <div layout layout-align="center" ng-show="usuario.loaderCargando" class="margen_superior">
                        <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
