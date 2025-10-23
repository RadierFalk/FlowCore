import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const snap = await getDoc(doc(db, "usuarios", user.uid));
      if (snap.exists()) setUserDoc(snap.data());
    })();
  }, [user]);

  if (!userDoc) return <Text>Carregando perfil...</Text>;

  const prog = userDoc.progress || {};

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{userDoc.nome || user.email}</Text>
      <Text>{userDoc.cidade} - {userDoc.estado}</Text>
      <Text style={{ marginTop: 12 }}>Streak: {userDoc.streak || 0} dias</Text>
      <Text style={{ marginTop: 12 }}>Progresso:</Text>
      {Object.keys(prog).map(k => (
        <View key={k} style={{ marginTop: 8 }}>
          <Text>{k} - concluído: {prog[k].completed ? "Sim" : "Não"} - módulos: {(prog[k].modulesCompleted||[]).length}</Text>
        </View>
      ))}
    </View>
  );
}
