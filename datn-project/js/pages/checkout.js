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
document.querySelector('.checkout-Select-Address').addEventListener('click', () => {
  const addresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
  if (!addresses.length) {
    alert('Chưa có địa chỉ nào. Vui lòng thêm ở trang địa chỉ!');
    window.location.href = "datn-project/datn-project/pages/diachi.html";
    return;
  }

  const popup = document.createElement('div');
  popup.className = 'address-popup';
  popup.innerHTML = `
    <div class="address-popup__overlay"></div>
    <div class="address-popup__content">
      <h3>Chọn địa chỉ giao hàng</h3>
      <ul class="address-popup__list">
        ${addresses.map((addr, i) => `
          <li class="address-popup__item" data-index="${i}">
            <strong>${addr.ten}</strong> | ${addr.sdt}<br/>
            ${addr.ward}, ${addr.district}, ${addr.province}
          </li>`).join('')}
      </ul>
      <button class="address-popup__close">Đóng</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.querySelectorAll('.address-popup__item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = item.dataset.index;
      const addr = addresses[idx];
      document.querySelector('.checkout-address__info').innerHTML = `
        <strong>${addr.ten}</strong> &nbsp; (${addr.sdt})<br/>
        ${addr.ward}, ${addr.district}, ${addr.province}
      `;
      popup.remove();
    });
  });

  document.querySelector('.address-popup__close').addEventListener('click', () => popup.remove());
});