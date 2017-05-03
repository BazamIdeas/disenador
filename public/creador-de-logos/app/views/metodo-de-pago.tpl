<div flex layout="column" ng-cloak layout-align="start" ng-switch="metodo.mostrar">

    <div layout layout-align="center">
        <div flex="60" layout layout-align="center" class="margen_superio">
            <p class="titulo-blanco">COMPRE SU LOGO</p>
        </div>
    </div>
    <div layout layout-align="center">
        <div flex="50" layout="column" class="md-whiteframe-2dp" layout-padding>
            <div layout layout-align="space-around" ng-switch-when="inicial">
                <div class="tipo-logo" ng-click="metodo.mostrar=2">
                    <div class="tipo-logo-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <div>
                        <h3>Tarjeta de Credito</h3>
                        <p>Una forma facil de recordar en el centro de su logo.</p>
                    </div>
                </div>
                <div class="tipo-logo" ng-click="metodo.mostrar=3">
                    <div class="tipo-logo-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <div>
                        <h3>Paypal</h3>
                        <p>Un logo con gran impacto compuestos por su tipografía o texto y una imagen o símbolo.</p>
                    </div>
                </div>
            </div>

            <div ng-switch-when="2" class="pasos">
                <form class="credito" name="creditForm" layout="column">
                    <p class="text-center">TARJETA DE CREDITO</p>
                    <div layout>
                        <md-input-container flex>
                            <label>Nombre del titular</label>
                            <input type="text" ng-model="nombreTitular" required>
                        </md-input-container>
                        <md-input-container flex>
                            <label>Número de la tarjeta</label>
                            <input type="number" ng-model="numeroLargo" required maxlength="18">
                        </md-input-container>
                    </div>
                    <div>
                        <md-input-container>
                            <label>Mes</label>
                            <input type="number" ng-model="mes" required maxlength="2">
                        </md-input-container>
                        <md-input-container>
                            <label>Año</label>
                            <input type="number" ng-model="ano" required maxlength="2">
                        </md-input-container>
                        <md-input-container>
                            <label>Código de seguridad</label>
                            <input type="number" ng-model="codigo" required maxlength="3">
                        </md-input-container>
                    </div>
                    <div layout layout-align="space-between">
                        <md-button class="md-raised md-primary siguiente">PAGAR</md-button>
                         <md-button class="md-raised md-primary siguiente" ng-click="metodo.mostrar='inicial'">METODOS</md-button>
                    </div>
                </form>
            </div>
            <div ng-switch-when="3">
                <div ng-switch="metodo.mostrar">
                    <paypal-button env="metodo.opts.env" client="metodo.opts.client" payment="metodo.opts.payment" commit="metodo.opts.commit" on-authorize="metodo.opts.onAuthorize"></paypal-button>
                    <mensaje-compra ng-switch-when='2'>
                        Exitoso
                    </mensaje-compra>

                    <mensaje-compra ng-switch-when='3'>
                        Falido
                    </mensaje-compra>

                    <mensaje-compra ng-switch-when='4'>
                        Completo fallo
                    </mensaje-compra>
                </div>
            </div>
        </div>
    </div>
    <div layout layout-align="center">
        <div flex="50" layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="editor">Atras</md-button>
            <md-button ng-show="metodo.pago" class="md-raised md-primary siguiente" ui-sref="dashboard">Siguiente</md-button>
        </div>
    </div>
</div>
