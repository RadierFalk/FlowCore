import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    // Animação ou tempo de carregamento poderia ir aqui
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logomascoteP.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.text}>Carregando FlowCore...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
