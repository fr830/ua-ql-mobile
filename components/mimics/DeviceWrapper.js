import React, {View} from 'react-native';

import {
    Svg,
    G,
    Text
} from 'react-native-art-svg';




export function wrap(props, uaNode, control){
  return <View>
      <Svg {...props}>
        <G>
          <Text>
            {uaNode.displayName.text}
          </Text>
          <G y="10">
             {control}
          </G>
        </G>
      </Svg>
    </View>
};
