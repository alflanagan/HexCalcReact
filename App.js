import React from 'react'
import { Alert, StatusBar, StyleSheet, Text, ToolbarAndroid, View } from 'react-native'
import CalcStackDisplay from './components/CalcStackDisplay'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: 'Nothing has happened'
    }
  }

  onActionSelected (position) {
    Alert.alert('onActionSelected')
    this.setState(state => {
      return { message: 'Fred' }
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
          actions={[{ title: 'Settings', icon: require('./assets/ic_menu_preferences.png'), show: 'always' }]}
          titleColor='white'
          onActionSelected={this.onActionSelected.bind(this)} />
        <CalcStackDisplay />
        <Text>{this.state.message}</Text>
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

/*
  "alignContent",
  "alignItems",
  "alignSelf",
  "aspectRatio",
  "backfaceVisibility",
  "backgroundColor",
  "borderBottomColor",
  "borderBottomEndRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderBottomStartRadius",
  "borderBottomWidth",
  "borderColor",
  "borderEndColor",
  "borderEndWidth",
  "borderLeftColor",
  "borderLeftWidth",
  "borderRadius",
  "borderRightColor",
  "borderRightWidth",
  "borderStartColor",
  "borderStartWidth",
  "borderStyle",
  "borderTopColor",
  "borderTopEndRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderTopStartRadius",
  "borderTopWidth",
  "borderWidth",
  "bottom",
  "color",
  "decomposedMatrix",
  "direction",
  "display",
  "elevation",
  "end",
  "flex",
  "flexBasis",
  "flexDirection",
  "flexGrow",
  "flexShrink",
  "flexWrap",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "height",
  "includeFontPadding",
  "justifyContent",
  "left",
  "letterSpacing",
  "lineHeight",
  "margin",
  "marginBottom",
  "marginEnd",
  "marginHorizontal",
  "marginLeft",
  "marginRight",
  "marginStart",
  "marginTop",
  "marginVertical",
  "maxHeight",
  "maxWidth",
  "minHeight",
  "minWidth",
  "opacity",
  "overflow",
  "overlayColor",
  "padding",
  "paddingBottom",
  "paddingEnd",
  "paddingHorizontal",
  "paddingLeft",
  "paddingRight",
  "paddingStart",
  "paddingTop",
  "paddingVertical",
  "position",
  "resizeMode",
  "right",
  "rotation",
  "scaleX",
  "scaleY",
  "shadowColor",
  "shadowOffset",
  "shadowOpacity",
  "shadowRadius",
  "start",
  "textAlign",
  "textAlignVertical",
  "textDecorationColor",
  "textDecorationLine",
  "textDecorationStyle",
  "textShadowColor",
  "textShadowOffset",
  "textShadowRadius",
  "tintColor",
  "top",
  "transform",
  "transformMatrix",
  "translateX",
  "translateY",
  "width",
  "writingDirection",
  "zIndex"
 */
