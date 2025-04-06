// Lọc đánh giá sản phẩm theo sao, có bình luận và có hình ảnh
  const filterBtns = document.querySelectorAll('.review__filter-btn');
  const reviewItems = document.querySelectorAll('.review__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Xử lý nút active
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      reviewItems.forEach(item => {
        const rating = item.getAttribute('data-rating');
        const hasComment = item.getAttribute('data-has-comment') === 'true';
        const hasImage = item.getAttribute('data-has-image') === 'true';

        let show = false;

        if (filter === 'all') {
          show = true;
        } else if (['5', '4', '3', '2', '1'].includes(filter)) {
          show = rating === filter;
        } else if (filter === 'comment') {
          show = hasComment;
        } else if (filter === 'image') {
          show = hasImage;
        }

        item.style.display = show ? 'block' : 'none';
      });
    });
  });
