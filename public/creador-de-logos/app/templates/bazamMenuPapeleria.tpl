<div class="menuPapeleria {{papeleriaEditor.papeleria.tipo}}">
    <div class="tabs-p">

        <span ng-repeat="tabMenu in papeleriaEditor.papeleria.modelo.caras" class="tab tab-{{$index}}" ng-click="menuPapeleria.menuActivo = tabMenu.nombre; menuPapeleria.cambiarCara($index)"
            ng-class="{'active': menuPapeleria.menuActivo == tabMenu.nombre}">
            {{tabMenu.nombre}}
        </span>
    </div>
    <div class="contenedor-principal-menu">
        <div class="contenedor-items">
            <div class="nombre-contenedor">
                <b>Items Disponibles</b>
            </div>
            <span draggable="true" class="item" ng-repeat="item in papeleriaEditor.papeleria.items" id="{{item.nombre}}-disponible" indice="{{$index}}">
                {{item.nombre}}
            </span>
        </div>
        <div ng-if="contenedor.hooks.length" ng-show="contenedor.nombre == papeleriaEditor.papeleria.modelo.caras[0].nombre" ng-repeat="contenedor in papeleriaEditor.papeleria.modelo.caras">
            <div class="contenedor-items" ng-repeat="hook in contenedor.hooks" droppable-hook-papeleria>
                <div class="nombre-contenedor">
                    <b>{{hook.id}}</b>
                    <span>Disp {{hook.limite - hook.items.length }}</span>
                </div>
                <div>
                    <span class="item colocado" ng-repeat="item_hook in hook.items">
                        <span>{{item_hook.nombre}}</span>
                        <span ng-click="menuPapeleria.eliminarItemHook($parent.$parent.$index, $parent.$index, $index)">
                            <md-tooltip md-direction="top">Eliminar</md-tooltip>
                            <md-icon>close</md-icon>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
    .menuPapeleria {
        width: 30%;
        background: silver;
        height: 100%;
        user-select: none;
    }

    .contenedor-principal-menu {
        overflow-x: scroll;
        height: 85%;
    }

    .tabs-p {
        display: flex;
        justify-content: space-evenly;
        height: 10%;
        align-items: flex-start;
    }

    .tabs-p .tab {
        padding: 8px;
        flex: 1;
        font-size: 15pt;
        text-align: center;
        background: white;
        border: 1px solid silver;
        transition: initial;
        text-transform: capitalize;
    }

    .tabs-p .tab.active {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    }

    .contenedor-items {
        width: 90%;
        margin: 10px auto;
        border-radius: 20px;
        background: white;
        padding: 15px;
        border: 1px solid black;
    }

    .contenedor-items.ui-droppable-active {
        border: 2px dashed #5981bc;
    }

    .item {
        border-radius: 20px;
        padding: 8px;
        border: 1px solid;
        display: inline-block;
        margin-bottom: 10px;
        text-transform: capitalize;
        margin-right: 10px;
        background: white;
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
    }

    .nombre-contenedor {
        padding: 2px;
        font-size: 15pt;
        margin-bottom: 10px;
        border-bottom: 1px solid;
        display: flex;
        justify-content: space-between;
    }

    .item.colocado> :last-child md-icon {
        color: inherit;
    }

    .item.colocado> :last-child {
        background: silver;
        display: inline-block;
        border-radius: 50%;
        padding: 3px;
        color: black;
        border: 1px solid black;
        margin-left: 10px;
    }

    .item.colocado> :last-child:hover {
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .12);
        border: 1px solid red;
        cursor: pointer;
        color: red;
    }
</style>