import "@fontsource/playfair-display/700.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/rubik";
import React from "react";
import { firebaseConfig } from "../constants/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { isLoaded, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto";


const theme = extendTheme({
  colors: {
    lc: {
      // blue: "#14213d",
      black: "#000000",
      white: "#ffffff",
      darkBrown: "#82685f",
      brown: "#A78A7F",
      lightBrown: "#bda59c",
      darkGrey: "#333333",
      cream: "#f0d6bb",
      grey: "#eeeeee",
      // platinum: "#e5e5e5",
    },
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#333333",
      },
      "h1, h2, h3, p": {
        color: "#f0d6bb",
      },
    },
  },
  fonts: {
    heading: "Playfair Display",
    body: "Rubik",
  },
});

// react-redux-firebase config
const rrfConfig = {
  // userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// init firebase
firebase.initializeApp(firebaseConfig);

const rrfProps = {
  config: rrfConfig,
  dispatch: store.dispatch,
  initializeAuth: false,
  firebase,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
  );
}

// export default wrapper.withRedux(MyApp);
export default MyApp;
