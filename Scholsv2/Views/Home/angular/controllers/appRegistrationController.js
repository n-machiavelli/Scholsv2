(function () {
    'use strict';

    angular
        .module('app')
        .controller('appRegistrationController', appRegistrationController);

    appRegistrationController.$inject = ['$location', '$timeout'];

    /* @ngInject */
    function appRegistrationController($location, $timeout) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'appRegistrationController';

        vm.savedSuccessfully = false;
        vm.message = "";

        vm.clientApplication = {
            appName: "",
            appSecret: ""
        };

        vm.register = register;
        vm.startTimer = startTimer;

        activate();

        ////////////////

        function activate() {
        }

        function register() {
            console.log(vm.clientApplication, "before call save")
            //authService.saveRegistration(vm.clientApplication).then(function (response) {
            //
            //        vm.savedSuccessfully = true;
            //        vm.message = "User has been registered successfully.";
            //        startTimer();
            //
            //    },
            //    function (response) {
            //        var errors = [];
            //        for (var key in response.data.modelState) {
            //            for (var i = 0; i < response.data.modelState[key].length; i++) {
            //                errors.push(response.data.modelState[key][i]);
            //            }
            //        }
            //        vm.message = "Failed to register user due to:" + errors.join(' ');
            //    });
        }

        function startTimer() {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        }
    }
})();