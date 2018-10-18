/**
 * A React component to display the calculator's stack to the user.
 */

import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default class CalcStackDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      stack: this.props.stack || ['123ABCD', 'ABC123']
    }
  }

  newStack (stackAsArray) {
    this.setState({
      stack: stackAsArray
    })
  }

  render () {
    let counter = 0
    return (
      <ScrollView style={styles.mainView}>
        {this.state.stack.map(value => <Text style={styles.defaultText} key={counter++}>{value}</Text>)}
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
    fontFamily: 'monospace'
  }
  }
)
