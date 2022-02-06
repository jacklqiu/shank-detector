import React, { FC, useEffect, useState } from 'react'
import MapView, { Callout, CalloutSubview, Marker } from 'react-native-maps'
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native'
import { Card } from 'react-native-paper'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { setupPointListener } from '../config/DAO'
import { CameraPoint } from '../fakeDatapoints/cameraLocations'

const MapScreen: FC = () => {
  const [cameraLocations, setCameraLocations] = useState<CameraPoint[]>([])
    console.log(cameraLocations);
  const [location, setLocation] = useState<Location.LocationObject>()
  const [errorMsg, setErrorMsg] = useState<string>()

  const mapStyle = [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
        {
          saturation: '-100',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36,
        },
        {
          color: '#000000',
        },
        {
          lightness: 40,
        },
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'off',
        },
        {
          color: '#000000',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#000000',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#000000',
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#4d6059',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#4d6059',
        },
      ],
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#4d6059',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#4d6059',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#4d6059',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#7f8d89',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#7f8d89',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#7f8d89',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#7f8d89',
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#7f8d89',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#7f8d89',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#7f8d89',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#7f8d89',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#2b3638',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2b3638',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#24282b',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#24282b',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ]

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      console.log(location)
    })()

    setupPointListener((points) => {
      points = points.filter((p : any) => p.isThreat && p.isThreat === true)
      setCameraLocations(cameraLocations.concat(points))
    })
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
    return (
      <View>
        <Card>
          <Text>{text}</Text>
        </Card>
      </View>
    )
  } else if (location) {
    text = JSON.stringify(location)
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1922,
            longitudeDelta: 0.1221,
          }}
          customMapStyle={mapStyle}
          showsUserLocation={true}
        >
          {cameraLocations.map((loc, i) => (
            <MapMarker key={i} id={i} loc={loc} />
          ))}
        </MapView>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  )
}

interface MarkerProps {
  id: number
  loc: CameraPoint
}
const MapMarker: FC<MarkerProps> = ({ loc, id }) => {
  return (
    <Marker
      key={id}
      coordinate={{
        latitude: Number(loc.latitude),
        longitude: Number(loc.longitude),
      }}
      title={loc.title}
    >
      <Callout>
        <Text>{loc.title}</Text>
        <Text>
          <Image
            source={{ uri: loc.image_url }}
            style={{ height: 100, width: 100 }}
            resizeMode="cover"
          />
        </Text>
        <Text>{new Date(loc.timestamp).toDateString()}</Text>
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapScreen
