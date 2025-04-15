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
  const tabs = document.querySelectorAll(".tab");
  const productRows = document.querySelectorAll(".product-row");

  // Nếu không có tab nào hoặc không có sản phẩm, thoát
  if (!tabs.length || !productRows.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const selectedFilter = tab.getAttribute("data-filter");

      // Thêm 'active' cho tab đang chọn
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Lọc sản phẩm theo trạng thái
      productRows.forEach(row => {
        const status = row.getAttribute("data-status")?.trim();

        if (selectedFilter === "Tất cả sản phẩm") {
          row.style.display = "";
        } else {
          row.style.display = (status === selectedFilter) ? "" : "none";
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
// khu chi tiết sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("product-detail-modal");
  const overlay = document.querySelector(".modal-overlay");

  const openButtons = document.querySelectorAll(".btn-chi-tiet-san-pham");
  const closeButtons = document.querySelectorAll(
    ".product-detail-modal__close, .product-detail-modal__button--close"
  );

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");

      // Lấy dữ liệu từ hàng sản phẩm
      const name = row.querySelector("td:nth-child(3)").textContent;
      const stock = row.querySelector("td:nth-child(4)").textContent;
      const price = row.querySelector("td:nth-child(5)").textContent;
      const brand = "No brand";
      const origin = "Việt Nam";
      const id = "SP001";

      // Gán vào modal
      modal.querySelector(".product-detail-modal__id").textContent = id;
      modal.querySelector(".product-detail-modal__name").textContent = name;
      modal.querySelector(".product-detail-modal__stock").textContent = stock;
      modal.querySelector(".product-detail-modal__price").textContent = price;
      modal.querySelector(".product-detail-modal__brand").textContent = brand;
      modal.querySelector(".product-detail-modal__origin").textContent = origin;

      // Mở modal
      modal.style.display = "block";
      overlay.classList.remove("hidden");
    });
  });

  // Đóng modal khi bấm nút close hoặc ×
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.classList.add("hidden");
    });
  });

  // Đóng modal khi click ra ngoài
  window.addEventListener("click", function (e) {
    if (e.target === overlay) {
      modal.style.display = "none";
      overlay.classList.add("hidden");
    }
  });
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

document.addEventListener("DOMContentLoaded", () => {
  const btnChiTietSanPham = document.querySelectorAll(".btn-chi-tiet-san-pham"); // nút mở modal
  const modal = document.querySelector(".modal-product-detail");
  const overlay = document.querySelector(".modal-overlay");
  const btnClose = document.querySelector(".btn-back-product");

  btnChiTietSanPham.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
  });

  overlay.addEventListener("click", closeModal);
  btnClose.addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

// thêm sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.querySelector(".product-form-ka .Submit");
  const productList = document.getElementById("product-list");

  // Hàm kiểm tra xem chuỗi có phải số dương không
  function isPositiveNumber(value) {
    return /^\d+(\.\d{1,2})?$/.test(value);
  }

  // Hàm kiểm tra xem chuỗi có phải chỉ chứa chữ cái
  function isLettersOnly(value) {
    return /^[\p{L}\s]+$/u.test(value); // hỗ trợ tiếng Việt và dấu cách
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const name = document.getElementById("product-name").value.trim();
      const price = document.getElementById("product-price").value.trim();
      const stock = document.getElementById("product-stock").value.trim();
      const brand = document.getElementById("product-brand").value.trim();
      const origin = document.getElementById("product-origin").value.trim();
      const category = document.getElementById("product-category").value;
      const imageSrc = "../assets/images/logo/CuongDao__Logo-PEARNK.png";

      // Kiểm tra dữ liệu hợp lệ
      if (!name || !price || !stock || !brand || !origin || !category) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
        return;
      }

      if (!isPositiveNumber(price)) {
        alert("Giá phải là số hợp lệ!");
        return;
      }

      if (!isPositiveNumber(stock)) {
        alert("Số lượng phải là số hợp lệ!");
        return;
      }

      if (!isLettersOnly(brand)) {
        alert("Thương hiệu chỉ được chứa chữ cái!");
        return;
      }

      if (!isLettersOnly(origin)) {
        alert("Xuất xứ chỉ được chứa chữ cái!");
        return;
      }

      // Thêm sản phẩm mới vào bảng
      const newRow = document.createElement("tr");
      newRow.className = "product-row";
      newRow.setAttribute("data-status", "Đang bán");
      newRow.innerHTML = `
        <td><input type="checkbox"></td>
        <td class="btn-chi-tiet-san-pham"><img src="${imageSrc}" class="product-list_img" alt="Hình ảnh" width="80px"></td>
        <td class="btn-chi-tiet-san-pham">${name}</td>
        <td class="btn-chi-tiet-san-pham">${stock}</td>
        <td class="btn-chi-tiet-san-pham">${price}</td>
        <td class="btn-chi-tiet-san-pham">0</td>
        <td class="btn-chi-tiet-san-pham"><span class="status-active">Đang bán</span></td>
        <td>
          <span class="icon btn-delete-product">🗑</span>
          <span class="icon btn-edit-product">🛠</span>
        </td>
      `;
      productList.appendChild(newRow);
      alert("✅ Đã thêm sản phẩm thành công!");

      // Reset form (trừ input file)
      document.querySelectorAll(".product-form-ka input, .product-form-ka textarea, .product-form-ka select").forEach(input => {
        if (input.type !== "file") input.value = "";
      });

      // Ẩn form thêm - hiện lại bảng sản phẩm
      document.querySelector(".product-form-ka").classList.add("hidden");
      document.getElementById("product-section").classList.remove("hidden");
    });
  }
});

// Preview multiple product images
document.querySelectorAll(".product-image-box").forEach((box) => {
  const input = box.querySelector(".product-image-input");
  const preview = box.querySelector(".product-image-preview");
  const span = box.querySelector(".img-text");

  box.addEventListener("click", () => input.click());

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        span.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
});

function safeAddEventListener(id, callback) {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", callback);
}

safeAddEventListener("link-all-orders", () => {
  // xử lý
});

safeAddEventListener("link-add-product", () => {
  // xử lý
});


// thanh 3 gạch của phần quản lý 
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".seller-sidebar");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("show");
  });
});



// Thêm các mục khác tương tự


// sửa phần sản phẩm


// phần check box của phần tât cả đơn hàng
document.addEventListener("DOMContentLoaded", () => {
  const selectAll = document.getElementById("select-all-orders");
  const checkboxes = document.querySelectorAll(".order-checkbox");

  if (selectAll) {
    selectAll.addEventListener("change", function () {
      checkboxes.forEach(cb => {
        cb.checked = this.checked;
      });
    });

    // Nếu bỏ tích 1 ô con thì bỏ tích ô tổng
    checkboxes.forEach(cb => {
      cb.addEventListener("change", function () {
        if (!this.checked) {
          selectAll.checked = false;
        } else if ([...checkboxes].every(cb => cb.checked)) {
          selectAll.checked = true;
        }
      });
    });
  }
});


// phần check box của phần tât cả sản phẩm 
document.addEventListener("DOMContentLoaded", () => {
  const selectAllProductCheckbox = document.getElementById("select-all-products");
  const productCheckboxes = document.querySelectorAll(".product-checkbox");

  if (selectAllProductCheckbox) {
    selectAllProductCheckbox.addEventListener("change", function () {
      productCheckboxes.forEach(cb => {
        cb.checked = this.checked;
      });
    });

    productCheckboxes.forEach(cb => {
      cb.addEventListener("change", function () {
        if (!this.checked) {
          selectAllProductCheckbox.checked = false;
        } else if ([...productCheckboxes].every(cb => cb.checked)) {
          selectAllProductCheckbox.checked = true;
        }
      });
    });
  }
});


// phần vi của doanh thu
document.addEventListener("DOMContentLoaded", function () {
  function formatCurrency(number) {
    return number.toLocaleString("vi-VN") + "đ";
  }

  function calculateWalletBalance() {
    const rows = document.querySelectorAll(".wallet-table tbody tr");
    let total = 0;

    rows.forEach(row => {
      const status = row.cells[4].textContent.trim();
      const amountText = row.cells[3].textContent.trim().replace(/[₫,.]/g, "");
      const amount = parseInt(amountText, 10);

      if (status === "Hoàn thành" && !isNaN(amount)) {
        total += amount;
      }
    });

    const balanceEl = document.getElementById("wallet-balance");
    if (balanceEl) {
      balanceEl.textContent = formatCurrency(total);
    }
  }

  calculateWalletBalance();
});


// thêm chức năng của phần tìm kiếm tất cả sản phẩm 

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("product-search");
  const rows = document.querySelectorAll("#product-list tr");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase().trim();

      rows.forEach(row => {
        const nameCell = row.querySelector("td:nth-child(3)");
        const name = nameCell ? nameCell.textContent.toLowerCase() : "";

        if (name.includes(keyword)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
});


// vi
document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.querySelector(".btn-withdraw");
  const modal = document.getElementById("withdraw-modal");
  const closeModalBtn = modal.querySelector(".close-modal");
  const cancelBtn = modal.querySelector(".btn-cancel");
  const confirmBtn = modal.querySelector(".btn-confirm");
  const inputAmount = document.getElementById("withdraw-amount");
  const walletBalance = document.getElementById("wallet-balance");

  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    confirmBtn.addEventListener("click", () => {
      const currentBalance = parseInt(walletBalance.textContent.replace(/[₫,.]/g, ""));
      const amount = parseInt(inputAmount.value);

      if (isNaN(amount) || amount <= 0) {
        alert("Vui lòng nhập số tiền hợp lệ.");
        return;
      }

      if (amount > currentBalance) {
        alert("Số dư không đủ để rút!");
        return;
      }

      const newBalance = currentBalance - amount;
      walletBalance.textContent = newBalance.toLocaleString("vi-VN") + "đ";
      alert(`✅ Rút thành công ${amount.toLocaleString("vi-VN")}đ`);

      inputAmount.value = "";
      modal.style.display = "none";
    });
  }
});

// phần menu 
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");

sidebarToggle?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
});

overlay?.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
});
