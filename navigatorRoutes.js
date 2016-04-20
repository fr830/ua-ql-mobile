import * as queryConfigs from './queries/queryConfigs';
import UANode from './components/UANode';
import UANodeName from './components/UANodeName';
import UANodeClass from './components/UANodeClass';
import UANodeMethods from './components/mimics/UANodeMethods';
import UANodeExecute from './components/mimics/UANodeExecute';
import UANodeNamespace from './components/UANodeNamespace';
import UANodeType from './components/UANodeType';
import UANodeDescription from './components/UANodeDescription';
import DataValue from './components/DataValue';
import UANodeNavBar from './components/UANodeNavBar';
import BackwardMenu from './components/BackwardMenu';
import ForwardMenu from './components/ForwardMenu';
import Boiler from './components/mimics/Boiler';


const globalMenuState = {
  menuLeftIsOpen: false,
  
  setMenuLeft: (isOpen)=>{
    globalMenuState.menuLeftDisplay = globalMenuState.menuLeftIsOpen = isOpen;
  },
  startMenuLeft: ()=>{
    globalMenuState.menuLeftDisplay = true;
  },
  
  menuRightIsOpen: false,
  setMenuRight: (isOpen)=>{
    globalMenuState.menuRightDisplay = globalMenuState.menuRightIsOpen = isOpen;
  },
  startMenuRight: ()=>{
    globalMenuState.menuRightDisplay = true;
  }
}

const MyUANode = UANode(globalMenuState);

export function uaNodeRouteSummary(nodeId) {
  return {
    title: 'UANodeSummary',
    Component: MyUANode(
      [
        UANodeNavBar(nodeId, 'summary'),
    	],
    	[
        UANodeName,
        UANodeClass,
    		UANodeDescription,
        UANodeNamespace,
        UANodeType
        
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}


export function uaNodeRouteMethods(nodeId, name) {
  return {
    title: 'UANodeMimic',
    Component: MyUANode(
      [
        UANodeNavBar(nodeId, name),
    	],
    	[
        UANodeName,
    		UANodeMethods
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}


export function uaNodeRouteMimic(nodeId, name) {
  return {
    title: 'UANodeMimic',
    Component: MyUANode(
      [
        UANodeNavBar(nodeId, name)
    	],
    	[
        UANodeName,
    		UANodeDescription,
        Boiler
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRouteVariable(nodeId, name) {
  return {
    title: 'UANodeVariable',
    Component: MyUANode(
      [
        UANodeNavBar(nodeId, name),
    	],
    	[
        UANodeName,
        DataValue
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}
export function uaNodeRouteExecute(nodeId, name) {
  return {
    title: 'UANodeExecute',
    Component: MyUANode(
      [
        UANodeNavBar(nodeId, name)
    	],
    	[
        UANodeName,
        UANodeExecute
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRouteBackward(nodeId, name) {
  return {
    title: 'UANodeBackward',
    Component: MyUANode(
      [
        UANodeNavBar(nodeId, name)
    	],
    	[
        UANodeName,
    		UANodeDescription,
        BackwardMenu
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRouteForward(nodeId, name) {
  return {
    title: 'UANodeForward',
    Component: MyUANode(
      [
        UANodeNavBar(nodeId, name),
    	],
    	[
        UANodeName,
    		UANodeDescription,
        ForwardMenu
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}