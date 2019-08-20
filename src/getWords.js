import { flatten, isEmpty } from 'lodash-es'
import { dir, ui, wSheet } from './globals'

/**
 * Get all words defined in 'Words' sheet.
 */
export default function getWords() {
  if (isEmpty(wSheet.getRange('A:A').getValue())) {
    ui.alert('Error', 'Words cannot be empty. Please define the words in the \'Words\' sheet.', ui.ButtonSet.OK)

    return false
  }

  let lastCol = wSheet.getRange('A1').getNextDataCell(dir.NEXT).getColumn()
  let keys = flatten(wSheet.getRange(1, 1, 1, lastCol).getValues())
  let values = []

  for (i = 1; i <= lastCol; i++) {
    let lastRow = wSheet.getRange(2, i).getNextDataCell(dir.DOWN).getRow()
    let data = flatten(wSheet.getRange(2, i, lastRow - 1, 1).getValues())

    values.push(data)
  }

  return [keys, values]
}
