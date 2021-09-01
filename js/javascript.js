"use strict"
$(document).ready(function () {

    const MOVIE_URL = 'https://lyrical-intriguing-othnielia.glitch.me/movies'

//     function loading() {
//             $('#loadScreen').html(`<div style="height:0;padding-bottom:56.11%;position:relative;">
//         <iframe width="360" height="202" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameBorder="0" src="https://imgflip.com/embed/36o4a6"></iframe>
//     </div>
//     <p><a href="https://imgflip.com/gif/36o4a6">via Imgflip</a></p>`)
//             }
// loading();

    //FETCH REQUEST AND RENDER HTML*********************************************
    const getMovies = () => fetch(MOVIE_URL)
    // gifLoader()
        .then(res => res.json())
        .then(movies => {
            let html = '';
            let movieList = '<option>Select a Movie</option>';

            movies.forEach(movie => {

                html += `<div class="card mb-1" data-number="${movie.id}" style="width: 24rem">
                    <h3>${movie.title}</h3>
                    <h4>Rating: ${movie.rating}</h4>
                    <button class="delMovie">Delete</button></div>`;

                movieList += `<option data-rating="${movie.rating}" data-number="${movie.id}">${movie.title}</option>`

            })

            // var listItem = movieList.value;
            // if (listItem) {
            //     $('#editMovie').
            //      }

                // else {
            //     coffees.forEach(function (coffee) {
            //         if (coffee.roast === selectedRoast) {
            //             filteredCoffees.push(coffee);
            //         }
            //     });
            //     body.innerHTML = renderCoffees(filteredCoffees);

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
    });

    getMovies();
});

