import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator
} from 'react-native';

 import relayRenderScene from './util/relayRenderScene';

import {uaNodeRouteSummary} from './navigatorRoutes';

var styles = StyleSheet.create({
  container: {
    flex: 1
    
  }
});

export default class MyApp extends Component {
  render() {

    // Just imagine we're getting loggedInUserID from some other part of the app.
    const initialRoute = uaNodeRouteSummary('ns=4;i=1240');
    

    return (
      <Navigator
         style = {styles.container}
        initialRoute = {initialRoute}
        renderScene = {relayRenderScene}
      />
    );
  }
}