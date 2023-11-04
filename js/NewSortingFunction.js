console.log("Yes")

let players = ["A", "B", "C", "D", "E"]
console.log("Original list of players: ")
console.log(players)
console.log("")

let previousGroups = []
for (let i = 0; i < players.length - 1; i++) {
  let currentPlayer1 = players[i]

  for (let j = i + 1; j < players.length; j++) {
    let currentPlayer2 = players[j]

    let newGroup = [currentPlayer1, currentPlayer2]
    let newGroupString = JSON.stringify(newGroup)
    
    if (!previousGroups.includes(newGroupString)) {
      console.log(newGroup)
      break;
    }


  }

}
