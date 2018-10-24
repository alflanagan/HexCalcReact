import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { isNil, unless } from 'ramda'

/**
 * A React component to display the calculator's stack to the user.
 *
 * props:
 *   stack - a string of hex values separated by '\n'
 */
export default class CalcStackDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stack: unless(isNil, () => '', () => this.props.stack)
    }
  }

  get stack () {
    return this.state.stack
  }

  render () {
    let counter = 0
    let parts = []
    if (typeof this.state.stack === 'string') {
      parts = this.state.stack.split('\n')
    } else {
      parts = [`this.state.stack is ${this.state.stack}`]
    }
    return (
      <ScrollView style={styles.mainView}>
        {parts.map(value => <Text style={styles.defaultText} key={counter++}>{value}</Text>)}
      </ScrollView>)
  }
}

const styles = StyleSheet.create(
  { mainView: {
    height: 100,
    backgroundColor: 'lightyellow',
    padding: 8,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexGrow: 0,
    margin: 5
  },
  defaultText: {
    flex: 1,
    fontFamily: 'monospace',
    textAlign: 'right'
  }
  }
)
