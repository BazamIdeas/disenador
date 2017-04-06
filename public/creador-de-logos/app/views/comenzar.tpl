<div flex layout="column" ng-cloak layout-align="center">

    <div flex="12" layout="row" layout-align="center" class="margen_inferior margen_superior">

        <md-slider-container ng-disabled="true" flex="50" class="md-whiteframe-2dp">       
             <md-slider flex class="md-warn" ng-model="comenzar.mostrar" md-discrete step="1" min="1" max="4" aria-label="rating" ng-readonly="true">
        </md-slider-container>
    </div>
    <div flex="85" layout="column" layout-align="start" ng-switch="comenzar.mostrar">
        <div class="texto-informativo" layout flex="14" layout-align="center">
            <div layout flex="60" layout-align="center">
                <p ng-switch-when="1">Ingrese el nombre de su logo</p>
                <p ng-switch-when="2">Seleccione una Categoría</p>
                <p ng-switch-when="3">Que tipo de logo desea?</p>
                <p ng-switch-when="4">Caracteristicas que quiere que su logo transmita</p>
            </div>
        </div>
        <div layout layout-align="center">
            <form name="preferenciasFormulario" flex="60" layout-padding class="md-whiteframe-2dp">
                <div>
                    <div class="pasos" ng-switch-when="1">
                        <div>
                            <md-input-container class="md-block">
                                <label>Ingrese el nombre de su logo</label>
                                <input name="nombre" ng-model="comenzar.datos.nombre" ng-required="true">
                            </md-input-container>
                        </div>
                        <div flex layout layout-align="end center">
                            <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=2" ng-show="preferenciasFormulario.nombre.$valid">Siguiente</md-button>
                        </div>
                    </div>
                    <div class="pasos" ng-switch-when="2">
                        <div>
                            <md-input-container class="md-block">
                                <label>Seleccione una Categoría</label>

                                <md-select ng-model="comenzar.datos.categoria" name="categoria" ng-required="true">
                                    <md-option class="select-auto" ng-value="categoria.idCategoria" ng-repeat="categoria in comenzar.categoriasPosibles">{{categoria.nombreCategoria}}</md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div flex layout layout-align="space-between center">
                            <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=1">Atras</md-button>
                            <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=3" ng-show="preferenciasFormulario.categoria.$valid">Siguiente</md-button>
                        </div>
                    </div>
                    <div class="pasos" ng-switch-when="3" layout="column" layout-align="center space-between">
                        <div layout-padding layout layout-align="space-around">
                            <md-icon class="material-icons icono_radio" style="width: 100px; height: 100px;" md-svg-src="/creador-de-logos/assets/iconos_temporales/Imagen2.svg"></md-icon>
                            <md-icon class="material-icons icono_radio" style="width: 100px; height: 100px;" md-svg-src="/creador-de-logos/assets/iconos_temporales/Imagen1.svg"></md-icon>
                        </div>
                        <div layout-padding class="radio-f">
                            <md-radio-group layout layout-align="space-around" ng-model="comenzar.datos.tipo" name="tipo" ng-required="true">
                                <md-radio-button layout="column" value="ICONO" ng-click="comenzar.select=true">
                                </md-radio-button>
                                <md-radio-button value="ICONO2" ng-click="comenzar.select=true">
                                </md-radio-button>
                            </md-radio-group>
                        </div>
                        <div flex layout layout-align="space-between center" class="botones-select-comen">
                            <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=2">Atras</md-button>
                            <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=4" ng-show="preferenciasFormulario.tipo.$valid">Siguiente</md-button>
                        </div>
                    </div>
                    <div class="pasos" ng-switch-when="4">
                        <div layout ng-repeat="prefrerencia in comenzar.datos.preferencias">
                            <div flex layout layout-align="center center">
                                <span class="md-body-1">{{prefrerencia.nombre1}}</span>
                            </div>
                            <md-slider flex="50" md-discrete ng-model="prefrerencia.valor" step="1" min="1" max="3" aria-label="rating">
                            </md-slider>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1">{{prefrerencia.nombre2}}</span>
                            </div>
                        </div>

                        <div layout class="margen_superior">
                            <div layout="row" flex layout-align="space-between end">
                                <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=3">Atras</md-button>
                                <md-button class="md-raised md-accent" ui-sref="analisis({datos: comenzar.datos})" ng-click="definir()">Enviar</md-button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </div>
</div>
