import { loadHTML } from './dom.js';  // Import hàm loadHTML từ file kia


loadHTML('#header', './components/header.php');  // Gọi hàm, chèn header
loadHTML('#footer', './components/footer.html');  // Gọi hàm, chèn footer


loadHTML('#banner', 'components/banner.html');
loadHTML('#category2', 'components/category.php');
loadHTML('#products', 'components/product.php');


