        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario" ui-sref="comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal"> CREE SU LOGO PROFESIONAL EN MINUTOS</h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important;">
            <div class="row margin-bottom-0">
                <div class="col" ng-class="{'s2': !principal.datosForm.$valid, 's4': principal.datosForm.$valid}">
                    <div class="row margin-bottom-0">
                        <form class="margin-bottom-0">
                            <div class="col s6 sidebar-1 scroll" ng-form="principal.datosForm">
                                <div class="input-field col s12">
                                    <input id="nombre" type="text"  ng-model="principal.datos.nombre" required>
                                    <label for="nombre" class="active">Nombre</label>
                                </div>
                                <!--
                                <div class="input-field col s12">
                                    <input id="slogan" type="text">
                                    <label for="slogan">Slogan</label>
                                </div> 
                                -->

        						<md-input-container style="width:100%; padding: 0 0.75rem" >
        						  	<md-select ng-model="principal.datos.categoria" placeholder="Categoria" required> 
        						    	<md-option ng-repeat="categoria in principal.categoriasPosibles track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
        						  	</md-select>
        						</md-input-container>

                                <div class=" col s12 preferencias">
                                    <p class="text-center principal" style="margin-top: 1rem;">Preferencias</p>
                                        
                                    <div class="slider-input" ng-repeat="preferencia in principal.datos.preferencias track by $index">                            
                                        <p class="label-slider-input-left">{{preferencia.nombre1}}</p> 
                                        <p class="label-slider-input-right">{{preferencia.nombre2}}</p>
                                        <md-slider ng-model="preferencia.valor" value="2" min="1" max="3"></md-slider>
                                    </div>
                                                  
                                </div>
                            </div>
                        
                            <div class="col s6 sidebar-2" ng-class="{'ocultar': !principal.datosForm.$valid, 'mostrar': principal.datosForm.$valid}">
                                <p class="text-center principal">Forma de su logo</p>

                                <div class="cubo-logo">
                                    <div ng-click="principal.solicitarElementos(principal.botonesTipo[0], principal.datos, principal.datosForm.$valid )" ng-class="{'tipo-inactivo': !principal.botonesTipo[0].activo}">
                                        <span><i class="material-icons">thumb_up</i></span>
                                        <span>TU LOGO</span>
                                    </div>
                                </div>

                                <div class="cubo-logo">
                                    <div ng-click="principal.solicitarElementos(principal.botonesTipo[1], principal.datos, principal.datosForm.$valid)" ng-class="{'tipo-inactivo': !principal.botonesTipo[1].activo}">
                                        <span class="texto">M</span>
                                        <span>TU LOGO</span>
                                    </div>
                                </div>

                                <div class="cubo-logo">
                                    <div ng-click="principal.solicitarElementos(principal.botonesTipo[2], principal.datos, principal.datosForm.$valid)" ng-class="{'tipo-inactivo': !principal.botonesTipo[2].activo}">
                                        <span>TU LOGO</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
				
				<div ui-view class="contenedor-principal col " ng-class="{'s10': !principal.datosForm.$valid, 's8': principal.datosForm.$valid}">
				       
				</div>

            </div>
        </section>