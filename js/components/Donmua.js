// Lấy tất cả nút tab và các đơn hàng
const tabButtons = document.querySelectorAll('.tab-button');
const orders = document.querySelectorAll('.order');

// Lặp qua từng nút tab
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Xóa class 'active' khỏi tất cả nút
    tabButtons.forEach(btn => btn.classList.remove('active'));
    // Thêm class 'active' cho nút vừa bấm
    button.classList.add('active');
    
    // Lấy giá trị trạng thái từ data-tab
    const filterStatus = button.getAttribute('data-tab');
    
    // Lọc đơn hàng
    orders.forEach(order => {
      // Nếu bấm "Tất cả" hoặc order.status khớp với filterStatus thì hiển thị
      if (filterStatus === 'all' || order.getAttribute('data-status') === filterStatus) {
        order.style.display = 'block';
      } else {
        order.style.display = 'none';
      }
    });
  });
});
   // Lấy các phần tử
   const openModalBtn = document.getElementById('openModalBtn');
   const reviewModal = document.getElementById('reviewModal');
   const closeModal = document.getElementById('closeModal');
   const addImageBtn = document.getElementById('addImageBtn');
   const imageInput = document.getElementById('imageInput');
   const imagesPreview = document.getElementById('imagesPreview');
   const completeBtn = document.getElementById('completeBtn');

   // Mở modal
   openModalBtn.addEventListener('click', () => {
       reviewModal.style.display = 'block';
   });

   // Đóng modal
   closeModal.addEventListener('click', () => {
       reviewModal.style.display = 'none';
       resetModal();
   });

   // Đóng modal khi click bên ngoài nội dung
   window.addEventListener('click', (e) => {
       if (e.target === reviewModal) {
           reviewModal.style.display = 'none';
           resetModal();
       }
   });

   // Xử lý sao
   const starContainer = document.getElementById('starContainer');
   let currentRating = 0;
   starContainer.addEventListener('click', (e) => {
       if (e.target.classList.contains('star')) {
           currentRating = e.target.getAttribute('data-value');
           updateStarColors(currentRating);
       }
   });
   // Di chuột (hover) - hiệu ứng tạm
   starContainer.addEventListener('mouseover', (e) => {
       if (e.target.classList.contains('star')) {
           const hoverValue = e.target.getAttribute('data-value');
           updateStarColors(hoverValue);
       }
   });
   // Khi rời chuột khỏi vùng sao
   starContainer.addEventListener('mouseout', () => {
       updateStarColors(currentRating);
   });

   function updateStarColors(rating) {
       const stars = starContainer.querySelectorAll('.star');
       stars.forEach(star => {
           const value = star.getAttribute('data-value');
           if (value <= rating) {
               star.classList.add('selected');
           } else {
               star.classList.remove('selected');
           }
       });
   }

   // Thêm hình ảnh
   addImageBtn.addEventListener('click', () => {
       imageInput.click(); // Kích hoạt input file ẩn
   });
   imageInput.addEventListener('change', () => {
       // Xóa preview cũ
       imagesPreview.innerHTML = '';
       // Lấy danh sách file
       const files = imageInput.files;
       for (let i = 0; i < files.length; i++) {
           const file = files[i];
           const reader = new FileReader();
           reader.onload = function (e) {
               const img = document.createElement('img');
               img.src = e.target.result;
               imagesPreview.appendChild(img);
           }
           reader.readAsDataURL(file);
       }
   });

   // Nút hoàn thành
   completeBtn.addEventListener('click', () => {
       alert('Bạn đã hoàn thành đánh giá!');
       reviewModal.style.display = 'none';
       resetModal();
   });

   // Hàm reset modal (nếu cần)
   function resetModal() {
       // Xóa chọn sao
       currentRating = 0;
       updateStarColors(0);
       // Xóa ảnh
       imagesPreview.innerHTML = '';
       imageInput.value = '';
       // Xóa nội dung textarea
       document.querySelector('.review-textarea').value = '';
   }