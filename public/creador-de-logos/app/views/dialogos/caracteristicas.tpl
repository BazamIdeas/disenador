<md-dialog aria-label="Caracteristicas">
  <form ng-cloak>
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>Caracteristicas</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="cancel()">
          <md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-dialog-content>
      <div class="md-dialog-content">
        Contenido del Dialogo
      </div>
    </md-dialog-content>

    <md-dialog-actions layout="row">
      <span flex></span>
      <md-button class="md-primary md-raised" ng-click="answer('Useful')">
        Cerrar
      </md-button>
    </md-dialog-actions>
  </form>
</md-dialog>
