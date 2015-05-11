'use strict';

angular.module('ppo')

.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$cookies', 'UserService', 'RoomService', 'RouteService'];

function HomeCtrl($cookies, UserService, RoomService, RouteService) {
    var vm = this;

    vm.user = UserService.current;

    vm.rooms = RoomService.getRooms();

    vm.createRoom = createRoom;

    vm.joinRoom = joinRoom;

    vm.setUserName = setUserName;

    function createRoom(name) {
        console.log('teste');
        RoomService.createRoom(name).$loaded().then(function(room) {
            vm.rooms = room;
            vm.joinRoom(room.$id);
        });
    }

    function joinRoom(roomId) {
        RouteService.go('room/' + roomId);
    }

    function setUserName(name) {
        vm.nameEdit = false;
        vm.user.$save();
    }
}