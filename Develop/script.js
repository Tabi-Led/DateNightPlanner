
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