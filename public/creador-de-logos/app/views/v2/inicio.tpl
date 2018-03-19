<!--<style ng-repeat="fuente in inicio.fuentes">
    @font-face {
        font-family: '{{fuente.nombre}}';
        src: url('{{fuente.url}}');
    }
</style>

<style type="text/css">
    /*
    @font-face {
        font-family: 'Decorativa';
        src: url('./assets/fonts/decorativo.ttf');
    }
    @font-face {
        font-family: 'Manuscrito';
        src: url('./assets/fonts/manuscrita.ttf');
    }
    @font-face {
        font-family: 'serif';
        src: url('./assets/fonts/serif.ttf');
    }
   

    @font-face {
        font-family: 'Sin Serif';
        src: url('./assets/fonts/sinserif.ttf');
    }
     */
</style>-->

<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col l2 logo">
            <h5 class="secundario" ui-sref="inicio">
                <i class="material-icons md-48 aling-top">fingerprint</i>
                <span>DISEÑADOR</span>
            </h5>
        </div>
        <div class="col l10 texto">
            <h5 class="principal"> CREA EN MINUTOS UN LOGO QUE AMARÁS</h5>
        </div>

    </div>
</section>

<section style="max-height: calc(100vh - 135px) !important; background-color: var(--fondo);">
    <div class="row margin-bottom-0">
        <form class="margin-bottom-0" name="inicio.datosForm">
            <div class="col l2 sidebar-1 scrollbar-dynamic" data-jquery-scrollbar="inicio.jqueryScrollbarOptions" style="position: static !important">
                <div class="input-field col s12" bazam-ayuda data-titulo="Nombre" data-texto="Ingrese el nombre para su logo" data-clases="['corner-lt']"
                    data-identificador="ayuda-nombre-logo" data-orientacion="right" data-paso="1" bazam-pasos-ayuda>
                    <input id="nombre" type="text" ng-model="inicio.datos.nombre" required>
                    <label for="nombre" class="active">Nombre</label>
                </div>

                <div>
                    <md-input-container style="width:100%" bazam-ayuda data-titulo="Categoria" data-texto="Seleccione la categoria o actividad de su empresa u ocupación"
                        data-clases="['corner-lt']" data-identificador="ayuda-categoria-icono" data-orientacion="right" data-paso="2"
                        bazam-pasos-ayuda>
                        <md-select style="width:100%" ng-model="inicio.datos.categoria.icono" placeholder="Categoria" md-no-asterisk required>
                            <md-option class="iconos" ng-repeat="categoria in inicio.categoriasPosibles.iconos track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
                        </md-select>
                    </md-input-container>
                </div>
                <div>
                    <md-input-container class="md-block " style="width:100%;">
                        <md-select style="width:100%" md-no-asterisk ng-model="inicio.datos.colores" multiple class="md-block selector-de-colores" aria-label="filtro"
                            name="color" placeholder="Colores" required>
                            <md-optgroup label="Colores">
                                <md-option ng-value="color" class="estilo-de-color" ng-repeat="color in inicio.colores" ng-selected="inicio.coloresIguales(color) || $index == 0">
                                    <span ng-style="{'background-color': color[0]}" style="color:transparent;" class="color-p">{{color[0]}}</span>
                                    <span ng-style="{'background-color': color[1]}">{{color[1]}}</span>
                                    <span ng-style="{'background-color': color[2]}">{{color[2]}}</span>
                                </md-option>
                            </md-optgroup>
                        </md-select>
                    </md-input-container>
                </div>

                <div class="input-tipografia">
                    <div class="label-form ">
                        ESTILO DE TIPOGRAFÍA
                    </div>
                    <div class="estilos-fuentes" style="position: relative">
                        <md-radio-group name="fuente" required ng-model="inicio.datos.categoria.fuente" class="md-primary">
                            <md-radio-button ng-repeat="fuenteCategoria in inicio.datos.fuentes" ng-value="fuenteCategoria.idCategoria"> <!--ng-disabled=" d.isDisabled "-->
                                <md-tooltip md-direction="top">{{fuenteCategoria.nombreCategoria}}</md-tooltip>
                                <span class="estilo" ng-class="{'amatic':fuenteCategoria.nombreCategoria == 'Clásicas', 'niconne':fuenteCategoria.nombreCategoria == 'Moderna', 'julee':fuenteCategoria.nombreCategoria == 'Llamativas', 'cabin':fuenteCategoria.nombreCategoria == 'Minimalista'}">A</span>
                            </md-radio-button>
                        </md-radio-group>

                         <!-- VALIDACION -->
                        <div ng-messages="inicio.datosForm.fuente.$error " style="color:maroon;" role="alert " ng-show="inicio.datosForm.$submitted ">
                            <div ng-message="required" style="top: 64px;">Debes elegir un estilo de Tipografía.</div>
                            </br>
                        </div>
                    </div>

                   
                </div>
                <!--
                <div>
                    <span ng-repeat="fuenteCategoria in inicio.categoriasPosibles.fuentes" ng-class="fuenteCategoria.nombreCategoria">
                        <label for="fuenteCat{{$index}}" style="font-size: 24px" ng-style="{'color': fuenteCategoria.idCategoria == inicio.datos.categoria.fuente ? 'red' : 'inheretit'}">A</label>
                        <input ng-model="inicio.datos.categoria.fuente" id="fuenteCat{{$index}}" type="radio" ng-value="fuenteCategoria.idCategoria"
                            required>
                    </span>
                </div>

                -->
                <div>
                    <md-chips style="padding:0;" md-add-on-blur="true" ng-model="inicio.datos.etiquetasSeleccionadas" md-separator-keys="[32,186,9,36,188,13,27]"
                        md-autocomplete-snap md-transform-chip="inicio.etiquetasFunciones.transformChip($chip)" style="width:100%; padding: 0 0.75rem">
                        <label>Etiquetas</label>
                        <md-autocomplete md-selected-item="inicio.selectedItem" md-search-text="inicio.searchText" md-items="item in inicio.etiquetasFunciones.querySearch(inicio.searchText, inicio.etiquetas)"
                            md-item-text="item.traduccion.valor" placeholder="Etiquetas (Opcional)">
                            <span md-highlight-text="inicio.searchText">{{item.traduccion.valor}}</span>
                        </md-autocomplete>
                        <md-chip-template>
                            <span>
                                <strong>{{$chip.traduccion.valor}}</strong>
                            </span>
                        </md-chip-template>
                    </md-chips>
                    <br/>
                </div>
                <div style="text-align: center;">
                    <button class="boton-verde" ng-class="{'loading-white': !inicio.completado}" ng-click="inicio.solicitarElementos()">{{inicio.logos.length ? "Cargar Más" : "Buscar"}}</button>
                </div>
            </div>
        </form>

        <div class="contenedor-principal col l7">

            <div class="row" style="margin-bottom:0;overflow-y: scroll; height: 100% ;width: 100%; display: flex; justify-content: center; align-items: center;" ng-if="!inicio.logos.length">
                <div style="width: 60%; height: 60%;">
                    <img style="width: 100%;" src="assets/images/logo-design.gif">
                </div>
            </div>  

            <div class="row" style="margin-bottom:0;overflow-y: scroll;height: 100%;" ng-if="inicio.logos.length">

                <div class="col l3 combinacion" style="position: relative" ng-repeat="logo in inicio.logos | orderBy: $index : true" ng-click="inicio.logoElegido = {svg: logo.cargado, colores: logo.colores, logoCompleto: logo}"
                    ng-init="logo.colores = inicio.obtenerColores(inicio.datos.colores)" ng-style="{'background-color': logo.colores[0]}">
                    <bazam-svg-text icono='inicio.base64.decode(logo.icono.svg)' url="logo.fuente.url" fuente="logo.fuente.nombre" texto="inicio.datos.nombre"
                        callback="logo.cargado" color-texto="logo.colores[2]" color-icono="logo.colores[1]"></bazam-svg-text>
                    <div class='overlay-logo loading-purple' ng-hide="logo.cargado"></div>

                </div>

            </div>
              
            <div class="overlay-combinacion" ng-class="{'open':inicio.logoElegido}">
                <div class="logo-elegido" ng-class="{'cambio': inicio.cambio}" ng-style="{'background-color': inicio.logoElegido.colores[0]}">
                    <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>	
                </div>

                <!--<button ng-if="inicio.logoElegido.id > 0" ng-click="inicio.moverse()" style="left: 9%;top: 34%;padding: 12px;"><i class="material-icons">keyboard_arrow_left</i></button>

                <button ng-if="inicio.logoElegido.id < inicio.logos.length - 1" ng-click="inicio.moverse('siguiente')" style="right: 11%;top: 34%;padding: 12px;"><i class="material-icons">keyboard_arrow_right</i></button>
                -->

                <button class="inicio-editar"  style="position: absolute;left: calc(50% - 10%);border-radius: 30px;bottom: 35px;width: 20%;margin: 0;font-size: 25px;padding: 5px;" ng-click="inicio.preAvanzar(inicio.logoElegido.logoCompleto)">Editar</button>
                <button ng-click="inicio.logoElegido = null"><i class="material-icons cerrar">clear</i></button>
            </div>

        </div>

        <div class="col l3" style="background-color: white; padding: 0px !important; max-height: calc(100vh - 9rem); overflow-y: auto; position: relative; height: 100%; margin: 0 0;">
            <div class="row padding-bottom-0 margin-bottom-0">
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 25%;position: absolute;left: calc(40% - 23%);top: 32%;transform: rotate(-48deg);">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <div style="width: 25%;position: absolute;left: calc(93% - 34%);top: 44%;transform: rotate(-48deg);filter: brightness(100%) invert(80%) contrast(100%);">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/tarjeta.png" width="100%">
                    </div>
                </div>
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 30.5%;position: absolute;left: calc(54% - 18%);top: 30%;">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/camiseta.jpg" width="100%">
                    </div>
                </div>
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 14%;position: absolute;left: calc(66% - 18%);top: 32%;">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 32%;">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <div style="width: 8%;position: absolute;left: calc(43.5% - 18%);top: 62%;">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/red.jpg" width="100%">
                    </div>
                </div>
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 30%;position: absolute;left: calc(28% - 18%);top: 6%;opacity: 0.9;filter: grayscale(1);">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <div style="width: 23%;position: absolute;left: calc(85% - 18%);top: 72%;filter: grayscale(1);opacity: 0.8;">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/sobre.jpg" width="100%">
                    </div>
                </div>

                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 22%;position: absolute;left: calc(73% - 18%);top: 30%;filter: blur(0.4px) grayscale(0.5);">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/camioneta.jpg" width="100%">
                    </div>
                </div>

                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 43%;position: absolute;left: calc(52% - 18%);top: 34%;filter: blur(0.6px) grayscale(0.5);opacity: 0.8;">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/taza.jpg" width="100%">
                    </div>
                </div>


                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 40%;position: absolute;left: calc(47.7% - 18%);top: 46%;transform: rotate(89deg);filter: grayscale(100%) contrast(50%);">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/etiqueta.jpg" width="100%">
                    </div>
                </div>
                
                <div class="col s12" style="padding:0">

                    <div style="position: relative;">
                        <div style="width: 33%;position: absolute;left: calc(50% - 18%);top: 17.5%;opacity: 0.9;">
                            <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
                        </div>
                        <img src="assets/images/mockups/envase.jpg" width="100%">
                    </div>
                </div>

            </div>
        </div>

    </div>
</section>

<bazam-form-login data-mostrar="inicio.mostrarModalLogin" data-callback="inicio.callback"></bazam-form-login>