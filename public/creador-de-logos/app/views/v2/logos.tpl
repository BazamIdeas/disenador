
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8 texto">
                    <h5 class="principal"> MIS LOGOS</h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important; background-color: var(--blanco);overflow: scroll;">
            <div class="row margin-bottom-0">
				
				<div class="col s5 offset-s1">
                    <div class="row caja">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">GUARDADOS</p>
                        <div class="col l1"></div>
                        <div class="col l10">
                            
                        
                            <div class="row cubos-logos-cliente">
                                
                                <div class="col l4" ng-repeat="guardado in logos.guardados track by $index">
                                    <div style="width: 130px; height: 130px;">
                                        <div class="overlay-combinacion"></div>
                                        <span class="editar" ng-click="">
                                            <md-tooltip md-delay="2" md-direction="top">Editar</md-tooltip>
                                            <i class="material-icons">edit</i>
                                        </span>
                                        <span class="compartir">
                                            <md-tooltip md-delay="2" md-direction="top">Compartir</md-tooltip>
                                            <i class="material-icons">share</i>
                                        </span>                                                                
                                        <bazam-visualizar data-svg="logos.base64.decode(guardado.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col l1"></div>


                    </div>
                </div>

				<div class="col s5">
                    <div class="caja">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">ADQUIRIDOS</p>
                       
                        <div class="cubos-logos" ng-repeat="comprado in comprados = (logos.comprados) track by $index" ng-if="$first || (($index+1) % 3) == 0">
                                <div class="margin-right-20" ng-repeat="x in [1,2,3] track by $index" ng-if="$parent.$index < 2 && ((comprados.length - 1) >= $index)">
                                    <div class="overlay-combinacion"></div>
                                    <span class="editar" ui-sref="descargar({id: comprados[$index].idLogo})">
                                        <md-tooltip md-delay="2" md-direction="top">Descargar</md-tooltip>
                                        <i class="material-icons">file_download</i>
                                    </span>
                                    <span class="compartir">
                                        <md-tooltip md-delay="2" md-direction="top">Compartir</md-tooltip>
                                        <i class="material-icons">share</i>
                                    </span>                                                                
                                    <bazam-visualizar data-svg="logos.base64.decode(comprados[$index].logo)"></bazam-visualizar>
                                </div>
                                
                                
                                <div class="margin-right-20" ng-repeat="x in [1,2,3] track by $index" ng-if="$parent.$index >= 2 && ((comprados.length - 1) >= ($parent.$index + $index + 1))">
                                    <div class="overlay-combinacion"></div>
                                    <span class="editar" ui-sref="descargar({id: comprados[$parent.$parent.$index + $index + 1].idLogo})">
                                        <md-tooltip md-delay="2" md-direction="top">Descargar</md-tooltip>
                                        <i class="material-icons">file_download</i>
                                    </span>
                                    <span class="compartir">
                                        <md-tooltip md-delay="2" md-direction="top">Compartir</md-tooltip>
                                        <i class="material-icons">share</i>
                                    </span>                                                                
                                    <bazam-visualizar data-svg="logos.base64.decode(comprados[$parent.$parent.$index + $index + 1].logo)"></bazam-visualizar>
                                </div>

                            </div>
                        
                    </div>
                </div>

            </div>
        </section>


        <div class="overlay" ng-class="{'show': logos.mostrarModalSocial, 'hide': !logos.mostrarModalSocial}"> 
            <div class="row margin-bottom-0">
                <div class="col s6 offset-s3">

                    <div class="login-form-flex"> 

                        <div class="cubo-form row">

                            <i class="material-icons cerrar" ng-click="logos.mostrarModalSocial = false">clear</i>

                            <div class="compartir-iconos col s12">
                                <span><i class="fab fa-facebook-f"></i></span>
                                <span><i class="fab fa-twitter"></i></span>
                                <span><i class="fab fa-google-plus-g"></i></span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>