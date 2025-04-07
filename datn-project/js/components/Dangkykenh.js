document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".seller-register__form");
    const shopName = document.getElementById("shop-name");
    const shopAddress = document.getElementById("shop-address");
    const email = document.getElementById("shop-email");
    const cccd = document.getElementById("shop-cccd");
    const phone = document.getElementById("shop-phone");
    
    // Hàm kiểm tra email hợp lệ
    function isValidEmail(value) {
      return value.includes("@") && value.endsWith(".com");
    }
  
    // Hàm kiểm tra số điện thoại hợp lệ
    function isValidPhone(value) {
      return /^[0-9]{10}$/.test(value);
    }
    // Hàm kiểm tra CCCD hợp lệ (12 chữ số)
    function isValidCCCD(value) {
        return /^[0-9]{12}$/.test(value);
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nameValue = shopName.value.trim();
      const addressValue = shopAddress.value.trim();
      const emailValue = email.value.trim();
      const cccdValue = cccd.value.trim();
      const phoneValue = phone.value.trim();
  
      if (!nameValue || !addressValue || !emailValue || !cccdValue || !phoneValue) {
        alert("Vui lòng nhập đầy đủ tất cả các ô không được bỏ trống.");
        return;
      }
  
      if (!isValidEmail(emailValue)) {
        alert("Email phải chứa @ và kết thúc bằng .com.");
        return;
      }

      if (!isValidCCCD(cccdValue)) {
        alert("CCCD phải là số và gồm đúng 12 chữ số.");
        return;
      }
  
      if (!isValidPhone(phoneValue)) {
        alert("Số điện thoại phải gồm đúng 10 chữ số.");
        return;
      }

        // ✅ Lưu dữ liệu nếu muốn
      const data = {
            name: nameValue,
            address: addressValue,
            email: emailValue,
            cccd: cccdValue,
            phone: phoneValue,
      };
      localStorage.setItem("sellerRegisterData", JSON.stringify(data));

      window.location.href = "../pages/KenhNguoiBan.html";
    });
  });
  