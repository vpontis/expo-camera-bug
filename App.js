import React, { Component, useState, useRef, useEffect } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Permissions } from 'react-native-unimodules';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

class TakePhoto extends Component {
  cameraRef = null;

  state = {
    hasPermission: false,
    cameraRef: null,
  }

  async componentDidMount () {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasPermission: status === 'granted',
    })
  }

  takePhotoAsync = async() => {
    console.log(this.cameraRef)

    const capturedPicture = await this.cameraRef.takePictureAsync({
      quality: 0.2,
      base64: true,
      // onPictureSaved: async () => {
      //   console.log('picture saved')
      // },
    });

    console.log(capturedPicture.base64)
  }

  render () {
    const {hasPermission} = this.state;

    if (!hasPermission) {
      return (
        <View>
          <Text>No camera permission</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Camera ref={(ref) => {
          console.log('setting ref of camera', ref)
          this.cameraRef = ref
        }} style={{flex: 1}}/>

        <Button
          dark={true}
          mode={'contained'}
          onPress={this.takePhotoAsync}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 50,
            right: 20,
          }}
          title={'Snap Photo'}
        />
      </View>
    );
  }
}


export default class App extends Component {
  render() {
    return (
      <TakePhoto/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


