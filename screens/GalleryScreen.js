import React, { Component } from 'react';
import { View, FlatList, Text, Image, Dimensions, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { FileSystem, AppLoading } from 'expo';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPhotos, fetchAvatar } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PHOTOS_DIR_URL = FileSystem.documentDirectory + 'photos/';
const PROFILE_DIR_URL = FileSystem.documentDirectory + 'profile/';

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
    username: null
  };

  async componentWillMount() {
    await Promise.all([
      FileSystem.makeDirectoryAsync(PHOTOS_DIR_URL, { intermediates: true }),
      FileSystem.makeDirectoryAsync(PROFILE_DIR_URL, { intermediates: true })
    ]);
  }

  async componentDidMount() {
    this.props.fetchPhotos();
    this.props.fetchAvatar();

    const username = await AsyncStorage.getItem('username');
    this.setState({ username: _.isNull(username) ? 'Default Username' : username });
  }

  onOpenCamera = () => {
    this.props.navigation.navigate('modal');
  };

  renderImage = ({ item }) => {
    return <Image
      style={styles.picture}
      source={{
        uri: PHOTOS_DIR_URL + item,
      }}
      key={item}
    />;
  };

  render() {
    const { username } = this.state;
    const { photos, avatar } = this.props;

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
              data={photos}
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
                  source={{ uri: PROFILE_DIR_URL + avatar }}
                />
              : <View style={[styles.profileImage, styles.defaultImage]}/>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ photos, profile }) => {
  return {
    photos: photos.photos,
    avatar: profile.avatar
  };
};

export default connect(mapStateToProps, { fetchPhotos, fetchAvatar })(GalleryScreen);

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