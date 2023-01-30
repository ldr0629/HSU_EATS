$(function(){
    $('#back-to-top').on('click',function(e){
        e.preventDefault();
        $('html,body').animate({scrollTop:0},600);
    });
    
    $(window).scroll(function() {
      if ($(document).scrollTop() > 100) {
        $('#back-to-top').addClass('show');
      } else {
        $('#back-to-top').removeClass('show');
      }
    });
});