import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, AsyncStorage, Image } from 'react-native';
import { ImagePicker, FileSystem } from 'expo';
import { Button, FormLabel, FormInput } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DIR_URL = FileSystem.documentDirectory + 'photos/';
const PROFILE_PICTURE = 'profile.jpg';

class ProfileScreen extends Component {
  state = {
    username: null,
    avatar: null
  };

  onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
    }
  };

  onSave = async () => {
    const { username, avatar } = this.state;

    await Promise.all([
      username && AsyncStorage.setItem('username', username),
      avatar && FileSystem.moveAsync({
        from: avatar,
        to: DIR_URL + PROFILE_PICTURE,
      })
    ]);

    this.props.navigation.navigate('gallery');
  };

  render() {
    const { avatar } = this.state;

    return(
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Change Profile's Data</Text>
        <FormLabel>Username</FormLabel>
        <FormInput
          containerStyle={styles.input}
          onChangeText={username => this.setState({username})} />
        <FormLabel>Profile Picture</FormLabel>
        <Button
          title="Take Picture From Camera Roll"
          onPress={this.onPickImage}
          buttonStyle={styles.imageButton}
          backgroundColor={'transparent'}
          color={'grey'}
        />
        {
          avatar &&
            <Image
              source={{ uri: avatar }}
              style={styles.profilePicture}
            />
        }
        <Button
          title="SAVE"
          onPress={this.onSave}
          containerViewStyle={styles.button}
          backgroundColor={'#0288D1'}
          raised
        />
      </ScrollView>
    )
  }
}

export default ProfileScreen;

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 40
  },
  title: {
    fontSize: 18,
    marginBottom: 24
  },
  button: {
    marginTop: 40
  },
  imageButton: {
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 20
  },
  input: {
    width: SCREEN_WIDTH * 0.8
  },
  profilePicture: {
    width: 200,
    height: 200,
    marginTop: 8
  }
};