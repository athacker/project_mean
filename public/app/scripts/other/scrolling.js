$(function(){

  $(".fill-screen").css("height", window.innerHeight);


  $(window).on("load resize",function(){
    $(".fill-screen").css("height", window.innerHeight);
  });

});
