//JS code

  // Function to fetch movies from Rotten Tomatoes
  function fetchMovies() {
    const apiKey = 'MY_ROTTEN_TOMATOES_API_KEY'; // Replace with my API key
    const endpoint = 'https://api.rottentomatoes.com/api/public/v1.0/movies.json';
    
    // Customization for the query parameters based on user requirements
    const queryParams = {
      apikey: apiKey,
      limit: 10, // Number of movies to fetch
      q: 'movie', // Search query, you can modify this
    };
    
    // Construct the URL with query parameters
    const url = new URL(endpoint);
    url.search = new URLSearchParams(queryParams);
    
    // Make the Fetch request
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Handle the fetched movie data here
        displayMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }

  // Function to display the fetched movies in the HTML
  function displayMovies(data) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear previous results
    
    // Loop through the fetched movies and display them
    data.movies.forEach((movie) => {
      const movieTitle = movie.title;
      const movieYear = movie.year;
      
      // Create a <div> element to display each movie
      const movieDiv = document.createElement('div');
      movieDiv.textContent = `${movieTitle} (${movieYear})`;
      
      // Append the movie <div> to the movie list
      movieList.appendChild(movieDiv);
    });
  }

  //Call the fetchMovies function when the page loads
  window.onload = fetchMovies;
