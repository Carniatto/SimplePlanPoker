'use strict';

angular.module('ppo')

.service('RouteService', RouteService);

RouteService.$inject = ['$location'];

function RouteService($location) {
    this.go = function(path) {
        $location.path(path);
    };
}