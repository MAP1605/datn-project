// let loadedIDs = [];

// function setupShowMoreButton() {
//   const showMoreBtn = document.querySelector("#show-more-product");

//   if (showMoreBtn) {
//     showMoreBtn.addEventListener("click", () => {
//       // cập nhật lại danh sách ID đã hiển thị
//       document.querySelectorAll(".product__item").forEach(item => {
//         const id = item.getAttribute("data-id");
//         if (!loadedIDs.includes(id)) {
//           loadedIDs.push(id);
//         }
//       });

//       fetch("components/load-more.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ loaded: loadedIDs })
//       })
//         .then(res => res.text())
//         .then(html => {
//           document.querySelector("#product-list").insertAdjacentHTML("beforeend", html);
//           setupShowMoreButton(); // gọi lại nếu cần
//         })
//         .catch(err => console.error("❌ Lỗi khi tải thêm sản phẩm:", err));
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   fetch("components/product.php")
//     .then(res => res.text())
//     .then(html => {
//       document.querySelector("#products").innerHTML = html;
//       setupShowMoreButton();
//     });
// });

let loadedIDs = [];

function setupShowMoreButton() {
  const showMoreBtn = document.querySelector("#show-more-product");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
<<<<<<< HEAD:datn-project/js/pages/product.js
      console.log("👉 Nút 'Xem thêm' đã được bấm!");

      // Hiện tất cả item
      hiddenItems.forEach(item => {
        item.style.display = "block";
      });

      // Ẩn nút sau khi bấm
      showMoreBtn.style.display = "none";
=======
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
          if (html.trim() === "") {
            // Không còn sản phẩm để load thêm → ẩn nút
            showMoreBtn.style.display = "none";
            return;
          }

          document.querySelector("#product-list").insertAdjacentHTML("beforeend", html);
          showMoreBtn.style.display = "none"; // ✅ ẩn nút sau khi bấm (luôn)
        })
        .catch(err => console.error("❌ Lỗi khi tải thêm sản phẩm:", err));
>>>>>>> main:datn-project/js/pages/home.js
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
<<<<<<< HEAD:datn-project/js/pages/product.js
  fetch("components/product.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#product").innerHTML = html;
      setupShowMoreButton(); // gọi sau khi load xong sản phẩm
=======
  fetch("components/product.php")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#products").innerHTML = html;
      setupShowMoreButton();
>>>>>>> main:datn-project/js/pages/home.js
    });
});
