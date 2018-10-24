import React from 'react'
import { Alert, StatusBar, StyleSheet, ToolbarAndroid, View } from 'react-native'
import CalcStackDisplay from './src/components/CalcStackDisplay'
import CalcInputArea from './src/components/CalcInputArea'
import CalcButtonDisplay from './src/components/CalcButtonDisplay'
import DataModel from './src/model/DataModel'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.model = new DataModel(false, '0')
    this.state = {
      message: 'Nothing has happened',
      input: this.model.value,
      stackDisp: this.model.stack.toString()
    }
  }

  /**
   * triggered when an action is selected from the menu
   * @param  {[type]} position [description]
   * @return {[type]}          [description]
   */
  onActionSelected (position) {
    Alert.alert('onActionSelected')
    this.setState(
      { message: 'Fred' }
    )
  }

  handleButton (key) {
    this.model.processKey(key)
    this.setState({
      input: this.model.value,
      stackDisp: this.model.stack.toString()
    })
  }

  // toolbar layout/rendering: see https://blog.callstack.io/android-drawer-statusbar-done-right-for-react-native-7e85f01fc099
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor='rgba(0, 0, 0, 0.20)'
          animated />
        <View style={{
          height: StatusBar.currentHeight,
          backgroundColor: 'teal'
        }} />
        <ToolbarAndroid style={styles.toolbar}
          title='Hex Calc RPN'
          actions={[{ title: 'Settings', icon: require('./src/assets/ic_menu_preferences.png'), show: 'always' }]}
          titleColor='white'
          onActionSelected={this.onActionSelected.bind(this)} />
        <CalcStackDisplay stack={this.state.stackDisp} />
        <CalcInputArea value={this.state.input} />
        <View flex={1.0} flexDirection='column' marginTop={5}>
          <CalcButtonDisplay buttons={['C', 'D', 'E', 'F', '*']} onPress={this.handleButton.bind(this)} />
          <CalcButtonDisplay buttons={['8', '9', 'A', 'B', '/']} onPress={this.handleButton.bind(this)} />
          <CalcButtonDisplay buttons={['4', '5', '6', '7', '+']} onPress={this.handleButton.bind(this)} />
          <CalcButtonDisplay buttons={['1', '2', '3', '4', '-']} onPress={this.handleButton.bind(this)} />
          <CalcButtonDisplay buttons={['=']} onPress={this.handleButton.bind(this)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  toolbar: {
    backgroundColor: 'teal',
    height: 56,
    elevation: 4,
    alignSelf: 'stretch'
  }
})
