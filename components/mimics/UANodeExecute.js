import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import {Observable} from 'rx-lite';
import {observeProps} from 'rx-recompose';
import socketObservable from '../../sockets/SocketObservable'
import Button from 'react-native-button';
import UANodeName from '../UANodeName';


var styles = StyleSheet.create({
  textStyle : {
    fontSize: 12
  },
  containerStyle: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius:4,
    backgroundColor: '#FFFF00'
  }
});

const frags =  {
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        id
        ${UANodeName.getFragment('uaNode')}
        nodeId {
          identifierType
          value
          namespace
        }
        parent: references(first:1 browseDirection: Inverse referenceTypeId: "ns=0;i=47") {
          edges {
            node {
              uaNode {
                id
              }
            }
          }
        }
      }
    `
  }
};

class CallUAMethodMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {callUAMethod}`;
  }
  getVariables() {
    return {
      id: this.props.uaNode.id,
      parent: this.props.uaNode.parent.edges[0].node.uaNode.id
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CallUAMethodPayload {
        uaNode {outputArguments}
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        uaNode: this.props.uaNode.id
      }
    }];
  }
 }

const onFailure = (transaction) => {
  var error = transaction.getError() || new Error('Mutation failed.');
  alert(error);
};

const _handleMethod = (uaNode)=>
    // To perform a mutation, pass an instance of one to `Relay.Store.commitUpdate`
 	()=>
 		Relay.Store.commitUpdate(new CallUAMethodMutation({uaNode: uaNode}), {onFailure});


const UANodeExecute = compose(
  createContainer(frags),
  observeProps(props$=>{
      const uaNode = props$.map(p=>p.uaNode)
      return {
        uaNode,
        executable: uaNode.map(v=>{
            return socketObservable(`Executable:ns=${v.nodeId.namespace};i=${v.nodeId.value}`);
          })
          .switch()
      };
    })  
  
)
  (({uaNode, executable})=>
  {
    if(executable && executable.value && executable.value.value && executable.value.value.value) {
      return <Button 
        containerStyle={styles.containerStyle} 
        style={styles.style}
        onPress = {_handleMethod(uaNode)}>
          <UANodeName uaNode={uaNode}/>
        </Button>
    } else {
      return <UANodeName uaNode={uaNode}/>
    }
  }
);

export default UANodeExecute
