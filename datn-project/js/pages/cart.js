// File: js/pages/cart.js
document.addEventListener('DOMContentLoaded', () => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');

    function renderCart() {
        cartBody.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement('div');
            row.className = 'cart__item';
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

        cartTotal.textContent = `₫${total.toLocaleString()}`;
    }

    // Cộng/trừ
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

        // Xoá
        if (e.target.classList.contains('cart__btn--delete-single')) {
            const index = e.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart();
        }
    });

    // Nhập trực tiếp
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
