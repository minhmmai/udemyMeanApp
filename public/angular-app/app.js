angular.module("meanhotel", ["ngRoute"])
    .config(config)
    .controller("HotelController", HotelController);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/hotels.html',
            controller: HotelController,
            controllerAs: 'vm'
        });
}

function HotelController() {
    var vm = this;
    vm.title = "MEAN Hotel App";
}
