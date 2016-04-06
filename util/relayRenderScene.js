
import React from 'react-native';

import Relay from 'react-relay';

export default function relayRenderScene({ title, Component, queryConfig }, navigator) {
  return (
    <Relay.RootContainer
      Component={Component}
      route={queryConfig}
      renderFetched={(data) => {
        return (
          <Component
            navigator={navigator}
            name={title}
            {...data}
          />
        );
      }}
    />
  );
}
