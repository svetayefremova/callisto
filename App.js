import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MainScreen from './screens/MainScreen';
import UserScreen from './screens/UserScreen';

const MainNavigator = TabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: { screen: StackNavigator({
    list: { screen: MainScreen },
    user: { screen: UserScreen }
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