<section class="body cuenta">
    <div class="row">
        <div class="col s3 sidebar-avatar">
            <div class="col s12 avatar">
                <div ng-if="cuenta.datos.foto && cuenta.verificarBase64(cuenta.datos.foto)">
                    <img ng-src="{{'data:image/png;base64,' + cuenta.datos.foto}}" ngf-select="cuenta.cargarFoto($file)" ngf-pattern="'image/*'"
                        ngf-accept="'image/*'" ngf-max-size="5MB" ngf-min-height="300" ngf-min-width="300" ngf-resize="{width: 200, height: 200, type: 'image/jpeg',quality: 0.5, ratio: '1:1', centerCrop: true, restoreExif: false}"
                        ngf-fix-orientation="true">
                    <i ngf-select="cuenta.cargarFoto($file)" ngf-pattern="'image/*'"
                    ngf-accept="'image/*'" ngf-max-size="5MB" ngf-min-height="300" ngf-min-width="300" ngf-resize="{width: 200, height: 200, type: 'image/jpeg',quality: 0.5, ratio: '1:1', centerCrop: true, restoreExif: false}"
                    ngf-fix-orientation="true" class="material-icons" ng-class="{'loading-white-100': cuenta.cargandoFoto}">edit</i>
                </div>
                <div ng-if="cuenta.datos.foto && !cuenta.verificarBase64(cuenta.datos.foto)">
                    <img ng-src="{{cuenta.datos.foto}}" ngf-select="cuenta.cargarFoto($file)" ngf-pattern="'image/*'" ngf-accept="'image/*'"
                        ngf-max-size="5MB" ngf-min-height="300" ngf-min-width="300" ngf-resize="{width: 200, height: 200, type: 'image/jpeg',quality: 0.5, ratio: '1:1', centerCrop: true, restoreExif: false}"
                        ngf-fix-orientation="true">
                    <i ngf-select="cuenta.cargarFoto($file)" ngf-pattern="'image/*'" ngf-accept="'image/*'"
                    ngf-max-size="5MB" ngf-min-height="300" ngf-min-width="300" ngf-resize="{width: 200, height: 200, type: 'image/jpeg',quality: 0.5, ratio: '1:1', centerCrop: true, restoreExif: false}"
                    ngf-fix-orientation="true" class="material-icons" ng-class="{'loading-white-100': cuenta.cargandoFoto}">edit</i>
                </div>
            </div>
            <div class="col s12 hr no-padding">
                <hr style="margin: 5px 0px; height: 0;">
            </div>
            <div class="col s12 info">
                <span class="label">{{::cuenta.lang[0]}}</span>
                <div class="value">
                    <span>{{::cuenta.datos.correo}}</span>
                </div>
            </div>
            <div ng-switch="cuenta.formulario">
                <div ng-switch-when="1">
                    <div class="col s12 info">
                        <span class="label">{{::cuenta.lang[1]}}</span>
                        <div class="value">
                            <span>{{::cuenta.datos.nombreCliente}}</span>
                        </div>
                    </div>
                    <div class="col s12 info">
                        <span class="label">{{::cuenta.lang[2]}}</span>
                        <div class="value">
                            <span>{{::cuenta.datos.telefono}}</span>
                        </div>
                    </div>
                    <div class="col s12 info">
                        <span class="label">{{::cuenta.lang[3]}}</span>
                        <div class="value">
                            <span>{{::cuenta.paises[cuenta.datos.pais]}}</span>
                        </div>
                    </div>
                    <div class="col s12 info">
                        <button style="width: 100%; margin: 10px 0 !important;" ng-click="cuenta.editar(cuenta.datos)">{{::cuenta.lang[4]}}</button>
                    </div>
                    <div class="col s12 info">   
                        <button style="width: 100%;" ng-click="cuenta.formulario = 3;">{{::cuenta.lang[5]}}</button>
                    </div>
                </div>
                <div ng-switch-when="2">
                    <form name="cuenta.datosForm" novalidate ng-submit="cuenta.guardar(cuenta.datosEspejo, cuenta.datosForm.$valid)">
                        <div class="col s12 input-field no-padding" >
                            <input id="nombre" type="text" name="nombreCliente" ng-model="cuenta.datosEspejo.nombreCliente" required>
                            <label for="nombre" class="active">{{::cuenta.lang[1]}}</label>
                            
                            <div ng-messages="cuenta.datosForm.nombreCliente.$error" ng-if="cuenta.datosForm.$submitted || cuenta.datosForm.nombreCliente.$dirty">
                                <div ng-message="required">{{::cuenta.lang[6]}}</div>
                            </div>
                        </div>
                        <div class="col s12 input-field no-padding">
                            <input id="telefono" type="text" ng-model="cuenta.datosEspejo.telefono" name="telefono" required>
                            <label for="telefono" class="active">{{::cuenta.lang[2]}}</label>

                            <div ng-messages="cuenta.datosForm.telefono.$error" ng-if="cuenta.datosForm.$submitted || cuenta.datosForm.telefono.$dirty">
                                <div ng-message="required">{{::cuenta.lang[6]}}</div>
                            </div>
                        </div>
                        <div class="col s12 input-field">
                            <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;">
                                <md-select ng-model="cuenta.datosEspejo.pais" placeholder="Pais" required>
                                    <md-option ng-repeat="(llave, valor) in cuenta.paises track by $index" ng-value="::llave" ng-selected="llave == cuenta.datos.pais">{{::valor}}</md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div class="col s12 no-padding">
                            <button style="width: 100%;" type="submit">{{::cuenta.lang[7]}}</button>
                        </div>
                        <div class="col s12 no-padding">
                            <button style="width: 100%; margin: 10px 0 !important;" ng-click="cuenta.formulario = 1;">{{::cuenta.lang[8]}}</button>
                        </div>

                    </form>

                </div>

                <div ng-switch-when="3">
                    <form name="cambioContra" novalidate ng-submit="cuenta.cambiarContrasena(cuenta.datosOlvido, cambioContra.$valid, true)">
                        <div class="col s12 input-field" style="padding: 0 !important">
                            <label for="contrasena" class="active">{{::cuenta.lang[9]}}</label>
                            <input id="contrasena" type="text" name="contrasenaCliente" ng-model="cuenta.datosOlvido.passVieja" required ng-minlength="8">
                            <div ng-messages="cambioContra.contrasenaCliente.$error" ng-if="cambioContra.$submitted || cambioContra.contrasenaCliente.$dirty">
                                <div ng-message="required">{{::cuenta.lang[6]}}</div>
                                <div ng-message="minlength">{{::cuenta.lang[10]}}</div>
                            </div>
                        </div>

                        <div class="col s12 input-field no-padding" >
                            <label for="contrasena-nueva" class="active">{{::cuenta.lang[11]}}</label>
                            <input id="contrasena-nueva" type="text" name="contrasenaNueva" ng-model="cuenta.datosOlvido.pass" required ng-minlength="8">
                            <div ng-messages="cambioContra.contrasenaNueva.$error" ng-if="cambioContra.$submitted || cambioContra.contrasenaNueva.$dirty">
                                <div ng-message="required">{{::cuenta.lang[6]}}</div>
                                <div ng-message="minlength">{{::cuenta.lang[10]}}</div>
                            </div>
                        </div>

                        
                        <div class="col s12 no-padding">
                            <button style="width: 100%;" ng-class="{'loading-white': cuenta.peticion}" ng-disabled="cuenta.peticion" type="submit">{{::cuenta.lang[12]}}</button>
                        </div>
                        <div class="col s12 no-padding">
                            <button style="width: 100%; margin: 10px 0 !important;" ng-disabled="cuenta.peticion" ng-click="cuenta.formulario = 1;">{{::cuenta.lang[8]}}</button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
        <div class="col s9 orders">
            <div class="table">
                <table>
                    <thead>
                        <tr>
                            <th>{{::cuenta.lang[13]}}</th>
                            <th>{{::cuenta.lang[14]}}</th>
                            <th>{{::cuenta.lang[15]}}</th>
                            <th>{{::cuenta.lang[16]}}</th>
                            <th>{{::cuenta.lang[17]}}</th>
                            <th>{{::cuenta.lang[18]}}</th>
                            <th>{{::cuenta.lang[19]}}</th>
                            <th>{{::cuenta.lang[20]}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="pedido in cuenta.pedidos track by pedido.idPedido" ng-class="{'odd' : $index % 2 != 0, 'even' : $index % 2 == 0}" >
                            <td>{{::pedido.idPedido}}</td>
                            <td>{{::pedido.fecha | date: 'dd/MM/yyyy'}}</td>
                            <td style="text-transform: capitalize;">{{::pedido.estado | lowercase}}</td>
                            <td><a ui-sref="descargar({id: pedido.idLogo})">{{::pedido.idLogo}}</a></td>
                            <td>{{::pedido.plan}}</td>
                            <td style="color: var(--tercero)">{{::pedido.moneda + ' ' + pedido.precio}}</td>
                            <td style="color: var(--tercero)">{{::pedido.moneda}} {{pedido.impuesto ? (pedido.precio * (pedido.impuesto/100)) : 0}} ({{pedido.impuesto}}%)
                            </td>
                            <td style="color: var(--tercero)">{{::pedido.moneda}} {{pedido.impuesto ? pedido.precio + (pedido.precio * (pedido.impuesto/100))
                                : pedido.precio}}</td>
                        </tr>
                        <tr ng-if="!cuenta.pedidos.length">
                            <td colspan="8">{{::cuenta.lang[21]}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>