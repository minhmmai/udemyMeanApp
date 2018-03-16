angular.module("meanhotel").controller("LoginController", LoginController);

function LoginController($location, $http, $window, AuthFactory){
    var vm = this;
    vm.isLoggedIn = function(){
        return (AuthFactory.isLoggedIn ? true :false);
    };

    vm.login = function(){
        if (vm.username && vm.password){
            var user = {
                username: vm.username,
                password: vm.password
            }
        }
        $http.post("/api/users/login/", user).then(function(response){
            if (response.data.success){
                $window.sessionStorage.token = response.data.token;
                AuthFactory.isLoggedIn = true;
                (vm.loggedinUser ? ", " + response.data.name : "")
            }
        }).catch(function(error){
            console.log("Error logging in!", error);
        })
    };

    vm.logout = function(){
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path("/");
        vm.loggedinUser = "";
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path(). split("/")[1];
        return (url === currentPath ? "active" : "");       
    }
}