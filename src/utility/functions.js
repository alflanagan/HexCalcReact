/**
 * utility/functions.js
 * A module of useful (?) general-purpose functions
 */
import { keys } from 'ramda'

export function safeToString (something) {
  if (typeof something === 'undefined') { return 'undefined' }
  if (something === null) { return 'null' }
  if (typeof something === 'string') { return `"${something}"` }
  return something.toString()
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
