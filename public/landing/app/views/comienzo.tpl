<bazam-form-login data-mostrar="comienzo.mostrarLogin" data-callback="comienzo.callback"></bazam-form-login>

<div class="row seccion uno">
    <div class="col s12">
        <form name="form" ng-submit="comienzo.enviarComenzar(comienzo.datosCombinaciones, form.$valid)" novalidate ng-switch="comienzo.pasos">
            <div ng-switch-default>
                <div class="label-form">
                    NOMBRE DE SU LOGO
                </div>
                <md-input-row class="md-block">
                    <input type="text" ng-model="comienzo.datosCombinaciones.nombre" name="nombre" required>
                </md-input-row>
                <!-- VALIDACION -->
                <div ng-messages="form.nombre.$error" style="color:maroon" role="alert" ng-show="form.nombre.$touched && form.nombre.$invalid">
                    <div ng-message="required">Este campo es requerido.</div>
                </div>
                <br>
                <md-button ng-disabled="!form.$valid" class="md-raised md-primary md-mini" ng-click="comienzo.pasos = 1">
                    <md-icon>arrow_forward</md-icon>
                </md-button>

            </div>
            <div ng-switch-when="1">
                <div class="label-form">
                    OCUPACIÓN
                </div>
                <md-input-container class="md-block">
                    <md-select ng-model="comienzo.datosCombinaciones.idCategoria" class="md-block" aria-label="filtro" name="cat" required>
                        <md-option ng-value="categoria.idCategoria" ng-repeat="categoria in comienzo.categoriasPosibles.iconos">{{categoria.nombreCategoria}}</md-option>
                    </md-select>
                </md-input-container>
                <!-- VALIDACION -->
                <div ng-messages="form.cat.$error" style="color:maroon" role="alert" ng-show="form.cat.$touched && form.cat.$invalid">
                    <div ng-message="required">Este campo es requerido.</div>
                    </br>
                </div>

                <div layout layout-align="space-between">
                    <md-button ng-disabled="!form.$valid" class="md-raised md-primary md-mini" ng-click="comienzo.pasos = 2">
                        <md-icon>arrow_forward</md-icon>
                    </md-button>
                    <md-button class="md-raised md-primary md-mini" ng-click="comienzo.pasos = 'default'">
                        <md-icon>arrow_back</md-icon>
                    </md-button>
                </div>
            </div>
            <div ng-switch-when="2">
                <div class="label-form">
                    ESTILO DE TIPOGRAFÍA
                </div>
                <div class="estilos-fuentes">
                    <md-radio-group name="font" required ng-model="comienzo.datosCombinaciones.idFuente" class="md-primary">
                        <md-radio-button ng-repeat="estilo in comienzo.categoriasPosibles.fuentes" ng-value="estilo.idCategoria" ng-disabled=" d.isDisabled ">
                            <span class="estilo">A</span>
                        </md-radio-button>
                    </md-radio-group>
                </div>

                <!-- VALIDACION -->
                <div ng-messages="form.font.$error" style="color:maroon" role="alert" ng-show="form.font.$touched && form.font.$invalid">
                    <div ng-message="required">Este campo es requerido.</div>
                    </br>
                </div>

                <div layout layout-align="space-between">
                    <md-button type="submit" ng-disabled="!form.$valid" class="md-raised md-primary md-mini">
                        <md-icon>arrow_forward</md-icon>
                    </md-button>
                    <md-button class="md-raised md-primary md-mini" ng-click="comienzo.pasos = 1">
                        <md-icon>arrow_back</md-icon>
                    </md-button>
                </div>
            </div>
        </form>
    </div>
</div>

<div class="row seccion dos">
    <div class="col s12">
        <h2 class="titulo">CREA UN LOGO QUE AMARÁS</h2>
        <div class="caracteristicas">
            <div class="caracteristicas__item" style="margin-top: 6%;">
                <div style="border-color: #70c041;">
                    <h4>Titulo</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit
                        enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda
                        delectus debitis?</p>
                </div>
                <img src="landing/assets/img/c1.png">
            </div>
            <div class="caracteristicas__item">
                <div style="border-color: #f38f19;">
                    <h4>Titulo</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit
                        enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda
                        delectus debitis?</p>
                </div>
                <img src="landing/assets/img/c2.png">
            </div>
            <div class="caracteristicas__item" style="margin-top: 6%;">
                <div style="border-color: #b36ae2;">
                    <h4>Titulo</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit
                        enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda
                        delectus debitis?</p>
                </div>
                <img src="landing/assets/img/c3.png">
            </div>
            <div class="caracteristicas__item">
                <div style="border-color: #51a7f9;">
                    <h4>Titulo</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit
                        enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda
                        delectus debitis?</p>
                </div>
                <img src="landing/assets/img/c4.png">
            </div>
        </div>
    </div>
</div>

<div class="row s12 seccion tres">
    <div class="titulo-destacado">TITULO DESTACADO</div>
    <div class="ejemplos-papeleria">
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
        <div class="logo-svg">
            <bazam-visualizar></bazam-visualizar>
        </div>
    </div>
    <div layout layout-align="center" flex>
        <md-button class="button-verde">CREAR MI LOGO AHORA</md-button>
    </div>

</div>

<div class="row seccion cuatro">
    <div class="col s12">
        <div class="text-center">
            <h4>ELIJA ENTRE LAS MEJORES CREACIONES</h4>
        </div>
        <div layout layout-align="space-around center" layout-wrap style="text-align: justify;">
            <div class="margen_inferior l-destacado-landing" md-whiteframe="2dp" layout-padding ng-repeat="destacado in comienzo.destacados | limitTo : 8"
                ng-click="comienzo.editar(destacado)">
                <bazam-visualizar data-svg="comienzo.base64.decode(destacado.logo)" ng-click="comienzo.irEditor(destacado)"></bazam-visualizar>
            </div>
        </div>

        <div layout layout-align="center" class="margen_inferior">
            <md-button class="md-raised" ng-click="comienzo.navegar.cliente('galeria')">VER MAS</md-button>
        </div>
    </div>
</div>

<div class="row seccion cinco">
    <div class="col s12">
        <div class="text-center">
            <h4>EJEMPLOS Y TESTIMONIOS</h4>
        </div>
        <div>
            <ui-carousel slides="comienzo.testimonios" slides-to-show="1" slides-to-scroll="1" initial-slide="1" autoplay="true" autoplay-speed="5000"
                dots="true" arrows="false" class="comienzo-carousel">
                <carousel-item>
                    <div class="testimonio" layout>
                        <div class="t-texto" flex="50">
                            <div>{{item.titulo}}</div>
                            <div>
                                <span>{{item.texto}}</span>
                            </div>
                        </div>
                        <div class="t-imagen" flex="50" layout>
                            <img ng-src="{{item.img}}" alt="{{item.img}}">
                        </div>
                    </div>
                </carousel-item>
            </ui-carousel>
        </div>
    </div>
</div>

<div class="row s12" style=" background: #00968859; padding: 3%; margin: 0; ">
    <div layout layout-align="center" flex>
        <md-button class="button-verde">CREAR MI LOGO AHORA</md-button>
    </div>
</div>