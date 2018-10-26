import { safeToString, objToString, bigIntAsUintN, bigIntAsIntN } from './functions'
const bigInt = require('big-integer')

describe('safeToString converts a value to a string, even if it is null or undefined', () => {
  test('safeToString of undefined is "undefined"', () => {
    expect(safeToString(undefined)).toEqual('undefined')
  })

  test('safeToString of null is "null"', () => {
    expect(safeToString(null)).toEqual('null')
  })

  test('safeToString of 1 is "1"', () => {
    expect(safeToString(1)).toEqual('1')
  })

  test('safeToString of "fred" is "fred"', () => {
    expect(safeToString('fred')).toEqual('"fred"')
  })
})

describe('objToString() converts object to useful string representation', () => {
  test('objToString of undefined is "undefined"', () => {
    expect(objToString(undefined)).toEqual('undefined')
  })

  test('objToString of null is "null"', () => {
    expect(objToString(null)).toEqual('null')
  })

  test('objToString of 1 is "1"', () => {
    expect(objToString(1)).toEqual('1')
  })

  test('objToString of "fred" is "fred"', () => {
    expect(objToString('fred')).toEqual('fred')
  })

  test('objToString of empty object is "{}"', () => {
    expect(objToString({})).toEqual('{}')
  })

  test('objToString renders single property correctly', () => {
    expect(objToString({ a: 12 })).toEqual('{a: 12}')
  })

  test('objToString renders multiple properties correctly', () => {
    expect(objToString({ a: 12, b: 'fred', c: null })).toEqual('{a: 12, b: "fred", c: null}')
  })
})

describe('bigIntAsUintN() truncates an unsigned bigInt to a set number of bits', () => {
  test('correctly truncates to 16 bits', () => {
    const fred = bigInt(0x12345AB)
    const wilma = bigIntAsUintN(16, fred)
    expect(bigInt.isInstance(wilma)).toBe(true)
    expect(wilma.toJSNumber()).toEqual(0x45AB)
  })

  test('does not change number already smaller than spedified', () => {
    const fred = bigInt(0x123B)
    const wilma = bigIntAsUintN(16, fred)
    expect(bigInt.isInstance(wilma)).toBe(true)
    expect(wilma.toJSNumber()).toEqual(0x123B)
  })
})

describe('bigIntAsIntIn() truncates a signed bigInt to a set number of bits', () => {
  test('correctly truncates positive int to 32 bits', () => {
    const fred = bigInt('123456789ABCDEF0', 16)
    const wilma = bigIntAsIntN(32, fred)
    expect(bigInt.isInstance(wilma))
    expect(wilma.toJSNumber()).toEqual(0x9ABCDEF0)
  })

  test('correctly truncates negative int to 32 bits', () => {
    const fred = bigInt('-123456789ABCDEF0', 16)
    const wilma = bigIntAsIntN(32, fred)
    expect(bigInt.isInstance(wilma))
    expect(wilma.toJSNumber()).toEqual(0xE5432110)
  })

  test('correctly truncates negative to 16 bits', () => {
    const fred = bigInt(-0x12345AB)
    const wilma = bigIntAsIntN(16, fred)
    expect(bigInt.isInstance(wilma))
    expect(wilma.toJSNumber()).toEqual(0xBA55)
  })

  test('correctly truncates positive to 16 bits', () => {
    const fred = bigInt(0x12345AB)
    const wilma = bigIntAsIntN(16, fred)
    expect(bigInt.isInstance(wilma))
    expect(wilma.toJSNumber()).toEqual(0x45AB)
  })

  test('correctly truncates negative to 8 bits', () => {
    const fred = bigInt(-0x12345AB)
    const wilma = bigIntAsIntN(8, fred)
    expect(bigInt.isInstance(wilma))
    expect(wilma.toJSNumber()).toEqual(0xD5)
  })

  test('correctly truncates positive to 8 bits', () => {
    const fred = bigInt(0x12345AB)
    const wilma = bigIntAsIntN(8, fred)
    expect(bigInt.isInstance(wilma))
    expect(wilma.toJSNumber()).toEqual(0xAB)
  })
})
