import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Constants } from 'expo';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './screens/CameraScreen';
import LibraryScreen from './screens/LibraryScreen';

const MainNavigator = TabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: { screen: StackNavigator({
    gallery: { screen: GalleryScreen },
    profile: { screen: ProfileScreen },
    modal: { screen: TabNavigator({
      camera: { screen: CameraScreen },
      library: { screen: LibraryScreen },
    }, {
      tabBarOptions: {
        showLabel: Platform.OS === 'android'
      },
      backBehavior: 'none'
    })}
  }, {
    mode: 'modal',
    cardStyle: {
      paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
    }
  })}
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: true
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

export default App;