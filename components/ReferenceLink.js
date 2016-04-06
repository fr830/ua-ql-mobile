
import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import {dashboardRoute} from '../navigatorRoutes';
import Button from 'react-native-button'



var styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius:4,
    backgroundColor: '#FFFF00'
  },
  style: {
    fontSize: 20,
    color: 'green'
  }
});

// #FFFF00


const frags =  {
  fragments: {
    referenceDescription: ()=> Relay.QL`
      fragment on ReferenceDescription {
        uaNode {
          nodeId {
            namespace
            identifierType
            value
          }
          displayName {
            text
          }
        }
      }
    `
  }
}



const getNav = (navigator, nodeId)=>
  ()=> navigator.push(dashboardRoute(nodeId));

const ReferenceLink = compose(createContainer(frags))
  (({referenceDescription, navigator})=> (
    <View style={styles.row}>
      <Button
        containerStyle = {styles.containerStyle}
        style = {styles.style}
        onPress = {
          getNav(
          navigator,
          `ns=${
            referenceDescription.uaNode.nodeId.namespace
          };i=${
            referenceDescription.uaNode.nodeId.value
          }`
        )}>
           <Text >
             {referenceDescription.uaNode.displayName.text}
           </Text>
      </Button>
    </View>
  ));
export default ReferenceLink
