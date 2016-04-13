
import Relay from 'react-relay';

export class UaNodeQuery extends Relay.Route {
  static queries = {
    root: () => Relay.QL`
      query {
        uaNode(nodeId: "ns=0;i=84")
      }
   `,
    uaNode: () => Relay.QL`
      query {
        uaNode(nodeId: $nodeId)
      }
    `
  };
  static paramDefinitions = {
    nodeId: {required: true}
  };
  static routeName = 'UaNodeQuery';

}
