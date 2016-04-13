import  React, {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
} from 'react-native';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose, doOnReceiveProps} from 'recompose';

import ReferenceLinks from './ReferenceLinks';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20
  }
});

const ReferenceMenu = (frags, align, routeFunc)=>
  compose(
    createContainer(frags(ReferenceLinks)),
    doOnReceiveProps(({relay, display})=>{
      if(display === undefined && !relay.variables.dodisplay) {
        relay.setVariables({
          'dodisplay': true
        });
      }
      
      if(display && display !== relay.variables.dodisplay) {
        relay.setVariables({
          'dodisplay': display
        });
      }
    })
    )
    (({uaNode, navigator})=>
      {
         return uaNode.references
          ? <ScrollView style={styles.menu}> 
              <ReferenceLinks
                alignItems =  {align}
                referenceDescriptions = {uaNode.references.edges}
                navigator = {navigator}
                routeFunc={routeFunc}
               />
           </ScrollView>
          : <View/>
       }
  );


export default ReferenceMenu
