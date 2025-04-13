document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector('.checkout-products');
  const shippingFee = 0;
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

document.querySelector('.checkout-action__btn').addEventListener('click', () => {
  if (!confirm('Xác nhận đặt hàng?')) return;

  const sanPham = cart.map(sp => ({
    idCTGH: sp.ID_Chi_Tiet_Gio_Hang,
    soLuong: sp.quantity,
    giaBan: sp.price
  }));

  const formData = new FormData();
  formData.append('sanPham', JSON.stringify(sanPham));
  formData.append('diaChiID', 1);
  formData.append('phuongThuc', 'Thanh toán khi nhận hàng');

  fetch('/datn-project/datn-project/pages/api/xu-ly-dat-hang.php', {
    method: 'POST',
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      console.log('Kết quả trả về:', data);
      if (data.trim() === 'success') {
        alert('Đặt hàng thành công!');
        window.location.href = '/datn-project/datn-project/pages/Donmua.php';
      } else {
        alert('Đặt hàng thất bại!');
        console.error(data);
      }
    });
});
