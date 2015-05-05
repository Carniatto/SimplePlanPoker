'use strict';

angular.module('myApp')

.controller('RoomCtrl', ['$scope', '$firebaseObject','$routeParams', 'room', '$cookies', 'user',
    function($scope, $firebaseObject, $routeParams, room, $cookies, user) {

        $scope.user = user.current;

        $scope.room = room.getRoom($routeParams.roomId);

        $scope.cards = [
            "0", "1/2", "1", "2", "3", "5", "8", "13", "20"
        ];
        $scope.fetchUserName = function(userId){
            // console.log(userId);
            return user.getUser(userId);
        }

        $scope.selectCard = function(card) {
            $scope.room.users[$scope.user.$id].vote = card;
            $scope.room.$save();
        };

        $scope.revealVotes = function(){
            $scope.revealVote = true;
        };

        $scope.restartRound = function(){
            $scope.revealVote = false;
            angular.forEach($scope.room.users, function(user){
                user.vote = '';
            });
            $scope.room.$save();
        };

    }
])
.service('room', function(fbRef, $firebaseObject){
    var self = this;
    self.ref = fbRef.child("rooms");
    self.createRoom = function(name) {
        self.ref.push({
                'name': name,
                'type': '',
                'users' : [ ]
        });
        return self.getRooms();
    }
    self.getRooms = function(){
        return $firebaseObject(self.ref);
    };

    self.getRoom = function(roomId){
        return $firebaseObject(self.ref.child(roomId));
    };

    self.enterRoom = function(user,roomId){
        $firebaseObject(self.ref.child(roomId))
        .$loaded().then(function(room){
            if(!room.users){
                room.users = {};
            }
            room.users[user.$id] = user;
            room.$save();
        });
        
    };

});