<div layout="column" flex>
    <div style="min-height:90%;" layout="column" layout-align="center">
        <div layout class="seccion-landing-uno layout-padding">
            <div flex>
                <div>
                    <p class="titulo">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <p class="sub-titulo">Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
            <div layout="column" flex="30" class="formulario-landing">
                <div>
                    <md-input-container class="md-block">
                        <label for="nombre">INGRESA EL NOMBRE DE TU LOGO</label>
                        <input type="text" name="nombre" ng-model="comienzo.nombreLogo" aria-label="nombre" maxlength="12" minlength="1">
                    </md-input-container>
                    <div layout layout-align="end">
                        <a href="creador-de-logos/#!/comenzar?nombre={{comienzo.nombreLogo}}">
                            <md-button class="boton-enviar">
                                DISEÑAR LOGO
                            </md-button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div layout="column" class="seccion-landing-dos" layout-padding layout-align="center">
        <div class="text-center">
            <p class="titulo">COMO FUNCIONA</p>
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
            <p class="titulo">ALGUNOS EJEMPLOS</p>
        </div>
        <div layout-align="center">
            <div layout flex layout-align="space-around" class="layout-padding">
                <div flex="30">
                    <img src="/landing/assets/img/ejemplo-uno.jpg">
                </div>
                <div flex="30">
                    <img src="/landing/assets/img/ejemplo-dos.jpg">
                </div>
                <div flex="30">
                    <img src="/landing/assets/img/ejemplo-tres.jpg">
                </div>
            </div>
        </div>
    </div>
</div>
