import React, {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import UANodeExecute from './UANodeExecute';

var styles = StyleSheet.create({
  listView: {
    flex:0,
    paddingTop: 20,
    paddingBottom: 10
  },
  listViewContent: {
    flex: 1,
    alignItems:'flex-start'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

const frags =  {
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        methods: references(first:30 browseDirection:Forward nodeClasses:[Method] ){
          edges {
            node {
              uaNode {
                id
                ${UANodeExecute.getFragment('uaNode')}
              }
            }
          }
        }
      }
    `
  }
}

const lv = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const UANodeMethods = compose(createContainer(frags))
  (({uaNode})=>
    <ListView
      style={styles.listView}
      contentContainerStyle={[styles.listViewContent, {alignItems: 'center'} ]}
      dataSource = {lv.cloneWithRows(uaNode.methods.edges)}
      renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      renderRow = {(row)=>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <UANodeExecute uaNode={row.node.uaNode}/>
        </View>
      }>
    </ListView>
  );

export default UANodeMethods
