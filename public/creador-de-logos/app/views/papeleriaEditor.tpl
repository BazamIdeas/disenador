<div style="display: flex;">
    <bazam-menu-papeleria></bazam-menu-papeleria>
    <div class="papeleria-editor-container">
        <div ng-show="!papeleriaEditor.papeleria" style="    height: calc(100% - 60px); display: flex; justify-content: center; align-items: center;">
            <img style="width:100%;" style="display: block; margin: auto;" src="assets/images/gifs/c.gif">
        </div>

        <bazam-papeleria></bazam-papeleria>
        <div>
            <md-button ng-disable="papeleriaEditor.peticion" ng-show="papeleriaEditor.papeleria" ng-click="papeleriaEditor.guardar()" class="boton-crear-papeleria">GUARDAR</md-button>
        </div>
    </div>
</div>

<style>
    .papeleria-editor-container{
        background: #f4f2f2;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    
    bazam-papeleria {
        width: 14cm;
        margin: 0 auto;
        height: calc(80% - 60px);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bazam-loader-papeleria {
        background-color: white;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;

    }

    bazam-papeleria>svg {
        margin-bottom: 10px;
        position: absolute;
    }


    bazam-papeleria .hook-seleccionado g {
        animation-name: parpadeo;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: initial;
        animation-fill-mode: both;
        -webkit-animation-name: parpadeo;
        -webkit-animation-duration: 1s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-fill-mode: both;
    }


    bazam-papeleria > svg * {
        overflow: visible !important;
    }

    bazam-papeleria > svg *:not(.rect-bz, .contenedor-logo) {
        pointer-events: none; 
    }

    bazam-papeleria > svg .hook > svg *{
        
        pointer-events: bounding-box;
    }

    [movimiento-bz]{		
		fill: transparent;
		stroke: black;
		stroke-width: 1px;
		stroke-dasharray: 3px;		
    }

    @keyframes picker-activo {
        from {
            transform: scale(0.1);
        }

        to {
            transform: scale(1);
        }
    }

    .papeleria-editor-container .element-color-picker.color-picker-activo{
        animation-duration: 0.5s;
        animation-name: picker-activo;
        animation-fill-mode: forwards;
    }

    .multi-logo-color-container{
        display: flex;
        justify-content: space-around;
    }

    .logo-color-container {
        background-color: #bcbcbc;
        width: 18%;
        display: inline-block;
    }



</style>