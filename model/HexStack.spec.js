/**
 * Unit testing for Hexstack.js
 */
import HexStack from './HexStack'

test('I can create an empty stack', () => {
  expect(new HexStack().values).toEqual([])
})
