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

addImageBtn.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', () => {
  imagesPreview.innerHTML = '';
  const files = imageInput.files;
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('modal__preview-img');
      imagesPreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

document.getElementById('completeBtn').addEventListener('click', () => {
  alert('Bạn đã hoàn thành đánh giá!');
  document.getElementById('reviewModal').style.display = 'none';
  resetModal();
});

document.getElementById('Checkship').addEventListener('click', () => {
  alert('Đã nhận được hàng!');
});

document.getElementById('Checkship2').addEventListener('click', () => {
  alert('Đang kiểm tra vận chuyển');
});
function resetModal() {
  currentRating = 0;
  updateStarColors(0);
  imagesPreview.innerHTML = '';
  imageInput.value = '';
  document.querySelector('.review-textarea').value = '';
}