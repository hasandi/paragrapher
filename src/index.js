import {flatten} from 'lodash-es'
import {heapPermutation} from './heapPermutation'

const dir = SpreadsheetApp.Direction
const ss = SpreadsheetApp.getActive()
const wordsSheet = ss.getSheetByName('Words')
const sentencesSheet = ss.getSheetByName('Sentences')
const paragraphs = ss.getSheetByName('Paragraphs')

/**
 * The event handler triggered when opening the spreadsheet.
 * @param e - the onOpen event
 */
function onOpen(e) {
    ui.createAddonMenu()
        .addItem('Generate paragraphs', 'generate')
        .addToUi()
}

function getSentences() {
    let lastRow = sentencesSheet.getRange('A1').getNextDataCell(dir.DOWN).getRow()

    return flatten(sentencesSheet.getRange(1, 1, lastRow, 1).getValues())
}

function generate() {
    let sentences = getSentences()

    heapPermutation(sentences, sentences.length, sentences.length)
}