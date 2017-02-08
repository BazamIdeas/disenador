<div flex layout="column" layout-align="center" layout-padding>
    <div layout="row" layout-align="center">
        <form flex="30">

            <div ng-switch="comenzar.mostrar">
                <div class="pasos" ng-switch-when="1">
                    <div>
                        <md-input-container class="md-block">
                            <label>Ingrese el nombre de su logo</label>
                            <input ng-model="comenzar.datos.nombre" ng-required>
                        </md-input-container>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=2">Siguiente</md-button>
                    </div>
                </div>
                <div class="pasos" ng-switch-when="2">
                    <div>
                        <md-input-container>
                            <label>Seleccione una Categoría</label>
                            <md-select ng-model="comenzar.datos.categoria">
                                <md-option ng-value="categoria" ng-repeat="categoria in comenzar.categoriasPosibles">{{categoria}}</md-option>
                            </md-select>
                        </md-input-container>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=1">Atras</md-button>
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=3">Siguiente</md-button>
                    </div>
                </div>
                <div class="pasos" ng-switch-when="3">
                    <div>
                        <md-radio-group ng-model="comenzar.color">
                            <md-radio-button ng-value="1">
                                <md-icon class="material-icons"> face </md-icon>
                            </md-radio-button>
                            <md-radio-button ng-value="2">
                                <md-icon class="material-icons"> favorite </md-icon>
                            </md-radio-button>
                            <md-radio-button ng-value="3">
                                <md-icon class="material-icons"> pets </md-icon>
                            </md-radio-button>
                        </md-radio-group>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=2">Atras</md-button>
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=4">Siguiente</md-button>
                    </div>
                </div>
                <div class="pasos" ng-switch-when="4">
                    <div layout layout-padding>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Femenino</span>
                        </div>
                        <md-slider flex md-discrete ng-model="algo" step="1" min="1" max="3" aria-label="rating">
                        </md-slider>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Masculino</span>
                        </div>
                    </div>
                    <div layout layout-padding>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Femenino</span>
                        </div>
                        <md-slider flex md-discrete ng-model="algo" step="1" min="1" max="3" aria-label="rating">
                        </md-slider>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Masculino</span>
                        </div>
                    </div>
                    <div layout layout-padding>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Femenino</span>
                        </div>
                        <md-slider flex md-discrete ng-model="algo" step="1" min="1" max="3" aria-label="rating">
                        </md-slider>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Masculino</span>
                        </div>
                    </div>
                    <div layout layout-padding>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Femenino</span>
                        </div>
                        <md-slider flex md-discrete ng-model="algo" step="1" min="1" max="3" aria-label="rating">
                        </md-slider>
                        <div layout layout-align="center center">
                            <span class="md-body-1">Masculino</span>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=3">Atras</md-button>
                        <md-button class="md-raised md-accent" ng-click="">Enviar</md-button>
                    </div>
                </div>

            </div>

        </form>
    </div>
</div>
