
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario" ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8 texto">
                    <h5 class="principal"> MI CUENTA</h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important; background-color: var(--blanco);overflow: scroll;">
            
            
            <div class="row margin-bottom-0">

				<div class="col s3 offset-s1">
					<div class="caja datos row">
						<p class="text-center tercero margin-bottom-0 margin-top-0">MIS DATOS </p>
						<div class="col s12">
							<span class="label">Correo</span>
							<div class="info">
								<span>{{cuenta.datos.correo}}</span>
							</div>
						</div>
                        <div ng-switch="cuenta.formulario">
                            <div ng-switch-when="1">
                                <div class="col s12">
                                    <span class="label">Nombre</span>
                                    <div class="info">
                                        <span>{{cuenta.datos.nombreCliente}}</span>
                                    </div>
                                </div>
                                <div class="col s12">
                                    <span class="label">Telefono</span>
                                    <div class="info">
                                        <span>{{cuenta.datos.telefono}}</span>
                                    </div>
                                </div>
                                <div class="col s12">
                                    <span class="label">País</span>
                                    <div class="info">
                                        <span>{{cuenta.paises[cuenta.datos.pais]}}</span>
                                    </div>
                                </div>
                                 <div class="col s12">
                                    <button class="boton-verde" ng-click="cuenta.editar(cuenta.datos)">EDITAR</button>
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
                                                <md-option ng-repeat="(llave, valor) in cuenta.paises track by $index" ng-value="llave"  ng-selected="llave == cuenta.datos.pais">{{valor}}</md-option>
                                            </md-select>
                                        </md-input-container>
	                                  
                                    </div>
                                    <div class="col s12">
                                        <button class="boton-verde" type="submit" >Guardar</button>
                                        <button class="boton-verde" ng-click="cuenta.formulario = 1;">Cancelar</button>
                                    </div>  
                                    
                                </form>

                            </div>
                            
                        </div>
					</div>
                </div>
                
                <div class="col s3">
                    <div class="caja datos row" style="padding: 0">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">AGREGAR MÉTODO DE COBRO</p>
						<form name="cuenta.metodosForm" novalidate ng-submit="cuenta.guardarFacturacion(cuenta.datosMetodo, cuenta.metodosForm.$valid)">
                                    <div class="col s12 input-field">
                                        
                                        <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;">
                                            <md-select md-no-asterisk ng-model="cuenta.datosMetodo.nombre" placeholder="Método de cobro" name="nombreMetodo" required> 
                                                <md-option ng-repeat="metodo in ['Paypal', 'Uphold']" ng-value="metodo" >{{metodo}}</md-option>
                                            </md-select>
                                        </md-input-container>
	                                    
                                        
                                        <div ng-messages="cuenta.datosMetodo.nombreMetodo.$error" ng-if="cuenta.metodosForm.$submitted || cuenta.metodosForm.nombreMetodo.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                        </div>
                                    </div>
                                    <div class="col s12 input-field" style="margin-top: 30px">
                                        
                                        
                                        <input id="correoMetodo" type="email" ng-model="cuenta.datosMetodo.email" name="correoMetodo" required>
	                                    <label for="correoMetodo">Correo</label>
                                        
                                        <div ng-messages="cuenta.metodosForm.correoMetodo.$error" ng-if="cuenta.metodosForm.$submitted || cuenta.metodosForm.correoMetodo.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="email">Debe ser un email válido.</div>
                                        </div>
                                    </div>
                                    
                                    <div class="col s12">
                                        <button class="boton-verde" type="submit">Guardar</button>
                                    </div>  
                                    
                                </form>
                        <!--<div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>AGREGAR MÉTODO DE COBRO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="pedido in cuenta.pedidos">
                                        <td>{{pedido.fecha | date: 'dd-MM-yyyy'}}</td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                        </div>-->
                    </div>
                
                </div>

				<div class="col s4">
                    <div class="caja pedidos" style="padding: 0">
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>MÉTODO</th>
                                        <th>CORREO</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="facturacion in cuenta.facturacion">
                                        <td>{{facturacion.medio}}</td>
                                        <td>{{facturacion.correo}}</td>
                                        <td>
                                            <button class="boton-verde" ng-click="cuenta.eliminarFacturacion(facturacion.idFacturacion)">ELIMINAR</button>
                                        </td>
                                        
                                        <!--<td>{{pedido.fecha | date: 'dd-MM-yyyy'}}</td>
                                        <td>{{pedido.estado}}</td>
                                        <td>{{pedido.plan}}</td>
                                        <td>{{pedido.moneda + ' ' + pedido.precio}}</td>
                                        <td>{{pedido.moneda}} {{pedido.impuesto ?  (pedido.precio * (pedido.impuesto/100)) : 0}} ({{pedido.impuesto}}%)</td>
                                        <td>{{pedido.moneda}} {{pedido.impuesto ?  pedido.precio + (pedido.precio * (pedido.impuesto/100)) : pedido.precio}}</td>-->
                                    </tr>
                                    <tr ng-if="!cuenta.facturacion.length">
                                        <td colspan="3">
                                            No posee metodos de cobro
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </section>