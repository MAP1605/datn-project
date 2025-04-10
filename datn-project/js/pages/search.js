// Lấy query từ URL (ví dụ: ?q=giay)
const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get("q") || "";

// Hiển thị keyword lên trang
document.getElementById("search-keyword").textContent = keyword;

// Giả lập dữ liệu sản phẩm (sau này sẽ fetch từ PHP hoặc API)
const fakeProducts = [
    {
        name: "Giày thể thao nam",
        price: "499.000₫",
        img: "./assets/image/products/shoes.jpg",
    },
    {
        name: "Áo thun cotton nữ",
        price: "199.000₫",
        img: "./assets/image/products/tshirt.jpg",
    },
    {
        name: "Túi đeo chéo mini",
        price: "159.000₫",
        img: "./assets/image/products/bag.jpg",
    },
];

// Lọc theo từ khoá (đơn giản, chỉ kiểm tra tên có chứa từ khoá không)
const result = fakeProducts.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
);

// Render kết quả ra HTML
const resultContainer = document.getElementById("search-results");

if (result.length > 0) {
    result.forEach((product) => {
        const productHTML = `
      <div class="product-item">
        <img src="${product.img}" alt="${product.name}" class="product-item__img">
        <h4 class="product-item__name">${product.name}</h4>
        <div class="product-item__price">${product.price}</div>
      </div>
    `;
        resultContainer.insertAdjacentHTML("beforeend", productHTML);
    });
} else {
    resultContainer.innerHTML = `<p>Không tìm thấy sản phẩm nào phù hợp.</p>`;
}
