import React, {View, Text} from 'react-native';

import {
    Svg,
    G
} from 'react-native-art-svg';

import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';

const frags = (mimicFragments) =>  ({
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        ${mimicFragments}
        displayName {
          text
        }
        nodeId {
          identifierType
          value
          namespace
        }
        components : references(first:100 referenceTypeId:"ns=0;i=47") {
          edges {
            node {
              uaNode {
                nodeId {
                  identifierType
                  value
                  namespace
                }
                browseName {
                  namespaceIndex
                  name
                }
                displayName {
                  text
                }
              }
            }
          }
        }
        properties : references(first:100 referenceTypeId:"ns=0;i=46") {
          edges {
            node {
              uaNode {
                nodeId {
                  identifierType
                  value
                  namespace
                }
                browseName {
                  namespaceIndex
                  name
                }
                displayName {
                  text
                }
              }
            }
          }
        }
        type: references(first:1 referenceTypeId:"ns=0;i=40") {
          edges {
            node {
              uaNode {
                browseName {
                  namespaceIndex
                  name
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
});

const UANodeDevice = (mimicFragments) => compose(
  createContainer(frags(mimicFragments))
)
  (({uaNode, deviceTypes, mimicTypes, fromdrum})=> {
    
    const mimic = mimicTypes(uaNode)[uaNode.type.edges[0].node.uaNode.browseName.name];
    const Device = deviceTypes(uaNode)[uaNode.type.edges[0].node.uaNode.browseName.name];
    const {Control, SubControls} =  mimic || {};
    return <View>
      {
          Device
      }
      {
          Control
      }
      {
          SubControls
      }
    </View>
    }
  );

export default UANodeDevice
