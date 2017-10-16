import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker, FileSystem } from 'expo';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import { addAvatar } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends Component {
  state = {
    username: null,
    avatarUri: null
  };

  onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ avatarUri: result.uri });
    }
  };

  onSave = async () => {
    const { username, avatarUri } = this.state;

    username &&
      await AsyncStorage.setItem('username', username);

    avatarUri &&
      this.props.addAvatar(avatarUri);

    this.props.navigation.navigate('gallery');
  };

  render() {
    const { avatarUri } = this.state;

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
          avatarUri &&
            <Image
              source={{ uri: avatarUri }}
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

export default connect(null, { addAvatar })(ProfileScreen);

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
    marginTop: 40,
    width: SCREEN_WIDTH * 0.8
  },
  imageButton: {
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 20,
    width: SCREEN_WIDTH * 0.8
  },
  input: {
    width: SCREEN_WIDTH * 0.8,
    marginBottom: 20
  },
  profilePicture: {
    width: 200,
    height: 200,
    marginTop: 8
  }
};