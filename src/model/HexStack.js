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

// instead of `new HexStack()` say
// `Object.create(HexStack).init()`

export default {
  init (iterable) {
    this.values = []
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
    switch (typeof value) {
      case 'bigint':
        this.values.push(value)
        break
      case 'number': // throws RangeError if not an int (fractional part == 0)
        this.values.push(BigInt(value))
        break
      case 'string': // throws SyntaxError if not valid integer
        // assumes string in hexadecimal format, even if not explicit
        if (!(value.startsWith('0x') || value.startsWith('0X'))) {
          value = `0x${value}`
        }
        this.values.push(BigInt(value))
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
