

console.log('%c Welcome to Toy Tale!', 'color: firebrick')
document.addEventListener("DOMContentLoaded", setupPage)

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


function createToy(name, image, likes) {
    return fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            image: image,
            likes: likes
        })
    }).then(function (response) {
        return response.json()
    })
}


function renderToy(toy) {
    let div = document.querySelector('#toy-collection')
    let toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    let toyName = document.createElement('h2')
    toyName.innerHTML = toy.name
    let toyImg = document.createElement('img')
    toyImg.src = toy.image
    toyImg.className = 'toy-avatar'
    let toyLikes = document.createElement('p')
    toyLikes.textContent = `${toy.likes} Likes`
    let likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn'
    likeBtn.textContent = 'Like <3'
    toyDiv.appendChild(toyName)
    toyDiv.appendChild(toyImg)
    toyDiv.appendChild(toyLikes)
    toyDiv.appendChild(likeBtn)
    div.appendChild(toyDiv)
    return div;
}


function assignToy (event) {
    event.preventDefault();
    let name = event.target.name.value
    let image = event.target.image.value
    let likes = 0
    createToy(name, image, likes).then(renderToy)
}

function addFormHandler() {
    addBtn.addEventListener('click', () => {
        // hide & seek with the form
        addToy = !addToy
        if (addToy) {
            toyForm.style.display = 'block'
            let form = document.querySelector("form");
            form.addEventListener('submit', assignToy)
        } else {
            toyForm.style.display = 'none'
        }
    })
}

function patchFetch(event, id, likes) {
    return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({likes: likes + 1}),
    })
    .then(res => res.json())
    .then(res => {
        event.target.parentElement.querySelector('p').innerText = `${likes + 1} Likes`
        event.target.dataset.likes = likes + 1

    })
}

function updateLikes (event) {
    patchFetch(event, event.target.id, parseInt(event.currentTarget.likes))
}


function renderToys(toys){
    let div = document.querySelector('#toy-collection')
    toys.forEach(function (toy){
        let toyDiv = document.createElement('div')
        toyDiv.className = 'card'

        let toyName = document.createElement('h2')
        toyName.innerHTML = toy.name

        let toyImg = document.createElement('img')
        toyImg.src = toy.image
        toyImg.className = 'toy-avatar'

        let toyLikes = document.createElement('p')
        toyLikes.textContent = `${toy.likes} Likes`

        let likeBtn = document.createElement('button')
        likeBtn.className = 'like-btn'
        likeBtn.id = toy.id
        likeBtn.likes = toy.likes
        likeBtn.textContent = 'Like <3'
        likeBtn.addEventListener('click', updateLikes);

        toyDiv.appendChild(toyName)
        toyDiv.appendChild(toyImg)
        toyDiv.appendChild(toyLikes)
        toyDiv.appendChild(likeBtn)
        div.appendChild(toyDiv)
    });
    return div
}

function getToys(){
    fetch('http://localhost:3000/toys').then(res => res.json()).then(res => {renderToys(res)});
}

function setupPage() {
    addFormHandler()
    getToys()
}
