// ✅ CART.JS HOÀN CHỈNH
// Gắn file này vào cart.html để xử lý hiển thị, tăng giảm, xoá sản phẩm, tính tổng tiền, validate input...
document.addEventListener('DOMContentLoaded', () => {
  // let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const cartBody = document.getElementById('cartBody');
  const cartTotal = document.getElementById('cartTotal');
  const selectAllTop = document.getElementById('selectAll');
  const selectAllBottom = document.getElementById('selectAllBottom');
  const deleteSelectedBtn = document.querySelector('.cart__btn--delete');
  const checkoutBtn = document.querySelector('.cart__btn--checkout');

  // ========== RENDER UI ==========

  function renderCart() {
    // Ghi lại trạng thái checkbox vào từng item
    document.querySelectorAll('.cart__checkbox').forEach(cb => {
      const index = +cb.dataset.index;
      if (cartItems[index]) {
        cartItems[index].checked = cb.checked;
      }
    });

    cartBody.innerHTML = '';

    if (!cartItems || cartItems.length === 0) {
      cartBody.innerHTML = '<p>🛒 Giỏ hàng trống.</p>';
      cartTotal.textContent = '₫0';
      return;
    }

    cartItems.forEach((item, index) => {
      const itemTotal = item.Gia_Ban * item.So_Luong;
      const isChecked = item.checked ?? true;

      const row = document.createElement('div');
      row.className = 'cart__item cart__row';
      row.innerHTML = `
        <div class="cart__col cart__col--checkbox">
          <input type="checkbox" class="cart__checkbox" data-index="${index}" ${isChecked ? 'checked' : ''} />
        </div>
        <div class="cart__col cart__col--product">
          <img src="get-image.php?id=${item.ID_San_Pham}" class="cart__product-img" alt="${item.Ten_San_Pham}" />
          <span class="cart__product-name">${item.Ten_San_Pham}</span>
        </div>
        <div class="cart__col cart__col--price">₫${item.Gia_Ban.toLocaleString()}</div>
        <div class="cart__col cart__col--quantity">
          <div class="cart__quantity-control">
            <button class="cart__quantity-btn" data-type="minus" data-index="${index}">-</button>
            <input type="text" class="cart__quantity-input"
       value="${item.So_Luong}"
       data-index="${index}"
       data-id="${item.ID_Gio_Hang}"
       data-ctgh-id="${item.ID_Chi_Tiet_Gio_Hang}" />
            <button class="cart__quantity-btn" data-type="plus" data-index="${index}">+</button>
          </div>
        </div>
        <div class="cart__col cart__col--total">₫${itemTotal.toLocaleString()}</div>
        <div class="cart__col cart__col--action">
          <form method="POST">
            <input type="hidden" name="xoa_id_gio_hang" value="${item.ID_Gio_Hang}">
            <button type="submit" name="xoa_sp" class="cart__btn cart__btn--delete">Xoá</button>
          </form>
        </div>
      `;

      cartBody.appendChild(row);
    });

    bindCheckboxEvents();
    updateSelectAllStatus();
    updateCartTotal();
  }

  function rememberCheckedState() {
    document.querySelectorAll('.cart__checkbox').forEach(cb => {
      const index = +cb.dataset.index;
      if (cartItems[index]) {
        cartItems[index].checked = cb.checked;
      }
    });
  }


  function updateCartTotal() {
    const itemCheckboxes = document.querySelectorAll('.cart__checkbox');
    let total = 0;

    itemCheckboxes.forEach(cb => {
      if (cb.checked) {
        const index = +cb.dataset.index;
        const item = cartItems[index];

        const quantityInput = document.querySelector(`.cart__quantity-input[data-index="${index}"]`);
        const quantity = parseInt(quantityInput?.value) || 0;

        // Đảm bảo giá là số (loại dấu chấm)
        const price = typeof item.Gia_Ban === 'string'
          ? parseInt(item.Gia_Ban.replace(/\./g, ''))
          : item.Gia_Ban;

        total += price * quantity;
      }
    });

    cartTotal.textContent = `₫${total.toLocaleString()}`;
  }



  function bindCheckboxEvents() {
    const checkboxes = document.querySelectorAll('.cart__checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        updateSelectAllStatus();
        updateCartTotal();
      });
    });
  }

  function updateSelectAllStatus() {
    const checkboxes = document.querySelectorAll('.cart__checkbox');
    const allChecked = [...checkboxes].every(cb => cb.checked);
    const noneChecked = [...checkboxes].every(cb => !cb.checked);
    selectAllTop.checked = allChecked && checkboxes.length > 0;
    selectAllBottom.checked = allChecked && checkboxes.length > 0;
    if (noneChecked) {
      selectAllTop.checked = false;
      selectAllBottom.checked = false;
    }
  }

  function handleSelectAll(checked) {
    const checkboxes = document.querySelectorAll('.cart__checkbox');
    checkboxes.forEach(cb => cb.checked = checked);
    updateCartTotal();
  }

  selectAllTop?.addEventListener('change', () => {
    handleSelectAll(selectAllTop.checked);
    selectAllBottom.checked = selectAllTop.checked;
  });

  selectAllBottom?.addEventListener('change', () => {
    handleSelectAll(selectAllBottom.checked);
    selectAllTop.checked = selectAllBottom.checked;
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderCart();
  });


  cartBody.addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    const index = e.target.dataset.index;
    const input = document.querySelector(`.cart__quantity-input[data-index="${index}"]`);
    const id = input?.dataset.ctghId;

    if (!type || index === undefined || !id) return;

    let quantity = parseInt(input.value) || 1;

    if (type === 'plus') quantity++;
    if (type === 'minus' && quantity > 1) quantity--;

    input.value = quantity;

    updateQuantityToServer(id, quantity);
  });

  cartBody.addEventListener('input', (e) => {
    if (e.target.classList.contains('cart__quantity-input')) {
      const index = e.target.dataset.index;
      const id = e.target.dataset.id;
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) val = 1;

      cartItems[index].So_Luong = val;
      updateQuantityToServer(id, val);
    }
  });


  function updateQuantityToServer(id_chi_tiet_gio_hang, quantity) {
    fetch('../pages/update-quantity.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_chi_tiet_gio_hang: id_chi_tiet_gio_hang, // ✅ sửa lại key đúng
        so_luong: quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('DEBUG SERVER RESPONSE:', data);
        if (data.success) {
          console.log('✅ Đã cập nhật DB');
        } else {
          alert('❌ Cập nhật DB thất bại');
        }
      })
      .catch(() => {
        alert('❌ Không thể kết nối server');
      });
  }

  // ========== TOAST THÔNG BÁO ==========
  function showToast(message, type = 'info') {
    const toast = document.getElementById('cart-toast');
    toast.querySelector('.cart-toast__msg').textContent = message;
    toast.style.backgroundColor = type === 'error' ? '#e74c3c' : '#2ecc71';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  renderCart();

});




