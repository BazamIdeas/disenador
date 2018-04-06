<bazam-scroll style="display:block; height: calc(100% - 60px); overflow-y: scroll;   overflow-x: hidden;">
<section class="section-cliente">

    <div class="row margin-bottom-0">

        <div class="col s12">

            <div class="row margin-bottom-0" ng-switch="logos.opcionMostrar">

                <div class="tab-freelance col s12">
                    <button ng-click="::logos.opcionMostrar='guardados'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='guardados'}">GUARDADOS</button>
                    <button ng-click="::logos.opcionMostrar='adquiridos'" ng-class="{'tab-freelance-activo': logos.opcionMostrar=='adquiridos'}">COMPRADOS</button>
                </div>
                <!--PENDIENTES DE APROBACION-->
                <div class="col s12" ng-switch-when="guardados">
                    <carousel-mis-logos ng-if="logos.terminados.guardados" logos="logos.guardados" callback="['guardados', logos.buscarAtributo, logos.abrirModal, logos.borrarLogo, logos.mostrarPlanes]"
                        elegido="logos.elegido"></carousel-mis-logos>
                </div>
                <!--APROBADOS-->
                <div class="col s12" ng-switch-when="adquiridos">
                    <carousel-mis-logos ng-if="logos.terminados.comprados" logos="logos.comprados" callback="['adquiridos', logos.buscarAtributo, logos.abrirModal]"
                        elegido="logos.elegido"></carousel-mis-logos>
                </div>

            </div>

        </div>

        <!--<div class="contenedor-previews col s3" style="position:static; padding:0; overflow-y: auto">
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
        </div>-->
    </div>


</section>
<div class="ver-logo-enorme estatico" id="previsualizar" ng-if="logos.terminados.guardados">
    <div class="contenedor-ver-previsualizar uno">
        <div class="contenedor-logoprev" style="width: 102%;
        height: 100vh;
        background-image: url(assets/images/shirt.png), url(assets/images/shirt_overlay.png), url(assets/images/shirt_multiply.png);
        background-size: 100%;
        background-blend-mode: normal, overlay, multiply;
        background-color: {{logos.elegido.colores.icono ? logos.elegido.colores.icono : '#fcfcfc'}};
        background-repeat: no-repeat;
            ">
            <div style="    left: 43%;
            padding-top: 21%;">
                <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
            </div>
        </div>
        <div style="display: flex; flex-direction: column;     padding-left: 5px;">

            <div class="contenedor-logoprev" style="padding-bottom:5px;">
                <div style="    transform: rotate(46deg);
                padding-top: 15%;
                left: 21%;">
                    <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                </div>
                <img src="assets/images/card.png" width="100%" style="  height: calc(50vh - 5px);
">
            </div>
            <div class="contenedor-logoprev">
                <div style="    transform: rotate(55deg);
                padding-top: 14%;
                left: 58%;">
                    <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                </div>
                <img src="assets/images/leica.jpg" width="100%" style="  height:50vh;
">
            </div>

        </div>
    </div>
    <div class="contenedor-ver-previsualizar dos" style="padding-bottom:5px;">
        <div class="contenedor-logoprev" style="padding-right:5px;">
            <div style="    transform: skewY(16deg) skewX(-4deg);
            padding-top: 4%;
            left: 33.5%;
            width: 15%;">
                <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
            </div>
            <img src="assets/images/sign.jpg" width="100%" style="    height: 76.8vh;">
        </div>
        <div class="contenedor-logoprev">
            <div style="    transform: perspective(500px) rotateY(15deg) skewY(-3deg) skewX(1deg);
            padding-top: 12%;
            left: 30.5%;
            width: 25%;">
                <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
            </div>

            <div style="transform: perspective(500px) rotateY(15deg) skewY(-3deg) skewX(1deg);
            width: 17%;
            height: 0px;
            padding-top: 19%;
            position: absolute;
            left: 63%;
            top: 0px;
            opacity: 0.5;
            filter: blur(2px);">
                <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
            </div>
            <img src="assets/images/box2.jpg" width="100%" style="height: 76.8vh;">
        </div>
    </div>
</div>

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

<bazam-planes estado="logos.abrirPlanes" datos="logos.datosComprar" guardar-logo="logos.guardarLogo"></bazam-planes>

</bazam-scroll>