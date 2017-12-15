                    <div class="row margin-bottom-0 lienzo">
                        <div class="col s12" ng-if="$parent.principal.completado && !principalComenzar.logoCompartido.logo">
                            <p class="text-center tercero margin-bottom-0">EJEMPLOS EXITOSOS</p>
                        </div>
						<div class="col s12" ng-if="$parent.principal.completado && !principalComenzar.logoCompartido.logo">
                            <div class="cubos-logos">
                                <div class="margin-right-20">
                                    <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/4.-Fauna-Domestica.png">
                                </div>
                                <div class="margin-right-20">
                                    <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/15.-Hobbie.png">
                                </div>
                                <div>
                                    <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/26.Cielo_.png">
                                </div>
                            </div>

                            <div class="cubos-logos">
                                <div class="margin-right-20">
                                    <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/22.-Geoit.png">
                                </div>
                                <div class="margin-right-20">
                                    <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/7.-Arlu-1.png">
                                </div>
                                <div>
                                     <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/21.-Ares.png">
                                </div>
                            </div>

                            <div class="cubos-logos">
                                <div class="margin-right-20">
                                    <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/20.Arquitectura-Sin-Limites.png">
                                </div>
                                <div class="margin-right-20">
                                     <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/9.-food-chef.png">
                                </div>
                                <div>
                                     <img src="https://www.liderlogo.es/wp-content/uploads/2017/07/28.-Esparvel.png">
                                </div>
                            </div>
                        </div>
                        
                        <div class="col l4 offset-l4 logo-compartido" ng-if="principalComenzar.logoCompartido.logo">
                            <bazam-visualizar data-svg="principalComenzar.base64.decode(principalComenzar.logoCompartido.logo)"></bazam-visualizar>
                        </div>
                        
                        
                        <div class="col s12" ng-if="!$parent.principal.completado">
                            GIF
                        </div>
                    </div>
