angular.module('myApp')
    .controller('MainController', MainController)
    .controller('AboutController', AboutController);

function MainController($http) {
    var vm = this;

    $http.get('https://swapi.co/api/films/')
        .then(function (response) {
            console.log(response);
            vm.films = response.data.results;
        });

    vm.name = 'Tamas';
}

function FilmController($http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;

$http.get("https:swapi.co/films/" + id).then(function(response){

});

    vm.about = 'This is my bio';
}