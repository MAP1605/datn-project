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

      const selected = tab.textContent.trim();

      rows.forEach(row => {
        const status = row.children[1].textContent.trim(); // cột trạng thái

        // ✅ Lọc theo từng tab
        if (
          selected === "Tất cả" ||
          (selected === "Chưa thanh toán" && status === "Chưa thanh toán") ||
          (selected === "Đã thanh toán" && status === "Hoàn thành")
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

      if (status === "Chưa thanh toán") {
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
        if (status === "Chưa thanh toán") {
          totalUnpaid += value;
        } else if (status === "Hoàn thành") {
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
  const modal = document.getElementById("order-detail-modal");
  const container = modal.querySelector(".order-detail-products");
  const template = container.querySelector(".order-product-row.template");
  const confirmBtn = modal.querySelector(".btn-xac-nhan");

  // Đóng modal khi ấn nút X hoặc click ra ngoài
  document.querySelectorAll(".close-order-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Xem chi tiết đơn hàng
  document.querySelectorAll(".btn-view-order-detail").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (!id) return;

      fetch(`/datn-project/datn-project/pages/api/chitiet_donhang.php?id=${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Không thể fetch chi tiết đơn hàng");
          return res.json();
        })
        .then((data) => {
          if (!data || data.length === 0) {
            alert("Không có dữ liệu chi tiết đơn hàng.");
            return;
          }

          const first = data[0];
          modal.dataset.id = first.ID_Hoa_Don;

          // Thông tin đơn hàng
          modal.querySelector(".order-id").textContent = String(first.ID_Hoa_Don);
          modal.querySelector(".order-recipient").textContent = first.Ten_Nguoi_Nhan || "---";
          modal.querySelector(".order-address").textContent = first.Dia_Chi || "---";
          modal.querySelector(".order-status").textContent = first.Trang_Thai_Don_Hang || "---";
          modal.querySelector(".order-date").textContent = new Date(first.Thoi_Gian_Dat_Hang).toLocaleString('vi-VN');
          modal.querySelector(".order-total").textContent = Number(first.So_Tien_Nhan_Duoc || 0).toLocaleString('vi-VN') + "₫";

          // Reset sản phẩm cũ
          container.querySelectorAll(".order-product-row:not(.template)").forEach(e => e.remove());

          // Render sản phẩm mới
          data.forEach(sp => {
            const clone = template.cloneNode(true);
            clone.classList.remove("template");
            clone.style.display = "flex";

            const imgSrc = `data:image/jpeg;base64,${sp.Anh_San_Pham1}`;
            clone.querySelector(".order-product-img img").src = imgSrc;
            clone.querySelector(".order-product-name span").textContent = sp.Ten_San_Pham || "---";
            clone.querySelector(".order-product-qty span").textContent = sp.So_Luong || "--";
            clone.querySelector(".order-product-price span").textContent = Number(sp.Gia_Ban || 0).toLocaleString('vi-VN') + "₫";

            container.appendChild(clone);
          });

          // Ẩn nút xác nhận nếu trạng thái đã hoàn thành
          if (first.Trang_Thai_Don_Hang === "Hoàn thành") {
            confirmBtn.disabled = true;
            confirmBtn.classList.add("disabled");
          } else {
            confirmBtn.disabled = false;
            confirmBtn.classList.remove("disabled");
          }

          modal.style.display = "block";
        })
        .catch((err) => {
          console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
          alert("Không thể lấy chi tiết đơn hàng.");
        });
    });
  });

  // Xử lý xác nhận trạng thái
  confirmBtn.addEventListener("click", () => {
    const orderId = modal.dataset.id;
    if (!orderId) {
      alert("Không có ID đơn hàng!");
      return;
    }

    fetch("/datn-project/datn-project/pages/api/capnhat_trangthaidonmua.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `id=${orderId}&trangthai=Chờ giao hàng`
    })
      .then(res => res.text())
      .then(res => {
        if (res.trim() === "success") {
          alert("✔️ Đã cập nhật trạng thái thành 'Chờ giao hàng'");
          modal.style.display = "none";
          location.reload();
        } else {
          alert("❌ Lỗi khi cập nhật trạng thái đơn hàng.");
        }
      })
      .catch(err => {
        console.error("💥 Lỗi fetch:", err);
      });
  });
});

// thêm sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    const name = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.querySelector('input[name="Gia_Ban"]').value.trim());
    const originalPrice = parseFloat(document.querySelector('input[name="Gia_Goc"]').value.trim());
    const stock = document.querySelector('input[name="So_Luong_Ton"]').value.trim();
    const brand = document.getElementById("product-brand")?.value.trim();
    const origin = document.getElementById("product-origin")?.value.trim();
    const category = document.getElementById("product-category").value;

    function isPositiveNumber(val) {
      return /^\d+(\.\d{1,2})?$/.test(val);
    }

    function isLettersOnly(val) {
      return /^[\p{L}\s]+$/u.test(val);
    }

    console.log("🧾 DỮ LIỆU FORM:");
    console.log("Tên SP:", name);
    console.log("Giá gốc:", originalPrice);
    console.log("Giá bán:", price);
    console.log("Tồn kho:", stock);
    console.log("Thương hiệu:", brand);
    console.log("Xuất xứ:", origin);
    console.log("Danh mục:", category);

    if (!name || !price || !originalPrice || !stock || !brand || !origin || !category) {
      alert("❌ Vui lòng điền đầy đủ thông tin!");
      e.preventDefault();
      return;
    }

    if (!isPositiveNumber(price) || !isPositiveNumber(originalPrice)) {
      alert("❌ Giá phải là số dương hợp lệ!");
      e.preventDefault();
      return;
    }

    if (originalPrice <= price) {
      alert("❌ Giá gốc phải lớn hơn giá bán!");
      e.preventDefault();
      return;
    }

    if (!isPositiveNumber(stock)) {
      alert("❌ Số lượng không hợp lệ!");
      e.preventDefault();
      return;
    }

    if (!isLettersOnly(brand) || !isLettersOnly(origin)) {
      alert("❌ Thương hiệu và xuất xứ chỉ được dùng chữ!");
      e.preventDefault();
      return;
    }

    console.log("✅ Dữ liệu hợp lệ, submit form...");
    // ✅ Submit xong → chuyển trang
    header("Location: /datn-project/datn-project/pages/KenhNguoiBan.php");
    exit;
  });
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

document.addEventListener("DOMContentLoaded", function () {
  // --- PREVIEW ảnh sản phẩm và ảnh bìa ---
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

  const coverImageBox = document.getElementById("cover-image-box");
  const coverImageInput = document.getElementById("cover-image-input");
  const coverImagePreview = document.getElementById("cover-image-preview");

  coverImageBox?.addEventListener("click", () => coverImageInput.click());

  coverImageInput?.addEventListener("change", function () {
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

  // --- MODAL chi tiết sản phẩm ---
  const modal = document.getElementById("product-detail-modal");
  const overlay = document.querySelector(".modal-overlay");
  const closeButtons = document.querySelectorAll(".product-detail-modal__close, .product-detail-modal__button--close");

  document.querySelectorAll(".btn-chi-tiet-san-pham").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      if (!row || !modal) return;

      const name = row.querySelector("td:nth-child(3)")?.textContent.trim() || "---";
      const stock = row.querySelector("td:nth-child(4)")?.textContent.trim() || "---";
      const originalPrice = row.querySelector("td:nth-child(5)")?.textContent.trim() || "---";
      const price = row.querySelector("td:nth-child(6)")?.textContent.trim() || "---";
      const sold = row.querySelector("td:nth-child(7)")?.textContent.trim() || "---";
      const status = row.querySelector("td:nth-child(8)")?.textContent.trim() || "---";

      const id = row.dataset.id || "SP001";
      const brand = "No brand";
      const origin = "Việt Nam";
      const warrantyTime = "12 tháng";
      const warrantyType = "Chính hãng";
      const description = "Sản phẩm đang cập nhật mô tả...";
      const img1 = "../assets/images/CuongDao__Logo-PEARNK.png";
      const img2 = "../assets/images/CuongDao__Logo-PEARNK.png";
      const img3 = "../assets/images/CuongDao__Logo-PEARNK.png";

      modal.querySelector(".product-detail-modal__id").textContent = id;
      modal.querySelector(".product-detail-modal__name").textContent = name;
      modal.querySelector(".product-detail-modal__original-price").textContent = originalPrice;
      modal.querySelector(".product-detail-modal__stock").textContent = stock;
      modal.querySelector(".product-detail-modal__price").textContent = price;
      modal.querySelector(".product-detail-modal__brand").textContent = brand;
      modal.querySelector(".product-detail-modal__origin").textContent = origin;
      modal.querySelector(".product-detail-modal__status").textContent = status;
      modal.querySelector(".product-detail-modal__warranty-time").textContent = warrantyTime;
      modal.querySelector(".product-detail-modal__warranty-type").textContent = warrantyType;
      modal.querySelector(".product-detail-modal__description-text").textContent = description;
      modal.querySelector(".product-detail-modal__image1").src = img1;
      modal.querySelector(".product-detail-modal__image2").src = img2;
      modal.querySelector(".product-detail-modal__image3").src = img3;

      modal.style.display = "block";
      overlay?.classList.remove("hidden");
    });
  });

  // --- ĐÓNG modal ---
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
      overlay?.classList.add("hidden");
    });
  });

  window.addEventListener("click", function (e) {
    if (e.target === overlay) {
      modal.style.display = "none";
      overlay?.classList.add("hidden");
    }
  });
});
