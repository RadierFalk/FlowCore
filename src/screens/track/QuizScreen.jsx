// src/screens/QuizScreen.jsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuizScreen({ navigation, route }) {
  const trilha = route?.params?.trilha || "iniciante";
  const [step, setStep] = useState(-1);
  const [message, setMessage] = useState("");
  const [vidas, setVidas] = useState(3);
  const [selectedOption, setSelectedOption] = useState(null);

  const perguntas = [
    {
      id: 1,
      pergunta: "Esse sanduíche é famoso em Manaus. Qual o nome dele?",
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
  // 🔥 Define perguntas por trilha
  const perguntas =
    trilha === "iniciante"
      ? [
          {
            id: 1,
            pergunta: "Qual fruto é amplamente consumido no Amazonas e muito usado com farinha?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: ["Cajá", "Açaí", "Buriti", "Tucumã"],
            correta: "Açaí",
          },
          {
            id: 2,
            pergunta: "Como é chamado os bois do Festival de Parintins?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Cajú e Castanha",
              "Caprichoso e Garantido",
              "Simone e Simaria",
              "Pepê e Neném",
            ],
            correta: "Caprichoso e Garantido",
          },
        ]
      : trilha === "intermediaria"
      ? [
          {
            id: 1,
            pergunta: "Qual rio é o principal responsável pela bacia amazônica?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: ["Rio Negro", "Rio Amazonas", "Rio Madeira", "Rio Solimões"],
            correta: "Rio Amazonas",
          },
          {
            id: 2,
            pergunta: "Qual das cidades abaixo NÃO fica no Amazonas?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: ["Parintins", "Tefé", "Santarém", "Coari"],
            correta: "Santarém",
          },
          {
            id: 3,
            pergunta: "O que significa o termo 'caprichoso' no Festival de Parintins?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Boizinho vermelho",
              "Boizinho azul",
              "Alegoria indígena",
              "Personagem folclórico",
            ],
            correta: "Boizinho azul",
          },
        ]
      : [
          {
            id: 1,
            pergunta: "A lenda da Iara fala sobre uma mulher que vive:",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Nas copas das árvores, encantando caçadores",
              "Nos rios, encantando homens com seu canto",
              "Nas montanhas, protegendo os animais",
              "Nas aldeias, ensinando sobre os espíritos da floresta",
            ],
            correta: "Nos rios, encantando homens com seu canto",
          },
          {
            id: 2,
            pergunta: "A lenda da Matinta Pereira diz que ela aparece:",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Durante o dia, assobiando perto das árvores",
              "À noite, assobiando e pedindo tabaco",
              "Ao amanhecer, pedindo café nas casas",
              "Durante a cheia dos rios, pedindo comida",
            ],
            correta: "À noite, assobiando e pedindo tabaco",
          },
        ];

  // 🔥 Função para tratar respostas
  const handleResposta = async (resposta) => {
    setSelectedOption(resposta);

    if (resposta === perguntas[step].correta) {
      setMessage("🎉 Esse Bicho é bom mesmo! Acertou!");
      setTimeout(async () => {
        if (step < perguntas.length - 1) {
          setStep(step + 1);
          setMessage("");
          setSelectedOption(null);
        } else {
          // Salva progresso conforme a trilha concluída
          if (trilha === "iniciante") {
            await AsyncStorage.setItem("trilha_iniciante_concluida", "true");
          } else if (trilha === "intermediaria") {
            await AsyncStorage.setItem("trilha_intermediaria_concluida", "true");
          } else if (trilha === "avancada") {
            await AsyncStorage.setItem("trilha_avancada_concluida", "true");
          }

          Alert.alert(
            "🎉 Parabéns!",
            trilha === "iniciante"
              ? "Você concluiu a Trilha Iniciante! Trilha Intermediária desbloqueada!"
              : trilha === "intermediaria"
              ? "Você concluiu a Trilha Intermediária! Trilha Avançada desbloqueada!"
              : "Você concluiu a Trilha Avançada! Tu é lenda, mano!",
            [
              {
                text: "Voltar pro Lobby",
                onPress: () => navigation.navigate("Lobby"),
              },
            ],
            { cancelable: false }
          );
        }
      }, 1200);
    } else {
      setMessage("😅 Olha o papo desse bicho! Tenta outra vez!");
      setVidas(vidas - 1);

      if (vidas - 1 <= 0) {
        setTimeout(() => {
          Alert.alert(
            "Tu moscou!",
            "Perdeu todas as vidas, tenta de novo mano!",
            [
              {
                text: "Voltar pro Lobby",
                onPress: () => navigation.navigate("Lobby"),
              },
            ],
            { cancelable: false }
          );
        }, 1000);
      }
    }
  };

  if (step === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {trilha === "iniciante"
            ? "🌿 Trilha Iniciante"
            : trilha === "intermediaria"
            ? "🏞️ Trilha Intermediária"
            : "🎭 Trilha Avançada"}
        </Text>

        <Text style={styles.intro}>
          {trilha === "iniciante"
            ? "Bem-vindo! Aqui você vai testar seus conhecimentos sobre a cultura do Norte!"
            : trilha === "intermediaria"
            ? "Agora o desafio ficou mais difícil! Mostra que tu é caboclo raiz!"
            : "Modo lenda ativado! As perguntas agora são pra quem conhece mesmo a Amazônia!"}
        </Text>

        <TouchableOpacity style={styles.startButton} onPress={() => setStep(0)}>
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

      {imagem && <Image source={imagem} style={styles.imagem} resizeMode="contain" />}

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
    backgroundColor: "#ffffffff",
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
    backgroundColor: "#7A9B6A",
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
  optionCerta: {
    backgroundColor: "#8FFFA1",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  optionErrada: {
    backgroundColor: "#FF8F8F",
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
  imagem: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 60,
  },
  vidas: {
  position: 'absolute',
  top: 50, 
  left: 20,
  fontSize: 16,
  fontWeight: 'bold',
  zIndex: 10,
  },
  optionCerta: {
    backgroundColor: "#C8FACC",
  },
});

