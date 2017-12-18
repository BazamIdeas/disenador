        <section class="sub-menu">
            <div class="row margin-bottom-0">

                <div class="col s12 titulo">
                    <h6 class="principal"> MI CUENTA</h6>
                </div>

                <div class="col s6 login tab" ng-class="{'active': cuenta.tab == 1}" ng-click="cuenta.tab = 1">
                    <h5 class="principal"> Mis datos </h5>
                </div>
                <div class="col s6 registro tab" ng-class="{'active': cuenta.tab == 2}" ng-click="cuenta.tab = 2">
                    <h5 class="principal"> Ultimos pedidos </h5>
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
								<span>danieljtorres94@gmail.com</span>
							</div>
						</div>
						<div class="col s12">
							<span class="label">Nombre</span>
							<div class="info">
								<span>Daniel Torres</span>
							</div>
						</div>
						<div class="col s12">
							<span class="label">Telefono</span>
							<div class="info">
								<span>123456789</span>
							</div>
						</div>
						<div class="col s12">
							<span class="label">País</span>
							<div class="info">
								<span>Venezuela</span>
							</div>
						</div>
						<div class="col s12">
							<span class="label">Contraseña</span>
							<div class="info">
								<span>********</span>
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
                                        <th>PEDIDO</th>
                                        <th>FECHA</th>
                                        <th>ESTADO</th>
                                        <th>PLAN</th>
                                        <th>PRECIO</th>
                                        <th>IMPUESTO</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#1</td>
                                        <td>11/06/2017</td>
                                        <td>COMPLETADO</td>
                                        <td>PLAN BASICO</td>
                                        <td>$ 510</td>
                                        <td>$ 51 (10%)</td>
                                        <td>$ 561</td>
                                    </tr>
                                    <tr>
                                        <td>#2</td>
                                        <td>11/06/2017</td>
                                        <td>COMPLETADO</td>
                                        <td>PLAN BASICO</td>
                                        <td>$ 510</td>
                                        <td>$ 51 (10%)</td>
                                        <td>$ 561</td>
                                    </tr>
                                    <tr>
                                        <td>#3</td>
                                        <td>11/06/2017</td>
                                        <td>COMPLETADO</td>
                                        <td>PLAN BASICO</td>
                                        <td>$ 510</td>
                                        <td>$ 51 (10%)</td>
                                        <td>$ 561</td>
                                    </tr>
                                    <tr>
                                        <td>#4</td>
                                        <td>11/06/2017</td>
                                        <td>COMPLETADO</td>
                                        <td>PLAN BASICO</td>
                                        <td>$ 510</td>
                                        <td>$ 51 (10%)</td>
                                        <td>$ 561</td>
                                    </tr>
                                    <tr>
                                        <td>#5</td>
                                        <td>11/06/2017</td>
                                        <td>COMPLETADO</td>
                                        <td>PLAN BASICO</td>
                                        <td>$ 510</td>
                                        <td>$ 51 (10%)</td>
                                        <td>$ 561</td>
                                    </tr>
                                    <tr>
                                        <td>#6</td>
                                        <td>11/06/2017</td>
                                        <td>COMPLETADO</td>
                                        <td>PLAN BASICO</td>
                                        <td>$ 510</td>
                                        <td>$ 51 (10%)</td>
                                        <td>$ 561</td>
                                    </tr>
                                    <tr>
                                        <td>#7</td>
                                        <td>11/06/2017</td>
                                        <td>COMPLETADO</td>
                                        <td>PLAN BASICO</td>
                                        <td>$ 510</td>
                                        <td>$ 51 (10%)</td>
                                        <td>$ 561</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </section>