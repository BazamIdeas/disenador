        <section class="sub-menu">
            <div class="row margin-bottom-0">

                <div class="col s12 titulo">
                    <h6 class="principal"> MIS LOGOS</h6>
                </div>

                <div class="col s6 login tab" ng-class="{'active': logos.tab == 1}" ng-click="logos.tab = 1">
                    <h5 class="principal"> Guardados </h5>
                </div>
                <div class="col s6 registro tab" ng-class="{'active': logos.tab == 2}" ng-click="logos.tab = 2">
                    <h5 class="principal"> Adquiridos </h5>
                </div>

            </div>
        </section>

        <section class="scrollbar-dynamic section-cliente-logos" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
            <div class="row margin-bottom-0" ng-switch="logos.tab">
				
				<div class="col s12" ng-switch-when="1">
                    <div class="row caja logos">
                        
                        <span class="back-page"  ng-click="logos.modificarSalto(false, 'guardados')" ng-show="logos.cantidad.guardados > 4"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col s10 offset-s1">
                            <div class="row cubos-logos-cliente">

                                <div class="col s12 m6 l6" ng-repeat="guardado in logos.guardados | limitTo: 4 : logos.salto.guardados track by guardado.idLogo">
                                    <div>  
                                        <div class="overlay-combinacion" ng-click="logos.seleccionado('guardados', guardado)"></div>
                                        <!--<span class="editar" ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: guardado.elementos_idElemento, svg:  guardado.logo}}, idLogoGuardado: guardado.idLogo, fuentes: {principal: logos.buscarAtributo(guardado.atributos, 'principal'), eslogan: logos.buscarAtributo(guardado.atributos,'eslogan')}}})">
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
                                        </span><!-->
                                        <bazam-visualizar data-svg="logos.base64.decode(guardado.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <span class="next-page" ng-click="logos.modificarSalto(true, 'guardados')" ng-show="logos.cantidad.guardados > 4"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>

				<div class="col s12" ng-switch-when="2">
                    <div class="row caja logos">
                        
                        <span class="back-page" ng-click="logos.modificarSalto(false, 'comprados')" ng-show="logos.cantidad.comprados > 4"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col s10 offset-s1">
                            <div class="row cubos-logos-cliente">

                                <div class="col s12 m6 l6"  ng-repeat="comprado in logos.comprados | limitTo: 4 : logos.salto.comprados track by comprado.idLogo">
                                    <div>
                                        <div class="overlay-combinacion" ng-click="logos.seleccionado('adquiridos', comprado)"></div>
                                        <!--<span class="editar" ui-sref="descargar({id: comprado.idLogo})">
                                            <md-tooltip md-delay="2" md-direction="top">Descargar</md-tooltip>
                                            <i class="material-icons">file_download</i>
                                        </span>
                                        <span class="compartir" ng-click="logos.abrirModal(comprado.idLogo)">
                                            <md-tooltip md-delay="2" md-direction="top">Compartir</md-tooltip>
                                            <i class="material-icons">share</i>
                                        </span>-->                                                             
                                        <bazam-visualizar data-svg="logos.base64.decode(comprado.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>
                    
                        <span class="next-page" ng-click="logos.modificarSalto(true, 'comprados')"  ng-show="logos.cantidad.comprados > 4"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>

            </div>
        </section>

        <div class="opciones-guardados" ng-class="{'abierto': (logos.opcionesGuardados && !logos.opcionesAdquiridos) && (logos.logoSeleccionado != null)}">
            <ul>
                <li ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: logos.logoSeleccionado.elementos_idElemento, svg:  logos.logoSeleccionado.logo}}, idLogoGuardado: logos.logoSeleccionado.idLogo, fuentes: {principal: logos.buscarAtributo(logos.logoSeleccionado.atributos, 'principal'), eslogan: logos.buscarAtributo(logos.logoSeleccionado.atributos,'eslogan')}}})">
                    <i class="material-icons">edit</i>
                    Editar
                </li>
                <li ng-click="logos.abrirModal(logos.logoSeleccionado.idLogo)">
                    <i class="material-icons">share</i>
                    Compartir
                </li>
                <li ng-click="logos.borrarLogo(logos.logoSeleccionado.idLogo)">
                    <i class="material-icons">delete</i>
                    Borrar
                </li>
                <li ng-click="logos.logoSeleccionado = null">
                    <i class="material-icons">expand_more</i>
                </li>
            </ul>
        </div>

        <div class="opciones-adquiridos" ng-class="{'abierto': (logos.opcionesAdquiridos && !logos.opcionesGuardados) && (logos.logoSeleccionado != NULL)}">
            <ul>
                <li ui-sref="descargar({id: logos.logoSeleccionado.idLogo})">
                    <i class="material-icons">file_download</i>
                    Descargar
                </li>
                <li>
                    <i class="material-icons">share</i>
                    Compartir
                </li>
                <li ng-click="logos.logoSeleccionado = null">
                    <i class="material-icons">expand_more</i>
                </li>
            </ul>
        </div>

        <div class="overlay" ng-class="{'show': logos.mostrarModalSocial, 'hide': !logos.mostrarModalSocial}"> 
            <div class="row margin-bottom-0">
                <div class="col s12" style="padding: 0">

                    <div class="login-form-flex"> 

                        <div class="row margin-bottom-0" style="padding-top: 40px;">

                            <i class="material-icons cerrar" style="border:2px solid var(--principal); border-radius: 50%;    position: absolute;top: 5px;right: 5px;" ng-click="logos.mostrarModalSocial = false">clear</i>

                            <div class="compartir-iconos col s12 m6">
                                <span socialshare socialshare-provider="facebook" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-facebook-f"></i>
                                </span>
                            </div>
                            <div class="compartir-iconos col s12 m6">
                                <span socialshare socialshare socialshare-provider="twitter" socialshare-text="XXXXX" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}" socialshare-hashtags="liderlogo">
                                    <i class="fab fa-twitter"></i>
                                </span>
                            </div>
                            <div class="compartir-iconos col s12 m6">
                                <span socialshare socialshare-provider="google" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-google-plus-g"></i>
                                </span>
                            </div>
                            <div class="compartir-iconos col s12 m6">
                                <span socialshare socialshare-provider="linkedin" socialshare-text="XXXX" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-linkedin"></i>
                                </span>
                            </div>
                            <div class="compartir-iconos col s12 m6">
                                <span socialshare socialshare-provider="pinterest" socialshare-text="XXXXX" socialshare-media="/assets/images/ipad.png" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}">
                                    <i class="fab fa-pinterest"></i>
                                </span>
                            </div>
                            

                        </div>

                    </div>

                </div>
            </div>
        </div>