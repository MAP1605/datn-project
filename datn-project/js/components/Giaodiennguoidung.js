document.addEventListener('DOMContentLoaded', function () {
  const chooseBtn = document.getElementById('chooseBtn');
  const imageInput = document.getElementById('imageInput');
  const avatarPreview = document.getElementById('avatarPreview');

  chooseBtn.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result; // preview ảnh ngay
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
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const birth = document.querySelector('.profile__input[type="date"]').value;

    // Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+84|0)\d{9,10}$/;

    if (!emailRegex.test(email)) {
      showNotification('Email không đúng định dạng!', 'error');
      return;
    }

    if (!phoneRegex.test(phone)) {
      showNotification('Số điện thoại không đúng định dạng!', 'error');
      return;
    }

    const profileData = {
      username,
      name,
      email,
      phone,
      gender,
      birth,
      avatar: selectedAvatarBase64
    };

    localStorage.setItem('userProfile', JSON.stringify(profileData));
    showNotification('Lưu hồ sơ thành công!', 'success');
  });

  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

  if (savedProfile) {
    document.querySelector('.profile__input[type="text"]').value = savedProfile.username;
    document.querySelectorAll('.profile__input[type="text"]')[1].value = savedProfile.name;
    document.querySelector('.profile__input[type="email"]').value = savedProfile.email;
    document.querySelector('.profile__input[type="tel"]').value = savedProfile.phone;

    if (savedProfile.gender) {
      const genderInput = document.querySelector(`input[name="gender"][value="${savedProfile.gender}"]`);
      if (genderInput) genderInput.checked = true;
    }

    if (savedProfile.birth) {
      document.querySelector('.profile__input[type="date"]').value = savedProfile.birth;
    }

    if (savedProfile.avatar) {
      avatarPreview.src = savedProfile.avatar;
      const sidebarAvatar = document.querySelector('.user-main__avatar');
      if (sidebarAvatar) sidebarAvatar.src = savedProfile.avatar;
    }
  }
  
}

);


function showNotification(message, type) {
  const noti = document.createElement('div');
  noti.className = `custom-notification ${type}`;
  noti.textContent = message;
  document.body.appendChild(noti);

  setTimeout(() => {
    noti.remove();
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
const toggleBtn = document.getElementById('mobileMenuToggle');
const sidebar = document.querySelector('.user-main__nav');
const overlay = document.getElementById('mobileMenuOverlay');

if (toggleBtn && sidebar && overlay) {
toggleBtn.addEventListener('click', () => {
sidebar.classList.add('active');

});

overlay.addEventListener('click', () => {
sidebar.classList.remove('active');
overlay.classList.remove('active');
});
}
});