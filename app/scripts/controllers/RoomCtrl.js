'use strict';

angular.module('ppo')

.controller('RoomCtrl', RoomCtrl);

RoomCtrl.$inject = ['$cookies', '$routeParams', 'RoomService', 'UserService', 'RouteService'];

function RoomCtrl($cookies, $routeParams, RoomService, UserService, RouteService) {
    var vm = this;

    RoomService.getRoom($routeParams.roomId).$loaded().then(function(room) {
        vm.room = room;
        if (!room.users) {
            room.users = {};
        }
        room.users[UserService.current.$id] = UserService.current;
        if (!room.owner) {
            room.owner = UserService.current.$id;
        }
        vm.user = room.users[UserService.current.$id];
        room.$save();

    });

    vm.cards = ["?","0", "1/2", "1", "2", "3", "5", "8", "13", "20"];

    vm.selectCard = selectCard;

    vm.revealVotes = revealVotes;

    vm.restartRound = restartRound;

    vm.exitRoom = exitRoom;


    function selectCard(card) {
        if(vm.room.users[UserService.current.$id].vote === card){
            vm.room.users[UserService.current.$id].vote = '';
        } else {
            vm.room.users[UserService.current.$id].vote = card;
        }
        vm.user = RoomService.users[UserService.current.$id];
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
        delete vm.room.users[UserService.current.$id];
        if (vm.room.owner === UserService.current.$id) {
            if(!Object.keys(vm.room.users).length){
                vm.room.owner = '';
            } else {
                vm.room.owner = Object.keys(vm.room.users)[0];
            }
        }
        vm.room.$save();
        RouteService.go('home');
    }
}