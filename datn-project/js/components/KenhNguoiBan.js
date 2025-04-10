document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các liên kết trong sidebar
  const sidebarLinks = document.querySelectorAll(".seller-sidebar__link");

  // Lấy tất cả các phần nội dung có thể hiển thị
  const sections = document.querySelectorAll(
    "main .container-content > section, .product-form, .product-edit"
  );

  // Lấy modal chi tiết đơn hàng
  const orderDetailModal = document.getElementById("order-detail-modal");

  // Hàm ẩn tất cả các phần nội dung
  function hideAllSections() {
    sections.forEach((section) => section.classList.add("hidden"));
  }

  // Hàm ẩn modal chi tiết đơn hàng
  function hideOrderDetailModal() {
    if (orderDetailModal) {
      orderDetailModal.classList.add("hidden");
    }
  }

  // Gắn sự kiện click cho từng liên kết trong sidebar
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Ẩn tất cả các phần nội dung
      hideAllSections();

      // Lấy ID của phần cần hiển thị từ thuộc tính data-section
      const targetId = this.getAttribute("data-section");
      const targetSection =
        document.getElementById(targetId) || document.querySelector(`.${targetId}`);

      // Hiển thị phần tương ứng nếu tồn tại
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      // Ẩn modal chi tiết đơn hàng nếu không phải là phần "Tất cả đơn hàng"
      if (targetId !== "order-section") {
        hideOrderDetailModal();
      }
    });
  });

  // Gắn sự kiện click cho nút "Chi tiết" trong bảng đơn hàng
  document.querySelectorAll(".btn-view-order-detail").forEach((button) => {
    button.addEventListener("click", function () {
      // Kiểm tra nếu phần "Tất cả đơn hàng" đang hiển thị
      const orderSection = document.getElementById("order-section");
      if (orderSection && !orderSection.classList.contains("hidden")) {
        // Hiển thị modal chi tiết đơn hàng
        orderDetailModal.classList.remove("hidden");
      }
    });
  });

  // Gắn sự kiện click cho nút đóng modal chi tiết đơn hàng
  document.querySelectorAll(".close-order-modal").forEach((button) => {
    button.addEventListener("click", function () {
      hideOrderDetailModal();
    });
  });
});
// Modal chi tiết đơn hàng
// Lấy các phần tử
const orderModal = document.getElementById("orderDetailModal");
const closeOrderBtn = document.getElementById("closeOrderModal");
const closeOrderBottomBtn = document.getElementById("modalOrderCloseBtn");
const openButtons = document.querySelectorAll(".btn-view-order-detail");

const productName = document.querySelector(".modal__product-name");
const productImage = document.querySelector(".modal__image");
const reviewTextarea = document.querySelector(".review-textarea");
const imageInput = document.getElementById("imageInput");
const addImageBtn = document.getElementById("addImageBtn");
const imagesPreview = document.getElementById("imagesPreview");
const stars = document.querySelectorAll(".modal__stars .star");

// 1. Mở modal khi click nút 'Chi tiết'
openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    const rawData = row.getAttribute("data-order");

    try {
      const data = JSON.parse(rawData);

      productName.textContent = data.products?.[0]?.name || "Tên sản phẩm";
      productImage.src = data.products?.[0]?.image || "../assets/images/default-product.png";
      reviewTextarea.value = data.note || "";

      // Reset preview hình ảnh cũ
      imagesPreview.innerHTML = "";
      imageInput.value = "";
      unhighlightStars();

      orderModal.style.display = "block";
    } catch (err) {
      console.error("Không thể hiển thị chi tiết đơn hàng:", err);
    }
  });
});

// 2. Đóng modal
closeOrderBtn.addEventListener("click", () => (orderModal.style.display = "none"));
closeOrderBottomBtn.addEventListener("click", () => (orderModal.style.display = "none"));

window.addEventListener("click", (e) => {
  if (e.target === orderModal) orderModal.style.display = "none";
});

// 3. Thêm ảnh
addImageBtn.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", () => {
  imagesPreview.innerHTML = ""; // clear preview
  const files = Array.from(imageInput.files);
  if (files.length > 5) {
    alert("Chỉ được chọn tối đa 5 ảnh.");
    return;
  }

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("modal__preview-img");
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.objectFit = "cover";
      img.style.marginRight = "8px";
      imagesPreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// 4. Chọn sao đánh giá
function unhighlightStars() {
  stars.forEach((star) => star.classList.remove("active"));
}

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = +star.dataset.value;
    unhighlightStars();
    stars.forEach((s) => {
      if (+s.dataset.value <= value) s.classList.add("active");
    });
  });
});


// Phần chuyển màu của phần thanh mục lục để hiển thị rõ phần mình chuyển mục lục
document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".seller-sidebar__link");
  const sections = document.querySelectorAll("main .container-content > section, .product-form, .product-edit");

  // Hiển thị mặc định là “Tất cả đơn hàng”
  const defaultSection = document.getElementById("order-section");
  if (defaultSection) defaultSection.classList.remove("hidden");

  // Active mặc định
  sidebarLinks.forEach((link) => {
    if (link.dataset.section === "order-section") {
      link.classList.add("active-sidebar");
    } else {
      link.classList.remove("active-sidebar");
    }
  });

  // Gắn click từng link
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Ẩn toàn bộ section
      sections.forEach((s) => s.classList.add("hidden"));

      // Xoá active ở mọi link
      sidebarLinks.forEach((l) => l.classList.remove("active-sidebar"));

      // Thêm active vào link hiện tại
      link.classList.add("active-sidebar");

      // Hiển thị section tương ứng
      const sectionId = link.getAttribute("data-section");
      const section = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
      if (section) section.classList.remove("hidden");
    });
  });
});
