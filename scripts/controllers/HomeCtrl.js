'use strict';

angular.module('ppo')

.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$cookies', 'UserService', 'RoomService',
                    'RouteService', 'currentUser', 'rooms', '$uibModal'];

HomeCtrl.loadRooms = function(RoomService) {
  return RoomService.getRooms();
};

HomeCtrl.loadUser = function(UserService) {
  return UserService.getCurrentUser();
};

function HomeCtrl($cookies, UserService, RoomService,
                  RouteService, currentUser, rooms, $uibModal) {
  var vm = this;

  vm.user = currentUser;

  vm.rooms = rooms;

  vm.createRoom = createRoom;

  vm.joinRoom = joinRoom;

  vm.setUserName = setUserName;

  vm.removeRoom = removeRoom;

  if (vm.user.name === 'new') {
    var modalInstance = $uibModal.open({
      template: ['<div class="modal-header">',
                     '<h3 class="modal-title">Enter your desired Username</h3>',
                 '</div>',
                 '<div class="modal-body">',
                     '<p class="form-group">',
                         '<label>User Name:</label>',
                         '<input type="text" ng-model="modal.name"',
                         ' class="form-control">',
                     '</p>',
                 '</div>',
                 '<div class="modal-footer">',
                     '<button class="btn btn-primary" type="button"',
                     '  ng-click="modal.submit()">OK</button>',
                     '<button class="btn btn-warning" type="button"',
                     '  ng-click="modal.cancel()">Cancel</button>',
                 '</div>'].join(''),
      controller: 'ModalCtrl',
      controllerAs: 'modal',
      size: 'sm'
    });

    modalInstance.result.then(function(name) {
      vm.user.name = name;
      vm.setUserName();
    }, function() {
      vm.user.name = 'Guest Annonymous';
      vm.setUserName();
      $log.info('Modal dismissed at: ' + new Date());
    });
  }

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

  function setUserName() {
    vm.nameEdit = false;
    vm.user.$save();
  }

  function removeRoom(roomId) {
    vm.rooms[roomId] = null;
    vm.rooms.$save();
  }
}
