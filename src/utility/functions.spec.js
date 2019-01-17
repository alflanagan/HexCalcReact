import { safeToString, objToString, bigIntAsIntN,
  bigIntTwosComplement, bigIntAsUintN } from './functions'
const bigInt = require('big-integer')

describe('safeToString() converts a value to a string, even if it is null or undefined', () => {
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

describe('bigIntAsIntN() truncates a signed bigInt to a set number of bits', () => {
  test('correctly truncates positive int to 32 bits', () => {
    const fred = bigInt('123456789ABCDEF0', 16)
    const wilma = bigIntAsIntN(32, fred)
    expect(bigInt.isInstance(wilma))
    expect(wilma.toJSNumber()).toEqual(0x9ABCDEF0)
  })

  test('correctly truncates negative int to 32 bits', () => {
    const fred = bigInt('-123456789ABCDEF0', 16)
    const wilma = bigIntAsIntN(32, fred)
    // '- 1 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111 0000
    //  - 0 1101 1100 1011 1010 1001 1000 0111 0110 0101 0100 0011 0010 0001 0000 1111
    //                                                                          +    1
    //    0 1101 1100 1011 1010 1001 1000 0111 0110 0101 0100 0011 0010 0001 0001 0000
    //   0110 0101 0100 0011 0010 0001 0001 0000
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

describe('bigIntTwosComplement() calculates the twos complement of a bigInt', () => {
  test("two's complement of zero is zero", () => {
    const value = bigInt(0)
    const twos = bigIntTwosComplement(8, value)
    expect(twos).toEqual(bigInt(0))
  })

  test("two's complement of -1 is 1", () => {
    let value = bigIntTwosComplement(8, bigInt(-1))
    expect(value.toJSNumber()).toEqual(1)
    value = bigIntTwosComplement(12, bigInt(-1))
    expect(value.toJSNumber()).toEqual(1)
    value = bigIntTwosComplement(16, bigInt(-1))
    expect(value.toJSNumber()).toEqual(1)
    value = bigIntTwosComplement(32, bigInt(-1))
    expect(value.toJSNumber()).toEqual(1)
    value = bigIntTwosComplement(64, bigInt(-1))
    expect(value.toJSNumber()).toEqual(1)
  })

  test("two's complement of a number plus that number is zero", () => {
    const value = bigInt(12)
    const twos = bigIntTwosComplement(16, value)
    expect(twos.toString(16)).toEqual('fff4')
    const actual = bigIntAsIntN(8, value.plus(twos))
    expect(actual.toJSNumber()).toEqual(0)
  })

  test("two's complement of a negative number is its absolute value", () => {
    const value = bigInt(-123456789)
    const twos = bigIntTwosComplement(32, value)
    expect(twos.toJSNumber()).toEqual(123456789)
  })
})
