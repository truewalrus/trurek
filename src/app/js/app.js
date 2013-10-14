'use strict';


// Declare app level module which depends on filters, and services

var app = angular.module('myApp', ['myApp.filters', 'myApp.directives', 'myApp.services', 'myApp.controllers', 'ngCookies']);
 app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // angular front end routes
    $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/blog', {templateUrl: 'partials/blog.html'});
    $routeProvider.when('/portfolio', {templateUrl: 'partials/portfolio.html'});
    $routeProvider.when('/contact-us', {templateUrl: 'partials/contact-us.html'});
    $routeProvider.when('/sign-in', {templateUrl: 'partials/sign-in.html'});

    //Locked out pages
    $routeProvider.when('/manage-blog', {templateUrl: 'partials/manage-blog.html',
        resolve: {
            auth: function(user, $location){
                user.checkSession(
                    function(data) {
                    },
                    function(data) {
                        $location.path('/home');
                    }
                );
            }
        }
    });
    $routeProvider.when('/manage-portfolio', {templateUrl: 'partials/manage-portfolio.html',
        resolve: {
            auth: function(user, $location){
                user.checkSession(
                    function(data) {
                    },
                    function(data) {
                        $location.path('/home');
                    }
                );
            }
        }
    });
    $routeProvider.when('/cms', {templateUrl: 'partials/cms.html',
        resolve: {
            auth: function(user, $location){
                user.checkSession(
                    function(data) {
                    },
                    function(data) {
                        $location.path('/home');
                    }
                );
            }
        }
    });


    $routeProvider.otherwise({redirectTo: '/home'});

	// fix to remove '#' from url strings in browser
	/*
		IE 10 is oldest IE that html5mode will work on
	*/
	$locationProvider.html5Mode(true);
  }]);

app.run(['$rootScope', '$location', 'user', function($rootScope, $location, user) {
  /*  $rootScope.$on( "$locationChangeStart", function(event, next, current) {
        console.log($rootScope.loggedIn);
        if ( !$rootScope.loggedIn) {
            console.log("am I in?");
            console.log(user);
            // no logged user, we should be going to #login
            if ( next.templateUrl == "partials/cms.html" ) {
                $location.path('/home');
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
              //  $location.path( "/login" );
            }
        }
    });*/
}]);

//These need to be defined here in order for the module names to be succesfully reused
//All non-3rd party modules should be defined as angular.module('myApp.[type]').[type]
angular.module('myApp.services', []);
angular.module('myApp.filters', []);
angular.module('myApp.directives',[]);
angular.module('myApp.controllers', []);
