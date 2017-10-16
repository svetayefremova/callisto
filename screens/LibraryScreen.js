import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import { ImagePicker, FileSystem } from 'expo';

import { addPhoto } from '../actions';

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
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.props.addPhoto(result);
      this.props.navigation.navigate('gallery');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Take Picture From Camera Roll"
          onPress={this.onPickImage}
          buttonStyle={styles.button}
          backgroundColor={'transparent'}
          color={'black'}
          iconRight={{name: 'caret-down', type: 'font-awesome', style: { color: 'black' }}}
        />
      </View>
    );
  }
}

export default connect(null, { addPhoto })(LibraryScreen);

const styles = {
  container: {
    flex: 1,
    marginTop: 40
  },
  button: {
    marginVertical: 20
  }
};