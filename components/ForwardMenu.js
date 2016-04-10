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

const frags =  {
  initialVariables: {
    'dodisplay': false
  },
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        forwardReferences: references(first:10 browseDirection: Forward) @include(if: $dodisplay) {
          edges {
            ${ReferenceLinks.getFragment('referenceDescriptions')}
          }
        }
      }
    `
  }
}
const Menu =
  compose(
    createContainer(frags),
    doOnReceiveProps(({relay, display})=>{
      if(display && display !== relay.variables.dodisplay) {
        relay.setVariables({
          'dodisplay': display
        });
      }
    })
    )
    (({uaNode, navigator})=>
      {
         return uaNode.forwardReferences
          ? <ScrollView style={styles.menu}> 
              <ReferenceLinks
                  referenceDescriptions = {uaNode.forwardReferences.edges}
                  navigator = {navigator}
                  header = {<Text>&lt;&lt;</Text>}/>
           </ScrollView>
          : <View/>
       }
  );


export default Menu
