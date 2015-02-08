/**
 * Created by sys_buajoku on 11/20/2014.
 */

angular.module('app')
    .controller('adminModalController', adminModalController);

    adminModalController.$inject = ['$modalInstance', 'message', 'status', 'remark','id'];

    function adminModalController($modalInstance, message,status, remark, id) {
        var vm = this;
        vm.message = message;
        vm.status = status;
        vm.remark = remark;
        vm.id = id;
        vm.ok = function () {
            vm.modalReturnObject = {};
            vm.modalReturnObject.status = vm.status;
            vm.modalReturnObject.remark = vm.remark;
            vm.modalReturnObject.id = vm.id;
            $modalInstance.close(vm.modalReturnObject);
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
