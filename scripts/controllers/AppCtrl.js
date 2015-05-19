'use strict'


angular.module('ppo')

.controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$rootScope'];

function AppCtrl($rootScope) {
    var vm = this;
    $rootScope.$on('$routeChangeStart', function (){
    	vm.isLoading = true;
    })
    $rootScope.$on('$routeChangeSuccess', function (){
    	vm.isLoading = false;
    })
}