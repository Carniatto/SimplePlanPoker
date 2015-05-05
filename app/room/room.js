'use strict';

angular.module('myApp')

.controller('RoomCtrl', ['$scope', '$location', '$firebaseObject', '$routeParams', 'room', '$cookies', 'user',
    function($scope, $location, $firebaseObject, $routeParams, room, $cookies, user) {

        room.getRoom($routeParams.roomId).$loaded().then(function(room) {
            $scope.room = room;
            if (!room.users) {
                room.users = {};
            }
            room.users[user.current.$id] = user.current;
            if (!room.owner) {
                room.owner = user.current.$id;
            }
            $scope.user = room.users[user.current.$id];
            room.$save();

        });

        $scope.cards = [
            "0", "1/2", "1", "2", "3", "5", "8", "13", "20"
        ];

        $scope.go = function(path) {
            $location.path(path);
        };

        $scope.selectCard = function(card) {
            $scope.room.users[user.current.$id].vote = card;
            $scope.room.$save();
        };

        $scope.revealVotes = function() {
            $scope.room.revealVote = true;
            $scope.room.$save();
        };

        $scope.restartRound = function() {
            $scope.room.revealVote = false;
            angular.forEach($scope.room.users, function(user) {
                user.vote = '';
            });
            $scope.room.$save();
        };

        $scope.exitRoom = function() {
            delete $scope.room.users[$scope.user.$id];
            console.log($scope.room.users);
            if (!$scope.room.users && $scope.room.owner === $scope.user.$id) {
                $scope.room.owner = Object.keys($scope.room.users)[0];
            }
            $scope.room.$save();
            $scope.go('home');
        };

    }
])
    .service('room', function(fbRef, $firebaseObject) {
        var self = this;
        self.ref = fbRef.child("rooms");
        self.createRoom = function(name) {
            var reff = self.ref.push({
                'name': name,
                'type': '',
                'users': []
            });
            return $firebaseObject(reff);
        };

        self.getRooms = function() {
            return $firebaseObject(self.ref);
        };

        self.getRoom = function(roomId) {
            return $firebaseObject(self.ref.child(roomId));
        };

        self.enterRoom = function(user, roomId) {
            $firebaseObject(self.ref.child(roomId))
                .$loaded().then(function(room) {
                    if (!room.users) {
                        room.users = {};
                    }
                    room.users[user.$id] = user;

                    room.$save();
                });

        };

    });