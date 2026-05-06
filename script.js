// =========================
// 1. DICTIONARY (WORD MAP)
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
  "are": "ar",
  "kyle": "ky",
  "dylan": "killer",
  "teaming": "gangering",
  "good": "gog",
  "bad": "null"
};

// Reverse dictionary (auto)
const reverseDictionary = Object.fromEntries(
  Object.entries(dictionary).map(([key, value]) => [value, key])
);

let isReversed = false;


// =========================
// 2. PHRASES (MULTI-WORD)
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
// 3. AUTO TRANSLATE SETUP
// =========================
let typingTimer;

window.onload = () => {
  const inputEl = document.getElementById("inputText");

  inputEl.addEventListener("input", () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      translateText();
    }, 150);
  });
};


// =========================
// 4. TRANSLATION FUNCTION
// =========================
function translateText() {
  let input = document.getElementById("inputText").value;

  const phraseDict = isReversed ? reversePhrases : phrases;

  // Phrase replacement (case-insensitive)
  for (let phrase in phraseDict) {
    const regex = new RegExp(phrase, "gi");
    input = input.replace(regex, phraseDict[phrase]);
  }

  const dict = isReversed ? reverseDictionary : dictionary;

  const translated = input
    .split(" ")
    .map(word => {
      const lower = word.toLowerCase();

      let translatedWord = dict[lower] || word;

      // Preserve ALL CAPS
      if (word === word.toUpperCase()) {
        return translatedWord.toUpperCase();
      }

      // Preserve Capitalized (Names like Dylan)
      if (word[0] === word[0]?.toUpperCase()) {
        return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
      }

      return translatedWord;
    })
    .join(" ");

  // IMPORTANT: using textarea → .value
  document.getElementById("outputText").value = translated;
}


// =========================
// 5. TOGGLE DIRECTION + SWAP
// =========================
function toggleDirection() {
  const inputEl = document.getElementById("inputText");
  const outputEl = document.getElementById("outputText");

  // Swap text
  const temp = inputEl.value;
  inputEl.value = outputEl.value;
  outputEl.value = temp;

  // Flip direction
  isReversed = !isReversed;

  document.getElementById("modeLabel").innerText =
    isReversed ? "Mode: Among Us → English" : "Mode: English → Among Us";

  translateText();
}


// =========================
// 6. THEME SYSTEM
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
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", prefersDark);
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "system";
applyTheme(savedTheme);
