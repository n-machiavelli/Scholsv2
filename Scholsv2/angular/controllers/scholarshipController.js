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
        vm.savedSuccessfully = false;
        vm.message = "";
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
                console.log(data.body);
                console.log(data.title);
                if (uploadtype == "Essay") {
                    vm.essayfilename = data.body;
                    vm.filenamelabel1 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                } else if (uploadtype == "Reference") {
                    vm.reffilename = data.body;
                    vm.filenamelabel2 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                }
            }).error(function (err) {
                console.log('Error occured during upload');
            });
        }
        vm.apply = function () {
            console.log("apply data");
            console.log(vm);
            var promise = scholarshipService.apply(vm);
            promise.then(function (data) {
                console.log(data);
                vm.message = data.body;
                vm.firstname =     "";
                vm.middlename  =    "";
                vm.lastname =      "";
                vm.usermajor =     "";
                vm.phonenumber =    "";
                vm.email =         "";
                vm.universityid = "";
                vm.address = "";
                vm.scholarshipyear = "";
                vm.expectedGraduation = "";
                vm.presentGPA = "";
                vm.highschoolGPA = "";
                vm.communityService = "";
                vm.extraCurricular = "";
                vm.awardsHonors = "";
                vm.filenamelabel1 = "&nbsp;&nbsp;&nbsp;Essay";
                vm.filenamelabel2 = "&nbsp;&nbsp;&nbsp;Reference";
                vm.loadprofile = false;
                vm.savedSuccessfully = true;
            }, function (reason) {
                console.log(reason);
            });
        }
        vm.getProfile = function () {
            if (!vm.loadprofile) {
                var promise = authService.getProfile(); //vm.login_username, vm.login_password);
                promise.then(function (result) {
                    if (!(jQuery.isEmptyObject(result))) {
                        vm.profile = result;
                        vm.firstname = vm.profile.FirstName;
                        vm.middlename = vm.profile.MiddleName;
                        vm.lastname = vm.profile.LastName;
                        vm.usermajor = vm.profile.UserMajor;
                        vm.phonenumber = vm.profile.PhoneNumber;
                        vm.email = vm.profile.Email;
                        vm.universityid = vm.profile.UniversityId
                        console.log(vm.profile);
                        vm.message = "Profile details loaded";
                    } else {
                        vm.message = "Empty auth";//AuthFactory.message;
                    }
                }, function (reason) {
                    vm.message = "Failed : " + reason + ":";//+  authService.message;
                    console.log(reason);
                }, function (update) {
                    vm.message = "updated";
                })
            } else {
                console.log("was checked. unchecking");
                vm.firstname =     "";
                vm.middlename  =    "";
                vm.lastname =      "";
                vm.usermajor =     "";
                vm.phonenumber =    "";
                vm.email =         "";
                vm.universityid =  "";
            }
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
    }
})();