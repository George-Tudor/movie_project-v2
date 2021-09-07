"use strict"
$(document).ready(function () {

    const MOVIE_URL = 'https://lyrical-intriguing-othnielia.glitch.me/movies'

    //https://api.themoviedb.org/3/movie/550?api_key=


    //FETCH REQUEST AND RENDER HTML*********************************************
    const getMovies = () => fetch(MOVIE_URL)

        .then(res => res.json())
        .then(movies => {
            setTimeout(function () {
                $('#loading').css("visibility", "hidden");
                $('#content').css("visibility", "visible");
            }, 1000);
            let html = '';
            let movieList = '<option>Select a Movie</option>';

            movies.forEach(movie => {

                html += `
                    <div class="p-2">
                        <div class="card mb-1 p-2" data-number="${movie.id}" style="width: 24rem">
                            <h3>${movie.title}</h3>
                            <h4>Rating: ${movie.rating}</h4>
                            <button class="delMovie btn btn-outline-danger btn-sm">Delete</button>
                        </div>
                    </div>
               `;

                movieList += `<option data-rating="${movie.rating}" data-number="${movie.id}">${movie.title}</option>`

            })


            $('#movies').html(html);
            $('#movie-selection').html(movieList);
            //setTimeout(hideLoadingGif, 3000)
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
        .then()
        .catch(console.error);

    //EDIT MOVIES FUNCTION********************************************************


    const editMovies = (movie) => fetch(`${MOVIE_URL}/${movie.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    })
        .then(res => res.json())
        .then(data => {
            console.log(`Success: edited ${JSON.stringify(movie)}`);
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
        $('#movies').append(`<div class="card mb-1" style="width: 24rem">
                    <h3>${currentMovie}</h3>
                    <h4>Rating: ${currentRating}</h4>
                    <button class="delMovie">Delete</button></div>`);
    });

    $('#movie-selection').on('change', function() {
        $('#editMovie').attr("placeholder", $('#movie-selection').val())
        $('#editRating').attr("placeholder", $("#movie-selection option:selected")[0].dataset.rating)
    });

    $("#editButton").on('click', function (e) {
        e.preventDefault();
        let newMovie = $("#editMovie").val();
        let newRating = $("#editRating").val();
        let movieId = $("#movie-selection option:selected")[0].dataset.number
        let newObj = {title: newMovie, rating: newRating, id: movieId};
        editMovies(newObj);

    });

    $(document).on('click', '.delMovie', function (e) {
        e.preventDefault();
        let currentId = $(this).parent().data('number');
        console.log(currentId)
        deleteMovie(currentId);
        $(this).parent().remove();

    });

    getMovies();
});


