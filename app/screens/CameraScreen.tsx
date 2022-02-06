import { Camera } from 'expo-camera'
import React, { useEffect, useRef, useState, FC } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  Button,
  Platform,
  Share,
  StatusBar,
  Modal,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { getApps, initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import uuid from 'react-native-uuid'
import * as Location from 'expo-location'

interface State {
  image?: string
  uploading: boolean
  location?: Location.LocationObject
  errorMsg?: string
  sent: boolean
}

export default class App extends React.Component<undefined, State> {
  state: State = {
    image: undefined,
    uploading: false,
    location: undefined,
    errorMsg: undefined,
    sent: false,
  }

  async componentDidMount() {

      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        this.setState({
          errorMsg: 'Permission to access location was denied',
        })
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      this.setState({
        location,
      })
      console.log(location)
  
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

   _maybeSendReport = async () => {
    return await fetch('http://d266-2a0c-5bc0-40-2e34-83a0-4440-5dc9-3849.ngrok.io/predict', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: this.state.image,
        timestamp: Date.now(),
        longitude: String(this.state.location?.coords.longitude),
        latitude: String(this.state.location?.coords.latitude),
      }),
    })
      .then(() => alert("Report was sent"))
  }

  render() {
    let { image } = this.state

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* {!!image && (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}
          >
            To submit a report you must take a photo of the crime
          </Text>
        )} */}
        <Button onPress={this._takePhoto} title="Snap a incident" color="#841584" />

        {this.state.image && (this.state.location ? (
          <Button
            onPress={this._maybeSendReport}
            title="Send!"
            color="#841584"
          />) : <Text>Loading location data...</Text>
        )}
        
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    )
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )
    }
  }

  _maybeRenderImage = () => {
    let { image } = this.state
    if (!image) {
      return
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    )
  }

  _takePhoto = async () => {
    this.setState({image:undefined})
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [4, 3],
    })

    this._handleImagePicked(pickerResult)
  }

  _handleImagePicked = async (pickerResult: any) => {
    try {
      this.setState({ uploading: true })
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri)
        this.setState({ image: uploadUrl })
      }
    } catch (e) {
      console.log(e)
      alert('Upload failed, sorry :(')
    } finally {
      this.setState({ uploading: false })
    }
  }
}

async function uploadImageAsync(uri: string) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send()
  })

  const fileRef = ref(getStorage(), uuid.v4().toString())
  const result = await uploadBytes(fileRef, blob)

  // We're done with the blob, close and release it
  blob.close()

  return await getDownloadURL(fileRef)
}
