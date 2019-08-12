import { join } from 'lodash-es'
import { ui, pSheet } from './globals'
import { getSentences } from './getSentences'
import { heapPermutation } from './heapPermutation'

/**
 * The event handler triggered when opening the spreadsheet.
 */
function onOpen() {
    ui.createMenu('Paragrapher')
        .addItem('Generate paragraphs', 'generate')
        .addToUi()
}

/**
 * Generate the paragraphs.
 */
function generate() {
    let sentences = getSentences()

    if (sentences) {
        let permutations = heapPermutation(sentences)
        let paragraphs = permutations.map(p => [join(p, ' ')])

        pSheet.getRange(1, 1, paragraphs.length).setValues(paragraphs)
    }
}
