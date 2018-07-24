<div class="carousel-mis-logos">
    <div>
        <div class="left-arrow" ng-click="carouselMisLogos.mover()" ng-if="logos.length > 1">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <div class="logo-wrapper" ng-repeat="logo in logos track by logo.idLogo">


            <div class="left-div-action" ng-click="::carouselMisLogos.mover()" ng-if="logos.length > 1">
            </div>

            <div class="logo-container-m" ng-class="{'logo-left-1-m': $index == (carouselMisLogos.actual - 2),'logo-left-m': $index == (carouselMisLogos.actual - 1),'logo-active-m': $index == carouselMisLogos.actual, 'logo-right-m': $index == (carouselMisLogos.actual + 1), 'logo-right-1-m': $index == (carouselMisLogos.actual + 2)}" >
                <div class="share-email" ng-if="logo.mostrarCompartir" ng-form="carouselMisLogos.compartirEmailForm">
                    <md-icon class="material-icons cerrar-compartir-email" role="img" aria-label="close" ng-click="logo.mostrarCompartir = false;">close</md-icon>
                    
                    <div class="input-field">
                        <input name="correo" type="email" ng-model="logo.email" placeholder="Email" required/>

                        <!-- VALIDACION -->
                        <div ng-messages="carouselMisLogos.compartirEmailForm.correo.$error" role="alert" ng-if="carouselMisLogos.compartirEmailForm.correo.$dirty || carouselMisLogos.compartirEmailForm.$submitted">
                            <div ng-message="required">Este campo es requerido.</div>
                            <div ng-message="email">Debe ser un email válido.</div>
                        </div>
                    </div>

                    <button ng-click="carouselMisLogos.compartirPorEmail(logo.email, logo, carouselMisLogos.compartirEmailForm.$valid); carouselMisLogos.compartirEmailForm.$setSubmitted()"
                        ng-class="{'loading-white':!carouselMisLogos.completadoCompartir }">ENVIAR</button>
                </div>

                <span style="bottom: 85%" class="accion"  ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: logo.elementos_idElemento, svg:  logo.logo}}, idLogoGuardado: logo.idLogo, fuentes: {principal: carouselMisLogos.callback[2](logo.atributos, 'principal'), eslogan: carouselMisLogos.callback[2](logo.atributos,'eslogan')}}})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[1] == 'guardados'">
                    <p>{{carouselMisLogos.lang[3]}}</p> <img src="assets/images/edit_white.svg" alt="">
                </span>
                
                <span style="bottom: 85%" class="accion"  ui-sref="descargar({id: logo.idLogo})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[1] == 'adquiridos'">
                    <p>DESCARGAR</p> <img src="assets/images/file_download.svg" alt="">
                </span>

                <span style="bottom: 70%" class="accion share"  ng-click="carouselMisLogos.callback[2](logo.idLogo)" ng-if="carouselMisLogos.actual == $index && (carouselMisLogos.callback[1] == 'adquiridos' || carouselMisLogos.callback[1] == 'guardados')">
                    
                    
                    <span ng-click="carouselMisLogos.callback[0]('google', logo.idLogo)">
                        <i class="fab fa-google-plus-g"></i>
                    </span>
                    <span ng-click="carouselMisLogos.callback[0]('facebook',logo.idLogo)">
                        <i class="fab fa-facebook-f"></i>
                    </span>
                    <span ng-click="carouselMisLogos.callback[0]('twitter', logo.idLogo)">
                        <i class="fab fa-twitter"></i>
                    </span>
                    <span ng-click="carouselMisLogos.callback[0]('pinterest', logo.idLogo)">
                        <i class="fab fa-pinterest"></i>
                    </span>
                    <span ng-click="logo.mostrarCompartir = true"> 
                        <i class="fas fa-envelope"></i>
                    </span>
                    
                    
                    
                    <img src="assets/images/share.svg" alt="">
                </span>

                <span style="bottom: 55%" class="accion" ui-sref="papeleria({id: logo.idLogo})" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[1] == 'adquiridos'">
                    <p>{{carouselMisLogos.lang[8]}}</p> <img src="assets/images/layers.png" alt="">
                </span>

                <span style="bottom: 55%" class="accion"  ng-click="carouselMisLogos.callback[5]($index)" ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[1] == 'guardados'">
                    <p>{{carouselMisLogos.lang[4]}}</p> <img src="assets/images/shop.svg" alt="">
                </span>

                <span style="bottom: 40%" class="accion" ng-click="carouselMisLogos.borrarSlider(logo.idLogo)"  ng-if="carouselMisLogos.actual == $index && carouselMisLogos.callback[1] == 'guardados'">
                    <p>{{carouselMisLogos.lang[5]}}</p> <img src="assets/images/delete.svg" alt="">
                </span>
                
                <bazam-visualizar style="width:100%" data-svg="carouselMisLogos.base64.decode(logo.logo)"></bazam-visualizar>
            </div>

            <div class="right-div-action" ng-click="::carouselMisLogos.mover(true)" ng-if="logos.length > 1">
            </div>

        </div>

        <div class="logo-wrapper" ng-if="!logos.length">
            <div class="logo-container-m logo-active-m" style="height:40px; border: none;box-shadow:none;top:100px;">
                <span class="seleccionar" style="opacity: 1; font-size: 15px; border: none; width:100%;justify-content: center;background:white;">
                    {{carouselMisLogos.lang[2]}} {{::carouselMisLogos.callback[1].toUpperCase()}}
                </span>
            </div>
        </div>

        <div class="right-arrow" ng-click="::carouselMisLogos.mover(true)" ng-if="logos.length > 1">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>

</div>