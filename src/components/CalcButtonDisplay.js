/**
 * A React component to display and manage the 'buttons' area of the calculator disply.
 */

import React from 'react'
import { Alert, Button } from 'react-native'

export default class CalcButtonDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.count = 0
  }

  render () {
    return <Button
      title='A'
      onPress={this.handlePress} />
  }

  handlePress (event) {
    Alert.alert('Button pressed')
  }
}
