<bazam-form-login data-mostrar="comienzo.mostrarLogin" data-callback="comienzo.callback"></bazam-form-login>

<div class="row seccion uno">
    <div class="col s12">
        <div>
            <h1 class="titulo-principal">Cree en segundos un logo que amará</h1>
            <h4 class="text-center" style="color: #7d7d7d;">Nuestro generador de logos utiliza aorendizaje automático para
                <br> diseñar conceptos llamativos y únicos</h4>
        </div>
        <br>
        <form name="form" ng-submit="comienzo.enviarComenzar(comienzo.datosCombinaciones, form.$valid)" novalidate>
            <div layout layout-align="space-between">

                <div flex="40">
                    <md-input-container class=" md-block " style=" margin-bottom: 0; ">
                        <label>Nombre de su logo</label>
                        <input type="text " ng-model="comienzo.datosCombinaciones.nombre " name="nombre " required>
                    </md-input-container>
                    <!-- VALIDACION -->
                    <div ng-messages="form.nombre.$error " style="color:maroon " role="alert " ng-show="form.nombre.$touched
                            && form.nombre.$invalid ">
                        <div ng-message="required ">Este campo es requerido.</div>
                    </div>

                    <md-input-container class="md-block ">
                        <label>Colores</label>
                        <md-select ng-model="comienzo.datosCombinaciones.colores" multiple class="md-block " aria-label="filtro" name="color" required>
                            <md-optgroup label="Colores">
                                <md-option ng-value="color" class="estilo-de-color" ng-value="categoria.color" ng-repeat="color in comienzo.categoriasPosibles.colores">
                                    <span style="background:{{color.primero}};">{{color.primero}}</span>
                                    <span style="background:{{color.segundo}};">{{color.segundo}}</span>
                                    <span style="background:{{color.tercero}};">{{color.tercero}}</span>
                                    <span style="background:{{color.cuarto}};">{{color.cuarto}}</span>
                                    <span style="background:{{color.quinto}};">{{color.quinto}}</span>
                                </md-option>
                            </md-optgroup>
                        </md-select>
                    </md-input-container>
                    <!-- VALIDACION -->
                    <div ng-messages="form.cat.$error " style="color:maroon " role="alert " ng-show="form.cat.$touched
                                && form.cat.$invalid ">
                        <div ng-message="required ">Este campo es requerido.</div>
                        </br>
                    </div>

                    <br>
                    <div style="width: 68%; ">
                        <div class="label-form ">
                            ESTILO DE TIPOGRAFÍA
                        </div>
                        <div class="estilos-fuentes ">
                            <md-radio-group name="font " required ng-model="comienzo.datosCombinaciones.idFuente " class="md-primary ">
                                <md-radio-button ng-repeat="estilo in comienzo.categoriasPosibles.fuentes " ng-value="estilo.idCategoria
                                        " ng-disabled=" d.isDisabled ">
                                    <span class="estilo ">A</span>
                                </md-radio-button>
                            </md-radio-group>
                        </div>

                        <!-- VALIDACION -->
                        <div ng-messages="form.font.$error " style="color:maroon " role="alert " ng-show="form.font.$touched
                                        && form.font.$invalid ">
                            <div ng-message="required ">Este campo es requerido.</div>
                            </br>
                        </div>
                    </div>
                </div>
                <div flex="40">

                    <md-input-container class="md-block ">
                        <label>Actividad</label>
                        <md-select ng-model="comienzo.datosCombinaciones.idCategoria " class="md-block " aria-label="filtro
                            " name="cat " required>
                            <md-option ng-value="categoria.idCategoria " ng-repeat="categoria in comienzo.categoriasPosibles.iconos ">{{categoria.nombreCategoria}}</md-option>
                        </md-select>
                    </md-input-container>
                    <!-- VALIDACION -->
                    <div ng-messages="form.cat.$error " style="color:maroon " role="alert " ng-show="form.cat.$touched
                            && form.cat.$invalid ">
                        <div ng-message="required ">Este campo es requerido.</div>
                        </br>
                    </div>

                    <div>
                        <md-chips ng-model="comienzo.datosCombinaciones.etiquetasSeleccionadas" md-autocomplete-snap md-transform-chip="comienzo.transformChip($chip)">
                            <md-autocomplete md-selected-item="comienzo.selectedItem" md-search-text="comienzo.searchText" md-items="item in comienzo.querySearch(comienzo.searchText)"
                                md-item-text="item.name" placeholder="Etiquetas">
                                <span md-highlight-text="comienzo.searchText">{{item.name}}</span>
                            </md-autocomplete>
                            <md-chip-template>
                                <span>
                                    <strong>{{$chip.name}}</strong>
                                </span>
                            </md-chip-template>
                        </md-chips>
                        <br/>
                    </div>
                    <br>
                    <div layout-padding>
                        <md-button type="submit " style="margin: 5% auto; display: block; color:white;    margin-top: 5%; background: var(--principal) !important; "
                            ng-disabled="!form.$valid
                                        " class="md-raised md-primary md-mini ">
                            Generar su logo ahora
                        </md-button>
                    </div>
                </div>
            </div>
            <div>
                <h6 class="ver-video">Ver video
                    <md-icon>keyboard_arrow_right</md-icon>
                </h6>
            </div>
        </form>
    </div>
</div>

<div class="row seccion dos ">
    <div class="col s12 ">
        <h2 class="titulo text-green">TITULO SECUNDARIO</h2>
        <div class="caracteristicas ">
            <div class="caracteristicas__item " ng-repeat="caracteristica in comienzo.caracteristicas ">
                <div style="border-color:{{caracteristica.color}} ">
                    <h4>{{caracteristica.titulo}}</h4>
                    <p>{{caracteristica.descripcion}}</p>
                </div>
                <img ng-src="{{caracteristica.img}} ">
            </div>
        </div>
    </div>
</div>

<div class="row s12 seccion tres ">
    <div class="titulo-destacado">EJEMPLOS Y TESTIMONIOS</div>
    <div class="slider-pro" ng-switch="comienzo.pasos">
        <div ng-switch-default>
            <div class="ejemplos-papeleria">
                .
            </div>
        </div>
        <div ng-switch-when="1">
            <ui-carousel slides="comienzo.testimonios " slides-to-show="1 " slides-to-scroll="1 " initial-slide="1
                " autoplay="true " autoplay-speed="5000 " dots="true " arrows="false " class="comienzo-carousel ">
                <carousel-item>
                    <div class="testimonio">
                        <div class="t-head">
                            <i style="color:{{item.color}};" class="fas fa-quote-left"></i>
                            <img src="{{item.logo}}">
                            <i style="color:{{item.color}};" class="fas fa-quote-right"></i>

                        </div>
                        <div class="t-body">
                            {{item.descripcion}}
                        </div>
                        <span style="display:block; border-bottom:2px solid {{item.color}}; width:20%; margin: auto;     margin-bottom: 19px;
                color: transparent;">.</span>
                        <div class="t-footer">
                            <img src="{{item.client.img}}">
                            <div>
                                <b>{{item.client.name}}</b>
                                <br>
                                <p>{{item.client.activity}}</p>
                            </div>
                        </div>
                    </div>
                </carousel-item>
            </ui-carousel>
        </div>
        <button class="button-left" ng-click="comienzo.pasos = 'default'">
            <md-icon>keyboard_arrow_left</md-icon>
        </button>
        <button class="button-right" ng-click="comienzo.pasos = 1">
            <md-icon>keyboard_arrow_right</md-icon>
        </button>
    </div>

    <div layout layout-align="center " flex>
        <md-button class="button-verde ">CREAR MI LOGO AHORA</md-button>
    </div>
</div>
<div class="row s12 seccion seis">
    <div class="titulo-destacado">PLANES</div>
    <div class="contenedor-planes" layout layout-align="space-around">
        <div class="plan" flex="25">
            <div>
                <div class="plan-header">PLAN GRATIS</div>
                <div class="plan-body">
                    <div>
                        <p class="subtitulo-plan">descripcion</p>

                        <ul class="plan-lista">
                            <li>Poderosamente gratis</li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <div class="plan-precio">$0</div>
                        <a class="boton-verde" href="#comienzo">SELECCIONAR</a>
                    </div>
                </div>
            </div>
        </div>
        <div flex="25" class="plan" ng-repeat="plan in comienzo.planes | filter: comienzo.comprobarMonedas">
            <div>
                <div class="plan-header">{{plan.plan}}</div>
                <div class="plan-body">
                    <div>
                        <p class="subtitulo-plan">{{plan.info}}</p>

                        <ul class="plan-lista">
                            <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{carac.descripcion}}</li>
                        </ul>
                    </div>

                    <div class="text-center">
                        <div class="plan-precio">{{comienzo.precioSeleccionado(plan.precios, comienzo.moneda)}}</div>
                        <a class="boton-verde" href="#comienzo">SELECCIONAR</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row seccion cinco ">
    <div class="col s12 ">
        <div class="titulo-destacado text-green">PREGUNTAS FRECUENTES</div>
        <div class="preguntas">
            <div class="pregunta" ng-repeat="item in comienzo.preguntas">
                <h6 ng-click="comienzo.preAct = $index">{{item.pregunta}}</h6>
                <p ng-show="comienzo.preAct == $index">
                    {{item.respuesta}}
                </p>
            </div>
        </div>
    </div>
</div>

<!--
    CREACIONES EXITOSAS

<div class="row seccion cuatro ">
    <div class="col s12 ">
        <div class="text-center ">
            <h4>ELIJA ENTRE LAS MEJORES CREACIONES</h4>
        </div>
        <div layout layout-align="space-around center " layout-wrap style="text-align: justify; ">
            <div class="margen_inferior l-destacado-landing " md-whiteframe="2dp " layout-padding ng-repeat="destacado
                    in comienzo.destacados | limitTo : 8 " ng-click="comienzo.editar(destacado) ">
                <bazam-visualizar data-svg="comienzo.base64.decode(destacado.logo) " ng-click="comienzo.irEditor(destacado) "></bazam-visualizar>
            </div>
        </div>

        <div layout layout-align="center " class="margen_inferior ">
            <md-button class="md-raised " ng-click="comienzo.navegar.cliente( 'galeria') ">VER MAS</md-button>
        </div>
    </div>
</div>
-->

<div class="row s12 " style=" background: #00968859; padding: 1%; margin: 0; ">
    <div layout layout-align="center " flex>
        <md-button class="button-verde ">CREAR MI LOGO AHORA</md-button>
    </div>
</div>