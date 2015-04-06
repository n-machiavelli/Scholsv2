(function () {
    'use strict';

    angular
        .module('app')
        .controller('scholarshipController', scholarshipController);

    scholarshipController.$inject = ['scholarshipService', '$location', 'authService', '$routeParams','$upload','$log'];

    /* @ngInject */
    function scholarshipController(scholarshipService, $location, authService, $routeParams, $upload,$log) {
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
                $log.log(data);
                $log.log(vm.isAuthorized);
                $log.log(authService.authentication.isAuth);
                vm.scholarship = data;
            }, function (reason) {
                $log.error(reason)
            }, function (update) {
                $log.log("got notification" + update);
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
                $log.log('Uploaded successfully ' + file.name);
                $log.log(data);
                $log.log(data.body);
                $log.log(data.title);
                if (uploadtype == "Essay") {
                    vm.essayfilename = data.body;
                    vm.filenamelabel1 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                } else if (uploadtype == "Reference") {
                    vm.reffilename = data.body;
                    vm.filenamelabel2 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                }
            }).error(function (err) {
                $log.error('Error occured during upload');
            });
        }
        function validate() {
            var isValid = true;
            var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            var nameRegex = /^[A-Za-z]+$/;
            var numberRegex = /^[0-9.]+$/;
            var majorRegex = /^[A-Za-z\(\)\[\]\- ]+$/;
            //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!(emailRegex.test(vm.UserName))) {
                vm.message += "Invalid email address/username. ";
                isValid = false;
            }
            if (!(nameRegex.test(vm.firstname)) || !(nameRegex.test(vm.lastname))) {
                vm.message += "Invalid First Name / Last Name. ";
                isValid = false;
            }
            if (!(majorRegex.test(vm.usermajor)) && vm.usermajor != undefined) {
                vm.message += "Invalid Major. ";
                isValid = false;
            }
            if (vm.presentGPA != undefined && (!(numberRegex.test(vm.presentGPA)) || vm.presentGPA>4)) {
                vm.message += "Invalid present GPA. ";
                isValid = false;
            }
            if (vm.highschoolGPA != undefined && (!(numberRegex.test(vm.highschoolGPA)) || vm.highschoolGPA>4)) {
                vm.message += "Invalid high school GPA. ";
                isValid = false;
            }
            if (!(numberRegex.test(vm.phonenumber)) && vm.phonenumber != undefined) {
                vm.message += "Invalid Phone number. ";
                isValid = false;
            }
            if (!(numberRegex.test(vm.UniversityId)) && vm.UniversityId != undefined) {
                vm.message += "Invalid University ID. ";
                isValid = false;
            }

            return isValid;
        }
        vm.apply = function () {
            $log.log("apply data");
            $log.log(vm);
            vm.message = "";
            var validForm = validate();
            if (!validForm) {
                //vm.message must have been set by validate.
                return;
            }
            var promise = scholarshipService.apply(vm);
            promise.then(function (data) {
                $log.log(data);
                vm.message = data.body;
                vm.firstname =     "";
                vm.middlename  =    "";
                vm.lastname =      "";
                vm.usermajor =     "";
                vm.phonenumber =    "";
                vm.UserName =         "";
                vm.UniversityId = "";
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
                $log.error(reason);
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
                        vm.UserName= vm.profile.UserName;
                        vm.UniversityId = vm.profile.UniversityId;
                        vm.communityService = vm.profile.CommunityService;
                        vm.extraCurricular = vm.profile.ExtraCurricular;
                        vm.presentGPA = vm.profile.PresentGPA;
                        vm.highschoolGPA = vm.profile.HighSchoolGPA;
                        vm.address = vm.profile.Address;
                        $log.log(vm.profile);
                        vm.message = "Profile details loaded";
                    } else {
                        vm.message = "Empty auth";//AuthFactory.message;
                    }
                }, function (reason) {
                    vm.message = "Failed : " + reason + ":";//+  authService.message;
                    $log.error(reason);
                }, function (update) {
                    vm.message = "updated";
                })
            } else {
                $log.log("was checked. unchecking");
                vm.firstname =     "";
                vm.middlename  =    "";
                vm.lastname =      "";
                vm.usermajor =     "";
                vm.phonenumber =    "";
                vm.UserName =         "";
                vm.universityid = "";
                vm.communityService ="";
                vm.extraCurricular = "";
                vm.presentGPA = "";
                vm.highschoolGPA = "";
                vm.address = "";
            }
        }
        vm.onFileSelect1 = function ($files, uploadtype) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                vm.upload = $upload.upload({
                    url: '../api/fileupload',
                    //data: { name: user.Name }, *** send other data using this! apply button may call this
                    file: file, // or list of files ($files) for html5 only
                }).progress(function (evt) {
                    //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    $log.log('Uploaded successfully ' + file.name);
                    $log.log(data);
                    vm.filenamelabel1 = "&nbsp;&nbsp;&nbsp;" + uploadtype + " Uploaded <i class='fa fa-check'></i>";
                    if (uploadtype == "Essay") {
                        vm.essayfilename = data;
                    } else if (uploadtype == "Reference") {
                        vm.reffilename = data;
                    }
                }).error(function (err) {
                    $log.error('Error occured during upload');
                });
            }
        }
    }
})();