import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';

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
        serverNamespaces: browsePath(paths:["Objects", "Server", "NamespaceArray"]) {
          dataValue { 
            ... on UaStringArray {value}
          }
        }
      }
    `,
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        nodeId {
          namespace
        }
      }
    `
  }
}

const UANodeNamespace = compose(createContainer(frags))
  (({root, uaNode})=>
    <Text
      style = {styles.textStyle}>
      {root.serverNamespaces.dataValue.value[uaNode.nodeId.namespace]}
    </Text>
  );
UANodeNamespace.root=true;
export default UANodeNamespace
