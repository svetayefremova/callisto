import React, { Component } from 'react';
import { View, FlatList, Text, Image, Dimensions, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { FileSystem, AppLoading } from 'expo';
import _ from 'lodash';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DIR_URL = FileSystem.documentDirectory + 'photos/';
const PROFILE_PICTURE = 'profile.jpg';

class GalleryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Callisto',
    headerLeft: null,
    headerRight: (
      <Button
        title="Profile"
        onPress={() => navigation.navigate('profile')}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    )
  });

  state = {
    photos: [],
    username: null
  };

  async componentWillMount() {
    try {
      await FileSystem.makeDirectoryAsync(DIR_URL);
    } catch(e) {
      console.log(e, 'Directory exists');
    }
  }

  async componentDidMount() {
    let [ photos, username ] = await Promise.all([
      FileSystem.readDirectoryAsync(DIR_URL),
      AsyncStorage.getItem('username'),
    ]);

    this.setState({
      photos,
      username: _.isNull(username) ? 'Default Username' : username
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      photos: nextProps.photos,
    });
  }

  onOpenCamera = () => {
    this.props.navigation.navigate('modal');
  };

  renderImage = ({ item }) => {
    return <Image
      style={styles.picture}
      source={{
        uri: DIR_URL + item,
      }}
      key={item}
    />;
  };

  render() {
    const { photos, username } = this.state;
    const avatar = photos && photos.find(image => image === PROFILE_PICTURE);

    return(
      <View style={styles.container}>
        <Button
          icon={{ name: 'plus', type: 'font-awesome', style: { marginRight: 0 } }}
          onPress={this.onOpenCamera}
          containerViewStyle={styles.button}
          backgroundColor={'#0288D1'}
          raised
        />
        {
          photos &&
            <FlatList
              data={photos && photos.filter(item => item !== PROFILE_PICTURE)}
              renderItem={this.renderImage}
              keyExtractor={item => item}
              numColumns={3}
            />
        }
        <View style={styles.profile}>
          <Text>{`${username}`.toUpperCase()}</Text>
          {
            avatar
              ? <Image
                  style={styles.profileImage}
                  source={{ uri: DIR_URL + PROFILE_PICTURE}}
                />
              : <View style={[styles.profileImage, styles.defaultImage]}/>
          }
        </View>
      </View>
    )
  }
}

export default GalleryScreen;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  button: {
    marginVertical: 15,
  },
  picture: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  profileImage: {
    marginLeft: 20,
    width: 50,
    height:50,
    borderRadius: 25
  },
  defaultImage: {
    backgroundColor: 'lightgrey'
  }
};