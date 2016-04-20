
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
import {compose,} from 'recompose';
import {Observable} from 'rx-lite';
import {observeProps} from 'rx-recompose';
import socketObservable from '../sockets/SocketObservable'


const DataValue = compose(
  createContainer(
    {
      fragments: {
        uaNode: () => Relay.QL`
          fragment on UANode {
            nodeId {
              identifierType
              value
              namespace
            }
          }
         `
        }
      }
    ),
    observeProps(props$=>{
      const uaNode = props$.map(p=>p.uaNode)
      return {
        uaNode,
        value: uaNode.map(v=>{
            console.log('n', v);
            return socketObservable(`Value:ns=${v.nodeId.namespace};i=${v.nodeId.value}`);
          })
          .switch()
      };
    }),
    

    )(({uaNode, value})=>
      <View>
        <Text>Value: </Text>
        <Text>{JSON.stringify(value, null, '\t')}</Text>
      </View>
    );

export default DataValue;
