document.addEventListener("DOMContentLoaded", function () {
  // DOM phần tử bước 1 và bước 2
  const nextBtn = document.querySelector(".auth__button--next");
  const phoneInput = document.querySelector(".auth__input--phone");
  const step1 = document.querySelector(".auth-step1");
  const step2 = document.querySelector(".auth-step2");

  const registerBtn = document.querySelector(".register-step__button--submit");
  const usernameInput = document.querySelector(".register-step__input--username");
  const emailInput = document.querySelector(".register-step__input--email");
  const passwordInput = document.querySelector(".register-step__input--password");
  const repasswordInput = document.querySelector(".register-step__input--repassword");

  // Regex kiểm tra
  function isValidPhone(phone) {
    return /^0\d{9}$/.test(phone); // Bắt đầu bằng 0 và đủ 10 số
  }

  function isValidUsername(username) {
    return /^[a-zA-Z0-9]{4,}$/.test(username); // ít nhất 4 ký tự chữ hoặc số
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // dạng chuẩn email
  }

  // ✅ Bước 1: xử lý TIẾP THEO
  if (nextBtn && phoneInput && step1 && step2) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const phone = phoneInput.value.trim();
      if (phone === "") {
        showNotification("Vui lòng nhập số điện thoại.", "error");
        return;
      }

      if (!isValidPhone(phone)) {
        showNotification("Số điện thoại phải bắt đầu bằng 0 và gồm đúng 10 chữ số.", "error");
        return;
      }

      // Lưu nếu cần
      localStorage.setItem("registerPhone", phone);

      // Chuyển bước
      step1.style.display = "none";
      step2.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ✅ Bước 2: xử lý ĐĂNG KÝ
  if (registerBtn && usernameInput && emailInput && passwordInput && repasswordInput) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const repassword = repasswordInput.value.trim();

      if (!username || !email || !password || !repassword) {
        showNotification("Vui lòng điền đầy đủ tất cả các ô.", "error");
        return;
      }

      if (!isValidUsername(username)) {
        showNotification("Tên đăng nhập phải có ít nhất 4 ký tự và chỉ chứa chữ hoặc số.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Email không hợp lệ. Phải có @", "error");
        return;
      }

      if (password.length < 6) {
        showNotification("Mật khẩu phải có ít nhất 6 ký tự.", "error");
        return;
      }

      if (password !== repassword) {
        showNotification("Mật khẩu nhập lại không khớp.", "error");
        return;
      }

      // ✅ Lưu localStorage nếu cần
      localStorage.setItem("registerAccount", JSON.stringify({
        username,
        email
      }));

      showNotification("Đăng ký thành công!", "success");
      setTimeout(() => {
        window.location.href = "../pages/dangnhap.html";
      }, 1500);
    });
  }
});

// ✅ Toast thông báo giống mọi form
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
