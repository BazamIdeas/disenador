
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario" ui-sref="comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
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
								<span>Venezuela</span>
							</div>
                        </div>

						<div class="col s12">
							<button class="boton-verde">EDITAR</button>
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
                                    <tr ng-repeat="pedido in cuenta.pedidos">
                                        <td>{{pedido.fecha | date: 'dd-MM-yyyy'}}</td>
                                        <td>{{pedido.estado}}</td>
                                        <td>{{pedido.plan}}</td>
                                        <td>{{pedido.moneda + ' ' + pedido.precio}}</td>
                                        <td>{{pedido.moneda}} {{pedido.impuesto ?  (pedido.precio/pedido.impuesto) : "0"}} ({{pedido.impuesto}}%)</td>
                                        <td>{{pedido.moneda}} {{pedido.impuesto ?   pedido.precio + (pedido.precio/pedido.impuesto) : pedido.precio}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </section>