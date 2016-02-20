'use strict';

require('angular');
require('angular-route');
require('angular-cookies');
require('firebase');
require('angularFire');
require('angular-bootstrap-npm');

function config($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/home'
  });

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'home',
    resolve: {
      rooms: HomeCtrl.loadRooms,
      currentUser: HomeCtrl.loadUser
    }
  });

  $routeProvider.when('/room/:roomId', {
    templateUrl: 'views/room.html',
    controller: 'RoomCtrl',
    controllerAs: 'room',
    resolve: {
      room: RoomCtrl.loadRoom,
      currentUser: RoomCtrl.loadUser
    }
  });
}

// Declare app level module which depends on views, and components
angular.module('ppo', ['ngRoute', 'firebase', 'ngCookies', 'ui.bootstrap']).
config(config);
