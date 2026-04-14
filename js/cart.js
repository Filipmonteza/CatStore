function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  cart = savedCart ? JSON.parse(savedCart) : [];
}

// VISA KUNDVAGN
function renderCart() {
  const cartList = document.getElementById("cartList");
  if (!cartList) return;

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

// LÄGG TILL I KUNDVAGN
function addToCart(catName) {
  const selectedCat = cats.find(cat => cat.name === catName);

  if (selectedCat) {
    cart.push(selectedCat);
    saveCart();
    renderCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderCart();
});