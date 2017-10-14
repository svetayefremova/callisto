import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { Button } from 'react-native-elements';
import _ from 'lodash';

class WelcomeScreen extends Component {
  state = {
    token: null
  };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('main')
    } else {
      this.setState({ token: false })
    }
  }

  onPressButton = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
     <View style={styles.container}>
       <Text style={styles.text}>Welcome to Callisto</Text>
       <Button
         title="GO ON"
         onPress={this.onPressButton}
         buttonStyle={styles.button}
         raised
       />
     </View>
    )
  }
}

export default WelcomeScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  button: {
    backgroundColor: '#0288D1',
    marginTop: 15,
    width: 300,
  },
  text: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
  },
};