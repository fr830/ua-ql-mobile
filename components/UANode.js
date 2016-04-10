
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

import ForwardMenu from './ForwardMenu';
import BackwardMenu from './BackwardMenu';


import {createContainer} from 'recompose-relay';
import {compose,  withState} from 'recompose';

import ReferenceLinks from './ReferenceLinks';


const SideMenu = require('react-native-side-menu');


var styles = StyleSheet.create({
  container: {
    //width: 375,
    //flex: 1,
    backgroundColor: 'purple'
  }
});


const frags = (SubComponents)  => ({
  fragments: {
    uaNode: ()=> Relay.QL`
      fragment on UANode {
        ${ForwardMenu.getFragment('uaNode')}
        ${BackwardMenu.getFragment('uaNode')}
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
  compose(
    createContainer(frags(SubComponents)) ,
    withState('menuLeft', 'setMenuLeft', false),
    withState('menuRight', 'setMenuRight', false),
    withState('menuLeftStart', 'setMenuLeftStart', false),
    withState('menuRightStart', 'setMenuRightStart', false)
    
  )
    (({uaNode, navigator, menuLeft, setMenuLeft, menuRight, setMenuRight, menuRightStart, setMenuRightStart, menuLeftStart, setMenuLeftStart})=>
      <SideMenu
        menuPosition='left'
        onChange= {setMenuLeft}
        onStartOpen = {()=>setMenuLeftStart(true)}
        isOpen={menuLeft}
        menu={
          <BackwardMenu
            display={menuLeftStart}          
            uaNode= {uaNode}
            navigator={navigator}/>
        }>
        <SideMenu
          menuPosition='right'
          onChange= {setMenuRight}
          onStartOpen = {()=>setMenuRightStart(true)}
          isOpen={menuRight}
          menu={
            <ForwardMenu
              display={menuRightStart}
            
              uaNode= {uaNode}
              navigator={navigator}/>
            }>
          <ScrollView>
            <View style = {styles.container}>
              {SubComponents.map((S, i)=> <S key={i} uaNode={uaNode} navigator={navigator}/>)}
            </View>
          </ScrollView>
        </SideMenu>
      </SideMenu>
    );

export default UANode
