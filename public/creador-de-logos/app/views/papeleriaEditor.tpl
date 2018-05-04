<div><button ng-click="papeleriaEditor.guardar()">guardar</button></div>

<div style="display: flex;">
    <bazam-menu-papeleria></bazam-menu-papeleria>
    <bazam-papeleria></bazam-papeleria>
</div>

<style>
    bazam-papeleria {
        width: 14cm;
        height: auto;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-right: 8px;
        display: block;
        margin: 30px auto;
        padding-bottom: 40px;
        position: relative;
    }

    .bazam-loader-papeleria {
        background-color: white;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
         
    }
  
    bazam-papeleria > svg {
        margin-bottom: 10px;
        position: absolute;
    }
</style>