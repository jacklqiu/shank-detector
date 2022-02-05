import React, { FC } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import { PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen: FC = () => {
  return (
    <View style={styles.container} >
      <MapView provider={PROVIDER_GOOGLE} style={styles.map}  

        initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapScreen
