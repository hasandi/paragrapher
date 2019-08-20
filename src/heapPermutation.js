/**
 * Heap's algorithm for generating permutations.
 * @param {Array<*>} arr
 * @param {number} n
 */
export default function heapPermutation(arr, n = arr.length) {
    let result = []

    if (n <= 1) return [arr.slice()]

    for (let i = 0; i <= n - 1; i++) {
        result.push(...heapPermutation(arr, n - 1))

        if (n % 2 === 0) // if size is even, swap ith and last element
            [arr[n - 1], arr[i]] = [arr[i], arr[n - 1]]
        else // if size is odd, swap first and last element
            [arr[n - 1], arr[0]] = [arr[0], arr[n - 1]]
    }

    return result;
}
