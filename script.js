// =========================
// DICTIONARY
// =========================
const dictionary = {
  "i": "meep",
  "you": "yo",
  "sus": "shade",
  "suspicious": "shade",
  "kill": "zap",
  "report": "ping",
  "safe": "clean",
  "die": "ghost",
  "died": "ghost",
  "yes": "yeep",
  "no": "nopeep",
  "where": "whop?",
  "who": "whop yo?",
  "ghost": "shadeform",
  "see": "echo-see",
  "talk": "whisperlink",
  "move": "floatstep",
  "follow": "trailghost",
  "watch": "scanfade",
  "task": "fixbit",
  "sabotage": "glitch",
  "how": "moda",
  "are": "ar"
};

// Reverse dictionary
const reverseDictionary = Object.fromEntries(
  Object.entries(dictionary).map(([key, value]) => [value, key])
);

let isReversed = false;

// =========================
// PHRASES
// =========================
const phrases = {
  "emergency meeting": "big ping",
  "call emergency meeting": "big ping now",
  "let's vote": "big ping now",
  "sabotaged reactor": "reactor glitch",
  "sabotaged o2": "o2 glitch",
  "hello": "meep olleh",
  "hi": "meep hipeep",
  "hey": "meep heypeep"
};

const reversePhrases = Object.fromEntries(
  Object.entries(phrases).map(([k, v]) => [v, k])
);

// =========================
// AUTO TRANSLATE (DEBOUNCE)
// =========================
let typingTimer;

document.getElementById("inputText").addEventListener("input", () => {
  clearTimeout(typingTimer);

  typingTimer = setTimeout(() => {
    translateText();
  }, 150);
});

// =========================
// TRANSLATION
// =========================
function translateText() {
  let input = document.getElementById("inputText").value.toLowerCase();

  // Phrase replacement
  if (!isReversed) {
    for (let phrase in phrases) {
      input = input.replaceAll(phrase, phrases[phrase]);
    }
  } else {
    for (let phrase in reversePhrases) {
      input = input.replaceAll(phrase, reversePhrases[phrase]);
    }
  }

  // Word translation
  const dict = isReversed ? reverseDictionary : dictionary;

  const translated = input
    .split(" ")
    .map(word => dict[word] || word)
    .join(" ");

  document.getElementById("outputText").innerText = translated;
}

// =========================
// TOGGLE DIRECTION + SWAP
// =========================
function toggleDirection() {
  const inputEl = document.getElementById("inputText");
  const outputEl = document.getElementById("outputText");

  // Swap text
  const temp = inputEl.value;
  inputEl.value = outputEl.innerText;
  outputEl.innerText = temp;

  // Flip direction
  isReversed = !isReversed;

  document.getElementById("modeLabel").innerText =
    isReversed ? "Mode: Among Us → English" : "Mode: English → Among Us";

  // Re-translate instantly
  translateText();
}

// =========================
// THEME SYSTEM
// =========================
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else if (theme === "light") {
    document.body.classList.remove("dark");
  } else {
    // system
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", prefersDark);
  }
}

// Load theme on startup
const savedTheme = localStorage.getItem("theme") || "system";
applyTheme(savedTheme);

document.getElementById("inputText").addEventListener("input", () => {
  translateText();
});
