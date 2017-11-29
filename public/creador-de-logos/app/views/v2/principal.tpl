        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario" ui-sref="comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s10 texto">
                    <h5 class="principal"> CREE SU LOGO PROFESIONAL EN MINUTOS</h5>
                </div>

            </div>
        </section>

        <section style="height: calc(100vh - 135px) !important;">
            <div class="row margin-bottom-0">
                <form class="margin-bottom-0">
                    <div class="col s2 sidebar-1 scroll">
                        <div class="input-field col s12">
                            <input id="nombre" type="text" class="validate">
                            <label for="nombre">Nombre</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="slogan" type="text" class="validate">
                            <label for="slogan">Slogan</label>
                        </div> 


						<md-input-container style="width:100%;padding: 0 0.75rem">
						  	<md-select ng-model="categorias" placeholder="Categoria">
						    	<md-option ng-value="opt1">Seleccione Categoria</md-option>
						    	<md-option ng-value="opt2">Animales</md-option>
						    	<md-option ng-value="opt3">Cosas</md-option>
						  	</md-select>
						</md-input-container>

                        <div class=" col s12 preferencias">
                            <p class="text-center principal" style="margin-top: 1rem;">Preferencias</p>
                                
                            <div class="slider-input">                            
                                <p class="label-slider-input-left">Hombre</p> 
                                <p class="label-slider-input-right">Mujer</p>
                                <md-slider ng-model="as" value="2" min="1" max="3"></md-slider>
                            </div>
                            <div class="slider-input">
                                <p class="label-slider-input-left">Infantil</p> 
                                <p class="label-slider-input-right">Adulto</p>
                                <md-slider ng-model="as" value="2" min="1" max="3"></md-slider>
                            </div>
                            <div class="slider-input">
                                <p class="label-slider-input-left">Cosas</p> 
                                <p class="label-slider-input-right">Animales</p>
                                <md-slider ng-model="as" value="2" min="1" max="3"></md-slider>
                            </div>
                            <div class="slider-input">
                                <p class="label-slider-input-left">Negro</p> 
                                <p class="label-slider-input-right">Blanco</p>
                                <md-slider ng-model="as" value="2" min="1" max="3"></md-slider>
                            </div>
                            <div class="slider-input">
                                <p class="label-slider-input-left">Tablet</p> 
                                <p class="label-slider-input-right">Telefono</p>
                                <md-slider ng-model="as" value="2" min="1" max="3"></md-slider>
                            </div>
                            <div class="slider-input">
                                <p class="label-slider-input-left">Espacios</p> 
                                <p class="label-slider-input-right">Tabulacion</p>
                                <md-slider ng-model="as" value="2" min="1" max="3"></md-slider>
                            </div>
                            <div class="slider-input">
                                <p class="label-slider-input-left">PHP</p> 
                                <p class="label-slider-input-right">Node</p>
                                <md-slider ng-model="as" value="2" min="1" max="3"></md-slider> 
                            </div>                
                        </div>
                    </div>
                
                    <div class="col s2 sidebar-2">
                        <p class="text-center principal">Forma de su logo</p>

                        <div class="cubo-logo">
                            <div>
                                <span><i class="material-icons">thumb_up</i></span>
                                <span>TU LOGO</span>
                            </div>
                        </div>

                        <div class="cubo-logo">
                            <div>
                                <span class="texto">M</span>
                                <span>TU LOGO</span>
                            </div>
                        </div>

                        <div class="cubo-logo">
                            <div>
                                <span>TU LOGO</span>
                            </div>
                        </div>
                    </div>
                </form>
				
				<div ui-view class="contenedor-principal col s8">
				       
				</div>

            </div>
        </section>