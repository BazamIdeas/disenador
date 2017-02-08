<div flex layout="column">
    <div flex="100" layout="row" layout-align="center flex-end"> 
         <md-content class="md-padding" layout="column">
            <div class="lock-size" layout="row" layout-align="flex-end">
              <md-fab-speed-dial md-open="false" md-direction="left"
                                 ng-class="opciones.modoSeleccionado" ng-click="opciones.estado=true">
                <md-fab-trigger>
                  <md-button aria-label="menu" class="md-fab md-warn">
                    <md-icon>build</md-icon>
                  </md-button>
                </md-fab-trigger>

                <md-fab-actions>
                  <md-button aria-label="Face" class="md-fab md-raised md-mini">
                    <md-icon>face</md-icon>
                  </md-button>
                  <md-button aria-label="Label" class="md-fab md-raised md-mini">
                    <md-icon>label</md-icon>
                  </md-button>
                  <md-button aria-label="Algo" class="md-fab md-raised md-mini">
                    <md-icon>lightbulb_outline</md-icon>
                  </md-button>
                </md-fab-actions>
              </md-fab-speed-dial>
            </div>
          </md-content>
    </div>
</div>