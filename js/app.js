let cats = [];
let filteredCats = [];
let currentPage = 1;
const itemsPerPage = 10;
let cart = [];

// ===== FETCH =====
async function fetchCats() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds?limit=30");
  const data = await response.json();

  cats = data;
  filteredCats = data;

  renderCats(); // anropar  funktionen
}

// ===== RENDER KATTER =====
function renderCats() {
  const catList = document.getElementById("catList");
  const pageInfo = document.getElementById("pageInfo");

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const catsToShow = filteredCats.slice(start, end);

  catList.innerHTML = "";

  catsToShow.forEach(cat => {
    const catCard = document.createElement("div");
    catCard.classList.add("cat-card");

    catCard.innerHTML = `
      <h3>${cat.name}</h3>
      <p>Ursprung: ${cat.origin}</p>
      <img src="${cat.image?.url || 'https://via.placeholder.com/200'}" alt="${cat.name}">
      <button onclick="addToCart('${cat.name}')">Lägg i kundvagn</button>
    `;

    catList.appendChild(catCard);
  });

  const totalPages = Math.ceil(filteredCats.length / itemsPerPage);
  pageInfo.textContent = `Sida ${currentPage} av ${totalPages}`;
}

// ===== START =====
document.addEventListener("DOMContentLoaded", () => {
  fetchCats();
});