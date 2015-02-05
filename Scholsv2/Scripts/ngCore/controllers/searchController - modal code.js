(function () {
    'use strict';

    angular
        .module('app')
        .controller('clientsController', clientsController);

    clientsController.$inject = ['clientService','$modal'];

    /* @ngInject */
    function clientsController(clientService ,$modal) {
        /* jshint validthis: true */
        var vm = this;
        //console.log($window.location);
        vm.modal = {
            "title": "Title",
            "content": "Hello modal"
        };
        vm.open=function() {
            vm.message = "ksdflksdf";
            var myModal = $modal.open({
                title: 'Title',
                templateUrl: 'app/views/uimodal.html',
                controller: "modalController",
                controllerAs: "vm",
                resolve: {
                    message: function () {
                        return "";
                    }
                }
            });
            myModal.result.then(function (clientApp) {
                clientService.registerClientApp(clientApp).then(function (response) {
                    console.log("registered " );
                    console.log(response);
                    vm.getClientApps();
                }, function (error) {
                    console.log("error here");
                });
            }, function () {
                console.log("Modal dismissed instead.");
            });
        };
//        vm.showModal = function() {
//           myModal.$promise.then(myModal.show);
//        };
//        vm.hideModal = function() {
//           myModal.$promise.then(myModal.hide);
//        };

        vm.activate = activate;
        vm.title = 'clientsController';

        vm.getClientApps = getClientApps;
        vm.registerClient = registerClientApp;
        vm.clientApps = [];

        activate();

        ////////////////
        function activate() {
            vm.getClientApps();
        }

        function getClientApps() {
            clientService.getClientApps().then(function (results) {
                console.log(results);
                vm.clientApps = results ; // results.data;
            }, function (err) {
                console.log("error here");
            });
        }

        function registerClientApp() {
            vm.message = "";
            console.log("came here");
            clientService.registerClientApp(vm.clientApp).then(function (results) {
                console.log("registered");
                vm.getClientApps();
                //vm.$apply();
            }, function (error) {
                //alert(error.data.message);
                console.log("error here");
            });
        }
    }
})();