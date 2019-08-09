/**
 * Heap's algorithm for generating permutations.
 * @param {Array<*>} arr 
 * @param {number} size 
 * @param {number} n 
 */
export function heapPermutation(arr, size, n) {
    let result = []

    // if size becomes 1 then prints the obtained permutation 
    if (size === 1)
        result.push(arr)

    for (let i = 0; i < size; i++) {
        heapPermutation(arr, size - 1, n)

        if (size % 2 == 1) { // if size is odd, swap first and last element 
            let temp = arr[0]
            arr[0] = arr[size - 1]
            arr[size - 1] = temp
        } else { // If size is even, swap ith and last element 
            let temp = arr[i]
            arr[i] = arr[size - 1]
            arr[size - 1] = temp
        }
    }

    return result
}