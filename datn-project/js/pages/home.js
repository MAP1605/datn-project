let loadedIDs = [];

function setupShowMoreButton() {
  const showMoreBtn = document.querySelector("#show-more-product");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      // cập nhật lại danh sách ID đã hiển thị
      document.querySelectorAll(".product__item").forEach(item => {
        const id = item.getAttribute("data-id");
        if (!loadedIDs.includes(id)) {
          loadedIDs.push(id);
        }
      });

      fetch("components/load-more.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loaded: loadedIDs })
      })
        .then(res => res.text())
        .then(html => {
          document.querySelector("#product-list").insertAdjacentHTML("beforeend", html);
          setupShowMoreButton(); // gọi lại nếu cần
        })
        .catch(err => console.error("❌ Lỗi khi tải thêm sản phẩm:", err));
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("components/product.php")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#products").innerHTML = html;
      setupShowMoreButton();
    });
});