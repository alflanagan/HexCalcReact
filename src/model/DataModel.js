/**
 * Model the data in the current input.
 */
import HexStack from './HexStack'
import SizedHexStack from './SizedHexStack'

/**
 * Maintains the current state of the calculator. Provides a stack and a current input value.
 */
export default class DataModel {
  constructor (bitsBoolean = false, initValue = '0') {
    this._value = initValue
    this._stack = Object.create(bitsBoolean ? SizedHexStack : HexStack).init()
  }

  get value () {
    return this._value
  }

  get stack () {
    return this._stack
  }

  /**
   * process a key which changes the current value, and may change the stack.
   */
  processKey (key) {
    const digit = /[A-Fa-f0-9]/
    if (digit.test(key)) {
      let newValue = this._value + key
      while (newValue.startsWith('0')) {
        newValue = newValue.slice(1)
      }
      this._value = newValue
    } else if (key === '=') {
      this._stack.push(this._value)
      this._value = '0'
    }
  }
}
