
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
						
					<div class="row">
                        
                        <div class="col s4">
                            Calificación de nuestro Moderador:
                        </div>
                        
                        <div class="col s6">
                        
                            <div class="estrellas">
                                <div ng-class="{'estrella-llena': (logoVendido.logo.atributos['calificacion-admin']  | number) > 0, 'estrella-vacia': (logoVendido.logo.atributos['calificacion-admin'] | number) < 1}"></div>

                                <div ng-class="{'estrella-llena': (logoVendido.logo.atributos['calificacion-admin']  | number) > 1, 'estrella-vacia': (logoVendido.logo.atributos['calificacion-admin'] | number) < 2}"></div>

                                <div ng-class="{'estrella-llena': (logoVendido.logo.atributos['calificacion-admin']  | number) > 2, 'estrella-vacia': (logoVendido.logo.atributos['calificacion-admin'] | number) < 3}"></div>

                                <div ng-class="{'estrella-llena': (logoVendido.logo.atributos['calificacion-admin']  | number) > 3, 'estrella-vacia': (logoVendido.logo.atributos['calificacion-admin'] | number) < 4}"></div>

                                <div ng-class="{'estrella-llena': (logoVendido.logo.atributos['calificacion-admin'] | number) > 4, 'estrella-vacia': (logoVendido.logo.atributos['calificacion-admin'] | number) < 5}"></div>

                            </div>
                        
                        </div>
                        
                    
					</div>
                    
                    <div class="row">
                       
                        <div class="col s4">
                            Calificación del Comprador:
                        </div>
                        
                        <div class="col s6">
                        
                            <div class="estrellas">
                                <div ng-class="{'estrella-llena': logoVendido.logo.atributos['calificacion-cliente'] >= 1, 'estrella-vacia': logoVendido.logo.atributos['calificacion-cliente'] < 1}"></div>

                                <div ng-class="{'estrella-llena': logoVendido.logo.atributos['calificacion-cliente'] >= 2, 'estrella-vacia': logoVendido.logo.atributos['calificacion-cliente'] < 2}"></div>

                                <div ng-class="{'estrella-llena': logoVendido.logo.atributos['calificacion-cliente'] >= 3, 'estrella-vacia': logoVendido.logo.atributos['calificacion-cliente'] < 3}"></div>

                                <div ng-class="{'estrella-llena': logoVendido.logo.atributos['calificacion-cliente'] >= 4, 'estrella-vacia': logoVendido.logo.atributos['calificacion-cliente'] < 4}"></div>

                                <div ng-class="{'estrella-llena': logoVendido.logo.atributos['calificacion-cliente'] >= 5, 'estrella-vacia': logoVendido.logo.atributos['calificacion-cliente'] < 5}"></div>

                            </div>
                        
                        </div>
                        
                    
					</div>
                    
                    <div class="row">
                        
                        <div class="col s12">
                        
                            {{'"'+logoVendido.logo.atributos.comentario+'"'}}
                        
                        </div>
                        
                    
					</div>

				</div>

            </div>
        </section>