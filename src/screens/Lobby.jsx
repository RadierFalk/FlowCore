import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function LobbyScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao FlowCore 🎉</Text>
      <Text style={styles.subtitle}>Usuário: {user?.email}</Text>

      <View style={styles.tracks}>
        <Text style={styles.track}>🪶 Trilha Iniciante</Text>
        <Text style={styles.track}>🔥 Trilha Intermediária (bloqueada)</Text>
        <Text style={styles.track}>⚔️ Trilha Avançada (bloqueada)</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 10 },
  tracks: { marginTop: 40, alignItems: "center" },
  track: { fontSize: 18, marginBottom: 10 },
  button: { backgroundColor: "red", padding: 12, borderRadius: 8, marginTop: 30 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
