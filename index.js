const url ='http://localhost:3000/burgers'
let allBurgers = []
document.addEventListener("DOMContentLoaded", () => {
  let menu = document.querySelector('#burger-menu')
  let orderList = document.querySelector('#order-list')
  let customBurger = document.querySelector('#custom-burger')



  function postBurger(e){
  e.preventDefault()
  let burgerNameInput = document.querySelector('#burger-name').value
  let burgerImgInput = document.querySelector('#burger-image').value
  let burgerDescInput = document.querySelector('#burger-description').value
  fetch(url, {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       Accept: "application/json"
    },
    body: JSON.stringify({
      name: burgerNameInput,
      description: burgerDescInput,
      image: burgerImgInput
    })
  })
  .then(r => r.json())
  .then(r => {
    appendOneBurgerToDom(r)
    addBurgerToList(r)
  })
}
  function addBurgerToList(burger){
      orderList.innerHTML += `
      <li>${burger.name}</li>
      `
    }
  function findMyBurger(e){
    if (e.target.dataset.id){
      let myBurger = allBurgers.find(burger => {
        return burger.id == e.target.dataset.id
      })
      addBurgerToList(myBurger)
    }
  }
  function appendOneBurgerToDom(burger){
    menu.innerHTML += `
    <div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
        <img src="${burger.image}">
        <p class="burger_description">
          ${burger.description}
        </p>
        <button data-id=${burger.id} class="button">Add to Order</button>
    </div>
    `
  }
  function loopThroughBurgers(r){
    r.forEach(burger => {
      appendOneBurgerToDom(burger)
    })
  }
  function fetchBurgers(){
    fetch(url)
    .then(r => r.json())
    .then(r => {
      allBurgers = r
      loopThroughBurgers(allBurgers)
    })
  }


  customBurger.addEventListener('submit', postBurger)
  menu.addEventListener('click', findMyBurger)
  fetchBurgers()
})
