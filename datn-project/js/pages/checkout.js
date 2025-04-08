document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".checkout-products");
    const totalDOM = document.querySelector(".checkout-summary__row:nth-child(1) strong");
    const finalDOM = document.querySelector(".checkout-summary__total strong");

    const items = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    const total = Number(localStorage.getItem("checkoutTotal")) || 0;

    // Hiển thị sản phẩm
    items.forEach(item => {
        const itemHTML = `
      <div class="checkout-products__item">
        <div class="col col--product">
          <img src="${item.image}" alt="${item.name}" />
          <span>${item.name}</span>
        </div>
        <div class="col col--price">${item.price.toLocaleString()}đ</div>
        <div class="col col--qty">${item.quantity}</div>
        <div class="col col--total">${(item.price * item.quantity).toLocaleString()}đ</div>
      </div>
    `;
        productList.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Gán tổng tiền
    totalDOM.textContent = `${total.toLocaleString()}đ`;
    finalDOM.textContent = `${(total + 25000).toLocaleString()}đ`;
});
