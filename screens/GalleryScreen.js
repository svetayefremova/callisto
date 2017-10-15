import React, { Component } from 'react';
import { View, FlatList, Text, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { FileSystem } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DIRECTORY_URI = FileSystem.documentDirectory + 'photos/';

class MainScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Callisto',
    headerLeft: null
  };

  state = {
    photos: [],
  };

  async componentWillMount() {
    try {
      await FileSystem.makeDirectoryAsync(DIRECTORY_URI)
    } catch(e) {
      console.log(e, 'Directory exists');
    }
  }

  async componentDidMount() {
    let photos = await FileSystem.readDirectoryAsync(DIRECTORY_URI);

    this.setState({ photos });
  }

  onOpenCamera = () => {
    this.props.navigation.navigate('modal');
  };

  renderImage = ({ item }) => {
    return <Image
      style={styles.picture}
      source={{
        uri: DIRECTORY_URI + item,
      }}
      key={item}
    />;
  };

  render() {
    console.log('state', this.state.photos);
    return(
      <View style={styles.container}>
        <Button
          icon={{ name: 'plus', type: 'font-awesome', style: { marginRight: 0 } }}
          onPress={this.onOpenCamera}
          buttonStyle={styles.button}
          raised
        />
        {
          this.state.photos &&
            <FlatList
              data={this.state.photos}
              renderItem={this.renderImage}
              keyExtractor={item => item}
              numColumns={3}
            />
        }

      </View>
    )
  }
}

export default MainScreen;

const styles = {
  container: {
    flex: 1
  },
  button: {
    backgroundColor: '#0288D1',
    marginVertical: 15,
  },
  picture: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
  }
};