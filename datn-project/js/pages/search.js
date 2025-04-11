const moreBtns = document.querySelectorAll('.search-filter__more');

moreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const group = btn.closest('.search-filter__group');
        group.classList.toggle('expanded');
        btn.textContent = group.classList.contains('expanded') ? 'Thu gọn' : 'Xem thêm';
    });
});
