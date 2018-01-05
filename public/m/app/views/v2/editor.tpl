    	<style ng-repeat="fuente in editor.fuentes">
    	    @font-face {
    	        font-family: '{{fuente.nombre}}';
    	        src: url('{{fuente.url}}');
    	    }
    	</style> 

        <section class="sub-menu editor">
        	<div class="row opciones-sub-header margin-bottom-0">
                <div class="col s12">
					<button  ng-class="{'active': editor.borradores}" ng-click="editor.mostrarBorradores()"><i class="material-icons">queue</i> BORRADORES</button>

                	<button ng-class="{'active': editor.preview}" ng-click="editor.mostrarPreviews()"><i class="material-icons">remove_red_eye</i> PREVIEW</button>

                	<button ng-class="{'loading-purple': !editor.completadoGuardar}" ng-click="editor.guardarLogo(editor.svgFinal, 'Logo y nombre', editor.logo.icono.idElemento)"><i class="material-icons" >save</i> GUARDAR</button>

                	<button ng-click="editor.buscarPlanes()"><i class="material-icons">shopping_cart</i> COMPRAR</button>
                </div>
            </div>
        </section>

        <section class="section-editor">
            <div class="row margin-bottom-0">
				
				<div class="contenedor-principal editor col s12 m6 offset-m3" ng-class="{'cuadricula': editor.cuadricula,'preview-abierto': editor.preview}" style="display: flex;" ng-style="{'background-color': editor.colorFondo}">
					<div class="contenedor-svg">
				       <bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-svg-final="editor.svgFinal" data-id-logo="editor.logo.idLogo" data-eslogan="editor.logo.eslogan"></bazam-svg>
				    </div>

				</div>
            </div>

        </section>

        <div class="panel-opciones nombre" ng-class="{'abierto': editor.opcionActiva == 1}">
            <div class="input-field col s12">
                <input id="nombre" type="text" name="fuente" maxlength="20" ng-model="editor.logo.texto" ng-model-options="{allowInvalid: true}" ng-change="editor.cambioTexto(editor.logo.texto)">
            </div>

            <md-input-container style="width:100%; padding: 0 0.75rem" >
                <md-select  class="cat-fuente" ng-style="{'font-family': editor.logo.fuente.nombre}" ng-model="editor.logo.fuente" placeholder="Fuente" ng-change="editor.cambioFuente(editor.logo.fuente, 'texto')" md-no-asterisk required> 
                    <md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}"  ng-selected="editor.logo.fuente.nombre == fuente.nombre">{{fuente.nombre}}</md-option>
                </md-select>
            </md-input-container>
        </div>

        <div class="panel-opciones slogan" ng-class="{'abierto': editor.opcionActiva == 2}">
            Panel slogan
        </div>        

        <div class="panel-opciones icono" ng-class="{'abierto': editor.opcionActiva == 3}">
            Panel icono
        </div>        

        <div class="opciones-editor" ng-class="{'abierto': true }">
            <ul>
                <li ng-click="editor.opcionActiva = 1" ng-class="{'valid': editor.opcionActiva == 1}">
                    <i class="material-icons">file_download</i>
                    Nombre
                </li>
                <li ng-click="editor.opcionActiva = 2" ng-class="{'valid': editor.opcionActiva == 2}">
                    <i class="material-icons">expand_more</i>
                    Slogan
                </li>
                <li ng-click="editor.opcionActiva = 3" ng-class="{'valid': editor.opcionActiva == 3}">
                    <i class="material-icons">expand_more</i>
                    Icono
                </li>
            </ul>
        </div>