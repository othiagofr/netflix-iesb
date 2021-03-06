'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AppContext from '../AppContext';
import { translate } from '../languages/utils';

export default class Camera extends PureComponent {

  constructor(props) {
    super();
    this.takePicture =  this.takePicture.bind(this)
  }

  render() {

    return (
      <AppContext.Consumer>
        {({ editProfileIcon }) =>
          (<View style={styles.container}>

            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: translate('permissionForCamera'),
                message: translate('iNeedYourCamerasPermission'),
                buttonPositive: translate('grant'),
                buttonNegative: translate('deny'),
              }}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => this.takePicture(editProfileIcon)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> {translate('snap')} </Text>
              </TouchableOpacity>
            </View>

          </View>)
        }
      </AppContext.Consumer>
    )
  }

  takePicture = async (callback) => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      callback(this.props.route.params.name, data.uri)
      this.props.navigation.navigate('Mais');
    }
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});