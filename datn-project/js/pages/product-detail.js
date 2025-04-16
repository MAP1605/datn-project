<<<<<<< HEAD
=======
// ===== product-detail.js =====

// 1. Load ảnh sản phẩm
>>>>>>> main_3

//  load ảnh sản phẩm
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".detail__media-main");
  const thumbnails = document.querySelectorAll(".detail__media-thumbs img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newSrc = thumb.src;
      mainImage.src = newSrc;

      thumbnails.forEach((img) => img.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
});

// 2. Tăng giảm số lượng + đồng bộ hidden input

document.addEventListener("DOMContentLoaded", () => {
  const qtyInput = document.querySelector(".product-detail__qty-input");
  const minusBtn = document.querySelector('button[data-type="minus"]');
  const plusBtn = document.querySelector('button[data-type="plus"]');
  const formQtyInput = document.getElementById("formQuantity");
  const maxQty = parseInt(qtyInput?.dataset.max) || 999;

  const syncQuantity = () => {
    let value = parseInt(qtyInput.value) || 1;
    if (value < 1) value = 1;
    if (value > maxQty) value = maxQty;
    qtyInput.value = value;
    if (formQtyInput) formQtyInput.value = value;
  };

  minusBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    let value = parseInt(qtyInput.value) || 1;
    if (value > 1) qtyInput.value = value - 1;
    syncQuantity();
  });

  plusBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    let value = parseInt(qtyInput.value) || 1;
    if (value < maxQty) qtyInput.value = value + 1;
    syncQuantity();
  });

  qtyInput?.addEventListener("blur", syncQuantity);
  qtyInput?.addEventListener("input", syncQuantity);
  qtyInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      qtyInput.blur();
      syncQuantity();
    }
  });
});

<<<<<<< HEAD
// JavaScript dùng fetch() để khi bấm thêm số lượng vào giỏ hàng thì sẽ update lên database luôn
=======
// 3. Thêm vào giỏ hàng bằng fetch

>>>>>>> main_3
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const qtyInput = document.querySelector(".product-detail__qty-input");

  addToCartBtn?.addEventListener("click", async () => {
    const id = addToCartBtn.dataset.id;
    const url = addToCartBtn.dataset.url;
    const so_luong = parseInt(qtyInput.value) || 1;
    const ton_kho = parseInt(qtyInput.dataset.max) || 0;

<<<<<<< HEAD
    const res = await fetch("add-to-cart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_san_pham: id, so_luong, ton_kho })
    });

    const text = await res.text();
    console.log("📦 Trả về từ server:", text);

    try {
      const data = JSON.parse(text);

      if (data.success) {
        showToast("Đã thêm sản phẩm vào giỏ hàng!");

        // ✅ Nếu có header cart: update lại
        if (typeof renderCart === "function") renderCart();
      } else {
        showToast("Lỗi khi thêm vào giỏ hàng!", "error");
      }
    } catch (err) {
      console.error("❌ Không parse được JSON:", err);
      showToast("Lỗi máy chủ, thử lại sau!", "error");
    }

  });
});

////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const btnView = document.querySelector(".shop-btn--view");
  const btnChat = document.querySelector(".shop-btn--chat");

  const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    toast.innerHTML = `<div class="toast__success">${message}</div>`;

    setTimeout(() => {
      toast.classList.remove("show");
      toast.innerHTML = "";
    }, 2500);
  };

  btnView?.addEventListener("click", () => {
    showToast("🛠 Tính năng sẽ được cập nhật sau");
  });

  btnChat?.addEventListener("click", () => {
    showToast("💬 Tính năng sẽ được cập nhật sau");
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const buyNowBtn = document.querySelector(".product-detail__btn.detail__btn--buy");
  const quantityInput = document.querySelector(".product-detail__qty-input");
  const productId = document.getElementById("addToCartBtn")?.dataset?.id;

  buyNowBtn?.addEventListener("click", async () => {
    const soLuong = parseInt(quantityInput?.value || 1);

    try {
      const res = await fetch("/datn-project/pages/api/add-to-cart.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_san_pham: productId, // ✅ đúng key như bên PHP đang nhận
          so_luong: soLuong
        })
      });

      const data = await res.json();

      if (data.success) {
        showToast("Đang chuyển tới giỏ hàng...", "info");
        setTimeout(() => {
          window.location.href = "/datn-project/pages/cart.php";
        }, 1000);
      } else {
        showToast("Không thể thêm sản phẩm!", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Lỗi kết nối server!", "error");
    }
  });
});
=======
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_san_pham: id, so_luong }),
      });

      const data = await res.json();
      console.log("📦 Server trả về:", data);

      if (data.success) {
        // Cập nhật số lượng giỏ hàng ở header
        document.querySelector(".header__cart-count").textContent = data.totalItems;
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 3000);
        if (typeof renderCart === "function") renderCart();
      } else {
        alert("❌ Lỗi: " + data.error);
      }
    } catch (e) {
      console.error("❌ Không đọc được JSON từ server:", e);
      alert("Kết nối tới máy chủ thất bại");
    }
  });
});
>>>>>>> main_3
