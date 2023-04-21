// Lấy danh sách các cụm từ từ chrome storage và hiển thị lên popup
chrome.storage.sync.get('phrases', ({ phrases }) => {
  if (!phrases) {
    phrases = [];
  }

  const phrasesList = document.getElementById('phrases');
  phrasesList.innerHTML = '';

  phrases.forEach((phrase) => {
    const item = document.createElement('div');
    item.textContent = phrase;
    item.classList.add('phrase-item');
    phrasesList.appendChild(item);
  });
});

// Lưu cụm từ mới vào chrome storage khi click vào nút Add
const addButton = document.getElementById('add');
addButton.addEventListener('click', () => {
  const phraseInput = document.getElementById('phrase');
  const phrase = phraseInput.value.trim();

  if (!phrase) {
    return;
  }

  chrome.storage.sync.get('phrases', ({ phrases }) => {
    if (!phrases) {
      phrases = [];
    }

    phrases.push(phrase);
    chrome.storage.sync.set({ phrases });
    
    const phrasesList = document.getElementById('phrases');
    const item = document.createElement('div');
    item.textContent = phrase;
    item.classList.add('phrase-item');
    phrasesList.appendChild(item);

    phraseInput.value = '';
  });
});

