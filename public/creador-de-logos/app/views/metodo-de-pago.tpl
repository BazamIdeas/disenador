<div flex layout="column" layout-align="space-between" ng-cloak>

    <div layout="row" layout-align="start" class="margen_superior">
        <div flex="30" class="contenedor_logos md-whiteframe-2dp">
            <h3 layout-padding class="text-center h_seccion_dashboard p_header">Compre su logo</h3>
        </div>

    </div>
    <div layout layout-align="space-around center">
        <metodo_pago class="md-whiteframe-2dp">
            <p_header class="p_header" layout-padding>
                METODOS DE PAGO
            </p_header>
            <p_body layout-padding>
                <md-radio-group layout ng-model="metodo_p.datos.tipo" name="tipo" ng-required="true">
                    <md-radio-button value="1" ng-click="metodo.pago=true">
                        Paypal
                        <md-icon class="material-icons"> payment </md-icon>
                    </md-radio-button>
                    <md-radio-button value="2" ng-click="metodo.pago=true">
                        Tarjeta de credito
                        <md-icon class="material-icons"> credit_card </md-icon>
                    </md-radio-button>
                    <md-radio-button value="3" ng-click="metodo.pago=true">
                        Transferencia
                        <md-icon class="material-icons"> attach_money </md-icon>
                    </md-radio-button>
                </md-radio-group>
            </p_body>
            <p_footer layout layout-align="center center">

            </p_footer>
        </metodo_pago>
    </div>

    <div layout="row" class="margen_superior" layout-align="space-between">
        <div flex layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="editor">Atras</md-button>
            <md-button ng-show="metodo.pago" class="md-raised md-primary siguiente" ui-sref="dashboard">Siguiente</md-button>
        </div>
    </div>
</div>
