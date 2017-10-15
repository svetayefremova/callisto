import React, { Component } from 'react';
import { Text, View, Vibration } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import uuidv1 from 'uuid/v1';

const DIR_URL = FileSystem.documentDirectory + 'photos/';

class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Photo',
    tabBarIcon: () => <Icon name={"camera"} size={30} />,
    headerLeft: (
      <Button
        title="Cancel"
        onPress={() => navigation.dispatch(NavigationActions.back())}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    )
  });

  state = {
    hasCameraPermission: null
  };

  async componentWillMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermission: status === 'granted'
    });
  }

  onTakePhoto = async camera => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      await FileSystem.moveAsync({
        from: photo.uri,
        to: DIR_URL + `Photo_${uuidv1()}.jpg`,
      });
      Vibration.vibrate();
      this.props.navigation.navigate('gallery');
    }
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (_.isNull(hasCameraPermission)) {
      return <View />;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={this.state.type}
          ref={ref => { this.camera = ref }}
        >
          <View style={styles.bottomPanel}>
            <Button
              large
              icon={{ name: 'smile-o', type: 'font-awesome', size: 40, style: { marginRight: 0 } }}
              buttonStyle={styles.button}
              onPress={() => this.onTakePhoto(this.camera)}
            />
          </View>
        </Camera>
      </View>
    );

  }
}

export default CameraScreen;

const styles = {
  container: {
    flex: 1
  },
  camera: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1
  },
  bottomPanel: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    marginBottom: 50
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.24)',
  },
};