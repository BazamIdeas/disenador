<div class="logos">
    <div>
        <div class="left-arrow" ng-click="carousel.actual = carousel.actual - 1" ng-if="carousel.actual > 0">
            <i class="material-icons">keyboard_arrow_left</i>
        </div>
        <div class="logo-wrapper" ng-repeat="logo in logos = carousel.logos track by $index">
            <div fondo-contraste color="carousel.convertidor(logo.atributos)['color-primario']" class="logo-container" ng-class="{'logo-left-1': $index == (carousel.actual - 2),'logo-left': $index == (carousel.actual - 1),'logo-active': $index == carousel.actual, 'logo-right': $index == (carousel.actual + 1), 'logo-right-1': $index == (carousel.actual + 2)}">
                <span class="seleccionar"  ng-click="carousel.callback($index)" ng-if="carousel.actual == $index">
                    SELECCIONAR <i class="material-icons">check</i>
                </span>
                <bazam-svg-text style="width:100%" data-icono="{{carousel.base64.decode(logo.icono.svg)}}" data-fuente="{{logo.fuente.nombre}}" data-texto="{{carousel.nombre}}"></bazam-svg-text>
            </div>
        </div>
        <div class="right-arrow" ng-click="carousel.actual = carousel.actual + 1" ng-if="carousel.actual < (carousel.largoArray - 1)">
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>

</div>