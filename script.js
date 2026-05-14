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
  "bad": "null",
  "what": "wot",
  "should": "shud",
  "change": "swap",
  "change": "amongflip",
  "and": "n",
  "the": "da",
  "full": "roomfilled",
  "text": "blahblah",
  "except": "butnahhh",
  "to": "2"
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
  const inputEl = document.getElementById("input");

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
  let input = document.getElementById("input").value;

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
  document.getElementById("output").value = translated;
}


// =========================
// 5. TOGGLE DIRECTION + SWAP
// =========================
function toggleDirection() {
  const inputEl = document.getElementById("input");
  const outputEl = document.getElementById("output");

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

function speakText() {
  const text = document.getElementById("outputText").value;

  if (!text) return;

  const speech = new SpeechSynthesisUtterance(text);

  // optional settings
  speech.lang = "en-UK";
  speech.rate = 0.5;   // speed
  speech.pitch = 1;  // tone

  window.speechSynthesis.speak(speech);
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "system";
applyTheme(savedTheme);

const susMessages = [
    "Red is kinda sus...",
    "Emergency meeting!",
    "Blue vented in electrical.",
    "Who took my tasks?",
    "Green was not the impostor.",
    "Trust nobody.",
    "Pink is following me..."
];

function newSusMessage() {
    const random =
        susMessages[Math.floor(Math.random() * susMessages.length)];

    document.getElementById("susMessage").innerText = random;
}

function copyOutput(button) {
    const output =
        document.getElementById("output").value;

    navigator.clipboard.writeText(output)
        .then(() => {

            // Save original text
            const originalText = button.innerText;

            // Change button text
            button.innerText = "✅ Copied!";

            // Change back after 2 seconds
            setTimeout(() => {
                button.innerText = originalText;
            }, 2000);

        })
        .catch((err) => {
            console.error(err);

            button.innerText = "❌ Try Again";

            setTimeout(() => {
                button.innerText = "📋 COPY";
            }, 2000);
        });
}

/* Character counter */
const inputBox = document.getElementById("input");

inputBox.addEventListener("input", () => {
    document.getElementById("charCount").innerText =
        "Characters: " + inputBox.value.length;
});

/* Text to speech */
function speakOutput() {
    const text =
        document.getElementById("output").value;

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 0.8;
    speech.pitch = 0.5;

    speechSynthesis.speak(speech);
}
