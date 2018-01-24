
        <section class="sub-header">
            <div class="row margin-bottom-0">

                <div class="col s2 logo">
                    <h5 class="secundario"  ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
                </div>
                <div class="col s8 texto">
                    <h5 class="principal"> MIS LOGOS</h5>
                </div>

            </div>
        </section>

        <section class="scrollbar-dynamic section-cliente" data-jquery-scrollbar="$parent.principal.jqueryScrollbarOptions">
            
            
            <div class="row" ng-if="logos.datos.idCliente && !logos.facturacion.length" >
                <div class="col s8 offset-s2" style="background:red">
                    ¡Importante! Para retirar saldo de su cuenta debe poseer un método de cobro registrado. Puede registrarlo haciendo <span ui-sref="cuenta">click aquí</span>. 
                </div>
            </div>
            
            <button ng-click="logos.opcionMostrar='borradores'" class="boton-verde">BORRADORES</button>
            <button ng-click="logos.opcionMostrar='pendientes'" class="boton-verde">PENDIENTES POR APROBACIÓN</button>
            <button ng-click="logos.opcionMostrar='aprobados'" class="boton-verde">APROBADOS</button>
            <button ng-click="logos.opcionMostrar='vendidos'" class="boton-verde">VENDIDOS</button>
            
            <div class="row margin-bottom-0" ng-switch="logos.opcionMostrar">
				<!--PENDIENTES DE APROBACION-->
				<div class="col l6 offset-l3 xl6 offset-xl3" ng-switch-when="pendientes">
                    <div class="row caja logos">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">PENDIENTES DE APROBACIÓN</p>
                        
                        <span class="back-page"  ng-click="logos.modificarSalto(false, 'pendientes')" ng-show="logos.cantidad.pendientes > 9"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4" ng-repeat="pendiente in logos.pendientes | limitTo: 9 : logos.salto.pendientes track by pendiente.idLogo">
                                    <div>
                                        <div class="overlay-combinacion"></div>
                                        <span class="editar" ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: pendiente.elementos_idElemento, svg:  pendiente.logo}}, idLogopendiente: pendiente.idLogo, fuentes: {principal: logos.buscarAtributo(pendiente.atributos, 'principal'), eslogan: logos.buscarAtributo(pendiente.atributos,'eslogan')}}})">
                                            <md-tooltip md-delay="2" md-direction="top">Editar</md-tooltip>
                                            <i class="material-icons">edit</i>
                                        </span>

                                        <span class="borrar" ng-click="logos.borrarLogo(pendiente.idLogo)">
                                            <md-tooltip md-delay="2" md-direction="top">Eliminar</md-tooltip>
                                            <i class="material-icons">delete</i>
                                        </span>
                                        <bazam-visualizar data-svg="logos.base64.decode(pendiente.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <span class="next-page" ng-click="logos.modificarSalto(true, 'pendientes')" ng-show="logos.cantidad.pendientes > 9"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>
                <!--APROBADOS-->
				<div class="col l6 offset-l3 xl6 offset-xl3" ng-switch-when="aprobados">
                    <div class="row caja logos">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">APROBADOS</p>
                        
                        <span class="back-page" ng-click="logos.modificarSalto(false, 'aprobados')" ng-show="logos.cantidad.aprobados > 9"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4"  ng-repeat="aprobado in logos.aprobados | limitTo: 9 : logos.salto.aprobados track by aprobado.idLogo">
                                    <div>
                                        <div class="overlay-combinacion"></div>
                                                                                                        
                                        <bazam-visualizar data-svg="logos.base64.decode(aprobado.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>
                    
                        <span class="next-page" ng-click="logos.modificarSalto(true, 'aprobados')"  ng-show="logos.cantidad.aprobados > 9"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>
                <!--VENDIDOS-->
                <div class="col l6 offset-l3 xl6 offset-xl3" ng-switch-when="vendidos">
                    <div class="row caja logos">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">VENDIDOS</p>
                        
                        <span class="back-page" ng-click="logos.modificarSalto(false, 'vendidos')" ng-show="logos.cantidad.aprobados > 9"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4"  ng-repeat="vendido in logos.vendidos | limitTo: 9 : logos.salto.vendidos track by vendido.idLogo">
                                    <div>
                                        <div class="overlay-combinacion"></div>
                                                                                                        
                                        <bazam-visualizar data-svg="logos.base64.decode(vendido.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>
                    
                        <span class="next-page" ng-click="logos.modificarSalto(true, 'vendidos')"  ng-show="logos.cantidad.aprobados > 9"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>
                <!--BORRADORES-->
                <div class="col l6 offset-l3 xl6 offset-xl3" ng-switch-when="borradores">
                    <div class="row caja logos">
                        <p class="text-center tercero margin-bottom-0 margin-top-0">BORRADORES</p>
                        
                        <span class="back-page" ng-click="logos.modificarSalto(false, 'borradores')" ng-show="logos.cantidad.aprobados > 9"><i class="material-icons">keyboard_arrow_left</i></span>
                        
                        <div class="col l10 offset-l1">
                            <div class="row cubos-logos-cliente">

                                <div class="col l4"  ng-repeat="borrador in logos.borradores | limitTo: 9 : logos.salto.borradores track by borrador.idLogo">
                                    <div>
                                        <div class="overlay-combinacion"></div>
                                                                                                        
                                        <bazam-visualizar data-svg="logos.base64.decode(borrador.logo)"></bazam-visualizar>
                                    </div>
                                </div>

                            </div>
                        </div>
                    
                        <span class="next-page" ng-click="logos.modificarSalto(true, 'aprobados')"  ng-show="logos.cantidad.aprobados > 9"><i class="material-icons">keyboard_arrow_right</i></span>

                    </div>
                </div>
                
            </div>
        </section>

