/**
 * A React component to display and manage the 'buttons' area of the calculator disply.
 */

import React from 'react'
import { Alert, Button, View } from 'react-native'
import * as R from 'ramda'

export default class CalcButtonDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.buttons = props.buttons || ['O', 'o', 'p', 's']
    this.backgroundColor = props.backgroundColor || '#FFFFFF'
    this.maxHeight = props.maxHeight || 45
  }

  buttonFor (key) {
    return <View marginHorizontal={3} key={key}>
      <Button
        title={key}
        onPress={R.partial(this.handlePress, [key])} />
    </View>
  }

  render () {
    return <View flex={1.0}
      flexDirection='row'
      marginHorizontal={5}
      backgroundColor={this.backgroundColor}
      maxHeight={45}>
      { this.buttons.map((key) => this.buttonFor(key)) }
    </View>
  }

  handlePress (key, event) {
    Alert.alert(key + ' Button pressed')
  }
}
