
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import UANodeMethods from './UANodeMethods';
import UANodeDevice from './UANodeDevice';

import LevelIndicator from './devices/LevelIndicator';
import LevelController from './devices/LevelController';
import FlowController from './devices/FlowController';
import CustomController from './devices/CustomController';

import BoilerDrum from './BoilerDrum';

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-art-svg';

import {deviceTypes} from './devices/devices';

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
  },
  viewStyle : {
    alignItems: 'center'
  },
  componentStyle : {
    position: 'absolute',
    backgroundColor: 'transparent'
  }
});


const wrapper = (i, props, uaNode, subControl) => 
  <View
    {...props}
    style = {[
      styles.componentStyle,
      {
        left:20 + (i%2)*110,
        top: Math.floor(i/2)*50
      }
    ]}>
    {subControl}
  </View>;


const mimicTypes = (uaNode) => ({
  BoilerDrumType: {
    Control: <BoilerDrum.Control uaNode={uaNode}/>,
    SubControls: <BoilerDrum.SubControls uaNode={uaNode} wrapper={wrapper}/>
  }
});

const mimicFragments = [BoilerDrum.Control.getFragment('uaNode'), BoilerDrum.SubControls.getFragment('uaNode')]

const Device = UANodeDevice(mimicFragments);

const frags =  {
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        commands:  browsePath(paths:["Simulation:4"]) {
          ${UANodeMethods.getFragment('uaNode')}
        }
        components: references(first:1000 referenceTypeId: "ns=0;i=47") {
          edges {
            node {
              id
              displayName {
                text
              }
              uaNode {
                id
                ${Device.getFragment('uaNode')}
              }
            }
          }
        }
      }
    `
  }
};

const Boiler = compose(createContainer(frags))
  (({uaNode, navigator})=>
  <View style={styles.viewStyle}>
    <Svg
      height="200"
      width="200">
      <G x="-15">
        <G scale=".4" >
            <Path fill="none" stroke="#CCCCCC" strokeWidth="3" strokeMiterlimit="10" d="M435.757,111.656v279.402    c0,44.236-35.86,80.104-80.104,80.104H216.671c-44.237,0-80.104-35.867-80.104-80.104V111.656"/>
            <Rect onClick={()=>alert('click')} x="131" y="96.888" fill="none" stroke="#CCCCCC" strokeWidth="3" strokeLinejoin="round" strokeMiterlimit="10" width="310.324" height="15.284"/>
            <Polygon fill="#CCCCCC" stroke="#CCCCCC" strokeWidth="3" strokeLinejoin="round" strokeMiterlimit="10" points="    438.6,205.561 133.725,205.561 133.725,204.912 133.725,189.188 133.725,188.536 438.6,188.536 438.6,189.188 438.6,204.912   "/>
            <Polygon fill="#CCCCCC" stroke="#CCCCCC" strokeWidth="3" strokeLinejoin="round" strokeMiterlimit="10" points="    438.6,375.263 133.725,375.263 133.725,374.617 133.725,358.895 133.725,358.242 438.6,358.242 438.6,358.895 438.6,374.617   "/>      
        </G>
        
      </G>
  </Svg>
  {uaNode.components.edges.map((component, i)=>
    <TouchableOpacity
      key={i}
      activeOpacity= {.3}
      onPress={()=>alert('clicked')}
      style = {[
        styles.componentStyle,
        {
          left:20 + (i%2)*110,
          top: Math.floor(i/2)*50
        }
      ]}>
        <Device uaNode={component.node.uaNode} deviceTypes={deviceTypes} mimicTypes = {mimicTypes}/>
        
    </TouchableOpacity>
  )}
  <UANodeMethods uaNode={uaNode.commands}/>
</View>
  );
  
  
  
export default Boiler
