let cats = [];
let filteredCats = [];
let currentPage = 1;
const itemsPerPage = 10;
let cart = [];


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