<section class="body">
    <div class="row">
        <div class="col l2 sidebar">
            <form class="margin-bottom-0" name="inicio.datosForm" novalidate>
                <div class="input-field col s12" bazam-ayuda data-titulo="Nombre" data-texto="Ingrese el nombre para su logo"
                    data-clases="['corner-lt']" data-identificador="ayuda-nombre-logo" data-orientacion="right" data-paso="1"
                    bazam-pasos-ayuda>
                    <input id="nombre" type="text" ng-model="inicio.datos.nombre" maxlength="40"equired>
                    <label style="padding:0 !important" for="nombre" class="active">Nombre</label>
                </div>

                <md-input-container class="col s12">
                    <label>¿Que buscas?</label>
                    <md-chips style="padding:0;" md-add-on-blur="true" ng-model="inicio.datos.etiquetasSeleccionadas" md-separator-keys="[32,186,9,36,188,13,27]"
                        md-autocomplete-snap md-transform-chip="inicio.etiquetasFunciones.transformChip($chip)">
                        <md-autocomplete md-selected-item="inicio.selectedItem" md-search-text="inicio.searchText" md-items="item in inicio.etiquetasFunciones.querySearch(inicio.searchText, inicio.etiquetas)"
                            md-item-text="item.traduccion.valor" placeholder="Ejemplo: Perro">
                            <span md-highlight-text="inicio.searchText">{{::item.traduccion.valor}}</span>
                        </md-autocomplete>
                        <md-chip-template>
                            <span>
                                <strong>{{$chip.traduccion.valor}}</strong>
                            </span>
                        </md-chip-template>
                    </md-chips>
                </md-input-container>

                <md-input-container class="col s12" bazam-ayuda data-titulo="Categoria" data-texto="Seleccione la categoria o actividad de su empresa u ocupación"
                    data-clases="['corner-lt']" data-identificador="ayuda-categoria-icono" data-orientacion="right" data-paso="2"
                    bazam-pasos-ayuda>
                    <label>Categorias</label>
                    <md-select ng-model="inicio.datos.categoria.icono" placeholder="Categoria" md-no-asterisk>
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
                        Estilo de tipografía
                    </div>
                    <div class="estilos" style="position: relative">
                        <md-radio-group name="fuente" required ng-model="inicio.datos.categoria.fuente" class="md-primary">
                            <md-radio-button ng-repeat="fuenteCategoria in inicio.datos.fuentes track by fuenteCategoria.idCategoria" ng-value="::fuenteCategoria.idCategoria">
                                <md-tooltip md-direction="bottom">{{::fuenteCategoria.nombreCategoria}}</md-tooltip>
                                <span class="estilo" ng-class="{'estilo-1':fuenteCategoria.nombreCategoria == 'Clásicas', 'estilo-4':fuenteCategoria.nombreCategoria == 'Moderna', 'estilo-2':fuenteCategoria.nombreCategoria == 'Llamativas', 'estilo-3':fuenteCategoria.nombreCategoria == 'Minimalista'}">.</span>
                            </md-radio-button>
                        </md-radio-group>

                        <!-- VALIDACION -->
                        <div ng-messages="inicio.datosForm.fuente.$error" style="color:maroon; padding-bottom:20px;" role="alert ">
                            <div ng-message="required" style="top: 64px; margin-bottom: 10px;" ng-show="inicio.datosForm.fuente.$error && inicio.datosForm.$submitted">Debes elegir un estilo de Tipografía.</div>
                        </div>
                    </div>

                </div>
                <div class="input col s12">
                    <button type="submit" class="boton-verde" style="width: 100%;" ng-class="{'loading-white': !inicio.completado}" ng-click="inicio.solicitarElementos()">{{inicio.logos.length ? "CARGAR MÁS" : "BUSCAR"}}</button>
                </div>
            </form>
        </div>

        <div class="principal-container col l10">

            <div class="gif row" style="margin-bottom:0;overflow-y: scroll; height: 100% ;width: 100%; display: flex; justify-content: center; align-items: center; background: white;"
                ng-if="!inicio.logos.length">
                <div style="width: 60%; height: 90%; display: flex; align-items: center">
                    <img style="width: 100%;" src="assets/logo.pro.svg">
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

                    <div class="combinacion-box" ng-style="{'background-color': logo.colores[logo.random]}">

                        <bazam-svg-text svg='inicio.base64.decode(logo.icono.svg)' url="logo.fuente.url" fuente="logo.fuente.nombre" texto="inicio.datos.nombre"
                            callback="logo.cargado" color-texto="logo.colores[0]" color-icono="logo.colores[0]" ng-click="inicio.comprarLogo(logo.cargado, [logo.colores[0], logo.colores[logo.random]],  logo, logo.idLogo,true)"></bazam-svg-text>
                        <div class='overlay b-gif' ng-hide="logo.cargado"></div>

                        <span class="accion" style="bottom: 81%;" ng-click="inicio.preGuardarLogo(logo)">
                            <p>GUARDAR</p>
                            <img ng-src="{{logo.idLogo ?'assets/images/save_active.svg' : 'assets/images/save.svg'}}" alt="">
                        </span>

                        <span class="accion" style="bottom: 63%;" ng-click="inicio.preAvanzar(logo)">
                            <p>EDITAR</p>
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

                        <span ng-show="logo.cargado" class="comprar" style="bottom: 3%" ng-click="inicio.comprarLogo(logo.cargado,logo.colores,  logo, logo.idLogo )">
                            <p>COMPRAR</p>
                            <img src="assets/images/shop.svg" alt="">
                        </span>
                    
                    </div>

                </div>

            </div>


        </div>

    </div>
</section>

<bazam-previsualizar-dos estado="inicio.verPrevisualizar" datos="inicio.datosComprar" guardar-logo="inicio.guardarLogo"></bazam-previsualizar-dos>

<bazam-planes estado="inicio.abrirPlanes" datos="inicio.datosComprar" guardar-logo="inicio.guardarLogo"></bazam-planes>