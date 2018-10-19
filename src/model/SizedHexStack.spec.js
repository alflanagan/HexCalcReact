/**
 * Unit testing for SizedHexStack.js
 */
import SizedHexStack from './SizedHexStack'

/**
 * Retrieve values from the stack into an array to allow easy comparison to expected values.
 * @param  {SizedHexStack} stack The stack being tested.
 * @return {Array<String>}       An array of the integer values, from bottom of stack to top, as
 *   strings to provide better error messages.
 */
function getValues (stack) {
  const arr = []
  let value = stack.pop()
  while (value !== null) {
    arr.push(value)
    value = stack.pop()
  }
  // restore the stack as it was
  for (let i = arr.length - 1; i >= 0; i--) {
    stack.push(arr[i])
  }
  return arr.map((v) => v.toString(16))
}

test('I can create an empty stack.', () => {
  expect(getValues(Object.create(SizedHexStack).init([], false, 32))).toEqual([])
})

test('The getValues() function correctly restores the stack', () => {
  var stack = Object.create(SizedHexStack).init([1, 2, 3, 4], false, 32)
  expect(getValues(stack)).toEqual(['4', '3', '2', '1'])
  expect(stack.size()).toBe(4)
  expect(getValues(stack)).toEqual(['4', '3', '2', '1'])
})

test('I can create a stack from an array of integers.', () => {
  var stack = Object.create(SizedHexStack).init([1, 2, 3, 4], false, 8)
  expect(getValues(stack)).toEqual(['4', '3', '2', '1'])
})

test('Integers in a stack are truncated to the given number of bits.', () => {
  var stack = Object.create(SizedHexStack).init([257, 514, 259, 0xF04], false, 8)
  expect(getValues(stack)).toEqual(['4', '3', '2', '1'])
})

test('I can create a stack from an array of strings.', () => {
  const newStack = Object.create(SizedHexStack).init(['FACE', 'BEEF', 'BAD'], false, 32)
  expect(getValues(newStack)).toEqual(['bad', 'beef', 'face'])
  // either with or without '0x' prefix works
  const newStack2 = Object.create(SizedHexStack).init(['0xFACE', '0xBEEF', '0xBAD'], false, 16)
  expect(getValues(newStack2)).toEqual(['bad', 'beef', 'face'])
})

test('Creating a stack fails if iterator returns neither a number or string.', () => {
  const newStack = Object.create(SizedHexStack)
  expect(() => { newStack.init([{ value: '1234' }], true, 23) }).toThrow(TypeError)
})

test('Creating a stack fails if given a non-hexadecimal string.', () => {
  const newStack = Object.create(SizedHexStack)
  expect(() => { newStack.init(['FACE', 'NOTHEX'], false, 8) }).toThrow(SyntaxError)
})

test('I can push and pop a large value.', () => {
  const newStack = Object.create(SizedHexStack).init([], false, 128)
  const testVal = BigInt('0xAB43890FED123421187843')
  newStack.push(testVal)
  expect(newStack.pop()).toEqual(testVal)
  expect(newStack.size()).toEqual(0)
})

test('A signed stack can return negative numbers', () => {
  const stack = Object.create(SizedHexStack).init([-5], true, 16)
  expect(stack.pop().toString(16)).toEqual('-5')
})

test('An unsigned stack returns twos-comlement of negative numbers', () => {
  const stack = Object.create(SizedHexStack).init([-5], false, 16)
  expect(stack.pop().toString(16)).toEqual('fffb')
})
