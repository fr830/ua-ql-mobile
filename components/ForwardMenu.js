
import Relay from 'react-relay';

import ReferenceMenu from './ReferenceMenu';

import {uaNodeRouteForward} from '../navigatorRoutes';


const frags = (links) => ({
  initialVariables: {
    'dodisplay': false
  },
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        references(first:10 browseDirection: Forward) @include(if: $dodisplay) {
          edges {
            ${links.getFragment('referenceDescriptions')}
          }
        }
      }
    `
  }
});
const Menu = ReferenceMenu(frags, 'flex-end', uaNodeRouteForward);
export default Menu
