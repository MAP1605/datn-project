export default function updateCartHeader() {
  function renderMiniCart(items) {
    const cartList = document.querySelector(".header__cart-list");
    const cartTotal = document.querySelector(".header__cart-total b");
    const cartCount = document.querySelector(".header__cart-count");

    if (!cartList || !cartTotal || !cartCount) return;

    let total = 0;
    let html = "";

    items.forEach(({ Ten_San_Pham, Gia_Ban, So_Luong, Anh_Bia }) => {
      total += Gia_Ban * So_Luong;
      html += `
        <li class="header__cart-item">
          <img src="${Anh_Bia}" class="header__cart-img" />
          <div class="header__cart-info">
            <h5 class="header__cart-name">${Ten_San_Pham}</h5>
            <span class="header__cart-price">₫${Gia_Ban.toLocaleString()}</span>
            <span class="header__cart-quantity">Số lượng: ${So_Luong}</span>
          </div>
        </li>
      `;
    });

    cartList.innerHTML = html || "<p>🛒 Giỏ hàng trống</p>";
    cartTotal.textContent = `₫${total.toLocaleString()}`;
    cartCount.textContent = items.length;
    cartCount.style.display = items.length > 0 ? "inline-block" : "none";
  }

  fetch("/datn-project/pages/api/get-cart-items.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        renderMiniCart(data.items);
      }
    });
}
