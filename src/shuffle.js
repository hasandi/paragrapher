/**
 * Shuffles an array.
 * @param {Array<*>} arr
 */
export default function shuffle(arr) {
  var curIdx = arr.length, tempVal, randIdx

  // While there remain elements to shuffle
  while (0 !== curIdx) {

    // Pick a remaining element
    randIdx = Math.floor(Math.random() * curIdx)
    curIdx -= 1

    // And swap it with the current element
    tempVal = arr[curIdx]
    arr[curIdx] = arr[randIdx]
    arr[randIdx] = tempVal
  }

  return arr
}
