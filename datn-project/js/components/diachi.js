const addressData = {
  'Hà Nội': {
    'Ba Đình': ['Trúc Bạch', 'Vĩnh Phúc', 'Cống Vị'],
    'Cầu Giấy': ['Dịch Vọng', 'Nghĩa Đô', 'Mai Dịch'],
    'Hà Đông': ['Văn Quán', 'Yên Nghĩa', 'La Khê']
  },
  'TP. Hồ Chí Minh': {
    'Quận 1': ['Bến Nghé', 'Bến Thành', 'Cô Giang'],
    'Quận 3': ['Phường 1', 'Phường 2', 'Phường 3']
  }
};

const provinceSelect = document.getElementById('province');
const districtSelect = document.getElementById('district');
const wardSelect = document.getElementById('ward');

// Load tỉnh
for (let province in addressData) {
  const option = new Option(province, province);
  provinceSelect.appendChild(option);
}

provinceSelect.addEventListener('change', () => {
  const province = provinceSelect.value;
  districtSelect.innerHTML = '<option value="">-- Chọn Quận / Huyện --</option>';
  wardSelect.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';

  if (province && addressData[province]) {
    for (let district in addressData[province]) {
      const option = new Option(district, district);
      districtSelect.appendChild(option);
    }
  }
});

districtSelect.addEventListener('change', () => {
  const province = provinceSelect.value;
  const district = districtSelect.value;
  wardSelect.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';

  if (province && district && addressData[province][district]) {
    addressData[province][district].forEach(ward => {
      const option = new Option(ward, ward);
      wardSelect.appendChild(option);
    });
  }
});



document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.querySelector('.Themdiachi');
    
    addBtn.addEventListener('click', function () {
      // Tạo khối mới với class "from-use"
      const newAddressForm = document.createElement('from');
      newAddressForm.classList.add('.from-use__tabs');

      const province = document.getElementById('province').value;
      const district = document.getElementById('district').value;
      const ward = document.getElementById('ward').value;
      const fullAddress = `${ward}, ${district}, ${province}`;
      const ten = document.getElementById('Ten').value;
      const Email = document.getElementById('Email').value;
      const SDT = document.getElementById('SDT').value;
      // Nội dung HTML của form mới (bạn có thể tùy chỉnh lại)
     
      newAddressForm.innerHTML = `
          <form class="ModelInfo">
          <p><Strong>Địa chỉ nhà:</Strong> ${fullAddress}</p>
                    <p><strong>Tên:</strong>${ten}</p>
                    <p><strong>Email</strong> ${Email}</p>
                    <p><strong>Số điện thoại:</strong>${SDT}</p>
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
