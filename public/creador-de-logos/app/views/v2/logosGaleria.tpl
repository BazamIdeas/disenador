<section class="sub-header">
    <div class="row margin-bottom-0">

        <div class="col s2 logo">
            <h5 class="secundario" ui-sref="principal.comenzar"> <i class="material-icons md-48 aling-top">fingerprint</i> <span>DISEÑADOR</span> </h5>
        </div>
        <div class="col s8 texto">
            <h5 class="principal">¡Elige entre miles de diseños!</h5>
        </div>

    </div>
</section>
<div class="row">
    <div class="col s6 offset-s3">
        <div class="row cubos-logos">
            <div ng-repeat="aprobado in logosGaleria.aprobados | limitTo : 6 track by aprobado.idLogo ">
                <div class="overlay-combinacion"></div>
                <span class="seleccionar" ui-sref="editor({status: true, datos: {logo: {icono: {idElemento: aprobado.elementos_idElemento, svg:  aprobado.logo}}, idLogoPadre: aprobado.idLogo, fuentes: {principal: logosGaleria.buscarAtributo(aprobado.atributos, 'principal'), eslogan: logosGaleria.buscarAtributo(aprobado.atributos,'eslogan')}, metas: logosGaleria.obtenerMetas(aprobado.metas)}})">
                    <md-tooltip md-delay="2" md-direction="top">Seleccionar</md-tooltip>
                    <i class="material-icons">check</i>
                </span>
                <bazam-visualizar data-svg="logosGaleria.base64.decode(aprobado.logo)"></bazam-visualizar>
            </div>

        </div>
        <div class="row">
            <div class="col s6 offset-s3" style="text-align: center;">
                <button class="boton-verde">VER MÁS</button>
            </div>
        </div>
    </div>
</div>
