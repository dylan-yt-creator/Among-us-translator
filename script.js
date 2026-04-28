const dictionary = {
  "hello": "zarn",
  "world": "mok",
  "i": "ka",
  "love": "zir",
  "you": "tan"
};

function translateText() {
  const input = document.getElementById("inputText").value;

  const translated = input
    .toLowerCase()
    .split(" ")
    .map(word => dictionary[word] || word)
    .join(" ");

  document.getElementById("outputText").innerText = translated;
}
