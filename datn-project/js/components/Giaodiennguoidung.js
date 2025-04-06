

document.addEventListener('DOMContentLoaded', function () {
  const chooseBtn = document.getElementById('chooseBtn');
  const imageInput = document.getElementById('imageInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const saveBtn = document.getElementById('saveProfileBtn');
  let selectedAvatarBase64 = '';

  // 1. Khi chọn ảnh => preview + lưu tạm base64
  chooseBtn.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
        selectedAvatarBase64 = e.target.result; // lưu base64
      };
      reader.readAsDataURL(file);
    }
  });

  // 2. Khi ấn "Lưu" => lưu base64 vào localStorage
  saveBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Không reload trang
    if (selectedAvatarBase64) {
      localStorage.setItem('userAvatar', selectedAvatarBase64);
      alert('Đã lưu ảnh đại diện!');
    } else {
      alert('Bạn chưa chọn ảnh mới.');
    }
  });

  // 3. Khi load lại trang => lấy ảnh đã lưu
  const savedAvatar = localStorage.getItem('userAvatar');
  if (savedAvatar) {
    avatarPreview.src = savedAvatar;
  }
});
