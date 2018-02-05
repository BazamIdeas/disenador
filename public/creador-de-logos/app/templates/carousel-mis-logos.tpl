<div class="logos">
    <div>
        <div class="left-arrow" ng-click="carouselMisLogos.actual = carouselMisLogos.actual == 0 ? logos.length - 1 : carouselMisLogos.actual - 1" ng-if="logos.length > 1">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <div class="logo-wrapper" ng-repeat="logo in logos track by logo.idLogo">
            <div class="logo-container-m" ng-class="{'logo-left-1-m': $index == (carouselMisLogos.actual - 2),'logo-left-m': $index == (carouselMisLogos.actual - 1),'logo-active-m': $index == carouselMisLogos.actual, 'logo-right-m': $index == (carouselMisLogos.actual + 1), 'logo-right-1-m': $index == (carouselMisLogos.actual + 2)}">

                <span style="margin-bottom: 35%" class="seleccionar"  ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: logo.elementos_idElemento, svg:  logo.logo}}, idLogoGuardado: logo.idLogo, fuentes: {principal: carouselMisLogos.callback[1](logo.atributos, 'principal'), eslogan: carouselMisLogos.callback[1](logo.atributos,'eslogan')}}})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'guardados'">
                    EDITAR <i class="material-icons">edit</i>
                </span>

                <span style="margin-bottom: 35%" class="seleccionar"  ui-sref="descargar({id: logo.idLogo})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'adquiridos'">
                    DESCARGAR <i class="material-icons">file_download</i>
                </span>

                <span style="margin-bottom: 5%" class="seleccionar"  ng-click="carouselMisLogos.callback[2](logo.idLogo)" ng-if="carouselMisLogos.actual == $index && (carouselMisLogos.callback[0] == 'adquiridos' || carouselMisLogos.callback[0] == 'guardados')">
                    COMPARTIR <i class="material-icons">share</i>
                </span>

                <span style="margin-top: 25%" class="seleccionar" ng-click="carouselMisLogos.borrarSlider(logo.idLogo)"  ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'guardados'">
                    BORRAR <i class="material-icons">delete</i>
                </span>
                
                <bazam-visualizar style="width:100%" data-svg="carouselMisLogos.base64.decode(logo.logo)"></bazam-visualizar>
            </div>
        </div>

        <div class="logo-wrapper" ng-if="!logos.length">
            <div class="logo-container-m logo-active-m" style="height:300px; border: none;box-shadow:none;">
                <span class="seleccionar" style="opacity: 1; font-size: 20px; border: none; width:100%;">
                    AUN NO TIENE LOGOS {{carouselMisLogos.callback[0].toUpperCase()}}
                </span>
            </div>
        </div>

        <div class="right-arrow" ng-click="carouselMisLogos.actual = carouselMisLogos.actual == (logos.length - 1) ? 0 : carouselMisLogos.actual + 1" ng-if="logos.length > 1">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>

</div>