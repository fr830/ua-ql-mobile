
import Relay from 'react-relay';

export class UaNodeQuery extends Relay.Route {
  static queries = {
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
