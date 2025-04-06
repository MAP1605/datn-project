// Popup ảnh 
// <div class="popup-overlay" id="popupOverlay">
//     <div class="popup-content">
//         <button class="popup-btn prev" id="popupPrevBtn">&#8592;</button>
//         <img id="popupImage" src="" alt="Ảnh đánh giá">
//         <button class="popup-btn next" id="popupNextBtn">&#8594;</button>
//     </div>
// </div>

//  phóng to ảnh riview 
document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupImage = document.getElementById("popupImage");
  const popupPrev = document.getElementById("popupPrevBtn");
  const popupNext = document.getElementById("popupNextBtn");

  let gallery = [];
  let current = 0;

  // Gán click cho tất cả ảnh trong review__images
  document.querySelectorAll(".review__images").forEach(container => {
    const images = Array.from(container.querySelectorAll("img"));
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        gallery = images;
        current = index;
        openPopup(gallery[current].src);
      });
    });
  });

  function openPopup(src) {
    popupImage.src = src;
    popupOverlay.style.display = "flex";
  }

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) popupOverlay.style.display = "none";
  });

  // Điều hướng vòng lặp
  popupPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    current = (current - 1 + gallery.length) % gallery.length;
    popupImage.src = gallery[current].src;
  });

  popupNext.addEventListener("click", (e) => {
    e.stopPropagation();
    current = (current + 1) % gallery.length;
    popupImage.src = gallery[current].src;
  });
});


// === JavaScript cho phân trang + bộ lọc đánh giá hoạt động + đếm số lượng từng loại + tính điểm trung bình ===
document.addEventListener("DOMContentLoaded", () => {
  const reviewList = document.getElementById("review__list");
  const paginationContainer = document.getElementById("review__pagination");
  const filterButtons = document.querySelectorAll(".review__filter-btn");
  const reviewScoreElement = document.querySelector(".review__score");
  const starElement = document.querySelector(".review__star");

  const reviews = Array.from(document.querySelectorAll(".review__item"));
  const reviewsPerPage = 6;
  let currentPage = 1;
  let currentFilter = "all";

  function getFilteredReviews() {
    return reviews.filter((item) => {
      const rating = item.getAttribute("data-rating");
      const hasComment = item.getAttribute("data-has-comment") === "true";
      const hasImage = item.getAttribute("data-has-image") === "true";

      if (currentFilter === "all") return true;
      if (currentFilter === "comment") return hasComment;
      if (currentFilter === "image") return hasImage;
      return rating === currentFilter;
    });
  }

  function renderReviews() {
    const filtered = getFilteredReviews();
    const start = (currentPage - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;

    reviews.forEach((item) => (item.style.display = "none"));
    filtered.slice(start, end).forEach((item) => (item.style.display = "block"));

    renderPagination(filtered.length);
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / reviewsPerPage);
    let html = "";

    const createBtn = (page, text = page, active = false, disabled = false) => {
      return `<button class="page-btn${active ? " active" : ""}" data-page="${page}" ${disabled ? "disabled" : ""
        }>${text}</button>`;
    };

    html += createBtn(currentPage - 1, '<i class="fa-solid fa-angle-left"></i>', false, currentPage === 1);

    let range = [];
    if (totalPages <= 5) {
      range = [...Array(totalPages).keys()].map((i) => i + 1);
    } else {
      if (currentPage <= 3) {
        range = [1, 2, 3, 4, 5];
      } else if (currentPage >= totalPages - 2) {
        range = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        range = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
      }
    }

    if (range[0] > 1) {
      html += createBtn(1);
      if (range[0] > 2) html += '<span class="page-dot">...</span>';
    }

    range.forEach((p) => {
      html += createBtn(p, p, currentPage === p);
    });

    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) html += '<span class="page-dot">...</span>';
      html += createBtn(totalPages);
    }

    html += createBtn(currentPage + 1, '<i class="fa-solid fa-angle-right"></i>', false, currentPage === totalPages);

    paginationContainer.innerHTML = html;

    document.querySelectorAll(".page-btn").forEach((btn) => {
      const page = parseInt(btn.getAttribute("data-page"));
      if (!isNaN(page)) {
        btn.addEventListener("click", () => {
          currentPage = page;
          renderReviews();
        });
      }
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      currentPage = 1;
      renderReviews();
    });
  });

  function updateFilterCountsAndScore() {
    const counts = {
      all: reviews.length,
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      comment: 0,
      image: 0,
    };
    let totalScore = 0;

    reviews.forEach((item) => {
      const rating = parseInt(item.getAttribute("data-rating"));
      const hasComment = item.getAttribute("data-has-comment") === "true";
      const hasImage = item.getAttribute("data-has-image") === "true";

      if (counts[rating] !== undefined) counts[rating]++;
      if (hasComment) counts.comment++;
      if (hasImage) counts.image++;

      totalScore += rating;
    });

    // Cập nhật điểm trung bình
    const average = (totalScore / reviews.length).toFixed(1);
    if (reviewScoreElement) reviewScoreElement.textContent = `${average} trên 5`;

    // Cập nhật phần sao động
    if (starElement) {
      const fullStars = Math.floor(average);
      const halfStar = average - fullStars >= 0.5;
      const starsHTML =
        "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(5 - fullStars - (halfStar ? 1 : 0));
      starElement.textContent = starsHTML;
    }

    // Cập nhật số lượng theo từng loại filter
    filterButtons.forEach((btn) => {
      const key = btn.getAttribute("data-filter");
      if (counts[key] !== undefined) {
        btn.innerHTML = btn.textContent.trim().split(" (")[0] + ` (${counts[key]})`;
      }
    });
  }

  updateFilterCountsAndScore();
  renderReviews();
});


