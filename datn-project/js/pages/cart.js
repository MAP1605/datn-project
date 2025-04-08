// ✅ CART.JS HOÀN CHỈNH
// Gắn file này vào cart.html để xử lý hiển thị, tăng giảm, xoá sản phẩm, tính tổng tiền, validate input...
document.addEventListener('DOMContentLoaded', () => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const cartBody = document.getElementById('cartBody');
  const cartTotal = document.getElementById('cartTotal');
  const selectAllTop = document.getElementById('selectAll');
  const selectAllBottom = document.getElementById('selectAllBottom');
  const deleteSelectedBtn = document.querySelector('.cart__btn--delete');

  function renderCart() {
    const cartBody = document.getElementById("cartBody");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || cartItems.length === 0) {
      cartBody.innerHTML = "<p>🛒 Giỏ hàng trống.</p>";
      cartTotal.textContent = "₫0";
      return;
    }

    cartBody.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
      const itemTotal = item.Gia_Ban * item.So_Luong;
      total += itemTotal;

      const row = document.createElement("div");
      row.className = "cart__item cart__row";
      row.innerHTML = `
        <div class="cart__col cart__col--checkbox">
          <input type="checkbox" class="cart__checkbox" data-index="${index}" checked />
        </div>
        <div class="cart__col cart__col--product">
          <img src="get-image.php?id=${item.ID_San_Pham}" class="cart__product-img" alt="${item.Ten_San_Pham}" />
          <span class="cart__product-name">${item.Ten_San_Pham}</span>
        </div>
        <div class="cart__col cart__col--price">₫${item.Gia_Ban.toLocaleString()}</div>
        <div class="cart__col cart__col--quantity">
          <div class="cart__quantity-control">
            <button class="cart__quantity-btn" data-type="minus" data-index="${index}">-</button>
            <input type="text" class="cart__quantity-input" value="${item.So_Luong}" data-index="${index}" />
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

    cartTotal.textContent = `₫${total.toLocaleString()}`;

    // Gọi thêm nếu bạn có hàm này ở dưới:
    if (typeof bindCheckboxEvents === "function") bindCheckboxEvents();
    if (typeof updateSelectAllStatus === "function") updateSelectAllStatus();
    if (typeof updateCartTotal === "function") updateCartTotal();
  }

  // ========== RENDER UI ==========
  // function renderCart() {
  //   cartBody.innerHTML = '';

  //   cartItems.forEach((item, index) => {
  //     const itemTotal = item.price * item.quantity;

  //     const row = document.createElement('div');
  //     row.className = 'cart__item cart__row';
  //     row.innerHTML = `
  //       <div class="cart__col cart__col--checkbox">
  //         <input type="checkbox" class="cart__checkbox" data-index="${index}" checked />
  //       </div>
  //       <div class="cart__col cart__col--product">
  //         <img src="${item.image}" class="cart__product-img" alt="${item.name}" />
  //         <span class="cart__product-name">${item.name}</span>
  //       </div>
  //       <div class="cart__col cart__col--price">₫${item.price.toLocaleString()}</div>
  //       <div class="cart__col cart__col--quantity">
  //         <div class="cart__quantity-control">
  //           <button class="cart__quantity-btn" data-type="minus" data-index="${index}">-</button>
  //           <input type="text" class="cart__quantity-input" value="${item.quantity}" data-index="${index}" />
  //           <button class="cart__quantity-btn" data-type="plus" data-index="${index}">+</button>
  //         </div>
  //       </div>
  //       <div class="cart__col cart__col--total">₫${itemTotal.toLocaleString()}</div>
  //       <div class="cart__col cart__col--action">
  //         <button class="cart__btn--delete-single" data-index="${index}">Xoá</button>
  //       </div>
  //     `;

  //     cartBody.appendChild(row);
  //   });

  //   bindCheckboxEvents();
  //   updateSelectAllStatus();
  //   updateCartTotal();
  // }

  // ========== TÍNH TỔNG ==========
  function updateCartTotal() {
    const itemCheckboxes = cartBody.querySelectorAll('.cart__checkbox');
    let total = 0;
    itemCheckboxes.forEach(cb => {
      if (cb.checked) {
        const index = parseInt(cb.dataset.index);
        total += cartItems[index].price * cartItems[index].quantity;
      }
    });
    cartTotal.textContent = `₫${total.toLocaleString()}`;
  }

  // ========== CHECKBOX ==========
  function bindCheckboxEvents() {
    const checkboxes = cartBody.querySelectorAll('.cart__checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        updateSelectAllStatus();
        updateCartTotal();
      });
    });
  }

  function updateSelectAllStatus() {
    const checkboxes = cartBody.querySelectorAll('.cart__checkbox');
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
    const checkboxes = cartBody.querySelectorAll('.cart__checkbox');
    checkboxes.forEach(cb => cb.checked = checked);
    updateCartTotal();
  }

  selectAllTop.addEventListener('change', () => {
    handleSelectAll(selectAllTop.checked);
    selectAllBottom.checked = selectAllTop.checked;
  });

  selectAllBottom.addEventListener('change', () => {
    handleSelectAll(selectAllBottom.checked);
    selectAllTop.checked = selectAllBottom.checked;
  });

  // ========== XOÁ TỪNG SẢN PHẨM ==========
  cartBody.addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    const index = e.target.dataset.index;

    if (e.target.classList.contains('cart__btn--delete-single')) {
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
      showToast('Xoá sản phẩm thành công!');
      return;
    }

    if (type && index !== undefined) {
      const item = cartItems[index];

      if (type === 'plus') {
        if (item.quantity < item.stock) {
          item.quantity++;
        } else {
          showToast(`Chỉ còn ${item.stock} sản phẩm có sẵn`, 'error');
        }
      }

      if (type === 'minus') {
        if (item.quantity > 1) item.quantity--;
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
    }
  });

  // ========== XOÁ NHIỀU SẢN PHẨM ==========
  deleteSelectedBtn.addEventListener('click', () => {
    const selected = cartBody.querySelectorAll('.cart__checkbox:checked');
    if (selected.length === 0) return showToast('Vui lòng chọn sản phẩm để xoá!');

    const modal = document.getElementById('cart-confirm-modal');
    modal.style.display = 'flex';

    document.getElementById('confirmYes').onclick = () => {
      const indexes = [...selected].map(cb => +cb.dataset.index);
      cartItems = cartItems.filter((_, i) => !indexes.includes(i));
      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
      showToast('Xoá tất cả sản phẩm thành công!');
      modal.style.display = 'none';
    };

    document.getElementById('confirmNo').onclick = () => {
      modal.style.display = 'none';
    };
  });

  // ========== NHẬP TRỰC TIẾP ==========
  cartBody.addEventListener('input', (e) => {
    if (e.target.classList.contains('cart__quantity-input')) {
      const index = e.target.dataset.index;
      const max = cartItems[index].stock;
      let value = parseInt(e.target.value);

      if (isNaN(value) || value <= 0) {
        cartItems[index].quantity = 1;
      } else if (value > max) {
        showToast(`Chỉ còn ${max} sản phẩm có sẵn`, 'error');
        cartItems[index].quantity = max;
      } else {
        cartItems[index].quantity = value;
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
    }
  });

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


document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});