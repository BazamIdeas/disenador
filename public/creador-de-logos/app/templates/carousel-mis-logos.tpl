<div class="logos">
    <div>
        <div class="left-arrow" ng-click="carouselMisLogos.mover()" ng-if="logos.length > 1">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <div class="logo-wrapper" ng-repeat="logo in logos track by logo.idLogo">


            <div class="left-div-action" ng-click="::carouselMisLogos.mover()" ng-if="logos.length > 1">
            </div>

            <div class="logo-container-m" ng-class="{'logo-left-1-m': $index == (carouselMisLogos.actual - 2),'logo-left-m': $index == (carouselMisLogos.actual - 1),'logo-active-m': $index == carouselMisLogos.actual, 'logo-right-m': $index == (carouselMisLogos.actual + 1), 'logo-right-1-m': $index == (carouselMisLogos.actual + 2)}" >


                <span style="margin-bottom: 86%" class="seleccionar"  ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: logo.elementos_idElemento, svg:  logo.logo}}, idLogoGuardado: logo.idLogo, fuentes: {principal: carouselMisLogos.callback[1](logo.atributos, 'principal'), eslogan: carouselMisLogos.callback[1](logo.atributos,'eslogan')}}})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'guardados'">
                    <p>EDITAR</p> <img src="assets/images/edit_white.svg" alt="">
                </span>
                
                <span style="margin-bottom: 86%" class="seleccionar"  ui-sref="descargar({id: logo.idLogo})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'adquiridos'">
                    <p>DESCARGAR</p> <img src="assets/images/file_download.svg" alt="">
                </span>

                <span style="margin-bottom: 72%" class="seleccionar"  ng-click="carouselMisLogos.callback[2](logo.idLogo)" ng-if="carouselMisLogos.actual == $index && (carouselMisLogos.callback[0] == 'adquiridos' || carouselMisLogos.callback[0] == 'guardados')">
                    <p>COMPARTIR</p> <img src="assets/images/share.svg" alt="">
                </span>

                <span style="margin-bottom: 58%" class="seleccionar"  ng-click="carouselMisLogos.callback[4]($index)" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'guardados'">
                    <p>COMPRAR</p> <img src="assets/images/shop.svg" alt="">
                </span>

                <span style="margin-bottom: 44%" class="seleccionar" ng-click="carouselMisLogos.borrarSlider(logo.idLogo)"  ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'guardados'">
                    <p>BORRAR</p> <img src="assets/images/delete.svg" alt="">
                </span>
                
                <bazam-visualizar style="width:100%" data-svg="carouselMisLogos.base64.decode(logo.logo)"></bazam-visualizar>
            </div>

            <div class="right-div-action" ng-click="::carouselMisLogos.mover(true)" ng-if="logos.length > 1">
            </div>

        </div>

        <div class="logo-wrapper" ng-if="!logos.length">
            <div class="logo-container-m logo-active-m" style="height:40px; border: none;box-shadow:none;top:100px;">
                <span class="seleccionar" style="opacity: 1; font-size: 15px; border: none; width:100%;justify-content: center;background:white;">
                    AUN NO TIENE LOGOS {{::carouselMisLogos.callback[0].toUpperCase()}}
                </span>
            </div>
        </div>

        <div class="right-arrow" ng-click="::carouselMisLogos.mover(true)" ng-if="logos.length > 1">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>

</div>