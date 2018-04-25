<div>
    <bazam-menu-papeleria></bazam-menu-papeleria>
</div>
<div ng-switch="papeleriaEditor.papeleria.tipo.nombre" style="width: 500px; margin:auto;">

    <div ng-switch-when="tarjeta">
        <bazam-tarjeta></bazam-tarjeta>
    </div>
   

</div>