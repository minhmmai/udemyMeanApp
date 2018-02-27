angular.module("myApp").factory("FilmFactory", FilmFactory)

function FilmFactory($http) {
    return {
        getAllFilms: getAllFilms,
        getOneFilm: getOneFilm
    }

    function getAllFilms() {
        return $http.get("https://swapi.co/api/films/").then(completeAllFilms).catch(failed);
    }

    function getOneFilm(id) {
        return $http.get("https://swapi.co/api/films/" + id).then(completeOneFilm).catch(failed);
    }

    function completeAllFilms(response) {
        return response.data.results;
    }

    function completeOneFilm(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    }
}