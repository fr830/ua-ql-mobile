import * as queryConfigs from './queries/queryConfigs';
import UANode from './components/UANode';
import UANodeName from './components/UANodeName';
import UANodeClass from './components/UANodeClass';
import UANodeDescription from './components/UANodeDescription';
import DataValue from './components/DataValue';
import UANodeNavBar from './components/UANodeNavBar';
import BackwardMenu from './components/BackwardMenu';
import ForwardMenu from './components/ForwardMenu';
import Mimic from './components/Mimic';


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
    		UANodeName,
        UANodeClass,
    		UANodeDescription
        
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}


export function uaNodeRouteMimic(nodeId) {
  return {
    title: 'UANodeMimic',
    Component: MyUANode(
    	[
        UANodeNavBar(nodeId, 'mimic'),
    		UANodeName,
    		UANodeDescription,
        Mimic
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRouteVariable(nodeId) {
  return {
    title: 'UANodeVariable',
    Component: MyUANode(
    	[
        UANodeNavBar(nodeId, 'variable'),
    		UANodeName,
        DataValue
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRouteBackward(nodeId) {
  return {
    title: 'UANodeBackward',
    Component: MyUANode(
    	[
        UANodeNavBar(nodeId, 'backward'),
    		UANodeName,
    		UANodeDescription,
        BackwardMenu
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRouteForward(nodeId) {
  return {
    title: 'UANodeForward',
    Component: MyUANode(
    	[
        UANodeNavBar(nodeId, 'forward'),
    		UANodeName,
    		UANodeDescription,
        ForwardMenu
    		
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}