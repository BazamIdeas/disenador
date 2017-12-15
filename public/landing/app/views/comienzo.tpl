<div layout="column" flex>
    <div style="min-height:90%;" layout="column" layout-align="center">
        <div layout class="seccion-landing-uno layout-padding">
            <div flex>
                <div>
                    <H1 style="text-align: center;" class="text-white" >Cree su Logo en minutos</H1>
                    <p class="sub-titulo">“El diseño es el embajador silencioso de tu marca.”</p>
                    <h4 style="color:white; text-align: center;">Paul Brand</h4>
                </div>
            </div>
            <div layout="column" flex="30" class="formulario-landing">
                <div>
                    <md-input-container class="md-block">
                        <label for="nombre">NOMBRE DEL LOGO</label>
                        <input type="text" name="nombre" ng-model="comienzo.nombreLogo" aria-label="nombre" maxlength="12" minlength="1">
                    </md-input-container>
                    <div layout layout-align="end">
                        <md-button class="boton-enviar" ng-click="comienzo.enviarComenzar(comienzo.nombreLogo)">
                            CREAR MI LOGO
                        </md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div layout="column" class="seccion-landing-dos" layout-padding layout-align="center">
        <div class="text-center">
            <h2>COMO FUNCIONA</h2>
        </div>
        <div layout layout-align="space-around" style="text-align: justify;">
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
    <div class="seccion-landing-tres" layout="column" layout-align="center">
        <div class="text-center text-white">
            <h2 class="text-center text-white" >ALGUNOS EJEMPLOS</h2>
        </div>
        <div layout-align="center">
            <div layout flex layout-align="space-around" class="layout-padding">
                <div flex="25">
                    <img src="/landing/assets/img/ejemplo-uno.jpg">
                    <span class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </div>
                <div flex="25">
                    <img src="/landing/assets/img/ejemplo-dos.jpg">
                      <span class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </div>
                <div flex="25">
                    <img src="/landing/assets/img/ejemplo-tres.jpg">
                      <span class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </div>
            </div>
        </div>
    </div>
</div>
