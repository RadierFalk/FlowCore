import React, { useState, useContext } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // NÃO usa setUser — o AuthContext vai atualizar automaticamente
    } catch (err) {
      setError("E-mail ou senha inválidos!");
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
        <Image
          source={require("../../../assets/logomascoteP.png")}
          style={{ width: 100, height: 110 }}
        />
        <Image
          source={require("../../../assets/NomeApp.png")}
          style={{ width: 200, height: 110, marginBottom: 0, marginTop: -20 }}
        />
        <Text style={styles.Description}>By RadLet Inc</Text>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isDark ? "#1f1f1f" : "#fff",
              color: isDark ? "#fff" : "#000"
            }
          ]}
          placeholder="E-mail"
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isDark ? "#1f1f1f" : "#fff",
              color: isDark ? "#fff" : "#000"
            }
          ]}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor={isDark ? "#ccc" : "#555"}
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Criar nova conta</Text>
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
    marginTop: 20,
  },
  Description: {
    fontSize: 13,
    marginBottom: 20,
    marginTop: -40,
    fontStyle: "italic",
    color: "#0A3D0A",
  },

  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#020202ff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#7a9b6a",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  error: {
    color: "red",
    marginBottom: 10,
  },

  link: {
    color: "#ff8800ff",
    marginTop: 10,
  },
});
