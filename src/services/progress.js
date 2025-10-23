// src/services/progress.js
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

// avalia respostas e retorna score e passed
export function evaluateQuizAnswers(quiz, answers) {
  const total = quiz.questions.length;
  let correct = 0;
  quiz.questions.forEach(q => {
    if (answers[q.id] === q.answerIndex) correct++;
  });
  const score = Math.round((correct / total) * 100);
  const passed = score >= (quiz.passScore || 70);
  return { score, passed, correct, total };
}

// marca módulo como completo (atomicidade simples)
export async function markModuleCompleted(uid, trilhaId, moduleId) {
  const userRef = doc(db, "usuarios", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // cria doc inicial
    await setDoc(userRef, {
      progress: {
        [trilhaId]: { modulesCompleted: [moduleId], completed: false, unlocked: trilhaId === "iniciante" }
      },
      streak: 0,
      lastPracticeDate: null
    });
    return;
  }

  // adiciona module
  await updateDoc(userRef, {
    [`progress.${trilhaId}.modulesCompleted`]: arrayUnion(moduleId)
  });
}

// checa e marca trilha completa (e libera próxima trilha)
export async function checkAndMarkTrilhaComplete(uid, trilhaId) {
  const trilhaSnap = await getDoc(doc(db, "trilhas", trilhaId));
  if (!trilhaSnap.exists()) return false;
  const trilha = trilhaSnap.data();

  const userRef = doc(db, "usuarios", uid);
  const userSnap = await getDoc(userRef);
  const progress = userSnap.exists() ? (userSnap.data().progress || {}) : {};
  const done = progress[trilhaId]?.modulesCompleted || [];
  const total = (trilha.modulos || []).length;

  if (done.length >= total && total > 0) {
    // marca completed
    await updateDoc(userRef, {
      [`progress.${trilhaId}.completed`]: true
    });
    // libera próxima trilha simples por ordem "iniciante"->"intermediario"->"avancado"
    if (trilhaId === "iniciante") {
      await updateDoc(userRef, { [`progress.intermediario.unlocked`]: true });
    } else if (trilhaId === "intermediario") {
      await updateDoc(userRef, { [`progress.avancado.unlocked`]: true });
    }
    return true;
  }
  return false;
}

// atualiza streak quando usuario pratica (passar a data em ISO yyyy-mm-dd)
export async function updateStreak(uid, practiceDateISO) {
  const userRef = doc(db, "usuarios", uid);
  const snap = await getDoc(userRef);
  const today = new Date(practiceDateISO).toISOString().split("T")[0];
  if (!snap.exists()) {
    await setDoc(userRef, { streak: 1, lastPracticeDate: today });
    return 1;
  }
  const data = snap.data();
  const last = data.lastPracticeDate ? data.lastPracticeDate.split("T")[0] : null;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  let newStreak = data.streak || 0;
  if (last === today) {
    newStreak = data.streak || 0;
  } else if (last === yesterday) {
    newStreak = (data.streak || 0) + 1;
  } else {
    newStreak = 1;
  }

  await updateDoc(userRef, { streak: newStreak, lastPracticeDate: today });
  return newStreak;
}
