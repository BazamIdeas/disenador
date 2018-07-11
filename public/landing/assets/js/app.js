$.noConflict();
jQuery(document).ready(function ($) {
  $('.boton-formulario-generar.ver-mas').click(function () {

  });

  var repeticion;
  var repeticion2;
  var videoActivo;

  function timeout(indexParam) {

    // Variables predefinidas

    var top = $('.pasos i').css('top').replace('px', '');
    var time = $('.step_guide_image.active').attr('data-time');
    var index = $('.step_guide_image.active').attr('data-index');
    var cantidadVideos = parseInt($('.tres-pasos').attr('cantidad-videos'));

    $('.tres-pasos *').removeClass('active');

    // Si es clickeado un paso
    if (indexParam) {
      time = $('.step_guide_image[data-index=' + index + ']').attr('data-time');
      index = indexParam;
    }

    if (index == cantidadVideos) {
      $('.step_guide_image[data-index="1"]').addClass('active');
      $('.step_line > :nth-child(1)').addClass('active');
      $('.pasos > :nth-child(1)').addClass('active');
      $('.pasos i').css('top', '0px');
      videoActivo = document.getElementById("video1");
      videoActivo.play();
    } else {

      index++;
      top = parseInt(top) + 162;

      $('.step_guide_image[data-index="' + index + '"]').addClass('active');
      $('.step_line > :nth-child(' + index + ')').addClass('active');
      $('.pasos > :nth-child(' + index + ')').addClass('active');
      $('.pasos i').css('top', top + 'px');
      videoActivo = document.getElementById('video' + index);
      videoActivo.play();

    }

    // Bucle infinito de videos
    repeticion = setTimeout(function () {
      videoActivo.pause();
      timeout();
    }, time);

  };

  // Auto ejecicion del bucle
  videoActivo = document.getElementById("video1");
  videoActivo.play();
  setTimeout(function () {
    videoActivo.pause();
    timeout();
  }, $('.step_guide_image.active').attr('data-time'))

  // Si se clickea un paso
  $('.step_ctn > h4').click(function () {

    window.clearTimeout(repeticion);
    window.clearTimeout(repeticion2);
    videoActivo.pause();

    let index = parseInt($(this).attr('data-index'));
    var top = $('.pasos i').css('top').replace('px', '');
    var cantidadVideos = parseInt($('.tres-pasos').attr('cantidad-videos'));
    videoActivo = document.getElementById('video' + index);

    videoActivo.play();

    $('.tres-pasos *').removeClass('active');

    $('.step_guide_image[data-index="' + index + '"]').addClass('active');
    $('.step_line > :nth-child(' + index + ')').addClass('active');
    $('.pasos > :nth-child(' + index + ')').addClass('active');

    if (index == 1) {
      $('.pasos i').css('top', '0px');
    } else if (index == 2) {
      top = 162;
      $('.pasos i').css('top', top + 'px');
    } else {
      top = 162 * 2;
      $('.pasos i').css('top', top + 'px');
    }

    repeticion2 = setTimeout(function () {

      videoActivo.pause();
      timeout();

    }, $('.step_guide_image[data-index="' + $(this).attr('data-index') + '"]').attr('data-time'));

  });

  $('.enviar_editor').click(function(){

    let data = {
      predisenado: true,
      fuentes: {
        principal: null,
        eslogan: null
      },
      logo: {
        icono: {
          idElemento: null,
          svg: ''
        },
        idLogo: 0,
        texto: 'Mi empresa'
      }
    };

    var logo = $(this);

    let atributos = JSON.parse(logo.attr('data-attrs'));

    atributos.forEach(element => {
        if(element.clave == 'principal'){
          data.fuentes.principal = element.valor
        }
    });

    data.logo.icono.svg = logo.attr('data-svg');

    data.logo.idLogo = logo.attr('data-id');

    data = JSON.stringify(data);

    window.localStorage.setItem('editor', data);

    window.location = '../creador-de-logos/editor/';

  });

  $('.buscarEditor').click(function(){

    let data = {
      etiquetasParaBusqueda: ['Null'],
      etiquetaSeleccionadas: [{traduccion: {valor: "Prueba"}}],
      nombre: 'Mi logo',
      paginaCategoria: true
    };

     window.localStorage.setItem('comenzar', JSON.stringify(data));

     window.location = '../creador-de-logos/';
  });

});