  <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal">DETALLES DE SU PEDIDO</h5>
                </div>

            </div>
        </section>

        <section style="padding:0 30px;height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;" ng-if="pagoCompleto.logo.logo">

				¡Felicidades! Ha comprado un logo exitosamente
				<div class="col s10 offset-s1" style="padding: 50px 40px 0 40px;">
					<div style="width: 200px">
                        <bazam-visualizar data-svg="pagoCompleto.base64.decode(pagoCompleto.logo.logo)" ></bazam-visualizar>
                    </div>
                    
                    <button ui-sref="logos">Ver mis logos</button>
	
				</div>

            </div>
        </section>