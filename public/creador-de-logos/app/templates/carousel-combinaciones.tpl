<div class="logos">
    <div>
        <div class="left-arrow" ng-click="carouselCombinaciones.actual = carouselCombinaciones.actual - 1" ng-if="carouselCombinaciones.actual > 0">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <div class="logo-wrapper" ng-repeat="logo in carouselCombinaciones.logos track by $index">
            <div fondo-contraste color="logo.icono.color" class="logo-container" ng-class="{'logo-left-1': $index == (carouselCombinaciones.actual - 2),'logo-left': $index == (carouselCombinaciones.actual - 1),'logo-active': $index == carouselCombinaciones.actual, 'logo-right': $index == (carouselCombinaciones.actual + 1), 'logo-right-1': $index == (carouselCombinaciones.actual + 2)}">
                <span class="seleccionar"  ng-click="carouselCombinaciones.callback($index)" ng-if="carouselCombinaciones.actual == $index">
                    SELECCIONAR <i class="material-icons">edit</i>
                </span>
                <bazam-svg-text style="width:100%" data-color="{{logo.icono.color}}" data-icono="{{carouselCombinaciones.base64.decode(logo.icono.svg)}}" data-fuente="{{logo.fuente.nombre}}" data-texto="{{carouselCombinaciones.nombre}}"></bazam-svg-text>
            </div>
        </div>
        <div class="right-arrow" ng-click="carouselCombinaciones.actual = carouselCombinaciones.actual + 1" ng-if="carouselCombinaciones.actual < (carouselCombinaciones.largoArray - 1)">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>

</div>