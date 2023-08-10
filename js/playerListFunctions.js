const PLAYER_LIST = "playerList"

function fetchPlayerList() {
  var playerListRaw = localStorage.getItem(PLAYER_LIST)

  // check if the item exists
  if (playerListRaw === null) {
    // if it does not exist yet, set it as an empty array
    localStorage.setItem(PLAYER_LIST, JSON.stringify([]))

    // and return an empty array
    return []
  }

  // if the item exists, parse it
  var playerList = JSON.parse(playerListRaw)
  return [...playerList]
}

function addToPlayerList(newPlayer) {
  var currentList = fetchPlayerList()

  newPlayer = newPlayer.toUpperCase()
  // check if name already exists
  if (currentList.indexOf(newPlayer) >= 0) {
    alert("Duplicate player name")
  } else {
    currentList.push(newPlayer)
    localStorage.setItem(PLAYER_LIST, JSON.stringify(currentList))
    displayPlayerList()
  }
}

function removeFromPlayerList(index) {
  var currentList = fetchPlayerList()

  var confirmAction = confirm("Are you sure you want to remove " + currentList[index] + " from the list?")
  if (confirmAction) {
    currentList.splice(index, 1)
    localStorage.setItem(PLAYER_LIST, JSON.stringify(currentList))
    displayPlayerList()
  }
}

function editPlayerList(index, value) {
  var currentList = fetchPlayerList()
  currentList[index] = value
  localStorage.setItem(PLAYER_LIST, JSON.stringify(currentList))
}

function clearPlayerList() {
  localStorage.removeItem(PLAYER_LIST)
  displayPlayerList()
}

// function to display the players
function displayPlayerList() {
  var playerList = fetchPlayerList()
  var playerListDiv = document.getElementById("container-players")
  var playerCountTag = document.getElementById("player-count")

  var html = ""
  if (playerList.length > 0) {
    playerListDiv.classList.remove("hidden")
    for (let i = 0; i < playerList.length; i++) {
      var playerName = playerList[i]
      html += `
        <div class="py-1 flex items-center justify-between">
          <p class="uppercase font-bold text-lg">${playerName}</p>
          <button class="text-red-600 w-8 h-8" onclick="removeFromPlayerList(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full rotate-45" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"/></svg>
          </button>
        </div>
      `
    }

    playerCountTag.innerText = playerList.length
  } else {
    playerListDiv.classList.add("hidden")
    playerCountTag.innerText = 0
  }

  playerListDiv.innerHTML = html
}
