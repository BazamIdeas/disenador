<div>
    <div class="row seccion uno">
        <div class="col s12 no-padding">
            <div class="titulo-inicio">
                <div>
                    <h1 class="titulo-principal">Cree en segundos
                        <br> un logo que amará</h1>
                </div>
                <div>
                    <h4 class="subtitle">Nuestro generador de logos utiliza
                        <br/> aprendizaje automático para diseñar
                        <br> conceptos llamativos y únicos</h4>
                </div>
            </div>
            <form name="form" ng-submit="ctrl.enviarComenzar(ctrl.datosCombinaciones, form.$valid)" novalidate>
                <div layout layout-align="space-between" class="padding-top-4">
                    <div flex="40">
                        <md-input-container class="md-block">
                            <label>Nombre de su logo</label>
                            <input style="margin-bottom: 0;" type="text" md-no-asterisk ng-model="ctrl.datosCombinaciones.nombre" name="nombre" required>
                            <!-- VALIDACION -->
                            <div ng-messages="form.nombre.$error " style="color: #E91E63 !important;  " role="alert " ng-show="form.nombre.$touched
                                && form.nombre.$invalid || form.$submitted && form.nombre.$invalid">
                                <div ng-message="required">Escriba el nombre de su logo.</div>
                            </div>
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Actividad</label>
                            <md-select md-no-asterisk ng-model="ctrl.datosCombinaciones.idCategoria" class="md-block  categorias-select" aria-label="filtro
                                                                            " name="cat" required>
                                <md-option ng-value="categoria.idCategoria" ng-repeat="categoria in ctrl.categoriasPosibles.iconos">{{categoria.nombreCategoria}}</md-option>
                            </md-select>
                            <!-- VALIDACION -->
                            <div ng-messages="form.cat.$error " style="color: #E91E63 !important; " role="alert ">
                                <div ng-message="required" ng-show="form.cat.$touched && form.cat.$invalid || form.$submitted && form.cat.$invalid">Selecciona una actividad que le agrade.</div>
                                </br>
                            </div>
                        </md-input-container>
                        <md-input-container class="md-block" style="    margin-top: 50px;">
                            <label style="font-size: 19pt !important;">¿Que buscas?</label>
                            <md-chips md-add-on-blur="true" ng-model="ctrl.datosCombinaciones.etiquetasSeleccionadas" md-separator-keys="[32,186,9,36,188,13,27]"
                                md-autocomplete-snap md-transform-chip="ctrl.etiquetasFunciones.transformChip($chip)">
                                <md-autocomplete md-selected-item="ctrl.selectedItem" md-search-text="ctrl.searchText" md-items="item in ctrl.etiquetasFunciones.querySearch(ctrl.searchText, ctrl.etiquetas)"
                                    md-item-text="item.traduccion.valor" placeholder="Ejemplo: Caballo">
                                    <span md-highlight-text="ctrl.searchText">{{item.traduccion.valor}}</span>
                                </md-autocomplete>
                                <md-chip-template>
                                    <span>
                                        <strong>{{$chip.traduccion.valor}}</strong>
                                    </span>
                                </md-chip-template>
                            </md-chips>
                            <br/>
                        </md-input-container>
                    </div>
                    <div flex="30" class="padding-top-2">
                        <div>
                            <div class="label-form text-center" style="    padding-left: 10%;">
                                Color
                            </div>
                            <br>
                            <bazam-palette-picker></bazam-palette-picker>
                        </div>
                    </div>
                    <div flex="30" class="padding-top-2">
                        <div class="input-tipografia" ng-show="ctrl.categoriasPosibles.fuentes.length > 0">
                            <div class="label-form ">
                                Estilo de Tipografía
                            </div>
                            <div class="estilos-fuentes">
                                <md-radio-group name="font" required ng-model="ctrl.datosCombinaciones.idFuente" class="md-primary ">
                                    <md-radio-button ng-repeat="estilo in ctrl.categoriasPosibles.fuentes " ng-value="estilo.idCategoria" ng-disabled=" d.isDisabled ">
                                        <md-tooltip md-direction="top">{{estilo.nombreCategoria}}</md-tooltip>
                                        <span class="estilo " ng-class="{'estilo-3':estilo.nombreCategoria == 'Clásicas', 'estilo-4':estilo.nombreCategoria == 'Moderna', 'estilo-1':estilo.nombreCategoria == 'Llamativas', 'estilo-2':estilo.nombreCategoria == 'Minimalista', 'negro': ctrl.datosCombinaciones.idFuente == estilo.idCategoria}">.</span>
                                    </md-radio-button>
                                </md-radio-group>
                                <div ng-messages="form.font.$error " style="color: #E91E63 !important; " role="alert " ng-show="form.font.$touched && form.font.$invalid || form.$submitted">
                                    <div ng-message="required">Selecciona un estilo de tipografía.</div>
                                    </br>
                                </div>
                            </div>
                        </div>
                        <div layout-padding>
                            <md-button ng-class="{'loading-purple': ctrl.peticion}" type="submit " ng-disabled="ctrl.peticion" class="md-raised md-primary boton-formulario-generar">
                                GENERAR LOGO
                            </md-button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="row s12 seccion tres">
        <ui-carousel class="testimonios" slides="ctrl.estaticos.testimonios" slides-to-show="3" slides-to-scroll="1" initial-slide="1"
            autoplay="true" autoplay-speed="2000" dots="true">
            <carousel-item>
                <div class="testimonios__carousel-item">
                    <div class="informacion">
                        <div class="descripcion">
                            <div class="bg-comilla"></div>
                            <div>
                                <h3>{{ item.descripcion }}</h3>
                            </div>
                            <div class="bg-comilla_derecha"></div>
                        </div>
                        <div class="cliente">
                            <div>
                                <span class="bg-icono-testimonio"></span>
                                <div>
                                    <h4 style="color:{{item.color}};">{{item.client.name}}</h4>
                                    <h5>{{item.client.ocupation}}</h5>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="logo-empresa">
                        <img src="{{item.logo}}">
                    </div>
                </div>
            </carousel-item>
        </ui-carousel>
    </div>

    <div class="row seccion dos ">
        <div class="col s12 ">
            <div class="caracteristicas">
                <div class="caracteristicas__item {{caracteristica.icono[1]}}" ng-repeat="caracteristica in ctrl.estaticos.caracteristicas">
                    <div class="{{caracteristica.icono[0]}}"></div>
                    <div>
                        <h4>{{caracteristica.titulo}}</h4>
                        <p>{{caracteristica.descripcion}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row s12 seccion seis">
        <div class="titulo-destacado">Escoja el mejor plan para usted</div>
        <div class="contenedor-planes">
            <div class="plan">
                <div>
                    <div class="plan-header">
                        <div class="plan-nombre">PLAN GRATUITO</div>
                        <div class="plan-precio">GRATIS</div>
                    </div>
                    <div class="plan-body">
                        <div>
                            <ul class="plan-lista">
                                <li>Versión pequeña de su logo</li>
                            </ul>
                        </div>

                    </div>
                    <div class="text-center">
                        <md-button ng-disabled="ctrl.peticion" class="link-scroll md-raised md-primary boton-plan">
                            SELECCIONAR
                        </md-button>
                    </div>
                </div>
            </div>
            <div class="plan" ng-repeat="plan in ctrl.planes | filter: ctrl.comprobarMonedas">
                <div>
                    <div class="plan-header">
                        <div class="plan-nombre">{{plan.plan}}</div>
                        <div class="plan-precio">{{ctrl.precioSeleccionado(plan.precios, ctrl.moneda)}}</div>
                    </div>
                    <div class="plan-body">
                        <div>
                            <ul class="plan-lista">
                                <li ng-repeat="carac in plan.caracteristicas" ng-if="carac.valor == '1'">{{carac.descripcion}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="text-center">
                        <md-button ng-disabled="ctrl.peticion" class="link-scroll md-raised md-primary boton-crear-logo">
                            SELECCIONAR
                        </md-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="text-center">
        <md-button ng-disabled="ctrl.peticion" class="link-scroll md-raised md-primary boton-crear-logo">
            CREAR LOGO AHORA
        </md-button>
    </div>
    <div class="row seccion cinco ">
        <div class="titulo-destacado text-green">
            <p style="margin: 20px;">Preguntas frecuentes</p>
            <span>.</span>
        </div>
        <div class="preguntas-contenedor">
            <div class="preguntas">
                <div ng-repeat="item in ctrl.estaticos.preguntas" ng-click="ctrl.preAct = $index">
                    <h6>{{item.pregunta}}</h6>
                </div>
            </div>
            <div class="respuestas">
                <div ng-repeat="resp in ctrl.estaticos.preguntas" ng-class="{'activo': ctrl.preAct == $index}"> {{resp.respuesta}}</div>
            </div>
        </div>
    </div>
</div>