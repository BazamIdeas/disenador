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
					<div style="width: 200px; margin: 0 auto;width: 200px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0px 0px 2px 1px #d4d4d4;">
                        <bazam-visualizar data-svg="pagoCompleto.base64.decode(pagoCompleto.logo.logo)" ></bazam-visualizar>
                    </div>
                    
                    <div ng-if="pagoCompleto.atributos.padre && !pagoCompleto.atributos.calificacion">
                        <div>Califica tu plantilla:</div>
                        
                        <div class="estrellas">
                            <div ng-click="pagoCompleto.calificar(1)" ng-mouseover="pagoCompleto.calificacionTentativa = 1" ng-class="{'estrella-llena': pagoCompleto.calificacionTentativa >= 1, 'estrella-vacia': pagoCompleto.calificacionTentativa < 1}" class="estrella-llena"></div>
                            <div ng-click="pagoCompleto.calificar(2)" ng-mouseover="pagoCompleto.calificacionTentativa = 2" ng-class="{'estrella-llena': pagoCompleto.calificacionTentativa >= 2, 'estrella-vacia': pagoCompleto.calificacionTentativa < 2}" class="estrella-llena"></div>
                            <div ng-click="pagoCompleto.calificar(3)" ng-mouseover="pagoCompleto.calificacionTentativa = 3" ng-class="{'estrella-llena': pagoCompleto.calificacionTentativa >= 3, 'estrella-vacia': pagoCompleto.calificacionTentativa < 3}" class="estrella-llena"></div>
                            <div ng-click="pagoCompleto.calificar(4)" ng-mouseover="pagoCompleto.calificacionTentativa = 4" ng-class="{'estrella-llena': pagoCompleto.calificacionTentativa >= 4, 'estrella-vacia': pagoCompleto.calificacionTentativa < 4}" class="estrella-llena"></div>
                            <div ng-click="pagoCompleto.calificar(5)" ng-mouseover="pagoCompleto.calificacionTentativa = 5" ng-class="{'estrella-llena': pagoCompleto.calificacionTentativa >= 5, 'estrella-vacia': pagoCompleto.calificacionTentativa < 5}" class="estrella-vacia"></div>
                        </div>
                        
                        ¡{{pagoCompleto.calificacionTentativa}} Estrellas!
                        
                        
                    </div>
                    
                    <button ng-if="!pagoCompleto.atributos.padre || (pagoCompleto.atributos.padre && pagoCompleto.atributos.calificacion)" class="boton-verde" ui-sref="logos">Ver mis logos</button>
	
				</div>

            </div>
        </section>