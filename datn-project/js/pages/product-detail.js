// ===== product-detail.js =====

// 1. Load ảnh sản phẩm

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

// 3. Thêm vào giỏ hàng bằng fetch

document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const qtyInput = document.querySelector(".product-detail__qty-input");
  const popup = document.getElementById("popupCart");

  addToCartBtn?.addEventListener("click", async () => {
    const id = addToCartBtn.dataset.id;
    const url = addToCartBtn.dataset.url;
    const so_luong = parseInt(qtyInput.value) || 1;

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