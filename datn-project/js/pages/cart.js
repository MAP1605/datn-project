let cartItems = [];

function updateCartUI() {
    const cartList = document.querySelector('.header__cart-list');
    const cartCount = document.querySelector('.header__cart-count');
    const cartTotal = document.querySelector('.header__cart-total b');

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
}

function showCartPopup() {
    const popup = document.getElementById('popupCart');
    if (!popup) return;

    popup.classList.add('active');
    setTimeout(() => popup.classList.remove('active'), 2000);
}

document.addEventListener('click', function (e) {
    // Thêm vào giỏ
    if (e.target.closest('.detail__btn--cart')) {
        const name = document.querySelector('.product-detail__name')?.textContent.trim();
        const priceText = document.querySelector('.product-detail__price-new')?.textContent.trim();
        const image = document.querySelector('.detail__media-main')?.getAttribute('src');
        const quantityInput = document.querySelector('.product-detail__qty-input');
        const quantity = parseInt(quantityInput?.value || 1);
        const stockText = document.querySelector('.product-detail__stock')?.textContent.trim();
        const stock = parseInt(stockText?.match(/\d+/)?.[0] || 0); // lấy số từ "369 sản phẩm có sẵn"

        if (!name || !priceText || !image || !quantity || quantity <= 0) {
            alert('Thiếu thông tin sản phẩm hoặc số lượng không hợp lệ!');
            return;
        }

        const price = parseInt(priceText.replace(/[^\d]/g, ''));

        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        const existing = cartItems.find(item => item.name === name);

        const currentInCart = existing ? existing.quantity : 0;
        const totalAfterAdd = currentInCart + quantity;

        if (totalAfterAdd > stock) {
            alert(`Không thể thêm ${quantity} sản phẩm! Chỉ còn ${stock - currentInCart} sản phẩm có sẵn.`);
            return;
        }

        if (existing) {
            existing.quantity += quantity;
        } else {
            const product = { name, price, image, quantity };
            cartItems.push(product);
        }

        updateCartUI();
        showCartPopup();
    }


    // Xoá khỏi giỏ
    if (e.target.classList.contains('header__cart-remove')) {
        const index = e.target.dataset.index;
        cartItems.splice(index, 1);
        updateCartUI();
    }
});
