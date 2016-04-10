
import Relay from 'react-relay';

import ReferenceMenu from './ReferenceMenu';

const frags = (links) => ({
  initialVariables: {
    'dodisplay': false
  },
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        references(first:10 browseDirection: Inverse) @include(if: $dodisplay) {
          edges {
            ${links.getFragment('referenceDescriptions')}
          }
        }
      }
    `
  }
});
const Menu = ReferenceMenu(frags, 'flex-start');
export default Menu
