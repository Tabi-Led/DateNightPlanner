let form = document.getElementById('preferencesForm');
form.addEventListener("submit", function(event){
  event.preventDefault();
  searchAPI();

})


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

async function fetchAvatar(avatar) {
  try {
    const response = await fetch(avatar);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.avatarUrl; // Assuming the API returns the avatar URL
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return null;
  }
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

async function searchMovies() {
  const movieGenre = document.getElementById('movieGenre').value;
  // Replacing url below when i can find api 
  const movieApiUrl = `https://api.themoviedb.org/3/genre/${movieGenre}/movies?api_key=2a808e7dc1dd533ea12e2d1a799e31ff`;
  fetchMovieData(movieApiUrl)
    .then(movieData => {
      if (movieData) {
        displayMovieResults(movieData);
      } else {
        document.getElementById('results').innerHTML += '<p>Failed to fetch movie data.</p>';
      }
    });
}

async function searchAPI() {
  const recipeCategory = document.getElementById('mealCategory').value;
  const recipeApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeCategory}`;
  const recipeData = await fetchData(recipeApiUrl);
  if (recipeData) {
    displayResults(recipeData);
    for (const recipe of recipeData.meals) {
      const avatarUrl = await fetchAvatar(recipe.strMealThumb);
      if (avatarUrl) {
        displayAvatar(avatarUrl);
      } else {
        console.error(`Failed to fetch avatar for ${recipe.strMealThumb}.`);
      }
    }
  } else {
    document.getElementById('results').innerHTML = 'Failed to fetch data.';
  }
}

function displayResults(recipeData) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results
  for (let i=0; i < 5; i++) {
    let recipe = recipeData.meals[i];
    const recipeElement = document.createElement('div');
    recipeElement.innerHTML = `<p>${recipe.strMeal}</p>
    <img src="${recipe.strMealThumb}" height="100">`
    let ingredientList = `<ul>`
    let j = 1;
    console.log(recipe)
    while (true) {
      let ingredient = recipe["strIngredient" + j]
      console.log(ingredient)
      if (ingredient == "" || ingredient == null){
        break
      }
      ingredientList += `<li>${ingredient}</li>`
      j++
    } ingredientList += `</ul>`
    console.log(ingredientList)
    recipeElement.innerHTML += ingredientList
    resultsContainer.appendChild(recipeElement);
  }
}


async function displayMovieResults(movieData) {
  // Display or process the fetched movie data as needed
  console.log('Fetched movie data:', movieData);
  // This will append the movie data to the results. Adjust as necessary for your display logic.
  document.getElementById('results').innerHTML += '<h2>Movie Results</h2>' + JSON.stringify(movieData, null, 2);
}

function displayAvatar(avatarUrl) {
  const avatarContainer = document.createElement('div');
  const img = document.createElement('img');
  img.src = avatarUrl; // Assuming avatarUrl is a string containing the URL
  img.alt = 'avatar';
  avatarContainer.appendChild(img);
  document.getElementById('avatarContainer').appendChild(avatarContainer);
}