function setupShowMoreButton() {
  const showMoreBtn = document.querySelector("#show-more-product");
  const hiddenItems = document.querySelectorAll(".product__item--hidden");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      console.log("👉 Nút 'Xem thêm' đã được bấm!");
      hiddenItems.forEach(item => {
        item.style.display = "block";
      });
    });
  } else {
    console.log("❌ Không tìm thấy nút #show-more-product trong DOM");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Giả sử bạn load phần sản phẩm bằng fetch hay innerHTML
  fetch("components/product.php")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#products").innerHTML = html;
      setupShowMoreButton(); // gọi sau khi nội dung đã được gán vào DOM
    });
});