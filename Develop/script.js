
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
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

function searchrecipeAPI() {
  const recipeCategory = document.getElementById('category').value;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${RecipeCategory}`;
  fetchData(apiUrl)
    .then(data => {
      if (data) {
        displayResults(data);
      } else {
        document.getElementById('results').innerHTML = 'Failed to fetch data.';
      }
    });
}

function displayResults(data) {
  // Display or process the fetched data as needed
  console.log('Fetched data:', data);
  document.getElementById('results').innerHTML = JSON.stringify(data, null, 2);
}
