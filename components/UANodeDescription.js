
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView
} from 'react-native';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';


var styles = StyleSheet.create({
  textStyle : {
    fontSize: 15,
    fontStyle: 'italic'
  },
  viewStyle : {
    alignItems: 'center'
  }
});


const frags =  {
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        description {
          text
        }
      }
    `
  }
}

const UANodeDescription = compose(createContainer(frags))
  (({uaNode})=>
    <View 
      style={styles.viewStyle}>
       <Text
        style={styles.textStyle}>
        {uaNode.description ? uaNode.description.text : ''}
      </Text>
    </View>
  );

export default UANodeDescription
