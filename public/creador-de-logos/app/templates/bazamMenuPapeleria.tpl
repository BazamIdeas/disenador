<div class="menuPapeleria {{papeleriaEditor.papeleria.tipo}}">
    <div class="tabs-p">
        <span ng-repeat="tabMenu in papeleriaEditor.papeleria.modelo.caras track by $index" class="tab" ng-click="menuPapeleria.menuActivo = tabMenu.nombre; papeleriaEditor.cambiarCara($index)"
            ng-class="{'active': menuPapeleria.menuActivo == tabMenu.nombre}">
            {{::tabMenu.nombre}}
        </span>
    </div>
    <div class="contenedor-principal-menu">
        <form name="formularioPapeleria" novalidate>
            <div ng-show="menuPapeleria.menuActivo == contenedor.nombre" ng-repeat="contenedor in papeleriaEditor.papeleria.modelo.caras">
                <div class="mensaje-cara" ng-show="contenedor.hooks.length == 0">
                    Esta cara de la papeleria no posee elementos
                </div>
                <div ng-show="contenedor.hooks.length > 0">
                    <div class="contenedor-items">
                        <div class="nombre-contenedor">
                            <b>Items Disponibles</b>
                        </div>
                        <span draggable="true" class="item" ng-repeat="item in papeleriaEditor.papeleria.items track by $index" indice="{{$index}}">
                            {{::item.nombre}}
                        </span>
                    </div>

                    <div class="contenedor-items" ng-repeat="hook in contenedor.hooks track by $index" droppable-hook-papeleria ng-mouseenter="papeleriaEditor.elementoFocus($parent.$index, $index, true)"
                        ng-mouseleave="papeleriaEditor.elementoFocus($parent.$index, $index, false)">
                        <div class="nombre-contenedor">
                            <b>{{::hook.id}}</b>
                            <span class="icono-nombre-hook" ng-click="menuPapeleria.cambiarDireccionElemento(hook, $parent.$index, $index)">
                                <md-tooltip md-direction="bottom">Dirección</md-tooltip>
                                <md-icon>swap_horiz</md-icon>
                            </span>
                        </div>
                        <div ng-click="papeleriaEditor.mostrarOpciones = null" ng-show="papeleriaEditor.mostrarOpciones == hook.id" style="display: flex; justify-content: center; cursor: pointer;">
                            <md-icon>keyboard_arrow_up</md-icon>
                        </div>
                        <div ng-click="papeleriaEditor.mostrarOpciones = hook.id" ng-show="papeleriaEditor.mostrarOpciones != hook.id" style="display: flex; justify-content: center; cursor: pointer;">
                            <md-icon>keyboard_arrow_down</md-icon>
                        </div>

                        <div class="opciones-hook" ng-show="papeleriaEditor.mostrarOpciones == hook.id">
                            <span>
                                <input type="color" ng-init="hook.fuente.fill" ng-model="hook.fuente.fill" ng-change="papeleriaEditor.modificarHook($parent.$index, $index, true)">
                            </span>
                            <span>
                                <md-input-container style="width: 100%;">
                                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Fuentes</md-tooltip>
                                    <md-select flex ng-model="hook.fuenteNueva" placeholder="Seleccione una fuente" ng-change="menuPapeleria.cambiarFuente(hook.fuenteNueva, $parent.$index, $index)"
                                        md-no-asterisk required>
                                        <md-option ng-repeat="fuente in papeleriaEditor.fuentes track by $index" ng-value="fuente">
                                            <span style="font-family:{{fuente.nombre}}">{{fuente.nombre}}</span>
                                        </md-option>
                                    </md-select>
                                </md-input-container>
                            </span>
                        </div>

                        <div>
                            <span class="item colocado" ng-repeat="item_hook in hook.items track by $index">
                                <span class="controles-movimiento" ng-show="hook.items.length > 1">
                                    <span ng-hide="$first" ng-click="menuPapeleria.move(-1, $parent.$parent.$index, $parent.$index, $index)">
                                        <md-icon>keyboard_arrow_up</md-icon>
                                    </span>
                                    <span ng-hide="$last" ng-click="menuPapeleria.move(1, $parent.$parent.$index, $parent.$index, $index)">
                                        <md-icon>keyboard_arrow_down</md-icon>
                                    </span>
                                </span>
                                <span class="input-container-papeleria">
                                    <span class="icono icono-{{item_hook.icono.orientacion}}" ng-show="item_hook.icono != null && item_hook.icono != ''">
                                        <span ng-click="menuPapeleria.cambiarDireccionElemento(item_hook.icono, $parent.$parent.$index, $parent.$index)">
                                            <span ng-bind-html="menuPapeleria.sce.trustAsHtml(item_hook.icono.svg)"></span>
                                            <md-tooltip md-direction="bottom">Cambiar Dirección</md-tooltip>
                                        </span>

                                        <span class="suprimirIcono" ng-click="item_hook.icono = null; papeleriaEditor.modificarHook($parent.$parent.$index, $parent.$index)">
                                            <Supr>Eliminar</Supr>
                                            <md-tooltip md-direction="bottom">Eliminar Icono</md-tooltip>
                                        </span>

                                    </span>

                                    <input ng-if="item_hook.tipo != 'textarea'" class="input-papeleria" placeholder="{{item_hook.nombre}}" ng-model="item_hook.valor"
                                        name="{{item_hook.nombre}}" type="{{item_hook.tipo}}" ng-change="papeleriaEditor.modificarHook($parent.$parent.$parent.$index, $parent.$parent.$index, true)"
                                        required>

                                    <textarea ng-if="item_hook.tipo == 'textarea'" class="input-papeleria" placeholder="{{item_hook.nombre}}" ng-model="item_hook.valor"
                                        name="{{item_hook.nombre}}-{{$index}}-pape" ng-list="&#10;" ng-trim="false" ng-change="papeleriaEditor.modificarHook($parent.$parent.$parent.$index, $parent.$parent.$index, true)"
                                        required></textarea>

                                    <span class="icono agregar-icono" ng-show="item_hook.icono == null || item_hook.icono == ''" ng-click="menuPapeleria.mostrarIconosDisponibles.accion = true; menuPapeleria.mostrarIconosDisponibles.idHook = hook.id; menuPapeleria.elementoAgregarIcono = item_hook">
                                        <md-icon style="color: inherit;">add</md-icon>
                                        <md-tooltip md-direction="bottom">Agregar Icono</md-tooltip>
                                    </span>
                                </span>
                                <span ng-click="menuPapeleria.eliminarItemHook($parent.$parent.$index, $parent.$index, $index)">
                                    <md-tooltip md-direction="bottom">Eliminar</md-tooltip>
                                    <md-icon>close</md-icon>
                                </span>
                            </span>
                            <span class="iconos-disponibles" ng-show="menuPapeleria.mostrarIconosDisponibles.accion && menuPapeleria.mostrarIconosDisponibles.idHook == hook.id">
                                <span ng-repeat="icono in papeleriaEditor.papeleria.modelo.iconos" ng-bind-html="menuPapeleria.sce.trustAsHtml(icono.svg) "
                                    ng-click="menuPapeleria.mostrarIconosDisponibles.accion = false; menuPapeleria.elementoAgregarIcono.icono = icono; papeleriaEditor.modificarHook($parent.$parent.$index, $parent.$index)"></span>
                            </span>
                        </div>
                        <div class="mensaje-items" ng-if="hook.items.length == 0">
                            Agrega Elementos
                        </div>
                        <!-- <div class="validacion-papeleria" ng-show="!formularioPapeleria.$valid && hook.items.length > 0">
                            Completa los campos correctamente
                        </div> -->
                        <span class="espacios-disponibles">Espacios disponibles {{hook.limite - hook.items.length }}</span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>