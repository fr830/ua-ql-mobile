
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView
} from 'react-native';

import Relay from 'react-relay';

import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';

import ReferenceLink from './ReferenceLink';


var styles = StyleSheet.create({
  listView: {
    flex:0,
    paddingTop: 20,
    paddingBottom: 10
  },
  listViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});


const frags =  {
  fragments: {
    referenceDescriptions: ()=> Relay.QL`
      fragment on ReferenceEdge @relay(plural: true) {        
        node {
          ${ReferenceLink.getFragment('referenceDescription')}
        }
      }
    `
  }
}

const lv = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const ReferenceLinks = compose(createContainer(frags))
  (({referenceDescriptions, navigator, header})=>

    <ListView
      renderHeader={()=><View>{header}</View>}
      //renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
      style={styles.listView}
      contentContainerStyle={styles.listViewContent}
      dataSource = {lv.cloneWithRows(referenceDescriptions)}
      renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      renderRow = {(row)=>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ReferenceLink
            referenceDescription={row.node}
            navigator={navigator}/>
        </View>
      }>
    </ListView>
  );




export default ReferenceLinks

