<div class="menuPapeleria {{papeleriaEditor.papeleria.tipo}}">
    <div class="tabs-p">
        <span ng-if="tabMenu.hooks.length > 0" ng-repeat="tabMenu in papeleriaEditor.papeleria.modelo.caras track by $index" class="tab"
            ng-click="menuPapeleria.menuActivo = tabMenu.nombre; papeleriaEditor.cambiarCara($index)" ng-class="{'active': menuPapeleria.menuActivo == tabMenu.nombre}">
            {{::tabMenu.nombre}}
        </span>
    </div>
    <div class="contenedor-principal-menu">
        <div class="contenedor-items">
            <div class="nombre-contenedor">
                <b>Items Disponibles</b>
            </div>
            <span ng-if="!papeleriaEditor.papeleria.modelo.caras[0].hooks" class="item" ng-repeat="item in papeleriaEditor.papeleria.items track by $index"
                indice="{{$index}}">
                {{::item.nombre}}
            </span>
            <span ng-if="papeleriaEditor.papeleria.modelo.caras[0].hooks" draggable="true" class="item" ng-repeat="item in papeleriaEditor.papeleria.items track by $index"
                indice="{{$index}}">
                {{::item.nombre}}
            </span>
        </div>
        <div ng-show="menuPapeleria.menuActivo == contenedor.nombre && contenedor .hooks.length > 0" ng-repeat="contenedor in papeleriaEditor.papeleria.modelo.caras">
            <div class="contenedor-items" ng-repeat="hook in contenedor.hooks track by $index" droppable-hook-papeleria>
                <div class="nombre-contenedor">
                    <b>{{::hook.id}}</b>
                </div>

                <div>
                    <span class="item colocado" ng-repeat="item_hook in hook.items track by $index">
                        <span>
                            <input class="input-papeleria" placeholder="{{item_hook.nombre}}" ng-model="item_hook.valor" name="{{item_hook.nombre}}"
                                type="{{item_hook.tipo}}" ng-change="papeleriaEditor.cambiarTexto($parent.$parent.$index, $parent.$index, $index, item_hook.valor)">
                        </span>
                        <span ng-click="menuPapeleria.eliminarItemHook($parent.$parent.$index, $parent.$index, $index)">
                            <md-tooltip md-direction="top">Eliminar</md-tooltip>
                            <md-icon>close</md-icon>
                        </span>
                    </span>
                </div>
                <div class="mensaje-items" ng-if="hook.items.length == 0">
                    Agrega Elementos
                </div>
                <span class="espacios-disponibles">Espacios disponibles {{hook.limite - hook.items.length }}</span>
            </div>
        </div>
    </div>
</div>
<style>
    bazam-menu-papeleria {
        width: 30%;
            box-shadow: 0 1px 5px 0 rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    }

    .menuPapeleria {
        width: 100%;
        background: silver;
        height: 100%;
        user-select: none;
    }

    .contenedor-principal-menu {
        overflow-x: hidden;
        overflow-y: scroll;
        height: 82%;
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
        background: var(--principal);
        color: white;
    }

    .espacios-disponibles {
        text-align: center;
        display: block;
        font-size: 10pt;
        margin-top: 8px;
    }

    .mensaje-items {
        padding: 16px;
        font-size: 18pt;
        text-align: center;
        font-family: 'futura-heavy' !important;
        letter-spacing: 2px;
    }

    .contenedor-items {
        width: 90%;
        margin: 10px auto;
        border-radius: 20px;
        background: white;
        padding: 15px;
        border: 1px solid black;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
        padding-bottom: 5px;
    }

    .contenedor-items.ui-droppable-active {
        border: 2px dashed var(--principal);
    }

    .item {
        border-radius: 5px;
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
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .item.colocado>span {
        display: inline-block;
    }

    .item.colocado> :first-child {
        flex: 1;
    }

    .item input.input-papeleria {
        margin-bottom: 0;
    }

    .item input.input-papeleria::placeholder {
        text-transform: capitalize;
    }

    .nombre-contenedor {
        padding: 2px;
        font-size: 15pt;
        margin-bottom: 10px;
        border-bottom: 1px solid;
    }

    .item.colocado> :last-child md-icon {
        color: inherit;
    }

    .item.colocado> :last-child {
        background: silver;
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