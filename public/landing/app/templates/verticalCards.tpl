<div class="slack">
    <div class="slack__info">
        <h3 class="text-white">¿Estás casi listo/a para comenzar el tuyo?</h3>

        <h5>Aquí tienes algunos consejos prácticos para diseñar un logo Sin importar si eres completamente nuevo/a en el diseño
            de logos o si eres más avanzado/a, todos pueden beneficiarse de algunas recomendaciones útiles.
            <br>
            <br>Además, ¡un proceso de diseño meditado resultará en un diseño de logo más efectivo!</h5>
    </div>
    <div class="slack__cards">
        <div ng-repeat="c in cards.consejos track by $index" ng-class="{'primero': $index == cards.indice, 'segundo': $index == (cards.indice - 1), 'fuera': $index > cards.indice}">
            <div class="slack__controls">
                <span class="up" ng-click="cards.changeCard(true)">
                    <svg viewBox="0 0 165.306 165.307" id="svg--navigation-up" width="100%" height="100%">
                        <title>navigation-up</title>
                        <g id="svgstore4743b7ff84dc357fcfb19f7bfd10e70anavigation-up">
                            <path d="M85.981,51.038c-1.842-1.883-4.815-1.883-6.656,0L56.497,74.373c-1.85,1.892-1.861,4.971-0.023,6.877
                                                    		c1.838,1.902,4.829,1.915,6.679,0.022l13.989-14.3v48.742c0,3.043,2.467,5.51,5.51,5.51c3.043,0,5.51-2.467,5.51-5.51V66.972
                                                    		l13.99,14.3c1.85,1.893,4.841,1.88,6.679-0.022c0.914-0.948,1.371-2.186,1.371-3.427c0-1.252-0.465-2.499-1.395-3.45L85.981,51.038
                                                    		z"></path>
                            <path d="M82.652,0C37.005,0,0,37.006,0,82.653c0,45.649,37.005,82.653,82.652,82.653c45.648,0,82.653-37.005,82.653-82.653
                                                    		C165.306,37.006,128.3,0,82.652,0z M82.652,154.307C43.143,154.307,11,122.163,11,82.653C11,43.144,43.143,11,82.652,11
                                                    		c39.51,0,71.653,32.144,71.653,71.653C154.306,122.163,122.162,154.307,82.652,154.307z"></path>
                        </g>
                    </svg>
                </span>
                <span class="down" ng-click="cards.changeCard()">
                    <svg viewBox="0 0 165.306 165.307" id="svg--navigation-down" width="100%" height="100%">
                        <title>navigation-down</title>
                        <g id="svgstorec0e204a8c1d0ef6e2ff1698635d19d80navigation-down">
                            <path d="M79.325,114.269c1.842,1.883,4.815,1.883,6.656,0l22.828-23.335c1.85-1.892,1.861-4.971,0.023-6.877
                                                    		c-1.838-1.902-4.829-1.915-6.679-0.022l-13.989,14.3V49.592c0-3.043-2.467-5.51-5.51-5.51c-3.043,0-5.51,2.467-5.51,5.51v48.743
                                                    		l-13.99-14.3c-1.85-1.893-4.841-1.88-6.679,0.022c-0.914,0.948-1.371,2.186-1.371,3.427c0,1.252,0.465,2.499,1.395,3.45
                                                    		L79.325,114.269z"></path>
                            <path d="M82.653,165.307c45.648,0,82.652-37.006,82.652-82.653C165.306,37.005,128.301,0,82.653,0C37.005,0,0,37.005,0,82.653
                                                    		C0,128.3,37.005,165.307,82.653,165.307z M82.653,11c39.509,0,71.652,32.144,71.652,71.653c0,39.51-32.143,71.653-71.652,71.653
                                                    		C43.144,154.307,11,122.163,11,82.653C11,43.144,43.144,11,82.653,11z"></path>
                        </g>
                    </svg>
                </span>
            </div>
            <div class="cuerpo">
                <h5 class="tips">Consejo {{$index+1}}</h5>
                <div>
                    <h2 class="text-center">{{c.nombre}}</h2>
                </div>
                <div>{{c.descripcion}}</div>
            </div>
        </div>
    </div>
</div>
<style>
    /* SLACK */

    .tips {
        margin: 0;
        border-bottom: #ed676e solid 2px;
        display: inline-block;
    }

    .slack {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 5% 10%;
        background: black;
        position: relative;
    }

    .slack__info {
        color: white;
        font-size: 20px;
        width: 58%;
        margin-right: 2%;
    }

    .slack__controls svg {
        fill: #d5d5d5;
        position: absolute;
        height: 30px;
        width: 30px;
    }

    .slack__controls>span {
        right: 14%;
        position: absolute;
        cursor: pointer;
        outline: none;
    }

    .slack__controls>span:hover svg {
        fill: #612787;
    }

    .slack__controls span.up {
        top: 33%;
    }

    .slack__controls span.down {
        top: 51%;
    }

    .slack__cards {
        width: 40%;
        padding: 0;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        -webkit-perspective: 900px;
        perspective: 900px;
        -webkit-perspective-origin: center bottom;
        perspective-origin: center bottom;
    }

    .slack__cards .cuerpo {
        text-align: justify;
    }

    .slack__cards>div * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .slack__cards>div {
        padding: 15px 18% 25px 8%;
        background: #5d656c;
        color: #091117;
        border-radius: 4px;
        top: 0;
        position: absolute;
        z-index: 0;
        -webkit-transition: -webkit-transform 0.5s, -webkit-transform 0.5s, opacity 0.5s, background-color 0.5s, border 0.5s, z-index 0s, height 0.5s;
        transition: -webkit-transform 0.5s, transform 0.5s, opacity 0.5s, background-color 0.5s, border 0.5s, z-index 0s, height 0.5s;
        -webkit-transform: translate3d(0, -42px, -65px) rotateX(0);
        transform: translate3d(0, -42px, -65px) rotateX(0);
    }

    .slack__cards>div.primero {
        -webkit-transform: translate3d(0, 0, 0) scale(1);
        transform: translate3d(0, 0, 0) scale(1);
        background: white;
        border: 1px solid #f0f0f0;
        z-index: 3;
    }

    .slack__cards>div.segundo {
        -webkit-transform: translate3d(0, -22px, -35px);
        transform: translate3d(0, -22px, -35px);
        background: #5d656c;
        z-index: 2;
    }

    .slack__cards>div.fuera {
        -webkit-transform: translate3d(0, 160px, 50px) scale(1) rotateX(-20deg);
        transform: translate3d(0, 160px, 50px) scale(1) rotateX(-20deg);
        -webkit-transform-origin: center 100%;
        transform-origin: center 100%;
        opacity: 0;
    }
</style>