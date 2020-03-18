document.addEventListener("DOMContentLoaded", function() {
    const monsterContainer = document.getElementById('monster-container')
    const createMonster = document.getElementById('create-monster')
    const monstForm = document.createElement("FORM")
    monstForm.onsubmit = addMonster

    const forwardBtn = document.getElementById('forward')
    const backBtn = document.getElementById('back')
    let pageNum = 1

    

    // Forward Button
    forwardBtn.addEventListener("click", function() {
        monsterContainer.innerHTML = ''
        fetchMonsters(++pageNum).then(listMonsters)
    })

    // Back Button
    backBtn.addEventListener("click", function() {
        monsterContainer.innerHTML = ''
        fetchMonsters(--pageNum).then(listMonsters)
    })

    // Create monster form
    monstForm.innerHTML = `<label for=name">Name:</label>
    <input type="text" id="name" name="name">
    <label for="age">Age:</label>
    <input type="number" id="age" name="age">
    <label for="description">Bio:</label>
    <input type="text-area" id="description" name="description">
    <input type="submit">`
    createMonster.appendChild(monstForm)

    fetchMonsters(pageNum).then(listMonsters)

    // Fetch all monsters
    function fetchMonsters(pageNum) {
        return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
       .then(response => response.json())
       }
    // List all monsters
    function listMonsters(monsters) {
        monsters.forEach(monster => listMonster(monster))
    }

    // List one monster
    function listMonster(monster) {
        const monsterDiv = document.createElement('div')
        monsterContainer.append(monsterDiv)
        monsterDiv.innerHTML = `
        <div>
            <h2>${monster.name}</h2>
            <ul>
            <li>Age: '${monster.age}'</li>
            <li>Bio: '${monster.description}'</li>
            </ul>
        </div>`
    }

  

    // POST Request from monster form
    function addMonster(event){
        event.preventDefault();
        const form = event.target;
        const formData = {
            name: form.name.value,
            age: form.age.value,
            description: form.description.value
        };

        const options = {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData),
        };

        fetch("http://localhost:3000/monsters/", options)
        .then(response => response.json)
        .then(data => {
            console.log(data)
        })
    }
});