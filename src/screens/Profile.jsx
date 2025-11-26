import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("🔍 Iniciando busca do perfil...");
      console.log("👤 User do contexto:", user);
      
      if (!user) {
        console.log("❌ Usuário não encontrado no contexto");
        setLoading(false);
        return;
      }
      
      console.log("🆔 UID do usuário:", user.uid);
      
      try {
        const userRef = doc(db, "usuarios", user.uid);
        console.log("📄 Referência do documento criada");
        
        const snap = await getDoc(userRef);
        console.log("📥 Snapshot recebido:", snap.exists());
        
        if (snap.exists()) {
          const data = snap.data();
          console.log("✅ Dados do usuário:", data);
          setUserDoc(data);
        } else {
          console.log("⚠️ Documento não existe no Firestore");
          setError("Perfil não encontrado");
        }
      } catch (e) {
        console.error("❌ Erro ao buscar perfil:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erro: {error}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!userDoc) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Perfil não encontrado</Text>
        <Text style={styles.info}>Vamos criar seu perfil!</Text>
        <Text style={styles.info}>Email: {user?.email}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const prog = userDoc.progress || {};

  return (
    <ScrollView style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      {/* Header do Perfil */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.name}>{userDoc.nome || user.email}</Text>
        <Text style={styles.location}>{userDoc.cidade} - {userDoc.estado}</Text>
      </View>

      {/* Streak */}
      <View style={styles.streakCard}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <Text style={styles.streakNumber}>{userDoc.streak || 0}</Text>
        <Text style={styles.streakLabel}>dias de sequência</Text>
      </View>

      {/* Progresso */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>📊 Seu Progresso</Text>
        {Object.keys(prog).length > 0 ? (
          Object.keys(prog).map(k => (
            <View key={k} style={styles.progressCard}>
              <Text style={styles.progressTitle}>{k}</Text>
              <Text style={styles.progressStatus}>
                Status: {prog[k].completed ? "✅ Concluído" : "⏳ Em progresso"}
              </Text>
              <Text style={styles.progressModules}>
                Módulos completados: {(prog[k].modulesCompleted||[]).length}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noProgress}>Nenhum progresso registrado ainda.</Text>
        )}
      </View>
      <View style={{ marginTop: 30, marginBottom: 60 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#CC0000",
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
          }}
          onPress={logout}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6FFE6",
    padding: 20,
  },
  
  loading: {
    fontSize: 18,
    color: "#006600",
    textAlign: "center",
    marginTop: 100,
  },
  
  error: {
    fontSize: 18,
    color: "#CC0000",
    textAlign: "center",
    marginTop: 100,
    fontWeight: "bold",
  },
  
  info: {
    fontSize: 16,
    color: "#006600",
    textAlign: "center",
    marginTop: 20,
  },
  
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  
  backButtonText: {
    fontSize: 18,
    color: "#004000",
    fontWeight: "600",
  },
  
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#A5F2A5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },
  
  avatarEmoji: {
    fontSize: 50,
  },
  
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#004000",
    marginBottom: 5,
  },
  
  location: {
    fontSize: 16,
    color: "#006600",
  },
  
  streakCard: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 30,
    elevation: 3,
  },
  
  streakEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  
  streakNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#004000",
  },
  
  streakLabel: {
    fontSize: 16,
    color: "#003300",
    marginTop: 5,
  },
  
  progressSection: {
    marginBottom: 30,
  },
  
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#004000",
    marginBottom: 15,
  },
  
  progressCard: {
    backgroundColor: "#A5F2A5",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
  },
  
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003D00",
    marginBottom: 8,
  },
  
  progressStatus: {
    fontSize: 15,
    color: "#003300",
    marginBottom: 5,
  },
  
  progressModules: {
    fontSize: 14,
    color: "#004000",
  },
  
  noProgress: {
    fontSize: 16,
    color: "#006600",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 10,
  },
});