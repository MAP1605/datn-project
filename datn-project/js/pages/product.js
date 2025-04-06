function setupShowMoreButton() {
  const showMoreBtn = document.querySelector("#show-more-product");
  const hiddenItems = document.querySelectorAll(".product__item--hidden");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      console.log("👉 Nút 'Xem thêm' đã được bấm!");

      // Hiện tất cả item
      hiddenItems.forEach(item => {
        item.style.display = "block";
      });

      // Ẩn nút sau khi bấm
      showMoreBtn.style.display = "none";
    });
  } else {
    console.log("❌ Không tìm thấy nút #show-more-product trong DOM");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("components/product.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#product").innerHTML = html;
      setupShowMoreButton(); // gọi sau khi load xong sản phẩm
    });
});
