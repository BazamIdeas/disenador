<div flex layout="column">
    <div layout="row" layout-align="space-around">
        <div flex="45" class="contenedor_logos md-whiteframe-2dp">
            <h3 layout-padding class="text-center h_seccion_dashboard">Tus Logos</h3>
        </div>
        <div flex="45" class="contenedor_logos md-whiteframe-2dp">
            <h3 layout-padding class="text-center h_seccion_dashboard">Favoritos</h3>
        </div>
    </div>
    <div layout="row" layout-align="space-around">
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="baseline space-around" layout-wrap layout-padding>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
            </div>
        </div>
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="text-center">
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
                <div flex="33" layout-padding ng-repeat="icono in cliente.respuesta.iconos">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                </div>
            </div>
        </div>
    </div>
</div>
