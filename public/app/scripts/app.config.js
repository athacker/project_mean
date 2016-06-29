'use strict';

angular.module('secureApp').config(function($urlRouterProvider,$stateProvider, $httpProvider, $authProvider, $locationProvider,  API_URL){
  $urlRouterProvider.otherwise('/');
   $stateProvider.state('main',{
     url:'/',
     templateUrl:'views/main.html'
   }).state('login',{
     url:'/',
     templateUrl:'views/login.html'
   }).state('register',{
     url:'/register',
     templateUrl:'views/register.html'
   }).state('profile',{
     url:'/profile',
     templateUrl:'views/profile.html'
   }).state('responsive',{
     url:'/responsive',
     templateUrl:'views/responsive/responsive.html',
     controller:'JobsCtrl'
   }).state('images',{
     url:'/images',
     templateUrl:'views/responsive/images.html',
     controller:'JobsCtrl'
   }).state('carousel',{
     url:'/carousel',
     templateUrl:'views/responsive/carousel.html'})
   .state('system_parent',{
       //abstract:true,
       controller:'SystemCtrl',
       templateUrl:'views/system_parent.html',
       data: {
         var1: 'Job Variable1',
         var2: 'Job Variable2'
       },
       resolve: {
         jobs:function(){
           return[{'id':1,'title':'baker'}]
         }
       },
       onEnter:function($log){
         console.log('Entering the system parent state.')
       },
       onExit:function($log){
         console.log('Exiting the system parent  state.')
       }
   }).state('system_parent.architecture',{
       url:'/architecture',
       templateUrl:'views/architecture.html'
   }).state('system_parent.guidelines',{
       url:'/guideline',
       templateUrl:'views/guidelines.html'
   }).state('quality_parent',{
       url:'/quality',
       templateUrl:'views/quality_parent.html',
     }).state('quality_parent.frontend',{
       url:'/front',
       templateUrl:'views/protractor.html',
     }).state('quality_parent.backend',{
       url:'/back',
       templateUrl:'views/mockito.html',
     }).state('logout',{
       url:'/logout',
       controller:'LogoutCtrl'
   });
   $authProvider.baseUrl = API_URL;
   $authProvider.loginUrl = '/auth/login';
   $authProvider.signupUrl ='/auth/signup';
   $authProvider.loginRedirect = '/main';

  //google authorized parameters MUST end with a dash /!! http://localhost:8080/
  $authProvider.google({
    clientId:'189990944098-glmd1v70437toome0llqp3jkesl7r8jh.apps.googleusercontent.com',
    url:API_URL + '/auth/google',
    redirectUri: API_URL
  });

  $authProvider.facebook({
    clientId:'1699973796934514',
    url:API_URL + '/auth/facebook',
  });

  //add auth interceptor to requests
  $httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL','http://localhost:8080')
.run(function($window, $rootScope){
  var params = $window.location.search.substring(1);
  //break up google return authorization from login pop-up
  if (params && $window.opener && $window.opener.location.origin === $window.location.origin){
      console.log('Process OAUTH callback from social login.');
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);
      $window.opener.postMessage(code, $window.location.origin);
  }

    $rootScope.$on('routeChangeError',function(event, current, previous,rejection ){
      console.log('Failed to change routes: ' + rejection );
    });


  });
