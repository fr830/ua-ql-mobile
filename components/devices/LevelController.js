import React from 'react-native';

import {
    G,
    Text
} from 'react-native-art-svg';

import {compose} from 'recompose';
import DataValue from './DataValue';



const LevelController = compose()
  (({components})=>
    <DataValue uaNode={components.filter(c =>c.browseName.name === 'Measurement')[0]}/>
  );

export default LevelController
