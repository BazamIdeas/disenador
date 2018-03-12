<div class="bazam-carousel">
    <div class="container-carousel" ng-repeat="item in ctrl.items" ng-class="{'activo': $index == ctrl.indice, 'oculto': $index != ctrl.indice}">
        <div class="solo-imagen" ng-if="!item.isTestimonio">
            <img src="{{item.url}}">
        </div>
        <div class="testimonio" ng-if="item.isTestimonio">
            <div class="t-head">
                <i style="color:{{item.color}};" class="fas fa-quote-left"></i>
                <img src="{{item.logo}}">
                <i style="color:{{item.color}};" class="fas fa-quote-right"></i>
            </div>
            <div class="t-body">
                {{item.descripcion}}
            </div>
            <span style="display:block; border-bottom:2px solid {{item.color}}; width:20%; margin: auto;     margin-bottom: 19px;
                color: transparent;">.</span>
            <div class="t-footer">
                <img src="{{item.client.img}}">
                <div>
                    <b>{{item.client.name}}</b>
                    <br>
                    <p>{{item.client.activity}}</p>
                </div>
            </div>
        </div>
    </div>
    <controles>
        <button ng-click="ctrl.changeLeft()">
            <md-icon>keyboard_arrow_left</md-icon>
        </button>
        <button ng-click="ctrl.changeRight()">
            <md-icon>keyboard_arrow_right</md-icon>
        </button>
    </controles>
</div>

<style>
    /* CAROUSEL */

    .bazam-carousel {
        position: relative;
        width: 98vw;
    }

    .bazam-carousel .container-carousel {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        margin: 30px auto;
        transition: transform 0.3s;
    }

    .container-carousel.oculto {
        transform: translateX(-100%);
        position: absolute;
        top: 0;
    }

    .testimonio {
        height: auto;
        padding: 16px;
    }

    .testimonio .t-head {
        display: flex;
        height: 110px;
        justify-content: space-around;
        align-items: center;
        padding: 8px;
    }

    .testimonio .t-head img {
        width: 100px;
        height: 100px;
    }

    .testimonio .t-head i {
        font-size: 35px;
    }

    .t-body {
        padding: 4%;
        text-align: center;
        font-size: 20px;
        color: #7d7d7d;
        font-family: 'maven-regular';
    }

    .t-footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .t-footer img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 16px;
    }

    .solo-imagen {
        width: 100vw;
        color: transparent;
    }

    .solo-imagen img {
        width: 100%;
    }

    controles button {
        padding: 16px;
        border-radius: 50%;
        border: 1px solid var(--principal);
        background: transparent;
        color: var(--principal);
        top: 43%;
        position: absolute;
    }

    controles button:focus {
        background: transparent;
    }

    controles button:hover {
        background: var(--principal);
        color: white;
        z-index: 9999;
    }

    controles md-icon {
        color: inherit !important;
    }

    controles> :first-child {
        left: 3%;
    }

    controles> :last-child {
        right: 3%;
    }
</style>