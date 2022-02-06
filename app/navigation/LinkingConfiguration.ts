/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Live: {
            screens: {
              Live: 'live',
            },
          },
          Camera: {
            screens: {
              Camera: 'camera',
            },
          },
          HomeScreen: {
            screens: {
              HomeScreen: 'home',
            },
          },
          MapScreen: {
            screens: {
              MapScreen: 'map',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
