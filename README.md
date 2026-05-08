# 🐱 CatStore

CatStore is a frontend web application built with HTML, CSS, and vanilla JavaScript.
The application simulates a simple cat-themed online store where users can browse
different cat breeds, and manage a shopping cart.

---

## 🚀 Features

- Browse cat breeds fetched live from [The Cat API](https://thecatapi.com/)
- Search and filter cats by name in real time
- Paginated cat listing (10 cats per page)
- Add and remove cats from a persistent shopping cart
- Cart state saved in localStorage across sessions
- Cart item counter badge in the navigation bar
- Order form with animated confirmation and receipt
- Auto-playing image slideshow on the home page
- Reusable navigation bar loaded dynamically
- Modular JavaScript structure

---

## 🛠️ Tech Stack

- **HTML5** – Structure and content
- **CSS3** – Styling and layout
- **JavaScript (Vanilla JS)** – Logic and interactivity
- **The Cat API** – External API for cat breed data and images

---

## 📁 Project Structure

```bash
CatStore/
│── index.html
│── css/
│   └── style.css
│── images/
│   ├── bengal.jpg
│   └── devonrex.jpg
│── js/
│   ├── app.js        # Initialization, event listeners and order form logic
│   ├── cart.js       # Shopping cart – add, remove, save and render
│   ├── cats.js       # Fetches and renders cat breeds from The Cat API
│   ├── loadNavbar.js # Dynamically loads the reusable navbar component
│   └── ui.js         # UI-related functions (slideshow etc.)
│── pages/
│   ├── agare.html    # Owner information page
│   ├── katter.html   # Cat listing page with search and pagination
│   ├── kundvagn.html # Shopping cart and order form page
│   └── navbar.html   # Reusable navbar component

```

---

## ⚙️ Getting Started

### Prerequisites
No installation or build tools required. A modern web browser is sufficient.
It is however recommended to use a local development server to avoid CORS issues
when loading the navbar component via `fetch()`.

### Recommended: VS Code Live Server
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Right-click `index.html` and select **Open with Live Server**
3. The app will open at `http://127.0.0.1:5500`

### Alternative: Python
```bash
python -m http.server 5500
```
Then open `http://localhost:5500` in your browser.

---

## 🔌 API

This project uses [The Cat API](https://thecatapi.com/) (free tier, no API key required).

| Endpoint | Usage |
|---|---|
| `/v1/breeds?limit=30` | Fetch cat breeds for the cat listing page |
| `/v1/images/search?limit=5` | Fetch random cat images for the home page slideshow |

---

## ⚠️ Known Limitations

- Bengal and Devon Rex use local fallback images due to missing images in the API
- No backend – all data is stored in the browser's localStorage
- The order form does not send any real emails or process actual orders

---

## 🔮 Possible Future Improvements

- Add more detailed cat breed information pages
- User authentication
- Backend integration for real order processing
- Unit tests

---

## 👤 Author

**Filip Monteza**  
[GitHub](https://github.com/Filipmonteza)