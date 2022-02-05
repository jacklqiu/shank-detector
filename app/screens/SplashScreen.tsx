import React, { FC } from 'react'
import {Text, withTheme} from 'react-native-paper';
import {View} from 'react-native';

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
        {/* <Text style={{fontFamily:"Roboto", fontSize:24, fontWeight:'bold', color: 'white'}}>
          Remember to
        </Text>
        <Text style={{fontFamily:"Roboto", fontSize:144, fontWeight:'bold', color: 'white'}} onPressIn={} onPressOut={}>
          Stay Safe
        </Text> */}
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({

// })

export default withTheme(SplashScreen);
