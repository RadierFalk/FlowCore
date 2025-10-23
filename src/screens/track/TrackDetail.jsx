import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { fetchTrilhaById, fetchModulosByIds } from "../../services/content";
import { AuthContext } from "../../contexts/AuthContext";

export default function TrackDetail({ route, navigation }) {
  const { trilhaId } = route.params;
  const { user } = useContext(AuthContext);
  const [trilha, setTrilha] = useState(null);
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    (async () => {
      const t = await fetchTrilhaById(trilhaId);
      setTrilha(t);
      if (t) {
        const mods = await fetchModulosByIds(t.modulos || []);
        setModulos(mods);
      }
    })();
  }, [trilhaId]);

  if (!trilha) return <Text>Carregando trilha...</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize:20, fontWeight:"bold" }}>{trilha.nome}</Text>
      <Text style={{ marginVertical: 8 }}>{trilha.descricao}</Text>

      {modulos.map(m => (
        <View key={m.id} style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold" }}>{m.titulo}</Text>
          <Text>Tipo: {m.tipo}</Text>
          <TouchableOpacity style={{ marginTop: 8, backgroundColor: "#28a745", padding: 8, borderRadius: 6 }}
            onPress={() => {
              if (m.tipo === "quiz" || m.quizId) {
                navigation.navigate("QuizScreen", { quizId: m.quizId, trilhaId, moduleId: m.id });
              } else {
                // abrir conteúdo (text/video/game) — você implementa conforme tipo
                alert("Abrir conteúdo: " + m.tipo);
              }
            }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Abrir</Text>
          </TouchableOpacity>
        </View>
      ))}

    </ScrollView>
  );
}
