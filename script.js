const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const form = document.querySelector("#quote-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", event => {
  event.preventDefault();
  const name = new FormData(form).get("name") || "client";
  message.textContent = `Merci ${name} ! Votre demande fictive a bien été enregistrée.`;
  form.reset();
});


// Chatbot fictif WattBot
const chatbotToggle = document.querySelector("#chatbot-toggle");
const chatbot = document.querySelector("#chatbot");
const chatbotClose = document.querySelector("#chatbot-close");
const chatbotForm = document.querySelector("#chatbot-form");
const chatbotInput = document.querySelector("#chatbot-input");
const chatbotMessages = document.querySelector("#chatbot-messages");
const suggestionButtons = document.querySelectorAll(".chatbot-suggestions button");

const chatbotAnswers = {
  solutions:
    "WattUp propose des panneaux photovoltaïques, batteries de stockage, bornes de recharge, pompes à chaleur, climatisation, adoucisseurs d'eau, alarmes, vidéosurveillance et contrats d'entretien.",
  financement:
    "Plusieurs solutions sont proposées : paiement comptant, paiement en plusieurs fois et crédit affecté au projet. Une simulation personnalisée peut être réalisée par un conseiller.",
  parrainage:
    "Avec le programme WattUp+, vous pouvez recommander un proche. Lorsque son installation est réalisée, vous recevez une récompense fictive de 300 €.",
  partenaires:
    "WattUp travaille avec six partenaires fictifs : SolarTech, PowerCell, ChargeGo, ClimExpert, AquaPure et SecureHome.",
  "rendez-vous":
    "Vous pouvez demander à être rappelé en complétant le formulaire de devis situé en bas de la page. Un conseiller de l'agence d'Avignon vous recontactera.",
  horaires:
    "L'agence WattUp d'Avignon est ouverte du lundi au samedi, de 9 h à 18 h.",
  contact:
    "Vous pouvez joindre WattUp au 04 90 00 00 00 ou écrire à contact@wattup-avignon.fr.",
  devis:
    "Le devis est gratuit et sans engagement. Utilisez le formulaire de contact en bas de la page pour décrire votre projet.",
  solaire:
    "Les panneaux photovoltaïques permettent de produire une partie de votre propre électricité. WattUp réalise d'abord une étude personnalisée de votre logement.",
  entretien:
    "WattUp propose des contrats d'entretien et le nettoyage annuel des panneaux afin de préserver les performances des installations."
};

function addChatMessage(text, type = "bot") {
  const message = document.createElement("div");
  message.className = type === "user" ? "user-message" : "bot-message";
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findChatbotAnswer(question) {
  const q = normalizeText(question);

  if (q.includes("solution") || q.includes("produit") || q.includes("service")) return chatbotAnswers.solutions;
  if (q.includes("financ") || q.includes("credit") || q.includes("payer") || q.includes("mensual")) return chatbotAnswers.financement;
  if (q.includes("parrain")) return chatbotAnswers.parrainage;
  if (q.includes("partenaire") || q.includes("marque")) return chatbotAnswers.partenaires;
  if (q.includes("rendez") || q.includes("rappel") || q.includes("conseiller")) return chatbotAnswers["rendez-vous"];
  if (q.includes("horaire") || q.includes("ouvert")) return chatbotAnswers.horaires;
  if (q.includes("contact") || q.includes("telephone") || q.includes("email") || q.includes("adresse")) return chatbotAnswers.contact;
  if (q.includes("devis") || q.includes("prix") || q.includes("tarif")) return chatbotAnswers.devis;
  if (q.includes("solaire") || q.includes("photovoltaique") || q.includes("panneau")) return chatbotAnswers.solaire;
  if (q.includes("entretien") || q.includes("maintenance") || q.includes("nettoyage")) return chatbotAnswers.entretien;

  return "Je n'ai pas encore la réponse à cette question. Vous pouvez consulter les rubriques du site ou demander à être rappelé par un conseiller WattUp.";
}

function openChatbot() {
  chatbot.classList.add("open");
  chatbot.setAttribute("aria-hidden", "false");
  chatbotInput.focus();
}

function closeChatbot() {
  chatbot.classList.remove("open");
  chatbot.setAttribute("aria-hidden", "true");
}

chatbotToggle.addEventListener("click", openChatbot);
chatbotClose.addEventListener("click", closeChatbot);

suggestionButtons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.question;
    addChatMessage(button.textContent, "user");
    setTimeout(() => addChatMessage(chatbotAnswers[key]), 250);
  });
});

chatbotForm.addEventListener("submit", event => {
  event.preventDefault();
  const question = chatbotInput.value.trim();
  if (!question) return;

  addChatMessage(question, "user");
  chatbotInput.value = "";

  setTimeout(() => {
    addChatMessage(findChatbotAnswer(question));
  }, 300);
});
