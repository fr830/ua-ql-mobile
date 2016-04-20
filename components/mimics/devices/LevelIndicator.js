import React from 'react-native';

import {
    G,
    Text
} from 'react-native-art-svg';

import {compose} from 'recompose';
import DataValue from './DataValue';
import {wrap} from '../DeviceWrapper';


const LevelIndicator = compose()
  (({uaNode})=> 
    wrap({height:40, width:100}, uaNode, <DataValue sources={uaNode.components} browseName="Output"/>)
  );

export default LevelIndicator
