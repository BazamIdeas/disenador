<div class="logos">
    <div>
        <div class="left-arrow" ng-click="carouselDestacados.actual = carouselDestacados.actual - 2" ng-if="carouselDestacados.actual > 0">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <div class="logo-wrapper" ng-repeat="logo in logos track by logo.idLogo">
            <div class="logo-container-d" style="background:white;" 
                    ng-class="
                    {

                        'logo-left-3-a': $index == (carouselDestacados.actual - 8),
                        'logo-left-3-b': $index == (carouselDestacados.actual - 7),

                        'logo-left-2-a': $index == (carouselDestacados.actual - 6),
                        'logo-left-2-b': $index == (carouselDestacados.actual - 5),

                        'logo-left-1-a': $index == (carouselDestacados.actual - 4),
                        'logo-left-1-b': $index == (carouselDestacados.actual - 3),

                        'logo-left-a': $index == (carouselDestacados.actual - 2),
                        'logo-left-b': $index == (carouselDestacados.actual - 1),

                        'logo-active-a': $index == carouselDestacados.actual,
                        'logo-active-b': $index == (carouselDestacados.actual + 1),

                        'logo-right-a': $index == (carouselDestacados.actual + 2),
                        'logo-right-b': $index == (carouselDestacados.actual + 3),

                        'logo-right-1-a': $index == (carouselDestacados.actual + 4),    
                        'logo-right-1-b': $index == (carouselDestacados.actual + 5),

                        'logo-right-2-a': $index == (carouselDestacados.actual + 6),    
                        'logo-right-2-b': $index == (carouselDestacados.actual + 7),

                        'logo-right-3-a': $index == (carouselDestacados.actual + 8),    
                        'logo-right-3-b': $index == (carouselDestacados.actual + 9),
                    
                    }    
                ">
                <span class="seleccionar"  ng-click="carouselDestacados.callback[0](logo.idLogo)" ng-if="carouselDestacados.actual == $index || (carouselDestacados.actual + 1) == $index">
                    QUIERO ESTE LOGO <i class="material-icons">shopping_cart</i>
                </span>
                <bazam-visualizar style="width:100%" data-svg="carouselDestacados.base64.decode(logo.logo)"></bazam-visualizar>
            </div>
        </div>

        <div class="logo-wrapper">
            <div class="logo-container logo-active" ng-if="!logos.length">  <p style="text-align: center;"> No hay diseños </p> </div>
        </div>

        <div class="right-arrow" ng-click="carouselDestacados.avanzar()">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>

</div>