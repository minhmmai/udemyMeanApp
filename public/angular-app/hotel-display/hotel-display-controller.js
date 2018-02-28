angular.module("meanhotel")
.controller("HotelController", HotelController);
function HotelController($http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
    $http.get("/api/hotel/" + id)
    .then(function(response){
        vm.hotel = response.data;
    })
}