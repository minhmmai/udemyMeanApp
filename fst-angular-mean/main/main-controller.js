angular.module('myApp')
    .controller('MainController', MainController);

function MainController(FilmFactory) {
    var vm = this;    
    vm.name = 'Tamas';

    FilmFactory.getAllFilms().then(function(response) {
        console.log(response);
        return vm.films = response;
    })
}