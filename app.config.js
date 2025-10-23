export default {
  expo: {
    name: "FlowCore",
    slug: "FlowCore",
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
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logomascoteP.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },

    // 👇 AQUI tu adiciona as configs secretas
    extra: {
      firebaseApiKey: "AIzaSyA2R026bYrrdBKhFLQ5iwfL64gtTzAlLs0",
      firebaseAuthDomain: "flowcore-dfaf7.firebaseapp.com",
      firebaseProjectId: "flowcore-dfaf7",
      firebaseStorageBucket: "flowcore-dfaf7.firebasestorage.app",
      firebaseMessagingSenderId: "1003635530017",
      firebaseAppId: "1:1003635530017:web:b58d2fb81a674f114cc660",
    },
  },
};
