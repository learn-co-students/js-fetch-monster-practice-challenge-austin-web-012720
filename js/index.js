let monsterList = [];
let start = 0;

function getMonsters() {
  return fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(json => {
      json.forEach(e => {
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

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    createMonster();
  });

  monsterForm.append(submitBtn);
}

function createMonster() {
  const nameField = document.getElementsByName('monsterName');
  const ageField = document.getElementsByName('monsterAge');
  const descField = document.getElementsByName('monsterDesc');

  console.log('-----Submitted-----');
  console.log(nameField[0].value, ageField[0].value, descField[0].value);

  const postMonster = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: nameField[0].value,
      age: ageField[0].value,
      description: descField[0].value
    })
  };
  fetch('http://localhost:3000/monsters', postMonster)
    .then(response => response.json())
    .then(json => {
      monsterList.push(json);
      //   renderMonsters();
    });
}

function renderMonsters(start) {
  const monsterContainer = document.querySelector('#monster-container');
  monsterContainer.innerHTML = '';

  monsterList.slice(start, start + 50).forEach(monster => {
    const monsterCard = document.createElement('div');

    const name = document.createElement('h2');
    name.innerText = monster.name;

    const age = document.createElement('h4');
    age.innerText = monster.age;

    const description = document.createElement('p');
    description.innerText = monster.description;

    monsterCard.append(name);
    monsterCard.append(age);
    monsterCard.append(description);

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
      renderMonsters(start);
    } else {
      console.log('Error: Aleady at the last Monster');
    }
  });

  const backBtn = document.querySelector('#back');
  backBtn.addEventListener('click', () => {
    if (start > 0) {
      start -= 50;
      renderMonsters(start);
    } else {
      console.log('Error: Already at the earliest Monsters');
    }
  });
});
