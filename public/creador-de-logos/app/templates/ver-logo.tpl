<div class="bazam-previzualizar" ng-class="{'active' : estado}">
    <div ng-click="estado = false" class="close-prev">
        <md-icon>close</md-icon>
    </div>
    <div class="preview-logo" style="background-color:{{datos.colores.fondo}}">
        <div class="logo">
            <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
        </div>
    </div>
    <div class="bazam-previzualizar-container one">
        <div class="preview" style="width: 102%;
        height: 100vh;
        background-image: url(assets/images/shirt.png), url(assets/images/shirt_overlay.png), url(assets/images/shirt_multiply.png);
        background-size: 100%;
        background-blend-mode: normal, overlay, multiply;
        background-color: {{datos.colores.fondo ? datos.colores.fondo : '#fcfcfc'}};
        background-repeat: no-repeat;
            ">
            <div style="    left: 43%;
            padding-top: 21%;">
                <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
            </div>
        </div>
        <div style="display: flex; flex-direction: column;padding-left: 5px;">

            <div class="preview" style="padding-bottom:5px;    width: 100%;">
                <div style="    transform: rotate(46deg);
                padding-top: 15%;
                left: 21%;">
                    <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
                </div>
                <img src="assets/images/card.png" width="100%"  style=" height: calc(50vh - 5px); ">
            </div>
            <div class="preview" style="width: 100%;">
                <div style="    transform: rotate(55deg);
                padding-top: 14%;
                left: 58%;">
                    <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
                </div>
                <img src="assets/images/leica.jpg" width="100%" style=" height:50vh; ">
            </div>

        </div>
    </div>

    <div class="ver-logo-planes">
        <bazam-listar-planes datos="datos" guardar-logo="guardarLogo" data-id="id" verlogo="true"></bazam-listar-planes>
    </div>


    <div class="bazam-previzualizar-container two" style="padding-bottom:5px;">
        <div class="preview" style="padding-right:5px;">
            <div style="    transform: skewY(16deg) skewX(-4deg);
            padding-top: 4%;
            left: 33.5%;
            width: 15%;">
                <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
            </div>
            <img src="assets/images/sign.jpg" width="100%" style="    height: 76.8vh;">
        </div>
        <div class="preview">
            <div style="    transform: perspective(500px) rotateY(15deg) skewY(-3deg) skewX(1deg);
            padding-top: 12%;
            left: 30.5%;
            width: 25%;">
                <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
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
                <bazam-actualizar data-svg="datos.logo"></bazam-actualizar>
            </div>
            <img src="assets/images/box2.jpg" width="100%" style="height: 76.8vh;">
        </div>
    </div>
</div>