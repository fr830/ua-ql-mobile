
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

import Menu from './Menu';

import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';

import ReferenceLinks from './ReferenceLinks';

import Carousel from 'react-native-spring-carousel';

import ScrollableTabView from 'react-native-scrollable-tab-view';

const SideMenu = require('react-native-side-menu');


var styles = StyleSheet.create({
  container: {
    //width: 375,
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'purple'
  }
});


const frags = (SubComponents)  => ({
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        ${Menu.getFragment('uaNode')}
        ${SubComponents.map(s=>s.getFragment('uaNode'))}
        backwardReferences: references(first:10 browseDirection: Inverse) {
          edges {
            ${ReferenceLinks.getFragment('referenceDescriptions')}
          }
        }
        forwardReferences: references(first:100 browseDirection: Forward) {
          edges {
            ${ReferenceLinks.getFragment('referenceDescriptions')}
          }
        }
      }
    `
  }
});

const UANode = (SubComponents) =>
  compose(createContainer(frags(SubComponents)))
    (({uaNode, navigator})=>
      <SideMenu
        menuPosition='left'
        menu={
          <Menu
            //display={true}
            uaNode= {uaNode}
            navigator={navigator}/>
        }>
        <SideMenu
          menuPosition='right'
          menu={
            <Menu
              uaNode= {uaNode}
              navigator={navigator}/>
            }>
          <ScrollView>
            <View style = {styles.container}>
              <ReferenceLinks
                referenceDescriptions= {uaNode.backwardReferences.edges}
                navigator={navigator}
                header={<Text>&lt;&lt;</Text>}/>
                
                {SubComponents.map((S, i)=> <S key={i} uaNode={uaNode} navigator={navigator}/>)}

              <ReferenceLinks
                referenceDescriptions= {uaNode.forwardReferences.edges}
                navigator={navigator}
                header={<Text>&gt;&gt;</Text>}/>
            </View>
          </ScrollView>
        </SideMenu>
      </SideMenu>
    );

export default UANode
