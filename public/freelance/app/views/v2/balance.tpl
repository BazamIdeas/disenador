
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
							
								<h3 class="saldo">USD {{balance.saldo.deuda}}</h3>
						
						</div>
					</div>
                    
                   <!-- <button class="boton-verde">MIS VENTAS</button>
                    <button class="boton-verde">MIS PAGOS</button>-->
                </div>
                
                

				<div class="col s7">
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
                                    <tr ng-repeat="pago in balance.pagos">
                                   
                                        
                                        <td>{{pago.fecha | date: 'dd-MM-yyyy'}}</td>
                                        <td>{{pago.monto}}</td>
                                        <td>{{pago.medio }}</td>
                                        <td>{{pago.correo}}</td>
                                    </tr>
                                    <tr ng-if="!balance.pagos.length">
                                        <td colspan="4">
                                            No posee pagos
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </section>