// src/screens/Lobby.jsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Lobby({ navigation }) {
  const scaleAnim = new Animated.Value(1);
  const [inicianteConcluido, setInicianteConcluido] = useState(false);
  const [intermediariaConcluida, setIntermediariaConcluida] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const iniciante = await AsyncStorage.getItem("trilha_iniciante_concluida");
        const intermediaria = await AsyncStorage.getItem("trilha_intermediaria_concluida");
        if (iniciante === "true") setInicianteConcluido(true);
        if (intermediaria === "true") setIntermediariaConcluida(true);
      } catch (e) {
        console.log("Erro ao carregar progresso:", e);
      }
    };
    loadProgress();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = (trilha) => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    navigation.navigate("Quiz", { trilha });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trilhas de Aprendizado</Text>
      <Text style={styles.subtitle}>
        Escolha sua trilha e embarque nessa jornada de cultura e conhecimento!
      </Text>

      {/* Trilha Iniciante */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[styles.trilhaCard, styles.trilhaIniciante]}
          onPressIn={handlePressIn}
          onPressOut={() => handlePressOut("iniciante")}
        >
          <Text style={styles.trilhaTitle}>🌿 Trilha Iniciante</Text>
          <Text style={styles.trilhaDescription}>
            Comece sua jornada aprendendo sobre a cultura e tradições do Norte!
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Trilha Intermediária */}
      <TouchableOpacity
        style={[
          styles.trilhaCard,
          inicianteConcluido ? styles.trilhaIntermediaria : styles.trilhaBloqueada,
        ]}
        activeOpacity={inicianteConcluido ? 0.8 : 1}
        onPress={() =>
          inicianteConcluido && navigation.navigate("Quiz", { trilha: "intermediaria" })
        }
      >
        <Text style={styles.trilhaTitle}>🏞️ Trilha Intermediária</Text>
        <Text style={styles.trilhaDescription}>
          {inicianteConcluido
            ? "Agora você pode continuar sua jornada!"
            : "Desbloqueie após concluir a trilha iniciante!"}
        </Text>
      </TouchableOpacity>

      {/* Trilha Avançada */}
      <TouchableOpacity
        style={[
          styles.trilhaCard,
          intermediariaConcluida ? styles.trilhaAvancada : styles.trilhaBloqueada,
        ]}
        activeOpacity={intermediariaConcluida ? 0.8 : 1}
        onPress={() =>
          intermediariaConcluida && navigation.navigate("Quiz", { trilha: "avancada" })
        }
      >
        <Text style={styles.trilhaTitle}>🎭 Trilha Avançada</Text>
        <Text style={styles.trilhaDescription}>
          {intermediariaConcluida
            ? "Modo lenda desbloqueado! Encare as lendas amazônicas!"
            : "Desbloqueie após concluir a trilha intermediária!"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6FFE6",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#005500",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#004000",
    marginBottom: 30,
  },
  trilhaCard: {
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
    elevation: 4,
  },
  trilhaIniciante: { backgroundColor: "#A5F2A5" },
  trilhaIntermediaria: { backgroundColor: "#8FF2E3" },
  trilhaAvancada: { backgroundColor: "#C7A5F2" },
  trilhaTitle: { fontSize: 22, fontWeight: "bold", color: "#003D00" },
  trilhaDescription: { fontSize: 15, color: "#003300", marginTop: 6 },
  trilhaBloqueada: { backgroundColor: "#D0E6D0", opacity: 0.6 },
});
