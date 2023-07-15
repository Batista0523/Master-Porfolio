const searchInput = document.getElementById('searchInput');
const quantityInput = document.getElementById('quantityInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const errorContainer = document.getElementById('errorContainer');


// Add event listener to the search button
searchBtn.addEventListener('click', searchPokemon);

// Function to handle the Pokémon search request
function searchPokemon(event) {
  event.preventDefault(); // Prevent default form submission

  const searchTerm = searchInput.value.trim();
  const quantity = parseInt(quantityInput.value);

  // Clear previous results and error message
  resultsContainer.innerHTML = '';
  errorContainer.innerHTML = '';

  // Make API request to search for Pokémon based on the search term
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const pokemonName = data.name;
      const pokemonImage = data.sprites.front_default;
      const pokemonType = data.types.map(type => type.type.name).join(', ');
      const pokemonHealth = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
      const pokemonPower = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
      

      // Create HTML elements for each Pokémon result
      for (let i = 0; i < quantity; i++) {
        const pokemonContainer = document.createElement('div');
        pokemonContainer.classList.add('pokemon-container');

        const pokemonNameElement = document.createElement('h2');
        pokemonNameElement.textContent = pokemonName;

        const pokemonImageElement = document.createElement('img');
        pokemonImageElement.src = pokemonImage;
        pokemonImageElement.alt = pokemonName;

        const pokemonInfoElement = document.createElement('p');
        pokemonInfoElement.innerHTML = `<strong>Type:</strong> ${pokemonType}<br><strong>Health:</strong> ${pokemonHealth}<br><strong>Power:</strong> ${pokemonPower} `;

        // Append Pokémon elements to the results container
        pokemonContainer.appendChild(pokemonNameElement);
        pokemonContainer.appendChild(pokemonImageElement);
        pokemonContainer.appendChild(pokemonInfoElement);

        // Append Pokémon container to the results container
        resultsContainer.appendChild(pokemonContainer);
      }

      // Add API response effect
      resultsContainer.classList.add('api-response');
    })
    .catch(error => {
      console.error('Error:', error);
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'the name you have entered is incorrect please make sure to search with the correct pokémon name';
      errorContainer.appendChild(errorMsg);
    });
}

// Form submission effect
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault(); // Prevent default form submission

  // Add error message for incorrect form submission
  const errorMsg = document.createElement('p');
  errorMsg.textContent = 'Incorrect form submission.';
  errorMsg.classList.add('error-message');
  form.appendChild(errorMsg);
});
