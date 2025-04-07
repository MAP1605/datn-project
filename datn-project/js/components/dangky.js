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

  // Kiểm tra số điện thoại hợp lệ
  function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
  }

  // Kiểm tra tên đăng nhập
  function isValidUsername(username) {
    return /^[a-zA-Z0-9]{4,}$/.test(username);
  }

  // Kiểm tra email hợp lệ
  function isValidEmail(email) {
    return email.includes("@") && email.endsWith(".com");
  }

  // Bước 1: xử lý TIẾP THEO
  if (nextBtn && phoneInput && step1 && step2) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const phone = phoneInput.value.trim();
      if (phone === "") {
        alert("Vui lòng nhập số điện thoại.");
        return;
      }

      if (!isValidPhone(phone)) {
        alert("Số điện thoại phải là số và gồm đúng 10 chữ số.");
        return;
      }

      // Lưu số điện thoại nếu cần
      localStorage.setItem("registerPhone", phone);

      // Chuyển sang bước 2
      step1.style.display = "none";
      step2.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  } else {
    console.warn("Không tìm thấy phần tử bước 1");
  }

  // Bước 2: xử lý ĐĂNG KÝ
  if (registerBtn && usernameInput && emailInput && passwordInput && repasswordInput) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const repassword = repasswordInput.value.trim();

      if (!username || !email || !password || !repassword) {
        alert("Vui lòng điền đầy đủ tất cả các ô.");
        return;
      }

      if (!isValidUsername(username)) {
        alert("Tên đăng nhập phải có ít nhất 4 ký tự và chỉ chứa chữ hoặc số.");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Email không hợp lệ. Phải chứa '@' và kết thúc bằng '.com'.");
        return;
      }

      if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
      }

      if (password !== repassword) {
        alert("Mật khẩu nhập lại không khớp.");
        return;
      }

      // Lưu localStorage nếu cần
      localStorage.setItem("registerAccount", JSON.stringify({
        username,
        email
      }));

      alert("Đăng ký thành công!");
      window.location.href = "../pages/dangnhap.html";
    });
  } else {
    console.warn("Không tìm thấy phần tử bước 2");
  }
});
