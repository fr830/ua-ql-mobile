import React from 'react-native';

import {
    G,
    Text
} from 'react-native-art-svg';

import {compose} from 'recompose';
import DataValue from './DataValue';
import {wrap} from '../DeviceWrapper';




const CustomController = compose()
  (({uaNode})=>
    wrap({height:40, width:100}, uaNode, <DataValue sources={uaNode.properties} browseName="ControlOut"/>)
 
  );

export default CustomController
