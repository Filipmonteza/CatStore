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
      : "https://via.placeholder.com/200?text=Image+not+found";

    catCard.innerHTML = `
      <h3>${cat.name}</h3>
      <p>Ursprung: ${cat.origin}</p>
      <img 
        src="${imageUrl}"
        alt="${cat.name}"
        loading="lazy"
        onerror="this.onerror=null; this.src='https://via.placeholder.com/200?text=Image+not+found';"
      >
      <button onclick="addToCart('${cat.name}')">Lägg i kundvagn</button>
    `;

    catList.appendChild(catCard);
  });

  const totalPages = Math.ceil(filteredCats.length / itemsPerPage);
  pageInfo.textContent = `Sida ${currentPage} av ${totalPages}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCats();
});

// PrevBtn och NextBtn för att navigera mellan sidorna
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCats();
  }});
  
document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredCats.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderCats();
  }});