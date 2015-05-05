'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'firebase', 'ngCookies']).
config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.otherwise({
            redirectTo: '/home'
        });

        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });

        $routeProvider.when('/room/:roomId', {
            templateUrl: 'room/room.html',
            controller: 'RoomCtrl'
        });
    }
]);