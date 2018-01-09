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
            <div class="row margin-bottom-0" ng-class="{'cuadricula': editor.cuadricula, 'preview-abierto': editor.preview}">
				
				<div class="contenedor-principal editor col s12 m6 offset-m3"  style="display: flex;height: calc(100vh - 142px) !important;" ng-style="{'background-color': editor.colorFondo}">
					<div class="contenedor-svg">
				       <bazam-svg data-svg="editor.base64.decode(editor.logo.icono.svg)" data-texto="editor.logo.texto" data-fuente="editor.logo.fuente" data-svg-final="editor.svgFinal" data-id-logo="editor.logo.idLogo" data-eslogan="editor.logo.eslogan"></bazam-svg>
				    </div>
				</div>

                <div class="contenedor-borradores" ng-class="{'abierto': editor.borradores}" style="overflow: scroll;">

                    <div class="cerrar-contenedor-bi" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
                        <i class="material-icons cerrar">clear</i>
                    </div>
                    <div class="row padding-bottom-0 margin-bottom-0">
                        <div class="col s10 offset-s1" style="padding: 0.42rem .35rem !important;">
                            <div class="agregar" ng-click="editor.realizarComparacion(editor.comparar)"><i class="material-icons">add</i> <span>AGREGAR</span></div>
                        </div>
                        <div class="col s10 offset-s1" style="position: relative;padding: 0">

                            <div class="row">

                                <div class="col s10 offset-s1 m4 contenedor-opcion-icono" ng-repeat="comparacion in editor.comparaciones track by comparacion.creacion">

                                    <div class="opcion-borrador" ng-class="{'seleccionado': editor.comparacionSeleccionada.index == $index}" ng-click="editor.seleccionarBorrador($index,comparacion)">

                                        <bazam-visualizar style="width: 100%;" data-svg="comparacion.svg">
                                        </bazam-visualizar>
                                        
                                    </div>

                                </div>

                                <div ng-show="!editor.comparaciones.length" layout-padding style="height: 105px;display: flex;align-items: center;justify-content: center;font-family: 'futura-heavy' !important;font-size: 20px;">
                                    No existe ningun borrador
                                </div>
                            </div>
                    
                        </div>
                    </div>
                </div>

                <div class="contenedor-previews" style="overflow: scroll;">
                    
                    <div class="cerrar-contenedor-p" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
                        <i class="material-icons cerrar">clear</i>
                    </div>  
                    <div class="row padding-bottom-0 margin-bottom-0">
                        <div class="col s12">
                            
                            <div style="position: relative;">
                                <div style="width: 36%; position: absolute;position: absolute;left: calc(50% - 18%);top: 25%;">
                                    <bazam-visualizar ng-if="editor.preview" data-svg="editor.svgFinal"></bazam-visualizar> 
                                </div>
                                <img src="assets/images/ipad.png" width="100%">
                            </div>
                        </div>
                        <div class="col s12">
                            
                            <div style="position: relative;">
                                <div style="width: 36%; position: absolute;position: absolute;left: calc(50% - 18%);top: 25%;">
                                    <bazam-visualizar ng-if="editor.preview" data-svg="editor.svgFinal"></bazam-visualizar> 
                                </div>
                                <img src="assets/images/ipad.png" width="100%">
                            </div>
                        </div>
                        <div class="col s12">
                            
                            <div style="position: relative;">
                                <div style="width: 36%; position: absolute;position: absolute;left: calc(50% - 18%);top: 25%;">
                                    <bazam-visualizar ng-if="editor.preview" data-svg="editor.svgFinal"></bazam-visualizar> 
                                </div>
                                <img src="assets/images/ipad.png" width="100%">
                            </div>
                        </div>
                        <div class="col s12">
                            
                            <div style="position: relative;">
                                <div style="width: 36%; position: absolute;position: absolute;left: calc(50% - 18%);top: 25%;">
                                    <bazam-visualizar ng-if="editor.preview" data-svg="editor.svgFinal"></bazam-visualizar> 
                                </div>
                                <img src="assets/images/ipad.png" width="100%">
                            </div>
                        </div>
                    </div>  
                </div>
                
                <div class="contenedor-iconos" ng-class="{'abierto': editor.busquedaIconos}" style="overflow: scroll;">
                    
                    <div class="cerrar-contenedor-bi" ng-click="editor.borradores = false; editor.busquedaIconos = false; editor.preview = false">
                        <i class="material-icons cerrar">clear</i>
                    </div>

                    <div class="row padding-bottom-0 margin-bottom-0">

                        <div class="col s10 offset-s1" style="position: relative;">
                        
                            <div class="col s12" style="padding: 10px 0.075rem;height: 70px;">
                                <div style="background: var(--principal);color: white;border-radius: 3px;padding: 2;cursor: pointer; height: 50px; width: 100%; display: flex;align-items: center;justify-content: center;" ng-click="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" ng-class="{ 'loading-white': !editor.completadoBuscar}">
                                    <i class="material-icons" style="font-size: 33px;">refresh</i>
                                </div>
                            </div>

                            <div class="col s12 m4 l6 contenedor-opcion-icono"  ng-click="editor.reemplazarIcono(icono);editor.borradores = false; editor.busquedaIconos = false; editor.preview = false" ng-repeat="icono in editor.iconos">
                                <div class="opcion-icono" style="padding: 10px;">
                                    <bazam-visualizar data-svg="editor.base64.decode(icono.svg)">
                                    </bazam-visualizar>
                                </div>
                            </div>

                        </div>
                    </div>                    
                </div>
            </div>

        </section>

        <div class="panel-opciones nombre" ng-class="{'abierto': editor.opcionActiva == 1 && editor.opcionActiva != false}">
            <div class="row margin-bottom-0">
                <div class="col s6">
                    <div class="input-field">
                        <input id="nombre" type="text" name="fuente" maxlength="20" ng-model="editor.logo.texto" ng-model-options="{allowInvalid: true}" ng-change="editor.cambioTexto(editor.logo.texto)">
                    </div>

                    <md-input-container style="width:100%;">
                        <md-select  class="cat-fuente" ng-style="{'font-family': editor.logo.fuente.nombre}" ng-model="editor.logo.fuente" placeholder="Fuente" ng-change="editor.cambioFuente(editor.logo.fuente, 'texto')" md-no-asterisk required> 
                            <md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}"  ng-selected="editor.logo.fuente.nombre == fuente.nombre">{{fuente.nombre}}</md-option>
                        </md-select>
                    </md-input-container>    
                </div> 
                <div class=" col s6 estilo-texto">
                    <div class="negrita" ng-click="editor.cambioPropiedad('bold')">
                        N
                    </div>               
                    <div class="cursiva" ng-click="editor.cambioPropiedad('cursive')">
                        C
                    </div>               
                </div>
                <div class=" col s6 estilo-texto">
                    <div class="menos" ng-click="editor.cambioTamano('texto', false)">
                        -
                    </div>               
                    <div class="mas" ng-click="editor.cambioTamano('texto', true)">
                        +
                    </div>               
                </div>

                <div class=" col s6 estilo-texto" style="font-size: 0px;" >
                    <div color-picker color-picker-model="editor.colorTexto" ng-model="editor.colorTexto" ng-change="editor.cambioColor(editor.colorTexto, 'texto')" color-picker-position="top" color-picker-fixed-position="true" class="color" style="background-color: {{editor.colorTexto}}"></div>               
                </div>          
            </div>
        </div>

        <div class="panel-opciones slogan" ng-class="{'abierto': editor.opcionActiva == 2 && editor.opcionActiva != false}">
            <div class="row margin-bottom-0" ng-if="!editor.esloganActivo" >
                <div class="col s6 offset-s3">
                    <button class="boton-verde"ng-click="editor.agregarEslogan()" style="margin: 40px 0 40px 0px;">
                        Agregar Eslogan
                    </button>  
                </div>
            </div>
            <div class="row margin-bottom-0" ng-if="editor.esloganActivo">
                <div class="col s6">
                    <div class="input-field">
                        <input id="nombre" type="text" name="fuenteEslogan" maxlength="20" ng-model="editor.logo.eslogan" ng-model-options="{allowInvalid: true}" ng-change="editor.cambioTexto(editor.logo.eslogan, true)">
                    </div>

                    <md-input-container style="width:100%;">
                        <md-select class="cat-fuente" ng-style="{'font-family': editor.logo.fuenteEslogan.nombre}" ng-model="editor.logo.fuenteEslogan" placeholder="Fuente" ng-change="editor.cambioFuente(editor.logo.fuenteEslogan, 'eslogan')" md-no-asterisk required> 
                            <md-option ng-value="{url:fuente.url, nombre: fuente.nombre}" ng-repeat="fuente in editor.fuentes track by $index" ng-style="{'font-family' : fuente.nombre}"  ng-selected="editor.logo.fuenteEslogan.nombre == fuente.nombre">{{fuente.nombre}}</md-option>
                        </md-select>
                    </md-input-container>
                </div>



                <div class=" col s6 estilo-texto">
                    <div class="negrita" ng-click="editor.cambioPropiedad('bold', true)">
                        <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Negrita</md-tooltip>
                        N
                    </div>               
                    <div class="cursiva" ng-click="editor.cambioPropiedad('cursive', true)">
                        <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Cursiva</md-tooltip>
                        C
                    </div>               
                </div>

                <div class=" col s6 estilo-texto">
                    <div class="menos" ng-click="editor.cambioTamano('eslogan', false)">
                        <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Disminuir tamaño</md-tooltip>
                        -
                    </div>               
                    <div class="mas" ng-click="editor.cambioTamano('eslogan', true)">
                        <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Aumentar tamaño</md-tooltip>
                        +
                    </div>               
                </div>
                <div class=" col s6 estilo-texto" style="font-size: 0px;" >
                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Color</md-tooltip>
                    <div color-picker color-picker-model="editor.colorEslogan" ng-model="editor.colorEslogan" ng-change="editor.cambioColor(editor.colorEslogan, 'eslogan')" color-picker-position="right" class="color" style="background-color: {{editor.colorEslogan}}"></div>               
                </div>
            </div>
        </div>        

        <div class="panel-opciones icono" ng-class="{'abierto': editor.opcionActiva == 3 && editor.opcionActiva != false}">
            <div class="row margin-bottom-0">
                <div class="col s6 text-center" ng-form="editor.iconosForm">
                    <div style="display: flex;flex-flow: row;align-items: center;justify-content: center;">
                        <md-input-container style="width: 90%">
                            <md-select ng-model="editor.categoriaIcono" placeholder="Buscar iconos" ng-change="editor.buscarIconos(editor.categoriaIcono, editor.iconosForm.$valid)" md-no-asterisk required> 
                                <md-option ng-repeat="categoria in editor.categoriasPosibles track by $index" ng-value="categoria.idCategoria">{{categoria.nombreCategoria}}</md-option>
                            </md-select>
                        </md-input-container>

                    </div>
                    <div class="estilo-texto">
                        <div color-picker color-picker-model="editor.colorIcono" ng-model="editor.colorIcono" ng-change="editor.cambioColor(editor.colorIcono, 'icono')" color-picker-position="bottom" class="color" style="background-color: {{editor.colorIcono}}"></div>
                    </div>                
                </div>

                <div class=" col s6 estilo-texto">
                    <div class="menos" ng-click="editor.cambioTamano('icono', false)">
                        -
                    </div>               
                    <div class="mas" ng-click="editor.cambioTamano('icono', true)">
                        +
                    </div>               
                </div>
                <div class=" col s6 estilo-texto">
                    <p class="text-center principal" style="margin: 2px;">Disposición</p>
                </div>

                <div class=" col s6" style="margin-bottom: 10px;display: flex;justify-content: center;align-items: center;">
                    <div class="cubo-logo-orientacion vertical" ng-click="editor.cambiarOrientacion('vertical')">
                        <div>
                            <span><i class="material-icons">thumb_up</i></span>
                            <span>TU LOGO</span>
                        </div>
                    </div>

                    <div class="cubo-logo-orientacion horizontal" ng-click="editor.cambiarOrientacion('horizontal')">
                        <div>
                            <span style="margin-right: 5px;"><i class="material-icons">thumb_up</i></span>
                            <span>TU LOGO</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>   

        <div class="opciones-guardados" style="z-index: 5;" ng-class="{'abierto': editor.comparacionSeleccionada != null}">
            <ul>
                <li ng-click="editor.restaurarComparacion(editor.comparacionSeleccionada.comparacion.svg)">
                    <i class="material-icons" ng-click="editor.restaurarComparacion(comparacion.svg)">file_upload</i>
                    Usar
                </li>
                <li  ng-click="editor.comparaciones.splice(editor.comparacionSeleccionada.index, 1)">
                    <i class="material-icons">delete</i>
                    Borrar
                </li>
                <li ng-click="editor.comparacionSeleccionada = null">
                    <i class="material-icons">expand_more</i>
                </li>
            </ul>
        </div>     

        <div class="opciones-editor" ng-class="{'abierto': true }">
            <ul>
                <li ng-click="editor.opcionActiva = editor.opcionActiva == 1 ? false : 1" ng-class="{'valid': editor.opcionActiva == 1}">
                    <i ng-if="editor.opcionActiva != 1" class="material-icons">expand_less</i>
                    <i ng-if="editor.opcionActiva == 1" class="material-icons">expand_more</i>
                    Nombre
                </li>
                <li ng-click="editor.opcionActiva = editor.opcionActiva == 2 ? false : 2" ng-class="{'valid': editor.opcionActiva == 2}">
                    <i ng-if="editor.opcionActiva != 2" class="material-icons">expand_less</i>
                    <i ng-if="editor.opcionActiva == 2" class="material-icons">expand_more</i>
                    Slogan
                </li>
                <li ng-click="editor.opcionActiva = editor.opcionActiva == 3 ? false : 3" ng-class="{'valid': editor.opcionActiva == 3}">
                    <i ng-if="editor.opcionActiva != 3" class="material-icons">expand_less</i>
                    <i ng-if="editor.opcionActiva == 3" class="material-icons">expand_more</i>
                    Icono
                </li>
            </ul>
        </div>