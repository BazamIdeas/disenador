<div bazam-scroll>
    <div class="row seccion uno">
        <div class="col s12">
            <div>
                <h1 class="titulo-principal">Cree en segundos un logo que amará</h1>
                <h4 class="text-center" style="color: #7d7d7d;">Nuestro generador de logos utiliza aprendizaje automático para
                    <br> diseñar conceptos llamativos y únicos</h4>
            </div>
            <br>
            <form name="form" ng-submit="ctrl.enviarComenzar(ctrl.datosCombinaciones, form.$valid)" novalidate>
                <div layout layout-align="space-between">

                    <div flex="40">
                        <md-input-container class=" md-block " style=" margin-bottom: 0; ">
                            <label>Nombre de su logo</label>
                            <input type="text" md-no-asterisk style="margin-bottom: 0;" ng-model="ctrl.datosCombinaciones.nombre" name="nombre" required>
                        </md-input-container>
                        <!-- VALIDACION -->
                        <div ng-messages="form.nombre.$error" style="color:maroon " role="alert " ng-show="(form.nombre.$dirty
                            && form.nombre.$invalid) || (form.$sumitted && form.$valid)">
                            <div ng-message="required ">Este campo es requerido.</div>
                        </div>

                        <md-input-container class="md-block ">
                            <label>Colores</label>
                            <md-select md-no-asterisk ng-model="ctrl.datosCombinaciones.colores" multiple class="md-block selector-de-colores" aria-label="filtro"
                                name="color" required>
                                <md-optgroup label="Colores">
                                    <md-option ng-value="item" class="estilo-de-color" ng-repeat="item in ctrl.categoriasPosibles.colores">
                                        <span style="background:{{item[0]}}; color:transparent;">{{item[0]}}</span>
                                        <span style="background:{{item[1]}};">{{item[1]}}</span>
                                        <span style="background:{{item[2]}};">{{item[2]}}</span>
                                    </md-option>
                                </md-optgroup>
                            </md-select>
                        </md-input-container>
                        <!-- VALIDACION -->
                        <div ng-messages="form.color.$error" style="color:maroon " role="alert " ng-show="(form.color.$touched
                                && form.color.$invalid) || (form.$sumitted && form.$valid)">
                            <div ng-message="required ">Este campo es requerido.</div>
                            </br>
                        </div>

                        <br>
                        <div class="input-tipografia">
                            <div class="label-form ">
                                ESTILO DE TIPOGRAFÍA
                            </div>
                            <div class="estilos-fuentes ">
                                <md-radio-group name="font " required ng-model="ctrl.datosCombinaciones.idFuente " class="md-primary ">
                                    <md-radio-button ng-repeat="estilo in ctrl.categoriasPosibles.fuentes " ng-value="estilo.idCategoria
                                        " ng-disabled=" d.isDisabled ">
                                        <md-tooltip md-direction="top">{{estilo.nombreCategoria}}</md-tooltip>
                                        <span class="estilo " ng-class="{'amatic':estilo.nombreCategoria == 'Clásicas', 'niconne':estilo.nombreCategoria == 'Moderna', 'julee':estilo.nombreCategoria == 'Llamativas', 'cabin':estilo.nombreCategoria == 'Minimalista'}">A</span>
                                    </md-radio-button>
                                </md-radio-group>
                            </div>

                            <!-- VALIDACION -->
                            <div ng-messages="form.font.$error" style="color:maroon " role="alert " ng-show="(form.font.$touched
                                        && form.font.$invalid) ||  (form.$sumitted && form.$valid)">
                                <div ng-message="required">Este campo es requerido.</div>
                                </br>
                            </div>
                        </div>
                    </div>
                    <div flex="40">

                        <md-input-container class="md-block">
                            <label>Actividad</label>
                            <md-select md-no-asterisk ng-model="ctrl.datosCombinaciones.idCategoria" class="md-block  categorias-select" aria-label="filtro
                            " name="cat" required>
                                <md-option ng-value="categoria.idCategoria" ng-repeat="categoria in ctrl.categoriasPosibles.iconos">{{categoria.nombreCategoria}}</md-option>
                            </md-select>
                        </md-input-container>
                        <!-- VALIDACION -->
                        <div ng-messages="form.cat.$error " style="color:maroon " role="alert " ng-show="form.cat.$touched
                            && form.cat.$invalid || form.$submitted">
                            <div ng-message="required">Este campo es requerido.</div>
                            </br>
                        </div>

                        <div>
                            <md-chips md-add-on-blur="true" ng-model="ctrl.datosCombinaciones.etiquetasSeleccionadas" md-separator-keys="[32,186,9,36,188,13,27]"
                                md-autocomplete-snap md-transform-chip="ctrl.etiquetasFunciones.transformChip($chip)">
                                <md-autocomplete md-selected-item="ctrl.selectedItem" md-search-text="ctrl.searchText" md-items="item in ctrl.etiquetasFunciones.querySearch(ctrl.searchText, ctrl.etiquetas)"
                                    md-item-text="item.traduccion.valor" placeholder="Etiquetas (Opcional)">
                                    <span md-highlight-text="ctrl.searchText">{{item.traduccion.valor}}</span>
                                </md-autocomplete>
                                <md-chip-template>
                                    <span>
                                        <strong>{{$chip.traduccion.valor}}</strong>
                                    </span>
                                </md-chip-template>
                            </md-chips>
                            <br/>
                        </div>
                        <br>
                        <div layout-padding>
                            <md-button ng-class="{'loading-white': ctrl.peticion}" type="submit " style="margin: 5% auto; display: block; color:white;    margin-top: 5%; background-color: var(--principal) !important; "
                                ng-disabled="ctrl.peticion" class="md-raised md-primary">
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
                <div class="caracteristicas__item " ng-repeat="caracteristica in ctrl.estaticos.caracteristicas">
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
        <bazam-carousel items="ctrl.estaticos.testimonios" opciones="ctrl.opcionesCarousel">
        </bazam-carousel>

        <div layout layout-align="center " flex>
            <a href="#comienzo" class="button-verde ">CREAR MI LOGO AHORA</a>
        </div>
    </div>

    <div class="row s12 seccion seis">
        <div class="titulo-destacado">PLANES</div>
        <div class="contenedor-planes" layout layout-align="space-around">
            <div class="plan" flex="25">
                <div>
                    <div class="plan-header">Plan gratis</div>
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
            <div flex="25" class="plan" ng-repeat="plan in ctrl.planes | filter: ctrl.comprobarMonedas">
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
                            <div class="plan-precio">{{ctrl.precioSeleccionado(plan.precios, ctrl.moneda)}}</div>
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
                <div class="pregunta" ng-repeat="item in ctrl.estaticos.preguntas">
                    <h6 ng-click="ctrl.preAct = $index">{{item.pregunta}}</h6>
                    <p ng-show="ctrl.preAct == $index">
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
                    in ctrl.destacados | limitTo : 8 " ng-click="ctrl.editar(destacado) ">
                <bazam-visualizar data-svg="ctrl.base64.decode(destacado.logo) " ng-click="ctrl.irEditor(destacado) "></bazam-visualizar>
            </div>
        </div>

        <div layout layout-align="center " class="margen_inferior ">
            <md-button class="md-raised " ng-click="ctrl.navegar.cliente( 'galeria') ">VER MAS</md-button>
        </div>
    </div>
</div>
-->

    <div class="row s12 " style=" background: #00968859; padding: 1%; margin: 0; ">
        <div layout layout-align="center " flex>
            <a href="#comienzo" class="button-verde link-scroll">CREAR MI LOGO AHORA</a>
        </div>
    </div>
</div>