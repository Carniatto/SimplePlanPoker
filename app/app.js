'use strict';

require('angular');
require('angular-route');
require('angular-cookies');
require('firebase');
require('angularFire');


function config($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });

        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        });

        $routeProvider.when('/room/:roomId', {
            templateUrl: 'views/room.html',
            controller: 'RoomCtrl',
            controllerAs: 'room'
        });
    }

// Declare app level module which depends on views, and components
angular.module('ppo', ['ngRoute', 'firebase', 'ngCookies']).
config(config);