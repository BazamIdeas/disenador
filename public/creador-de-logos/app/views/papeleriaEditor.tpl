<div>
    <button ng-click="papeleriaEditor.guardar()">guardar</button>
</div>

<div style="display: flex;">
    <bazam-menu-papeleria></bazam-menu-papeleria>
    <bazam-papeleria></bazam-papeleria>
</div>

<style>
    bazam-papeleria {
        width: 14cm;
        margin: 0 auto;
        max-height: calc(100% - 60px);
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
        animation-iteration-count:initial;
        animation-fill-mode: both;
        -webkit-animation-name: parpadeo;
        -webkit-animation-duration: 1s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-fill-mode: both;
    }
</style>