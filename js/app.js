// Constants
const STORAGE_KEY = 'snip_links';
const BASE_URL    = 'snip.local/';

// DOM References
const longUrlInput    = document.getElementById('longUrlInput');
const shortenBtn      = document.getElementById('shortenBtn');
const errorMsg        = document.getElementById('errorMsg');
const resultBox       = document.getElementById('resultBox');
const shortUrlDisplay = document.getElementById('shortUrlDisplay');
const copyBtn         = document.getElementById('copyBtn');
const copyConfirm     = document.getElementById('copyConfirm');
const linkList        = document.getElementById('linkList');
const emptyMsg        = document.getElementById('emptyMsg');
const clearAllBtn     = document.getElementById('clearAllBtn');

// Storage Helpers
function getLinks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

// Generate Short Code
function generateCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Validate URL
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// Shorten URL
function shortenUrl() {
  const rawInput = longUrlInput.value.trim();

  // Hide previous results/errors
  errorMsg.classList.add('hidden');
  resultBox.classList.add('hidden');
  copyConfirm.classList.add('hidden');

  if (!rawInput || !isValidUrl(rawInput)) {
    errorMsg.classList.remove('hidden');
    return;
  }

  const links = getLinks();

  // Check if URL already shortened
  const existing = links.find(l => l.original === rawInput);
  if (existing) {
    showResult(existing.short);
    return;
  }

  // Generate a unique code
  let code;
  do {
    code = generateCode();
  } while (links.find(l => l.code === code));

  const shortUrl = BASE_URL + code;

  const newLink = {
    code,
    short: shortUrl,
    original: rawInput,
    createdAt: new Date().toISOString()
  };

  links.unshift(newLink);
  saveLinks(links);

  showResult(shortUrl);
  renderLinks();
  longUrlInput.value = '';
}

// Show Result
function showResult(shortUrl) {
  shortUrlDisplay.textContent = shortUrl;
  resultBox.classList.remove('hidden');
}

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    copyConfirm.classList.remove('hidden');
    setTimeout(() => copyConfirm.classList.add('hidden'), 2000);
  });
}

// Render Saved Links
function renderLinks() {
  const links = getLinks();
  linkList.innerHTML = '';

  if (links.length === 0) {
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');

  links.forEach(link => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span class="link-short">${link.short}</span>
      <span class="link-original" title="${link.original}">${link.original}</span>
      <div class="link-actions">
        <button class="copy-link-btn" data-short="${link.short}">Copy</button>
        <button class="delete-btn" data-code="${link.code}">Delete</button>
      </div>
    `;

    linkList.appendChild(li);
  });

  // Copy buttons in list
  document.querySelectorAll('.copy-link-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.short).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
      });
    });
  });

  // Delete buttons in list
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteLink(btn.dataset.code);
    });
  });
}

// Delete a Link
function deleteLink(code) {
  const links = getLinks().filter(l => l.code !== code);
  saveLinks(links);
  renderLinks();
}

// Clear All Links
function clearAll() {
  if (getLinks().length === 0) return;
  localStorage.removeItem(STORAGE_KEY);
  resultBox.classList.add('hidden');
  renderLinks();
}

// Event Listeners
shortenBtn.addEventListener('click', shortenUrl);

longUrlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') shortenUrl();
});

copyBtn.addEventListener('click', () => {
  copyToClipboard(shortUrlDisplay.textContent);
});

clearAllBtn.addEventListener('click', clearAll);

// Init
renderLinks();