document.addEventListener("DOMContentLoaded", function () {
  // --- CLICK XEM CHI TIẾT SẢN PHẨM ---
  const productDetailModal = document.getElementById("productDetailModal");
  const productDetailOverlay = document.getElementById("productDetailOverlay");
  const closeProductBtns = document.querySelectorAll(".close-product-modal");

  document.querySelectorAll(".btn-detail-product").forEach(item => {
    item.addEventListener("click", () => {
      const row = item.closest("tr");
      if (!row) return;

      const image = row.querySelector("img")?.src || '';
      document.getElementById("modal-product-image").src = image;
      document.getElementById("modal-product-cover").src = image;

      const getData = (attr) => row.dataset[attr] || '';
      const formatCurrency = (v) => isNaN(v) ? "0đ" : Number(v).toLocaleString("vi-VN") + "đ";

      document.getElementById("modal-product-name").textContent = getData('name');
      document.getElementById("modal-product-original").textContent = formatCurrency(getData('original'));
      document.getElementById("modal-product-price").textContent = formatCurrency(getData('price'));
      document.getElementById("modal-product-stock").textContent = getData('stock');
      document.getElementById("modal-product-category").textContent = getData('category');
      document.getElementById("modal-product-description").textContent = getData('description');
      document.getElementById("modal-product-brand").textContent = getData('brand');
      document.getElementById("modal-product-origin").textContent = getData('origin');
      document.getElementById("modal-product-storage").textContent = getData('storage');

      productDetailModal.classList.remove("hidden");
      productDetailOverlay.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  [...closeProductBtns, productDetailOverlay].forEach(el => {
    el.addEventListener("click", () => {
      productDetailModal.classList.add("hidden");
      productDetailOverlay.classList.add("hidden");
      document.body.style.overflow = "";
    });
  });

  // --- SIDEBAR SECTION SWITCHING ---
  const sections = {
    order: document.getElementById("order-section"),
    product: document.getElementById("product-section"),
    addProduct: document.querySelector(".Container-ka.product-form-ka"),
    doanhthuSection: document.querySelector(".doanhthu-section"),
    wallet: document.querySelector(".wallet-container")
  };

  const navLinks = {
    "link-all-orders": "order-section",
    "link-all-products": "product-section",
    "link-add-product": "product-form-ka",
    "link-all-vin": "doanhthu-section",
    "link-add-vin": "wallet-container"
  };

  const slategrayLinkIds = Object.keys(navLinks);

  function hideAllSections() {
    Object.values(sections).forEach(section => {
      if (section) section.classList.add("hidden");
    });
  }

  function showSection(id) {
    hideAllSections();
    const section = document.getElementById(id) || document.querySelector(`.${id}`);
    if (section) section.classList.remove("hidden");
  }

  function updateSidebarActive(activeId) {
    slategrayLinkIds.forEach(id => {
      const link = document.getElementById(id);
      if (link) link.classList.remove("active-link");
    });
    const clicked = document.getElementById(activeId);
    if (clicked) clicked.classList.add("active-link");
  }

  // Gán sự kiện click cho sidebar links
  slategrayLinkIds.forEach(linkId => {
    const button = document.getElementById(linkId);
    if (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        showSection(navLinks[linkId]);
        updateSidebarActive(linkId);
      });
    }
  });

  // Mặc định hiển thị
  showSection("order-section");

  // --- CHECKBOX "CHỌN TẤT CẢ" ---
  const selectAllCheckbox = document.getElementById("select-all-orders");
  const rowCheckboxes = document.querySelectorAll("#order-list input[type='checkbox']");

  if (selectAllCheckbox && rowCheckboxes.length) {
    selectAllCheckbox.addEventListener("change", () => {
      const isChecked = selectAllCheckbox.checked;
      rowCheckboxes.forEach(cb => cb.checked = isChecked);
    });

    rowCheckboxes.forEach(cb => {
      cb.addEventListener("change", () => {
        selectAllCheckbox.checked = [...rowCheckboxes].every(cb => cb.checked);
      });
    });
  }

  // --- TABS LỌC ĐƠN HÀNG ---
  const orderTabs = document.querySelectorAll(".order-tabs .tab");
  const orderRows = document.querySelectorAll("#order-list tr");

  orderTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      orderTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const selected = tab.getAttribute("data-filter");
      orderRows.forEach(row => {
        const status = row.getAttribute("data-status");
        row.style.display = selected === "Tất cả" || selected === status ? "" : "none";
      });
    });
  });

  // --- TABS LỌC SẢN PHẨM ---
  const productTabs = document.querySelectorAll(".product-tabs .tab");
  const productRows = document.querySelectorAll("#product-list tr");

  productTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      productTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const selected = tab.getAttribute("data-filter");
      productRows.forEach(row => {
        const status = row.getAttribute("data-status");
        row.style.display = selected === "Tất cả sản phẩm" || selected === status ? "" : "none";
      });
    });
  });

  // --- TÌM KIẾM SẢN PHẨM ---
  const searchInput = document.querySelector(".input-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase().trim();
      productRows.forEach(row => {
        const name = row.getAttribute("data-name").toLowerCase();
        row.style.display = name.includes(keyword) ? "" : "none";
      });
    });
  }

  // --- THÊM SẢN PHẨM MỚI ---
  const btnAddProduct = document.querySelector(".btn-add-product");
  const formAddProduct = document.querySelector(".Container-ka.product-form-ka");
  const productSection = document.getElementById("product-section");

  if (btnAddProduct && formAddProduct && productSection) {
    btnAddProduct.addEventListener("click", () => {
      productSection.classList.add("hidden");
      formAddProduct.classList.remove("hidden");
      window.scrollTo({ top: formAddProduct.offsetTop - 100, behavior: "smooth" });
    });
  }

  // --- NÚT HỦY THÊM ---
  const btnCancelAdd = document.querySelector(".Container-ka .Cancel");
  if (btnCancelAdd) {
    btnCancelAdd.addEventListener("click", () => {
      showSection("product-section");
    });
  }

  // --- NÚT QUAY LẠI CHI TIẾT SP ---
  const btnQuayLaiChiTiet = document.querySelector(".Container-Chitiet .Submit");
  if (btnQuayLaiChiTiet) {
    btnQuayLaiChiTiet.addEventListener("click", () => {
      showSection("product-section");
    });
  }

  // --- NÚT ĐÓNG MODAL SỬA SP ---
  const btnCloseEdit = document.getElementById("closeEditProduct");
  if (btnCloseEdit) {
    btnCloseEdit.addEventListener("click", () => {
      showSection("product-section");
    });
  }
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

  });
});
document.querySelector(".Container-sua .Cancel").addEventListener("click", () => {
  document.querySelector(".Container-sua").classList.add("hidden");
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



document.addEventListener("DOMContentLoaded", function () {
  const detailButtons = document.querySelectorAll('.btn-view-order-detail');
  const modal = document.getElementById('orderDetailModal');
  const closeModal = document.getElementById('closeOrderModal');
  const modalSubmit = modal.querySelector('.modal__submit');

  // Mở modal khi bấm nút Chi tiết
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  });

  // Đóng modal khi bấm dấu × hoặc nút Đóng
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modalSubmit.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Đóng modal khi click ngoài modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const detailButtons = document.querySelectorAll('.btn-view-order-detail');
  const modal = document.querySelector('#orderDetailModal');
  const overlay = document.querySelector('.modal-overlay');
  const closeBtns = modal.querySelectorAll('.modal__button, .modal__close');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('show');
      overlay.classList.remove('hidden');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('show');
      overlay.classList.add('hidden');
    });
  });

  // Click ngoài để đóng modal
  overlay.addEventListener('click', () => {
    modal.classList.remove('show');
    overlay.classList.add('hidden');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('orderDetailModal');
  const overlay = document.getElementById('orderDetailOverlay');
  const openBtns = document.querySelectorAll('.btn-view-order-detail');
  const closeBtns = document.querySelectorAll('.close-order-modal, .btn-close-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Gán nội dung modal nếu cần (ví dụ từ data-order)
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // khoá cuộn nền
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
      document.body.style.overflow = ''; // mở lại cuộn nền
    });
  });

  overlay.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  });
});


// đơn hàng
document.addEventListener("DOMContentLoaded", function () {
  const selectAll = document.getElementById("select-all-orders");
  const checkboxes = document.querySelectorAll("#order-list .order-checkbox");

  if (selectAll) {
    selectAll.addEventListener("change", function () {
      checkboxes.forEach(cb => {
        cb.checked = this.checked;
      });
    });
  }
});


// phần menu 
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // (Tuỳ chọn) Đóng sidebar khi chọn 1 mục
  document.querySelectorAll('.seller-sidebar__link').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });
});


// phần tích tất cả phần checkbox  của tất cả đơn hàng
document.addEventListener("DOMContentLoaded", function () {
  const selectAllCheckbox = document.getElementById("select-all-orders");
  const orderCheckboxes = document.querySelectorAll('#order-list input[type="checkbox"]');

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      orderCheckboxes.forEach(cb => {
        cb.checked = selectAllCheckbox.checked;
      });
    });
  }
});

// phần tích tất cả phần của checkbox của tất cả đơn hàng 
document.addEventListener("DOMContentLoaded", function () {
  const selectAllProducts = document.getElementById("select-all-products");
  const productCheckboxes = document.querySelectorAll('#product-list input[type="checkbox"]');

  if (selectAllProducts) {
    selectAllProducts.addEventListener("change", function () {
      productCheckboxes.forEach(cb => {
        cb.checked = selectAllProducts.checked;
      });
    });
  }
});



// khu vực phần hiển thị show phần của chi tiết đơn hàng 
document.addEventListener('DOMContentLoaded', function () {
  const productDetailModal = document.getElementById('productDetailModal');
  const productDetailOverlay = document.getElementById('productDetailOverlay');
  const closeProductBtns = document.querySelectorAll('.close-product-modal');

  const productItems = document.querySelectorAll('.btn-detail-product');

  productItems.forEach(item => {
    item.addEventListener('click', () => {
      const row = item.closest('tr');

      document.getElementById('modal-product-image').src = row.querySelector('img').src;
      document.getElementById('modal-product-cover').src = row.querySelector('img').src;
      document.getElementById('modal-product-name').textContent = row.querySelector('.cell-name')?.textContent || '';
      document.getElementById('modal-product-original').textContent = row.dataset.original || '';
      document.getElementById('modal-product-price').textContent = row.querySelector('.cell-price')?.textContent || '';
      document.getElementById('modal-product-stock').textContent = row.querySelector('.cell-stock')?.textContent || '';
      document.getElementById('modal-product-category').textContent = 'Điện thoại'; // tuỳ chỉnh theo data
      document.getElementById('modal-product-description').textContent = 'Sản phẩm chất lượng cao';
      document.getElementById('modal-product-brand').textContent = row.querySelector('.cell-brand')?.textContent || '';
      document.getElementById('modal-product-origin').textContent = 'Việt Nam';
      document.getElementById('modal-product-storage').textContent = 'Kho tổng';

      productDetailModal.classList.remove('hidden');
      productDetailOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  closeProductBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      productDetailModal.classList.add('hidden');
      productDetailOverlay.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  productDetailOverlay.addEventListener('click', () => {
    productDetailModal.classList.add('hidden');
    productDetailOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  });
});

// Khi ấn 🛠 (dạng MODAL) sẽ mở modal sửa sản phẩm
document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.querySelector(".Container-sua");
  let currentEditingRow = null; // dòng đang sửa

  const editBtns = document.querySelectorAll(".btn-edit-product");
  editBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      currentEditingRow = row;

      // Đổ dữ liệu từ dòng vào form
      document.getElementById("edit-name").value = row.dataset.name || '';
      document.getElementById("edit-original-price").value = row.dataset.original || '';
      document.getElementById("edit-price").value = row.dataset.price || '';
      document.getElementById("edit-stock").value = row.dataset.stock || '';
      document.getElementById("edit-category").value = row.dataset.category || '';
      document.getElementById("edit-description").value = row.dataset.description || '';
      document.getElementById("edit-brand").value = row.dataset.brand || '';
      document.getElementById("edit-origin").value = row.dataset.origin || '';
      document.getElementById("edit-storage").value = row.dataset.storage || '';

      // Hiện form
      formContainer.classList.remove("hidden");
      formContainer.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Hủy
  document.querySelector(".Cancel").addEventListener("click", () => {
    formContainer.classList.add("hidden");
  });

  // Nút Cập nhật
document.querySelector(".Update").addEventListener("click", () => {
  if (!currentEditingRow) return;

  // 1. Lấy giá trị từ form
  const name = document.getElementById("edit-name").value;
  const original = document.getElementById("edit-original-price").value;
  const price = document.getElementById("edit-price").value;
  const stock = document.getElementById("edit-stock").value;
  const category = document.getElementById("edit-category").value;
  const description = document.getElementById("edit-description").value;
  const brand = document.getElementById("edit-brand").value;
  const origin = document.getElementById("edit-origin").value;
  const storage = document.getElementById("edit-storage").value;

  // 2. Cập nhật thuộc tính data-* trong <tr>
  currentEditingRow.dataset.name = name;
  currentEditingRow.dataset.original = original;
  currentEditingRow.dataset.price = price;
  currentEditingRow.dataset.stock = stock;
  currentEditingRow.dataset.category = category;
  currentEditingRow.dataset.description = description;
  currentEditingRow.dataset.brand = brand;
  currentEditingRow.dataset.origin = origin;
  currentEditingRow.dataset.storage = storage;

  // 3. Cập nhật luôn phần hiển thị trong bảng HTML (dựa vào class từng <td>)
  currentEditingRow.querySelector(".cell-name").innerText = name;
  currentEditingRow.querySelector(".cell-stock").innerText = stock;
  currentEditingRow.querySelector(".cell-price").innerText = parseInt(price).toLocaleString() + "đ";
  currentEditingRow.querySelector(".cell-brand").innerText = brand;

  // ✅ Nếu có thêm các cột khác thì cập nhật thêm tương tự ở đây

  // 4. Ẩn form sửa lại
  document.querySelector(".Container-sua").classList.add("hidden");
  currentEditingRow = null;
});
});
const formContainer = document.getElementById("editProductModal");
const closeModalBtn = document.getElementById("closeEditProduct");
const cancelBtn = document.querySelector(".Cancel");

editBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    currentEditingRow = row;

    // Đổ dữ liệu
    document.getElementById("edit-name").value = row.dataset.name || '';
    document.getElementById("edit-original-price").value = row.dataset.original || '';
    document.getElementById("edit-price").value = row.dataset.price || '';
    document.getElementById("edit-stock").value = row.dataset.stock || '';
    document.getElementById("edit-category").value = row.dataset.category || '';
    document.getElementById("edit-description").value = row.dataset.description || '';
    document.getElementById("edit-brand").value = row.dataset.brand || '';
    document.getElementById("edit-origin").value = row.dataset.origin || '';
    document.getElementById("edit-storage").value = row.dataset.storage || '';

    // Mở modal
    formContainer.classList.add("show");
  });
});

// Đóng modal
closeModalBtn.addEventListener("click", () => formContainer.classList.remove("show"));
cancelBtn.addEventListener("click", () => formContainer.classList.remove("show"));


// hình ảnh của phần thêm sản phẩm 

formContainer.classList.remove("hidden"); // → hiện ra giữa màn
formContainer.classList.add("hidden"); // → ẩn

document.addEventListener("DOMContentLoaded", () => {
  const productModal = document.getElementById("productDetailModal");
  const overlay = document.getElementById("productDetailOverlay");
  const closeBtns = document.querySelectorAll(".close-product-modal");
  
  // Bắt tất cả thành phần có class btn-detail-product
  document.querySelectorAll(".product-detail-trigger").forEach(item => {
    item.addEventListener("click", () => {
      const row = item.closest("tr");
      if (!row) return;
  
      const getData = (attr) => row.dataset[attr] || '';
      const formatCurrency = (v) => isNaN(v) ? "0đ" : Number(v).toLocaleString("vi-VN") + "đ";
  
      document.getElementById("modal-product-name").textContent = getData('name');
      document.getElementById("modal-product-original").textContent = formatCurrency(getData('original'));
      document.getElementById("modal-product-price").textContent = formatCurrency(getData('price'));
      document.getElementById("modal-product-stock").textContent = getData('stock');
      document.getElementById("modal-product-category").textContent = getData('category');
      document.getElementById("modal-product-description").textContent = getData('description');
      document.getElementById("modal-product-brand").textContent = getData('brand');
      document.getElementById("modal-product-origin").textContent = getData('origin');
      document.getElementById("modal-product-storage").textContent = getData('storage');
  
      document.getElementById("modal-product-image").src = row.querySelector("img")?.src || '';
      document.getElementById("modal-product-cover").src = row.querySelector("img")?.src || '';
  
      document.getElementById("productDetailModal").classList.remove("hidden");
      document.getElementById("productDetailOverlay").classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });
  

  // Đóng modal
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      productModal.classList.add("hidden");
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    });
  });

  overlay.addEventListener("click", () => {
    productModal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  });
});
