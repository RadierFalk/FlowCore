// src/screens/Lobby.jsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Lobby({ navigation }) {
  const scaleAnim = new Animated.Value(1);

  const [inicianteConcluido, setInicianteConcluido] = useState(false);
  const [intermediariaConcluida, setIntermediariaConcluida] = useState(false);

  // 🔥 Função para carregar o progresso salvo
  const loadProgress = async () => {
    try {
      const iniciante = await AsyncStorage.getItem("trilha_iniciante_concluida");
      const intermediaria = await AsyncStorage.getItem("trilha_intermediaria_concluida");

      setInicianteConcluido(iniciante === "true");
      setIntermediariaConcluida(intermediaria === "true");
    } catch (e) {
      console.log("Erro ao carregar progresso:", e);
    }
  };

  // 🔥 Carrega ao entrar NA TELA (não apenas no primeiro render)
  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [])
  );

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = (trilha) => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    navigation.navigate("Quiz", { trilha });
  };

  return (
    <View style={styles.container}>

      {/* Botão de Perfil */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
        activeOpacity={0.7}
      >
        <View style={styles.profileIcon}>
          <Text style={styles.profileEmoji}>👤</Text>
        </View>
      </TouchableOpacity>

      <Image 
        source={require("../../assets/logomascoteP.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Trilhas do Grande Cacique</Text>
      <Text style={styles.subtitle}>
        Inicie sua caminhada e embarque nessa jornada de cultura e conhecimento!
      </Text>

      {/* Trilha Iniciante */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[styles.trilhaCard, styles.trilhaIniciante]}
          onPressIn={handlePressIn}
          onPressOut={() => handlePressOut("iniciante")}
        >
          <Text style={styles.trilhaTitle}>🐒 Nivel Curumim</Text>
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
        <Text style={styles.trilhaTitle}>🦜 Nivel Pajé</Text>
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
        <Text style={styles.trilhaTitle}>🐆 Nivel Cacique</Text>
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
  logo: {
    width: 90,
    height: 120,
    alignSelf: "center",
    marginBottom: 0,
    marginTop: 20,
  },

  profileButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#A5F2A5",
    justifyContent: "center",
    alignItems: "center",
  },

  profileEmoji: {
    fontSize: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#004000",
    marginTop: 40,
    marginBottom: 30,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#006600",
    textAlign: "center",
    marginBottom: 20,
  },

  trilhaCard: {
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
    elevation: 4,
  },

  trilhaIniciante: { backgroundColor: "#A5F2A5" },
  trilhaIntermediaria: { backgroundColor: "#8FF2E3" },
  trilhaAvancada: { backgroundColor: "#FFD700" },

  trilhaTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003D00",
  },

  trilhaDescription: {
    fontSize: 15,
    color: "#003300",
    marginTop: 6,
  },

  trilhaBloqueada: {
    backgroundColor: "#D0E6D0",
    opacity: 0.6,
  },
});
