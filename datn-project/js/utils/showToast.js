window.showToast = function (message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.style.backgroundColor =
        type === 'success' ? '#28a745' :
            type === 'error' ? '#dc3545' : '#333';

    toast.style.display = 'block'; // ✅ quan trọng
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.style.display = 'none';
    }, 2500);
};
