document.addEventListener('DOMContentLoaded', function () {
    const chooseBtn = document.getElementById('chooseBtn');
    const imageInput = document.getElementById('imageInput');
    const previewImg = document.getElementById('previewImg');
  
    // Khi bấm nút "Chọn ảnh", kích hoạt input file
    chooseBtn.addEventListener('click', function () {
      imageInput.click();
    });
});