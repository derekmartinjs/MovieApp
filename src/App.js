import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { NetworkProvider } from 'react-native-offline';

import store from './store';
import { RootStack } from './Routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <RootStack />
        </View>
      </Provider>
    );
  }
}

export default App;
