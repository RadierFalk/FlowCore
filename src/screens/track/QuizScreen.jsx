// src/screens/QuizScreen.jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function QuizScreen({ navigation }) {
  const [step, setStep] = useState(-1); // -1 = tela inicial
  const [message, setMessage] = useState("");

  const perguntas = [
    {
      id: 1,
      pergunta: "Qual desses pratos é típico do Amazonas?",
      opcoes: ["Acarajé", "X-Caboquinho", "Cuscuz Paulista", "Feijoada"],
      correta: "X-Caboquinho",
    },
    {
      id: 2,
      pergunta: "Como é chamado os bois do Festival de Parintins?",
      opcoes: ["Cajú e Castanha", "Maiara e Maraisa", "Caprichoso e Garantido", "Pepe e Nenem"],
      correta: "Caprichoso e Garantido",
    },
  ];

  const handleResposta = (resposta) => {
    if (resposta === perguntas[step].correta) {
      setMessage("🎉 Boa! Tu tá por dentro da cultura nortista!");
      if (step < perguntas.length - 1) {
        setTimeout(() => {
          setStep(step + 1);
          setMessage("");
        }, 1200);
      } else {
        setTimeout(() => {
          navigation.navigate("Lobby");
        }, 1500);
      }
    } else {
      setMessage("😅 Errou! Tenta de novo, caboco!");
    }
  };

  // Tela inicial do quiz
  if (step === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🌿 Trilha Iniciante</Text>
        <Text style={styles.intro}>
          Bem-vindo! Aqui você vai testar seus conhecimentos sobre a cultura do
          Norte. Responda corretamente para liberar mais trilhas!
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setStep(0)} // agora começa o quiz de verdade
        >
          <Text style={styles.startText}>Começar Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Renderiza a pergunta atual
  const { pergunta, opcoes } = perguntas[step];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pergunta}</Text>

      {opcoes.map((op) => (
        <TouchableOpacity
          key={op}
          style={styles.option}
          onPress={() => handleResposta(op)}
        >
          <Text style={styles.optionText}>{op}</Text>
        </TouchableOpacity>
      ))}

      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8FFE8",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A3D0A",
    textAlign: "center",
    marginBottom: 20,
  },
  intro: {
    fontSize: 16,
    color: "#004D00",
    textAlign: "center",
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: "#48C774",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  startText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  option: {
    backgroundColor: "#C8FACC",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  optionText: {
    color: "#004D00",
    fontSize: 16,
    textAlign: "center",
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});
