function dataURLtoFile(dataurl, filenameWithoutExt) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const ext = mime.split('/')[1]; // lấy jpg, png, webp...
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], `${filenameWithoutExt}.${ext}`, { type: mime });
}

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


      // document.getElementById('completeBtn').addEventListener('click', () => {

      //   document.getElementById('reviewModal').style.display = 'none';
      //   showNotification('Đánh giá thành công', 'success');
      //   resetModal();
      // });


      function resetModal() {
        currentRating = 0;
        updateStarColors(0);
        imagesPreview.innerHTML = '';
        imageInput.value = '';
        document.querySelector('.review-textarea').value = '';
      }
      // ấn vào hiện thông tin đơn hàng chi TIết
      document.querySelectorAll('.user-orders__item[data-status="hoanthanh"]').forEach(item => {
        item.addEventListener('click', function (e) {
          // Tránh trigger khi ấn vào nút Đánh giá hoặc Yêu cầu trả hàng
          if (e.target.closest('button')) return;

          const modal = document.getElementById('orderDetailModal');
          modal.style.display = 'block';
        });
      });

      document.getElementById('closeOrderDetail').addEventListener('click', function () {
        document.getElementById('orderDetailModal').style.display = 'none';
      });

      window.addEventListener('click', function (e) {
        const modal = document.getElementById('orderDetailModal');
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });

  });

});

// thời gian hiện thông báo và thông báo
function showNotification(message, type) {
  const noti = document.createElement('div');
  noti.className = `custom-notification ${type}`;
  noti.textContent = message;
  document.body.appendChild(noti);

  setTimeout(() => {
    noti.remove();
  }, 3000);
}
// ấn vào hiện hóa đơn chi tiết 
document.querySelectorAll('.user-orders__item[data-status="hoanthanh"]').forEach(item => {
  item.addEventListener('click', function (e) {
    // Tránh trigger khi ấn vào nút Đánh giá hoặc Yêu cầu trả hàng
    if (e.target.closest('button')) return;

    const modal = document.getElementById('orderDetailModal');
    modal.style.display = 'block';
  });
});

document.getElementById('closeOrderDetail').addEventListener('click', function () {
  document.getElementById('orderDetailModal').style.display = 'none';
});

window.addEventListener('click', function (e) {
  const modal = document.getElementById('orderDetailModal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const openBtns = document.querySelectorAll('.openModalBtn');
  const reviewModal = document.getElementById('reviewModal');
  const closeModal = document.getElementById('closeModal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const img = btn.dataset.img;
      const qty = btn.dataset.qty;
      const price = parseInt(btn.dataset.price);
      const total = parseInt(btn.dataset.total);
      const productId = btn.dataset.id;

      // GÁN VÀO input ẩn để gửi về backend
      document.getElementById('reviewProductId').value = productId;

      // Hiển thị vào modal
      document.getElementById('review-name').textContent = name;
      document.getElementById('review-image').src = img;
      document.getElementById('review-price').textContent = price.toLocaleString('vi-VN') + 'đ';
      document.getElementById('review-qty').textContent = qty;
      document.getElementById('review-total').textContent = total.toLocaleString('vi-VN') + 'đ';

      document.getElementById('reviewModal').classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  // Đóng modal
  closeModal.addEventListener('click', () => {
    reviewModal.classList.remove('show');
    document.body.style.overflow = '';
  });
});

function dataURLtoFile(dataurl, filenameWithoutExt) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const ext = mime.split('/')[1];
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], `${filenameWithoutExt}.${ext}`, { type: mime });
}

let currentReviewBtn = null;

document.querySelectorAll('.openModalBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentReviewBtn = btn;

    const productId = btn.dataset.id;
    const name = btn.dataset.name;
    const img = btn.dataset.img;
    const qty = btn.dataset.qty;
    const price = parseInt(btn.dataset.price);
    const total = parseInt(btn.dataset.total);

    document.getElementById('reviewProductId').value = productId;
    document.getElementById('review-name').textContent = name;
    document.getElementById('review-image').src = img;
    document.getElementById('review-price').textContent = price.toLocaleString('vi-VN') + 'đ';
    document.getElementById('review-qty').textContent = qty;
    document.getElementById('review-total').textContent = total.toLocaleString('vi-VN') + 'đ';

    document.getElementById('reviewModal').classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('completeBtn').addEventListener('click', () => {
  const starCount = document.querySelectorAll('#starContainer .star.selected').length;
  const reviewText = document.querySelector('.review-textarea').value.trim();
  const productId = document.getElementById('reviewProductId')?.value;

  if (!productId || starCount === 0 || reviewText === '') {
    alert('Vui lòng nhập đầy đủ thông tin đánh giá!');
    return;
  }

  const formData = new FormData();
  formData.append('ID_San_Pham', productId);
  formData.append('So_Sao', starCount);
  formData.append('Binh_Luan', reviewText);

  const previewImgs = document.querySelectorAll('.modal__preview-img');
  for (let i = 0; i < Math.min(previewImgs.length, 3); i++) {
    const file = dataURLtoFile(previewImgs[i].src, `anh${i + 1}`);
    formData.append(`Anh_Danh_Gia${i + 1}`, file);
  }

  fetch('../pages/api/add-review.php', {
    method: 'POST',
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      if (data.trim() === 'success') {
        alert('🎉 Đánh giá đã được gửi!');
        if (currentReviewBtn) {
          currentReviewBtn.textContent = 'Đã đánh giá';
          currentReviewBtn.disabled = true;
          currentReviewBtn.style.backgroundColor = '#ccc';
          currentReviewBtn.style.cursor = 'not-allowed';
        }
        document.getElementById('reviewModal').classList.remove('show');
        document.body.style.overflow = '';
      } else {
        alert('❌ Gửi đánh giá thất bại!');
      }
    });
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
