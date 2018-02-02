
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
            
            <div class="tab-freelance col s12">
                <button ng-click="logos.opcionMostrar='guardados'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='guardados'}" class="boton-verde">GUARDADOS</button>
                <button ng-click="logos.opcionMostrar='adquiridos'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='adquiridos'}" class="boton-verde">COMPRADOS</button>
            </div>
            <div class="row margin-bottom-0" ng-switch="logos.opcionMostrar">
				<!--PENDIENTES DE APROBACION-->
				<div class="col s12" ng-switch-when="guardados">
                    <carousel-mis-logos ng-if="logos.guardados.length" logos="logos.guardados" callback="['guardados']"></carousel-mis-logos>
                </div>
                <!--APROBADOS-->
				<div class="col s12" ng-switch-when="adquiridos">
                    <carousel-mis-logos ng-if="logos.comprados.length" logos="logos.comprados" callback="['adquiridos']"></carousel-mis-logos>
                </div>
                
            </div>
        </section>

        <section class="scrollbar-dynamic section-cliente" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
            <div class="row margin-bottom-0">
				
				<div class="col l6 xl5 offset-xl1">
                    <div class="row caja logos">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">GUARDADOS</p>
                        
                        <span class="back-page"  ng-click="logos.modificarSalto(false, 'guardados')" ng-show="logos.cantidad.guardados > 9"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4" ng-repeat="guardado in logos.guardados | limitTo: 9 : logos.salto.guardados track by guardado.idLogo">
                                    <div>
                                        <div class="overlay-combinacion"></div>
                                        <span class="editar" ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: guardado.elementos_idElemento, svg:  guardado.logo}}, idLogoGuardado: guardado.idLogo, fuentes: {principal: logos.buscarAtributo(guardado.atributos, 'principal'), eslogan: logos.buscarAtributo(guardado.atributos,'eslogan')}, metas: logos.obtenerMetas(guardado.metas)}})">
                                            <md-tooltip md-delay="2" md-direction="top">Editar</md-tooltip>
                                            <i class="material-icons">edit</i>
                                        </span>
                                        <span class="compartir"  ng-click="logos.abrirModal(guardado.idLogo)">
                                            <md-tooltip md-delay="2" md-direction="top">Compartir</md-tooltip>
                                            <i class="material-icons">share</i>
                                        </span>
                                        <span class="borrar" ng-click="logos.borrarLogo(guardado.idLogo)">
                                            <md-tooltip md-delay="2" md-direction="top">Eliminar</md-tooltip>
                                            <i class="material-icons">delete</i>
                                        </span>
                                        <bazam-visualizar data-svg="logos.base64.decode(guardado.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <span class="next-page" ng-click="logos.modificarSalto(true, 'guardados')" ng-show="logos.cantidad.guardados > 9"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>

				<div class="col l6 xl5">
                    <div class="row caja logos">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">ADQUIRIDOS</p>
                        
                        <span class="back-page" ng-click="logos.modificarSalto(false, 'comprados')" ng-show="logos.cantidad.comprados > 9"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4"  ng-repeat="comprado in logos.comprados | limitTo: 9 : logos.salto.comprados track by comprado.idLogo">
                                    <div>
                                        <div class="overlay-combinacion"></div>
                                        <span class="editar" ui-sref="descargar({id: comprado.idLogo})">
                                            <md-tooltip md-delay="2" md-direction="top">Descargar</md-tooltip>
                                            <i class="material-icons">file_download</i>
                                        </span>
                                        <span class="compartir" ng-click="logos.abrirModal(comprado.idLogo)">
                                            <md-tooltip md-delay="2" md-direction="top">Compartir</md-tooltip>
                                            <i class="material-icons">share</i>
                                        </span>                                                                
                                        <bazam-visualizar data-svg="logos.base64.decode(comprado.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>
                    
                        <span class="next-page" ng-click="logos.modificarSalto(true, 'comprados')"  ng-show="logos.cantidad.comprados > 9"><i class="material-icons">keyboard_arrow_right</i></span>

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
                                <span socialshare socialshare-provider="facebook" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-facebook-f"></i>
                                </span>
                                <span socialshare socialshare socialshare-provider="twitter" socialshare-text="XXXXX" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}" socialshare-hashtags="liderlogo">
                                    <i class="fab fa-twitter"></i>
                                </span>
                                <span socialshare socialshare-provider="google" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-google-plus-g"></i>
                                </span>
                                <span socialshare socialshare-provider="linkedin" socialshare-text="XXXX" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-linkedin"></i>
                                </span>
                                <span socialshare socialshare-provider="pinterest" socialshare-text="XXXXX" socialshare-media="/assets/images/ipad.png" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-pinterest"></i>
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>