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

  // 🔥 Define perguntas por trilha (ÚNICA DECLARAÇÃO)
  const perguntas =
    trilha === "iniciante"
      ? [
          {
            id: 1,
            pergunta: "Qual é a lenda amazônica sobre um boto que se transforma em homem??",
            imagem: require("../../../assets/X-cab.jpg"),
            opcoes: ["Lenda do Curupira", "Lenda do Boto Cor de Rosa", "Lenda da Iara", "Lenda do Mapinguari"],
            correta: "Lenda do Boto Cor de Rosa",
          },
          {
            id: 2,
            pergunta: "Qual é o prato típico amazonense feito com mandioca fermentada?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Vatapá",
              "Feijoada",
              "Tucupi",
              "Acarajé",
            ],
            correta: "Tucupi",
          },
          {
            id: 3,
            pergunta: "Qual personagem do folclore amazônico protege a floresta e tem os pés virados para trás?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Saci-Pererê",
              "Curupira",
              "Caipora",
              "Boitatá",
            ],
            correta: "Curupira",
          },
          {
            id: 4,
            pergunta: "Qual é o principal festival folclórico de Parintins?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Carnaval",
              "Festival de Parintins (Boi-Bumbá)",
              "Festa Junina",
              "Círio de Nazaré",
            ],
            correta: "Festival de Parintins (Boi-Bumbá)",
          },
          {
            id: 5,
            pergunta: "Qual fruto amazônico é muito usado na produção de sorvetes e sucos roxos?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Cupuaçu",
              "Graviola",
              "Açaí",
              "Bacuri",
            ],
            correta: "Açaí",
          },
        ]
      : trilha === "intermediaria"
      ? [
          {
            id: 1,
            pergunta: "Na lenda da Iara, o que acontece com os homens que são seduzidos por ela?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: ["Ficam ricos", "São levados para o fundo das águas", "Ganham poderes mágicos", "Transformam-se em peixes"],
            correta: "São levados para o fundo das águas",
          },
          {
            id: 2,
            pergunta: "Qual é o boi do Festival de Parintins que tem como cor o vermelho?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: ["Boi Caprichoso", "Boi Garantido", "Boi Bumbá", "Boi da Cara Preta"],
            correta: "Boi Garantido",
          },
          {
            id: 3,
            pergunta: "O que é o Tacacá, tradicional iguaria amazonense?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Um doce de tapioca",
              "Uma sopa quente com tucupi e camarão",
              "Um peixe assado",
              "Uma bebida fermentada",
            ],
            correta: "Uma sopa quente com tucupi e camarão",
          },
           {
            id: 4,
            pergunta: "Segundo o folclore, o Mapinguari é conhecido por ter qual característica marcante?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Pés virados para trás",
              "Uma boca na barriga",
              "Cabeça de fogo",
              "Asas de morcego",
            ],
            correta: "Uma boca na barriga",
          },
          {
            id: 5,
            pergunta: "Qual é o Teatro mais famoso de Manaus, construído durante o Ciclo da Borracha?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Teatro Municipal",
              "Teatro Amazonas",
              "Theatro São Pedro",
              "Teatro da Paz",
            ],
            correta: "Teatro Amazonas",
          },
        ]
      : [
          {
            id: 1,
            pergunta: "Qual peixe amazônico é considerado o maior peixe de escamas de água doce do mundo?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Tambaqui",
              "Tucunaré",
              "Pirarucu",
              "Jaú",
            ],
            correta: "Pirarucu",
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
          {
            id: 3,
            pergunta: "Na cultura amazonense, o que são as 'palafitas'?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Embarcações típicas da região",
              "Casas construídas sobre estacas na beira dos rios",
              "Instrumentos musicais indígenas",
              "Artesanatos de palha",
            ],
            correta: "Casas construídas sobre estacas na beira dos rios",
          },
          {
            id: 4,
            pergunta: "Segundo a lenda do Guaraná, de onde surgiu esta planta?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Das lágrimas de uma deusa",
              "Dos olhos de um indiozinho",
              "Das sementes trazidas pelos pássaros",
              "Do coração de um guerreiro",
            ],
            correta: "Dos olhos de um indiozinho",
          },
           {
            id: 5,
            pergunta: "Qual rio banha a cidade de Manaus junto com o Rio Negro?",
            imagem: require("../../../assets/G_C.jpg"),
            opcoes: [
              "Rio Amazonas",
              "Rio Madeira",
              "Rio Solimões",
              "Rio Purus",
            ],
            correta: "Rio Solimões",
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
    fontWeight: "bold",
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
});
