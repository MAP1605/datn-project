
//  load ảnh sản phẩm
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".detail__media-main");
  const thumbnails = document.querySelectorAll(".detail__media-thumbs img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newSrc = thumb.src;
      mainImage.src = newSrc;

      // Hiệu ứng active thumbnail
      thumbnails.forEach(img => img.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
});


//  Tăng giảm số lượng sản phẩm

// document.addEventListener("DOMContentLoaded", () => {
//   const qtyInput = document.querySelector(".product-detail__qty-input");
//   const minusBtn = document.querySelector('button[data-type="minus"]');
//   const plusBtn = document.querySelector('button[data-type="plus"]');
//   const maxQty = parseInt(qtyInput.dataset.max) || 999;

//   // Nút trừ
//   minusBtn.addEventListener("click", () => {
//     let value = parseInt(qtyInput.value) || 1;
//     if (value > 1) {
//       qtyInput.value = value - 1;
//     }
//   });

//   // Nút cộng
//   plusBtn.addEventListener("click", () => {
//     let value = parseInt(qtyInput.value) || 1;
//     if (value < maxQty) {
//       qtyInput.value = value + 1;
//     }
//   });

//   // Khi rời ô input hoặc nhấn Enter thì kiểm tra lại
//   qtyInput.addEventListener("blur", validateInput);
//   qtyInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       validateInput();
//       qtyInput.blur();
//     }
//   });

//   function validateInput() {
//     let value = parseInt(qtyInput.value);
//     if (isNaN(value) || value < 1) {
//       qtyInput.value = 1;
//     } else if (value > maxQty) {
//       qtyInput.value = maxQty;
//     }
//   }
// });


//  phóng to ảnh riview 
document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupImage = document.getElementById("popupImage");
  const popupPrev = document.getElementById("popupPrevBtn");
  const popupNext = document.getElementById("popupNextBtn");

  let gallery = [];
  let current = 0;

  // Gán click cho tất cả ảnh trong review__images
  document.querySelectorAll(".review__images").forEach(container => {
    const images = Array.from(container.querySelectorAll("img"));
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        gallery = images;
        current = index;
        openPopup(gallery[current].src);
      });
    });
  });

  function openPopup(src) {
    popupImage.src = src;
    popupOverlay.style.display = "flex";
  }

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) popupOverlay.style.display = "none";
  });

  // Điều hướng vòng lặp
  popupPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    current = (current - 1 + gallery.length) % gallery.length;
    popupImage.src = gallery[current].src;
  });

  popupNext.addEventListener("click", (e) => {
    e.stopPropagation();
    current = (current + 1) % gallery.length;
    popupImage.src = gallery[current].src;
  });
});


// === JavaScript cho phân trang + bộ lọc đánh giá hoạt động + đếm số lượng từng loại + tính điểm trung bình ===
document.addEventListener("DOMContentLoaded", () => {
  const reviewList = document.getElementById("review__list");
  const paginationContainer = document.getElementById("review__pagination");
  const filterButtons = document.querySelectorAll(".review__filter-btn");
  const reviewScoreElement = document.querySelector(".review__score");
  const starElement = document.querySelector(".review__star");

  const reviews = Array.from(document.querySelectorAll(".review__item"));
  const reviewsPerPage = 6;
  let currentPage = 1;
  let currentFilter = "all";

  function getFilteredReviews() {
    return reviews.filter((item) => {
      const rating = item.getAttribute("data-rating");
      const hasComment = item.getAttribute("data-has-comment") === "true";
      const hasImage = item.getAttribute("data-has-image") === "true";

      if (currentFilter === "all") return true;
      if (currentFilter === "comment") return hasComment;
      if (currentFilter === "image") return hasImage;
      return rating === currentFilter;
    });
  }

  function renderReviews() {
    const filtered = getFilteredReviews();
    const start = (currentPage - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;

    reviews.forEach((item) => (item.style.display = "none"));
    filtered.slice(start, end).forEach((item) => (item.style.display = "block"));

    renderPagination(filtered.length);
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / reviewsPerPage);
    let html = "";

    const createBtn = (page, text = page, active = false, disabled = false) => {
      return `<button class="page-btn${active ? " active" : ""}" data-page="${page}" ${disabled ? "disabled" : ""
        }>${text}</button>`;
    };

    html += createBtn(currentPage - 1, '<i class="fa-solid fa-angle-left"></i>', false, currentPage === 1);

    let range = [];
    if (totalPages <= 5) {
      range = [...Array(totalPages).keys()].map((i) => i + 1);
    } else {
      if (currentPage <= 3) {
        range = [1, 2, 3, 4, 5];
      } else if (currentPage >= totalPages - 2) {
        range = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        range = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
      }
    }

    if (range[0] > 1) {
      html += createBtn(1);
      if (range[0] > 2) html += '<span class="page-dot">...</span>';
    }

    range.forEach((p) => {
      html += createBtn(p, p, currentPage === p);
    });

    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) html += '<span class="page-dot">...</span>';
      html += createBtn(totalPages);
    }

    html += createBtn(currentPage + 1, '<i class="fa-solid fa-angle-right"></i>', false, currentPage === totalPages);

    paginationContainer.innerHTML = html;

    document.querySelectorAll(".page-btn").forEach((btn) => {
      const page = parseInt(btn.getAttribute("data-page"));
      if (!isNaN(page)) {
        btn.addEventListener("click", () => {
          currentPage = page;
          renderReviews();
        });
      }
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      currentPage = 1;
      renderReviews();
    });
  });

  function updateFilterCountsAndScore() {
    const counts = {
      all: reviews.length,
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      comment: 0,
      image: 0,
    };
    let totalScore = 0;

    reviews.forEach((item) => {
      const rating = parseInt(item.getAttribute("data-rating"));
      const hasComment = item.getAttribute("data-has-comment") === "true";
      const hasImage = item.getAttribute("data-has-image") === "true";

      if (counts[rating] !== undefined) counts[rating]++;
      if (hasComment) counts.comment++;
      if (hasImage) counts.image++;

      totalScore += rating;
    });

    // Cập nhật điểm trung bình
    const average = (totalScore / reviews.length).toFixed(1);
    if (reviewScoreElement) reviewScoreElement.textContent = `${average} trên 5`;

    // ✅ THÊM PHẦN NÀY: cập nhật lên phần meta ở trên
    const ratingTop = document.getElementById("productRating");
    const reviewTop = document.getElementById("productTotalReview");

    if (ratingTop) ratingTop.innerHTML = `<i class="fa-solid fa-star"></i> ${average}`;
    if (reviewTop) reviewTop.textContent = `${formatCount(reviews.length)} đánh giá`;

    // Format dạng 3.8k
    function formatCount(n) {
      return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : n;
    }

    // Cập nhật phần sao động
    if (starElement) {
      const fullStars = Math.floor(average);
      const halfStar = average - fullStars >= 0.5;
      const starsHTML =
        "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(5 - fullStars - (halfStar ? 1 : 0));
      starElement.textContent = starsHTML;
    }

    // Cập nhật số lượng theo từng loại filter
    filterButtons.forEach((btn) => {
      const key = btn.getAttribute("data-filter");
      if (counts[key] !== undefined) {
        btn.innerHTML = btn.textContent.trim().split(" (")[0] + ` (${counts[key]})`;
      }
    });
  }

  updateFilterCountsAndScore();
  renderReviews();
});

// Thêm sự kiện song song sự kiện cho nút 
document.addEventListener("DOMContentLoaded", () => {
  const qtyInput = document.querySelector(".product-detail__qty-input");
  const minusBtn = document.querySelector('button[data-type="minus"]');
  const plusBtn = document.querySelector('button[data-type="plus"]');
  const formQtyInput = document.getElementById("formQuantity");
  const maxQty = parseInt(qtyInput.dataset.max) || 999;

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

  qtyInput.addEventListener("blur", syncQuantity);
  qtyInput.addEventListener("input", syncQuantity);
  qtyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      qtyInput.blur();
      syncQuantity();
    }
  });
});

// JavaScript dùng fetch() để khi bấm thêm số lượng vào giỏ hàng thì sẽ update lên database luôn
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const qtyInput = document.querySelector(".product-detail__qty-input");

  addToCartBtn?.addEventListener("click", async () => {
    const id = addToCartBtn.dataset.id;
    const url = addToCartBtn.dataset.url;
    const so_luong = parseInt(qtyInput.value) || 1;
    const ton_kho = parseInt(qtyInput.dataset.max) || 0;

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
