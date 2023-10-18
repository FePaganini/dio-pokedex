const pokeModalControl = {
  pokemonDetails: null,
};

async function showPokeModal(pokemonId) {
  buildModalStructure();
  pokeModalControl.pokemonDetails = await pokeApi.getPokemonDetails(pokemonId);
  console.log(pokeModalControl.pokemonDetails);
  document.body.style.overflow = "hidden";
  fillModalWithPokemonData();
}

function closePokeModal() {
  document.body.style.overflow = "unset";
  pokeModalControl.pokemonDetails = null;
  document.getElementById("section__poke-modal").remove();
}

function buildModalStructure() {
  const pokeModalSection = document.createElement("section");
  pokeModalSection.id = "section__poke-modal";

  const detailDiv = document.createElement("div");
  detailDiv.id = "poke-modal__details";
  pokeModalSection.appendChild(detailDiv);

  document.body.appendChild(pokeModalSection);
}

function fillModalWithPokemonData() {
  const detailDiv = document.getElementById("poke-modal__details");
  const [firstType] = pokeModalControl.pokemonDetails.types.map(
    (typeSlot) => typeSlot.type.name
  );
  detailDiv.className = `${firstType}`;

  buildModalDetails(detailDiv);
}

function buildModalDetails(detailDiv) {
  const header = buildModalDetailsHeader();
  const aboutDiv = buildModalDetailsAbout();

  detailDiv.appendChild(header);
  detailDiv.appendChild(aboutDiv);
}

function buildModalDetailsHeader() {
  const header = document.createElement("header");
  const btnCloseModal = document.createElement("button");
  btnCloseModal.textContent = "<";
  btnCloseModal.addEventListener("click", closePokeModal);
  const spanPokemonName = document.createElement("span");
  spanPokemonName.textContent = pokeModalControl.pokemonDetails.name;
  const spanPokemonId = document.createElement("span");
  spanPokemonId.textContent = "#" + pokeModalControl.pokemonDetails.id;
  header.appendChild(btnCloseModal);
  header.appendChild(spanPokemonName);
  header.appendChild(spanPokemonId);

  return header;
}

function buildModalDetailsAbout() {
  const aboutDiv = document.createElement("div");
  const abilitiesDiv = document.createElement("div");
  const abilitiesTitleSpan = document.createElement("span");
  const abilitiesInfoSpan = document.createElement("span");
  abilitiesTitleSpan.textContent = "Habilidades: ";
  abilitiesInfoSpan.textContent = pokeModalControl.pokemonDetails.abilities
    .map(
      (ability) =>
        ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)
    )
    .join(", ");
  abilitiesDiv.appendChild(abilitiesTitleSpan);
  abilitiesDiv.appendChild(abilitiesInfoSpan);
  aboutDiv.appendChild(abilitiesDiv);

  const baseStatsDiv = document.createElement("div");
  baseStatsDiv.textContent = "Status Base:";
  pokeModalControl.pokemonDetails.stats.forEach((stat) => {
    const statsLi = document.createElement("li");
    statsLi.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
    baseStatsDiv.appendChild(statsLi);
  });
  aboutDiv.appendChild(baseStatsDiv);

  return aboutDiv;
}
