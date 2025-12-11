const grid = document.getElementById("grid");

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  rock: "#B6A136",
  psychic: "#F95587",
    fairy: "#D685AD",
    bug: "#A6B91A",
};
async function fetchAndCreateCard(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) throw new Error("Pokémon não encontrado");
    const data = await response.json();
    createCardHTML(data);
  } catch (error) {
    console.error(error);
  }
}

function createCardHTML(data) {
  const name = data.name;
  const id = data.id.toString().padStart(3, "0");

  const imgUrl =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;

  const altura = data.height / 10;
  const peso = data.weight / 10;

  const abilities = data.abilities
    .map((a) => a.ability.name)
    .slice(0, 2)
    .join(", ");

  const stats = {};
  data.stats.forEach((s) => {
    stats[s.stat.name] = s.base_stat;
  });

  const atk = stats["attack"] || 0;
  const def = stats["defense"] || 0;

  const mainType = data.types[0].type.name;

  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const typesHtml = data.types
    .map((t) => {
      const typeName = t.type.name;
      return `<span class="type-badge type-${typeName}">${typeName}</span>`;
    })
    .join("");

  card.innerHTML = `
    <div class="card-header type-gradient-${mainType}">
        <img src="${imgUrl}" alt="${name}" class="poke-image">
    </div>

    <div class="card-body">
        <span class="poke-id">#${id}</span>

        <h2 class="poke-name">${name}</h2>

        <div class="types">${typesHtml}</div>

        <div class="info-row">
            <div class="info-box">
                <h4>Altura</h4>
                <p>${altura} m</p>
            </div>
            <div class="info-box">
                <h4>Peso</h4>
                <p>${peso} kg</p>
            </div>
        </div>

        <div class="abilities">
            <strong>Habilidades:</strong> ${abilities}
        </div>

        <div class="stats-wrapper">
            <div class="stat-line">
                <span class="stat-label">ATK</span>
                <span class="stat-value">${atk}</span>
                <div class="progress-bg">
                    <div class="progress-fill atk-fill" data-value="${atk}" data-type="${mainType}"></div>
                </div>
            </div>

            <div class="stat-line">
                <span class="stat-label">DEF</span>
                <span class="stat-value">${def}</span>
                <div class="progress-bg">
                    <div class="progress-fill def-fill" data-value="${def}" data-type="${mainType}"></div>
                </div>
            </div>
        </div>
    </div>
  `;

  grid.appendChild(card);
}


(async function init() {
  await fetchAndCreateCard("Kadabra")
  await fetchAndCreateCard("Alakazam");
  await fetchAndCreateCard("Drowzee");
  await fetchAndCreateCard("Hypno");
  await fetchAndCreateCard("mr-mime");
  await fetchAndCreateCard("mewtwo"); 
  await fetchAndCreateCard("Slowbro"); 
  await fetchAndCreateCard("Slowpoke");
  await fetchAndCreateCard("Starmie");
  await fetchAndCreateCard("Exeggcute");
  await fetchAndCreateCard("Jynx");
  await fetchAndCreateCard("Exeggutor");  
})();