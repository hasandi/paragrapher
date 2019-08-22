import { flattenDepth, slice } from 'lodash-es'

/**
 * The main function to store and return the results.
 * @param {Array<*>} arr
 * @param {Number} r
 */
function combination(arr, r, n = arr.length) {
  let data = []
  let x = combinationUtil(arr, data, 0, n - 1, 0, r)

  return flattenDepth(x, r - 1)
}

/**
 * Generate and return all possible combinations of r elements in array.
 * @param {Array<*>} arr
 * @param {Array<*>} data
 * @param {Number} start
 * @param {Number} end
 * @param {Number} index
 * @param {Number} r
 */
function combinationUtil(arr, data, start, end, index, r) {
  let result = []

  if (index === r) return slice(data, 0, r)

  for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
    data[index] = arr[i]
    result.push(combinationUtil(arr, data, i + 1, end, index + 1, r))
  }

  return result
}

export default combination
