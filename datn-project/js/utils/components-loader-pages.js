const loadComponent = async (id, filePath) => {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(filePath);
    const html = await res.text();
    container.innerHTML = html;

    // 👉 Nếu là header thì gọi luôn hàm update cart
    if (id === "header") {
      import("./update-cart-header.js").then((module) => {
        if (typeof module.default === "function") {
          module.default(); // gọi hàm renderMiniCart từ file update-cart-header.js
        }
      });
    }
  }
};




// Xác định base path tuỳ theo trang hiện tại
const basePath = location.pathname.includes('/pages/') ? '../components/' : 'components/';

// Load header và footer
loadComponent('header', `${basePath}header.php`);
loadComponent('products', `${basePath}product.php`);
loadComponent('footer', `${basePath}footer.html`);


