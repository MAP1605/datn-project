// let loadedIDs = [];

// function setupShowMoreButton() {
//   const showMoreBtn = document.querySelector("#show-more-product");

//   if (showMoreBtn) {
//     showMoreBtn.onclick = () => {
//       const currentIDs = Array.from(document.querySelectorAll(".product__item"))
//         .filter(item => !item.classList.contains("product__item--hidden")) // lọc bản chính
//         .map(item => item.getAttribute("data-id"))
//         .filter(id => id);

//       fetch("components/load-more.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },

//         body: JSON.stringify({ loaded: currentIDs })
//       })
//         .then(res => res.text())
//         .then(html => {
//           if (html.trim() === "") {
//             // Không còn sản phẩm để tải
//             showMoreBtn.style.display = "none";
//             return;
//           }

//           // Chèn thêm sản phẩm vào danh sách
//           document.querySelector("#product-list").insertAdjacentHTML("beforeend", html);

//           // Cập nhật lại loadedIDs
//           document.querySelectorAll(".product__item").forEach(item => {
//             const id = item.getAttribute("data-id");
//             if (id && !loadedIDs.includes(id)) {
//               loadedIDs.push(id);
//             }
//           });

//           // 🟢 Gắn lại sự kiện nếu nút vẫn còn (không cần ẩn luôn)
//           setupShowMoreButton();
//         })
//         .catch(err => console.error("❌ Lỗi khi tải thêm sản phẩm:", err));
//     };
//   }
// }

// Gọi khi trang được load
// document.addEventListener("DOMContentLoaded", setupShowMoreButton);


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
          if (html.trim() === "") {
            // Không còn sản phẩm để load thêm → ẩn nút
            showMoreBtn.style.display = "none";
            return;
          }

          document.querySelector("#product-list").insertAdjacentHTML("beforeend", html);
          showMoreBtn.style.display = "none"; // ✅ ẩn nút sau khi bấm (luôn)
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

