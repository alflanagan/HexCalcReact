/**
 * HexStack
 * A stack of bigints, with special operations for treating the values as hexadecimal
 * numbers (possibly with a fixed word size).
 *
 * Note we use BigInt, not Number, bedcause we want to support at least 64 bits.
 */
import { bigIntAsIntN, bigIntAsUintN, bigIntTwosComplement } from '../utility/functions'
import HexStack from './HexStack'

// instead of `new SizedHexStack(...)` say
// `Object.create(SizedHexStack).init(...)`
export default {
/**
 * Set up this object.
 * @param  {Iterable}  iterable      An iterable producing values to be pushed onto this stack.
 *     {@see push()} for a description of legal values.
 * @param  {Boolean} signed   Whether to treat the values as signed or unsigned. Only
 *     meaningful when `bits` is non-zero, in which case negative values
 * @param  {Number}  bits      Maximum number of bits in input and output values.
 * @return {HexStack}              The object, set up according to params.
 */
  init (iterable, signed, bits) {
    this.signed = signed
    this.bits = bits
    this.hexStack = Object.create(HexStack).init()

    if (typeof iterable !== 'undefined' && iterable !== null) {
      for (let value of iterable) {
        this.push(value)
      }
    }
    return this
  },

  toString () {
    return this.hexStack.toString()
  },

  pop () {
    const value = this.hexStack.pop()
    // negative numbers must be converted back if we are 'signed'
    if (this.signed === false || value.greaterOrEquals(0)) {
      return value
    } else {
      return bigIntTwosComplement(value)
    }
  },

  push (value) {
    // we have to convert to bigInt first
    const bigValue = this.hexStack._makeBigInt(value)
    // so we can do truncation
    const newValue = this.signed ? bigIntAsIntN(this.bits, bigValue) : bigIntAsUintN(this.bits, bigValue)
    this.hexStack.push(newValue)
  },

  op (operator) {
    // I think this will work the same
    this.hexStack.op(operator)
  },

  clear () {
    this.hexStack.clear()
  },

  size () {
    return this.hexStack.size()
  }
}
