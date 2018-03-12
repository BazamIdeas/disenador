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
                
            </div>
        </form>

        <div class="contenedor-principal col l8">
            <div class="row">
                <div class="col l3">
                    <bazam-svg-text icono='<svg fill="#020100"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#000000" d="M68.371,21.561c0.168,0.173-0.169,0.337-0.169,0.337   s-1.171,0.337-1.508,0.838c-0.337,0.338-0.834,1.504-0.834,1.504c0.67-0.164,1.508-0.337,2.342-0.675   c0.169,0,0.337,0.174,0.506,0.338c0.164,0-2.014,0.838-2.511,1.166c-0.337,0.347-2.009,1.686-2.51,1.686s-1.677,0.164-1.677,0.164   c0.169,0.337,0.337,0.665,0.665,1.166c0,0-1.166,0.675-1.166,0.839c-0.164,0.173-1.003,1.176-1.003,1.176s3.012,0.327,4.015-1.34   c-1.003,1.667-3.345,3.344-8.201,3.344c-5.021,0-9.034-2.004-11.713-3.007c-2.848-1.166-6.528-2.515-9.541-2.515   c-2.843,0-6.191,0.838-8.365,2.852c-3.85-1.503-9.207-0.674-11.718,1.668c-2.342,2.342-4.684,5.194-5.021,7.19   c-0.501,2.187-1.672,7.371-3.345,9.723c-2.346,3.835-5.021,4.847-5.859,6.514c-0.838,1.677-0.838,5.194-0.674,5.194   c0.337,0.164,1.513,0,2.182-0.338c1.34-0.501,5.017-4.346,6.356-6.187c1.339-1.85,5.864-9.886,6.529-12.72   c0.67-2.843,1.339-5.695,3.349-7.199c2.178-1.504,4.848-0.838,4.848-0.665c0,0-2.506,2.005-2.67,7.527   c-0.173,5.521,3.176,4.856,1.503,8.365c-1.676,3.015-6.692,1.002-8.364,2.842c-1.34,1.513,0,6.861,0,7.863   c0,1.012-0.51,5.695-0.838,6.871c-0.173,1.002,0,1.667-0.173,2.342c-0.164,0.51,1.012,0.665,1.012,0.665s-1.012,1.33-1.513,1.011   c-0.501-0.173-0.834-0.173-1.167,0c-0.337,0-1.002,0.319-1.676,0l-2.68,5.687c0.338,0.173,0.839,0.328,1.34,0.173   c0.674-0.173,4.019-1.686,4.355-2.022c0.501-0.164,3.345-1.832,3.846-2.834c0.337-1.003,1.002-4.191,1.002-5.185   c0.169-1.012,0.337-4.192,0.337-5.021c0-0.838-0.168-2.342,0-3.016c0.338-0.501,0.839-1.176,1.509-1.513   c0.833-0.164,1.836-0.164,2.004-0.164c0.338,0,3.185,0.337,3.682,0.337c0.67,0,3.349-0.501,4.019-0.847   c0.838-0.155,1.335,0,1.508,0.346c0.333,0.328-0.337,0.829-0.337,1.003c-0.164,0.163-1.504,1.84-1.841,2.505   c-0.337,0.839-1.504,2.342-1.166,3.017c0.332,0.665,0.332,0.838,1.335,1.349c1.007,0.318,4.852,2.342,7.029,4.347   c2.342,2.159,4.52,4.838,4.858,6.187c0.496,1.513,1.334,1.668,1.836,1.668c0.506,0.173,1.508,0.337,1.508,1.011   c0,0.666-0.173,1.504-0.173,1.504l6.196,2.343c0,0,0-2.179-0.164-3.008c-0.169-1.003-1.176-2.005-2.015-3.017   c-0.833-1.175-9.53-9.704-10.374-10.378c-0.833-0.502-1.508-1.167-1.672-2.506c-0.173-1.349,1.504-2.342,2.516-3.509   c0.665-0.838,2.506-4.692,2.838-5.202c0.333-0.492,1.508-1.832,2.173-1.832c0.839,0,2.68,1.176,5.025,2.005   c1.003,0.337,8.196,2.169,9.208,2.515c1.002,0.164,3.171,0,3.846,0.665c0.665,0.501,0,1.85-0.169,2.679   c-0.169,1.003-2.005,4.684-2.005,4.684s0.333,1.331,0.333,2.352c0,1.166-0.501,5.349-1.003,6.679   c-0.337,1.513-2.679,5.367-3.185,6.033c-0.332,0.501-0.833,0.839-0.833,1.677c0,0.829,1.503,1.012,2.004,1.668   c0.675,0.51,0.169,1.503,0,2.515l6.697,2.843c0-0.501,0.338-1.34,0-1.677c-0.173-0.492-1.002-1.503-1.503-2.178   c-0.337-0.501-1.508-2.342-1.841-2.679c-0.337-0.492-0.337-1.494,0-2.343c0.164-0.828,2.342-6.516,2.506-7.189   c0.337-0.829,3.518-7.536,3.85-8.365c0.337-1.002,3.012-5.858,3.349-6.697c0.333-1.011,2.511-1.841,3.181-1.841   c0.833,0,5.021,1.504,5.686,1.841c0.501,0.164,4.356,1.85,5.021,2.178c0.839,0.328,0.337,1.003-0.164,1.176   c-0.501,0.328-6.698,4.511-7.199,4.684c-0.501,0.164-1.002,0.656-1.34,0.656c-0.501,0-1.171,0.52-1.171,0.684   c0,0.337-0.164,1.002-1.002,1.002c-0.67,0-2.009-1.002-2.843-2.005c-1.176,0.665-2.01,1.176-2.515,2.169   c-0.834,0.829-1.171,1.513-1.673,2.679c0.338,0.337,1.007,0.492,1.504,0.492h5.357c0.502,0,1.171-0.155,1.677-0.319   c0.501-0.337,13.72-9.039,13.72-9.039s2.182-1.677,2.182-3.18c0-1.176-1.011-1.513-1.339-2.014   c-0.506-0.328-3.518-2.342-4.019-2.67c-0.675-0.501-3.017-1.85-3.682-2.187c-0.506-0.328-2.351-0.993-2.351-0.993   c0.51-1.513,0.843-2.68,1.007-3.017c0.173-0.337,0.173-3.354,0.333-3.854c0-0.492,0.843-2.67,1.175-3.007   c0.337-0.337,1.176-3.016,1.34-3.518c0.173-0.328,1.503-4.182,2.178-4.182c0.665-0.164,1.339,0.501,2.005,0.501   c0.674,0.164,3.18-0.164,4.52,0c1.175,0.164,2.679,1.677,3.016,1.841c0.501,0.173,1.668,0.665,2.005,0.665   c0.169,0,1.841-1.167,1.841-1.495c0-0.346-1.176-1.011-1.34-1.011c-0.164-0.164-1.335-0.839-1.335-0.839   c0,0.174,0.497-0.328,1.335-0.328c0.67,0,1.34,0.666,1.504,0.839c0.337,0.164,1.175,0.665,1.339,0.328   C99.33,32.777,100,31.938,100,31.438c0-0.674-0.67-1.503-1.003-1.841c-0.332-0.337-4.183-4.009-4.52-4.182   c-0.501-0.164-2.506-2.015-2.506-2.506c-0.173-0.347-1.175-1.176-1.339-1.349c-0.174-0.164-5.189-3.672-5.859-4.192   c-0.67-0.492-1.34-1.33-1.34-2.168c0-0.829-0.337-3.007-0.337-3.007s-1.166-0.164-1.672,0.328   c-0.497,0.346-1.672,3.025-2.342,3.025c-1.846-0.346-4.188,0.164-4.188,0.492c0.173,0.501,1.845,0.164,1.845,0.164   c0,0.173-0.67,1.002-1.176,1.002c-0.332,0-1.335,0.337-1.503,0.501c-0.333,0-1.003,0.52-1.003,0.52c0.497,0,1.003,0,1.673,0.154   c0,0-1.003,0.675-1.509,0.675c-0.496,0-2.173,0.501-2.674,0.665c-0.337,0.328-1.677,1.34-1.677,1.34h-1.504l0.164,0.337h0.839   V21.561z"' url="/fuentes/AlmendraSC-Regular.ttf" fuente="AlmendraSC" texto="hola"></bazam-svg-text>
                </div>
                <div class="col l3">
                    LOGO
                </div>
                <div class="col l3">
                    LOGO
                </div>
                <div class="col l3">
                    LOGO
                </div>
            </div>
               
        </div>

        <div class="col l2" style="background-color: white; padding-top: 10px !important; max-height: calc(100vh - 9rem); overflow-y: auto; position: relative; height: 100%; margin: 0 0;">
            Preview
        </div>

    </div>
</section>

<bazam-form-login data-mostrar="inicio.mostrarModalLogin" data-callback="inicio.callback"></bazam-form-login>
