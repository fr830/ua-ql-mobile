import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import UaNodeNamespace from './UANodeNamespace';

var styles = StyleSheet.create({
  textStyle : {
    fontSize: 12,
    fontWeight: 'bold'
  }
});

const frags =  {
  fragments: {
    root: ()=> Relay.QL`
      fragment on UANode {
        ${UaNodeNamespace.getFragment('root')}
      }
    `,
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        type: references(first:1 referenceTypeId:"ns=0;i=40") {
          edges {
            node {
              uaNode {
                ${UaNodeNamespace.getFragment('uaNode')}
                nodeId {
                  identifierType
                  value
                  namespace
                  namespaceUri
                  serverIndex
                }
                displayName {
                  text
                }
              }
            }
          }
        }
      }
    `
  }
}

const UANodeType = compose(createContainer(frags))
  (({root, uaNode})=>
    uaNode.type.edges[0] 
      ? <View>
          <Text
            style = {styles.textStyle}>
            {uaNode.type.edges[0].node.uaNode.displayName.text}
          </Text>
          <Text
            style = {styles.textStyle}>
            {uaNode.type.edges[0].node.uaNode.nodeId.identifierType}
          </Text>
          <Text
            style = {styles.textStyle}>
            {uaNode.type.edges[0].node.uaNode.nodeId.namespaceUri}
          </Text>
          <Text
            style = {styles.textStyle}>
            {uaNode.type.edges[0].node.uaNode.nodeId.value}
          </Text>
          <UaNodeNamespace root={root} uaNode={uaNode.type.edges[0].node.uaNode}/>
        </View>
      : <View/>
  );
UANodeType.root=true;
export default UANodeType
