/**
 * HexStack
 * A stack of bigints, with special operations for treating the values as hexadecimal
 * numbers (possibly with a fixed word size).
 *
 * Note we use BigInt, not Number, bedcause we want to support at least 64 bits.
 */

// Here we're explicitly using a Delegation pattern rather than Inheritance. It reflects how
// Javascript actually implements things, unlike the "standard" use of `new` and `prototype`,
// even with the new `class` syntax

// instead of `new SizedHexStack()` say
// `Object.create(SizedHexStack).init()`
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
    this.values = []
    this.signed = signed
    this.bits = bits

    if (typeof iterable !== 'undefined' && iterable !== null) {
      for (let value of iterable) {
        this.push(value)
      }
    }
    return this
  },

  toString () {
    return this.values.map(val => BigInt.toString(val, 16)).join('\n')
  },

  pop () {
    return this.values.length === 0 ? null : this.values.pop()
  },

  push (value) {
    const _ = (num) => this.signed ? BigInt.asIntN(this.bits, num) : BigInt.asUintN(this.bits, num)
    switch (typeof value) {
      case 'bigint':
        this.values.push(_(value))
        break
      case 'number': // throws RangeError if not an int (fractional part == 0)
        this.values.push(_(BigInt(value)))
        break
      case 'string': // throws SyntaxError if not valid integer
        // assumes string in hexadecimal format, even if not explicit
        if (!(value.startsWith('0x') || value.startsWith('0X'))) {
          value = `0x${value}`
        }
        this.values.push(_(BigInt(value)))
        break
      default:
        throw new TypeError(`HexStack doesn't know how to accept ${value}.`)
    }
  },

  op (operator) {
    let a, b
    switch (operator) {
      case '+':
        this.push(this.pop() + this.pop())
        break
      case '-':
        a = this.pop()
        b = this.pop()
        this.push(b - a)
        break
      case '*':
        this.push(this.pop() * this.pop())
        break
      case '/':
        a = this.pop()
        b = this.pop()
        this.push(b / a)
        break
      case '%':
        a = this.pop()
        b = this.pop()
        this.push(b % a)
        break
      default:
        throw new RangeError(`Operator not recognized: '${operator}'`)
    }
  },

  clear () {
    this.values.clear()
  },

  size () {
    return this.values.length
  }
}
