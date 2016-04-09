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
    'display': undefined
  },
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        backwardReferences: references(first:10 browseDirection: Inverse) @include(if: $display) {
          edges {
            ${ReferenceLinks.getFragment('referenceDescriptions')}
          }
        }
      }
    `
  }
}
var x = 1;
const Menu =
  compose(
    createContainer(frags)
    /*,
    doOnReceiveProps(({relay, uaNode, display})=>{
     console.log('recieving props ' + x++);
      if(false && display) {
        relay.setVariables({
          'display': display
        });
      }
    })*/
    )
    (({uaNode, navigator})=>
      <ScrollView scrollsToTop={false} style={styles.menu}>
        {uaNode.backwardReferences
          ? <ReferenceLinks
              referenceDescriptions = {uaNode.backwardReferences.edges}
              navigator = {navigator}
              header = {<Text>&lt;&lt;</Text>}/>
          : <View/>}
      </ScrollView>
  );


export default Menu
