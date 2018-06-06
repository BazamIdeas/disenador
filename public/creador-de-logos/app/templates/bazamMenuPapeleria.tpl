<div class="menuPapeleria {{papeleriaEditor.papeleria.tipo}}">
    <div class="contenedor-principal-menu">
        <form name="formularioPapeleria" novalidate>
            <div ng-show="menuPapeleria.menuActivo == contenedor.nombre" ng-repeat="contenedor in papeleriaEditor.papeleria.modelo.caras"
               >
                <div class="mensaje-cara" ng-show="contenedor.hooks.length == 0">
                    No disponible
                </div>
                <!-- ELEMENTOS ARRASTRABLES -->
                <div ng-show="contenedor.hooks.length > 0">
                    <div class="contenedor-items">
                        <div class="nombre-contenedor">
                            <b>Elementos disponibles</b>
                        </div>
                        <span ng-mouseleave="papeleriaEditor.agregarElemento = false" ng-mouseenter="papeleriaEditor.agregarElemento = true" draggable="true" class="item" ng-repeat="item in papeleriaEditor.papeleria.items track by $index" indice="{{$index}}">
                            {{::item.nombre}}
                        </span>
                        <span class="espacios-disponibles">Suelta los elementos en los espacios que prefieras</span>
                    </div>

                    <!-- CONTENEDORES DE PAPELERIA-->
                    <div class="contenedor-items" ng-repeat="hook in contenedor.hooks track by $index" droppable-hook-papeleria ng-mouseenter="papeleriaEditor.elementoFocus($parent.$index, $index, true)"
                        ng-mouseleave="papeleriaEditor.elementoFocus($parent.$index, $index, false)">

                        <!-- NOMBRE CONTENEDOR -->
                        <div class="nombre-contenedor">
                            <b>{{::hook.id}}</b>
                            <div ng-show="hook.items.length > 0">
                                <!-- DIRECCION -->
                                <span class="icono-nombre-hook" ng-click="menuPapeleria.cambiarDireccionElemento('left', hook, $parent.$index, $index)">
                                    <md-tooltip md-direction="bottom">Alinear a la Izquierda</md-tooltip>
                                    <md-icon>format_align_left</md-icon>
                                </span>
                                <span class="icono-nombre-hook" ng-click="menuPapeleria.cambiarDireccionElemento('right', hook, $parent.$index, $index)">
                                    <md-tooltip md-direction="bottom">Alinear a la Derecha</md-tooltip>
                                    <md-icon>format_align_right</md-icon>
                                </span>
                                <!-- COLOR -->
                                <span>
                                    <bazam-color-picker callback="menuPapeleria.cambiarColor" data-args="[$parent.$index, $index]" data-ctx="menuPapeleria" data-color="hook.fuente.fill"  data-titulo="'Color'"></bazam-color-picker>
                                </span>
                                <!-- FUENTES -->
                                <span class="icono-nombre-hook" ng-click="menuPapeleria.cambiarFuente(true, false, $parent.$index, $index)">
                                    <md-tooltip md-direction="bottom">Fuentes</md-tooltip>
                                    <md-icon>text_format</md-icon>
                                </span>
                            </div>
                        </div>
                        <div ng-click="papeleriaEditor.mostrarOpciones = null" ng-show="papeleriaEditor.mostrarOpciones == hook.id" style="display: flex; justify-content: center; cursor: pointer;">
                            <md-icon>keyboard_arrow_up</md-icon>
                        </div>
                        <div>
                            <span class="item colocado" ng-repeat="item_hook in hook.items track by $index">
                                <!--CONTROLES DE MOVIMIENTO -->
                                <span class="controles-movimiento" ng-show="hook.items.length > 1">
                                    <span ng-hide="$first" ng-click="menuPapeleria.move(-1, $parent.$parent.$index, $parent.$index, $index)">
                                        <md-icon>keyboard_arrow_up</md-icon>
                                    </span>
                                    <span ng-hide="$last" ng-click="menuPapeleria.move(1, $parent.$parent.$index, $parent.$index, $index)">
                                        <md-icon>keyboard_arrow_down</md-icon>
                                    </span>
                                </span>
                                <!-- INPUT DE LA PAPELERIA -->
                                <span class="input-container-papeleria">
                                    <input ng-show="item_hook.tipo != 'textarea'" class="input-papeleria" placeholder="{{item_hook.nombre}}" ng-model="item_hook.valor"
                                        name="{{item_hook.nombre}}" type="{{item_hook.tipo}}" ng-change="papeleriaEditor.modificarHook($parent.$parent.$index, $parent.$index, true)"
                                        required>

                                    <textarea ng-show="item_hook.tipo == 'textarea'" class="input-papeleria" placeholder="{{item_hook.nombre}}" ng-model="item_hook.valor"
                                        name="{{item_hook.nombre}}-{{$index}}-pape" ng-list="&#10;" ng-trim="false" ng-change="papeleriaEditor.modificarHook($parent.$parent.$index, $parent.$index, true)"
                                        required></textarea>
                                </span>
                                <!-- ELIMINAR PAPELERIA -->
                                <span class="eliminar-input-x" ng-click="menuPapeleria.eliminarItemHook($parent.$parent.$index, $parent.$index, $index)">
                                    <md-tooltip md-direction="bottom">Eliminar</md-tooltip>
                                    <md-icon>close</md-icon>
                                </span>
                            </span>
                        </div>
                        <div class="mensaje-items" ng-show="hook.items.length == 0">
                            Suelta Elementos
                        </div>
                        <span class="espacios-disponibles"> Limite de elementos : {{hook.limite}} </span>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="fonts-container" ng-class="{'open': papeleriaEditor.selectorfuentes}">
        <div class="close" ng-click="papeleriaEditor.selectorfuentes = false">
            <i class="material-icons cerrar">clear</i>
        </div>
        <div class="row padding-bottom-0 margin-bottom-0">
            <div class="col l12" style="position: relative; padding:0 !important; cursor:pointer; overflow-y: scroll;
                max-height: 84vh;">

                <!-- TEXTO PRINCIPAL LISTA DE FUENTES -->
                <md-radio-group ng-model="menuPapeleria.fuenteSeleccionada" ng-change="menuPapeleria.cambiarFuente(false, menuPapeleria.fuenteSeleccionada)"
                    class="md-primary">
                    <md-radio-button class="font-option" ng-repeat="fuente in papeleriaEditor.fuentes track by $index" ng-value="{url:fuente.url, nombre: fuente.nombre}">
                        <!--ng-disabled=" d.isDisabled "-->
                        <span style="{{'font-family:' + fuente.nombre + '!important'}}; {{editor.logo.fuente.nombre == fuente.nombre ? 'color: var(--principal) !important;    transform: scale(1.2) !important' : 'color: black !important'}};     letter-spacing: 2px;">{{::fuente.nombre}}</span>
                    </md-radio-button>
                </md-radio-group>
            </div>
        </div>
    </div>
</div>