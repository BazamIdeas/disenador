<div class="row" style=" padding-left: 50px;">
    </br>
    <div class="col s12 m4 l3" style="padding: 0;">
        <div class="row">
            <div class="input-field col s12">
                <input id="icon_prefix" ng-model="ctrl.buscar" type="text" placeholder="{{textos.buscador}}" class="validate">
            </div>
        </div>
        <div class="row temas">
            <ul class="col s12" ng-repeat="tema in temas" ng-class="{'activo':ctrl.temaActivo == tema.titulo}" ng-click="ctrl.temaActivo = tema.titulo; ctrl.buscar = ''">
                <li>
                    <h6 class="bold">{{tema.titulo}}</h6>
                </li>
                <ul>
                    <li ng-repeat="pregunta in tema.preguntas" ng-click=" ctrl.scrollTop($parent.$index, $index, pregunta)" ng-class="{'activo':pregunta.activo}">{{pregunta.titulo}}</li>
                </ul>
            </ul>
        </div>
    </div>

    <div class="col s12 m8 l9 scroll">
        <cerrar ng-click="estado = false">
            <md-icon>close</md-icon>
        </cerrar>
        <div id="tem{{$index}}" class="row help-wrapper" ng-repeat="tema in temas" ng-class="{'activo':ctrl.temaActivo == tema.titulo}" ng-click="ctrl.temaActivo = tema.titulo;">
            <div class="col s12">
                <h5 class="bold">{{tema.titulo}}</h5>
            </div>
            <div id="pre{{$parent.$index}}{{$index}}" class="col s11" layout-padding style="    border: 1px solid #c0c0c02e;" ng-class="{'activo': ctrl.preguntaActivo == pregunta.titulo, 'desplegado' : pregunta.activo}"
                ng-repeat="pregunta in tema.preguntas | filter: ctrl.buscar" ng-click="pregunta.activo = !pregunta.activo; ctrl.preguntaActivo = pregunta.titulo">
                <h6 class="bold">{{pregunta.titulo}}</h6>
                <div ng-show="pregunta.activo">
                    <p class="flow-text">{{pregunta.descripcion}}</p>
                    <div class="row valign-wrapper center-align">
                        <div class="col {{img.class}}" ng-repeat="img in pregunta.imagenes" ng-show="pregunta.imagenes.length">
                            <img ng-src="{{img.src}}">
                            <p>{{img.descripcion}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 bold" layout-padding>{{textos.footer}}
                <a href="mailto:info@logo.pro">info@logo.pro</a>
            </div>
        </div>
    </div>

</div>