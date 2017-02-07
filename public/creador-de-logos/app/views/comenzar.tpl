<div layout="row" layout-align="center">
    <form flex="30">
        <div ng-switch="comenzar.mostrar">
            <div ng-switch-when="1">
                <div>
                    <md-input-container class="md-block">
                        <label>Ingrese el nombre de su logo</label>
                        <input ng-model="comenzar.datos.nombre">
                    </md-input-container>
                </div>
                <div>
                    <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=2">Siguiente</md-button>
                </div>
            </div>
            <div ng-switch-when="2">
                <div>
                    <md-input-container>
                        <label>Categoría</label>
                        <md-select ng-model="comenzar.datos.categoria" md-selected-text="comenzar.datos.categoria">
                            <md-option ng-value="categoria" ng-repeat="categoria in comenzar.categoriasPosibles">{{categoria}}</md-option>
                        </md-select>
                    </md-input-container>
                </div>
                <div>
                    <md-button class="md-raised" ng-click="comenzar.mostrar=1">Atras</md-button>
                    <md-button class="md-raised" ng-click="comenzar.mostrar=3">Siguiente</md-button>
                </div>
            </div>
            <div ng-switch-when="3">
                
            </div>
            <div ng-switch-when="4">
            
            </div>
            
        </div>

    </form>
</div>
