import faker from 'faker'
import { spr } from './globals'

/**
 * Setup the words sheet.
 */
export function setupWSheet() {
  spr.insertSheet('Words', 0)
    .getRange('A1:C4')
    .setValues([
      ['KEYWORD 1', 'KEYWORD 2', 'KEYWORD 3'],
      [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      [faker.lorem.word(), faker.lorem.word(), null],
      [faker.lorem.word(), null, null]
    ])
    .getSheet()
    .getRange('A1:C1')
    .setFontWeight('bold')
}

/**
 * Setup the sentences sheet.
 */
export function setupSSheet() {
  spr.insertSheet('Sentences', 1)
    .getRange('A1:A3')
    .setValues([
      [`[KEYWORD 1] ${faker.lorem.word()} ${faker.lorem.word()} ${faker.lorem.word()} ${faker.lorem.word()}`],
      [`${faker.lorem.word()} ${faker.lorem.word()} ${faker.lorem.word()} ${faker.lorem.word()} [KEYWORD 2]`],
      [`${faker.lorem.word()} ${faker.lorem.word()} [KEYWORD 3] ${faker.lorem.word()} ${faker.lorem.word()}`]
    ])
    .getSheet()
    .autoResizeColumn(1)
    .deleteColumns(2, 25)
}

/**
 * Setup the paragraphs sheet.
 */
export function setupPSheet() {
  spr.insertSheet('Paragraphs', 2)
    .getRange('A1')
    .setValue('The generated paragraph will appear here')
    .getSheet()
    .autoResizeColumn(1)
    .deleteColumns(2, 25)
}
