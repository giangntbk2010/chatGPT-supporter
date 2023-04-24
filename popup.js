// Get the stored phrases from local storage
const storedPhrases = localStorage.getItem('phrases');
let phrases = [];

if (storedPhrases) {
  phrases = JSON.parse(storedPhrases);
}

// Get elements
const addPhraseBtn = document.getElementById('add-phrase-btn');
const phraseInput = document.getElementById('phrase-input');
const phrasesList = document.getElementById('phrases-list');

// Add new phrase to list
function addPhrase(phrase) {
  // Create list item element
  const listItem = document.createElement('li');
  listItem.className = 'phrase-item';

  // Create phrase element
  const phraseSpan = document.createElement('span');
  phraseSpan.className = 'phrase';
  phraseSpan.textContent = phrase;

  // Create buttons element
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'buttons';

  // Create edit button
  const editBtn = document.createElement('i');
  editBtn.className = 'fas fa-pencil-alt edit-btn';

  // Add edit button click listener
  editBtn.addEventListener('click', () => {
    const newPhrase = prompt('Enter new phrase', phrase);

    if (newPhrase !== null && newPhrase !== '') {
      phraseSpan.textContent = newPhrase;
      const index = phrases.indexOf(phrase);
      if (index > -1) {
        phrases[index] = newPhrase;
        savePhrases();
      }
    }
  });

  // Create remove button
  const removeBtn = document.createElement('i');
  removeBtn.className = 'fas fa-trash-alt remove-btn';

  // Add remove button click listener
  removeBtn.addEventListener('click', () => {
    phrases.splice(phrases.indexOf(phrase), 1);
    savePhrases();
    listItem.remove();
  });

  // Create copy button
  const copyBtn = document.createElement('i');
  copyBtn.className = 'far fa-copy copy-btn';

  // Add copy button click listener
  copyBtn.addEventListener('click', () => {
    const input = document.createElement('textarea');
    input.value = phrase;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert(`'${phrase}' has been copied to clipboard!`);
  });

  // Append elements to list item
  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(removeBtn);
  buttonsDiv.appendChild(copyBtn);
  listItem.appendChild(phraseSpan);
  listItem.appendChild(buttonsDiv);

  // Append list item to phrases list
  phrasesList.appendChild(listItem);
}

// Load phrases from local storage
function loadPhrases() {
  phrasesList.innerHTML = '';
  phrases.forEach(phrase => addPhrase(phrase));
}

// Save phrases to local storage
function savePhrases() {
  localStorage.setItem('phrases', JSON.stringify(phrases));
  loadPhrases();
}

// Add phrase click listener
addPhraseBtn.addEventListener('click', () => {
  const phrase = phraseInput.value.trim();

  if (phrase !== '') {
    phrases.push(phrase);
    savePhrases();
    phraseInput.value = '';
  }
});

// Load phrases on page load
loadPhrases();
