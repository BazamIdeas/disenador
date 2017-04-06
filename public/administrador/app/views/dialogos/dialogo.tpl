<md-dialog aria-label="Caracteristicas">
  <form ng-cloak>
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>Caracteristicas</h2>
        <span flex></span>
      </div>
    </md-toolbar>

    <md-dialog-content>
      <div class="md-dialog-content">
        Has Seleccionado {{dialog.elementoDialog.name}}
      </div>
    </md-dialog-content>

    <md-dialog-actions layout="row">
      <span flex></span>
      <md-button class="md-primary md-raised" ng-click="dialog.cerrarDialogo()">
        Cerrar
      </md-button>
    </md-dialog-actions>
  </form>
</md-dialog>
