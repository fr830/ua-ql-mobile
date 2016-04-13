
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


import {uaNodeRouteSummary, uaNodeRouteMimic, uaNodeRouteVariable, uaNodeRouteBackward, uaNodeRouteForward} from '../navigatorRoutes';

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
        nodeClass
      }
    `,
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        nodeClass
      }
    `
  }
}

const getNav = (navigator, nodeId)=>
  (el)=> {
    switch(el.props.name) {
      case 'summary':
        return navigator.replace(uaNodeRouteSummary(nodeId));
      case 'mimic':
        return navigator.replace(uaNodeRouteMimic(nodeId));
      case 'variable':
        return navigator.replace(uaNodeRouteVariable(nodeId));
      case 'backward':
        return navigator.replace(uaNodeRouteBackward(nodeId));
      case 'forward':
        return navigator.replace(uaNodeRouteForward(nodeId));
    }
  }
    

const UANodeNavBar = (nodeId, selected)=> {
  
  const ret = compose(createContainer(frags))
  (({root, uaNode, navigator})=>
    
      <Tabs selected={selected} 
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
            <Text name="mimic">Mimic</Text>
            {uaNode.nodeClass==='Variable' ? <Text name="variable">Variable</Text> : null}
            <Text name="backward" >&lt;</Text>
            <Text name="forward">&gt;</Text>
        </Tabs>

  );
  ret.root=true;
  return ret;
}
export default UANodeNavBar
