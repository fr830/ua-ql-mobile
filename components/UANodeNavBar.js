
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


import {uaNodeRoute, uaNodeRoute1, uaNodeRoute2, uaNodeRoute3, uaNodeRoute4} from '../navigatorRoutes';

import Tabs from 'react-native-tabs';


var rightButtonConfig = {
  title: 'Next',
  handler: function onNext() {
    alert('hello!');
  }
};

var titleConfig = {
  title: 'Hello, world',
};



var styles = StyleSheet.create({
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

var styles2 = StyleSheet.create({
  container: {
    marginTop:45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});






const frags =  {
  fragments: {
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
      case 'first':
        return navigator.replace(uaNodeRoute(nodeId));
      case 'second':
        return navigator.replace(uaNodeRoute1(nodeId));
      case 'third':
        return navigator.replace(uaNodeRoute2(nodeId));
      case 'fourth':
        return navigator.replace(uaNodeRoute3(nodeId));
      case 'fifth':
        return navigator.replace(uaNodeRoute4(nodeId));
    }
  }
    

const UANodeNavBar = (nodeId, selected)=> compose(createContainer(frags))
  (({uaNode, navigator})=>
    
      <Tabs selected={selected} style={{position: 'relative', flex:1, backgroundColor:'white'}}
            selectedStyle={{color:'red'}}
            onSelect={
              getNav(
                navigator,
                nodeId
              )
            }>
            <Text name="first">{uaNode.nodeClass}</Text>
            <Text name="second" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
            <Text name="third">Third</Text>
            <Text name="fourth" selectedStyle={{color:'green'}}>Fourth</Text>
            <Text name="fifth">Fifth</Text>
        </Tabs>

  );

export default UANodeNavBar
