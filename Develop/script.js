
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
//separation of code for movie js 

async function fetchData(movieApiUrl) {
  try {
    const response = await fetch(movieApiUrl);
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
  const movieCategory = document.getElementById('movieCategory').value;
  const movieApiUrl = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=uk=${movieCategory}`;
  fetchData(movieApiUrl)
    .then(movieData => {
      if (movieData) {
        displayResults(movieData);
      } else {
        document.getElementById('results').innerHTML = 'Failed to fetch data.';
      }
    });
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '118656cf14msh2a395320959c130p13cca2jsnf5e7d20384d2',
		'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}