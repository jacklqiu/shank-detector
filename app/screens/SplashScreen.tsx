import React, { FC } from 'react'
import {withTheme} from 'react-native-paper';
import {Text, View} from 'react-native';

const SplashScreen: FC = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: '100%'}}>
        <Text style={{fontSize:24, fontWeight:'bold', color: 'white'}}>
          Remember to
        </Text>
        <Text style={{fontSize:144, fontWeight:'bold', color: 'white'}}>
          Stay Safe
        </Text>
      </View>
    </View>
  );
}

export default withTheme(SplashScreen);
