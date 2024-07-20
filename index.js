
document.addEventListener('DOMContentLoaded', () => {
    // URLs of the endpoints to fetch movie data
      // Replace with the actual endpoint URL
const appUrl = 'https://challange3-three.vercel.app/films'
    // Function to fetch and display the first movie's details
    async function fetchFirstMovie() {
        try {
            const response = await fetch(appUrl);
            const movie = await response.json();

            // Calculate available tickets
            const availableTickets = movie.capacity - movie.tickets_sold;

            // Update the HTML with movie details
            document.getElementById('movie-poster').src = movie.poster;
            document.getElementById('movie-title').textContent = movie.title;
            document.getElementById('movie-runtime').textContent = `Runtime: ${movie.runtime} minutes`;
            document.getElementById('movie-showtime').textContent = `Showtime: ${movie.showtime}`;
            document.getElementById('available-tickets').textContent = `Available Tickets: ${availableTickets}`;
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }

    // Function to fetch and display the list of movies
    async function fetchMovies() {
        try {
            const response = await fetch(`${appUrl}/${id}`);
            const movies = await response.json();
            
            const filmsList = document.getElementById('films');
            filmsList.innerHTML = '';  // Clear existing list

            movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.classList.add('film', 'item');
                li.addEventListener('click', () => displayMovieDetails(movie));
                filmsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    // Function to display selected movie's details
    function displayMovieDetails(movie) {
        const availableTickets = movie.capacity - movie.tickets_sold;
        document.getElementById('movie-poster').src = movie.poster;
        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-runtime').textContent = `Runtime: ${movie.runtime} minutes`;
        document.getElementById('movie-showtime').textContent = `Showtime: ${movie.showtime}`;
        document.getElementById('available-tickets').textContent = `Available Tickets: ${availableTickets}`;
    }

    // Event listener for the "Buy Ticket" button
    document.getElementById('buy-ticket').addEventListener('click', () => {
        const availableTicketsElement = document.getElementById('available-tickets');
        const availableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1], 10);
        
        if (availableTickets > 0) {
            availableTicketsElement.textContent = `Available Tickets: ${availableTickets - 1}`;
        } else {
            alert('No tickets available');
        }
    });

    // Fetch and display the first movie's details and the list of all movies on page load
    fetchFirstMovie();
    fetchMovies();
});
