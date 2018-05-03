<section class="body logos" style="background-color: white">

    <div class="row">

        <div class="col s12 logos">

            <div class="row" ng-switch="logos.opcionMostrar">

                <div class="tabs-logos col s12">
                    <span ng-click="::logos.opcionMostrar='guardados'" ng-class="{'tab-active': logos.opcionMostrar=='guardados'}">GUARDADOS</span>
                    <span ng-click="::logos.opcionMostrar='adquiridos'" ng-class="{'tab-active': logos.opcionMostrar=='adquiridos'}">COMPRADOS</span>
                </div>
                <!--PENDIENTES DE APROBACION-->
                <div class="col s12" ng-switch-when="guardados">
                    <carousel-mis-logos ng-if="logos.terminados.guardados" logos="logos.guardados" callback="[logos.compartir, 'guardados', logos.buscarAtributo, logos.abrirModal, logos.borrarLogo, logos.mostrarPlanes]"
                        elegido="logos.elegido"></carousel-mis-logos>
                </div>
                <!--APROBADOS-->
                <div class="col s12" ng-switch-when="adquiridos">
                    <carousel-mis-logos ng-if="logos.terminados.comprados" logos="logos.comprados" callback="[logos.compartir, 'adquiridos', logos.buscarAtributo, logos.abrirModal]"
                        elegido="logos.elegido"></carousel-mis-logos>
                </div>

            </div>

        </div>

        <div class="col s12 ver-logo-enorme estatico" id="previsualizar" ng-if="logos.elegido">
            <div class="bazam-previzualizar-container one">
                <div class="preview" style="width: 102%;
                height: 100vh;
                background-image: url(assets/images/shirt.png), url(assets/images/shirt_overlay.png), url(assets/images/shirt_multiply.png);
                background-size: 100%;
                background-blend-mode: normal, overlay, multiply;
                background-color: {{datos.colores.fondo ? datos.colores.fondo : '#fcfcfc'}};
                background-repeat: no-repeat;
                    ">
                    <div style="    left: 43%;
                    padding-top: 21%;">
                        <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column;padding-left: 5px;">
        
                    <div class="preview" style="padding-bottom:5px;    width: 100%;">
                        <div style="    transform: rotate(46deg);
                        padding-top: 15%;
                        left: 21%;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/card.png" width="100%"  style=" height: calc(50vh - 5px); ">
                    </div>
                    <div class="preview" style="width: 100%;">
                        <div style="    transform: rotate(55deg);
                        padding-top: 14%;
                        left: 58%;">
                            <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                        </div>
                        <img src="assets/images/leica.jpg" width="100%" style=" height:50vh; ">
                    </div>
        
                </div>
            </div>
        
            <div class="ver-logo-planes">
                <bazam-listar-planes datos="datos" guardar-logo="guardarLogo" data-id="id" verlogo="true"></bazam-listar-planes>
            </div>
        
        
            <div class="bazam-previzualizar-container two" style="padding-bottom:5px;">
                <div class="preview" style="padding-right:5px;">
                    <div style="    transform: skewY(16deg) skewX(-4deg);
                    padding-top: 4%;
                    left: 33.5%;
                    width: 15%;">
                        <bazam-actualizar data-svg="logos.elegido"></bazam-actualizar>
                    </div>
                    <img src="assets/images/sign.jpg" width="100%" style="    height: 76.8vh;">
                </div>
                <div class="preview">
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

    </div>

</section>


<!--<div class="overlay" ng-class="{'show': logos.mostrarModalSocial, 'hide': !logos.mostrarModalSocial}">
    <div class="row margin-bottom-0">
        <div class="col s4 offset-s4">

            <div class="login-form-flex" style="position: fixed; width: 500px; left: calc(50% - 250px); top: calc(50% - 70px); height: 140px; ">

                <div class="cubo-form row">

                    <i class="material-icons cerrar" ng-click="logos.mostrarModalSocial = false">clear</i>

                    <div class="compartir-iconos col s12">
                        <span ng-click="logos.compartir('facebook', logos.idLogoCompartir)">
                            <i class="fab fa-facebook-f"></i>
                        </span>
                        <span ng-click="logos.compartir('twitter', logos.idLogoCompartir)">
                            <i class="fab fa-twitter"></i>
                        </span>
                        <span ng-click="logos.compartir('google', logos.idLogoCompartir)">
                            <i class="fab fa-google-plus-g"></i>
                        </span>
                        <span ng-click="logos.compartir('linkedin', logos.idLogoCompartir)"> 
                            <i class="fab fa-linkedin"></i>
                        </span>
                        <span ng-click="logos.compartir('pinterest', logos.idLogoCompartir)">
                            <i class="fab fa-pinterest"></i>
                        </span>
                    </div>

                </div>

            </div>

        </div>
    </div>
</div>>-->

<bazam-planes estado="logos.abrirPlanes" datos="logos.datosComprar" guardar-logo="logos.guardarLogo"></bazam-planes>