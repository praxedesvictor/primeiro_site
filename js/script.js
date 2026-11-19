const questions = [
  {
    question: "Você recebe um e-mail dizendo que sua conta será bloqueada. O que faz?",
    answers: ["Clico no link e resolvo logo", "Confiro o remetente e acesso o serviço pelo site ou app oficial", "Respondo com minha senha para confirmar a identidade"],
    correct: 1,
    explanation: "Mensagens que criam urgência podem ser phishing. Não use o link recebido: confira o remetente e acesse o serviço por um canal oficial."
  },
  {
    question: "Qual é a melhor forma de usar senhas nas suas contas?",
    answers: ["Usar uma senha diferente e forte em cada serviço", "Usar a mesma senha, mas trocar um número", "Usar uma senha curta que seja fácil de lembrar"],
    correct: 0,
    explanation: "Senhas únicas evitam que uma conta exposta abra as demais. Prefira combinações longas e difíceis de adivinhar."
  },
  {
    question: "Para que serve a verificação em duas etapas?",
    answers: ["Para trocar a senha automaticamente", "Para adicionar uma confirmação além da senha", "Para compartilhar a conta com segurança"],
    correct: 1,
    explanation: "A verificação em duas etapas pede uma segunda confirmação, dificultando o acesso de alguém que só descobriu sua senha."
  },
  {
    question: "Uma pessoa conhecida pede dinheiro por mensagem, com urgência. Qual é a melhor atitude?",
    answers: ["Fazer a transferência para ajudar", "Pedir o código que chegou no celular dela", "Confirmar o pedido por uma ligação ou outro canal"],
    correct: 2,
    explanation: "A conta dessa pessoa pode ter sido invadida. Confirme por outro canal antes de enviar dinheiro ou qualquer informação."
  },
  {
    question: "O que fazer antes de informar seus dados em uma loja online?",
    answers: ["Conferir cuidadosamente o endereço e a reputação da loja", "Confiar se o site tiver um cadeado", "Seguir o primeiro anúncio que aparecer"],
    correct: 0,
    explanation: "Um cadeado indica uma conexão criptografada, não que a loja seja legítima. Confira o domínio e procure referências confiáveis."
  },
  {
    question: "Você encontra Wi-Fi público gratuito. Qual cuidado é mais importante?",
    answers: ["Acessar o banco normalmente, se a rede tiver senha", "Evitar operações sensíveis e preferir a rede móvel", "Usar a mesma senha que usa em casa"],
    correct: 1,
    explanation: "Redes públicas podem não ser seguras, mesmo quando protegidas por uma senha. Evite operações sensíveis e use a rede móvel quando puder."
  },
  {
    question: "Por que manter celular e computador atualizados?",
    answers: ["Para corrigir falhas e melhorar a proteção", "Para impedir todos os golpes automaticamente", "Para não precisar de senhas"],
    correct: 0,
    explanation: "Atualizações frequentemente corrigem falhas que podem ser exploradas. Elas ajudam na proteção, mas não substituem outros cuidados."
  },
  {
    question: "Qual informação você deve evitar compartilhar com desconhecidos?",
    answers: ["Uma opinião sobre um filme", "O nome de um aplicativo que gosta", "CPF, senha ou código de verificação recebido"],
    correct: 2,
    explanation: "CPF, senhas e códigos recebidos podem ser usados para acessar contas ou aplicar fraudes. Nunca compartilhe códigos de verificação."
  },
  {
    question: "Um aplicativo pede acesso à sua localização o tempo todo, mas não precisa dela. O que fazer?",
    answers: ["Permitir para o aplicativo funcionar melhor", "Revisar as permissões e limitar o acesso", "Enviar também seus contatos"],
    correct: 1,
    explanation: "Revise as permissões nas configurações do dispositivo e conceda somente os acessos necessários para a função do aplicativo."
  },
  {
    question: "Você suspeita que clicou em um link malicioso e informou sua senha. Qual deve ser o próximo passo?",
    answers: ["Esperar para ver se acontece algo", "Trocar a senha pelo site oficial e proteger as contas relacionadas", "Reenviar o link para alguém verificar"],
    correct: 1,
    explanation: "Acesse o serviço por um canal oficial, altere a senha e encerre sessões desconhecidas. Se reutilizava essa senha, troque-a também nos outros serviços."
  }
];

const questionText = document.querySelector("#question-text");
const answerList = document.querySelector("#answer-list");
const answerFeedback = document.querySelector("#answer-feedback");
const quizNext = document.querySelector("#quiz-next");
const quizProgress = document.querySelector("#quiz-progress");
const quizProgressLabel = document.querySelector("#quiz-progress-label");
const quizScore = document.querySelector("#quiz-score");
const quizContent = document.querySelector("#quiz-content");
const quizResult = document.querySelector("#quiz-result");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

let currentQuestion = 0;
let score = 0;
const selectedAnswers = [];

function renderQuestion() {
  const item = questions[currentQuestion];
  questionText.textContent = item.question;
  answerList.replaceChildren();
  answerFeedback.hidden = true;
  quizNext.hidden = true;
  quizProgressLabel.innerHTML = `PERGUNTA ${String(currentQuestion + 1).padStart(2, "0")} <span class="progress-total">/ ${questions.length}</span>`;
  quizProgress.setAttribute("aria-valuenow", String(currentQuestion));
  quizProgress.querySelector("span").style.width = `${(currentQuestion / questions.length) * 100}%`;
  quizScore.textContent = `${score} ponto${score === 1 ? "" : "s"}`;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${answer}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    answerList.append(button);
  });
}

function selectAnswer(selectedIndex) {
  const item = questions[currentQuestion];
  const isCorrect = selectedIndex === item.correct;
  selectedAnswers.push(selectedIndex);
  if (isCorrect) score += 1;

  answerList.querySelectorAll(".answer-option").forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("is-correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("is-wrong");
  });

  answerFeedback.classList.toggle("is-wrong", !isCorrect);
  answerFeedback.textContent = `${isCorrect ? "Correto!" : "Ainda não."} ${item.explanation}`;
  answerFeedback.hidden = false;
  quizNext.textContent = currentQuestion === questions.length - 1 ? "Ver meu resultado" : "Próxima pergunta →";
  quizNext.hidden = false;
  quizScore.textContent = `${score} ponto${score === 1 ? "" : "s"}`;
  quizProgress.setAttribute("aria-valuenow", String(currentQuestion + 1));
  quizProgress.querySelector("span").style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function showResult() {
  const percentage = score * 10;
  const message = score >= 8 ? "Mandou bem!" : score >= 5 ? "Você está no caminho." : "Todo começo conta.";
  const history = readLocal("navegaSeguroQuizHistory", []);
  history.unshift({ score, total: questions.length, completedAt: Date.now() });
  writeLocal("navegaSeguroQuizHistory", history.slice(0, 50));
  updateQuizAttemptCount();
  quizContent.hidden = true;
  quizResult.hidden = false;
  quizProgressLabel.textContent = "RESULTADO FINAL";
  quizScore.textContent = `${score} de ${questions.length}`;
  quizProgress.setAttribute("aria-valuenow", String(questions.length));
  quizProgress.querySelector("span").style.width = "100%";

  const explanations = questions.map((item, index) => {
    const answeredCorrectly = selectedAnswers[index] === item.correct;
    return `<div class="result-explanation"><strong>${index + 1}. ${answeredCorrectly ? "Resposta correta" : "Vale lembrar"}: ${item.answers[item.correct]}</strong>${item.explanation}</div>`;
  }).join("");

  quizResult.innerHTML = `<h3>${message}</h3><p class="result-score">Você fez ${score} de ${questions.length} pontos (${percentage}%).</p><div class="result-explanations">${explanations}</div><button class="button button-primary quiz-restart" id="quiz-restart" type="button">Refazer quiz <span aria-hidden="true">↻</span></button>`;
  document.querySelector("#quiz-restart").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswers.length = 0;
  quizResult.hidden = true;
  quizContent.hidden = false;
  renderQuestion();
  questionText.focus?.();
}

if (quizNext && questionText) {
  quizNext.addEventListener("click", () => {
    if (currentQuestion === questions.length - 1) showResult();
    else {
      currentQuestion += 1;
      renderQuestion();
    }
  });
  renderQuestion();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      mainNav.classList.remove("is-open");
    });
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const storageKeys = {
  profile: "navegaSeguroProfile",
  quizHistory: "navegaSeguroQuizHistory",
  articles: "navegaSeguroArticles"
};

function readLocal(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function updateQuizAttemptCount() {
  const count = document.querySelector("#quiz-attempt-count");
  if (count) count.textContent = String(readLocal(storageKeys.quizHistory, []).length);
}

updateQuizAttemptCount();

const passwordInput = document.querySelector("#password-checker");
if (passwordInput) {
  const strength = document.querySelector("#password-strength");
  const strengthResult = document.querySelector("#password-result");
  const visibilityButton = document.querySelector("#password-visibility");
  const clearButton = document.querySelector("#password-clear");

  function evaluatePassword() {
    const value = passwordInput.value;
    const checks = {
      length: value.length >= 12,
      mixed: /[a-z]/.test(value) && /[A-Z]/.test(value),
      number: /\d/.test(value),
      symbol: /[^A-Za-z0-9]/.test(value)
    };
    let score = Object.values(checks).filter(Boolean).length;

    document.querySelectorAll("[data-criterion]").forEach((item) => {
      const passed = checks[item.dataset.criterion];
      item.classList.toggle("criterion-met", passed);
      item.querySelector("span").textContent = passed ? "✓" : "○";
    });
    strength.setAttribute("aria-valuenow", String(score));
    strength.dataset.level = value ? String(score) : "0";
    strength.querySelector("span").style.width = `${score * 25}%`;
    strengthResult.textContent = !value ? "Aguardando senha de exemplo" : score >= 4 ? "Força estimada: forte" : score >= 2 ? "Força estimada: moderada" : "Força estimada: fraca";
  }

  passwordInput.addEventListener("input", evaluatePassword);
  visibilityButton.addEventListener("click", () => {
    const shouldShow = passwordInput.type === "password";
    passwordInput.type = shouldShow ? "text" : "password";
    visibilityButton.textContent = shouldShow ? "Ocultar" : "Mostrar";
    visibilityButton.setAttribute("aria-label", shouldShow ? "Ocultar senha" : "Mostrar senha");
  });
  clearButton.addEventListener("click", () => {
    passwordInput.value = "";
    evaluatePassword();
    passwordInput.focus();
  });
  evaluatePassword();
}

document.querySelectorAll("[data-phishing-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    const isSuspicious = button.dataset.phishingAnswer === "suspicious";
    const feedback = document.querySelector("#phishing-feedback");
    feedback.textContent = isSuspicious
      ? "Boa observação. O prazo curto pressiona você, o remetente é genérico e o endereço não corresponde a um serviço oficial. Não clique nem informe dados."
      : "Esta mensagem tem sinais de alerta: urgência artificial, remetente genérico e um endereço que não corresponde a um serviço oficial. Na dúvida, acesse o serviço por um canal conhecido.";
    feedback.classList.toggle("is-correct", isSuspicious);
    feedback.hidden = false;
    document.querySelectorAll("[data-phishing-answer]").forEach((choice) => {
      choice.disabled = true;
    });
  });
});

const librarySearch = document.querySelector("#library-search");
if (librarySearch) {
  const libraryGrid = document.querySelector("#library-grid");
  readLocal(storageKeys.articles, []).forEach((article) => {
    const card = document.createElement("article");
    card.className = "library-card";
    card.dataset.libraryItem = "";
    card.dataset.keywords = `${article.title} ${article.category} ${article.summary}`;
    const category = document.createElement("span");
    category.className = "library-category";
    category.textContent = `ARTIGO · ${article.category}`;
    const title = document.createElement("h2");
    title.textContent = article.title;
    const summary = document.createElement("p");
    summary.textContent = article.summary;
    const link = document.createElement("a");
    link.className = "note-link";
    link.href = "laboratorio.html";
    link.textContent = "Continuar aprendendo →";
    card.append(category, title, summary, link);
    libraryGrid.append(card);
  });
  const items = [...document.querySelectorAll("[data-library-item]")];
  const count = document.querySelector("#library-count");
  const empty = document.querySelector("#library-empty");
  librarySearch.addEventListener("input", () => {
    const term = librarySearch.value.trim().toLocaleLowerCase("pt-BR");
    let visible = 0;
    items.forEach((item) => {
      const haystack = `${item.textContent} ${item.dataset.keywords}`.toLocaleLowerCase("pt-BR");
      item.hidden = !haystack.includes(term);
      if (!item.hidden) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? "material" : "materiais"}`;
    empty.hidden = visible !== 0;
  });
}

function appendHistory(target, history) {
  target.replaceChildren();
  if (!history.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Conclua o quiz da página inicial para ver seu progresso aqui.";
    target.append(empty);
    return;
  }

  history.forEach((attempt) => {
    const row = document.createElement("article");
    row.className = "history-entry";
    const date = document.createElement("time");
    date.dateTime = new Date(attempt.completedAt).toISOString();
    date.textContent = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(attempt.completedAt));
    const score = document.createElement("strong");
    score.textContent = `${attempt.score}/${attempt.total} pontos`;
    row.append(date, score);
    target.append(row);
  });
}

const profileForm = document.querySelector("#profile-form");
if (profileForm) {
  const nameInput = document.querySelector("#profile-name");
  const feedback = document.querySelector("#profile-feedback");
  const clearProfile = document.querySelector("#profile-clear");
  const profile = readLocal(storageKeys.profile, null);
  const history = readLocal(storageKeys.quizHistory, []);
  const historyList = document.querySelector("#quiz-history");
  const historyCount = document.querySelector("#history-count");

  if (profile?.nickname) {
    nameInput.value = profile.nickname;
    feedback.textContent = `Perfil local ativo: ${profile.nickname}`;
    clearProfile.hidden = false;
  }
  historyCount.textContent = String(history.length);
  appendHistory(historyList, history);

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nickname = nameInput.value.trim();
    if (!nickname) return;
    const saved = writeLocal(storageKeys.profile, { nickname });
    feedback.textContent = saved ? `Perfil local salvo para ${nickname}.` : "Não foi possível salvar neste navegador.";
    clearProfile.hidden = !saved;
  });

  clearProfile.addEventListener("click", () => {
    try {
      localStorage.removeItem(storageKeys.profile);
      localStorage.removeItem(storageKeys.quizHistory);
      nameInput.value = "";
      feedback.textContent = "Perfil e histórico removidos deste navegador.";
      clearProfile.hidden = true;
      historyCount.textContent = "0";
      appendHistory(historyList, []);
    } catch {
      feedback.textContent = "Não foi possível limpar os dados deste navegador.";
    }
  });
}

function renderAdmin() {
  const articleList = document.querySelector("#admin-article-list");
  if (!articleList) return;
  const articles = readLocal(storageKeys.articles, []);
  const profile = readLocal(storageKeys.profile, null);
  const history = readLocal(storageKeys.quizHistory, []);
  document.querySelector("#admin-article-count").textContent = String(articles.length);
  document.querySelector("#admin-user-count").textContent = profile ? "1" : "0";
  document.querySelector("#admin-quiz-count").textContent = String(history.length);

  articleList.replaceChildren();
  if (!articles.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum artigo criado nesta demonstração.";
    articleList.append(empty);
  }
  articles.forEach((article, index) => {
    const item = document.createElement("article");
    item.className = "admin-article-row";
    const details = document.createElement("div");
    const category = document.createElement("span");
    category.className = "library-category";
    category.textContent = article.category;
    const title = document.createElement("h3");
    title.textContent = article.title;
    const summary = document.createElement("p");
    summary.textContent = article.summary;
    details.append(category, title, summary);
    const remove = document.createElement("button");
    remove.className = "quiet-button";
    remove.type = "button";
    remove.textContent = "Remover";
    remove.addEventListener("click", () => {
      const updated = readLocal(storageKeys.articles, []);
      updated.splice(index, 1);
      writeLocal(storageKeys.articles, updated);
      renderAdmin();
    });
    item.append(details, remove);
    articleList.append(item);
  });

  const userList = document.querySelector("#admin-user-list");
  userList.replaceChildren();
  const user = document.createElement("p");
  user.className = "empty-state";
  user.textContent = profile?.nickname ? `${profile.nickname} — perfil local deste navegador, não uma conta autenticada.` : "Ainda não há perfil local neste navegador.";
  userList.append(user);
}

const articleForm = document.querySelector("#article-form");
if (articleForm) {
  articleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#article-title").value.trim();
    const category = document.querySelector("#article-category").value;
    const summary = document.querySelector("#article-summary").value.trim();
    if (!title || !summary) return;
    const articles = readLocal(storageKeys.articles, []);
    articles.unshift({ title, category, summary });
    const saved = writeLocal(storageKeys.articles, articles);
    document.querySelector("#article-feedback").textContent = saved ? "Artigo adicionado somente a esta demonstração local." : "Não foi possível salvar neste navegador.";
    if (saved) articleForm.reset();
    renderAdmin();
  });
  renderAdmin();
}