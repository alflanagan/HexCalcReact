Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.safeToString = safeToString
exports.arrayOf = arrayOf
exports.objToString = objToString
exports.bigIntTwosComplement = bigIntTwosComplement
exports.bigIntAsIntN = bigIntAsIntN
exports.bigIntAsUintN = bigIntAsUintN
var _ramda = require('ramda')
var bigInt = require('big-integer')

function safeToString (something) {
  if (typeof something === 'undefined') {
    return 'undefined'
  }
  if (something === null) {
    return 'null'
  }
  if (typeof something === 'string') {
    return '"' + something + '"'
  }
  return something.toString()
}

function arrayOf (length, initialValue) {
  var newArray = Array(length)
  for (var i = 0; i < length; i++) {
    newArray[i] = initialValue
  }
  return newArray
}

function objToString (something) {
  if (typeof something === 'undefined') {
    return 'undefined'
  }
  if (something === null) {
    return 'null'
  }
  if (typeof something === 'object') {
    return '{' + (0, _ramda.keys)(something).map(function (key) {
      return key + ': ' + safeToString(something[key])
    }).join(', ') + '}'
  }
  return something.toString()
}

function bigIntTwosComplement (numbits, value) {
  if (typeof numbits !== 'number' || !bigInt.isInstance(value)) {
    throw new TypeError('bigIntAsIntN requires a number and a bigInt')
  }
  var twoToNth = bigInt(2).pow(numbits)
  return twoToNth.minus(value).mod(twoToNth)
}

function bigIntAsIntN (numbits, value) {
  if (typeof numbits !== 'number' || !bigInt.isInstance(value)) {
    throw new TypeError('bigIntAsIntN requires a number and a bigInt')
  }
  if (value.greaterOrEquals(0)) {
    return value.mod(bigInt(2).pow(numbits))
  } else {
    var twosComp = bigIntTwosComplement(value.bitLength() + 1, value)
    return twosComp.mod(bigInt(2).pow(numbits))
  }
}

function bigIntAsUintN (numbits, value) {
  if (typeof numbits !== 'number' || !bigInt.isInstance(value)) {
    throw new TypeError('bigIntAsIntN requires a number and a bigInt')
  }
  if (value.lt(0)) {
    throw new RangeError('bigIntAsIntN() got negative number')
  }
  return value.mod(bigInt(2).pow(numbits))
}
