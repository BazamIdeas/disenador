<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col s2 logo">
            <h5 class="secundario" ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
        </div>
        <div class="col s8 texto">
            <h5 class="logosGaleria">¡Elige entre miles de diseños!</h5>
        </div>

    </div>
</section>
<div class="row">
    <div class="col s6 offset-s3">
        <div class="row cubos-logos">
            <div ng-repeat="aprobado in logosGaleria.aprobados | limitTo : 6 track by aprobado.idLogo ">
                <div class="overlay-combinacion"></div>
                <span class="seleccionar" ng-click="logosGaleria.avanzar(aprobado.idLogo)">
                    <md-tooltip md-delay="2" md-direction="top">Seleccionar</md-tooltip>
                    <i class="material-icons">check</i>
                </span>
                <bazam-visualizar data-svg="logosGaleria.base64.decode(aprobado.logo)"></bazam-visualizar>
            </div>
            
            <div ng-if="!logosGaleria.aprobados.length">No hay diseños</div>

        </div>
        <div class="row" ng-if="logosGaleria.aprobados.length">
            <div class="col s6 offset-s3" style="text-align: center;">
                <button class="boton-verde" ng-click="logosGaleria.cargarMas(logosGaleria.aprobados[logosGaleria.aprobados.length - 1])" ng-class="{'loading-white': !logosGaleria.completadoCarga}">VER MÁS</button>
            </div>
        </div>
    </div>
</div>




<div class="overlay" ng-class="{'show': logosGaleria.mostrarModalLogin, 'hide': !logosGaleria.mostrarModalLogin}"> 
            <div class="row margin-bottom-0">
                <div class="col s6 offset-s3">

                    <div class="login-form-flex"> 

                        <div class="cubo-form row">

                            <i class="material-icons cerrar" ng-click="logosGaleria.mostrarModalLogin = false">clear</i>

                            <div class="login-form col s6">
                                <p class="text-center tercero">INGRESA</p>
                                <form name="logosGaleria.loginForm" novalidate ng-submit="logosGaleria.login(logosGaleria.datosLogin, logosGaleria.loginForm.$valid)">
                                    <div class="input-field col s12">
                                        <input id="correo" name="correo" type="email" ng-model ="logosGaleria.datosLogin.correo" required>
                                        <label for="correo">Correo</label>
                                        
                                        <div ng-messages="logosGaleria.loginForm.correo.$error" ng-if="logosGaleria.loginForm.$submitted || logosGaleria.loginForm.correo.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="email">Debe ser un email válido.</div>
                                        </div>
                                    </div>  
                                    <div class="input-field col s12">
                                        <input id="pass" name="pass" type="password" ng-model ="logosGaleria.datosLogin.pass" ng-minlength="6" ng-maxlength="20" required>
                                        <label for="pass">Contraseña</label>
                                        
                                        <div ng-messages="logosGaleria.loginForm.pass.$error" ng-if="logosGaleria.loginForm.$submitted || logosGaleria.loginForm.pass.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                            <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button class="boton-verde" ng-class="{'loading-white': !logosGaleria.completadoLogin}">ENVIAR</button>
                                    </div>                               
                                </form>
                            </div>

                            <div class="registro-form col s6">
                                <p class="text-center tercero">REGISTRATE</p>
                                <form name="logosGaleria.registroForm" novalidate ng-submit="logosGaleria.registrar(logosGaleria.datosRegistro, logosGaleria.registroForm.$valid)">
	                                <div class="input-field col s12">
	                                    <input id="nombre2" type="text" name="nombreCliente" ng-model="logosGaleria.datosRegistro.nombreCliente" required>
	                                    <label for="nombre2">Nombre</label>
                                        
                                        <div ng-messages="logosGaleria.registroForm.nombreCliente.$error" ng-if="logosGaleria.registroForm.$submitted || logosGaleria.registroForm.nombreCliente.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                        </div>
	                                </div>
	                                <div class="input-field col s12">
	                                    <input id="correo2" type="email" name="correo" ng-model="logosGaleria.datosRegistro.correo" required>
	                                    <label for="correo2">Correo</label>
                                        
                                        <div ng-messages="logosGaleria.registroForm.correo.$error" ng-if="logosGaleria.registroForm.$submitted || logosGaleria.registroForm.correo.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="email">Debe ser un email válido.</div>
                                        </div>
                                        
	                                </div>
	                                <div class="input-field col s12">
	                                    <input id="pass2" type="password" ng-model="logosGaleria.datosRegistro.pass" ng-minlength="6" ng-maxlength="20" required>
	                                    <label for="pass2">Contraseña</label>
                                        
                                         <div ng-messages="logosGaleria.registroForm.pass.$error" ng-if="logosGaleria.registroForm.$submitted || logosGaleria.registroForm.pass.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                            <div ng-message="minlength">Debe tener más de 5 carácteres.</div>
                                            <div ng-message="maxlength">Debe tener menos de 20 carácteres.</div>
                                        </div>
	                                </div>
	                                <div class="input-field col s12">
	                                    <input id="telefono" type="text" name="telefono" ng-model="logosGaleria.datosRegistro.telefono" required>
	                                    <label for="telefono">Telefóno</label>
                                        
                                        <div ng-messages="logosGaleria.registroForm.telefono.$error" ng-if="logosGaleria.registroForm.$submitted || logosGaleria.registroForm.telefono.$dirty">
                                            <div ng-message="required">Este campo es requerido.</div>
                                        </div>
	                                </div>
	                                <div class="input-field col s12">
	                                                                     
                                        <md-input-container style="width: 100%;padding: 0 0rem;margin-top: 0;" >
                                            <md-select ng-model="logosGaleria.datosRegistro.pais" placeholder="Pais" required> 
                                                <md-option ng-repeat="(llave, valor) in logosGaleria.paises track by $index" ng-value="llave"  ng-selected="llave == logosGaleria.paisDefecto">{{valor}}</md-option>
                                            </md-select>
                                        </md-input-container>
	                                </div>  
	                                <div class="text-center">
	                                    <button class="boton-verde">ENVIAR</button>
	                                </div>
	                            </form>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
