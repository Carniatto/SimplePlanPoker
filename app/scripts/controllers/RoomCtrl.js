'use strict';

angular.module('ppo')

.controller('RoomCtrl', RoomCtrl);

RoomCtrl.$inject = ['$cookies', '$routeParams', 'RoomService', 'UserService', 'RouteService', 'room','currentUser'];

RoomCtrl.loadRoom = function($route, RoomService) {
    return RoomService.getRoom($route.current.params.roomId);
};

RoomCtrl.loadUser = function(UserService){
    return UserService.getCurrentUser();
};

function RoomCtrl($cookies, $routeParams, RoomService, UserService, RouteService, room, currentUser) {
    var vm = this;

    vm.room = room;
    if (!room.users) {
        room.users = {};
    }
    room.users[currentUser.$id] = currentUser;
    if (!room.owner) {
        room.owner = currentUser.$id;
    }
    vm.user = room.users[currentUser.$id];
    room.$save();

    vm.cards = ["?", "0", "1/2", "1", "2", "3", "5", "8", "13", "20"];

    vm.selectCard = selectCard;

    vm.revealVotes = revealVotes;

    vm.restartRound = restartRound;

    vm.exitRoom = exitRoom;

    vm.kickUser = kickUser;

    function selectCard(card) {
        if (vm.room.users[currentUser.$id].vote === card) {
            vm.room.users[currentUser.$id].vote = '';
        } else {
            vm.room.users[currentUser.$id].vote = card;
        }
        vm.room.$save();
    }

    function revealVotes() {
        vm.room.revealVote = true;
        vm.room.$save();
    }

    function restartRound() {
        vm.room.revealVote = false;
        angular.forEach(vm.room.users, function(user) {
            user.vote = '';
        });
        vm.room.$save();
    }

    function exitRoom() {
        delete vm.room.users[currentUser.$id];
        if (vm.room.owner === currentUser.$id) {
            if (!Object.keys(vm.room.users).length) {
                vm.room.owner = '';
            } else {
                vm.room.owner = Object.keys(vm.room.users)[0];
            }
        }
        vm.room.$save();
        RouteService.go('home');
    }

    function kickUser(userId) {
        delete vm.room.users[userId];
        vm.room.$save();
    }
}