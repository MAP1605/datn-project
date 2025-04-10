document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productList = document.querySelector('.checkout-products');
  const shippingFee = 25000;
  let subtotal = 0;

  if (cart.length === 0) {
    productList.insertAdjacentHTML('beforeend', `
      <div class="checkout-products__item" style="text-align: center; padding: 20px;">
        Không có sản phẩm trong giỏ hàng.
      </div>
    `);
  } else {
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const itemHTML = `
        <div class="checkout-products__item">
            <div class="col col--product">
                <img src="${item.image}" alt="${item.name}" />
                <span>${item.name}</span>
            </div>
            <div class="col col--price">${item.price.toLocaleString('vi-VN')}đ</div>
            <div class="col col--qty">${item.quantity}</div>
            <div class="col col--total">${itemTotal.toLocaleString('vi-VN')}đ</div>
        </div>`;
      productList.insertAdjacentHTML('beforeend', itemHTML);
    });
  }

  // Hiển thị tổng tiền
  document.getElementById('checkoutTotal').innerText = subtotal.toLocaleString('vi-VN') + 'đ';
  document.getElementById('checkoutFinal').innerText = (subtotal + shippingFee).toLocaleString('vi-VN') + 'đ';
});
