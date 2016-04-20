import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';

var styles = StyleSheet.create({
  textStyle : {
    fontSize: 12
  }
});

const frags =  {
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        nodeClass
      }
    `
  }
}

const UANodeClass = compose(createContainer(frags))
  (({uaNode})=>
    <Text
      style = {styles.textStyle}>
      {uaNode.nodeClass}
    </Text>
  );

export default UANodeClass
