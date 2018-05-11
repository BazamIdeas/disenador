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

                        <div class="opciones-hook">
                            <span>
                                <input type="color" ng-init="hook.fuente.fill" ng-model="hook.fuente.fill" ng-change="papeleriaEditor.modificarHook($parent.$index, $index, true)">
                            </span>
                            <span>
                                <md-input-container style="width: 100%;">
                                    <md-tooltip class="tooltip-header" md-delay="2" md-direction="top">Fuentes</md-tooltip>
                                    <md-select flex ng-model="hook.fuenteNueva" placeholder="Seleccione una fuente" ng-change="menuPapeleria.cambiarFuente(hook.fuenteNueva, $parent.$index, $index)"
                                        md-no-asterisk required>
                                        <md-option ng-repeat="fuente in papeleriaEditor.fuentes track by $index" ng-value="fuente"><span style="font-family:{{fuente.nombre}}">{{fuente.nombre}}</span></md-option>
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
                                    <span class="icono agregar-icono" ng-show="item_hook.icono == null || item_hook.icono == ''" ng-click="menuPapeleria.mostrarIconosDisponibles.accion = true; menuPapeleria.mostrarIconosDisponibles.idHook = hook.id; menuPapeleria.elementoAgregarIcono = item_hook">
                                        <md-icon style="color: inherit;">add</md-icon>
                                        <md-tooltip md-direction="bottom">Agregar Icono</md-tooltip>
                                    </span>
                                    <input ng-if="item_hook.tipo != 'textarea'" class="input-papeleria" placeholder="{{item_hook.nombre}}" ng-model="item_hook.valor"
                                        name="{{item_hook.nombre}}" type="{{item_hook.tipo}}" ng-change="papeleriaEditor.modificarHook($parent.$parent.$parent.$index, $parent.$parent.$index, true)"
                                        required>

                                    <textarea ng-if="item_hook.tipo == 'textarea'" class="input-papeleria" placeholder="{{item_hook.nombre}}" ng-model="item_hook.valor"
                                        name="{{item_hook.nombre}}-{{$index}}-pape" ng-list="&#10;" ng-trim="false" ng-change="papeleriaEditor.modificarHook($parent.$parent.$parent.$index, $parent.$parent.$index, true)"
                                        required></textarea>
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
                        <div class="validacion-papeleria" ng-show="!formularioPapeleria.$valid && hook.items.length > 0">
                            Completa los campos correctamente
                        </div>
                        <span class="espacios-disponibles">Espacios disponibles {{hook.limite - hook.items.length }}</span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<style>
    bazam-menu-papeleria {
        width: 30%;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }

    .menuPapeleria {
        width: 100%;
        height: 100%;
        user-select: none;
    }

    .contenedor-principal-menu {
        overflow-x: hidden;
        overflow-y: scroll;
        height: 84%;
    }

    .tabs-p {
        display: flex;
    }

    .tabs-p .tab {
        padding: 8px;
        flex: 1;
        font-size: 15pt;
        text-align: center;
        background: white;
        transition: initial;
        text-transform: capitalize;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    }

    .tabs-p .tab.active {
        background: #5981bc;
        color: white;
    }

    .espacios-disponibles,
    .validacion-papeleria {
        text-align: center;
        display: block;
        font-size: 10pt;
        margin-top: 8px;
        font-family: 'nunito-sans-bold' !important;
        font-weight: 800;
    }

    .mensaje-items {
        padding: 16px;
        font-size: 18pt;
        text-align: center;
        font-family: 'nunito-sans-bold' !important;
        letter-spacing: 2px;
    }

    .contenedor-items {
        width: 90%;
        margin: 10px auto;
        background: white;
        padding: 15px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
        padding-bottom: 5px;
    }

    .contenedor-items.ui-droppable-active {
        border: 2px dashed var(--principal);
    }

    .item {
        font-size: 10pt;
        padding: 8px;
        display: inline-block;
        margin-bottom: 10px;
        text-transform: capitalize;
        margin-right: 10px;
        background: white;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    }

    .item.ui-draggable-dragging {
        opacity: 0.5;
    }

    .item:not(.colocado):hover {
        background: #f3f2f2;
        cursor: move;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .12);
    }

    .item.colocado {
        cursor: default;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .item input.input-papeleria {
        height: 30px !important;
    }

    .item input.input-papeleria,
    .item textarea {
        margin-bottom: 0;

    }

    .item input.input-papeleria::placeholder {
        text-transform: capitalize;
    }

    .item textarea::placeholder {

        color: var(--principal);
    }

    .nombre-contenedor {
        padding: 2px;
        font-size: 15pt;
        margin-bottom: 10px;
        border-bottom: 1px solid;
        justify-content: space-between;
        display: flex;
    }

    .item.colocado> :last-child md-icon,
    .nombre-contenedor> :last-child md-icon {
        color: inherit;
    }

    .item.colocado> :last-child,
    .nombre-contenedor .icono-nombre-hook {
        background: silver;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        padding: 3px;
        color: black;
        border: 1px solid black;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 3px;
        cursor: pointer;
    }

    .item.colocado> :last-child:hover {
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .12);
        border: 1px solid red;
        color: red;
    }

    .nombre-contenedor .icono-nombre-hook {
        border: 1px solid white;
        color: white;
        background: green;
    }

    span.input-container-papeleria {
        flex: 1;
        display: flex;
        align-items: center;
    }

    span.icono.agregar-icono {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        color: black;
    }

    span.icono {
        width: 40px;
    }

    span.icono.icono-right {
        align-self: center;
        order: 1;
        margin-left: 10px;
    }

    span.icono.icono-left {
        margin-right: 10px;
    }

    span.controles-movimiento {
        width: 35px;
        margin-right: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    span.controles-movimiento>span md-icon:hover {
        cursor: pointer;
        color: black;
    }

    span.iconos-disponibles {
        display: flex;
        justify-content: center;
    }

    span.iconos-disponibles>span {
        width: 50px;
        display: inline-block;
        margin-right: 5px;
    }

    .suprimirIcono {
        display: block;
        font-size: 8pt;
        padding-top: 8px;
        cursor: pointer;
    }

    .mensaje-cara {
        font-size: 18pt;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        text-align: center;
    }

    .opciones-hook span {
        flex: 1;
    }

    .opciones-hook {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .opciones-hook span {
        flex: 1;
    }

    .opciones-hook input[type="color"] {
        padding: 0px;
        background: transparent;
        border: none;
        height: 34px;
        width: 60%;
        margin: auto;
        display: block;
    }
</style>