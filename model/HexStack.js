/**
 * A stack of numbers, with special operations for treating the values as hexidecimal
 * numbers (possibly with a fixed word size).
 */

export default class HexStack {
  constructor (iterable) {
    this.values = []
    if (typeof iterable !== 'undefined' && iterable !== null) {
      for (let value of iterable) {
        this.values.push(value)
      }
    }
  }

  toString () {
    return this.values.map(val => Number.toString(val, 16)).join('\n')
  }
}
