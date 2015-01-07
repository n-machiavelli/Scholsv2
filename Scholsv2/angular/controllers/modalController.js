/**
 * Created by sys_buajoku on 11/20/2014.
 */

angular.module('app')
    .controller('modalController',modalController);

    modalController.$inject=['clientService','$modalInstance','message'];

    function modalController ($scope, $modalInstance, message) {
        var vm=this;
        vm.message = message;
        vm.ok = function () {
            $modalInstance.close(vm.clientApp);
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
