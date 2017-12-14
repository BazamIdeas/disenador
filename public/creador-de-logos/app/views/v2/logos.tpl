
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

        <section class="scrollbar-dynamic section-cliente" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
            <div class="row margin-bottom-0">
				
				<div class="col l6 xl5 offset-xl1">
                    <div class="row caja">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">GUARDADOS</p>
                        
                        <span class="back-page"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4" ng-repeat="guardado in logos.guardados track by $index">
                                    <div>
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

                        <span class="next-page"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>

				<div class="col l6 xl5">
                    <div class="row caja">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">ADQUIRIDOS</p>
                        
                        <span class="back-page"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4"  ng-repeat="comprado in logos.comprados | limitTo: 10 track by comprado.idLogo">
                                    <div>
                                        <div class="overlay-combinacion"></div>
                                        <span class="editar" ui-sref="descargar({id: comprados[$index].idLogo})">
                                            <md-tooltip md-delay="2" md-direction="top">Descargar</md-tooltip>
                                            <i class="material-icons">file_download</i>
                                        </span>
                                        <span class="compartir">
                                            <md-tooltip md-delay="2" md-direction="top">Compartir</md-tooltip>
                                            <i class="material-icons">share</i>
                                        </span>                                                                
                                        <bazam-visualizar data-svg="logos.base64.decode(comprado.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>
                    
                        <span class="next-page"><i class="material-icons">keyboard_arrow_right</i></span>
                        
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