document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector('.checkout-products');
  const shippingFee = 25000;
  let subtotal = 0;

  const selectedIds = JSON.parse(localStorage.getItem('selectedCartIds') || '[]').map(id => parseInt(id));

  if (!Array.isArray(cart) || !Array.isArray(selectedIds)) {
    console.warn('Dữ liệu không hợp lệ:', { cart, selectedIds });
    return;
  }

  const selectedItems = cart.filter(item =>
    selectedIds.includes(parseInt(item.ID_Chi_Tiet_Gio_Hang))

  );

  if (selectedItems.length === 0) {
    productList.insertAdjacentHTML('beforeend', `
      <div class="checkout-products__item" style="text-align: center; padding: 20px;">
        Không có sản phẩm nào được chọn để thanh toán.
      </div>
    `);
  } else {
    selectedItems.forEach(item => {
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

  document.getElementById('checkoutTotal').innerText = subtotal.toLocaleString('vi-VN') + 'đ';
  document.getElementById('checkoutFinal').innerText = (subtotal + shippingFee).toLocaleString('vi-VN') + 'đ';
});