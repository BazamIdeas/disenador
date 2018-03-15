<!--<style ng-repeat="fuente in inicio.fuentes">
    @font-face {
        font-family: '{{fuente.nombre}}';
        src: url('{{fuente.url}}');
    }
</style>
-->
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
    */
    @font-face {
        font-family: 'Sin Serif';
        src: url('./assets/fonts/sinserif.ttf');
    }
</style>

<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col l2 logo">
            <h5 class="secundario" ui-sref="inicio.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
        </div>
        <div class="col l10 texto">
            <h5 class="principal"> CREA EN MINUTOS UN LOGO QUE AMARÁS</h5>
        </div>

    </div>
</section>

<section style="max-height: calc(100vh - 135px) !important; background-color: var(--fondo);">
    <div class="row margin-bottom-0">
        <form class="margin-bottom-0">
            <div class="col l2 sidebar-1 scrollbar-dynamic" data-jquery-scrollbar="inicio.jqueryScrollbarOptions" ng-form="inicio.datosForm" style="position: static !important">
                <div class="input-field col s12" bazam-ayuda data-titulo="Nombre" data-texto="Ingrese el nombre para su logo" data-clases="['corner-lt']" data-identificador="ayuda-nombre-logo" data-orientacion="right" data-paso="1" bazam-pasos-ayuda>
                    <input id="nombre" type="text"  ng-model="inicio.datos.nombre" required>
                    <label for="nombre" class="active">Nombre</label>
                </div>
              
                <div>
                    <md-input-container style="width:100%; padding: 0 0.75rem" bazam-ayuda data-titulo="Categoria" data-texto="Seleccione la categoria o actividad de su empresa u ocupación" data-clases="['corner-lt']" data-identificador="ayuda-categoria-icono" data-orientacion="right" data-paso="2" bazam-pasos-ayuda>
                        <md-select ng-model="inicio.datos.categoria.icono" placeholder="Categoria" required> 
                            <md-option class="iconos" ng-repeat="categoria in inicio.categoriasPosibles.iconos track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
                        </md-select>
                    </md-input-container> 
                </div>

                <div>
                    <span ng-repeat="fuenteCategoria in inicio.categoriasPosibles.fuentes" ng-class="fuenteCategoria.nombreCategoria">
                        <label for="fuenteCat{{$index}}" style="font-size: 24px" ng-style="{'color': fuenteCategoria.idCategoria == inicio.datos.categoria.fuente ? 'red' : 'inheretit'}">A</label>
                        <input ng-model="inicio.datos.categoria.fuente" id="fuenteCat{{$index}}" type="radio" ng-value="fuenteCategoria.idCategoria" required>
                    </span>
                </div>
                
                <div>
                    <div ng-click="inicio.solicitarElementos()" >{{inicio.logos.length ? "Cargar Más" : "Actualizar"}}</div>
                </div>
            </div>
        </form>

        <div class="contenedor-principal col l8" style="overflow: scroll;">
            <div class="row">
                <div class="col l3" style="position: relative" ng-repeat="logo in inicio.logos" ng-click="inicio.logoElegido = {svg: logo.cargado, id: $index}" ng-init="logo.colores = inicio.obtenerColores(inicio.datos.colores)" ng-style="{'background-color': logo.colores[0]}">
                    <bazam-svg-text icono='inicio.base64.decode(logo.icono.svg)' url="logo.fuente.url" fuente="logo.fuente.nombre" texto="inicio.datos.nombre" callback="logo.cargado" color-texto="logo.colores[1]" color-icono="logo.colores[0]"></bazam-svg-text>
                    <div class='overlay-logo loading-purple' ng-hide="logo.cargado"></div>

                    <button ng-if="inicio.logoElegido.id == $index" style="position: absolute; top: 0px; left: 0px;" ng-click="inicio.preAvanzar($index, logo.icono.color)">Editar</button>
                    
                </div>
            
            </div>
               
        </div>

        <div class="col l2" style="background-color: white; padding-top: 10px !important; max-height: calc(100vh - 9rem); overflow-y: auto; position: relative; height: 100%; margin: 0 0;">
            <div ng-if="!inicio.logoElegido">Preview</div>
            <div ng-if="inicio.logoElegido">
                <bazam-actualizar data-svg="inicio.logoElegido.svg"></bazam-actualizar>
            </div>
        </div>

    </div>
</section>

<bazam-form-login data-mostrar="inicio.mostrarModalLogin" data-callback="inicio.callback"></bazam-form-login>
