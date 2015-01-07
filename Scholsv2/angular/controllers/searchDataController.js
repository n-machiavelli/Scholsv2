(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchDataController', searchDataController);

    searchDataController.$inject = ['searchService','$location'];

    /* @ngInject */
    function searchDataController(searchService,$location) {
        /* jshint validthis: true */
        var vm = this;
        vm.activate = activate;
        //vm.title = 'searchController';

        vm.getScholarships = getScholarships;
        //vm.registerClient = registerClientApp;
        vm.scholarships = [];

        //activate();
        getScholarships();

        ////////////////
        function activate() {
            var promise=searchService.getDropDowns();
            promise.then(function(data){
                console.log(data);
                vm.colleges=data.colleges;    
                vm.departments=data.departments;
                vm.schoolyears=data.schoolyears;
            }, function(reason){
                console.log(reason)
            }, function(update){
                console.log("got notification" + update);
            });
            
        }

        function getScholarships() {
            var params=$location.search();
            searchService.getScholarships(params).then(function (results) {
                console.log("scholarships retrieved via controller")                
                vm.scholarships = results;
                console.log(vm.scholarships);
                //$scope.$apply();
                 // results.data;
                // $location.hash("scholarship");
                // $anchorScroll();
            }, function (err) {
                console.log("error here");
            });
        }

        // function registerClientApp() {
        //     vm.message = "";
        //     console.log("came here");
        //     clientService.registerClientApp(vm.clientApp).then(function (results) {
        //         console.log("registered");
        //         vm.getClientApps();
        //         //vm.$apply();
        //     }, function (error) {
        //         //alert(error.data.message);
        //         console.log("error here");
        //     });
        // }
    }
})();