<div class="logos">
    <div>
        <div class="left-arrow" ng-click="carouselMisLogos.actual = carouselMisLogos.actual == 0 ? carouselMisLogos.largoArray - 1 : carouselMisLogos.actual - 1" ng-if="carouselMisLogos.largoArray > 1">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <div class="logo-wrapper" ng-repeat="logo in logos = carouselMisLogos.logos track by logo.idLogo">
            <div class="logo-container" ng-class="{'logo-left-1': $index == (carouselMisLogos.actual - 2),'logo-left': $index == (carouselMisLogos.actual - 1),'logo-active': $index == carouselMisLogos.actual, 'logo-right': $index == (carouselMisLogos.actual + 1), 'logo-right-1': $index == (carouselMisLogos.actual + 2)}">
                
                <span class="seleccionar" style="margin-bottom: 65%"  ui-sref="logoVendido({id: logo.idLogo})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'vendidos'">
                    VER <i class="material-icons">remove_red_eye</i>
                </span>


                <span style="margin-bottom: 65%" class="seleccionar"  ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: logo.elementos_idElemento, svg:  logo.logo}}, idLogoGuardado: logo.idLogo, fuentes: {principal: carouselMisLogos.callback[2](logo.atributos, 'principal'), eslogan: carouselMisLogos.callback[2](logo.atributos,'eslogan')}}})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'borradores'">
                    EDITAR <i class="material-icons">edit</i>
                </span>
                <span style="margin-bottom: 50%" class="seleccionar"  ng-click="carouselMisLogos.borrarSlider(logo.idLogo)" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[0] == 'borradores'">
                    BORRAR <i class="material-icons">delete</i>
                </span>
                
                <bazam-visualizar style="width:100%" data-svg="carouselMisLogos.base64.decode(logo.logo)"></bazam-visualizar>
            </div>
        </div>

        <div class="logo-wrapper" ng-if="!carouselMisLogos.largoArray">
            <div class="logo-container logo-active" style="height:300px; border: none;box-shadow:none;">
                <span class="seleccionar" style="opacity: 1; font-size: 20px; border: none; width:100%;">
                    AUN NO TIENE LOGOS {{carouselMisLogos.callback[0].toUpperCase()}}
                </span>
            </div>
        </div>

        <div class="right-arrow" ng-click="carouselMisLogos.actual = carouselMisLogos.actual == (carouselMisLogos.largoArray - 1) ? 0 : carouselMisLogos.actual + 1" ng-if="carouselMisLogos.largoArray > 1">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>

</div>