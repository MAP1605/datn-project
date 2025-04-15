document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.querySelector(".register-step__button--submit");
  const usernameInput = document.querySelector(".register-step__input--username");
  const emailInput = document.querySelector(".register-step__input--email");
  const passwordInput = document.querySelector(".register-step__input--password");
  const repasswordInput = document.querySelector(".register-step__input--repassword");

  function isEmail(input) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  }

  if (registerBtn && usernameInput && emailInput && passwordInput && repasswordInput) {
    registerBtn.addEventListener("click", function (e) {
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const repassword = repasswordInput.value.trim();

      if (!username || !email || !password || !repassword) {
        e.preventDefault();
        showNotification("Vui lòng điền đầy đủ thông tin!", "error");
        return;
      }

      if (!isEmail(email)) {
        e.preventDefault();
        showNotification("Email không hợp lệ. Phải có @ và kết thúc bằng .com", "error");
        return;
      }

      if (password !== repassword) {
        e.preventDefault();
        showNotification("Mật khẩu xác nhận không khớp!", "error");
        return;
      }
      document.addEventListener("DOMContentLoaded", function () {
        const loginBtn = document.querySelector(".login__button");
      
        if (loginBtn) {
          loginBtn.addEventListener("click", function (e) {
            e.preventDefault();
      
         
      
            // 1. Ẩn các nút đăng nhập/đăng ký
            const authLinks = document.querySelectorAll(".headerAuth");
            authLinks.forEach(link => link.style.display = "none");
      
            // 2. Hiện avatar
            const userSection = document.querySelector(".header__user");
            if (userSection) userSection.style.display = "inline-flex";
      
      
          });
        }
      });
      // ✅ Nếu vượt qua tất cả kiểm tra → cho submit form
      // Không cần preventDefault
    });
  }
});

// ✅ Toast thông báo giống các trang khác
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
    

