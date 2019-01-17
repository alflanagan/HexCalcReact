/**
 * Unit testing for Hexstack.js
 */
import HexStack from './HexStack'
const bigInt = require('big-integer')

function getValues (stack) {
  const arr = []
  let value = stack.pop()
  while (value !== null) {
    arr.push(value)
    value = stack.pop()
  }
  return arr
}

test('I can create an empty stack.', () => {
  expect(getValues(Object.create(HexStack).init())).toEqual([])
})

test('I can create a stack from an array of integers.', () => {
  const newStack = Object.create(HexStack).init([1, 2, 3, 4])
  // alas, toolchain chokes on '4n' literal
  expect(getValues(newStack)).toEqual([bigInt(4), bigInt(3), bigInt(2), bigInt(1)])
})

test('I can create a stack from an array of strings.', () => {
  const newStack = Object.create(HexStack).init(['FACE', 'BEEF', 'BAD'])
  expect(getValues(newStack)).toEqual([bigInt(0xBAD), bigInt(0xBEEF), bigInt(0xFACE)])
  // either with or without '0x' prefix works
  const newStack2 = Object.create(HexStack).init(['0xFACE', '0xBEEF', '0xBAD'])
  expect(getValues(newStack2)).toEqual([bigInt(0xBAD), bigInt(0xBEEF), bigInt(0xFACE)])
})

test('Creating a stack fails if iterator returns neither a number or string.', () => {
  const newStack = Object.create(HexStack)
  expect(() => { newStack.init([{ value: '1234' }]) }).toThrow(TypeError)
})

test('Creating a stack fails if given a non-hexadecimal string.', () => {
  const newStack = Object.create(HexStack)
  expect(() => { newStack.init(['FACE', 'NOTHEX']) }).toThrow(Error)
})

test('I can push and pop an arbitrary value.', () => {
  const newStack = Object.create(HexStack).init()
  const testVal = bigInt('AB43890FED123421187843', 16)
  newStack.push(testVal)
  expect(newStack.pop()).toEqual(testVal)
  expect(newStack.size()).toEqual(0)
})
