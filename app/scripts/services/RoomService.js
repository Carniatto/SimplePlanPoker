'use strict';

angular.module('ppo')

.service('RoomService', RoomService);

RoomService.$inject = ['$firebaseObject', 'fbRef'];

function RoomService( $firebaseObject, fbRef) {
        var service = this;

        service.ref = fbRef.child("rooms");

        service.getRooms = getRooms;

        service.createRoom = createRoom;

        service.getRoom = getRoom;

        function getRooms() {
            return $firebaseObject(service.ref);
        }

        function createRoom(name) {
            var reff = service.ref.push({
                'name': name,
                'type': '',
                'users': []
            });
            return $firebaseObject(reff);
        }

        function getRoom(roomId) {
            return $firebaseObject(service.ref.child(roomId));
        }
}