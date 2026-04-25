document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const searchInput = document.getElementById("searchInput");
  const orderForm = document.getElementById("orderForm");

  if (typeof fetchCats === "function" && document.getElementById("catList")) {
    fetchCats();
  }

  if (typeof renderCart === "function") {
    renderCart();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderCats();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredCats.length / itemsPerPage);

      if (currentPage < totalPages) {
        currentPage++;
        renderCats();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchValue = e.target.value.toLowerCase();

      filteredCats = cats.filter(cat =>
        cat.name.toLowerCase().includes(searchValue)
      );

      currentPage = 1;
      renderCats();
    });
  }

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (cart.length === 0) {
        alert("Din kundvagn är tom.");
        return;
      }

      const name = document.getElementById("customerName").value;
      const email = document.getElementById("customerEmail").value;
      const address = document.getElementById("customerAddress").value;

      const catNames = cart.map(cat => cat.name).join(", ");

      // alert(
      //   `Orderbekräftelse\n\nNamn: ${name}\nE-post: ${email}\nAdress: ${address}\n\nDu har beställt:\n${catNames}`
      // );

      const orderConfirmation = document.getElementById("orderConfirmation");
      const receiptContent = document.getElementById("receiptContent"); 

      receiptContent.innerHTML = `
      <p><strong>Namn:</strong> ${name}</p>
      <p><strong>E-post:</strong> ${email}</p>
      <p><strong>Adress:</strong> ${address}</p>
      <p><strong>Beställda katter:</strong> ${catNames}</p>
      `;

      orderForm.style.transition = "all 0.4s ease";
      orderForm.style.opacity = "0";
      orderForm.style.maxHeight = "0";
      orderForm.style.overflow = "hidden";

      setTimeout(() => {
        orderForm.style.display = "none";

        orderConfirmation.classList.remove("hidden");
        orderConfirmation.classList.add("show");
      }, 300);

      cart = [];
      saveCart();
      renderCart();
      
      e.target.reset();
    });
  }
});