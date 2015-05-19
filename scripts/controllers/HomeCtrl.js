'use strict';

angular.module('ppo')

.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$cookies', 'UserService', 'RoomService', 'RouteService', 'currentUser', 'rooms'];

HomeCtrl.loadRooms = function(RoomService){
    return RoomService.getRooms();
}
HomeCtrl.loadUser = function(UserService){
    return UserService.getCurrentUser();
}

function HomeCtrl($cookies, UserService, RoomService, RouteService, currentUser, rooms) {
    var vm = this;

    vm.user = currentUser;

    vm.rooms = rooms;

    vm.createRoom = createRoom;

    vm.joinRoom = joinRoom;

    vm.setUserName = setUserName;

    vm.removeRoom = removeRoom;

    function createRoom(name) {
        RoomService
            .createRoom(name)
            .then(function(room) {
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

    function removeRoom(roomId) {
        vm.rooms[roomId] = null;
        vm.rooms.$save();
    }
}