// ==============================
// BIẾN TOÀN CỤC
// ==============================
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];


// ==============================
// HIỂN THỊ GIỎ HÀNG MINI TRÊN HEADER
// ==============================
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


// ==============================
// SHOW TOAST
// ==============================
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


// ==============================
// THÊM VÀO GIỎ HÀNG
// ==============================
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
        showToast(`Chỉ còn ${stock - currentInCart} sản phẩm có sẵn!`, 'error');
        return;
    }

    if (existing) {
        existing.quantity += quantity;
    } else {
        const product = { name, price, image, quantity, stock, selected: true };
        cartItems.push(product);
    }

    updateCartUI();

    if (isBuyNow) {
        window.location.href = '/datn-project/pages/cart.html';
    } else {
        showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
    }
}


// ==============================
// CLICK EVENT
// ==============================
document.addEventListener('click', function (e) {
    // Thêm vào giỏ hàng
    if (e.target.closest('.detail__btn--cart')) {
        handleAddToCart(false);
    }

    // Mua ngay
    if (e.target.closest('.detail__btn--buy')) {
        handleAddToCart(true);
    }

    // Xoá trong mini cart
    if (e.target.classList.contains('header__cart-remove')) {
        const index = e.target.dataset.index;
        cartItems.splice(index, 1);
        updateCartUI();
        showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'error');
    }

    // MUA HÀNG – chuyển sang trang checkout
    if (e.target.closest('.cart__btn--checkout')) {
        const selectedItems = cartItems.filter(item => item.selected);
        localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));

        const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        localStorage.setItem('checkoutTotal', total);

        window.location.href = '/datn-project/pages/checkout.html';
    }
});


// ==============================
// LOAD BAN ĐẦU
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
