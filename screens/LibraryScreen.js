import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class LibraryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Library',
    tabBarIcon: () => <Icon name={"th-large"} size={30} />,
    headerLeft: (
      <Button
        title="Cancel"
        onPress={() => navigation.dispatch(NavigationActions.back())}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    )
  });

  render() {
    return(
      <View>
        <Text>Library</Text>
      </View>
    )
  }
}

export default LibraryScreen;