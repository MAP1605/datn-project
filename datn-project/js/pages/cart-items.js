// Không còn localStorage nữa
// sửa lại đoạn khai báo
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

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
        <h5 class="header__cart-name">${item.name}</h5>
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

    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

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
            const product = { name, price, image, quantity, stock }; // ✅ thêm stock
            cartItems.push(product);
        }


        updateCartUI();
        showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
    }

    // Xoá sản phẩm khỏi giỏ từ mini cart
    if (e.target.classList.contains('header__cart-remove')) {
        const index = e.target.dataset.index;
        cartItems.splice(index, 1);
        updateCartUI();
        showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'error');
    }
});

// Gọi khi trang load để hiển thị đúng giỏ hàng trên header
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

