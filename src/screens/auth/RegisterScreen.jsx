import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirm) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nome: name,
        cidade: city,
        estado: state,
        email,
        streak: 0,
        progress: {},
        criadoEm: new Date().toISOString(),
      });

    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError("Erro ao cadastrar usuário!");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? "#1f1f1f" : "#fff", color: isDark ? "#fff" : "#000" }
          ]}
          placeholder="Nome completo"
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? "#1f1f1f" : "#fff", color: isDark ? "#fff" : "#000" }
          ]}
          placeholder="Cidade"
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? "#1f1f1f" : "#fff", color: isDark ? "#fff" : "#000" }
          ]}
          placeholder="Estado"
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={state}
          onChangeText={setState}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? "#1f1f1f" : "#fff", color: isDark ? "#fff" : "#000" }
          ]}
          placeholder="E-mail"
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? "#1f1f1f" : "#fff", color: isDark ? "#fff" : "#000" }
          ]}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? "#1f1f1f" : "#fff", color: isDark ? "#fff" : "#000" }
          ]}
          placeholder="Confirmar senha"
          secureTextEntry
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={confirm}
          onChangeText={setConfirm}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#F1FFF1",
    paddingVertical: 60,
  },
  
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 30,
    color: "#0A3D0A", 
  },
  
  input: { 
    width: "80%", 
    borderWidth: 1, 
    borderColor: "#0c0c0cff", 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 15 
  },
  
  button: { 
    backgroundColor: "#7A9B6A", 
    padding: 12, 
    borderRadius: 10, 
    width: "80%", 
    alignItems: "center" 
  },
  
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  
  error: { 
    color: "red", 
    marginBottom: 10 
  },
});
