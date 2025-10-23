import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { db } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function TrilhaIniciante({ navigation }) {
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    const fetchModulos = async () => {
      const q = query(collection(db, "modulos"));
      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map((doc) => doc.data());
      setModulos(lista.sort((a, b) => a.ordem - b.ordem));
    };
    fetchModulos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trilha Iniciante</Text>
      {modulos.map((m) => (
        <TouchableOpacity
          key={m.id}
          style={styles.card}
          onPress={() => navigation.navigate("Modulo", { modulo: m })}
        >
          <Text style={styles.cardTitle}>{m.titulo}</Text>
          <Text style={styles.cardDesc}>
            {m.tipo === "text"
              ? "📖 Texto"
              : m.tipo === "video"
              ? "🎬 Vídeo"
              : "❓ Quiz"}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: {
    backgroundColor: "#eaf3ff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardDesc: { fontSize: 14, color: "#555" },
});
