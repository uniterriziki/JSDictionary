const wrapper = document.querySelector(".wrapper"),
  results = wrapper.querySelector(".results"),
  meaning = wrapper.querySelector(".meaning .details span"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text"),
  example = wrapper.querySelector(".example .details span");
let audio;

class Word {
  constructor(meaning, example, synonyms) {
    this.meaning = meaning;
    this.example = example;
    this.synonyms = synonyms;
  }
}

function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  let word1 = new Word();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.map((word) => {
        word.meanings.map((meaning) => {
          word1.synonyms = meaning.synonyms;
          meaning.definitions.map((value) => {
            word1.meaning = value.definition;
            word1.example = value.example;
          });
        });
      });
      results.classList.remove("results");
      infoText.style.display = "none";
      meaning.innerHTML = word1.meaning;
      example.innerHTML = word1.example;
      synonyms.innerHTML = word1.synonyms;
    });
}

searchInput.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    fetchApi(e.target.value);
  }
});

removeIcon.addEventListener("click", function (e) {
  searchInput.value = "";
  results.classList.add("results");
  infoText.innerHTML =
    "Type any existing word and press enter to get meaning, example, synonyms, etc";
  infoText.style.display = "inline";
});
