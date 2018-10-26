/**
 * utility/functions.js
 * A module of useful (?) general-purpose functions
 */
import { keys, lt } from 'ramda'
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

export function bigIntAsIntN (numbits, value) {
  if (typeof numbits !== 'number' || !bigInt.isInstance(value)) {
    throw new TypeError('bigIntAsIntN requires a number and a bigInt')
  }
  if (lt(0, value)) {
    return value.mod(bigInt(2).pow(numbits))
  } else {
    // get positive number from truncating to 1 fewer bits than numbits
    const positive = value.abs().mod(bigInt(2).pow(numbits - 1))
    // get the two's complement of that value
    // convert number to array of 1s and 0s
    const bits = positive.toArray(2).value
    // pad number with 0s to numbits
    const padZeros = numbits - bits.length
    const padding = arrayOf(padZeros, 0)
    const bitArray = padding.concat(bits)
    if (bitArray.length !== numbits) {
      throw new Error('Created a bitArray of wrong length -- this is a bug!')
    }
    const onesComp = Array(bitArray.length)
    for (let i = 0; i < numbits; i++) {
      onesComp[i] = bitArray[i] === 0 ? 1 : 0
    }
    let bigOnesComp = bigInt.fromArray(onesComp, 2)
    return bigOnesComp.plus(1)
  }
}

export function bigIntAsUintN (numbits, value) {
  return value.abs().mod(bigInt(2).pow(numbits))
}
