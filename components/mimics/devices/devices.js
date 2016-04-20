import React from 'react-native';
import LevelIndicator from './LevelIndicator';
import LevelController from './LevelController';
import FlowController from './FlowController';
import CustomController from './CustomController';




export const deviceTypes = (uaNode, components)=>({
   LevelIndicatorType: <LevelIndicator uaNode={uaNode} components={components}/>,
   LevelControllerType: <LevelController uaNode={uaNode} components={components}/>,
   FlowControllerType: <FlowController  uaNode={uaNode}  components={components}/>,
   CustomControllerType: <CustomController  uaNode={uaNode}  components={components}/>
})
