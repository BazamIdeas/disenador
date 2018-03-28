<div class="ver-logo-enorme" ng-class="{'activo' : estado}">
    <div ng-click="estado = false" class="cerrar-prev">
        <md-icon>close</md-icon>
    </div>
    <div class="contenedor-ver-logo" style="background-color:{{colores[0]}}">
        <div class="logo">
            <bazam-actualizar data-svg="logo"></bazam-actualizar>
        </div>
    </div>
    <div class="contenedor-ver-previsualizar uno">
        <div class="contenedor-logoprev" style="width: 102%;
        height: 100.4vh;
        background-image: url(assets/images/shirt.png), url(assets/images/shirt_overlay.png), url(assets/images/shirt_multiply.png);
        background-size: 100%;
        background-blend-mode: normal, overlay, multiply;
        background-color: {{colores[0]}};
        background-repeat: no-repeat;
            ">
            <div style="    left: 43%;
            padding-top: 21%;">
                <bazam-actualizar data-svg="logo"></bazam-actualizar>
            </div>
        </div>
        <div style="display: flex; flex-direction: column;     padding-left: 5px;">

            <div class="contenedor-logoprev" style="padding-bottom:5px;">
                <div style="    transform: rotate(46deg);
                padding-top: 15%;
                left: 21%;">
                    <bazam-actualizar data-svg="logo"></bazam-actualizar>
                </div>
                <img src="assets/images/card.png" width="100%">
            </div>
            <div class="contenedor-logoprev">
                <div style="    transform: rotate(55deg);
                padding-top: 14%;
                left: 58%;">
                    <bazam-actualizar data-svg="logo"></bazam-actualizar>
                </div>
                <img src="assets/images/leica.jpg" width="100%">
            </div>

        </div>
    </div>

    <bazam-planes>

    </bazam-planes>

    <div class="contenedor-ver-previsualizar dos" style="padding-bottom:5px;">
        <div class="contenedor-logoprev" style="padding-right:5px;">
            <div style="    transform: skewY(16deg) skewX(-4deg);
            padding-top: 4%;
            left: 33.5%;
            width: 15%;">
                <bazam-actualizar data-svg="logo"></bazam-actualizar>
            </div>
            <img src="assets/images/sign.jpg" width="100%" style="    height: 76.8vh;">
        </div>
        <div class="contenedor-logoprev">
            <div style="    transform: perspective(500px) rotateY(15deg) skewY(-3deg) skewX(1deg);
            padding-top: 12%;
            left: 30.5%;
            width: 25%;">
                <bazam-actualizar data-svg="logo"></bazam-actualizar>
            </div>

            <div style="transform: perspective(500px) rotateY(15deg) skewY(-3deg) skewX(1deg);
            width: 17%;
            height: 0px;
            padding-top: 19%;
            position: absolute;
            left: 63%;
            top: 0px;
            opacity: 0.5;
            filter: blur(2px);">
                <bazam-actualizar data-svg="logo"></bazam-actualizar>
            </div>
            <img src="assets/images/box2.jpg" width="100%" style="height: 76.8vh;">
        </div>
    </div>
</div>

<style>
    .ver-logo-enorme {
        position: absolute;
        bottom: 0;
        z-index: 13;
        transition: height 1s;
        width: 100vw;
        height: 0;
        background: white;
    }

    .ver-logo-enorme.activo {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .ver-logo-enorme .contenedor-ver-logo {
        height: 80vh;
    }

    /**************/

    .contenedor-ver-logo .logo {
        width: 25%;
    }

    .contenedor-ver-logo {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cerrar-prev:hover {
        transform: scale(1.1);
        border: 1px solid black;
        background: white;
    }

    .ver-logo-enorme.activo .cerrar-prev {
        position: fixed;
        right: 3%;
        top: 3%;
        padding: 9px;
        border-radius: 50%;
        background: #ffffffa3;
        z-index: 15;
        transition: all 0.3s;
        border: 1px solid white;
    }

    /***************/

    .contenedor-ver-previsualizar {
        display: flex;
    }

    .contenedor-ver-previsualizar.uno {
        padding: 5px 0;
    }

    .contenedor-ver-previsualizar>div {
        width: 50%;
    }

    .contenedor-logoprev {
        position: relative;
    }

    .contenedor-logoprev>div {
        position: absolute;
        width: 25%;
        left: 10%;
        top: 15%;
    }

    /*************/
</style>