let players = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

var previousGroups = [];
let numberOfRounds = players.length % 2 === 0 ? players.length - 1 : players.length
for (let index = 0; index < numberOfRounds; index++) {
  let generatedPairs = [];
  let playerList = [...players];

  while (playerList.length > 2) {
    let tempGroup = [];

    let player1 = playerList.shift();
    tempGroup.push(player1);

    let groupFormed = false
    for (let i = 0; i < playerList.length; i++) {
      tempGroup[1] = playerList[i];

      let tempGroupString = JSON.stringify(tempGroup);
      let previousGroupsString = JSON.stringify(previousGroups);
      if (!previousGroupsString.includes(tempGroupString)) {
        // if unique, add to list
        generatedPairs.push(tempGroup);
        playerList.splice(i, 1);
        groupFormed = true
        break;
      } else {
        continue
      }
    }

    // TODO: check if better way to handle this
    if (!groupFormed) {
      playerList.push(player1)
    }
  }
  console.log("Player List for final group: " + playerList)
  let finalGroup = [];
  for (let i = 0; i < playerList.length; i++) {
    finalGroup.push(playerList[i]);
  }

  // check if the final group is a duplicate
  let finalGroupString = JSON.stringify(finalGroup);
  let previousGroupsString = JSON.stringify(previousGroups);
  if (previousGroupsString.includes(finalGroupString)) {
    for (let i = generatedPairs.length - 1; i >= 0; i--) {
      let pairToMix = generatedPairs[i];
      console.log("Attempting to mix with " + pairToMix);

      // check if the duplicated group is 1 or 2 people
      if (finalGroup.length === 1) {
        // mix the extra person with the first person of the pair
        let newGroup1 = JSON.stringify([pairToMix[0], finalGroup[0]]);
        let newGroup2 = JSON.stringify([pairToMix[1]]);
        let combinationInvalid =
          previousGroupsString.includes(newGroup1) ||
          previousGroupsString.includes(newGroup2);

        if (combinationInvalid) {
          // mix the extra person with the second person of the pair
          newGroup1 = JSON.stringify([pairToMix[1], finalGroup[0]]);
          newGroup2 = JSON.stringify([pairToMix[0]]);
          combinationInvalid =
            previousGroupsString.includes(newGroup1) ||
            previousGroupsString.includes(newGroup2);

          if (!combinationInvalid) {
            // replace the group that was used with the newly formed group
            generatedPairs[i] = JSON.parse(newGroup1);
            generatedPairs.push(JSON.parse(newGroup2));

            // exit the loop
            break;
          }
        } else {
          // if the first combination of players produces unique pairings

          // replace the group that was used with the newly formed group
          generatedPairs[i] = JSON.parse(newGroup1);
          generatedPairs.push(JSON.parse(newGroup2));

          // exit the loop
          break;
        }
      } else if (finalGroup.length === 2) {
        let newGroup1 = JSON.stringify([pairToMix[0], finalGroup[0]]);
        let newGroup2 = JSON.stringify([pairToMix[1], finalGroup[1]]);
        let combinationInvalid =
          previousGroupsString.includes(newGroup1) ||
          previousGroupsString.includes(newGroup2);

        if (combinationInvalid) {
          // mix the extra person with the second person of the pair
          newGroup1 = JSON.stringify([pairToMix[0], finalGroup[1]]);
          newGroup2 = JSON.stringify([pairToMix[1], finalGroup[0]]);
          combinationInvalid =
            previousGroupsString.includes(newGroup1) ||
            previousGroupsString.includes(newGroup2);

          if (!combinationInvalid) {
            // replace the group that was used with the newly formed group
            generatedPairs[i] = JSON.parse(newGroup1);
            generatedPairs.push(JSON.parse(newGroup2));

            // exit the loop
            break;
          }
        } else {
          // if the first combination of players produces unique pairings

          // replace the group that was used with the newly formed group
          generatedPairs[i] = JSON.parse(newGroup1);
          generatedPairs.push(JSON.parse(newGroup2));

          // exit the loop
          break;
        }
      }
    }
  } else {
    generatedPairs.push(finalGroup);
  }

  previousGroups = previousGroups.concat(generatedPairs);

  console.log("Round " + index);
  console.log(generatedPairs);
}
