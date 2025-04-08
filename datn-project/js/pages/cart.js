document.addEventListener('DOMContentLoaded', () => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const cartBody = document.getElementById('cartBody');
  const cartTotal = document.getElementById('cartTotal');
  const selectAllTop = document.getElementById('selectAll');
  const selectAllBottom = document.getElementById('selectAllBottom');
  const deleteSelectedBtn = document.querySelector('.cart__btn--delete');

  function renderCart() {
    cartBody.innerHTML = '';

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;

      const row = document.createElement('div');
      row.className = 'cart__item cart__row';
      row.innerHTML = `
        <div class="cart__col cart__col--checkbox">
          <input type="checkbox" class="cart__checkbox" data-index="${index}" checked />
        </div>
        <div class="cart__col cart__col--product">
          <img src="${item.image}" class="cart__product-img" alt="${item.name}" />
          <span class="cart__product-name">${item.name}</span>
        </div>
        <div class="cart__col cart__col--price">₫${item.price.toLocaleString()}</div>
        <div class="cart__col cart__col--quantity">
          <div class="cart__quantity-control">
            <button class="cart__quantity-btn" data-type="minus" data-index="${index}">-</button>
            <input type="text" class="cart__quantity-input" value="${item.quantity}" data-index="${index}" />
            <button class="cart__quantity-btn" data-type="plus" data-index="${index}">+</button>
          </div>
        </div>
        <div class="cart__col cart__col--total">₫${itemTotal.toLocaleString()}</div>
        <div class="cart__col cart__col--action">
          <button class="cart__btn--delete-single" data-index="${index}">Xoá</button>
        </div>
      `;

      cartBody.appendChild(row);
    });

    bindCheckboxEvents();
    updateSelectAllStatus();
    updateCartTotal();
  }

  function updateCartTotal() {
    const itemCheckboxes = cartBody.querySelectorAll('.cart__checkbox');
    let total = 0;

    itemCheckboxes.forEach((cb) => {
      if (cb.checked) {
        const index = parseInt(cb.dataset.index);
        const item = cartItems[index];
        total += item.price * item.quantity;
      }
    });

    cartTotal.textContent = `₫${total.toLocaleString()}`;
  }

  function bindCheckboxEvents() {
    const itemCheckboxes = cartBody.querySelectorAll('.cart__checkbox');

    itemCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        updateSelectAllStatus();
        updateCartTotal();
      });
    });
  }

  function updateSelectAllStatus() {
    const itemCheckboxes = cartBody.querySelectorAll('.cart__checkbox');
    const allChecked = [...itemCheckboxes].every(cb => cb.checked);
    const noneChecked = [...itemCheckboxes].every(cb => !cb.checked);

    selectAllTop.checked = allChecked && itemCheckboxes.length > 0;
    selectAllBottom.checked = allChecked && itemCheckboxes.length > 0;

    if (noneChecked) {
      selectAllTop.checked = false;
      selectAllBottom.checked = false;
    }
  }

  function handleSelectAll(checked) {
    const itemCheckboxes = cartBody.querySelectorAll('.cart__checkbox');
    itemCheckboxes.forEach(cb => cb.checked = checked);
    updateCartTotal();
  }

  selectAllTop.addEventListener('change', function () {
    handleSelectAll(this.checked);
    selectAllBottom.checked = this.checked;
  });

  selectAllBottom.addEventListener('change', function () {
    handleSelectAll(this.checked);
    selectAllTop.checked = this.checked;
  });

  deleteSelectedBtn.addEventListener('click', function () {
    const selectedCheckboxes = cartBody.querySelectorAll('.cart__checkbox:checked');
    if (selectedCheckboxes.length === 0) {
      showToast('Vui lòng chọn sản phẩm để xoá!');
      return;
    }

    const modal = document.getElementById('cart-confirm-modal');
    modal.style.display = 'flex';

    const btnYes = document.getElementById('confirmYes');
    const btnNo = document.getElementById('confirmNo');

    btnYes.onclick = () => {
      const indexesToDelete = [...selectedCheckboxes].map(cb => parseInt(cb.dataset.index));
      cartItems = cartItems.filter((_, idx) => !indexesToDelete.includes(idx));
      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
      showToast('Xoá tất cả sản phẩm thành công!');
      modal.style.display = 'none';
    };

    btnNo.onclick = () => {
      modal.style.display = 'none';
    };
  });



  cartBody.addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    const index = e.target.dataset.index;

    if (type && index !== undefined) {
      const item = cartItems[index];
      if (type === 'plus') item.quantity++;
      if (type === 'minus' && item.quantity > 1) item.quantity--;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
    }

    if (e.target.classList.contains('cart__btn--delete-single')) {
      const index = e.target.dataset.index;
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
      showToast('Xoá sản phẩm thành công!');
    }
  });

  cartBody.addEventListener('input', (e) => {
    if (e.target.classList.contains('cart__quantity-input')) {
      const index = e.target.dataset.index;
      let value = parseInt(e.target.value);
      if (!isNaN(value) && value > 0) {
        cartItems[index].quantity = value;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
      }
    }
  });

  renderCart();
});


function showToast(message) {
  const toast = document.getElementById('cart-toast');
  toast.querySelector('.cart-toast__msg').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500); // 2.5s tự ẩn
}



