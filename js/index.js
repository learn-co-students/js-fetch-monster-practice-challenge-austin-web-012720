const MONSTERS_URL = "http://localhost:3000/monsters";
let PAGE = 1;
const LIMIT = "?_limit=50&_page=";


document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const forwardButton = document.getElementById('forward');
    const backButton = document.getElementById('back');

    const create = document.getElementById('create');
    create.addEventListener("click", createMonster);
    
    forwardButton.addEventListener("click", forward);
    backButton.addEventListener("click", back);

    fetchMonsters(`${MONSTERS_URL}/${LIMIT}${PAGE}`);
});

function forward() {
    PAGE += 1;
    const monstersDiv = document.getElementById('monster-container');
    monstersDiv.innerHTML = "";
    fetchMonsters(`${MONSTERS_URL}/${LIMIT}${PAGE}`);
}

function back() {
    PAGE === 1 ? PAGE = 1 : PAGE -= 1;
    const monstersDiv = document.getElementById('monster-container');
    monstersDiv.innerHTML = "";
    fetchMonsters(`${MONSTERS_URL}/${LIMIT}${PAGE}`);
}

function fetchMonsters(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
        console.log(json);
        monstersHTML(json);
    });
};

function monstersHTML(json) {
    const monstersDiv = document.getElementById('monster-container');
    
    for(const monster in json) {
        const id = monster;
        const name = json[monster].name;
        const age = json[monster].age;
        const description = json[monster].description;
        // console.log(name);
        
        const div = document.createElement('div');
        div.dataset.id = id;

        div.innerHTML = `<ul>
            <li>${name}</li>
            <li>${age}</li>
            <li>${description}</li>
        </ul>`

        monstersDiv.appendChild(div);
    }
};

function createMonster(event) {
    event.preventDefault();
    
    const form = document.getElementById('monster-form');
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const description = document.getElementById('description');

    console.log(name);

    const body =  {
        name: name.value,
        age: age.value,
        description: description.value
    }

    console.log(body);
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(body)
    }

    fetch(MONSTERS_URL, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json));
}
