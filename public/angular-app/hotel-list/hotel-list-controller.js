angular.module("meanhotel")
    .controller("HotelController", HotelController);

    function HotelController($http) {
    var vm = this;
    vm.title = "MEAN Hotel App";
    $http.get("/api/hotels")
    .then(function(response){
        vm.hotels = response.data;
    })
}