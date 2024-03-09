document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const pokedex = document.getElementById('pokedex');
    const searchInput = document.getElementById('searchInput');
    const typeButtonsContainer = document.getElementById('typeButtons');

    async function fetchPokemon() {
        try {
            for (let i = 1; i <= 150; i++) {
                const response = await fetch(`${baseUrl}${i}`);
                const pokemonData = await response.json();
                displayPokemon(pokemonData);
            }
            createTypeButtons();
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
        pokemonImage.className = "card-image";

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = pokemon.name;

        const pokemonType = document.createElement('p');
        const types = pokemon.types.map(type => type.type.name).join(', ');
        pokemonType.textContent = `${types}`;
        pokemonType.className = "card-subtitle";

        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.appendChild(pokemonName);
        pokemonContainer.appendChild(pokemonType);

        pokedex.appendChild(pokemonContainer);
    }

    function filterPokemon(searchTerm) {
        const pokemonElements = document.querySelectorAll('.pokemon');
        pokemonElements.forEach(pokemonElement => {
            const pokemonName = pokemonElement.querySelector('h2').textContent.toLowerCase();
            const pokemonType = pokemonElement.querySelector('p').textContent.toLowerCase();
            if (pokemonName.includes(searchTerm.toLowerCase()) || pokemonType.includes(searchTerm.toLowerCase())) {
                pokemonElement.style.display = 'block';
            } else {
                pokemonElement.style.display = 'none';
            }
        });
    }

    function filterByType(type) {
        const pokemonElements = document.querySelectorAll('.pokemon');
        pokemonElements.forEach(pokemonElement => {
            const pokemonType = pokemonElement.querySelector('p').textContent.toLowerCase();
            if (pokemonType.includes(type.toLowerCase())) {
                pokemonElement.style.display = 'block';
            } else {
                pokemonElement.style.display = 'none';
            }
        });
    }

    function createTypeButtons() {
        const typesSet = new Set();
        const pokemonElements = document.querySelectorAll('.pokemon');
        pokemonElements.forEach(pokemonElement => {
            const pokemonType = pokemonElement.querySelector('p').textContent.toLowerCase();
            pokemonType.split(', ').forEach(type => typesSet.add(type));
        });

        typesSet.forEach(type => {
            const button = document.createElement('button');
            button.textContent = type;
            button.className = "filterButton"
            button.addEventListener('click', () => filterByType(type));
            typeButtonsContainer.appendChild(button);
        });
    }

    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.trim();
        filterPokemon(searchTerm);
    });

    fetchPokemon();
});