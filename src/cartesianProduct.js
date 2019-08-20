import { flatten, map, reduce } from 'lodash-es'

/**
 * Calculate Cartesian product of multiple arrays.
 */
export default function cartesianProduct() {
  return reduce(arguments, (a, b) => {
    return flatten(map(a, x => {
      return map(b, y => x.concat([y]))
    }), true)
  }, [[]])
}
