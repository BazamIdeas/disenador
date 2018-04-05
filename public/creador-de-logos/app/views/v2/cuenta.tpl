<section style="height: calc(100vh - 135px) !important; background-color: var(--blanco);overflow: scroll;">
    <div class="row margin-bottom-0">

        <div class="col s3 offset-s1">
            <div class="caja datos row">
                <div class="col s12 imagen-perfil" style="margin-top: 10px;">
                    <div ng-if="cuenta.datos.foto && cuenta.verificarBase64(cuenta.datos.foto)">
                        <img ng-src="{{'data:image/svg+xml;base64,' + cuenta.datos.foto}}" ngf-select="cuenta.cargarFoto($file)" ngf-pattern="'image/*'"
                            ngf-accept="'image/*'" ngf-max-size="5MB" ngf-min-height="300" ngf-min-width="300" ngf-resize="{width: 200, height: 200, type: 'image/jpeg',quality: 0.5, ratio: '1:1', centerCrop: true, restoreExif: false}"
                            ngf-fix-orientation="true">
                        <i class="material-icons">file_upload</i>
                    </div>
                    <div ng-if="cuenta.datos.foto && !cuenta.verificarBase64(cuenta.datos.foto)">
                        <img ng-src="{{cuenta.datos.foto}}" ngf-select="cuenta.cargarFoto($file)" ngf-pattern="'image/*'" ngf-accept="'image/*'"
                            ngf-max-size="5MB" ngf-min-height="300" ngf-min-width="300" ngf-resize="{width: 200, height: 200, type: 'image/jpeg',quality: 0.5, ratio: '1:1', centerCrop: true, restoreExif: false}"
                            ngf-fix-orientation="true">
                        <i class="material-icons">file_upload</i>
                    </div>
                </div>
                <div class="col s12">
                    <span class="label">Correo</span>
                    <div class="info">
                        <span>{{::cuenta.datos.correo}}</span>
                    </div>
                </div>
                <div ng-switch="cuenta.formulario">
                    <div ng-switch-when="1">
                        <div class="col s12">
                            <span class="label">Nombre</span>
                            <div class="info">
                                <span>{{::cuenta.datos.nombreCliente}}</span>
                            </div>
                        </div>
                        <div class="col s12">
                            <span class="label">Telefono</span>
                            <div class="info">
                                <span>{{::cuenta.datos.telefono}}</span>
                            </div>
                        </div>
                        <div class="col s12">
                            <span class="label">País</span>
                            <div class="info">
                                <span>{{::cuenta.paises[cuenta.datos.pais]}}</span>
                            </div>
                        </div>
                        <div class="col s12">
                            <div layout layout-align="space-between">
                                <button class="boton-verde" ng-click="cuenta.editar(cuenta.datos)">Editar Datos</button>
                                <button class="boton-verde" ng-click="cuenta.formulario = 3;">Cambiar Contraseña</button>
                            </div>
                        </div>
                    </div>
                    <div ng-switch-when="2">
                        <form name="cuenta.datosForm" novalidate ng-submit="cuenta.guardar(cuenta.datosEspejo, cuenta.datosForm.$valid)">
                            <div class="col s12 input-field">

                                <label for="nombre" class="active">Nombre</label>
                                <input id="nombre" type="text" name="nombreCliente" ng-model="cuenta.datosEspejo.nombreCliente" required>


                                <div ng-messages="cuenta.datosForm.nombreCliente.$error" ng-if="cuenta.datosForm.$submitted || cuenta.datosForm.nombreCliente.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                </div>
                            </div>
                            <div class="col s12 input-field">


                                <input id="telefono" type="text" ng-model="cuenta.datosEspejo.telefono" name="telefono" required>
                                <label for="telefono" class="active">Teléfono</label>

                                <div ng-messages="cuenta.datosForm.telefono.$error" ng-if="cuenta.datosForm.$submitted || cuenta.datosForm.telefono.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                </div>
                            </div>
                            <div class="col s12 input-field">


                                <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;">
                                    <md-select ng-model="cuenta.datosEspejo.pais" placeholder="Pais" required>
                                        <md-option ng-repeat="(llave, valor) in cuenta.paises track by $index" ng-value="::llave" ng-selected="llave == cuenta.datos.pais">{{::valor}}</md-option>
                                    </md-select>
                                </md-input-container>

                            </div>
                            <div class="col s12">
                                <div layout layout-align="space-between">
                                    <button class="boton-verde" ng-click="cuenta.formulario = 1;">Cancelar</button>
                                    <button class="boton-verde" type="submit">Guardar</button>
                                </div>
                            </div>

                        </form>

                    </div>

                    <div ng-switch-when="3">
                        <form name="cambioContra" novalidate ng-submit="cuenta.cambiarContrasena(cuenta.datosOlvido, cambioContra.$valid, true)">
                            <div class="col s12 input-field">
                                <label for="contrasena" class="active">Contraseña Antigua</label>
                                <input id="contrasena" type="text" name="contrasenaCliente" ng-model="cuenta.datosOlvido.passVieja" required ng-minlength="8">
                                <div ng-messages="cambioContra.contrasenaCliente.$error" ng-if="cambioContra.$submitted || cambioContra.contrasenaCliente.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="minlength">Debe tener un minimo de 8 caracteres.</div>
                                </div>
                            </div>

                            <div class="col s12 input-field">
                                <label for="contrasena-nueva" class="active">Contraseña Nueva</label>
                                <input id="contrasena-nueva" type="text" name="contrasenaNueva" ng-model="cuenta.datosOlvido.pass" required ng-minlength="8">
                                <div ng-messages="cambioContra.contrasenaNueva.$error" ng-if="cambioContra.$submitted || cambioContra.contrasenaNueva.$dirty">
                                    <div ng-message="required">Este campo es requerido.</div>
                                    <div ng-message="minlength">Debe tener un minimo de 8 caracteres.</div>
                                </div>
                            </div>

                            <div class="col s12">
                                <div layout layout-align="space-between">
                                    <button ng-disabled="cuenta.peticion" class="boton-verde" ng-click="cuenta.formulario = 1;">Cancelar</button>
                                    <button class="boton-verde" ng-class="{'loading-white': cuenta.peticion}" ng-disabled="cuenta.peticion" type="submit">Cambiar</button>
                                </div>

                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>

        <div class="col s7">
            <div class="caja pedidos" style="padding: 0">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>FECHA</th>
                                <th>ESTADO</th>
                                <th>PLAN</th>
                                <th>PRECIO</th>
                                <th>IMPUESTO</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="pedido in cuenta.pedidos track by pedido.idPedido">
                                <td>{{::pedido.fecha | date: 'dd-MM-yyyy'}}</td>
                                <td>{{::pedido.estado}}</td>
                                <td>{{::pedido.plan}}</td>
                                <td>{{::pedido.moneda + ' ' + pedido.precio}}</td>
                                <td>{{::pedido.moneda}} {{pedido.impuesto ? (pedido.precio * (pedido.impuesto/100)) : 0}} ({{pedido.impuesto}}%)</td>
                                <td>{{::pedido.moneda}} {{pedido.impuesto ? pedido.precio + (pedido.precio * (pedido.impuesto/100))
                                    : pedido.precio}}</td>
                            </tr>
                            <tr ng-if="!cuenta.pedidos.length"> <td colspan="6">NO HA REALIZADO NINGUNA COMPRA</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div>
</section>