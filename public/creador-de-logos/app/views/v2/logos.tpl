<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col s2 logo">
            <h5 class="secundario" ui-sref="inicio">
                <i class="material-icons md-48 aling-top">fingerprint</i>
                <span>DISEÑADOR</span>
            </h5>
        </div>
        <div class="col s8 texto">
            <h5 class="principal"> MIS LOGOS</h5>
        </div>

    </div>
</section>

<section class="section-cliente">

    <div class="row margin-bottom-0">

        <div class="col s10">

            <div class="row margin-bottom-0" ng-switch="logos.opcionMostrar">

                <div class="tab-freelance col s12">
                    <button ng-click="logos.opcionMostrar='guardados'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='guardados'}">GUARDADOS</button>
                    <button ng-click="logos.opcionMostrar='adquiridos'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='adquiridos'}">COMPRADOS</button>
                </div>
                <!--PENDIENTES DE APROBACION-->
                <div class="col s12" ng-switch-when="guardados">
                    <carousel-mis-logos ng-if="logos.terminados.guardados" logos="logos.guardados" callback="['guardados', logos.buscarAtributo, logos.abrirModal, logos.borrarLogo]" elegido="logos.elegido"></carousel-mis-logos>
                </div>
                <!--APROBADOS-->
                <div class="col s12" ng-switch-when="adquiridos">
                    <carousel-mis-logos ng-if="logos.terminados.comprados" logos="logos.comprados" callback="['adquiridos', logos.buscarAtributo, logos.abrirModal]" elegido="logos.elegido"></carousel-mis-logos>
                </div>
    
            </div>

        </div>

		<div class="contenedor-previews col s2" style="position:static; padding:0; overflow-y: auto">
            <div class="cerrar-contenedor-p" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
                <i class="material-icons cerrar">clear</i>
            </div>
            <div class="row padding-bottom-0 margin-bottom-0">
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 25%;position: absolute;left: calc(40% - 23%);top: 32%;transform: rotate(-48deg);">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <div style="width: 25%;position: absolute;left: calc(93% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(100%) invert(80%) contrast(100%);">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/tarjeta.png" width="100%">
                    </div>
                </div>
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 30.5%;position: absolute;left: calc(54% - 18%);top: 30%;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/camiseta.jpg" width="100%">
                    </div>
                </div>
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 14%;position: absolute;left: calc(66% - 18%);top: 32%;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 32%;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 62%;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/red.jpg" width="100%">
                    </div>
                </div>

                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 30%;position: absolute;left: calc(28% - 18%);top: 6%;opacity: 0.9;filter: grayscale(1);">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <div style="width: 23%;position: absolute;left: calc(85% - 18%);top: 72%;filter: grayscale(1);opacity: 0.8;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/sobre.jpg" width="100%">
                    </div>
                </div>

                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 22%;position: absolute;left: calc(73% - 18%);top: 30%;filter: blur(0.4px) grayscale(0.5);">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/camioneta.jpg" width="100%">
                    </div>
                </div>

                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 43%;position: absolute;left: calc(52% - 18%);top: 34%;filter: blur(0.6px) grayscale(0.5);opacity: 0.8;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/taza.jpg" width="100%">
                    </div>
                </div>
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 40%;position: absolute;left: calc(47.7% - 18%);top: 46%;transform: rotate(89deg);filter: grayscale(100%) contrast(50%);">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/etiqueta.jpg" width="100%">
                    </div>
                </div>

                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 33%;position: absolute;left: calc(50% - 18%);top: 17.5%;opacity: 0.9;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/envase.jpg" width="100%">
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