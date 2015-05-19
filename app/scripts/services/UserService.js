'use strict';

angular

.module('ppo')
    .service('UserService', UserService);

UserService.$inject = ['$firebaseObject', '$cookies', 'fbRef'];

function UserService($firebaseObject, $cookies, fbRef) {
    var service = this;

    service.ref = fbRef.child("users");

    service.createUser = createUser;

    service.getUser = getUser;

    service.getCurrentUser = getCurrentUser;

    function createUser(name) {
        var reff = service.ref.push({
            'name': name
        });
        return $firebaseObject(reff);
    }

    function getUser(userId) {
        var user = $firebaseObject(service.ref.child(userId)).$loaded();
        console.log(user);
        return user;
    }

    function getCurrentUser() {
        var uid = $cookies.userId;
        if (!uid) {
            var user = service.createUser(' ').$loaded();
            user.then(function(data) {
                $cookies.userId = data.$id;
                data.name = 'anonymous' + data.$id;
                data.$save();
                service.current = data;
            });
            return user;
        } else {
            return service.getUser(uid);
        }
    }
}