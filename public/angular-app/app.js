angular.module("meanhotel", ["ngRoute", "angular-jwt"])
    .config(config).run(run);

//config routes for pages and their controllers
function config($httpProvider, $routeProvider) {

    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider
        .when("/", {
            templateUrl: "/angular-app/main/main.html",
            access: {
                restricted: false
            }
        })
        .when("/hotels", {
            templateUrl: "/angular-app/hotel-list/hotels.html",
            controller: HotelsController,
            controllerAs: "vm",            
            //restrict access to certain page
            access: {
                restricted: false
            }
        })
        .when("/hotels/:id", {
            templateUrl: "/angular-app/hotel-display/hotel.html",
            controller: HotelController,
            controllerAs: "vm",
            access: {
                restricted: false
            }
        })
        .when("/register", {
            templateUrl: "angular-app/register/register.html",
            controller: RegisterController,
            controllerAs: "vm",
            access: {
                restricted: false
            }
        })
        .when("/profile", {
            templateUrl: "angular-app/profile/profile.html",
            //access to this page is retricted if user is not logged in
            access: {
                restricted: true
            }
        })
        //Redirect any wrong url to main page
        .otherwise({
            redirectTo: "/"
        });
}

//Listen to event of nextRoute and check whether it is a restricted route
function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path("/");
        }
    })
}


