

// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, but Im not.');
  
  let page = 1;
  const URL = `http://localhost:3000/monsters?_limit=50&_page=`;

  const listUl = document.createElement('ul');

  document.addEventListener('click', (e) => {
    if (e.target.id === 'forward') {
      console.log('forward');
      
      page += 1;
    } else if (e.target.id === 'back' && page > 0) {
      page -= 1;
    }
    fetchMonsters();
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    let {name, age, description} = e.target
    console.log(name.value);
    fetch('http://localhost:3000/monsters',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
       body: JSON.stringify({                  // body: v. data: in config
        name: name.value,
        age: age.value,
        description: description.value
      }),
      })
      .then((res) => res.json())
      .then((json) => {
        let { name, age, description, id } = json;
        const liEl = document.createElement('li');
        liEl.innerHTML = `<strong>${id}. ${name}</strong> - Age:${age}  <p>Description:${description}</p>`;
        listUl.append(liEl);
        console.log('done');
        
      });
  });

  function fetchMonsters() {
    
    console.log(`${URL}${page}`);
    
    listUl.innerText = '';
    fetch(`${URL}${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      })
      .then((res) => res.json())
      .then((json) => renderMonsters(json));
  }

  function renderMonsters(monsters) {
    document.querySelector('#monster-container').appendChild(listUl);
    monsters.map(monster => {
      // debugger
      const { name, age, description, id } = monster;
      const liEl = document.createElement('li');
      liEl.innerHTML = `<strong>${id}. ${name}</strong> - Age:${age}  <p>Description:${description}</p>`;
      listUl.append(liEl);
    });
  }






  fetchMonsters();
});
