
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView
} from 'react-native';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';

import ReferenceLinks from './ReferenceLinks';

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor:'orange',
  },
  nodeStyle : {
    flex:1,
     fontSize: 19, 
     fontWeight: 'bold',
     justifyContent: 'center',
     alignItems: 'center'
  },
  nodePane : {
    flex:1,
     justifyContent: 'center',
     alignItems: 'center'
  }
});


const frags =  {
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        displayName {
          text
        }
        description {
          text
        }
        backwardReferences: references(first:10 browseDirection: Inverse) {
          edges {
            ${ReferenceLinks.getFragment('referenceDescriptions')}
          }
        }
        forwardReferences: references(first:100 browseDirection: Forward) {
          edges {
            ${ReferenceLinks.getFragment('referenceDescriptions')}
          }
        }
      }
    `
  }
}


const UANode = compose(createContainer(frags))
  (({uaNode, navigator})=>
    
    <ScrollView>
      <View >
        <ReferenceLinks 
          referenceDescriptions= {uaNode.backwardReferences.edges} 
          navigator={navigator}
          header={<Text>&lt;&lt;</Text>}/>
        <View style={styles.nodePane}>
          <Text
            style = {styles.nodeStyle}>
            {uaNode.displayName.text}
          </Text>
          <Text>
            {uaNode.description ? uaNode.description.text : ''}
          </Text>
        </View>
        <ReferenceLinks
          referenceDescriptions= {uaNode.forwardReferences.edges} 
          navigator={navigator}
          header={<Text>&gt;&gt;</Text>}/>
      </View>
    </ScrollView>
  );




export default UANode

