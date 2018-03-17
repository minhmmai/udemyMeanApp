angular.module("meanhotel")
    .controller("HotelController", HotelController);

function HotelController($route, $window, hotelDataFactory, $routeParams, AuthFactory, jwtHelper) {
    var vm = this;
    var id = $routeParams.id;
    hotelDataFactory.hotelDisplay(id).then(function (response) {
        vm.hotel = response.data;
        vm.stars = _getStarRating(response.data.stars)
    });

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            vm.loggedInUserName = decodedToken.username;
            vm.loggedInUserDisplayName = decodedToken.username;
            return true;
        } else {
            return false;
        }
    }

    function _getStarRating(stars) {
        return new Array(stars);
    };

    vm.addReview = function () {

        var postData = {
            name: vm.loggedInUserDisplayName,
            username: vm.loggedInUserName,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function (response) {
                if (response.status == 201) {
                    $route.reload();
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
};