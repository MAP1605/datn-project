const tabButtons = document.querySelectorAll('.user-orders__tab-btn');
const orderItems = document.querySelectorAll('.user-orders__item');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('user-orders__tab-btn--active'));
    button.classList.add('user-orders__tab-btn--active');

    const status = button.getAttribute('data-tab');
    orderItems.forEach(item => {
      const itemStatus = item.getAttribute('data-status');
      item.style.display = (status === 'all' || status === itemStatus) ? 'block' : 'none';
    });
  });
});
document.querySelectorAll('.openModalBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('reviewModal').style.display = 'block';
  });
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('reviewModal').style.display = 'none';
  resetModal();
});

window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('reviewModal')) {
    document.getElementById('reviewModal').style.display = 'none';
    resetModal();
  }
});

const starContainer = document.getElementById('starContainer');
let currentRating = 0;

starContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('star')) {
    currentRating = e.target.getAttribute('data-value');
    updateStarColors(currentRating);
  }
});

starContainer.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('star')) {
    updateStarColors(e.target.getAttribute('data-value'));
  }
});

starContainer.addEventListener('mouseout', () => {
  updateStarColors(currentRating);
});

function updateStarColors(rating) {
  const stars = starContainer.querySelectorAll('.star');
  stars.forEach(star => {
    const value = star.getAttribute('data-value');
    star.classList.toggle('selected', value <= rating);
  });
}

const addImageBtn = document.getElementById('addImageBtn');
const imageInput = document.getElementById('imageInput');
const imagesPreview = document.getElementById('imagesPreview');

const MAX_IMAGES = 3;

addImageBtn.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', () => {
  const files = imageInput.files;

  // Đếm số ảnh đang hiển thị
  const currentImagesCount = imagesPreview.querySelectorAll('img').length;

  if (currentImagesCount >= MAX_IMAGES) {
    showNotification('Chỉ thêm được có 3 ảnh thôi', 'error');
    imageInput.value = ''; // Clear input để tránh lưu ảnh sai
    return;
  }

  // Tính số ảnh còn có thể thêm
  const remainingSlots = MAX_IMAGES - currentImagesCount;

  // Chỉ lấy số ảnh cho phép
  Array.from(files).slice(0, remainingSlots).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('modal__preview-img');
      imagesPreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  // Nếu chọn quá nhiều ảnh, cảnh báo người dùng
  if (files.length > remainingSlots) {
    alert(`Chỉ được thêm tối đa ${remainingSlots} ảnh nữa.`);
  }

  // Reset lại input để lần sau chọn cùng ảnh vẫn kích hoạt được onchange
  imageInput.value = '';
});

document.getElementById('completeBtn').addEventListener('click', () => {

  document.getElementById('reviewModal').style.display = 'none';
  showNotification('Đánh giá thành công', 'success');
  resetModal();
});


function resetModal() {
  currentRating = 0;
  updateStarColors(0);
  imagesPreview.innerHTML = '';
  imageInput.value = '';
  document.querySelector('.review-textarea').value = '';
}

document.addEventListener('DOMContentLoaded', function () {
  // Sự kiện mở modal (event delegation)
  const orderList = document.querySelector('.user-orders__list');
  if (orderList) {
    orderList.addEventListener('click', function (e) {
      if (e.target.classList.contains('openModalBtn')) {
        document.getElementById('reviewModal').style.display = 'block';
      }
    });
  }

  // Phần xử lý nút "Đã nhận được hàng"
  const checkShipBtns = document.querySelectorAll(".check-ship");
  checkShipBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const orderItem = btn.closest(".user-orders__item");
      orderItem.setAttribute("data-status", "hoanthanh");

      const statusText = orderItem.querySelector(".user-orders__shop-right h4");
      if (statusText) {
        statusText.textContent = "Hoàn thành";
      }

      const actionContainer = orderItem.querySelector(".user-orders__actions");
      actionContainer.innerHTML = `
        <button class="openModalBtn">Đánh giá</button>
        <button>Yêu cầu trả hàng/Hoàn tiền</button>
      `;
      const tabButtons = document.querySelectorAll('.user-orders__tab-btn');
const orderItems = document.querySelectorAll('.user-orders__item');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('user-orders__tab-btn--active'));
    button.classList.add('user-orders__tab-btn--active');

    const status = button.getAttribute('data-tab');
    orderItems.forEach(item => {
      const itemStatus = item.getAttribute('data-status');
      item.style.display = (status === 'all' || status === itemStatus) ? 'block' : 'none';
    });
  });
});
document.querySelectorAll('.openModalBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('reviewModal').style.display = 'block';
  });
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('reviewModal').style.display = 'none';
  resetModal();
});

window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('reviewModal')) {
    document.getElementById('reviewModal').style.display = 'none';
    resetModal();
  }
});

const starContainer = document.getElementById('starContainer');
let currentRating = 0;

starContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('star')) {
    currentRating = e.target.getAttribute('data-value');
    updateStarColors(currentRating);
  }
});

starContainer.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('star')) {
    updateStarColors(e.target.getAttribute('data-value'));
  }
});

starContainer.addEventListener('mouseout', () => {
  updateStarColors(currentRating);
});

function updateStarColors(rating) {
  const stars = starContainer.querySelectorAll('.star');
  stars.forEach(star => {
    const value = star.getAttribute('data-value');
    star.classList.toggle('selected', value <= rating);
  });
}

const addImageBtn = document.getElementById('addImageBtn');
const imageInput = document.getElementById('imageInput');
const imagesPreview = document.getElementById('imagesPreview');


document.getElementById('completeBtn').addEventListener('click', () => {

  document.getElementById('reviewModal').style.display = 'none';
  showNotification('Đánh giá thành công', 'success');
  resetModal();
});


function resetModal() {
  currentRating = 0;
  updateStarColors(0);
  imagesPreview.innerHTML = '';
  imageInput.value = '';
  document.querySelector('.review-textarea').value = '';
}
    });
  });
});

function showNotification(message, type) {
  const noti = document.createElement('div');
  noti.className = `custom-notification ${type}`;
  noti.textContent = message;
  document.body.appendChild(noti);

  setTimeout(() => {
    noti.remove();
  }, 3000);
}
