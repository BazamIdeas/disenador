<md-slider-container ng-disabled="true">
    <md-slider step="1" min="1" max="4" ng-model="comenzar.mostrar" aria-label="Disabled 1" flex md-discrete ng-readonly="true"></md-slider>
</md-slider-container>
<div flex layout="column" layout-align="center" layout-padding>
    <div layout="row" layout-align="center">
        <form name="preferenciasFormulario" flex="50">
            <div ng-switch="comenzar.mostrar">
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
                                <md-option ng-value="categoria" ng-repeat="categoria in comenzar.categoriasPosibles">{{categoria}}</md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div flex layout layout-align="space-between center">
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=1">Atras</md-button>
                        <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=3" ng-show="preferenciasFormulario.categoria.$valid">Siguiente</md-button>
                    </div>
                </div>
                <div class="pasos" ng-switch-when="3">
                    <div>
                        <md-radio-group ng-model="comenzar.datos.tipo" name="tipo" ng-required="true">
                            <md-radio-button value="1">
                                Icono
                                <md-icon class="material-icons"> face </md-icon>
                            </md-radio-button>
                            <md-radio-button value="2">
                                Icono y Tipografía
                                <md-icon class="material-icons"> favorite </md-icon>
                            </md-radio-button>
                            <md-radio-button value="3">
                                Inicial y Tipografía
                                <md-icon class="material-icons"> pets </md-icon>
                            </md-radio-button>
                        </md-radio-group>
                    </div>
                    <div flex layout layout-align="space-between center">
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=2">Atras</md-button>
                        <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=4" ng-show="preferenciasFormulario.tipo.$valid">Siguiente</md-button>
                    </div>
                </div>
                <div class="pasos" ng-switch-when="4">
                    <div layout layout-padding ng-repeat="prefrerencia in comenzar.datos.preferencias">
                        <div flex layout layout-align="center center">
                            <span class="md-body-1">{{prefrerencia.nombre}}</span>
                        </div>
                        <md-slider flex="50" md-discrete ng-model="prefrerencia.valor" step="1" min="1" max="3" aria-label="rating">
                        </md-slider>
                        <div flex layout layout-align="center center">
                            <span class="md-body-1">{{prefrerencia.nombre2}}</span>
                        </div>
                    </div>
                    
                    <div flex layout layout-align="space-between center">
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=3">Atras</md-button>
                        <md-button class="md-raised md-accent" ui-sref="opciones({datos: comenzar.datos})">Enviar</md-button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>