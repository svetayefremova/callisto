import React, { Component } from 'react';
import { View, Text, Image, Vibration } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import { ImagePicker, FileSystem } from 'expo';
import uuidv1 from 'uuid/v1';

const DIRECTORY_URI = FileSystem.documentDirectory + 'photos/';

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


  onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      await FileSystem.moveAsync({
        from: result.uri,
        to: DIRECTORY_URI + `Photo_${uuidv1()}.jpg`,
      });
      Vibration.vibrate();
      this.props.navigation.navigate('gallery');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Camera Roll"
          onPress={this.onPickImage}
          buttonStyles={styles.button}
          backgroundColor={'transparent'}
          color={'black'}
          iconRight={{name: 'caret-down', type: 'font-awesome', style: { color: 'black' }}}
        />
      </View>
    );
  }
}

export default LibraryScreen;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginVertical: 20
  }
};