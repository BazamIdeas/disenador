<div ng-controller="comienzoController as ctrl">
    <div class="row seccion uno">
        <!-- TITULO -->
        <div class="col s12 m12 l6 no-padding">
            <div class="titulo-inicio">
                <div>
                    <h1 class="titulo-principal">Cree en segundos
                        <br> un logo que amará</h1>
                    <span>.</span>
                </div>
                <div>
                    <h4 class="subtitle">Nuestro generador de logos utiliza
                        <br/> aprendizaje automático para diseñar
                        <br> conceptos llamativos y únicos</h4>
                </div>
            </div>
        </div>
        <!-- FORMULARIO -->
        <div class="col l5 m10 no-padding offset-m1 offset-s1 s10">
            <form name="form" ng-submit="ctrl.enviarComenzar(ctrl.datosCombinaciones, form.$valid)" novalidate>
                <div class="padding-top-4">
                    <!-- NOMBRE LOGO && ACTIVIDAD -->
                    <div flex layout>
                        <md-input-container class="md-block" flex style="    margin-right: 20px;">
                            <label>Nombre de su logo</label>
                            <input style="margin-bottom: 0;" type="text" md-no-asterisk ng-model="ctrl.datosCombinaciones.nombre" name="nombre" required
                                placeholder="Mi logo">
                            <!-- VALIDACION -->
                            <div ng-messages="form.nombre.$error " style="color: #E91E63 !important;  " role="alert " ng-show="form.nombre.$touched
                                            && form.nombre.$invalid || form.$submitted && form.nombre.$invalid">
                                <div ng-message="required">Escriba el nombre de su logo.</div>
                            </div>
                        </md-input-container>
                        <md-input-container class="md-block" flex>
                            <label>Actividad</label>
                            <md-select md-no-asterisk ng-model="ctrl.datosCombinaciones.idCategoria" class="md-block  categorias-select" aria-label="filtro
                                                                                        " name="cat">
                                <md-option ng-selected="$first" ng-value="categoria.idCategoria" ng-repeat="categoria in ctrl.categoriasPosibles.iconos">{{categoria.nombreCategoria}}</md-option>
                            </md-select>
                            <!-- VALIDACION
                                        <div ng-messages="form.cat.$error " style="color: #E91E63 !important; " role="alert ">
                                            <div ng-message="required" ng-show="form.cat.$touched && form.cat.$invalid || form.$submitted && form.cat.$invalid">Selecciona una actividad que le agrade.</div>
                                            </br>
                                        </div>
                                         -->
                        </md-input-container>
                    </div>
                    <!-- ETIQUETAS -->
                    <div flex>
                        <md-input-container class="md-block etiquetas" style="    margin-top: 30px;width: 100%;">
                            <label style="transform: none;     text-align: center; font-size: 20pt;
                            ">¿Que buscas?</label>
                            <md-chips md-add-on-blur="true" ng-model="ctrl.datosCombinaciones.etiquetasSeleccionadas" ng-class="{'without-placeholder':ctrl.datosCombinaciones.etiquetasSeleccionadas.length > 0}"
                                md-separator-keys="[32,186,9,36,188,13,27]" md-autocomplete-snap md-transform-chip="ctrl.etiquetasFunciones.transformChip($chip)">
                                <md-autocomplete md-selected-item="ctrl.selectedItem" md-search-text="ctrl.searchText" md-items="item in ctrl.etiquetasFunciones.querySearch(ctrl.searchText, ctrl.etiquetas)"
                                    md-item-text="item.traduccion.valor" placeholder="Ejemplo: Café">
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
                    <div class="label-form" style="    text-align: center;
                            padding-bottom: 4%; font-size: 20pt;
                            ">
                        Color y Tipografía
                    </div>
                    <div layout>
                        <div flex="40">
                            <bazam-palette-picker></bazam-palette-picker>
                        </div>
                        <div flex="60">
                            <div class="input-tipografia" ng-show="ctrl.categoriasPosibles.fuentes.length > 0">
                                <div class="estilos-fuentes">
                                    <md-radio-group name="font" required ng-model="ctrl.datosCombinaciones.idFuente" class="md-primary">
                                        <md-radio-button ng-repeat="estilo in ctrl.categoriasPosibles.fuentes | orderBy: $index" ng-value="estilo.idCategoria">
                                            <md-tooltip md-direction="bottom">{{estilo.nombreCategoria}}</md-tooltip>
                                            <span class="estilo" ng-class="{'estilo-1':estilo.nombreCategoria == 'Clásicas', 'estilo-4':estilo.nombreCategoria == 'Moderna', 'estilo-2':estilo.nombreCategoria == 'Llamativas', 'estilo-3':estilo.nombreCategoria == 'Minimalista'}">.</span>
                                        </md-radio-button>
                                    </md-radio-group>
                                    <div ng-messages="form.font.$error " style="color: #E91E63 !important; " role="alert " ng-show="form.font.$touched && form.font.$invalid || form.$submitted">
                                        <div ng-message="required">Selecciona un estilo de tipografía.</div>
                                        </br>
                                    </div>
                                </div>
                            </div>
                            <div layout-padding>
                                <md-button ng-class="{'loading-white': ctrl.peticion}" type="submit " ng-disabled="ctrl.peticion" class="md-raised md-primary boton-formulario-generar">
                                    GENERAR LOGO
                                </md-button>
                            </div>
                        </div>
                    </div>


                </div>
            </form>
        </div>
    </div>
    <!-- TESTIMONIOS 
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
                        <img ng-src="{{item.logo}}">
                    </div>
                </div>
            </carousel-item>
        </ui-carousel>
    </div>
    -->
    <div class="seccion">
        <div class="titulo-destacado">
            <p style="margin: 20px;">GALERÍA DE LOGOS</p>
            <span>.</span>
        </div>
        <div class="logos-predisenados">
            <div class='--item' ng-repeat="logo in ctrl.logosPredisenados | limitTo:8:ctrl.actual">
                <a href="">
                    <bazam-actualizar width="80%" data-svg="ctrl.base64.decode(logo.logo)"></bazam-actualizar>
                </a>
                <div class="tags">
                    <a href="#" ng-show="!logo.nombreCategoria">Destacado</a>
                    <a href="#" ng-show="logo.nombreCategoria">{{logo.nombreCategoria}}</a>
                </div>
            </div>
        </div>
    </div>

    <!-- CARACTERISTICAS -->
    <div class="row seccion dos ">
        <div>
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

    <!-- PREVIEW -->
    <div>
        <div class="col s12 ver-logo-enorme estatico" id="previsualizar">
            <div class="bazam-previzualizar-container one">
                <div class="preview" style="width: 102%;
                                    height: 100vh;
                                    background-image: url(/landing/assets/img/mockup/shirt.png), url(/landing/assets/img/mockup/shirt_overlay.png), url(/landing/assets/img/mockup/shirt_multiply.png);
                                    background-size: 100%;
                                    background-blend-mode: normal, overlay, multiply;
                                    background-color: {{datos.colores.fondo ? datos.colores.fondo : '#fcfcfc'}};
                                    background-repeat: no-repeat;
                                        ">
                    <div style="    left: 43%;
                                        padding-top: 28%;">
                        <bazam-actualizar data-svg="ctrl.estaticos.logoSVG"></bazam-actualizar>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column;padding-left: 5px;">

                    <div class="preview" style="padding-bottom:5px;    width: 100%;">
                        <div style="    transform: rotate(46deg);
                                            padding-top: 26%;
                                            left: 24%;">
                            <bazam-actualizar data-svg="ctrl.estaticos.logoSVG"></bazam-actualizar>
                        </div>
                        <img src="/landing/assets/img/mockup/card.png" width="100%" style=" height: calc(50vh - 5px); ">
                    </div>
                    <div class="preview" style="width: 100%;">
                        <div style="    transform: rotate(55deg);
                                            padding-top: 30%;
                                            left: 63%;">
                            <bazam-actualizar data-svg="ctrl.estaticos.logoSVG"></bazam-actualizar>
                        </div>
                        <img src="/landing/assets/img/mockup/leica.jpg" width="100%" style=" height:50vh; ">
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- PLANES -->
    <div class="row s12 seccion seis">
        <div class="titulo-destacado">
            <p style="margin: 20px;">Escoja el mejor plan para usted</p>
            <span>.</span>
        </div>
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
                        <md-button ng-disabled="ctrl.peticion" ng-click="ctrl.scrollTop()" class="md-raised md-primary boton-plan">
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
                        <md-button ng-disabled="ctrl.peticion" ng-click="ctrl.scrollTop()" class="md-raised md-primary boton-crear-logo">
                            SELECCIONAR
                        </md-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <md-button ng-click="ctrl.scrollTop()" class="md-raised md-primary boton-crear-logo" style="background-color: #5980b7 !important; color: white !important;">
                CREAR LOGO AHORA
            </md-button>
        </div>
    </div>

    <!-- PREGUNTAS -->
    <div class="row seccion cinco ">
        <div class="titulo-destacado text-green">
            <p style="margin: 20px;">Preguntas frecuentes</p>
            <span>.</span>
        </div>
        <div class="preguntas-contenedor">
            <div class="preguntas">
                <div ng-repeat="item in ctrl.estaticos.preguntas" ng-click="ctrl.preAct = $index" ng-class="{'activo': ctrl.preAct == $index}">
                    <h6>{{item.pregunta}}</h6>
                </div>
            </div>
            <div class="respuestas">
                <div ng-repeat="resp in ctrl.estaticos.preguntas" ng-class="{'activo': ctrl.preAct == $index}" ng-bind-html="ctrl.sce.trustAsHtml(resp.respuesta)"></div>
            </div>
        </div>
    </div>
</div>