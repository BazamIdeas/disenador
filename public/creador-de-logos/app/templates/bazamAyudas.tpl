<div class="row">
    </br>
    <div class="col s12 m4 l3" style="padding: 0;">
        <div class="row" style="    padding-left: 10px;">
            <div class="input-field col s12">
                <input id="icon_prefix" ng-model="ctrl.buscar" type="text" placeholder="Buscar:" class="validate">
            </div>
        </div>
        <div class="row temas">
            <ul class="col s12" ng-repeat="tema in temas" ng-class="{'activo':ctrl.temaActivo == tema.title}" ng-click="ctrl.temaActivo = tema.title; ctrl.buscar = ''">
                <li>
                    <h6 class="bold">{{tema.title}}</h6>
                </li>
                <ul>
                    <li ng-repeat="pregunta in tema.preguntas" ng-click="ctrl.preguntaActivo = pregunta.title; ctrl.buscar = ''" ng-class="{'activo':ctrl.preguntaActivo == pregunta.title}">{{pregunta.title}}</li>
                </ul>
            </ul>
        </div>
    </div>

    <div class="col s12 m8 l9 scroll">
        <div class="row help-wrapper" ng-repeat="tema in temas | filter: ctrl.buscar" ng-click="ctrl.temaActivo = tema.title" ng-class="{'activo':ctrl.temaActivo == tema.title}">
            <div class="col s12">
                <h5 class="bold">{{tema.title}}</h5>
            </div>
            <div class="col s11" layout-padding style="    border: 1px solid #c0c0c02e;" ng-class="{'activo': ctrl.preguntaActivo == pregunta.title}"
                ng-repeat="pregunta in tema.preguntas | filter: ctrl.buscar" ng-click="ctrl.preguntaActivo = pregunta.title">
                <h6 class="bold">{{pregunta.title}}</h6>
                <p class="flow-text">{{pregunta.description}}</p>
            </div>
        </div>
    </div>
</div>