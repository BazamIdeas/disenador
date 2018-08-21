<section class="body">
    <div class="row">
        <div class="col l2 sidebar">
            <form class="margin-bottom-0" name="inicio.datosForm" novalidate>

                <!-- NOMBRE-->

                <div class="input-field col s12" bazam-ayuda data-titulo="Nombre" data-texto="Ingrese el nombre para su logo" data-clases="['corner-lt']"
                    data-identificador="ayuda-nombre-logo" data-orientacion="right" data-paso="1" bazam-pasos-ayuda>
                    <input id="nombre" type="text" ng-model="inicio.datos.nombre" maxlength="40" required>
                    <label style="padding:0 !important" for="nombre" class="active">{{::inicio.lang.formulario.nombre.label}}</label>
                </div>

                <!-- ETIQUETAS-->

                <md-input-container class="col s12">
                    <label>{{::inicio.lang.formulario.etiquetas.label}}</label>
                    <md-chips md-require-match="true" style="padding:0;" md-add-on-blur="false" md-max-chips="5" ng-model="inicio.datos.etiquetasSeleccionadas" md-separator-keys="[32,186,9,36,188,13,27]"
                        md-autocomplete-snap md-transform-chip="inicio.etiquetasFunciones.transformChip($chip)" ng-class="{'without-placeholder':inicio.datos.etiquetasSeleccionadas.length > 0}">
                        <md-autocomplete md-no-cache="true" md-min-length="3" md-selected-item="inicio.selectedItem" md-search-text="inicio.searchText" md-items="item in inicio.etiquetasFunciones.querySearch(inicio.searchText)"
                            md-item-text="item.traducciones[0].valor" placeholder="{{::inicio.lang.formulario.etiquetas.placeholder}}">
                            <span md-highlight-text="inicio.searchText">{{::item.traducciones[0].valor}}</span>
                        </md-autocomplete>
                        <md-chip-template>
                            <span>
                                <strong>{{$chip.traducciones[0].valor}}</strong>
                            </span>
                        </md-chip-template>
                    </md-chips>
                </md-input-container>

                <!-- CATEGORIAS -->

                <md-input-container class="col s12" bazam-ayuda data-titulo="Categoria" data-texto="Seleccione la categoria o actividad de su empresa u ocupación"
                    data-clases="['corner-lt']" data-identificador="ayuda-categoria-icono" data-orientacion="right" data-paso="2"
                    bazam-pasos-ayuda>
                    <label>{{::inicio.lang.formulario.categorias.label}}</label>
                    <md-select ng-model="inicio.datos.categoria.icono" placeholder="{{::inicio.lang.formulario.categorias.placeholder}}" ng-change="inicio.resetPredisenado()" md-no-asterisk>
                        <md-option class="iconos" ng-repeat="categoria in inicio.categoriasPosibles.iconos track by categoria.idCategoria" ng-value="::categoria.idCategoria">{{::categoria.nombreCategoria}}</md-option>
                    </md-select>
                </md-input-container>
                <br>
                <div class="input col s12">
                    <bazam-palette-picker></bazam-palette-picker>
                </div>
                <br>
                <div class="input select-tipografia col s12">
                    <div class="label-form" style="margin-bottom: 8px;">
                        {{::inicio.lang.formulario.fuentes.label}}
                    </div>
                    <div class="estilos" style="position: relative">
                        <md-radio-group name="fuente" required ng-model="inicio.datos.categoria.fuente" class="md-primary">
                            <md-radio-button ng-repeat="fuenteCategoria in inicio.datos.fuentes track by fuenteCategoria.idCategoria" ng-value="::fuenteCategoria.idCategoria">
                                <md-tooltip md-direction="bottom">{{::fuenteCategoria.nombreCategoria}}</md-tooltip>
                                <span class="estilo" ng-class="{'estilo-2':fuenteCategoria.nombreCategoria == 'Llamativas', 'estilo-4':fuenteCategoria.nombreCategoria == 'Moderna', 'estilo-3':fuenteCategoria.nombreCategoria == 'Minimalista', 'estilo-1':fuenteCategoria.nombreCategoria == 'Clásicas'}">.</span>
                            </md-radio-button>
                        </md-radio-group>

                        <!-- VALIDACION -->
                        <div ng-messages="inicio.datosForm.fuente.$error" style="color:maroon; padding-bottom:20px;" role="alert ">
                            <div ng-message="required" style="top: 64px; margin-bottom: 10px;" ng-show="inicio.datosForm.fuente.$error && inicio.datosForm.$submitted">{{::inicio.lang.formulario.fuentes.validacion[0]}}</div>
                        </div>
                    </div>

                </div>
                <div class="input col s12">
                    <button type="submit" class="boton-verde" style="width: 100%;" ng-class="{'loading-white': !inicio.completado}" ng-click="inicio.solicitarElementos()">{{inicio.logos.length ? inicio.lang.formulario.submit[0] : inicio.lang.formulario.submit[1]}}</button>
                </div>
            </form>
        </div>

        <div class="principal-container col l10">

            <div class="gif row" style="margin-bottom:0;overflow-y: scroll; height: 100% ;width: 100%; display: flex; justify-content: center; align-items: center; background: white;"
                ng-if="!inicio.logos.length">
                <div style="width: 60%; height: 90%; display: flex; align-items: center; justify-content: center;">
                    <img style="width: 40%;" src="assets/images/gifs/d.gif">
                </div>
            </div>

            <div class="combinaciones row" ng-if="inicio.logos.length">

                <div class="col l3 combinacion" ng-repeat="logo in inicio.logos | orderBy: $index : true" ng-init="logo.colores = inicio.obtenerColores(inicio.datos.colores); logo.random = (1 + inicio.colorRandom(4))">

                    <div class="share-email" ng-if="logo.mostrarCompartir" ng-form="inicio.compartirEmailForm">
                        <md-icon class="material-icons cerrar-compartir-email" role="img" aria-label="close" ng-click="logo.mostrarCompartir = false;">close</md-icon>

                        <div class="input-field">
                            <input name="correo" type="email" ng-model="logo.email" placeholder="Email" required/>

                            <!-- VALIDACION -->
                            <div ng-messages="inicio.compartirEmailForm.correo.$error" role="alert" ng-if="inicio.compartirEmailForm.correo.$dirty || inicio.compartirEmailForm.$submitted">
                                <div ng-message="required">Este campo es requerido.</div>
                                <div ng-message="email">Debe ser un email válido.</div>
                            </div>
                        </div>

                        <button ng-click="inicio.compartirPorEmail(logo.email, logo, inicio.compartirEmailForm.$valid); inicio.compartirEmailForm.$setSubmitted()"
                            ng-class="{'loading-white':!inicio.completadoCompartir }">ENVIAR</button>
                    </div>

                    <!-- NUEVO LOGO -->
                    <div class="combinacion-box" ng-if="!logo.atributos" ng-style="{'background-color': logo.colores[logo.random]}">


                        <bazam-svg-text svg='inicio.base64.decode(logo.icono.svg)' url="logo.fuente.url" fuente="logo.fuente.nombre" texto="inicio.datos.nombre" callback="logo.cargado" color-texto="logo.colores[0]" color-icono="logo.colores[0]" ng-click="inicio.comprarLogo(logo.cargado, [logo.colores[0], logo.colores[logo.random]],  logo, logo.idLogo, true)"></bazam-svg-text>
                        <div class='overlay c-gif' ng-hide="logo.cargado"></div>

                        <span class="accion" style="bottom: 81%;" ng-click="inicio.preGuardarLogo(logo)">
                            <p>{{::inicio.lang.combinaciones.guardar}}</p>
                            <img ng-src="{{logo.idLogo ?'assets/images/save_active.svg' : 'assets/images/save.svg'}}" alt="">
                        </span>

                        <span class="accion" style="bottom: 63%;" ng-click="inicio.preAvanzar(logo)">
                            <p>{{::inicio.lang.combinaciones.editar}}</p>
                            <img src="assets/images/edit_white.svg" alt="">
                        </span>

                        <span style="bottom: 45%" class="accion share">


                            <span ng-click="inicio.compartir('google', logo)">
                                <i class="fab fa-google-plus-g"></i>
                            </span>
                            <span ng-click="inicio.compartir('facebook',logo)">
                                <i class="fab fa-facebook-f"></i>
                            </span>
                            <span ng-click="inicio.compartir('twitter', logo)">
                                <i class="fab fa-twitter"></i>
                            </span>
                            <span ng-click="inicio.compartir('pinterest', logo)">
                                <i class="fab fa-pinterest"></i>
                            </span>
                            <span ng-click="logo.mostrarCompartir = true">
                                <i class="fas fa-envelope"></i>
                            </span>



                            <img src="assets/images/share.svg" alt="">
                        </span>

                        <!-- <span ng-show="logo.cargado" class="comprar" style="bottom: 3%;     right: 15%;" ng-click="inicio.comprarLogo(logo.cargado,logo.colores,  logo, logo.idLogo )">
                            <p>COMPRAR</p>
                            <img src="assets/images/shop.svg" alt="">
                        </span> -->

                    </div>

                    <!-- LOGO PREDISEÑADO  -->
                    <div class="combinacion-box" ng-if="logo.atributos" style="background-color: white;">
                        
                        <bazam-visualizar data-svg="inicio.base64.decode(logo.svg)" ng-click="inicio.comprarLogo(logo.cargado, [logo.colores[0], logo.colores[logo.random]],  logo, logo.idLogo, true)"></bazam-visualizar>
                        <!--
                        <span class="accion" style="bottom: 81%;" ng-click="inicio.preGuardarLogo(logo)">
                            <p>{{::inicio.lang.combinaciones.guardar}}</p>
                            <img ng-src="{{logo.idLogo ?'assets/images/save_active.svg' : 'assets/images/save.svg'}}" alt="">
                        </span>
                        -->
                        <span class="accion" style="bottom: 63%;" ng-click="inicio.preAvanzar(logo, true)">
                            <p>{{::inicio.lang.combinaciones.editar}}</p>
                            <img src="assets/images/edit_white.svg" alt="">
                        </span>

                        <span style="bottom: 45%" class="accion share">


                            <span ng-click="inicio.compartir('google', logo)">
                                <i class="fab fa-google-plus-g"></i>
                            </span>
                            <span ng-click="inicio.compartir('facebook',logo)">
                                <i class="fab fa-facebook-f"></i>
                            </span>
                            <span ng-click="inicio.compartir('twitter', logo)">
                                <i class="fab fa-twitter"></i>
                            </span>
                            <span ng-click="inicio.compartir('pinterest', logo)">
                                <i class="fab fa-pinterest"></i>
                            </span>
                            <span ng-click="logo.mostrarCompartir = true">
                                <i class="fas fa-envelope"></i>
                            </span>



                            <img src="assets/images/share.svg" alt="">
                        </span>

                        <!-- <span class="comprar" style="bottom: 3%;     right: 15%;" ng-click="inicio.comprarLogo(logo.cargado,logo.colores,  logo, logo.idLogo )">
                            <p>COMPRAR</p>
                            <img src="assets/images/shop.svg" alt="">
                        </span> -->

                    </div>

                </div>

                <div class="col l3 combinacion" ng-repeat="logo in inicio.logosFantasmas">

                    <!-- NUEVO LOGO -->
                    <div class="combinacion-box">
                        <svg viewBox="0 0 100 100"></svg>
                        <div class='overlay c-gif'></div>
                    </div>

                </div>

            </div>


        </div>

    </div>
</section>

<bazam-previsualizar-dos estado="inicio.verPrevisualizar" datos="inicio.datosComprar" guardar-logo="inicio.guardarLogo"></bazam-previsualizar-dos>

<bazam-planes estado="inicio.abrirPlanes" datos="inicio.datosComprar" guardar-logo="inicio.guardarLogo"></bazam-planes>