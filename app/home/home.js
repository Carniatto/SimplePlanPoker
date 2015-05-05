'use strict';

angular.module('myApp')

.value('fbURL', 'http://fiery-heat-6689.firebaseio.com/pokerPlanOnline/')

.service('fbRef', function(fbURL) {
    return new Firebase(fbURL)
})

.controller('HomeCtrl', ['$scope', '$firebaseObject', '$location', 'room', 'user', '$cookies',
    function($scope, $firebaseObject, $location, room, user, $cookies) {

        $scope.user = user.current;

        $scope.rooms = room.getRooms();

        $scope.go = function(path) {
            $location.path(path);
        };

        $scope.createRoom = function(name) {
            $scope.rooms = room.createRoom(name);
        };

        $scope.joinRoom = function(roomId) {
            room.enterRoom($scope.user, roomId);
            $scope.go('room/' + roomId);
        };

        $scope.setUserName = function(name) {
            $scope.nameEdit = false;
            $scope.user.$save();
        };

    }
])

.service('user', function(fbRef, $firebaseObject, $cookies) {
    var self = this;
    self.ref = fbRef.child("users");

    self.createUser = function(name) {
        var reff = self.ref.push({
            'name': name
        });
        console.log($firebaseObject(reff));
        return $firebaseObject(reff);
    };
    self.getUser = function(userId) {
        console.log(userId);
        return $firebaseObject(self.ref.child(userId));
        
    };

    //init
    var uid = $cookies.userId;
    if (!uid) {
        var user = self.createUser(' ');
        $cookies.userId = user.$id;
        user.name = 'anonymous' + user.$id;
        user.$save();
        self.current = user;
    } else {
        self.current = self.getUser(uid);
    }
    //init end
    
});