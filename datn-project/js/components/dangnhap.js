document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login__button--submit");
  const emailInput = document.querySelector(".login__input--email");
  const passwordInput = document.querySelector(".login__input--password");

  function isEmail(input) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  }

  function isPhone(input) {
    return /^0\d{9}$/.test(input);
  }

  if (loginBtn && emailInput && passwordInput) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const username = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!username || !password) {
        showNotification("Vui lòng điền đầy đủ Email/SĐT và Mật khẩu.", "error");
        return;
      }

      const isNumberOnly = /^\d+$/.test(username);

      if (isNumberOnly) {
        if (!isPhone(username)) {
          showNotification("Số điện thoại phải bắt đầu bằng 0 và gồm đúng 10 chữ số!", "error");
          return;
        }
      } else {
        if (!isEmail(username)) {
          showNotification("Email không hợp lệ. Phải có @ và kết thúc bằng .com", "error");
          return;
        }
      }

      // ✅ Nếu qua tất cả kiểm tra
      showNotification("Đăng nhập thành công!", "success");
      setTimeout(() => {
        window.location.href = "../index.html"; // chuyển trang sau 1.5s
      }, 1500);
    });
  }
});

// ✅ Thông báo dạng toast giống các trang khác
function showNotification(message, type) {
  const noti = document.createElement("div");
  noti.className = `custom-notification ${type}`;
  noti.textContent = message;

  Object.assign(noti.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "14px 28px",
    color: "#fff",
    fontSize: "15px",
    borderRadius: "8px",
    zIndex: 9999,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    animation: "fadeInOut 3s ease forwards",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    backgroundColor: type === "success" ? "#28a745" : "#dc3545",
  });

  document.body.appendChild(noti);

  setTimeout(() => {
    noti.remove();
  }, 3000);
}
