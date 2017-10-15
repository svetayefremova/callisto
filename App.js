import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

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
        showLabel: false
      },
      backBehavior: 'none'
    })}
  }, {
    mode: 'modal'
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