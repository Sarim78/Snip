# ✂️ Snip

A lightweight, local URL shortener that runs entirely in your browser. No backend, no hosting, no setup. Just open and use.

---

## 🚀 Getting Started

1. Clone or download this repo
2. Open `index.html` in your browser
3. That's it

```bash
git clone https://github.com/yourusername/snip.git
cd snip
open index.html
```

---

## ✨ Features

- Shorten any long URL instantly
- Short links stored locally in your browser via `localStorage`
- One-click copy to clipboard
- View and manage all your saved links
- Works 100% offline

---

## 🗂️ Project Structure

```
snip/
├── index.html      # App structure
├── css/
│   └── style.css   # Styles
├── js/
│   └── app.js      # Shortening logic & localStorage
└── README.md
```

---

## ⚠️ Limitations

Since Snip runs locally with no backend:

- Short links only resolve **in the same browser** where they were created
- Clearing browser data will erase your saved links
- Links are not shareable across devices

---

## 🛠️ Built With

- HTML
- CSS
- Vanilla JavaScript
- localStorage API

---

## 📌 Notes

This project was built as a frontend UI/UX demo and portfolio piece. A future version could add a Node.js or Python backend with a real database for persistent, shareable links.

---

## 📄 License

MIT
