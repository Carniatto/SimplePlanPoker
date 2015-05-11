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

    function createUser(name) {
        var reff = service.ref.push({
            'name': name
        });
        return $firebaseObject(reff);
    }

    function getUser(userId) {
        return $firebaseObject(service.ref.child(userId));
    }

    function init() {
        var uid = $cookies.userId;
        if (!uid) {
            var user = service.createUser(' ');
            $cookies.userId = user.$id;
            user.name = 'anonymous' + user.$id;
            user.$save();
            service.current = user;
        } else {
            service.current = service.getUser(uid);
        }
    }

    init();
}