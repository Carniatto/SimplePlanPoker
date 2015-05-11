'use strict';

angular.module('ppo')

.value('fbURL', 'http://fiery-heat-6689.firebaseio.com/pokerPlanOnline/')

.service('fbRef', function(fbURL) {
    return new Firebase(fbURL);
});