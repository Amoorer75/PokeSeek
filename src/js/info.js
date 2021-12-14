import axios from "axios";
let url = 'https://pokeapi.co/api/v2/pokemon/'


const typeColors = {
  normal: "#e0e0e0",
  fighting: "#F0E8D1",
  flying: "#A7B5D1",
  poison: "#A977AA",
  ground: "#C3A17A",
  rock: "#C7B470",
  bug: "#FCE09A",
  ghost: "#BDAAE5",
  steel: "#E3E6F1",
  fire: "#ff8a8a",
  water: "#ADCEFF",
  grass: "#AAE396",
  electric: "#FAF57A",
  psychic: "#ff9cd1",
  ice: "#C7F8FF",
  dragon: "#B1ABFA",
  dark: "#9C9FBE",
  fairy: "#F7CBE5"
}

const infoColors = {
  normal: "#f0eded",
  fighting: "#fff9e8",
  flying: "#fcf5de",
  poison: "#d292d4",
  ground: "#f0ca9e",
  rock: "#f0da8b",
  bug: "#ffedbf",
  ghost: "#d2bdff",
  steel: "#f0f3fc",
  fire: "#ff9f5e",
  water: "#cfe2ff",
  grass: "#DAF2D1",
  electric: "#fffcab",
  psychic: "#ffd1ea",
  ice: "#dbfbff",
  dragon: "#d2cfff",
  dark: "#c2c6ed",
  fairy: "#fcebf5"
}

async function statsInfo(id, container) {
  await axios.get(url + id)
    .then(res => res.data)
    .then(data => {
      //Create card
      const stats = document.createElement('div');
      stats.className = 'stats';

      const stats_body = document.createElement('div');
      stats_body.className = 'card_body';

      //Fill card elements
      const title = document.createElement('h1');
      title.className = 'card-title';
      let number = "#" + data.id.toString().padStart(3, 0);
      let name = data.name[0].toUpperCase() + data.name.slice(1);
      title.textContent = `${name} ${number}`;
      stats_body.appendChild(title);

      //Get pokemon image
      const img = document.createElement('img');
      img.src = data.sprites.front_default;
      img.className = 'front-regular';
      stats_body.appendChild(img);

      //Get pokemon shiny image
      const imgShiny = document.createElement('img');
      imgShiny.src = data.sprites.front_shiny;
      imgShiny.className = 'front-shiny';
      stats_body.appendChild(imgShiny);

      //Color of Background
      const main_types = Object.keys(typeColors);
      const pokeType = data.types.map(type => type.type.name);
      const type = main_types.find(type => pokeType.indexOf(type) == 0);
      const color = typeColors[type];
      stats.style.backgroundColor = color;

      //Information box
      const stat_dets = document.createElement('div');
      stat_dets.className = "stat-box";

      const typing = document.createElement('li');
      typing.className = 'card_text';
      let typeText = data.types.map(type => type.type.name[0].toUpperCase() + type.type.name.slice(1)).join(', ');
      typing.textContent = `Type: ${typeText}`;
      stat_dets.appendChild(typing);

      const weight = document.createElement('li');
      weight.className = 'card_text';
      let weightTxt = Math.round((data.weight / 4.536) * 10) / 10;
      weight.textContent = `Weight: ${weightTxt} lb`;
      stat_dets.appendChild(weight);

      const height = document.createElement('li');
      height.className = 'card_text';
      let heightTxt = Math.round((data.height / 3.048) * 10) / 10;
      height.textContent = `Height: ${heightTxt} ft`;
      stat_dets.appendChild(height);

      //Div color
      const subColor = Object.keys(infoColors);
      const mainColor = subColor.find(type => pokeType.indexOf(type) == 0);
      const color2 = infoColors[mainColor];
      stat_dets.style.backgroundColor = color2;
      
      //Base Stat information
      data.stats.forEach(stat => {
        const statElement = document.createElement('li');
        statElement.className = 'card_text';
        let name = stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1);
        statElement.textContent = `${name}: ${stat.base_stat}`;
        stat_dets.appendChild(statElement);
      });

      stats_body.appendChild(stat_dets);
      stats.appendChild(stats_body);
      container.appendChild(stats);
    })
    .catch((err) => {
      console.log(err);
    })
}

export { statsInfo }
export { typeColors }
export { infoColors }