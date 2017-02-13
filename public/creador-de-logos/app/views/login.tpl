<div flex layout="column" layout-align="center" layout-padding>
    <div layout="row" layout-align="center">
        <form flex="20" class="md-whiteframe-5dp margen_formulario_login" layout-padding layout="column">
            <div>
                    <h3 class="text-center">Ingresar</h3>
                <div>   
                    <md-input-container class="md-block" >
                        <label>Usuario</label>
                        <input>
                    </md-input-container>

                    <md-input-container class="md-block" >
                        <label>Contraseña</label>
                        <input>
                    </md-input-container>
                </div>
                <div>
                    <md-button class="md-raised md-primary" ui-sref="dashboard">Enviar</md-button>
                </div>
            </div>
        </form>


        <form flex="20"  class="md-whiteframe-5dp" layout-padding>
            <div>
                    <h3 class="text-center">Registrar</h3>
                <div>   
                    <md-input-container class="md-block" >
                        <label>Nombre</label>
                        <input>
                    </md-input-container>

                    <md-input-container class="md-block" >
                        <label>Correo</label>
                        <input>
                    </md-input-container>
                    <md-input-container class="md-block" >
                        <label>Contraseña</label>
                        <input>
                    </md-input-container>
                </div>
                <div>
                    <md-button class="md-raised md-warn"  ui-sref="dashboard">Enviar</md-button>
                </div>
            </div>
        </form>
    </div>
</div>
