(function () {
    'use strict';

    angular
        .module('app')
        .controller('scholarshipController', scholarshipController);

    scholarshipController.$inject = ['scholarshipService', '$location', 'authService', '$routeParams','$upload'];

    /* @ngInject */
    function scholarshipController(scholarshipService, $location, authService, $routeParams, $upload) {
        /* jshint validthis: true */
        var vm = this;
        vm.activate = activate;
        vm.fund_acct = $routeParams.fund_acct;
        vm.schlrshp_num = $routeParams.schlrshp_num;
        //vm.title = 'searchController';

        //vm.getScholarshipDetails = getScholarshipDetails;
        //vm.registerClient = registerClientApp;
        vm.scholarship = [];

        activate();

        ////////////////
        function activate() {
            vm.isAuthorized = authService.authentication.isAuth;  //need this also in this ctrlr for use in displaying apply form
            var promise = scholarshipService.getScholarshipDetails(vm.fund_acct, vm.schlrshp_num);
            promise.then(function (data) {
                console.log(data);
                vm.scholarship = data;
            }, function (reason) {
                console.log(reason)
            }, function (update) {
                console.log("got notification" + update);
            });
        }
        vm.onFileSelect1 = function ($files, uploadtype) {
            //$files: an array of files selected, each file has name, size, and type.
            console.log("here");
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                vm.upload = $upload.upload({
                    url: '../api/fileupload',
                    //data: { name: user.Name }, *** send other data using this! apply button may call this
                    file: file, // or list of files ($files) for html5 only
                }).progress(function (evt) {
                    //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    console.log('Uploaded successfully ' + file.name);
                    console.log(data);
                    vm.filenamelabel1 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                    if (uploadtype == "Essay") {
                        vm.essayfilename = data;
                    } else if (uploadtype == "Reference") {
                        vm.reffilename = data;
                    }
                }).error(function (err) {
                    console.log('Error occured during upload');
                });
            }
        }
        vm.onFileSelect = function ($files, uploadtype) {
            //$files: an array of files selected, each file has name, size, and type.
            var file = $files[0];
            vm.upload = $upload.upload({
                url: '../api/fileupload',
                //data: { name: user.Name }, *** send other data using this! apply button may call this
                file: file, // or list of files ($files) for html5 only
            }).progress(function (evt) {
                //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                console.log('Uploaded successfully ' + file.name);
                console.log(data);

                if (uploadtype == "Essay") {
                    vm.essayfilename = data;
                    vm.filenamelabel1 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                } else if (uploadtype == "Reference") {
                    vm.reffilename = data;
                    vm.filenamelabel2 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                }
            }).error(function (err) {
                console.log('Error occured during upload');
            });
        }
        vm.apply = function () {
            var promise = scholarshipService.apply(vm);
            promise.then(function (data) {
                console.log(data);
            }, function (reason) {
                console.log(reason);
            });
        }
    }
})();