$.noConflict();
jQuery( document ).ready(function( $ ) {
  $('.mostrar-login').click(function(){
      $(this).addClass('hidden');
      $('.modal-login').show();
      $(this).next().removeClass('hidden');
  });
  
});