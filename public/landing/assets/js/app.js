$.noConflict();
jQuery(document).ready(function ($) {

	if (window.localStorage.getItem("bzToken")) {
		$(".acceder.logeado").removeClass("hidden");
		$(".acceder.mostrar-login").addClass("hidden");
	}

	$("a.salir").click(function () {
		window.localStorage.removeItem("bzToken");
		$(".acceder.mostrar-login").removeClass("hidden");
		$(".acceder.logeado").addClass("hidden");
	});

	$(".boton-formulario-generar.ver-mas").click(function () {

	});



	var repeticion;
	var repeticion2;
	var videoActivo;

	function timeout(indexParam) {

		// Variables predefinidas

		var top = $(".pasos i").css("top").replace("px", "");
		var time = $(".step_guide_image.active").attr("data-time");
		var index = $(".step_guide_image.active").attr("data-index");
		var cantidadVideos = parseInt($(".tres-pasos").attr("cantidad-videos"));

		$(".tres-pasos *").removeClass("active");

		// Si es clickeado un paso
		if (indexParam) {
			time = $(".step_guide_image[data-index=" + index + "]").attr("data-time");
			index = indexParam;
		}

		if (index == cantidadVideos) {
			$(".step_guide_image[data-index=\"1\"]").addClass("active");
			$(".step_line > :nth-child(1)").addClass("active");
			$(".pasos > :nth-child(1)").addClass("active");
			$(".pasos i").css("top", "0px");
			videoActivo = document.getElementById("video1");
			videoActivo.play();
		} else {

			index++;
			top = parseInt(top) + 162;

			$(".step_guide_image[data-index=\"" + index + "\"]").addClass("active");
			$(".step_line > :nth-child(" + index + ")").addClass("active");
			$(".pasos > :nth-child(" + index + ")").addClass("active");
			$(".pasos i").css("top", top + "px");
			videoActivo = document.getElementById("video" + index);
			videoActivo.play();

		}

		// Bucle infinito de videos
		repeticion = setTimeout(function () {
			videoActivo.pause();
			timeout();
		}, time);

	}

	// Auto ejecicion del bucle
	videoActivo = document.getElementById("video1");
	videoActivo.play();
	setTimeout(function () {
		videoActivo.pause();
		timeout();
	}, $(".step_guide_image.active").attr("data-time"));

	// Si se clickea un paso
	$(".step_ctn > h4").click(function () {

		window.clearTimeout(repeticion);
		window.clearTimeout(repeticion2);
		videoActivo.pause();

		var index = parseInt($(this).attr("data-index"));
		var top = $(".pasos i").css("top").replace("px", "");
		//var cantidadVideos = parseInt($(".tres-pasos").attr("cantidad-videos"));
		videoActivo = document.getElementById("video" + index);

		videoActivo.play();

		$(".tres-pasos *").removeClass("active");

		$(".step_guide_image[data-index=\"" + index + "\"]").addClass("active");
		$(".step_line > :nth-child(" + index + ")").addClass("active");
		$(".pasos > :nth-child(" + index + ")").addClass("active");

		if (index == 1) {
			$(".pasos i").css("top", "0px");
		} else if (index == 2) {
			top = 162;
			$(".pasos i").css("top", top + "px");
		} else {
			top = 162 * 2;
			$(".pasos i").css("top", top + "px");
		}

		repeticion2 = setTimeout(function () {

			videoActivo.pause();
			timeout();

		}, $(".step_guide_image[data-index=\"" + $(this).attr("data-index") + "\"]").attr("data-time"));

	});


	$(".enviar_editor").click(enviarEditor);

	function enviarEditor() {

		var logo = $(this);

		var textos = {
			ES: ["Su empresa", "Eslogan o pie de marca"],
			EN: ["Your Company", "Slogan or brand taglines"],
			PT: ["Sua empresa", "Slogan ou pé de marca"],
		}[idioma];

		var data = {
			predisenado: true,
			fuentes: {
				principal: "",
				eslogan: ""
			},
			logo: {
				icono: {
					idElemento: "",
					svg: ""
				},
				texto: textos[0],
				eslogan: textos[1],
			},
			idLogoPadre: 0,
			categoria: logo.attr("data-categoria")
			//subcategoria: logo.attr("data-subcategoria"),
		};

		var atributos = JSON.parse(logo.attr("data-attrs"));

		atributos.forEach(function (element) {
			if (element.clave == "principal" || element.clave == "eslogan") {
				data.fuentes[element.clave] = element.valor;
			}
		});

		data.logo.icono.svg = logo.attr("data-svg");

		data.idLogoPadre = logo.attr("data-id");

		data.logo.icono.idElemento = logo.attr("data-noun");

		data = JSON.stringify(data);

		window.localStorage.setItem("editor", data);

		window.location = "../creador-de-logos/editor/";

	}

	$(".buscarEditor").click(buscarEditor);

	function buscarEditor() {

		var elemento = $(this);

		var tag = JSON.parse(elemento.attr("data-tag"));

		var data = {
			etiquetasParaBusqueda: [tag.traducciones[0].valor],
			etiquetasSeleccionadas: [
				{
					_id: tag._id, traducciones: [
						{ valor: tag.traducciones[0].valor }
					]
				}
			],
			nombre: "Mi logo",
			idCategoria: elemento.attr("data-categoria"),
			paginaCategoria: true
		};

		window.localStorage.setItem("comenzar", JSON.stringify(data));

		data = {
			categoria: elemento.attr("data-categoria"),
			subCategoria: elemento.attr("data-subcategoria"),
			tag: tag._id
		};

		window.localStorage.setItem("comenzarSub", JSON.stringify(data));

		window.location = "../creador-de-logos/";
	}

	$(".ver-mas").click(function () {

		var ruta = "/logos/";

		var contenedor = $(".logos-predisenados.para-busqueda");

		// PREVENIR

		var logo = contenedor.find("> :last-child a");

		var data = {
			idLogo: logo.data("id"),
			idCategoria: logo.data("categoria")
		};

		var idSubCategoria = logo.data("subcategoria");

		if (!mostraretiquetaslogo) {
			ruta = ruta + "categoria";
		} else {
			data.idCategoria = idSubCategoria;
			ruta = ruta + "subcategoria";
		}

		$.ajax({
			type: "POST",
			url: ruta,
			data: data,
			success: function (res) {
				contenedor.empty();
				$.each(res, function (i, val) {
					var elemento = $(`
					<div class='--item big'>
						<a class="enviar_editor" data-id="${val.idLogo}" data-noun="${val.noun}" data-subcategoria="${val.categorias_idCategoria}"
							data-categoria="${val.padre}" data-attrs='${JSON.stringify(val.atributos)}' data-svg="${val.logo}">
							<span>
								<img src="/app/logo/predisenados/${val.idLogo}"> 
							</span>
						</a>
						<div class="tags">
							
						</div>
					</div>`);

					if(mostraretiquetaslogo){
						for (var i = 0; i <  val.etiquetas.length; i++) {
							var el = val.etiquetas[i];
	
							var etiqueta = $("<a class='buscarEditor' data-subcategoria='"+ val.categorias_idCategoria +"' data-categoria='"+ val.padre +"' data-tag='"+ JSON.stringify(el) +"'>"+ el.traducciones[0].valor +"</a>");
	
							etiqueta.click(buscarEditor);
							elemento.find('.tags').append(etiqueta);
						}
					}else{
						var categoria = $('<a href="/logos/'+ val.categoriaFormateada +'">'+val.traduccion+'</a>');
						elemento.find('.tags').append(categoria);
					}

					elemento.find('> a.enviar_editor').click(enviarEditor);

					contenedor.append(elemento);

				});
			},
			error : function(res){
				console.log(res.responseJSON)
			}
		});
	});

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	var idiomaActivo = getCookie("logoLang");


	$(".selector-de-idiomas > select").change(function () {
		var codigo = $(this).val();

		var categoria = urls_categorias[codigo].labelFormateado;

		var url = "/logos/" + categoria;

		if (!subcategoria) {
			switch (codigo) {
				case "ES":
					url = "/logos-de-" + categoria;
					break;
				case "EN":
					url = "/logos-of-" + categoria;
					break;
				case "PT":
					url = "/logotipos-de-" + categoria;
					break;
			}
		}

		if (idiomaActivo != codigo) {
			document.cookie = "logoLang=" + codigo + "; Path=/";
			$("html").animate({
				scrollTop: 0
			}, 1000);
			window.location.replace(url);
		} else {
			return;
		}

	});

});