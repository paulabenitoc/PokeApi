document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const pokedex = document.getElementById('pokedex');
    const searchInput = document.getElementById('searchInput');

    async function fetchPokemon() {
        try {
            for (let i = 1; i <= 150; i++) {
                const response = await fetch(`${baseUrl}${i}`);
                const pokemonData = await response.json();
                displayPokemon(pokemonData);
            }
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
        }
    }

    function displayPokemon(pokemon) {
        const pokemonContainer = document.createElement('div');
        pokemonContainer.classList.add('pokemon');

        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonImage.alt = pokemon.name;

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = pokemon.name;

        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.appendChild(pokemonName);

        pokedex.appendChild(pokemonContainer);
    }

    function filterPokemon(searchTerm) {
        const pokemonElements = document.querySelectorAll('.pokemon');
        pokemonElements.forEach(pokemonElement => {
            const pokemonName = pokemonElement.querySelector('h2').textContent.toLowerCase();
            if (pokemonName.includes(searchTerm.toLowerCase())) {
                pokemonElement.style.display = 'block';
            } else {
                pokemonElement.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.trim();
        filterPokemon(searchTerm);
    });

    fetchPokemon();
});