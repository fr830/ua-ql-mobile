
import  React from 'react-native';
import {
    G,
    Text
} from 'react-native-art-svg';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose,} from 'recompose';
import {Observable} from 'rx-lite';
import {observeProps} from 'rx-recompose';
import socketObservable from '../../../sockets/SocketObservable'


const DataValue = compose(
  
    observeProps(props$=>{
      //uaNode={components.filter(c =>c.browseName.name === 'Measurement')[0]}
      const uaNode = props$.map(p=>p.sources.edges.map(e =>e.node.uaNode).filter(c =>c.browseName.name === p.browseName)[0])
      return {
        uaNode,
        value: uaNode.map(v=>{
            console.log('n', v);
            return socketObservable(`Value:ns=${v.nodeId.namespace};i=${v.nodeId.value}`);
          })
          .switch()
      };
    }),
    

    )(({value})=> {
      return <Text>{value && value.value && value.value.value ? (Math.round((value.value.value.value + 0.00001) * 100) / 100).toString() : 'nok'}</Text>
    }
      
        
      
    );

export default DataValue;
