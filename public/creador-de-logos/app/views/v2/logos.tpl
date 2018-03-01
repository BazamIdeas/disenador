<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col s2 logo">
            <h5 class="secundario" ui-sref="principal.comenzar">
                <i class="material-icons md-48 aling-top">fingerprint</i>
                <span>DISEÑADOR</span>
            </h5>
        </div>
        <div class="col s8 texto">
            <h5 class="principal"> MIS LOGOS</h5>
        </div>

    </div>
</section>

<section class="scrollbar-dynamic section-cliente" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">

    <div class="tab-freelance col s12">
        <button ng-click="logos.opcionMostrar='guardados'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='guardados'}"
            class="boton-verde">GUARDADOS</button>
        <button ng-click="logos.opcionMostrar='adquiridos'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='adquiridos'}"
            class="boton-verde">COMPRADOS</button>
    </div>
    <div class="row margin-bottom-0" ng-switch="logos.opcionMostrar">
        <!--PENDIENTES DE APROBACION-->
        <div class="col s12" ng-switch-when="guardados">
            <carousel-mis-logos ng-if="logos.terminados.guardados" logos="logos.guardados" callback="['guardados', logos.buscarAtributo, logos.abrirModal, logos.borrarLogo]"></carousel-mis-logos>
        </div>
        <!--APROBADOS-->
        <div class="col s12" ng-switch-when="adquiridos">
            <carousel-mis-logos ng-if="logos.terminados.comprados" logos="logos.comprados" callback="['adquiridos', logos.buscarAtributo, logos.abrirModal]"></carousel-mis-logos>
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
                        <span socialshare socialshare socialshare-provider="twitter" socialshare-text="XXXXX" socialshare-url="{{logos.urlCompartir+ 'comenzar/?id=' +logos.idLogoCompartir}}"
                            socialshare-hashtags="liderlogo">
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