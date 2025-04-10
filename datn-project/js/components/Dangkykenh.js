document.addEventListener("DOMContentLoaded", function () {
  const shopName = document.getElementById("shop-name");
  const shopAddress = document.getElementById("shop-address");
  const email = document.getElementById("shop-email");
  const cccd = document.getElementById("shop-cccd");
  const phone = document.getElementById("shop-phone");
  const saveBtn = document.querySelector(".seller-register__button--save");
  const nextBtn = document.querySelector(".seller-register__button--next");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cccdRegex = /^\d{12}$/;

  function showNotification(message, type = "error") {
    const noti = document.createElement("div");
    noti.className = `custom-notification ${type}`;
    noti.textContent = message;

    Object.assign(noti.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "14px 28px",
      backgroundColor: type === "success" ? "#28a745" : "#dc3545",
      color: "#fff",
      fontSize: "15px",
      borderRadius: "8px",
      zIndex: 9999,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      animation: "fadeInOut 3s ease forwards",
      pointerEvents: "none",
      whiteSpace: "nowrap"
    });

    document.body.appendChild(noti);
    setTimeout(() => noti.remove(), 3000);
  }

  function clearBorders() {
    [shopName, shopAddress, email, cccd, phone].forEach((input) => {
      input.classList.remove("input-error");
    });
  }

  function validateForm() {
    clearBorders();

    const nameValue = shopName.value.trim();
    const addressValue = shopAddress.value.trim();
    const emailValue = email.value.trim();
    const cccdValue = cccd.value.trim();
    const phoneValue = phone.value.trim();

    if (!nameValue) {
      shopName.classList.add("input-error");
      showNotification("Vui lòng nhập tên Shop!", "error");
      return false;
    }

    if (!addressValue) {
      shopAddress.classList.add("input-error");
      showNotification("Vui lòng nhập địa chỉ lấy hàng!", "error");
      return false;
    }

    if (!emailValue || !emailRegex.test(emailValue)) {
      email.classList.add("input-error");
      showNotification("Email không đúng định dạng!", "error");
      return false;
    }

    if (!cccdValue || !cccdRegex.test(cccdValue)) {
      cccd.classList.add("input-error");
      showNotification("CCCD phải là số và gồm đúng 12 chữ số!", "error");
      return false;
    }

    if (phoneValue !== "0123456789") {
      phone.classList.add("input-error");
      showNotification("Số điện thoại phải là chính xác 0123456789!", "error");
      return false;
    }

    return {
      name: nameValue,
      address: addressValue,
      email: emailValue,
      cccd: cccdValue,
      phone: phoneValue
    };
  }

  saveBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const validData = validateForm();
    if (!validData) return;

    localStorage.setItem("sellerRegisterData", JSON.stringify(validData));
    showNotification("Lưu thông tin thành công!", "success");
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const validData = validateForm();
    if (!validData) return;

    localStorage.setItem("sellerRegisterData", JSON.stringify(validData));
    showNotification("Thông tin hợp lệ. Đang chuyển...", "success");

    setTimeout(() => {
      window.location.href = "../pages/KenhNguoiBan.html";
    }, 1500);
  });

  // Load dữ liệu cũ nếu có
  const saved = JSON.parse(localStorage.getItem("sellerRegisterData"));
  if (saved) {
    shopName.value = saved.name || "";
    shopAddress.value = saved.address || "";
    email.value = saved.email || "";
    cccd.value = saved.cccd || "";
    phone.value = saved.phone || "";
  }
});
