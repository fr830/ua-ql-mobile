import * as queryConfigs from './queries/queryConfigs';
import UANode from './components/UANode';

export function dashboardRoute(nodeId) {
  return {
    title: 'UANode',
    Component: UANode,
    queryConfig: new queryConfigs.UaNodeQuery({nodeId})
  };
}