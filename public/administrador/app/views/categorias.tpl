<div flex layout layout-margin layout-align="none start">
    <div flex="50" class="listar">
          
        <!-- LISTAR CATEGORIAS -->
           
        <div class="paneles individual md-whiteframe-2dp">
            <div layout layout-align="space-around center" layout-padding>
                <h3 flex ng-click="categorias.listar('categoria')">Categorias</h3>
                <md-button class="md-primary md-fab md-mini" ng-click="categorias.opcionesCategorias = 3" style="margin:0;">
                    <md-icon>add</md-icon>
                </md-button>
            </div>
            <div ng-show="categorias.mostrarC">
                <div class="tabla">
                    <div>Nombre:</div>
                    <div>Acciones:</div>
                </div>
                <div layout="column" class="content-scroll">
                    <div layout layout-align="center" ng-show="categorias.loaderMostrar" class="margen_superior">
                        <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                    </div>
                    <div ng-repeat="elemento in categorias.cats track by $index" class="elemento">
                        <div class="tabla-campo">
                            <div class="nombre">{{elemento.nombreCategoria}}</div>
                            <div>
                                <md-button class="md-primary md-raised" ng-click="categorias.modificarEm(elemento.idCategoria, elemento.nombreCategoria, 'categoria')">MODIFICAR</md-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- LISTAR PREFERENCIAS -->
        
        <div class="paneles individual md-whiteframe-2dp">
            <div layout layout-align="space-around center" layout-padding>
                <h3 flex ng-click="categorias.listar('preferencia')">Preferencias</h3>
                <md-button class="md-primary md-fab md-mini" ng-click="categorias.opcionesCategorias = 4" style="margin:0;">
                    <md-icon>add</md-icon>
                </md-button>
            </div>
            <div ng-show="categorias.mostrarPre">
                <div class="tabla">
                    <div>Nombre 1:</div>
                    <div>Nombre 2:</div>
                    <div>Acciones:</div>
                </div>
                <div layout="column" class="content-scroll">
                    <div layout layout-align="center" ng-show="categorias.loaderMostrar" class="margen_superior">
                        <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                    </div>
                    <div ng-repeat="elemento in categorias.prefs track by $index" class="elemento">
                        <div class="tabla-campo">
                            <div class="nombre">{{elemento.nombre1}}</div>
                            <div class="nombre">{{elemento.nombre2}}</div>
                            <div>
                                <md-button class="md-primary md-raised" ng-click="categorias.modificarEm(elemento.idPreferencia, elemento.nombre1+' y '+ elemento.nombre2, 'preferencia')">MODIFICAR</md-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div flex="40" class="paneles md-whiteframe-2dp listar" ng-switch="categorias.opcionesCategorias">


        <!-- MODIFICAR CATEGORIA -->


        <div ng-switch-when="1">
            <div layout-padding>
                <h3>Modificar Categoria</h3>
            </div>
            <div layout-padding class="formularios-login pasos">
                <form ng-submit="categorias.modificar(categorias.datos.modCategoria, 'categoria')" novalidate>
                    <div layout="column" layout-align="space-between">
                        <h3 class="text-center">Modificar {{categorias.modNombre}}</h3>
                        <div>
                            <md-input-container class="md-block">
                                <label>Nombre</label>
                                <input type="text" ng-model="categorias.datos.modCategoria.nombre" name="nombre">
                            </md-input-container>
                        </div>
                        <div layout>
                            <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                        </div>
                        <div layout layout-align="center" ng-show="categorias.loaderCargando" class="margen_superior">
                            <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                        </div>
                    </div>
                </form>
            </div>
        </div>


        <!-- MODIFICAR PREFERENCIA -->


        <div ng-switch-when="2">
            <div layout-padding>
                <h3>Modificar Preferencia</h3>
            </div>
            <div layout-padding class="formularios-login pasos">
                <form ng-submit="categorias.modificarEm(categorias.datos.modPreferencia, 'preferencia')" novalidate>
                    <div layout="column" layout-align="space-between">
                        <h3 class="text-center">Modificar {{categorias.modNombre}}</h3>
                        <div>
                            <md-input-container class="md-block">
                                <label>Nombre 1</label>
                                <input type="text" ng-model="categorias.datos.modPreferencia.nombre1" name="nombre">
                            </md-input-container>
                        </div>

                        <div>
                            <md-input-container class="md-block">
                                <label>Nombre 2</label>
                                <input type="text" ng-model="categorias.datos.modPreferencia.nombre2" name="nombre2">
                            </md-input-container>
                        </div>
                        <div layout>
                            <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


        <!-- CREAR CATEGORIA -->


        <div ng-switch-when="3">
            <div layout layout-align="space-between center" layout-padding>
                <h3>Nueva Categoria</h3>
                <md-button ng-click="categorias.opcionesCategorias = 0" style="margin:0;">
                    <md-icon>keyboard_arrow_left</md-icon>
                </md-button>
            </div>
            <div layout-padding class="formularios-login pasos">
                <form ng-submit="categorias.crear(categorias.datos.nuevaCategoria, 'categoria')" novalidate>
                    <div layout="column" layout-align="space-between">
                        <h3 class="text-center">Nueva Categoria</h3>
                        <div>
                            <md-input-container class="md-block">
                                <label>Nombre</label>
                                <input type="text" ng-model="categorias.datos.nuevaCategoria.nombre" name="nombre">
                            </md-input-container>
                        </div>
                        <div layout>
                            <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


        <!-- CREAR PREFERENCIA -->


        <div ng-switch-when="4">
            <div layout layout-align="space-between center" layout-padding>
                <h3>Nueva Preferencia</h3>
                <md-button ng-click="categorias.opcionesCategorias = 0"  style="margin:0;">
                    <md-icon>keyboard_arrow_left</md-icon>
                </md-button>
            </div>
            <div layout-padding class="formularios-login pasos">
                <form ng-submit="categorias.modificarEm(categorias.datos.nuevaPreferencia, 'preferencia')" novalidate>
                    <div layout="column" layout-align="space-between">
                        <h3 class="text-center">Nueva Preferencia</h3>
                        <div>
                            <md-input-container class="md-block">
                                <label>Nombre 1</label>
                                <input type="text" ng-model="categorias.datos.nuevaPreferencia.nombre1" name="nombre">
                            </md-input-container>
                        </div>

                        <div>
                            <md-input-container class="md-block">
                                <label>Nombre 2</label>
                                <input type="text" ng-model="categorias.datos.nuevaPreferencia.nombre2" name="nombre2">
                            </md-input-container>
                        </div>
                        <div layout>
                            <md-button class="md-raised md-primary" type="submit">Enviar</md-button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>
