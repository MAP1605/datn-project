//let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật giỏ hàng mini ở header
function updateCartUI() {
    const cartList = document.querySelector('.header__cart-list');
    const cartCount = document.querySelector('.header__cart-count');
    const cartTotal = document.querySelector('.header__cart-total b');

    if (!cartList || !cartCount || !cartTotal) return;

    cartList.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'header__cart-item';
        li.innerHTML = `
      <img src="${item.image}" class="header__cart-img" alt="${item.name}">
      <div class="header__cart-info">
        <h5 class="header__cart-name" title="${item.name}">${item.name}</h5>
        <span class="header__cart-price">₫${item.price.toLocaleString()}</span>
        <span class="header__cart-quantity">Số lượng: ${item.quantity}</span>
      </div>
      <button class="header__cart-remove" data-index="${index}">&times;</button>
    `;
        cartList.appendChild(li);
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = `₫${total.toLocaleString()}`;
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Thông báo
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;

    switch (type) {
        case 'success':
            toast.style.backgroundColor = '#28a745';
            break;
        case 'error':
            toast.style.backgroundColor = '#dc3545';
            break;
        default:
            toast.style.backgroundColor = '#333';
    }

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('click', function (e) {
    // Thêm vào giỏ hàng
    if (e.target.closest('.detail__btn--cart')) {
        handleAddToCart(false);
    }

    // Mua ngay
    if (e.target.closest('.detail__btn--buy')) {
        handleAddToCart(true);
    }

    // Xoá sản phẩm mini cart
    if (e.target.classList.contains('header__cart-remove')) {
        const index = e.target.dataset.index;
        cartItems.splice(index, 1);
        updateCartUI();
        showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'error');
    }
});

// Hàm xử lý thêm vào giỏ hàng (cho cả Thêm và Mua ngay)
function handleAddToCart(isBuyNow = false) {
    const name = document.querySelector('.product-detail__name')?.textContent.trim();
    const priceText = document.querySelector('.product-detail__price-new')?.textContent.trim();
    const image = document.querySelector('.detail__media-main')?.getAttribute('src');
    const quantityInput = document.querySelector('.product-detail__qty-input');
    const quantity = parseInt(quantityInput?.value || 1);
    const stockText = document.querySelector('.product-detail__stock')?.textContent.trim();
    const stock = parseInt(stockText?.match(/\d+/)?.[0] || 0);

    if (!name || !priceText || !image || !quantity || quantity <= 0) {
        showToast('Thiếu thông tin sản phẩm hoặc số lượng không hợp lệ!', 'error');
        return;
    }

    const price = parseInt(priceText.replace(/[^\d]/g, ''));
    const existing = cartItems.find(item => item.name === name);
    const currentInCart = existing ? existing.quantity : 0;
    const totalAfterAdd = currentInCart + quantity;

    if (totalAfterAdd > stock) {
        showToast(`Không thể thêm ${quantity} sản phẩm! Chỉ còn ${stock - currentInCart} sản phẩm có sẵn.`, 'error');
        return;
    }

    if (existing) {
        existing.quantity += quantity;
    } else {
        const product = { name, price, image, quantity, stock };
        cartItems.push(product);
    }

    updateCartUI();

    if (isBuyNow) {
        window.location.href = '/datn-project/pages/cart.html';
    } else {
        showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
    }
}

// Khi trang load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

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

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});