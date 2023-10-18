const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  const li = document.createElement("li");
  const spanNumber = document.createElement("span");
  const spanName = document.createElement("span");
  const div = document.createElement("div");
  const ol = document.createElement("ol");
  const img = document.createElement("img");

  li.addEventListener("click", () => {
    console.log("Hello there!");
  });
  li.className = `pokemon ${pokemon.type}`;
  li.append(spanNumber, spanName, div);

  spanNumber.className = "number";
  spanNumber.textContent = `#${pokemon.number}`;

  spanName.className = "name";
  spanName.textContent = pokemon.name;

  div.className = "detail";
  div.append(ol, img);

  ol.className = "types";
  pokemon.types.forEach((type) => {
    const liType = document.createElement("li");
    liType.className = `type ${type}`;
    liType.textContent = type;
    ol.appendChild(liType);
  });

  img.src = pokemon.photo;
  img.alt = pokemon.name;

  return li;
}

function loadPokemonItens(offset, limit) {
  const fragmentLi = document.createDocumentFragment();

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemons.forEach((pokemon) => {
      fragmentLi.appendChild(convertPokemonToLi(pokemon));
    });
    pokemonList.appendChild(fragmentLi);
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
