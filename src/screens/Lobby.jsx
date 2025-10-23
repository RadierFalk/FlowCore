// src/screens/Lobby.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Lobby({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trilhas de Aprendizado</Text>

      <TouchableOpacity
        style={styles.trilhaCard}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.trilhaTitle}>🌿 Trilha Iniciante</Text>
        <Text style={styles.trilhaDescription}>
          Comece sua jornada aprendendo sobre a cultura e tradições do Norte!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.trilhaCard, styles.trilhaBloqueada]}>
        <Text style={styles.trilhaTitle}>🏞️ Trilha Intermediária</Text>
        <Text style={styles.trilhaDescription}>
          Desbloqueie após concluir a trilha iniciante!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.trilhaCard, styles.trilhaBloqueada]}>
        <Text style={styles.trilhaTitle}>🎭 Trilha Avançada</Text>
        <Text style={styles.trilhaDescription}>
          Mergulhe nas lendas e histórias da Amazônia!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FFF0",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A3D0A",
    marginBottom: 20,
    textAlign: "center",
  },
  trilhaCard: {
    backgroundColor: "#B2FF9E",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  trilhaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004D00",
  },
  trilhaDescription: {
    fontSize: 14,
    color: "#003300",
    marginTop: 8,
  },
  trilhaBloqueada: {
    opacity: 0.5,
    backgroundColor: "#D9EAD3",
  },
});
