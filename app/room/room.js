'use strict';

angular.module('myApp')

.controller('RoomCtrl', ['$scope', '$firebaseObject','$routeParams', 'userProvider',
    function($scope, $firebaseObject, $routeParams, userProvider) {
        $scope.firebaseObj = new Firebase("http://fiery-heat-6689.firebaseio.com");

        $scope.roomId = $routeParams.roomId;
        var syncObject = $firebaseObject($scope.firebaseObj);

        $scope.user = userProvider.getRegistredUser();

        syncObject.$bindTo($scope, "data").then(function(){
            $scope.room = $scope.data.rooms[$scope.roomId];
            console.log($scope.data);
        });

        $scope.cards = [
            "0", "1/2", "1", "2", "3", "5", "8", "13", "20"
        ];

        $scope.selectCard = function(card) {
            $scope.vote = card;
        };
        $scope.fetchUsers = function() {
            if(!$scope.room){
                return [];
            } else {
                return $scope.data.rooms[$scope.roomId].users;
            }
        };
    }
]);