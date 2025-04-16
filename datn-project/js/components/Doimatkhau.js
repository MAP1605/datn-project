
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 5500);
}

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

document.getElementById('passwordChangeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const oldPass = document.getElementById('oldPassword').value.trim();
  const newPass = document.getElementById('newPassword').value.trim();
  const confirmPass = document.getElementById('confirmPassword').value.trim();

  if (!oldPass || !newPass || !confirmPass) {
    showToast('Vui lòng nhập đầy đủ thông tin.', 'error');
    return;
  }

  if (!isValidPassword(newPass)) {
    showToast('Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và dài tối thiểu 8 ký tự.', 'error');
    return;
  }

  if (newPass !== confirmPass) {
    showToast('Mật khẩu mới và nhập lại không khớp.', 'error');
    return;
  }

  showToast('✅ Đổi mật khẩu thành công!');
  // TODO: Gửi request đổi mật khẩu tại đây
});

document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".user-main__sidebar");
  const overlay = document.getElementById("mobileOverlay");

  if (toggleBtn && sidebar && overlay) {
      toggleBtn.addEventListener("click", () => {
          sidebar.classList.toggle("active");

      });

      overlay.addEventListener("click", () => {
          sidebar.classList.remove("active");
          overlay.classList.remove("active");
      });
  }
});