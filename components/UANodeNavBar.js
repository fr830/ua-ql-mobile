
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


import {uaNodeRouteSummary, uaNodeRouteMimic, uaNodeRouteMethods, uaNodeRouteExecute, uaNodeRouteVariable, uaNodeRouteBackward, uaNodeRouteForward} from '../navigatorRoutes';

import Tabs from 'react-native-tabs';




var styles = StyleSheet.create({
  selectedIcon: {
    borderTopWidth:2,borderTopColor:'red'
  },
  selected: {
    color:'red'
  },
  tabStyle: {
    position: 'relative',
    flex:1,
    backgroundColor:'lightblue'
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
        nodeClass
        type: references(first:1 referenceTypeId:"ns=0;i=40") {
          edges {
            node {
              uaNode {
                nodeId {
                  identifierType
                  value
                  namespace
                  namespaceUri
                  serverIndex
                }
              }
            }
          }
        }
      }
    `
  }
}

const getNav = (navigator, nodeId)=>
  (el)=> {
    switch(el.props.name) {
      case 'summary':
        return navigator.replace(uaNodeRouteSummary(nodeId, 'summary'));
      case 'methods':
        return navigator.replace(uaNodeRouteMethods(nodeId, 'methods'));
      case 'execute':
        return navigator.replace(uaNodeRouteExecute(nodeId, 'execute'));
      case 'mimic':
        return navigator.replace(uaNodeRouteMimic(nodeId, 'mimic'));
      case 'variable':
        return navigator.replace(uaNodeRouteVariable(nodeId, 'variable'));
      case 'backward':
        return navigator.replace(uaNodeRouteBackward(nodeId, 'backward'));
      case 'forward':
        return navigator.replace(uaNodeRouteForward(nodeId, 'forward'));
    }
  }
    

const UANodeNavBar = (nodeId, selected)=> {
  
  const ret = compose(createContainer(frags))
  (({root, uaNode, navigator})=> {
      console.log(JSON.stringify(root, null, '\t'));
      let identifierType = uaNode.type.edges[0] ? uaNode.type.edges[0].node.uaNode.nodeId.identifierType : null;
      let value = uaNode.type.edges[0] ? uaNode.type.edges[0].node.uaNode.nodeId.value : null;
      let namespaceUri = uaNode.type.edges[0] ? root.serverNamespaces.dataValue.value[uaNode.type.edges[0].node.uaNode.nodeId.namespace] : null;
      
      
      
      return <Tabs selected={selected} 
            style={styles.tabStyle}
            selectedStyle={styles.selected}
            selectedIconStyle={styles.selectedIcon}
            onSelect={
              getNav(
                navigator,
                nodeId
              )
            }>
            <Text name="summary">Summary</Text>
            {identifierType==='NUMERIC' && value==='1132' && namespaceUri==='http://opcfoundation.org/UA/Boiler/'
              ? <Text name="mimic">Mimic</Text>
              : null
            }
            {identifierType==='NUMERIC' && value==='1039' && namespaceUri==='http://opcfoundation.org/UA/Boiler/'
              ? <Text name="methods">Methods</Text>
              : null
            }
            {uaNode.nodeClass==='Method' ? <Text name="execute">Execute</Text> : null}
            {uaNode.nodeClass==='Variable' ? <Text name="variable">Variable</Text> : null}
            <Text name="backward" >&lt;</Text>
            <Text name="forward">&gt;</Text>
            
        </Tabs>
    }
  );
  ret.root=true;
  return ret;
}
export default UANodeNavBar
