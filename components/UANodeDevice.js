import React from 'react-native';

import {
    G,
    Text
} from 'react-native-art-svg';

import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose, doOnReceiveProps} from 'recompose';
import LevelController from './devices/LevelController'

const frags =  {
  initialVariables: {
    'ftx': false,
    'valve': false,
    'li': false,
    'fc': false,
    'lc': false,
    'method': false,
    'simulation': false,
    'components': true
  },
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        displayName {
          text
        }
        components : references(first:1 referenceTypeId:"ns=0;i=46") {
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
        type : self @include(if: $components) {
          references(first:1 referenceTypeId:"ns=0;i=40") {
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
      }
    `
  }
}

const UANodeDevice = compose(
  createContainer(frags)
)
  (({uaNode})=>
  <G>
    <Text>
      {uaNode.displayName.text}
    </Text>
    {uaNode.type && uaNode.type.references.edges[0]
      ? <G y="10">
          {
            {
              LevelControllerType:<LevelController components={uaNode.components.edges.map(e =>e.node.uaNode)}/>
            }[uaNode.type.references.edges[0].node.uaNode.browseName.name] || <Text/>
          }
        </G>
      : <Text/>
    }
  </G>
  );

export default UANodeDevice
