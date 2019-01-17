/**
 * HexStack
 * A stack of bigints, with special operations for treating the values as hexadecimal
 * numbers (possibly with a fixed word size).
 *
 * Note we use BigInt, not Number, bedcause we want to support at least 64 bits.
 */
import { cond, equals, T } from 'ramda'

// Here we're explicitly using a Delegation pattern rather than Inheritance. It reflects how
// Javascript actually implements things, unlike the "standard" use of `new` and `prototype`,
// even with the new `class` syntax
const bigInt = require('big-integer')

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
    return this.values.map(val => val.toString(16)).join('\n')
  },

  pop () {
    return this.values.length === 0 ? null : this.values.pop()
  },

  _makeBigInt (value) {
    if (bigInt.isInstance(value)) {
      return value
    } else {
      switch (typeof value) {
        case 'number': // throws RangeError if not an int (fractional part == 0)
          return bigInt(value)
        case 'string': // throws SyntaxError if not valid integer
          // assumes string in hexadecimal format, even if not explicit
          if (value.startsWith('0x') || value.startsWith('0X')) {
            value = value.slice(2)
          }
          return bigInt(value, 16)
        default:
          throw new TypeError(`HexStack doesn't know how to accept ${value}.`)
      }
    }
  },

  push (value) {
    this.values.push(this._makeBigInt(value))
  },

  op (operator) {
    let a, b
    cond([
      [equals('+'), () => { this.push(this.pop().add(this.pop())) }],
      [equals('-'), () => {
        a = this.pop()
        b = this.pop()
        this.push(b.minus(a))
      }],
      [equals('*'), () => { this.push(this.pop().multiply(this.pop())) }],
      [equals('/'), () => {
        a = this.pop()
        b = this.pop()
        this.push(b.divide(a))
      }],
      [equals('%'), () => {
        a = this.pop()
        b = this.pop()
        this.push(b.mod(a))
      }],
      [T, (operator) => { throw new RangeError(`Operator not recognized: '${operator}'`) }]
    ])
    // switch (operator) {
    //   case '+':
    //     this.push(this.pop().add(this.pop()))
    //     break
    //   case '-':
    //     a = this.pop()
    //     b = this.pop()
    //     this.push(b.minus(a))
    //     break
    //   case '*':
    //     this.push(this.pop().multiply(this.pop()))
    //     break
    //   case '/':
    //     a = this.pop()
    //     b = this.pop()
    //     this.push(b.divide(a))
    //     break
    //   case '%':
    //     a = this.pop()
    //     b = this.pop()
    //     this.push(b.mod(a))
    //     break
    //   default:
    //     throw new RangeError(`Operator not recognized: '${operator}'`)
    // }
  },

  clear () {
    this.values.clear()
  },

  size () {
    return this.values.length
  }
}
