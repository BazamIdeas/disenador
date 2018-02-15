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
                    
                    <div ng-if="pagoCompleto.atributos.padre && pagoCompleto.atributos.calificacion === false" ng-form="pagoCompleto.calificacionForm" >
                        <div> <p> Califica tu plantilla: </p> </div>
                                                    
                        <div class="estrellas">
                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa < 1" ng-mouseover="pagoCompleto.calificacionTentativa = 1">star_border</i>
                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa >= 1" ng-mouseover="pagoCompleto.calificacionTentativa = 1">star</i>

                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa < 2" ng-mouseover="pagoCompleto.calificacionTentativa = 2">star_border</i>
                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa >= 2" ng-mouseover="pagoCompleto.calificacionTentativa = 2">star</i>

                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa < 3" ng-mouseover="pagoCompleto.calificacionTentativa = 3">star_border</i>
                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa >= 3" ng-mouseover="pagoCompleto.calificacionTentativa = 3">star</i>

                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa < 4" ng-mouseover="pagoCompleto.calificacionTentativa = 4">star_border</i>
                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa >= 4" ng-mouseover="pagoCompleto.calificacionTentativa = 4">star</i>

                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa < 5" ng-mouseover="pagoCompleto.calificacionTentativa = 5">star_border</i>
                            <i class="material-icons" ng-if="pagoCompleto.calificacionTentativa >= 5" ng-mouseover="pagoCompleto.calificacionTentativa = 5">star</i>
                        </div>

                        <p> ¡{{pagoCompleto.calificacionTentativa}} Estrellas! </p>
                        <div class="input-field">
                            <textarea ng-model="pagoCompleto.comentario" placeholder="¿Que opinas?" name="comentario"  minlength="5" required></textarea>
                        
                            <div ng-messages="pagoCompleto.calificacionForm.comentario.$error" ng-if="pagoCompleto.calificacionForm.$submitted || pagoCompleto.calificacionForm.comentario.$dirty">
                                <div ng-message="required" style="top: 45px;">Este campo es requerido.</div>
                                <div ng-message="minlength" style="top: 45px;">Debe tener más de 5 carácteres.</div>
                            </div>
                        </div>
                        
                        <button class="boton-verde" ng-click="pagoCompleto.calificar(pagoCompleto.calificacionTentativa, pagoCompleto.comentario, pagoCompleto.calificacionForm.$valid);pagoCompleto.calificacionForm.$setSubmitted()" type="submit">CALIFICAR</button>
                        
                        
                    </div>
                    
                    <button ng-if="!pagoCompleto.atributos.padre || (pagoCompleto.atributos.padre && pagoCompleto.atributos.calificacion)" class="boton-verde" ui-sref="logos">Ver mis logos</button>
	
				</div>

            </div>
        </section>