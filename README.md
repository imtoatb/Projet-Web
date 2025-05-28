# 📚 404 BOOKS: The Shadow Archive

> "Some knowledge was never meant to be found — so we archived it."

404 Books is a digital shadow library that collects and preserves books banned for political, cultural, or ideological reasons. Built for transparency, resistance, and preservation of censored literature.

---

## 🌐 Live Project Structure

### 🏠 Pages

| Page | Purpose |
|------|---------|
| `index.html` | Homepage and project manifesto |
| `library.html` | Main searchable/filterable book archive |
| `book.html?title=[Book Title]` | Detailed view of each book |
| `upload.html` | Submission form for new books |
| `about.html` | Project mission, privacy policy, and contact info |

---

## ⚙️ How to Run Locally

> Requires Python 3 installed on your system. Or any other different way to run an http server locally, this is because of the handling of json files in our code.

### Step-by-step:

```bash
# 1. Open your terminal and navigate to the project folder
cd path/to/404-books

# 2. Start a local server (Python 3)
python -m http.server 8000
```

Now go to `http://localhost:8000/index.html` in your browser.

---

## 🧠 Key Features

### 🔍 Library Browsing & Filtering

Navigate to `library.html` to:

- Search for books by title
- Filter by `Category` (e.g., Fiction, Politics)
- Filter by `Country` of ban

Or filter directly via URL:

```
library.html?category=Fiction&country=Iran
```

### 📖 Book Details + GPT Interaction

Each book has a dedicated page like:

```
book.html?title=Animal%20Farm
```

This page includes:

- Metadata (author, ban reason, country, etc.)
- Download and "Read Online" options
- 💬 Chat interface powered by OpenAI GPT (`gpt-3.5-turbo`)

#### 🔐 Save Your API Key (Securely)

![image](https://github.com/user-attachments/assets/6af0151d-c081-4992-a825-cfcb8ea19786)


Your key is saved locally in your browser using `localStorage`.

1. Enter your key in the input field (starts with `sk-`)
2. Click **Save Key**
3. You're ready to ask questions about the book's context.

> Note: All GPT answers are strictly limited to the book's metadata. We have **injection-proofed** the AI to stop any diversion of it's purpose:

 ![image](https://github.com/user-attachments/assets/2f7b7cf2-d017-4765-b1d3-1aa2f87d119a)


---

## 📤 Upload a Book (Local Only)

![image](https://github.com/user-attachments/assets/e2df91c6-d6f7-4b7b-ac26-7bafcd0750e9)


Visit `upload.html` to submit a new banned book:

- Title, Author, Category, Country, Description
- Upload a PDF or EPUB file

### Submission Persistence

![image](https://github.com/user-attachments/assets/e7648126-3c3c-4d08-8546-22f0a35e618a)


- All uploads are stored in `localStorage` (your browser only)
- No data is sent to a server (fully offline)
- Submissions are shown as: **"📁 Currently reviewing submission"**

---

## 💡 Memory & Browser Features

- ✅ **Client-side Memory**: All API keys, uploads, and submissions are saved locally (in `localStorage`)
- 🔍 **URL-based Filtering**: Query strings dynamically render filtered book views
- 🧠 **Interactive Assistant**: Book-aware GPT chat system within `book.html`

---

## 🛡 Privacy and Ethics

- No tracking or analytics
- No server-side processing (pure HTML/CSS/JS + local JSON)
- Users are responsible for legality of uploads

---

## 📁 File Overview

```plaintext
.
├── index.html          # Homepage
├── about.html          # Info & Contact
├── library.html        # Searchable Library
├── book.html           # Book Details + Chat
├── upload.html         # Upload Form
├── books.json          # Main dataset (static book info)
├── js/
│   └── js files
├── css/
│   └── css files 
└── images/             # Book covers
```

---

## 🧪 Example API Key Test

Use `localStorage.getItem("openai_api_key")` in the browser console to verify your saved key.

---


Free Palestine ❤️
