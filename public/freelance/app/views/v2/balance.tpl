
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario" ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8 texto">
                    <h5 class="principal"> MI BALANCE</h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important; background-color: var(--blanco);overflow: scroll;">
            <div class="row margin-bottom-0">

				<div class="col s3 offset-s1">
					<div class="caja datos row">
						<p class="text-center tercero margin-bottom-0 margin-top-0">MI SALDO</p>
						<div class="col s12">
							
								<h3>USD 3000</h3>
						
						</div>
					</div>
                    
                   <!-- <button class="boton-verde">MIS VENTAS</button>
                    <button class="boton-verde">MIS PAGOS</button>-->
                </div>
                
                

				<div class="col s4">
                    <div class="caja pedidos" style="padding: 0">
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>FECHA</th>
                                        <th>MONTO</th>
                                        <th>MÉTODO</th>
                                        <th>CORREO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="pago in [1,2,3,4,5]">
                                        <td>28/04/1994</td>
                                        <td>USD 3000</td>
                                        <td>Paypal</td>
                                        <td>xarias13@gmail.com</td>
                                        
                                        <!--<td>{{pedido.fecha | date: 'dd-MM-yyyy'}}</td>
                                        <td>{{pedido.estado}}</td>
                                        <td>{{pedido.plan}}</td>
                                        <td>{{pedido.moneda + ' ' + pedido.precio}}</td>
                                        <td>{{pedido.moneda}} {{pedido.impuesto ?  (pedido.precio * (pedido.impuesto/100)) : 0}} ({{pedido.impuesto}}%)</td>
                                        <td>{{pedido.moneda}} {{pedido.impuesto ?  pedido.precio + (pedido.precio * (pedido.impuesto/100)) : pedido.precio}}</td>-->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </section>