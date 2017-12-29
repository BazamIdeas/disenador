  <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8 texto">
                    <h5 class="principal">¡Felicidades! Ha comprado un logo exitosamente</h5>
                </div>

            </div>
        </section>

        <section style="padding:0 30px;height: calc(100vh - 135px) !important; background-color: var(--fondo);overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;" ng-if="pagoCompleto.logo.logo">

				<div class="col l4 offset-l4 xl4 offset-xl4" style="padding: 50px 40px 0 40px; text-align: center;">
					<div style="width: 200px; margin: 0 auto;width: 200px;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px #d4d4d4;">
                        <bazam-visualizar data-svg="pagoCompleto.base64.decode(pagoCompleto.logo.logo)" ></bazam-visualizar>
                    </div>
                    
                    <button class="boton-verde" ui-sref="logos">Ver mis logos</button>
	
				</div>

            </div>
        </section>