angular.module("meanhotel").controller("RegisterController", RegisterController);

function RegisterController($http) {
    var vm = this;
    vm.error = "";
    vm.message = "";

    vm.register = function () {
        var user = {
            username: vm.username,
            password: vm.password
        };

        if (!vm.username && !vm.password) {
            vm.error = "Please enter username and password.";
        } else if (!vm.username && vm.password) {
            vm.error = "Please enter a username.";
        } else if (vm.username && !vm.password) {
            vm.error = "Please enter a password.";
        } else if (vm.password !== vm.passwordRepeat) {
            vm.error = "Please confirm your password and ensure they are matched.";
        } else {
            $http.post("/api/users/register", user).then(function (result) {
                console.log(result);
                vm.message = "Successful registration, please login.";
                vm.error = "";
            }).catch(function (error) {
                console.log("Error registering user!", error);
            })
        }
    }
};