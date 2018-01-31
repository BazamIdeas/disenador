<bazam-form-login data-mostrar="comienzo.mostrarLogin" data-callback="comienzo.callback"></bazam-form-login>

<div layout="column" flex>
    <div style="min-height:90%;" layout="column" layout-align="center">
        <div layout class="seccion-landing uno layout-padding">
            <div flex>
                <div>
                    <H1 style="text-align: center;" class="text-white">Cree su Logo en minutos</H1>
                    <p class="sub-titulo">“El diseño es el embajador silencioso de tu marca”</p>
                    <h4 style="color:white; text-align: center;">Paul Brand</h4>
                </div>
            </div>
            <div layout="column" flex="30" class="formulario-landing">
                <div>
                    <form name="form" novalidate layout="column" flex>
                        <div>
                            <md-input-container style=" margin-bottom: 0px; width:100%;" class="md-block">
                                <label for="nombre">NOMBRE DEL LOGO</label>
                                <input type="text" name="nombre" ng-model="comienzo.nombreLogo" aria-label="nombre" required>
                            </md-input-container>
                        </div>
                        <div layout layout-align="end">
                            <md-button class="boton-enviar" ng-disabled="!form.nombre.$valid" ng-click="comienzo.enviarComenzar(comienzo.nombreLogo, form.$valid)">
                                COMENZAR
                            </md-button>
                        </div>
                        <div ng-if="form.nombre.$touched" style="margin-left:8px;">
                            <div style="color:white; font-size:20px;" ng-if="form.nombre.$error.required">Por favor rellene el campo.</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="seccion-landing dos">
        <div class="text-center">
            <h2>CARACTERISTICAS</h2>
        </div>
        <div layout layout-align="space-around center" layout-wrap style="text-align: justify;" layout-padding>
            <div class="margen_inferior" flex="30" md-whiteframe="4dp" layout-padding ng-repeat="c in comienzo.caracteristicas">
                <div>
                    <img class="img-caracteristica" src="{{c.img}}" </div>
                    <div>
                        <h3 class="text-center">{{c.nombre}}</h3>
                    </div>
                    <div>{{c.descripcion}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="formulario-landing dos">
        <form name="form2" novalidate layout layout-align="center center">
            <md-input-container flex="25" style=" margin-bottom: 0px;">
                <label for="nombre">NOMBRE DEL LOGO</label>
                <input type="text" name="nombre" ng-model="comienzo.nombreLogo2" aria-label="nombre" required>
            </md-input-container>
            <div>
                <md-button class="boton-enviar" ng-disabled="!form2.nombre.$valid" ng-click="comienzo.enviarComenzar(comienzo.nombreLogo2, form2.$valid)">
                    COMENZAR
                </md-button>
            </div>
            <div ng-if="form2.nombre.$touched" style="margin-left:8px;">
                <div style="color:white; font-size:20px;" ng-if="form2.nombre.$error.required">Por favor rellene el campo.</div>
            </div>
        </form>

    </div>


    <!--
        **********************
        ********************** 
        LOGOS DESSTACADOS AQUI 
        **********************
        **********************
    -->
    <div class="seccion-landing dos">
        <div class="text-center">
            <h2>ELIJA ENTRE LAS MEJORES CREACIONES</h2>
        </div>
       <div layout layout-align="space-around center" layout-wrap style="text-align: justify;" layout-padding>
            <div class="margen_inferior l-destacado-landing" md-whiteframe="2dp" layout-padding ng-repeat="destacado in comienzo.destacados | limitTo : 8" ng-click="comienzo.editar(destacado)">
                <bazam-visualizar data-svg="comienzo.base64.decode(destacado.logo)" ng-click="comienzo.irEditor(destacado)"></bazam-visualizar>
            </div>
        </div>

        <div layout layout-align="center" class="margen_inferior">
            <md-button class="md-raised" ng-click="comienzo.navegar.cliente('galeria')">VER MAS</md-button>
        </div>
    </div>
    <div class="seccion-landing tres" layout layout-align="space-around center">
        <div class="opcion uno" ng-click="comienzo.navegar.freelance('editor');">TRABAJA CON NOSOTROS</div>
        <div class="opcion dos" ng-click="comienzo.navegar.cliente('editor');">CREAR MI LOGO</div>
    </div>
    <div class="seccion-landing cuatro">
        <div class="text-center ">
            <h2>EJEMPLOS Y TESTIMONIOS</h2>
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
    <div class="seccion-landing cinco">
        <div class="text-center text-white">
            <h2>PREGUNTAS FRECUENTES</h2>
        </div>
        <div class="preguntas">
            <div ng-repeat="p in comienzo.preguntas">
                <p ng-click="comienzo.modFun($index)">{{p.pregunta}}</p>
                <p ng-if="comienzo.modfire == $index && comienzo.modInit">{{p.respuesta}}</p>
            </div>
        </div>
    </div>
</div>