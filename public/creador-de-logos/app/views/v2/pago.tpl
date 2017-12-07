
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario" ui-sref="comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal">DETALLES DE SU PEDIDO</h5>
                </div>

            </div>
        </section>

        <section style="padding:0 30px;height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">

				
				<div class="col s10 offset-s1" style="padding: 50px 40px 0 40px;">
						
					<div class="row" style="box-shadow: 0px 0px 2px 1px #d4d4d4;">
						
						<div>
							
							<div class="su-pedido primera col s3">
								<div>
									<div class="th">LOGO</div>
									<div class="td">
										<div class="thumbail">
	        								<bazam-visualizar svg="pago.pedido.logo"></bazam-visualizar>
	        							</div>
									</div>
								</div>
							</div>	

							<div class="su-pedido col s2">
								<div>
									<div class="th">PLAN</div>
									<div class="td">{{pago.pedido.plan.nombre}}</div>
								</div>
							</div>						

							<div class="su-pedido col s2">
								<div>
									<div class="th">PRECIO</div>
									<div class="td">{{pago.pedido.precio.moneda.simbolo}} {{pago.pedido.precio.monto}}</div>
								</div>
							</div>	

							<div class="su-pedido col s2">
								<div>
									<div class="th">IMPUESTO</div>
									<div class="td">( {{impuestoTotal = (pago.pedido.precio.monto / pago.pedido.impuesto)}} ) {{pago.pedido.impuesto}}%</div>
								</div>
							</div>	

							<div class="su-pedido final col s3">
								<div>
									<div class="th">TOTAL</div>
									<div class="td">{{pago.pedido.precio.moneda.simbolo}} {{pago.pedido.precio.monto+impuestoTotal}}</div>
								</div>
							</div>	

						</div>

					</div>

					<div class="row">
						
						<div class="col s12" style="padding: 0">

							<p class="principal">Puedes pagar con</p>
						
							<div class="row">
								
								<div class="col s12" style="padding: 0; margin-bottom: 30px;">
									<div class="metodo">
										<div class="icono-metodo">
											<img width="100%" height="100%" src="https://img.purch.com/r/520x520/aHR0cDovL3d3dy50b3B0ZW5yZXZpZXdzLmNvbS9pL3Jldi9wcm9kL2xhcmdlLzY3NjMwLXBheXBhbC1ib3guanBn">
										</div>
										<div class="texto-metodo seleccionado">
											Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500
											<button class="boton-verde pagar">PAGAR</button>
										</div>
									</div>

								</div>

								<div class="col s12" style="padding: 0; margin-bottom: 30px;">
									<div class="metodo">
										<div class="icono-metodo">
											<img width="100%" height="100%" src="https://img.purch.com/r/520x520/aHR0cDovL3d3dy50b3B0ZW5yZXZpZXdzLmNvbS9pL3Jldi9wcm9kL2xhcmdlLzY3NjMwLXBheXBhbC1ib3guanBn">
										</div>
										<div class="texto-metodo">
											Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500
											<button class="boton-verde pagar">PAGAR</button>
										</div>
									</div>

								</div>

							</div>

						</div>

					</div>

				</div>

            </div>
        </section>