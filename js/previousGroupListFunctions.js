const PREVIOUS_GROUPS_LIST = "previousGroupList"

function fetchPreviousGroupList() {
  var groupList = localStorage.getItem(PREVIOUS_GROUPS_LIST)

  // check if the item exists
  if (groupList === null) {
    // if it does not exist yet, set it as an empty array
    localStorage.setItem(PREVIOUS_GROUPS_LIST, JSON.stringify([]))

    // and return an empty array
    return []
  }

  // if the item exists, parse it
  var groupList = JSON.parse(groupList)
  return [...groupList]
}

function addToPreviousGroupList(groupList) {
  var currentList = fetchPreviousGroupList()
  var newList = currentList.concat(groupList)
  localStorage.setItem(PREVIOUS_GROUPS_LIST, JSON.stringify(newList))
}


function clearPreviousGroupList() {
  localStorage.removeItem(PREVIOUS_GROUPS_LIST)
}