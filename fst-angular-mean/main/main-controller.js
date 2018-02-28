angular.module('myApp')
    .controller('MainController', MainController);

function MainController(FilmFactory) {
    var vm = this;    
    vm.name = 'Tamas';
    vm.date1 = "12 February 2016";
    vm.date2 = "01 August 2018";

    FilmFactory.getAllFilms().then(function(response) {
        console.log(response);        
        return vm.films = response;
    })
}