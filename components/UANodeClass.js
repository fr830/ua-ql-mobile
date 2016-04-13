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
  },
  viewStyle : {
    alignItems: 'center'
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
    <View
      style={styles.viewStyle}>
      <Text
        style = {styles.textStyle}>
        {uaNode.nodeClass}
      </Text>
    </View>
  );

export default UANodeClass
