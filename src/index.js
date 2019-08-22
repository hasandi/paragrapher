import { includes } from 'lodash-es'
import { ui, pSheet, spr } from './globals'
import { setupWSheet, setupSSheet, setupPSheet } from './setup'
import generateParagraphs from './generateParagraphs'

/**
 * The event handler triggered when opening the spreadsheet.
 */
function onOpen() {
  ui.createMenu('Paragrapher')
    .addItem('Quick setup', 'setup')
    .addItem('Generate paragraphs', 'start')
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
function start() {
  let res = ui.prompt('Sentences', 'Please input number of sentences to generate (1-7)', ui.ButtonSet.OK)

  if (res.getSelectedButton() == ui.Button.OK) {
    let resVal = parseInt(res.getResponseText())

    if (resVal) {
      if (resVal > 0 && resVal <= 7) {
        let paragraphs = generateParagraphs(resVal)

        pSheet.clear()
          .getRange(1, 1, 1, paragraphs[0].length)
          .setValues([['slug', 'product_slug', 'article']])
          .getSheet()
          .getRange(2, 1, paragraphs.length, paragraphs[0].length)
          .setValues(paragraphs)
          .getSheet()
          .autoResizeColumns(1, paragraphs[0].length + 1)
          .activate()
      } else {
        ui.alert('Error', 'Invalid number of sentences. Inputted number must be between 1 and 7.', ui.ButtonSet.OK)
      }
    } else {
      ui.alert('Error', 'Invalid number of sentences. Please only input number.', ui.ButtonSet.OK)
    }

    ui.showModalDialog(HtmlService.createHtmlOutput(`<code><pre>${Logger.getLog()}</pre></code>`), 'Log')
  }
}
