/**
 * Created by sys_buajoku on 11/20/2014.
 */

angular.module('app')
    .controller('loginmodalController', loginmodalController);

loginmodalController.$inject = ['$modalInstance'];

function loginmodalController($modalInstance) {
    var vm = this;
        vm.ok = function () {
            vm.modalReturnObject = {};
            vm.modalReturnObject.userName = vm.login_username;
            vm.modalReturnObject.password = vm.login_password;
            $modalInstance.close(vm.modalReturnObject);
        };
        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
