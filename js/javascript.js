"use strict"
$(document).ready(function () {

    const MOVIE_URL = 'https://early-intermediate-open.glitch.me/movies'

    //FETCH REQUEST AND RENDER HTML*********************************************

    const getMovies = () => fetch(MOVIE_URL)
        .then(res => res.json())
        .then(movies => {
            let html = '';
            movies.forEach(movie => {
                html += `<div class="card mb-1" data-number="${movie.id}" style="width: 24rem"><h1>${movie.title}</h1><h2>Rating: ${movie.rating}</h2><button class="delMovie")">Delete</button></div>`;
            })
            $('#movies').html(html);
        })
        .catch(console.error);

    //ADD MOVIES FUNCTION******************************************************

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

    //DELETE MOVIES FUNCTION******************************************************

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

    //EVENT HANDLERS*****************************************************************

    $("#displayMovies").on('click', getMovies);

    $("#submitMovie").on('click', function (e) {
        e.preventDefault();
        let currentMovie = $("#addMovie").val();
        let currentRating = $("#rating").val();
        let movieObj = {title: currentMovie, rating: currentRating};
        addMovies(movieObj);
    });


    $(document).on('click', '.delMovie', function (e) {
        e.preventDefault();
        let currentId = $(this).parent().data('number');
        console.log(currentId)
        deleteMovie(currentId);
    });

    getMovies();
});
