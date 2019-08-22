import { concat, join, kebabCase, replace } from 'lodash-es'
import cartesianProduct from './cartesianProduct'
import combination from './combination'
import getSentences from './getSentences'
import getWords from './getWords'
import shuffle from './shuffle'

/**
 * Generate the paragraphs of a given length.
 * @param {Number} length
 */
export default function generateParagraphs(length) {
  let [keywords, values] = getWords()
  let wCombinations = cartesianProduct(values[0], values[1], values[2])
  let sentences = getSentences()
  let sCombinations = sentences.length < length ? combination(sentences, sentences.length) : combination(sentences, length)
  let result = []

  for (let i = 0; i < wCombinations.length; i++) {
    let pickedSentences = shuffle(sCombinations[Math.floor(Math.random() * sCombinations.length)])

    replacedSentences = pickedSentences.map(s => {
      for (let j = 0; j < keywords.length; j++) {
        let replacement = j < 3 ? wCombinations[i][j] : values[j][Math.floor(Math.random() * values[j].length)]
        s = replace(s, new RegExp(`\\[${keywords[j]}\\]`, 'g'), replacement)
      }

      return s.charAt(0).toUpperCase() + s.substring(1)
    })

    let slug = `${wCombinations[i][0]}-${kebabCase(wCombinations[i][1])}-${wCombinations[i][2]}`
    let productSlug = kebabCase(wCombinations[i][1])
    let str = join(replacedSentences, ' ')

    result.push(concat(slug, productSlug, str))
  }

  return result
}
