document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.querySelector('.Themdiachi');
    
    addBtn.addEventListener('click', function () {
      // Tạo khối mới với class "from-use"
      const newAddressForm = document.createElement('from');
      newAddressForm.classList.add('.fromthongtin');

      const Diachi = document.getElementById('Diachi').value;
      const ten = document.getElementById('Ten').value;
      const Email = document.getElementById('Email').value;
      const SDT = document.getElementById('SDT').value;
      // Nội dung HTML của form mới (bạn có thể tùy chỉnh lại)
     
      newAddressForm.innerHTML = `
          <form class="fromthongtin">
          <p><Strong>Địa chỉ nhà:</Strong> ${Diachi}</p>
                    <p><strong>Tên:</strong>${ten}</p>
                    <p><strong>Email</strong> ${Email}</p>
                    <p><strong>Số điện thoại:${SDT}</strong></p>
                    </form >
        `;
      
      // Thêm form mới vào cuối main.content
      const content = document.querySelector('.content');
      content.appendChild(newAddressForm);
    });
  });

  // Lấy phần tử modal
const modal = document.getElementById("storeOwnerModal");

// Lấy nút mở modal
const openModalBtn = document.getElementById("openModalBtn");

// Lấy nút đóng modal (dấu ×)
const closeElem = document.getElementsByClassName("close")[0];

// Lấy nút "Đồng ý"
const agreeBtn = document.getElementById("agreeBtn");
const addBtn = document.querySelector('.Themdiachi');
    
  

// Khi người dùng nhấn nút mở modal, hiển thị modal
openModalBtn.addEventListener("click", function() {
  modal.style.display = "block";
});

// Khi người dùng nhấn vào dấu ×, ẩn modal
closeElem.addEventListener("click", function() {
  modal.style.display = "none";
});

// Khi người dùng nhấn nút "Đồng ý", ẩn modal
addBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Khi người dùng nhấn ngoài khu vực modal, ẩn modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
