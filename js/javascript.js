"use strict"
$(document).ready(function () {

    const MOVIE_URL = 'https://early-intermediate-open.glitch.me/movies'

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

    const getMovies = () => fetch(MOVIE_URL)
        .then(res => res.json())
        .then(movie => {
            movie.forEach(movie => {

                $("#movies").append(`<h1>${movie.title}</h1><h2>Rating: ${movie.rating}</h2>`);
            });
        })
        .catch(console.error)
})
$("#displayMovies").on('click', getMovies);

