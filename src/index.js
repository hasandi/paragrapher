import { concat, includes, join, replace } from 'lodash-es'
import { ui, pSheet, spr } from './globals'
import cartesianProduct from './cartesianProduct'
import getWords from './getWords'
import getSentences from './getSentences'
import heapPermutation from './heapPermutation'
import { setupWSheet, setupSSheet, setupPSheet } from './setup';

/**
 * The event handler triggered when opening the spreadsheet.
 */
function onOpen() {
  ui.createMenu('Paragrapher')
    .addItem('Quick setup', 'setup')
    .addItem('Generate paragraphs', 'generateParagraphs')
    .addToUi()
}

/**
 * Setup the required sheets.
 */
function setup() {
  let shtNames = spr.getSheets().map(sht => sht.getName())

  if (!includes(shtNames, 'Words')) setupWSheet()
  if (!includes(shtNames, 'Sentences')) setupSSheet()
  if (!includes(shtNames, 'Paragraphs')) setupPSheet()
}

/**
 * Generate the paragraphs.
 */
function generateParagraphs() {
  let [keywords, values] = getWords()
  let sentences = getSentences()
  let permutations = heapPermutation(sentences)
  let combinations = cartesianProduct(...values)
  let result = []

  for (let i = 0; i < combinations.length; i++) {
    let str = join(permutations[Math.floor(Math.random() * permutations.length)], ' ')

    for (let j = 0; j < keywords.length; j++) {
      str = replace(str, new RegExp(`\\[${keywords[j]}\\]`, 'g'), combinations[i][j])
    }

    result.push(concat(combinations[i], [str]))
  }

  // Logger.log(concat(keywords, 'Result'))

  pSheet.clear()
    .getRange(1, 1, 1, keywords.length + 1)
    .setValues([concat(keywords, 'Result')])
    .getSheet()
    .getRange(2, 1, result.length, keywords.length + 1)
    .setValues(result)
    .getSheet()
    .autoResizeColumns(1, keywords.length + 1)
    .activate()

  // ui.showModalDialog(HtmlService.createHtmlOutput(`<code><pre>${Logger.getLog()}</pre></code>`), 'Log')
}
