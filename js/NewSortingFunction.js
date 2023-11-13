let players = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

// the number of unique partners that each player could have
let numberOfRounds = players.length % 2 === 0 ? players.length - 1 : players.length;

// initialize the list of generated groups
var previousGroups = [];

// generate all possible rounds
for (let index = 0; index < numberOfRounds; index++) {
  // initialize the list of pairs
  let generatedPairs = [];

  // create a copy of the player list to be manipulated
  let playerList = [...players];

  // form pairs as long as there are players available
  while (playerList.length > 2) {
    // grab the first player in the list to form part of the pair
    let tempPair = [];
    let player1 = playerList.shift();
    tempPair.push(player1);

    // create a flag to determine if the first player in the list can form a unique pair or not.
    let groupFormed = false

    // iterate through the remaining players
    // GOAL: find a partner that the person has not played with
    for (let i = 0; i < playerList.length; i++) {
      // add the iterated player to the pair
      tempPair[1] = playerList[i];

      // sort the players' names to keep the order of appearance consistent across rounds
      tempPair.sort()

      // convert the pair into a string for comparison
      let tempPairString = JSON.stringify(tempPair);
      let previousGroupsString = JSON.stringify(previousGroups);
      
      // check if the pair has been formed before
      if (!previousGroupsString.includes(tempPairString)) {
        // if the pair is unique, add them to the round's list of pairs
        generatedPairs.push(tempPair);

        // remove the second player from the list of players
        playerList.splice(i, 1);

        // mark the formation of the pair
        groupFormed = true

        // stop iterating the list, exit the loop
        break;
      }
    }

    // If the player has no possible partners, push them to the back of the list
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
