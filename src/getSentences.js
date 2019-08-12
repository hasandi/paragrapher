import { flatten, isEmpty } from 'lodash-es'
import { dir, ui, sSheet } from './globals'

/**
 * Get all sentences defined in 'Sentences' sheet.
 */
export function getSentences() {
    if (isEmpty(sSheet.getRange('A:A').getValue())) {
        ui.alert('Error', 'Sentences cannot be empty. Please define the sentences in the \'Sentences\' sheet.', ui.ButtonSet.OK)

        return false
    }

    let lastRow = sSheet.getRange('A1').getNextDataCell(dir.DOWN).getRow()

    return flatten(sSheet.getRange(1, 1, lastRow, 1).getValues())
}