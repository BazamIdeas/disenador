<md-dialog aria-label="pestana.nombre" flex="60">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <h2> {{pestana.nombre}}</h2>
        </div>
    </md-toolbar>
    <md-dialog-content>
        <form ng-switch="dialogosCuerpos">
            <div ng-switch-when="1">
                <md-select ng-model="categoria">
                    <md-option ng-value="categoria.idCategoria" ng-repeat="categoria in categorias">{{categoria.nombreCategoria}}</md-option>
                </md-select>
                
                <div layout class="margen_superior">
                    <div layout="row" flex layout-align="end">
                        <md-button class="md-primary  md-accent" ng-click="cancel('categoria', categoria)">Enviar</md-button>
                    </div>
                </div>
            </div>

            <div class="pasos preferencias" ng-switch-when="0">
                <div layout ng-repeat="prefrerencia in preferencias">
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
                    <div layout="row" flex layout-align="end">
                        <md-button class="md-primary  md-accent" ng-click="cancel('NuevaPreferencia', preferencias)">Enviar</md-button>
                    </div>
                </div>
            </div>
        </form>
    </md-dialog-content>
</md-dialog>
