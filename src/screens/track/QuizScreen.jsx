import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { fetchQuiz } from "../../services/content";
import { evaluateQuizAnswers, markModuleCompleted, checkAndMarkTrilhaComplete, updateStreak } from "../../services/progress";
import { AuthContext } from "../../contexts/AuthContext";

export default function QuizScreen({ route, navigation }) {
  const { quizId, trilhaId, moduleId } = route.params;
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      const q = await fetchQuiz(quizId);
      setQuiz(q);
    })();
  }, [quizId]);

  function select(qId, idx) {
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  }

  async function submit() {
    const res = evaluateQuizAnswers(quiz, answers);
    setResult(res);
    if (res.passed) {
      await markModuleCompleted(user.uid, trilhaId, moduleId);
      await checkAndMarkTrilhaComplete(user.uid, trilhaId);
      // atualiza streak
      const todayISO = new Date().toISOString();
      await updateStreak(user.uid, todayISO);
      alert(`Você passou! Score: ${res.score}%`);
      navigation.goBack();
    } else {
      alert(`Não passou. Score: ${res.score}% — tenta de novo!`);
    }
  }

  if (!quiz) return <Text>Carregando quiz...</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{quiz.title || "Quiz"}</Text>
      {quiz.questions.map(q => (
        <View key={q.id} style={{ marginTop: 12 }}>
          <Text style={{ marginBottom: 8 }}>{q.text}</Text>
          {q.options.map((opt, idx) => (
            <TouchableOpacity key={idx} style={{ padding: 10, borderWidth: 1, marginBottom: 6, borderRadius: 6 }}
              onPress={() => select(q.id, idx)}>
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity onPress={submit} style={{ marginTop: 16, backgroundColor: "#0066cc", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Enviar respostas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
