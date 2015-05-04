'use strict';

angular.module('myApp')

.controller('HomeCtrl', ['$scope', '$firebaseObject','$location','userProvider',
    function($scope, $firebaseObject, $location, userProvider) {
        var ref = new Firebase("http://fiery-heat-6689.firebaseio.com/pokerPlanOnline");

        var roomRef = ref.child("rooms");
        $scope.rooms = $firebaseObject(roomRef);
        $scope.user = userProvider.getRegistredUser();

        $scope.SignIn = function(e) {
            e.preventDefault();
            var username = $scope.user.email;
            var password = $scope.user.password;
            $scope.firebaseObj.authWithPassword({
                email: username,
                password: password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $scope.islogged = true;
                }
            });
        };

        $scope.go = function(path){
            $location.path(path);
        };

        $scope.createRoom = function(name) {
            console.log($scope.rooms);
            $scope.rooms.push({
                'name': name,
                'type': '',
                'users' : []
            });
            $scope.rooms.$save();
        };

        $scope.joinRoom = function(roomId) {
            if(!$scope.data.rooms[roomId].users){
                $scope.data.rooms[roomId].users = [];
            }
            $scope.data.rooms[roomId].users.push({
                'userName' : $scope.user.userName
            });
            $scope.go('room/' + roomId);
        };

        $scope.setUserName = function(name){
            userProvider.registerUser(name);
            $scope.user = userProvider.getRegistredUser();
        };

    }
])

.service('userProvider', [function ($firebaseObject) {
    var up = this;
    up.user = {};

    up.registerUser = function(name){
        up.user = {
            'userName' : name,
            'vote' : ''
        };
    };
    up.getRegistredUser = function(){
        return up.user;
    };
}]);