
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal">¡FELICIDADES POR TU VENTA!</h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important;overflow: hidden;">
            <div class="row margin-bottom-0" style="overflow: hidden;">

            	<div class="col s3 offset-s1">

                    <div class="row caja ">

                		<p class="tercero text-center">MI LOGO</p>

                		<div class="col l10 offset-l1 logo-final" style="margin-bottom: 30px">
                            <bazam-visualizar data-svg="logoVendido.base64.decode(logoVendido.logo.logo)" ng-if="logoVendido.logo.logo"></bazam-visualizar>
                		</div>

                    </div>

            	</div>
				
				<div class="col s8">		
						
					<div class="row margin-bottom-0" ng-if="logoVendido.logo.atributos['calificacion-admin']">
                        
                        <div class="col s6">
                            <p> Calificación de nuestro Moderador:</p>
                        </div>
                        
                        <div class="col s6">
                        
                            <div class="estrellas">
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] < 1">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] >= 1">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] < 2">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] >= 2">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] < 3">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] >= 3">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] < 4">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] >= 4">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] < 5">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-admin'] >= 5">star</i>
                            </div>
                        
                        </div>
                        
                    
					</div>
                    
                    <div class="row" ng-if="logoVendido.logo.atributos['calificacion-cliente']">
                       
                        <div class="col s6">
                           <p>Calificación del Comprador:</p>
                        </div>
                        
                        <div class="col s6">

                            <div class="estrellas">
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] < 1">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] >= 1">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] < 2">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] >= 2">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] < 3">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] >= 3">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] < 4">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] >= 4">star</i>
    
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] < 5">star_border</i>
                                <i class="material-icons" ng-if="logoVendido.logo.atributos['calificacion-cliente'] >= 5">star</i>
                            </div>
                        
                        </div>
                        
                    
					</div>
                    
                    <div class="row" ng-if="logoVendido.logo.atributos.comentario">
                        
                        <div class="col s12">
                        
                            <p>Comentario:</p>
                            <p style="color: #636363; font-style: italic; font-size: 20px;"> {{'"'+logoVendido.logo.atributos.comentario+'"'}} </p>
                        
                        </div>
                        
                    
					</div>

				</div>

            </div>
        </section>