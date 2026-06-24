function executeCode() {
  const logElement = document.getElementById("log");
  if (((logElement.textContent = ""), !meuEditor))
    return void (logElement.textContent =
      "Please wait... The editor is still loading.");
  const code = meuEditor.getValue(),
    originalLog = console.log;
  console.log = function (...e) {
    const t = new Date(),
      o = t.toTimeString().split(" ")[0];
    ((logElement.textContent += `[${o}] ${e.join(" ")}\n`),
      originalLog.apply(console, e));
  };
  try {
    eval(code);
  } catch (e) {
    const t = new Date(),
      o = t.toTimeString().split(" ")[0];
    logElement.textContent += `[${o}] Execution Error: ${e.message}\n`;
  }
  console.log = originalLog;
}
function toggleTheme() {
  const e = document.body;
  (e.classList.toggle("light-theme"),
    e.classList.contains("light-theme")
      ? (monaco.editor.setTheme("vs"), (icon.src = "./main/img/moon.png"))
      : (monaco.editor.setTheme("vs-dark"), (icon.src = "./main/img/sun.png")));
}
const logContainer = document.getElementById("log");

// Cria o span do Console
const spanConsole = document.createElement("span");
spanConsole.textContent = "Console";
spanConsole.className = "log-title"; // Para você estilizar no CSS

// Adiciona o span dentro do #log
logContainer.appendChild(spanConsole);
function uploadFile() {
  const e = document.getElementById("upload-file");
  document.getElementById("log");
  if (0 === e.files.length) return void alert("Please select a file first.");
  const t = e.files[0];
  if (!t.name.endsWith(".js"))
    return void alert("Please upload only JavaScript (.js) files.");
  const o = new FileReader();
  ((o.onload = function (e) {
    const t = e.target.result;
    meuEditor
      ? (meuEditor.setValue(t),
        (document.getElementById("upload").style.opacity = "0"))
      : alert("Editor is still loading. Please try again.");
  }),
    o.readAsText(t));
}
function saveFile() {
  if (!meuEditor) return;
  const e = meuEditor.getValue(),
    t = new Blob([e], { type: "text/javascript" }),
    o = URL.createObjectURL(t),
    n = document.createElement("a");
  ((n.href = o),
    (n.download = "script.js"),
    document.body.appendChild(n),
    n.click(),
    document.body.removeChild(n),
    URL.revokeObjectURL(o));
}
function clearLog() {
  const log = document.getElementById("log");

  log.textContent = "";
}
const startscreen = document.getElementById("start-screen");
setInterval(() => {
  startscreen.style.opacity = "0";
}, 3000);
const translationData = {
  "pt-br": {
    navExecute: "Executar",
    navTheme: "Tema",
    navUpload: "Enviar",
    navSave: "Salvar",
    navClear: "Limpar Log",
    navSettings: "Configurações",
    uploadTitle: "Enviar um arquivo.",
    uploadBtn: "Enviar",
    welcomeTitle: "Bem-vindo ao PlaygroundJS",
    welcomeSub: "Um compilador e playground leve para JavaScript moderno.",
    welcomeBeta:
      "⚠️ O PlaygroundJS está em versão BETA. Você pode encontrar erros.",
    configTitle: "Configurações",
    configTrans: "Traduzir",
    configConsole: "Console",
    configShow: "Mostrar",
    configClose: "Fechar",
  },
  "en-us": {
    navExecute: "Execute",
    navTheme: "Theme",
    navUpload: "Upload",
    navSave: "Save",
    navClear: "Clear Log",
    navSettings: "Settings",
    uploadTitle: "Upload a file.",
    uploadBtn: "Upload",
    welcomeTitle: "Welcome to PlaygroundJS",
    welcomeSub: "A lightweight compiler and playground for modern JavaScript.",
    welcomeBeta:
      "⚠️ PlaygroundJS is currently in BETA. You may encounter errors.",
    configTitle: "Settings",
    configTrans: "Translate",
    configConsole: "Console",
    configShow: "Show",
    configClose: "Close",
  },
};

function changeLanguage(locale) {
  const translations = translationData[locale];
  if (!translations) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
}
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o navegador de recarregar a página do jeito velho

    const urlDestination = this.getAttribute("href"); // Pega "./playground.html"

    // Modifica a barra de endereço para esconder o ".html"
    // Vai mostrar apenas "/playground" na barra
    const cleanUrl = urlDestination.replace(".html", "");
    window.history.pushState({}, "", cleanUrl);

    // Aqui você faz o redirecionamento ou carrega o conteúdo
    window.location.href = urlDestination;
  });
});
