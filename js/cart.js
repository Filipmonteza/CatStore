// function saveCart() {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// function loadCart() {
//   const savedCart = localStorage.getItem("cart");
//   cart = savedCart ? JSON.parse(savedCart) : [];
// }

// VISA KUNDVAGN
function renderCart() {
  const cartList = document.getElementById("cartList");
  if (!cartList) return;

  updateCartBadge(); // Uppdatera badge varje gång vi renderar kundvagnen

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Kundvagnen är tom.</p>";
    return;
  }

  cart.forEach(cat => {
    const item = document.createElement("div");
    item.classList.add("cart-item");

    /**
     * För varje katt i kundvagnen skapar vi en div med klass "cart-item". Inuti denna div lägger vi till kattens namn och ursprung,
     *  samt en knapp för att ta bort katten från kundvagnen.
     *  När knappen klickas, anropas funktionen removeFromCart med kattens namn som argument,
     *  vilket tar bort katten från kundvagnen och uppdaterar visningen.
     */
    item.innerHTML = `
      <p><strong>${cat.name}</strong> - ${cat.origin}
     
      <button onclick="removeFromCart('${cat.name}')">Ta bort</button>
      </p>
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

/*
 * Rensa kundvagnen
 */
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();

}
 // UPPDATERA BADGE
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = cart.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

// Spara och ladda kundvagn
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(); 
}

// Ladda kundvagn och uppdatera badge
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  cart = savedCart ? JSON.parse(savedCart) : [];
  updateCartBadge();
}

// När sidan laddas, ladda kundvagnen och rendera den
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderCart();
  updateCartBadge(); // Uppdatera badge när sidan laddas
});