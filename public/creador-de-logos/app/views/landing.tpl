<div layout="column" flex class="back-landing">
    <div layout class="seccion-landing-uno layout-padding">
        <div flex>
            <div>
                <p class="titulo">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p class="sub-titulo">Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </div>
        <div layout="column" flex="30" class="formulario-landing">
            <div class="text-center">
                <h3>Diseña tu logo</h3>
            </div>
            <div>
                <md-input-container class="md-block">
                    <label for="nombre">Ingrese el nombre de su logo</label>
                    <input type="text" name="nombre" ng-model="nombreLogo" aria-label="nombre" maxlength="12" minlength="1">
                </md-input-container>
                <md-button class="boton-enviar" ui-sref="comenzar({datos:nombreLogo})">
                    Enviar
                </md-button>
            </div>
        </div>
    </div>
    <div layout="column" class="seccion-landing-dos" layout-padding>
        <div class="text-center">
            <p class="titulo">COMO FUNCIONA</p>
        </div>
        <div layout layout-align="space-around" layout-padding style="    text-align: justify;">
            <div layout="column" flex="30" md-whiteframe="4dp" layout-padding>
                <div layout layout-align="center center">
                    <hr class="hr-land">
                    <p class="hr-p">1</p>
                    <hr class="hr-land">
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptatibus ipsam dolor culpa nemo, vitae dolores cupiditate. Voluptates at architecto eum asperiores itaque inventore porro, sed repellendus, veniam adipisci vero?</div>
            </div>

            <div layout="column" flex="30" md-whiteframe="4dp" layout-padding>
                 <div layout layout-align="center center">
                    <hr class="hr-land">
                    <p class="hr-p">2</p>
                    <hr class="hr-land">
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptatibus ipsam dolor culpa nemo, vitae dolores cupiditate. Voluptates at architecto eum asperiores itaque inventore porro, sed repellendus, veniam adipisci vero?</div>
            </div>

            <div layout="column" flex="30" md-whiteframe="4dp" layout-padding>
                 <div layout layout-align="center center">
                    <hr class="hr-land">
                    <p class="hr-p">3</p>
                    <hr class="hr-land">
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptatibus ipsam dolor culpa nemo, vitae dolores cupiditate. Voluptates at architecto eum asperiores itaque inventore porro, sed repellendus, veniam adipisci vero?</div>
            </div>
        </div>
    </div>
    <div layout layout-align="center">
        <div layout flex layout-align="space-around" class="seccion-landing-tres layout-padding">
            <div flex="30">
                <div>
                    <img src="../../assets/img/casa.jpg">
                </div>
                <div layout-padding>
                    <p class="resena-landing">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit dolore recusandae, perferendis</p>
                </div>
            </div>

            <div flex="30">
                <div>
                    <img src="../../assets/img/casa.jpg">
                </div>
                <div layout-padding>
                    <p class="resena-landing">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit dolore recusandae, perferendis</p>
                </div>
            </div>

            <div flex="30">
                <div>
                    <img src="../../assets/img/casa.jpg">
                </div>
                <div layout-padding>
                    <p class="resena-landing">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit dolore recusandae, perferendis</p>
                </div>
            </div>


        </div>
    </div>
</div>
