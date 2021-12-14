import axios from "axios"
import { typeColors } from "./info"
import { statsInfo } from "./info"
let url = 'https://pokeapi.co/api/v2/pokemon/'

//Main Containers
const searchCont = document.getElementById("search");
const statList = document.getElementById("stat-list");
const input = document.getElementById("input");
const submit = document.getElementById("submit");

//Gen containers and buttons
const pokeList = document.getElementById("list");
const gen1 = document.getElementById('gen-1');
const gen2 = document.getElementById('gen-2');
const gen3 = document.getElementById('gen-3');
const gen4 = document.getElementById('gen-4');
const gen5 = document.getElementById('gen-5');
const gen6 = document.getElementById('gen-6');
const gen7 = document.getElementById('gen-7');
const gen8 = document.getElementById('gen-8');

async function createCard(id) {
  await axios.get(url + id)
    .then(res => res.data)
    .then(data => {
      //Create card - turn it into a button so that it is clickable
      const card = document.createElement('div');
      card.className = 'card';

      //Get pokemon image
      const img = document.createElement('img');
      img.src = data.sprites.front_default;
      img.className = 'card-image-front';
      card.appendChild(img);

      //Fill card elements
      const card_content = document.createElement('div');
      card_content.className = 'card_body';

      const number = document.createElement('h2');
      number.className = "number";
      number.textContent = "#" + data.id.toString().padStart(3, 0);
      card_content.appendChild(number);

      const title = document.createElement('h1');
      title.className = 'card_title'
      title.textContent = data.name[0].toUpperCase() + data.name.slice(1);
      card_content.appendChild(title);

      //Color of Background
      const main_types = Object.keys(typeColors);
      const pokeType = data.types.map(type => type.type.name);
      const type = main_types.find(type => pokeType.indexOf(type) == 0);
      const color = typeColors[type];
      card.style.backgroundColor = color;

      card.appendChild(card_content);
      pokeList.appendChild(card);

      statsCard(card, id);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Filling each generation button
async function gen1List() {
  for (let i = 1; i <= 151; i++) {
    await createCard(i);
  }
}

gen1.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);;
  gen1List();
});

async function gen2List() {
  for (let i = 152; i <= 251; i++) {
    await createCard(i);
  }
}

gen2.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);;
  gen2List();
});

async function gen3List() {
  for (let i = 252; i <= 386; i++) {
    await createCard(i);
  }
}

gen3.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);;
  gen3List();
});

async function gen4List() {
  for (let i = 387; i <= 493; i++) {
    await createCard(i);
  }
}

gen4.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);;
  gen4List();
});

async function gen5List() {
  for (let i = 494; i <= 649; i++) {
    await createCard(i);
  }
}

gen5.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);;
  gen5List();
});

async function gen6List() {
  for (let i = 650; i <= 721; i++) {
    await createCard(i);
  }
}

gen6.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);;
  gen6List();
});

async function gen7List() {
  for (let i = 722; i <= 809; i++) {
    await createCard(i);
  }
}

gen7.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);
  gen7List();
});

async function gen8List() {
  for (let i = 810; i <= 898; i++) {
    await createCard(i);
  }
}

gen8.addEventListener("click", (event) => {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);
  gen8List();
});

function clearInfo(container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};

function statsCard(div, id) {
  div.addEventListener("click", (event) => {
    event.preventDefault();
    clearInfo(pokeList);
    clearInfo(searchCont);
    clearInfo(statList);
    statsInfo(id, statList);
  });
}

function searchEvent(event) {
  event.preventDefault();
  clearInfo(pokeList);
  clearInfo(searchCont);
  clearInfo(statList);
  let value = input.value.toLowerCase();
  createCard(value, searchCont);
}

submit.addEventListener("click", (event) => {
  searchEvent(event);
});

document.addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    searchEvent(event);
  }
});