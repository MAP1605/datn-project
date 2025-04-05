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

// Modal đánh giá
const reviewModal = document.getElementById('reviewModal');
const closeModal = document.getElementById('closeModal');
const addImageBtn = document.getElementById('addImageBtn');
const imageInput = document.getElementById('imageInput');
const imagesPreview = document.getElementById('imagesPreview');
const completeBtn = document.getElementById('completeBtn');

// Mở modal với tất cả nút "Đánh giá"
document.querySelectorAll('#openModalBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    reviewModal.style.display = 'block';
  });
});

closeModal.addEventListener('click', () => {
  reviewModal.style.display = 'none';
  resetModal();
});

window.addEventListener('click', (e) => {
  if (e.target === reviewModal) {
    reviewModal.style.display = 'none';
    resetModal();
  }
});

// Star rating
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
    const hoverValue = e.target.getAttribute('data-value');
    updateStarColors(hoverValue);
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

// Ảnh upload preview
addImageBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  imagesPreview.innerHTML = '';
  const files = imageInput.files;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      imagesPreview.appendChild(img);
    }
    reader.readAsDataURL(files[i]);
  }
});

completeBtn.addEventListener('click', () => {
  alert('Bạn đã hoàn thành đánh giá!');
  reviewModal.style.display = 'none';
  resetModal();
});

function resetModal() {
  currentRating = 0;
  updateStarColors(0);
  imagesPreview.innerHTML = '';
  imageInput.value = '';
  document.querySelector('.review-textarea').value = '';
}