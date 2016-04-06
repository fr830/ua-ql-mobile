import * as queryConfigs from './queries/queryConfigs';
import UANode from './components/UANode';
import UANodeName from './components/UANodeName';
import UANodeDescription from './components/UANodeDescription';
import UANodeNavBar from './components/UANodeNavBar';


export function uaNodeRoute(nodeId) {
  return {
    title: 'UANode',
    Component: UANode(
    	[		
    		UANodeNavBar(nodeId, 'first'),
    		UANodeName,
    		UANodeDescription
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}


export function uaNodeRoute1(nodeId) {
  return {
    title: 'UANode',
    Component: UANode(
    	[
    		UANodeNavBar(nodeId, 'second'),
    		UANodeName,
    		UANodeDescription
    		
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRoute2(nodeId) {
  return {
    title: 'UANode',
    Component: UANode(
    	[
    		UANodeNavBar(nodeId, 'third'),
    		UANodeName,
    		UANodeDescription
    		
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRoute3(nodeId) {
  return {
    title: 'UANode',
    Component: UANode(
    	[
    		UANodeNavBar(nodeId, 'fourth'),
    		UANodeName,
    		UANodeDescription
    		
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}

export function uaNodeRoute4(nodeId) {
  return {
    title: 'UANode',
    Component: UANode(
    	[
    		UANodeNavBar(nodeId, 'fifth'),
    		UANodeName,
    		UANodeDescription
    		
    	]
    ),
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}