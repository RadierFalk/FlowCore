import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { fetchTrilhas } from "../../services/content";
import { AuthContext } from "../../context/AuthContext";

export default function TrackList({ navigation }) {
  const { user } = useContext(AuthContext);
  const [trilhas, setTrilhas] = useState([]);

  useEffect(() => {
    (async () => {
      const t = await fetchTrilhas();
      setTrilhas(t);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trilhas</Text>
      {trilhas.map(trilha => {
        const locked = trilha.id !== "iniciante"; // inicialmente bloqueado; vamos checar usuario para desbloquear
        return (
          <TouchableOpacity
            key={trilha.id}
            style={[styles.card, locked && styles.locked]}
            onPress={() => navigation.navigate("TrackDetail", { trilhaId: trilha.id })}
            disabled={locked}
          >
            <Text style={styles.cardTitle}>{trilha.nome}</Text>
            <Text>{trilha.descricao}</Text>
            {locked && <Text style={styles.lockText}>Bloqueada</Text>}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  card: { padding: 16, backgroundColor: "#e6f7ff", borderRadius: 10, marginBottom: 12 },
  locked: { backgroundColor: "#ddd" },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  lockText: { marginTop: 8, color: "#666" }
});
