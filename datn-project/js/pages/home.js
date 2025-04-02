// const toggleBtn = document.querySelector('.category__toggle-btn');
// const categoryList = document.querySelector('.category__list');

// if (toggleBtn && categoryList) {
//     toggleBtn.addEventListener('click', () => {
//         categoryList.classList.toggle('show-more');
//         toggleBtn.textContent = categoryList.classList.contains('show-more') 
//             ? 'Ẩn bớt' 
//             : 'Xem thêm';
//     });
// }


// button xem thêm (product)
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.querySelector("#show-more-product");
  const hiddenItems = document.querySelectorAll(".product__item--hidden");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      hiddenItems.forEach(item => {
        item.classList.remove("product__item--hidden");
      });
      showMoreBtn.style.display = "none";
    });
  }
});
