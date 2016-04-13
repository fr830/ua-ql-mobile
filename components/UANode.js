
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
    flex: 1,
    backgroundColor: 'purple'
  },
  supercontainer: {
    flex:1,
    backgroundColor: 'green'
  }
});


const frags = (SubComponents)  => ({
  fragments: {
    root: ()=>Relay.QL`
      fragment on UANode {
        id
        ${SubComponents.filter(s=>s.root).map(s=>s.getFragment('root'))}
      }
    `,
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



const UANode = (globalMenuState)=>{
  return (SubComponents) => {
    return compose(
      createContainer(frags(SubComponents)) ,
      withState('menuRightStart', 'setMenuRightStart', false),
      withState('menuLeftStart', 'setMenuLeftStart', false)
    )
      (({root, uaNode, navigator, menuRightStart, setMenuRightStart, menuLeftStart, setMenuLeftStart})=> {
       return <SideMenu
            menuPosition='right'
            onChange= {globalMenuState.setMenuRight}
            onStartOpen = {()=>setMenuRightStart(true)}
            isOpen={globalMenuState.menuRightIsOpen}
            menu={
              <ForwardMenu
                display={menuRightStart || globalMenuState.menuRightIsOpen}
                uaNode= {uaNode}
                navigator={navigator}/>
              }>
              <SideMenu
              menuPosition='left'
              onChange= {globalMenuState.setMenuLeft}
              onStartOpen = {()=>setMenuLeftStart(true)}
              isOpen={globalMenuState.menuLeftIsOpen}
              menu={
                <BackwardMenu
                  display={menuLeftStart || globalMenuState.menuLeftIsOpen}
                  uaNode= {uaNode}
                  navigator={navigator}/>
                }>
             <View style = {styles.supercontainer}>
              <ScrollView style={{flex:1}}>
                <View style = {styles.container}>
                  {SubComponents.map((S, i)=> <S key={i} root={root} uaNode={uaNode} navigator={navigator}/>)}
                </View>
              </ScrollView>
            </View>
          </SideMenu>
        </SideMenu>
        
      });
  }
};
export default UANode
