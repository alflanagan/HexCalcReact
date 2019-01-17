/**
 * utility/functions.js
 * A module of useful (?) general-purpose functions
 */
import { keys } from 'ramda'
// big-integer doesn't support standard modules (yet)
const bigInt = require('big-integer')

export function safeToString (something) {
  if (typeof something === 'undefined') { return 'undefined' }
  if (something === null) { return 'null' }
  if (typeof something === 'string') { return `"${something}"` }
  return something.toString()
}

/**
 * Returns array of given length, every item initialized to initialValue (there's got to be
 * some sort of standard function for this!)
 *
 * TODO: accept a function for initialValue, which is (index) => any.
 *
 * @param  {integer} length       The length of the returned array.
 * @param  {any} initialValue Value assigned to each index of the array.
 * @return {Array}              Initialized array.
 */
export function arrayOf (length, initialValue) {
  const newArray = Array(length)
  for (let i = 0; i < length; i++) {
    newArray[i] = initialValue
  }
  return newArray
}
/**
 * Converts object to more-useful string form
 * @param  {object} something Any object
 * @return {string}           A string listing keys and values of the object (may be long)
 */
export function objToString (something) {
  if (typeof something === 'undefined') { return 'undefined' }
  if (something === null) { return 'null' }
  if (typeof something === 'object') {
    return '{' + keys(something).map((key) => `${key}: ${safeToString(something[key])}`).join(', ') + '}'
  }
  // fallback to builtin
  return something.toString()
}

/**
 * Get the two's complement of [value], assuming a word size of [numbits].
 * @param  {integer} numbits word size of the binary value (two's complement only makes sense for
 *                   finite word sizes)
 * @param  {bigInt} value   a bigInt
 * @return {bigInt}         two's complement of value
 */
export function bigIntTwosComplement (numbits, value) {
  if (typeof numbits !== 'number' || !bigInt.isInstance(value)) {
    throw new TypeError('bigIntAsIntN requires a number and a bigInt')
  }
  const twoToNth = bigInt(2).pow(numbits)
  // two's complement = complement with respect to 2^n
  return twoToNth.minus(value).mod(twoToNth)
}

/**
 * Truncate a signed bigInt to fit into [numbits] word size.
 *
 * For negative values we get the two's complement, then truncate that.
 *
 * @param  {Number} numbits Integer word size of the returned value
 * @param  {bigInt} value   A signed value to truncate to the given size
 * @return {bigInt}         Truncated value
 */
export function bigIntAsIntN (numbits, value) {
  if (typeof numbits !== 'number' || !bigInt.isInstance(value)) {
    throw new TypeError('bigIntAsIntN requires a number and a bigInt')
  }
  if (value.greaterOrEquals(0)) {
    return value.mod(bigInt(2).pow(numbits))
  } else {
    const twosComp = bigIntTwosComplement(value.bitLength() + 1, value)
    return twosComp.mod(bigInt(2).pow(numbits))
  }
}

/**
 * Truncate a positive bigInt to fit into [numbits] word size.
 *
 * Currently does not handle negative values. Caller should explicitly take absolute value or
 * two's complement first, whatever suits their use case.
 *
 * @param  {Number} numbits Integer word size of the returned value
 * @param  {bigInt} value   A positive value to truncate to the given size
 * @return {bigInt}         Truncated value
 */
export function bigIntAsUintN (numbits, value) {
  if (typeof numbits !== 'number' || !bigInt.isInstance(value)) {
    throw new TypeError('bigIntAsIntN requires a number and a bigInt')
  }
  if (value.lt(0)) {
    throw new RangeError('bigIntAsIntN() got negative number')
  }
  return value.mod(bigInt(2).pow(numbits))
}
