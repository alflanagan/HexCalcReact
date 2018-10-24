/**
 * A React component to display and manage the 'buttons' area of the calculator disply.
 */

import React from 'react'
import { Alert, Button, View } from 'react-native'
import { defaultTo, partial, not, any, isNil } from 'ramda'

export default class CalcButtonDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buttons: defaultTo(['O', 'o', 'p', 's'], props.buttons),
      backgroundColor: defaultTo('#FFFFFF', props.backgroundColor),
      maxHeight: defaultTo(45, props.maxHeight),
      onPress: defaultTo(() => {}, props.onPress)
    }
  }

  buttonFor (key) {
    return <View marginHorizontal={3} key={key}>
      <Button
        title={key}
        onPress={partial(this.handlePress.bind(this), [key])} />
    </View>
  }

  render () {
    return <View flex={1.0}
      flexDirection='row'
      marginHorizontal={5}
      backgroundColor={this.state.backgroundColor}
      maxHeight={45}>
      { this.state.buttons.map((key) => this.buttonFor(key)) }
    </View>
  }

  handlePress (key, event) {
    if (not(any(isNil(this.state), isNil(this.state.onPress)))) {
      this.state.onPress(key, event)
    } else {
      Alert.alert('No button handler assigned!')
    }
  }
}
