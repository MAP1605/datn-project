document.addEventListener('DOMContentLoaded', function () {
  const chooseBtn = document.getElementById('chooseBtn');
  const imageInput = document.getElementById('imageInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const saveBtn = document.getElementById('saveProfileBtn');

  let selectedAvatarBase64 = '';

  chooseBtn.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
        selectedAvatarBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  saveBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const username = document.querySelector('.profile__input[type="text"]').value;
    const name = document.querySelectorAll('.profile__input[type="text"]')[1].value;
    const email = document.querySelector('.profile__input[type="email"]').value;
    const phone = document.querySelector('.profile__input[type="tel"]').value;

    // Validate email and phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+84|0)\d{9,10}$/;

    if (!emailRegex.test(email)) {
      alert('Email không đúng định dạng!');
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert('Số điện thoại không đúng định dạng!');
      return;
    }

    const profileData = {
      username,
      name,
      email,
      phone,
      avatar: selectedAvatarBase64
    };

    localStorage.setItem('userProfile', JSON.stringify(profileData));
    alert('Thông tin hồ sơ đã được lưu thành công!');
  });

  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

  if (savedProfile) {
    document.querySelector('.profile__input[type="text"]').value = savedProfile.username;
    document.querySelectorAll('.profile__input[type="text"]')[1].value = savedProfile.name;
    document.querySelector('.profile__input[type="email"]').value = savedProfile.email;
    document.querySelector('.profile__input[type="tel"]').value = savedProfile.phone;

    if (savedProfile.avatar) {
      avatarPreview.src = savedProfile.avatar;
    }
  }
});