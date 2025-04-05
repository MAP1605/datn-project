const loadComponent = async (id, filePath) => {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(filePath);
    const html = await res.text();
    container.innerHTML = html;
  }
};

// Xác định base path tuỳ theo trang hiện tại
const basePath = location.pathname.includes('/pages/') ? '../components/' : 'components/';

// Load header và footer
loadComponent('header', `${basePath}header.html`);
loadComponent('product', `${basePath}product.html`);
loadComponent('footer', `${basePath}footer.html`);
