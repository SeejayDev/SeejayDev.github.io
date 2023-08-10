function generateGroups(arrayOfPlayers, numberPerGroup) {
  shuffle(arrayOfPlayers)

  if (numberPerGroup > arrayOfPlayers.length) {
    alert(`Too few names added`)
    return
  }

  // generate the groups
  var arrayOfGroups = []
  var remainingPeople = arrayOfPlayers.length
  var index = 0
  while (remainingPeople >= numberPerGroup) {
    var newGroup = []
    for (let i = 0; i < numberPerGroup; i++) {
      newGroup.push(arrayOfPlayers[index])
      remainingPeople--
      index++
    }

    newGroup.sort()
    arrayOfGroups.push(newGroup)
  }

  var arrayOfExtras = []
  for (let i = 0; i < remainingPeople; i++) {
    indexFromBack = arrayOfPlayers.length - 1 - i
    arrayOfExtras.push(arrayOfPlayers[indexFromBack])
  }

  return { arrayOfGroups, arrayOfExtras }
}