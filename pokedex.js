document.addEventListener('DOMContentLoaded', function() {
    const pokedexList = document.getElementById('pokedex');

async function fetchpokemonInfo() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150');
    const data = await response.json();
    const pokemonUrls = data.results.map(pokemon => pokemon.url);
    const pokemonInfo = await Promise.all(
        pokemonUrls.map(async url => {
            const response = await fetch(url);
            return response.json();
        })
    );
    
    return pokemonInfo;
}

function displayPokemonList(pokemons) {
    pokemons.forEach(pokemon => {
        const listPokemon = document.createElement('li');
        listPokemon.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
            `;
        pokedexList.appendChild(listPokemon);
    });
    }
    
/*<p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p>ID: ${pokemon.id}</p>*/
    
async function init() {
    const pokemonInfo = await fetchpokemonInfo();
    displayPokemonList(pokemonInfo);
}

init();
});