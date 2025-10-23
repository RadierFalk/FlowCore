// src/screens/QuizScreen.jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";

export default function QuizScreen({ navigation }) {
  const [step, setStep] = useState(-1); // -1 = introdução
  const [message, setMessage] = useState("");
  const [vidas, setVidas] = useState(3);
  const [selectedOption, setSelectedOption] = useState(null);

  const perguntas = [
    {
      id: 1,
      pergunta: "Qual desses pratos é típico do Amazonas?",
      imagem: require("../../../assets/X-cab.jpg"), // coloca tua imagem na pasta assets
      opcoes: ["Acarajé", "X-Caboquinho", "Cuscuz Paulista", "Feijoada"],
      correta: "X-Caboquinho",
    },
    {
      id: 2,
      pergunta: "Como é chamado os bois do Festival de Parintins?",
      imagem: require("../../../assets/G_C.jpg"), // coloca tua imagem na pasta assets
      opcoes: ["Cajú e Castanha", "Caprichoso e Garantido", "Simone e Simaria", "Pepê e Neném"],
      correta: "Caprichoso e Garantido",
    },
  ];

  const handleResposta = (resposta) => {
    setSelectedOption(resposta);

    if (resposta === perguntas[step].correta) {
      setMessage("🎉 Esse Bicho é bom mesmo! Acertou!");
      setTimeout(() => {
        if (step < perguntas.length - 1) {
          setStep(step + 1);
          setMessage("");
          setSelectedOption(null);
        } else {
          // Mostra alerta de parabéns
          setTimeout(() => {
            Alert.alert("🎉 Parabéns!", "Você concluiu a trilha!",
              [{
                text: "Continuar",
                onPress: () => navigation.navigate("Lobby")
              }],
              {cancelable: false}
            );
            navigation.navigate("Lobby");
          }, 500);
        }
      }, 1200);
    } else {
      setMessage("😅 Olha o papo desse bicho! Tenta outra vez!");
      setVidas(vidas - 1);

      if (vidas - 1 <= 0) {
        setTimeout(() => {
          Alert.alert(" Tu moscou!", "Tenta de novo mano!",
            [{
              text: "Continuar",
              onPress: () => navigation.navigate("Lobby")
            }],
            {cancelable: false}
          );
          navigation.navigate("Lobby");
        }, 1000);
      }
    }
  };

  // Tela inicial do quiz
  if (step === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🌿 Trilha Iniciante</Text>
        <Text style={styles.intro}>
          Bem-vindo! Aqui você vai testar seus conhecimentos sobre a cultura do Norte.
          Responda corretamente e avance nas trilhas!
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setStep(0)}
        >
          <Text style={styles.startText}>Começar Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { pergunta, opcoes, imagem } = perguntas[step];

  return (
    <View style={styles.container}>
      <Text style={styles.vidas}>💚 Vidas: {vidas}</Text>
      <Text style={styles.title}>{pergunta}</Text>

      {imagem && (
        <Image source={imagem} style={styles.imagem} resizeMode="contain" />
      )}

        {opcoes.map((op) => {
          const isSelected = selectedOption === op;
          const isCorrect = op === perguntas[step].correta;

          let optionStyle = styles.option;
          if (isSelected && !isCorrect) optionStyle = styles.optionErrada;
          if (isSelected && isCorrect) optionStyle = styles.optionCerta;

          return (
            <TouchableOpacity
              key={op}
              style={optionStyle}
              onPress={() => handleResposta(op)}
              // Removido disabled
            >
              <Text style={styles.optionText}>{op}</Text>
            </TouchableOpacity>
          );
        })}
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