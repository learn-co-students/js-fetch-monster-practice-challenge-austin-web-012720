document.addEventListener("DOMContentLoaded", function() {
  const monsterContainer = document.getElementById('monster-container')
  const createMonster = document.getElementById('create-monster')
  const monstForm = document.createElement("FORM")
  monstForm.onsubmit = addMonster
  const nextBtn = document.getElementById('forward')
  let pageNum = 1
  nextBtn.addEventListener('click', function(){
    monsterContainer.innerHTML = ''
    fetchMonsters(++pageNum).then(listMonster)
  }) 
  const backBtn = document.getElementById('back')
  backBtn.addEventListener('click', function(){
    monsterContainer.innerHTML = ''
    fetchMonsters(--pageNum).then(listMonster)
  }) 

  createMonster.appendChild(monstForm)
  monstForm.innerHTML = `
    <label for=name">Name:</label><br>
    <input type="text" id="name" name="name"><br>
    <label for="age">Age:</label><br>
    <input type="number" id="age" name="age"><br>
    <label for=description">Description:</label><br>
    <input type="text-area" id="description" name="description"><br>
    <input type="submit">
    `

  fetchMonsters(pageNum).then(listMonster)

  function fetchMonsters(pageNum) {
    return fetch(`http://localhost:3000/monsters/?_limit=2&_page=${pageNum}`) 
    .then(resp => resp.json())
  }

  function listMonster(data) {
    data.forEach(monster => listMonsters(monster))
  }
  
  function listMonsters(m) {
    const monsterDiv = document.createElement('div')
    monsterContainer.append(monsterDiv)

    monsterDiv.innerHTML = `
    <div>
      <h2>${m.name}</h2>
        <ul>
          <li>Age: ${m.age}</li>
          <li>Description: ${m.description}</li>
        </ul>
    </div>
    `
  }

  function addMonster(event){
    event.preventDefault();
    const form = event.target;

    const formData = {
      name: form.name.value,
      age: form.age.value,
      description: form.description.value,
    };
    console.log(formData)
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    };
    fetch('http://localhost:3000/monsters/', options)
    .then(response => response.json)
    .then(data => {
      console.log(data)
    })
}

});
