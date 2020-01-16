import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { NetworkProvider } from 'react-native-offline';

import store from './store';
import { RootStack } from './Routes';
import firebase from 'react-native-firebase';

const Analytics = firebase.analytics();
const defaultAppCrashlytics = firebase.crashlytics();

class App extends Component {
  constructor(props) {
    super(props);
    Analytics.setAnalyticsCollectionEnabled(true);
    Analytics.logEvent("app_launch");
  }

  render() {
    return (
      <Provider store={store}>
        <NetworkProvider>
          <View style={{flex: 1}}>
            <RootStack />
          </View>
        </NetworkProvider>
      </Provider>
    );
  }
}

export default App;
