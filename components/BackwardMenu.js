
import Relay from 'react-relay';

import ReferenceMenu from './ReferenceMenu';

import {uaNodeRouteBackward} from '../navigatorRoutes';

const frags = (links) => ({
  initialVariables: {
    'dodisplay': false
  },
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        references(first:50 browseDirection: Inverse) @include(if: $dodisplay) {
          edges {
            ${links.getFragment('referenceDescriptions')}
          }
        }
      }
    `
  }
});
const Menu = ReferenceMenu(frags, 'flex-start', uaNodeRouteBackward);
export default Menu
