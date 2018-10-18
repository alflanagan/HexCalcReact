/**
 * A stack of numbers, with special operations for treating the values as hexadecimal
 * numbers (possibly with a fixed word size).
 */

export default class HexStack {
  /**
   * Create a new stack of numbers.
   * @param {[object]} iterable An object whose iterator enumerates a series of integers, or
   *   strings which are valid hexadecimal numbers.
   */
  constructor (iterable) {
    this.values = []
    if (typeof iterable !== 'undefined' && iterable !== null) {
      for (let value of iterable) {
        this.values.push(typeof value === 'string' ? Number.parseInt(value, 16) : value)
      }
    }
  }

  toString () {
    return this.values.map(val => Number.toString(val, 16)).join('\n')
  }
}
