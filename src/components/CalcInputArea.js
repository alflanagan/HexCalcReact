/**
 * A React component to display the value currently being entered into the calculator.
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class CalcInputArea extends React.Component {
  render () {
    return <View><Text style={styles.mainView}>
    1234ABCD
    </Text></View>
  }
}

const styles = StyleSheet.create(
  {
    mainView: {
      height: 30,
      backgroundColor: 'lightgrey',
      paddingRight: 8,
      paddingTop: 4,
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      flexGrow: 0,
      margin: 5,
      fontFamily: 'monospace',
      textAlign: 'right'
    }
  })
