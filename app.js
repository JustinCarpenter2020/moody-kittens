/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
function toggleHidden(element) {
  element.hidden = !element.hidden
}
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function generateKittenParams() {
  let punkLevel = Math.floor(Math.random() * 100) + 1
  let mood = setKittenMood(punkLevel)

  return ({
    punkLevel: punkLevel,
    mood: mood
  })

}


function addKitten(event) {

  event.preventDefault();
  let form = event.target;
  let params = generateKittenParams()
  let num = params.punkLevel
  let mood = params.mood

  let kitten = {
    id: generateId(),
    name: form.name.value,
    role: form.role.value,
    punkLevel: num,
    mood: mood,
    imgURL: "https://robohash.org/" + form.name.value + "?set=set4"
  }

  kittens.push(kitten)
  saveKittens()
  form.reset()

}
/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  let deleteButton = document.getElementById("deleteButton")
  if (storedKittens.length > 0) {
    deleteButton.hidden = false;
    kittens = storedKittens
  } else {
    deleteButton.hidden = true;
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElement = document.getElementById("kittens")
  let kittenTemplate = ""
  kittens.forEach(kitten => {
    if (kitten.punkLevel === "POSER") {
      kittenTemplate += `
    <div class="kitten card ${kitten.mood}">
           <img src=${kitten.imgURL}>
           <p>${kitten.name}</p>
           <p>${kitten.role}</p>
           <p>Punk Level: ${kitten.punkLevel}</p>
    </div>       
      `
    } else {

      kittenTemplate += `
      <div class="kitten card ${kitten.mood}">
      <img src=${kitten.imgURL}>
      <p>${kitten.name}</p>
      <p>${kitten.role}</p>
      <p>Punk Level: ${kitten.punkLevel}</p>
      <button onclick="playItSafe(${kitten.id})">Play it safe </button>
      <button onclick="stickItToTheMan(${kitten.id})">Stick it to the man </button>
      </div>       
      `
    }
  })
  kittensElement.innerHTML = kittenTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function playItSafe(id) {
  console.log(id)
  let kitten = findKittenById(id)
  kitten.punkLevel++
  let newMood = setKittenMood(kitten.punkLevel)
  kitten.mood = newMood
  saveKittens()
}


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function stickItToTheMan(id) {
  let kitten = findKittenById(id)
  let num = Math.floor(Math.random() * 100)
  if (num >= 75) {
    kitten.punkLevel += 20;
  } else if (num < 75) {
    kitten.punkLevel -= 20;
  }

  if (kitten.punkLevel <= 0) {
    kitten.punkLevel = "POSER"
  }
  let newMood = setKittenMood(kitten.punkLevel)
  kitten.mood = newMood
  saveKittens()
}


/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(punkLevel) {
  if (punkLevel === "POSER") {
    return ("poser")
  }
  if (punkLevel <= 0) {
    return ("poser")
  } else if (punkLevel <= 25) {
    return ("angry")
  } else if (punkLevel <= 50) {
    return ("tolerant")
  } else if (punkLevel > 50) {
    return ("happy")
  }
}

function getStarted() {
  document.getElementById("welcome").remove();
  var form = document.getElementById("kitten-form")
  toggleHidden(form)
  drawKittens();
}

function deleteKittens() {
  kittens = []
  saveKittens()
  loadKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, role: string, punkLevel: any}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000)
  );
}
loadKittens()
drawKittens()