$(function(){

  $(".fill-screen").css("height", window.innerHeight);


  $(window).on("load resize",function(){
    $(".fill-screen").css("height", window.innerHeight);
  });


  //bootstrap scrollspay
   $('body').scrollspy({
     target: '.navbar',
     offset:160
});

  //jquery easing smooth scrolling -- need to install
  //can't get this to work as it conflicts with angular html5 mode issues.. need to fix.
  $('nav a').bind('click',function(){
    console.log('Go to this section:'  );
    $('body, html').stop().animate({
      scrollTop: $($(this).attr('href')).offset.top - 100
    },1500, 'easeInOutExpo');

    event.preventDefault();

    });

  //parallax scrolling with stellar.js
  //classes stellar-bg on scrolling bg image data-stellar-background-ratio=".0.2"
  //works with ahrefs doesn't work with angular $schrolling...
  $(window).stellar();




//initalize WOW for scrolling
  var ww = new WOW();
  ww.init();




});
