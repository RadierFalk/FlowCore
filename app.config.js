import { runtimeVersion } from "expo-updates";

export default {
  expo: {
    name: "FlowCore",
    slug: "FlowCore",
    owner: "radierfalk",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logomascoteP.png",
    userInterfaceStyle: "light",
    "newArchEnabled": true,
    splash: {
      image: "./assets/logomascoteP.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anomynous.FlowCore"
    },
    android: {
      package: "com.anomynous.FlowCore",
      adaptiveIcon: {
        foregroundImage: "./assets/logomascoteP.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },

    updates: {
      url: "https://u.expo.dev/377d25ae-ed60-4bfc-bcb4-8d36a62d64d3"
    },
    runtimeVersion: {
      policy: "appVersion"
    },

    // 👇 AQUI tu adiciona as configs secretas
    extra: {
      firebaseApiKey: "AIzaSyA2R026bYrrdBKhFLQ5iwfL64gtTzAlLs0",
      firebaseAuthDomain: "flowcore-dfaf7.firebaseapp.com",
      firebaseProjectId: "flowcore-dfaf7",
      firebaseStorageBucket: "flowcore-dfaf7.firebasestorage.app",
      firebaseMessagingSenderId: "1003635530017",
      firebaseAppId: "1:1003635530017:web:b58d2fb81a674f114cc660",
      eas: {
        projectId: "377d25ae-ed60-4bfc-bcb4-8d36a62d64d3"
      }
    },
  },
};
