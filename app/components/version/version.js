'use strict';

angular.module('ppo.version', [
  'ppo.version.interpolate-filter',
  'ppo.version.version-directive'
])

.value('version', '0.1');
