import axios from "axios"
let url = 'https://pokeapi.co/api/v2/pokemon/'

const random = document.querySelector('#randomPokemon');
const randButton = document.getElementById("random");
const input = document.getElementById("input");
const submit = document.getElementById("submit");

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
  fire: "#f5745b",
  water: "#ADCEFF",
  grass: "#AAE396",
  electric: "#ffdf40",
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

async function createCard(id) {
  await axios.get(url + id)
    .then(res => res.data)
    .then(data => {
      //Create card
      const card = document.createElement('div');
      card.className = 'card';
      const infoCard = document.createElement('div');

      const card_content = document.createElement('div');
      card_content.className = 'card_body';

      //Fill card elements
      const title = document.createElement('h1');
      title.className = 'card-title';
      let number = "#" + data.id.toString().padStart(3, 0);
      let name = data.name[0].toUpperCase() + data.name.slice(1);
      title.textContent = `${name} ${number}`;
      card_content.appendChild(title);

      //Get pokemon image
      const img = document.createElement('img');
      img.src = data.sprites.front_default;
      console.log(data.sprites.front);
      img.className = 'card-image-front';
      card_content.appendChild(img);

      //Color of Background
      const main_types = Object.keys(typeColors);
      const pokeType = data.types.map(type => type.type.name);
      const type = main_types.find(type => pokeType.indexOf(type) == 0);
      const color = typeColors[type];
      card.style.backgroundColor = color;

      //Information box
      const info = document.createElement('div');
      info.className = "info-box";

      const typing = document.createElement('li');
      typing.className = 'card_text';
      let typeText = data.types.map(type => type.type.name[0].toUpperCase() + type.type.name.slice(1)).join(', ');
      typing.textContent = `Type: ${typeText}`;
      info.appendChild(typing);

      const weight = document.createElement('li');
      weight.className = 'card_text';
      let weightTxt = Math.round((data.weight/4.536)*10)/10;
      weight.textContent = `Weight: ${weightTxt} lb`;
      info.appendChild(weight);

      const height = document.createElement('li');
      height.className = 'card_text';
      let heightTxt = Math.round((data.height/3.048)*10)/10;
      height.textContent = `Height: ${heightTxt} ft`;
      info.appendChild(height);

      //Color of Background
      const subColor = Object.keys(infoColors);
      const mainColor = subColor.find(type => pokeType.indexOf(type) == 0);
      const color2 = infoColors[mainColor];
      info.style.backgroundColor = color2;

      card_content.appendChild(info);
      card.appendChild(card_content);
      random.appendChild(card);
    })
    .catch((err) => {
      console.log(err);
    })
}

async function generateRandom() {
  let id = Math.floor(Math.random() * 150);
  createCard(id);
}

generateRandom();

randButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo();
  generateRandom();
});

const clearInfo = () => {
  while (random.firstChild) {
    random.firstChild.remove();
  }
};

submit.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo();
  let value = input.value.toLowerCase();
  createCard(value);
});
