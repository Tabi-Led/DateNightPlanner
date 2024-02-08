
async function fetchData(recipeApiUrl) {
  try {
    const response = await fetch(recipeApiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function searchAPI() {
  const recipeCategory = document.getElementById('mealCategory').value;
  const recipeApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeCategory}`;
  fetchData(recipeApiUrl)
    .then(recipeData => {
      if (recipeData) {
        displayResults(recipeData);
      } else {
        document.getElementById('results').innerHTML = 'Failed to fetch data.';
      }
    });
}

function displayResults(recipeData) {
  // Display or process the fetched data as needed
  console.log('Fetched data:', recipeData);
  document.getElementById('results').innerHTML = JSON.stringify(recipeData, null, 2);
}
// Function to fetch movie data based on selected genre
async function fetchMovieData(movieApiUrl) {
  try {
    const response = await fetch(movieApiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
}

function searchMovies() {
  const movieGenre = document.getElementById('movieGenre').value;
  // Replacing url below when i can find api 
  const movieApiUrl = `https://api.example.com/movies?genre=${movieGenre}`;
  fetchMovieData(movieApiUrl)
    .then(movieData => {
      if (movieData) {
        displayMovieResults(movieData);
      } else {
        document.getElementById('results').innerHTML += '<p>Failed to fetch movie data.</p>';
      }
    });
}

function displayMovieResults(movieData) {
  // Display or process the fetched movie data as needed
  console.log('Fetched movie data:', movieData);
  // This will append the movie data to the results. Adjust as necessary for your display logic.
  document.getElementById('results').innerHTML += '<h2>Movie Results</h2>' + JSON.stringify(movieData, null, 2);
}

