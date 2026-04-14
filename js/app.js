let cats = [];
let filteredCats = [];
let currentPage = 1;
const itemsPerPage = 10;
let cart = [];

// FETCH
async function fetchCats() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/breeds?limit=30");

    if (!response.ok) {
      throw new Error("Kunde inte hämta kattdata");
    }

    const data = await response.json();

    console.log("API fungerar, data hämtad:", data);

    cats = data;
    filteredCats = data;

    renderCats();
  } catch (error) {
    console.error("Error fetching cats:", error);
  }
}

// NAVIGATION
function setupNavigation() {
  const links = document.querySelectorAll("nav a");
  const pages = document.querySelectorAll(".page");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.dataset.page;

      pages.forEach(page => page.classList.remove("active"));

      const selectedPage = document.getElementById(pageId);
      if (selectedPage) {
        selectedPage.classList.add("active");
      }
    });
  });
}

// RENDER KATTER
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

    const imageUrl = cat.reference_image_id
      ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
      : "https://via.placeholder.com/200";

    catCard.innerHTML = `
      <h3>${cat.name}</h3>
      <p>Ursprung: ${cat.origin}</p>
      <img src = "${imageUrl}" alt="${cat.name}">
      <button onclick="addToCart('${cat.name}')">Lägg i kundvagn</button>
    `;

    catList.appendChild(catCard);
  });

  const totalPages = Math.ceil(filteredCats.length / itemsPerPage);
  pageInfo.textContent = `Sida ${currentPage} av ${totalPages}`;
}

// LÄGG TILL I KUNDVAGN
function addToCart(catName) {
  const selectedCat = cats.find(cat => cat.name === catName);

  if (selectedCat) {
    cart.push(selectedCat);
    renderCart();
  }
}

// VISA KUNDVAGN
function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Kundvagnen är tom.</p>";
    return;
  }

  cart.forEach(cat => {
    const item = document.createElement("div");
    item.classList.add("cart-item");

    item.innerHTML = `
      <p><strong>${cat.name}</strong> - ${cat.origin}</p>
    `;

    cartList.appendChild(item);
  });
}

// START
document.addEventListener("DOMContentLoaded", () => {
  fetchCats();
  setupNavigation();
  renderCart();

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderCats();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredCats.length / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      renderCats();
    }
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();

    filteredCats = cats.filter(cat =>
      cat.name.toLowerCase().includes(searchValue)
    );

    currentPage = 1;
    renderCats();
  });

  document.getElementById("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Din kundvagn är tom.");
      return;
    }

    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const address = document.getElementById("customerAddress").value;

    const catNames = cart.map(cat => cat.name).join(", ");

    alert(
      `Orderbekräftelse\n\nNamn: ${name}\nE-post: ${email}\nAdress: ${address}\n\nDu har beställt:\n${catNames}`
    );

    cart = [];
    renderCart();
    e.target.reset();
  });
});