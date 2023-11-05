let playerList = ["A", "B", "C", "D", "E", "F"]
let generatedPairs = []
let previousGroups = [[ 'A', 'B' ], [ 'C', 'D' ], [ 'E', 'F' ], [ 'A', 'C' ], [ 'B', 'E' ], [ 'D', 'F' ], [ 'A', 'D' ], [ 'B', 'F' ], [ 'C', 'E' ], [ 'A', 'E' ], [ 'B', 'D' ], [ 'C', 'F' ]]
while (playerList.length > 2) {
  let tempGroup = []

  let player1 = playerList.shift()
  tempGroup.push(player1)

  for (let i = 0; i < playerList.length; i++) {
    tempGroup[1] = playerList[i]

    let tempGroupString = JSON.stringify(tempGroup)
    let previousGroupsString = JSON.stringify(previousGroups)
    if (!previousGroupsString.includes(tempGroupString)) {
      // if unique, add to list
      generatedPairs.push(tempGroup)
      playerList.splice(i, 1)
      break;
    } else {
      continue
    }
  }
}
let finalGroup = []
for (let i = 0; i < playerList.length; i++) {
  finalGroup.push(playerList[i])
}

// check if the final group is a duplicate
let finalGroupString = JSON.stringify(finalGroup)
let previousGroupsString = JSON.stringify(previousGroups)
if (previousGroupsString.includes(finalGroupString)) {
  console.log(finalGroup + " is a repeated group.")
  for (let i = generatedPairs.length - 1; i >= 0; i--) {
    let pairToMix = generatedPairs[i]
    console.log("Attempting to mix with " + pairToMix)

    // check if the duplicated group is 1 or 2 people
    if (finalGroup.length === 1) {
      // mix the extra person with the first person of the pair
      let newGroup1 = JSON.stringify([pairToMix[0], finalGroup[0]])
      let newGroup2 = JSON.stringify([pairToMix[1]])
      let combinationInvalid = previousGroupsString.includes(newGroup1) || previousGroupsString.includes(newGroup2)

      if (combinationInvalid) {
        // mix the extra person with the second person of the pair
        newGroup1 = JSON.stringify([pairToMix[1], finalGroup[0]])
        newGroup2 = JSON.stringify([pairToMix[0]])
        combinationInvalid = previousGroupsString.includes(newGroup1) || previousGroupsString.includes(newGroup2)
      } else {
        // if the first combination of players produces unique pairings

        // replace the group that was used with the newly formed group
        generatedPairs[i] = JSON.parse(newGroup1)
        generatedPairs.push(JSON.parse(newGroup2))

        // exit the loop
        break;
      }
    } else if (finalGroup.length === 2) {
      let newGroup1 = JSON.stringify([pairToMix[0], finalGroup[0]])
      let newGroup2 = JSON.stringify([pairToMix[1], finalGroup[1]])
      let combinationInvalid = previousGroupsString.includes(newGroup1) || previousGroupsString.includes(newGroup2)

      if (combinationInvalid) {
        // mix the extra person with the second person of the pair
        newGroup1 = JSON.stringify([pairToMix[0], finalGroup[1]])
        newGroup2 = JSON.stringify([pairToMix[1], finalGroup[0]])
        combinationInvalid = previousGroupsString.includes(newGroup1) || previousGroupsString.includes(newGroup2)

        if (!combinationInvalid) {
                  // replace the group that was used with the newly formed group
        generatedPairs[i] = JSON.parse(newGroup1)
        generatedPairs.push(JSON.parse(newGroup2))

        // exit the loop
        break;
        }

      } else {
        // if the first combination of players produces unique pairings

        // replace the group that was used with the newly formed group
        generatedPairs[i] = JSON.parse(newGroup1)
        generatedPairs.push(JSON.parse(newGroup2))

        // exit the loop
        break;
      }
    }
  }
} else {
  generatedPairs.push(finalGroup)
}

console.log(generatedPairs)