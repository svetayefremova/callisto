import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import GalleryScreen from './screens/GalleryScreen';
import UserScreen from './screens/UserScreen';
import CameraScreen from './screens/CameraScreen';
import LibraryScreen from './screens/LibraryScreen';

const MainNavigator = TabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: { screen: StackNavigator({
    gallery: { screen: GalleryScreen },
    user: { screen: UserScreen },
    modal: { screen: TabNavigator({
      library: { screen: LibraryScreen },
      camera: { screen: CameraScreen }
    }, {
      tabBarOptions: {
        showLabel: false
      }
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