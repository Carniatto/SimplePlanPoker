'use strict';

angular.module('ppo')

.controller('ModalCtrl', ModalCtrl);

ModalCtrl.$inject = ['$uibModalInstance'];

function ModalCtrl($uibModalInstance) {
  var vm = this;
  vm.submit = submit;

  function submit() {
    $uibModalInstance.close(vm.name);
  }
}
