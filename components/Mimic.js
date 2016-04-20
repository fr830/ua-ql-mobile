
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  View,
  ListView,
  ScrollView
} from 'react-native';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import UANodeMethods from './UANodeMethods';
import UANodeDevice from './UANodeDevice';

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
  }
});


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
                ${UANodeDevice.getFragment('uaNode')}
              }
            }
          }
        }
      }
    `
  }
}

const Mimic = compose(createContainer(frags))
  (({uaNode, navigator})=>
  <View style={styles.viewStyle}>
    <Svg
      height="200"
      width="200">
      <G x="-15">
        <G scale=".4" >
            <Path fill="none" stroke="#CCCCCC" strokeWidth="3" strokeMiterlimit="10" d="M435.757,111.656v279.402    c0,44.236-35.86,80.104-80.104,80.104H216.671c-44.237,0-80.104-35.867-80.104-80.104V111.656"/>
            <Rect x="131" y="96.888" fill="none" stroke="#CCCCCC" strokeWidth="3" strokeLinejoin="round" strokeMiterlimit="10" width="310.324" height="15.284"/>
            <Polygon fill="#CCCCCC" stroke="#CCCCCC" strokeWidth="3" strokeLinejoin="round" strokeMiterlimit="10" points="    438.6,205.561 133.725,205.561 133.725,204.912 133.725,189.188 133.725,188.536 438.6,188.536 438.6,189.188 438.6,204.912   "/>
            <Polygon fill="#CCCCCC" stroke="#CCCCCC" strokeWidth="3" strokeLinejoin="round" strokeMiterlimit="10" points="    438.6,375.263 133.725,375.263 133.725,374.617 133.725,358.895 133.725,358.242 438.6,358.242 438.6,358.895 438.6,374.617   "/>      
        </G>
        {uaNode.components.edges.map((component, i)=>
          <G key={i} x={40 + (i%2)*100} y={Math.floor(i/2)*50}>
            <UANodeDevice uaNode={component.node.uaNode}/>
          </G>
        )}
      </G>
  </Svg>
  <UANodeMethods uaNode={uaNode.commands}/>
</View>
  );

export default Mimic
