document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".login__button--submit");
    const emailInput = document.querySelector(".login__input--email");
    const passwordInput = document.querySelector(".login__input--password");
  
    function isValidEmail(email) {
      return email.includes("@") && email.endsWith(".com");
    }
  
    if (loginBtn && emailInput && passwordInput) {
      loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
  
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
  
        if (!email || !password) {
          alert("Vui lòng điền đầy đủ Email và Mật khẩu.");
          return;
        }
  
        if (!isValidEmail(email)) {
          alert("Email không hợp lệ. Phải có ký tự @ và kết thúc bằng .com");
          return;
        }
  
        // ✅ Đăng nhập thành công → chuyển sang trang chủ
        window.location.href = "../index.html"; // Đổi nếu tên file trang chủ khác
      });
    }
  });
  