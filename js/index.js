/* eslint-disable no-unused-expressions */
const monsterList = [];
let start = 0;

function getMonsters() {
  return fetch('http://localhost:3000/monsters')
    .then((response) => response.json())
    .then((json) => {
      json.forEach((e) => {
        monsterList.push(e);
      });
      renderMonsters(start);
    });
}

function createMonsterForm() {
  const formDiv = document.getElementById('create-monster');
  const monsterForm = document.createElement('form');
  monsterForm.setAttribute('method', 'post');
  monsterForm.setAttribute('action', '');
  formDiv.append(monsterForm);

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'monsterName');
  monsterForm.append(nameInput);

  const ageInput = document.createElement('input');
  ageInput.setAttribute('type', 'float');
  ageInput.setAttribute('name', 'monsterAge');
  monsterForm.append(ageInput);

  const descInput = document.createElement('input');
  descInput.setAttribute('type', 'text');
  descInput.setAttribute('name', 'monsterDesc');
  monsterForm.append(descInput);

  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('name', 'formSubmit');
  submitBtn.setAttribute('value', 'submit');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createMonster();
  });
  monsterForm.append(submitBtn);
}

function createMonster() {
  const nameField = document.getElementsByName('monsterName');
  const ageField = document.getElementsByName('monsterAge');
  const descField = document.getElementsByName('monsterDesc');
  const postMonster = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: nameField[0].value,
      age: ageField[0].value,
      description: descField[0].value,
    }),
  };
  fetch('http://localhost:3000/monsters', postMonster)
    .then((response) => response.json())
    .then((json) => {
      monsterList.push(json);
    });
}

function renderMonsters(start) {
  const monsterContainer = document.getElementById('monster-container');
  monsterContainer.innerHTML = '';
  const monsterCard = document.createElement('div');

  monsterList.slice(start, start + 50).forEach((monster) => {
    const name = document.createElement('h2');
    name.innerText = monster.name;

    const age = document.createElement('h4');
    age.innerText = monster.age;

    const desc = document.createElement('p');
    desc.innerText = monster.description;

    monsterCard.append(name);
    monsterCard.append(age);
    monsterCard.append(desc);

    monsterContainer.append(monsterCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getMonsters();
  createMonsterForm();
  const forwardBtn = document.querySelector('#forward');
  forwardBtn.addEventListener('click', () => {
    if (start < monsterList.length) {
      start += 50;
    } else { console.log('Cannot go forward anymore!'); }
    renderMonsters(start);
  });
  const backBtn = document.querySelector('#back');
  backBtn.addEventListener('click', () => {
    if (start > 0) {
      start -= 50;
    } else { console.log('Cannot go back anymore!'); }
    renderMonsters(start);
  });
});
