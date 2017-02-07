<div layout="row" layout-align="center">
    <form flex="30">

        <div ng-show="comenzar.mostrar.nombre">

            <div>
                <md-input-container class="md-block" >
                    <label>Ingrese el nombre de su logo</label>
                    <input ng-model="comenzar.datos.nombre">
                </md-input-container>
            </div>

            <div>
                <md-button class="md-raised md-primary" ng-click="comenzar.mostrar.nombre=false; comenzar.mostrar.categoria=true">Siguiente</md-button>
            </div>
        </div>



        <div ng-show="comenzar.mostrar.categoria">

            <div>
                <md-input-container>
                    <label>Categoría</label>
                    <md-select ng-model="comenzar.datos.categoria" md-selected-text="comenzar.datos.categoria">

                        <md-option ng-value="categoria" ng-repeat="categoria in comenzar.categoriasPosibles">{{categoria}}</md-option>

                    </md-select>
                </md-input-container>
            </div>

            <div>
                <md-button class="md-raised" ng-click="comenzar.mostrar.nombre=true; comenzar.mostrar.categoria=false">Atras</md-button>

                <md-button class="md-raised" ng-click="comenzar.mostrar.categoria=false; comenzar.mostrar.preferencias=true">Siguiente</md-button>
            </div>
        </div>

        <div>


        </div>

    </form>
</div>
