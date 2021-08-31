"use strict"
$(document).ready(function () {

    const MOVIE_URL = 'https://early-intermediate-open.glitch.me/movies'

    const getMovies = () => fetch(MOVIE_URL)
        .then(res => res.json())
        .then(movie => {
            movie.forEach(movie => {

                $("#movies").append(`<div class="card mb-1" style="width: 24rem"="><h1>${movie.title}</h1><h2>Rating: ${movie.rating}</h2><button class="deleteMovie">Delete</button></div>`);
            });
        })
        .catch(console.error)

    const addMovies = (movie) => fetch(`${MOVIE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
        .then(res => res.json())
        .then(data => {
            console.log(`Success: created ${JSON.stringify(movie)}`);
            return movie.id; // to access the primary key of the newly created entity
        })
        .catch(console.error);

    const deleteMovie = id => fetch(`${MOVIE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(() => {
            console.log(`Success: movie with id of ${id}`);
        })
        .catch(console.error);

    $("#displayMovies").on('click', getMovies);

    $("#submitMovie").on('click', function(e) {
        e.preventDefault();
        let currentMovie = $("#addMovie").val();
        let currentRating = $("#rating").val();
        let movieObj = {title:currentMovie, rating: currentRating};
        addMovies(movieObj);
        getMovies();
    });

    $("#delMovie").on('click', function(e) {
        e.preventDefault();
        let currentId = $("#deleteMovie").val();
        console.log(currentId)
        deleteMovie(currentId);
    });


    getMovies();
});















//     fetch(MOVIE_URL)
//         .then(res => res.json())
//         .then( movie => {
//             movie.forEach( movie => {
//
//                 $("#movies").append(`<h1>${movie.title}</h1><h2>Rating: ${movie.rating}</h2>`);
//             });
//         })
//         .catch(console.error))
// });


// let allMovies = [];
// const getMovies = () => fetch(MOVIE_URL)
//     .then(res => res.json())
//     .then(res => {
//         allMovies = res;
//     })
//     .catch(console.error);
//
//
// $("displayMovies").on('click', function () {
//     allMovies.forEach(movie => {
//         $("#movies").append(`<h1>${movie.title}</h1><h2>Rating: ${movie.rating}</h2>`);
//     })
// });