// VISA KUNDVAGN
function renderCart() {
  const cartList = document.getElementById("cartList");
  if (!cartList) return;

  updateCartBadge();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Kundvagnen är tom.</p>";
    return;
  }

  cart.forEach((cat, index) => {
  const item = document.createElement("div");
  item.classList.add("cart-item");

  const fallback = cat.fallbackImage || "../images/DevonRex.jpg";

  item.innerHTML = `
    <img 
      src="${cat.image}" 
      class="cart-img"
      onerror="this.onerror=null; this.src='${fallback}';"
    />
    <div class="item-info">
      <p><strong>${cat.name}</strong></p>
      <p>${cat.origin || ""}</p>
    </div>
    <button class="remove-btn" onclick="removeFromCart(${index})">
      Ta bort
    </button>
  `;

  cartList.appendChild(item);
});
}

// LÄGG TILL I KUNDVAGN
function addToCart(cat) {
  const imageUrl = cat.reference_image_id
    ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
    : cat.fallbackImage || "https://via.placeholder.com/60";

  const cartItem = {
    name: cat.name,
    image: imageUrl,
    origin: cat.origin,
    fallbackImage: cat.fallbackImage || ""
  };

  cart.push(cartItem);
  saveCart();
  renderCart();
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