
import React, {View, Text} from 'react-native';

import Relay from 'react-relay';
const SideMenu = require('react-native-side-menu');

const menu = <View>
  <Text>does this work??</Text>
</View>;

export default function relayRenderScene({ title, Component, queryConfig }, navigator) {
  return (
    <Relay.RootContainer
      Component={Component}
      route={queryConfig}
      renderFetched={(data) => {
        return (
          //<SideMenu menu={menu}>
            <Component
                navigator={navigator}
                name={title}
                {...data}
            />
          //</SideMenu>
        );
      }}
    />
  );
}
