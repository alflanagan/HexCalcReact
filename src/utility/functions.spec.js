
import { safeToString, objToString } from './functions'

describe('tests of safeToString function', () => {
  test('safeToString of undefined is "undefined"', () => {
    expect(safeToString(undefined)).toEqual('undefined')
  })

  test('safeToString of null is "null"', () => {
    expect(safeToString(null)).toEqual('null')
  })

  test('safeToString of 1 is "1"', () => {
    expect(safeToString(1)).toEqual('1')
  })

  test('safeToSting of "fred" is "fred"', () => {
    expect(safeToString('fred')).toEqual('"fred"')
  })
})

describe('tests of objToString() function', () => {
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
