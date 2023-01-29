import data from "./data.json" assert { type: "json" }

console.log(data)
const main = document.getElementById("main")
const headerContainer = document.createElement("div")
headerContainer.classList.add("header")
const navBtn = document.createElement("button")
navBtn.classList.add("nav-btn")

headerContainer.innerHTML = `<h3>${data.title}</h3>`
navBtn.innerHTML = '<i class="fas fa-bars fa-2xl"></i>'
navBtn.addEventListener("click", handleNav)

function handleNav() {
  const nav = document.createElement("div")
  nav.classList.add("nav")
  nav.innerHTML = `<div class="nav-container visible">
  <div class="nav nav-black visible">
  <div class="nav nav-red visible">
  <div class="nav nav-white visible"><button id="nav-close">X</button>
  </div></div></div></div>
  `
  main.appendChild(nav)
}

main.appendChild(headerContainer)
headerContainer.appendChild(navBtn)

function createCard() {
  const cards = data.card
  const cardContainer = document.createElement("div")
  cardContainer.classList.add("card-container")
  main.appendChild(cardContainer)
  cards.map((card) => {
    const cardEl = `
    <div class="card">
    <span>${card.text}</span>
    <div class=image-container>
    <img src=${card.imgUrl} alt="image"/>
    </div>
    <a href=${card.srcUrl}>${card.btn_lbl}</a>
    </div>
    </div>`
    cardContainer.innerHTML += cardEl
  })
}
createCard()

const navCloseBtn = document.getElementsById("nav-close")
navCloseBtn.addEventListener("click", closeNav)

function closeNav() {
  alert("lkdsjakdj")
}
