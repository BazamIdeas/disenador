<div flex layout="column" ng-cloak>

    <div layout="row" style="margin-top:3%;" class="margen_inferior">
        <div flex layout layout-align="center">
            <md-slider-container ng-disabled="true" flex="50" class="md-whiteframe-2dp slider-comenzar">
                <md-slider flex class="md-warn" ng-model="comenzar.mostrar" md-discrete step="1" min="1" max="4" aria-label="rating" ng-readonly="true">
            </md-slider-container>
            <div class="ayuda" ng-click="comenzar.cambiarMenu()">
                <md-icon>help_outline</md-icon>
            </div>

            <md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="right">
                <md-toolbar class="transparencia">
                    <div class="md-toolbar-tools">
                        <div>AYUDA</div>
                    </div>
                </md-toolbar>
                <div>
                    <md-button class="md-primary md-hue-2" ng-click="comenzar.cambiarMenu()">CERRAR</md-button>
                </div>
            </md-sidenav>
        </div>
    </div>
    <div flex="none" layout="column" ng-switch="comenzar.mostrar">
        <div class="texto-informativo" layout flex="14" layout-align="center">
            <div layout flex="60" layout-align="center">
                <p ng-switch-when="1">Ingrese el nombre de su logo</p>
                <p ng-switch-when="2">Seleccione una Categoría</p>
                <p ng-switch-when="3">Que tipo de logo desea?</p>
                <p ng-switch-when="4">Caracteristicas que quiere que su logo transmita</p>
            </div>
        </div>
        <div layout layout-align="center">
            <form name="preferenciasFormulario" flex="60" layout-padding class="md-whiteframe-2dp">
                <div>
                    <div class="pasos" ng-switch-when="1">
                        <div>
                            <md-input-container class="md-block input-comenzar">
                                <label>Ingrese el nombre de su logo</label>
                                <input name="nombre" ng-model="comenzar.datos.nombre" ng-required="true" maxlength="12" minlength="1">
                            </md-input-container>

                            <md-input-container class="md-block input-comenzar">
                                <label>Eslogan (Opcional)</label>
                                <input name="nombre" ng-model="comenzar.datos.eslogan" maxlength="16" minlength="1">
                            </md-input-container>
                        </div>
                        <div flex layout layout-align="end center">
                            <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=2" ng-show="preferenciasFormulario.nombre.$valid">Siguiente</md-button>
                        </div>
                    </div>
                    <div class="pasos" ng-switch-when="2">
                        <div>
                            <md-input-container class="md-block">
                                <label>Seleccione una Categoría</label>

                                <md-select ng-model="comenzar.datos.categoria" name="categoria" ng-required="true">
                                    <md-option class="select-auto" ng-value="categoria.idCategoria" ng-repeat="categoria in comenzar.categoriasPosibles">{{categoria.nombreCategoria}}</md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                        <div flex layout layout-align="space-between center">
                            <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=1">Atras</md-button>
                            <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=3" ng-show="preferenciasFormulario.categoria.$valid">Siguiente</md-button>
                        </div>
                    </div>
                    <div class="pasos" ng-switch-when="3" layout="column">
                        <div layout-padding layout="column">
                            <div layout layout-align="space-around">
                                <div class="tipo-logo">
                                    <div class="tipo-logo-icon">
                                        <md-icon>font_download</md-icon>
                                    </div>
                                    <div>
                                        <h3>ICONO</h3>
                                        <p>Una forma facil de recordar en el centro de su logo.</p>
                                    </div>
                                </div>
                                <div class="tipo-logo">
                                    <div class="tipo-logo-icon">
                                        <md-icon>font_download</md-icon>
                                    </div>
                                    <div>
                                        <h3>NOMBRE</h3>
                                        <p>Un logo con gran impacto compuestos por su tipografía o texto y una imagen o símbolo.</p>
                                    </div>
                                </div>
                                <div class="tipo-logo">
                                    <div class="tipo-logo-icon">
                                        <md-icon>font_download</md-icon>
                                    </div>
                                    <div>
                                        <h3>INICIAL</h3>
                                        <p>Una letra como el elemento principal de su logo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div layout-padding class="radio-f">
                            <md-radio-group layout layout-align="space-around" ng-model="comenzar.datos.tipo" name="tipo" ng-required="true">
                                <md-radio-button value="ICONO" ng-click="comenzar.select=true">
                                </md-radio-button>
                                <md-radio-button value="ICONO2" ng-click="comenzar.select=true">
                                </md-radio-button>
                                <md-radio-button value="ICONO3" ng-click="comenzar.select=true">
                                </md-radio-button>
                            </md-radio-group>
                        </div>
                        <div layout layout-align="space-between center" class="margen_superior">
                            <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=2">Atras</md-button>
                            <md-button class="md-raised md-primary siguiente" ng-click="comenzar.mostrar=4" ng-show="preferenciasFormulario.tipo.$valid">Siguiente</md-button>
                        </div>
                    </div>
                    <div class="pasos preferencias" ng-switch-when="4">
                        <div layout ng-repeat="prefrerencia in comenzar.datos.preferencias">
                            <div flex layout layout-align="center center">
                                <span class="md-body-1">{{prefrerencia.nombre1}}</span>
                            </div>
                            <md-slider flex="50" md-discrete ng-model="prefrerencia.valor" step="1" min="1" max="3" aria-label="rating">
                            </md-slider>
                            <div flex layout layout-align="center center">
                                <span class="md-body-1">{{prefrerencia.nombre2}}</span>
                            </div>
                        </div>

                        <div layout class="margen_superior">
                            <div layout="row" flex layout-align="space-between end">
                                <md-button class="md-raised md-primary" ng-click="comenzar.mostrar=3">Atras</md-button>
                                <md-button class="md-raised md-accent" ui-sref="analisis({datos: comenzar.datos})" ng-click="definir()">Enviar</md-button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
