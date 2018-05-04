<div class="categorias-papeleria">
    <div ng-repeat="categoria in papeleria.categoriasModelos">{{categoria.nombre}}</div>
</div>
<div class="papeleria-ejemplos">
    <div ng-repeat="modelo in papeleria.modelos">
        <img ng-src="{{modelo.img}}">
        <div>
            <h4>{{modelo.nombre}}</h4>
        </div>
        <div class="boton-ejemplo-papeleria" ui-sref="papeleriaEditor({id: papeleria.idLogo})">CREAR</div>
    </div>
</div>

<style>
    .categorias-papeleria>div {
        padding: 10px;
        font-size: 25pt;
        text-transform: capitalize;
        margin-right: 20px;
        cursor: pointer;
    }

    .categorias-papeleria {
        display: flex;
        justify-content: center;
        padding: 20px 0px;
        height: 15%;
    }

    .papeleria-ejemplos {
        display: flex;
        flex-wrap: wrap;
        height: 75%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .papeleria-ejemplos>div {
        width: 33.3%;
        text-align: center;
        border: 5px solid #d3e6ec;
        margin: 0;
        padding: 0;
    }

    .papeleria-ejemplos>div img {
        width: 60%;
        margin: auto;
        display: block;
    }

    .boton-ejemplo-papeleria {
        padding: 8px;
        border: 1px solid black;
        border-radius: 30px;
        width: 30%;
        font-size: 14pt;
        margin: 9px auto;
    }
</style>