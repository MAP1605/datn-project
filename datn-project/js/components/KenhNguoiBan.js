document.addEventListener("DOMContentLoaded", function () {
  const sections = {
    order: document.getElementById("order-section"),
    product: document.getElementById("product-section"),
    addProduct: document.querySelector(".Container-ka.product-form-ka"),
    doanhthuSection: document.querySelector(".doanhthu-section"),
    paidContainer: document.querySelector(".statistic-paid-container"),
    wallet: document.querySelector(".wallet-container")
  };

  function hideAll() {
    Object.values(sections).forEach(section => {
      if (section) section.classList.add("hidden");
    });
  }

  document.getElementById("link-all-orders").addEventListener("click", function (e) {
    e.preventDefault();
    hideAll();
    sections.order.classList.remove("hidden");
  });

  document.getElementById("link-all-products").addEventListener("click", function (e) {
    e.preventDefault();
    hideAll();
    sections.product.classList.remove("hidden");
  });

  document.getElementById("link-add-product").addEventListener("click", function (e) {
    e.preventDefault();
    hideAll();
    sections.addProduct.classList.remove("hidden");
  });

  // ✅ ĐÂY LÀ PHẦN EM CẦN
  document.getElementById("link-all-vin").addEventListener("click", function (e) {
    e.preventDefault();
    hideAll();
    sections.doanhthuSection.classList.remove("hidden");      // Tổng quan + bảng doanh thu
    sections.paidContainer.classList.remove("hidden");        // Chi tiết đã thanh toán
  });

  document.getElementById("link-add-vin").addEventListener("click", function (e) {
    e.preventDefault();
    hideAll();
    sections.wallet.classList.remove("hidden");
  });
});
const slategrayLinkIds = [
  "link-all-orders",
  "link-all-products",
  "link-add-product",
  "link-all-vin",
  "link-add-vin"
];

function updateSidebarActive(linkId) {
  slategrayLinkIds.forEach(id => {
    const link = document.getElementById(id);
    if (link) {
      link.classList.remove("active-link");
    }
  });

  const clickedLink = document.getElementById(linkId);
  if (clickedLink) {
    clickedLink.classList.add("active-link");
  }
}

// Gắn sự kiện click cho link slategray
slategrayLinkIds.forEach(id => {
  const link = document.getElementById(id);
  if (link) {
    link.addEventListener("click", () => {
      updateSidebarActive(id);
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".order-tabs .tab");
  const rows = document.querySelectorAll("#order-list tr");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Bỏ class active cũ, thêm active mới
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedStatus = tab.getAttribute("data-filter");

      rows.forEach(row => {
        const rowStatus = row.getAttribute("data-status");

        if (selectedStatus === "Tất cả" || rowStatus === selectedStatus) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});

// lọc của phần tất cả sản phẩm 
document.addEventListener("DOMContentLoaded", function () {
  const productTabs = document.querySelectorAll(".product-tabs .tab");
  const productRows = document.querySelectorAll("#product-list tr");

  productTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Bỏ class active cũ, thêm mới
      productTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selected = tab.getAttribute("data-filter");

      productRows.forEach(row => {
        const status = row.getAttribute("data-status");
        if (selected === "Tất cả sản phẩm" || status === selected) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});
//tìm kiếm
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".input-search");
  const productRows = document.querySelectorAll("#product-list tr");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();

    productRows.forEach(row => {
      const name = row.getAttribute("data-name").toLowerCase();
      if (name.includes(keyword)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});
// thêm mới 
document.addEventListener("DOMContentLoaded", function () {
  const btnAddProduct = document.querySelector(".btn-add-product");
  const productSection = document.getElementById("product-section");
  const formAddProduct = document.querySelector(".Container-ka.product-form-ka");

  if (btnAddProduct) {
    btnAddProduct.addEventListener("click", () => {
      productSection.classList.add("hidden");
      formAddProduct.classList.remove("hidden");

      // Cuộn đến form thêm sản phẩm
      window.scrollTo({ top: formAddProduct.offsetTop - 100, behavior: "smooth" });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const productSection = document.getElementById("product-section");
  const formEdit = document.querySelector(".Container-sua");

  const inputName = document.getElementById("edit-name");
  const inputPrice = document.getElementById("edit-price");
  const inputStock = document.getElementById("edit-stock");

  let currentRow = null;

  // Mở form sửa khi ấn nút 🛠
  productList.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit-product")) {
      const row = e.target.closest("tr");
      currentRow = row;

      // Lấy dữ liệu từ dòng
      const name = row.children[1].textContent;
      const stock = row.children[2].textContent;
      const price = row.children[3].textContent;

      // Gán vào form sửa
      inputName.value = name;
      inputStock.value = stock;
      inputPrice.value = price;

      // Ẩn danh sách sản phẩm, hiện form sửa
      productSection.classList.add("hidden");
      formEdit.classList.remove("hidden");

      // Cuộn xuống form
      window.scrollTo({ top: formEdit.offsetTop - 100, behavior: "smooth" });
    }
  });

  // Hủy sửa
  document.querySelector(".Container-sua .Cancel").addEventListener("click", () => {
    formEdit.classList.add("hidden");
    productSection.classList.remove("hidden");
    currentRow = null;
  });

  // Cập nhật lại dữ liệu khi ấn "Cập nhật"
  document.querySelector(".Container-sua .Update").addEventListener("click", () => {
    if (currentRow) {
      currentRow.children[1].textContent = inputName.value;
      currentRow.children[2].textContent = inputStock.value;
      currentRow.children[3].textContent = inputPrice.value;
    }

    formEdit.classList.add("hidden");
    productSection.classList.remove("hidden");
    currentRow = null;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const formEditProduct = document.querySelector(".Container-sua");

  // Xử lý xóa sản phẩm 🗑
  productList.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-delete-product")) {
      const row = e.target.closest("tr");
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        row.remove();
      }
    }

    // Xử lý sửa sản phẩm 🛠
    if (e.target.classList.contains("btn-edit-product")) {
      formEditProduct.classList.remove("hidden");

      // Tùy chọn: em có thể lấy dữ liệu từ dòng và điền vào form sửa
      // const row = e.target.closest("tr");
      // const productName = row.querySelector("td:nth-child(2)").textContent;
      // document.getElementById("edit-name").value = productName; // ví dụ nếu có form sửa
    }
  });
});
document.querySelector(".Container-sua .Cancel").addEventListener("click", () => {
  document.querySelector(".Container-sua").classList.add("hidden");
});
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const formEdit = document.querySelector(".Container-sua");
  const inputName = document.getElementById("edit-name");
  const inputPrice = document.getElementById("edit-price");
  const inputStock = document.getElementById("edit-stock");

  let currentRow = null;

  // Mở form sửa
  productList.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit-product")) {
      const row = e.target.closest("tr");
      currentRow = row;

      const name = row.children[1].textContent;
      const stock = row.children[2].textContent;
      const price = row.children[3].textContent;

      inputName.value = name;
      inputPrice.value = price;
      inputStock.value = stock;

      formEdit.classList.remove("hidden");
      window.scrollTo({ top: formEdit.offsetTop - 100, behavior: "smooth" });
    }
  });

  // Hủy sửa
  document.querySelector(".Container-sua .Cancel").addEventListener("click", () => {
    formEdit.classList.add("hidden");
  });

  // Cập nhật dữ liệu
  document.querySelector(".Container-sua .Update").addEventListener("click", () => {
    if (currentRow) {
      currentRow.children[1].textContent = inputName.value;
      currentRow.children[2].textContent = inputStock.value;
      currentRow.children[3].textContent = inputPrice.value;
    }

    formEdit.classList.add("hidden");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".statistic-header .tab");
  const rows = document.querySelectorAll(".statistic-table tbody tr");

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      // Bỏ active cũ
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selected = tab.textContent.trim(); // "Chưa thanh toán" hoặc "Đã thanh toán"

      rows.forEach(row => {
        const status = row.children[1].textContent.trim(); // lấy nội dung cột trạng thái

        if (
          (selected === "Chưa thanh toán" && status === "Chưa hoàn thành") ||
          (selected === "Đã thanh toán" && status === "Đã hoàn thành")
        ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const rows = document.querySelectorAll(".statistic-table tbody tr");

  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.trim().toLowerCase();

    rows.forEach(row => {
      // Tìm theo toàn bộ nội dung trong cột "Đơn hàng"
      const orderInfo = row.querySelector("td").innerText.toLowerCase();

      if (orderInfo.includes(keyword)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function updateUnpaidTotal() {
    const rows = document.querySelectorAll(".statistic-table tbody tr");
    let total = 0;

    rows.forEach(row => {
      const status = row.children[1].textContent.trim(); // Trạng thái
      const amountText = row.children[3].textContent.trim(); // Số tiền

      if (status === "Chưa hoàn thành") {
        // Xóa ₫, dấu . hoặc ,
        const cleaned = amountText.replace(/[₫,.]/g, '').replace(/\s/g, '');
        const value = parseInt(cleaned, 10);

        if (!isNaN(value)) {
          total += value;
        }
      }
    });

    // Hiển thị lại dưới dạng VNĐ có dấu .
    document.getElementById("total-unpaid-amount").textContent = formatVND(total) + "₫";
  }

  function formatVND(number) {
    return number.toLocaleString("vi-VN");
  }

  // Gọi hàm ngay khi trang load
  updateUnpaidTotal();
});
// đã thanh toán tuần này 
document.addEventListener("DOMContentLoaded", function () {
  function formatVND(number) {
    return number.toLocaleString("vi-VN");
  }

  function updateUnpaidAndPaid() {
    const rows = document.querySelectorAll(".statistic-table tbody tr");

    let totalUnpaid = 0;
    let totalPaidThisWeek = 0;

    rows.forEach(row => {
      const status = row.children[1].textContent.trim(); // Trạng thái
      const amountText = row.children[3].textContent.trim(); // Số tiền

      // Làm sạch tiền
      const cleaned = amountText.replace(/[₫,.]/g, '').replace(/\s/g, '');
      const value = parseInt(cleaned, 10);

      if (!isNaN(value)) {
        if (status === "Chưa hoàn thành") {
          totalUnpaid += value;
        } else if (status === "Đã hoàn thành") {
          totalPaidThisWeek += value;
        }
      }
    });

    // Cập nhật DOM
    const unpaidEl = document.getElementById("total-unpaid-amount");
    const paidEl = document.getElementById("paid-this-week");

    if (unpaidEl) unpaidEl.textContent = formatVND(totalUnpaid) + "₫";
    if (paidEl) paidEl.textContent = formatVND(totalPaidThisWeek) + "₫";
  }

  // Gọi khi trang load
  updateUnpaidAndPaid();
});


//thanh toán tổng 
function parseCurrency(text) {
  return parseInt(text.replace(/[₫.,]/g, '').replace(/\s/g, '')) || 0;
}

function formatCurrency(num) {
  return num.toLocaleString('vi-VN') + "₫";
}

function updateTotalAllAmount() {
  const cells = document.querySelectorAll(".amount-cell");
  let total = 0;

  cells.forEach(cell => {
    total += parseCurrency(cell.textContent);
  });

  const totalElement = document.getElementById("total-all-amount");
  if (totalElement) {
    totalElement.textContent = formatCurrency(total);
  }
}

document.addEventListener("DOMContentLoaded", updateTotalAllAmount);
// hình ảnh của phần thêm sản phẩm 
document.addEventListener("DOMContentLoaded", function () {
  // Ảnh sản phẩm
  const productImageBox = document.getElementById("product-image-box");
  const productImageInput = document.getElementById("product-image-input");
  const productImagePreview = document.getElementById("product-image-preview");

  productImageBox.addEventListener("click", function () {
    productImageInput.click();
  });

  productImageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        productImagePreview.src = e.target.result;
        productImagePreview.style.display = "block";
        productImageBox.querySelector(".img-text").style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

  // Ảnh bìa
  const coverImageBox = document.getElementById("cover-image-box");
  const coverImageInput = document.getElementById("cover-image-input");
  const coverImagePreview = document.getElementById("cover-image-preview");

  coverImageBox.addEventListener("click", function () {
    coverImageInput.click();
  });

  coverImageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        coverImagePreview.src = e.target.result;
        coverImagePreview.style.display = "block";
        coverImageBox.querySelector(".img-text").style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
});
// Khu chi tiết sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const detailSection = document.querySelector(".Container-Chitiet");
  const productSection = document.getElementById("product-section");
  const backBtn = document.querySelector(".btn-back-product");

  // Khi click vào tên sản phẩm
  productList.addEventListener("click", function (e) {
    const clicked = e.target;
    if (clicked.classList.contains("product-name")) {
      const row = clicked.closest("tr");

      const productName = row.getAttribute("data-name") || clicked.textContent;
      const productId = row.getAttribute("data-row-id") || "SP001";

      // Gán dữ liệu
      document.querySelector(".Container-Chitiet input[readonly]").value = productId;
      document.querySelector(".Container-Chitiet textarea").value = "Chi tiết sản phẩm: " + productName;

      // Chuyển view
      productSection.classList.add("hidden");
      detailSection.classList.remove("hidden");
      window.scrollTo({ top: detailSection.offsetTop - 100, behavior: "smooth" });
    }
  });

  // Khi click nút quay lại
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      detailSection.classList.add("hidden");
      productSection.classList.remove("hidden");
      window.scrollTo({ top: productSection.offsetTop - 100, behavior: "smooth" });
    });
  }
});
// chi tiết đơn hàng
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("order-detail-modal");
  const closeBtns = document.querySelectorAll(".close-order-modal");
  const viewDetailBtns = document.querySelectorAll(".btn-view-order-detail");

  viewDetailBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");

      // Lấy dữ liệu từ bảng
      const orderId = row.children[1].textContent;
      const status = row.children[2].textContent;
      const date = row.children[3].textContent;
      const total = row.children[4].textContent;

      // Gán dữ liệu vào modal
      modal.querySelector(".order-id").textContent = orderId;
      modal.querySelector(".order-status").textContent = status;
      modal.querySelector(".order-date").textContent = date;
      modal.querySelector(".order-total").textContent = total;

      // Hiện modal
      modal.style.display = "block";
    });
  });

  // Đóng modal khi ấn vào nút "×" hoặc nút "Đóng"
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  // Đóng khi click ra ngoài
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
