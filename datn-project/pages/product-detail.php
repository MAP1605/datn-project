<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối CSDL
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'DATN';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("❌ Kết nối thất bại: " . $conn->connect_error);
}

// Lấy ID sản phẩm từ URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    die("❌ ID không hợp lệ");
}

// Lấy thông tin sản phẩm
$sql = "SELECT * FROM San_Pham WHERE ID_San_Pham = $id";
$result = $conn->query($sql);
if (!$result || $result->num_rows == 0) {
    die("❌ Không tìm thấy sản phẩm");
}
$product = $result->fetch_assoc();

// ✅ Lấy ID người bán từ sản phẩm
$idNguoiBan = $product['ID_Nguoi_Ban'];

// ✅ Lấy thông tin người bán và ảnh từ bảng Người_Mua
$sqlShop = "
    SELECT 
        nb.Ten_Cua_Hang,
        nb.Ngay_Tham_Gia,
        nm.Anh_Nguoi_Mua
    FROM 
        Nguoi_Ban nb
    JOIN 
        Người_Mua nm ON nb.ID_Nguoi_Mua = nm.ID_Nguoi_Mua
    WHERE 
        nb.ID_Nguoi_Ban = $idNguoiBan
";
$resultShop = $conn->query($sqlShop);
$shop = $resultShop && $resultShop->num_rows > 0 ? $resultShop->fetch_assoc() : [
    'Ten_Cua_Hang' => 'Chưa rõ',
    'Ngay_Tham_Gia' => date('Y-m-d'),
    'Anh_Nguoi_Mua' => ''
];

// ✅ Lấy số lượng sản phẩm của người bán
$sqlCount = "SELECT COUNT(*) AS SoSanPham FROM San_Pham WHERE ID_Nguoi_Ban = $idNguoiBan";
$resultCount = $conn->query($sqlCount);
$soSanPham = 0;
if ($resultCount && $row = $resultCount->fetch_assoc()) {
    $soSanPham = $row['SoSanPham'];
}
?>


<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PearNK - Chi tiết sản phẩm</title>

    <!-- CSS chính -->
    <link rel="stylesheet" href="../css/main.css" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>

<body>
    <!-- Start header -->
    <header id="header"></header>
    <!-- End header -->

    <div class="main">
        <!-- Start product-detail -->
        <section class="product-detail">
            <div class="container container__product-detail">
                <!-- Top chi tiết sản phẩm -->
                <div class="product-detail__top">
                    <!-- LEFT: Thông tin sản phẩm -->
                    <div class="product-detail__left">
                        <div class="product-detail__images">
                            <img src="data:image/jpeg;base64,<?php echo base64_encode($product['Anh_Bia']); ?>"
                                alt="Ảnh sản phẩm chính" class="detail__media-main" />
                            <div class="detail__media-thumbs">
                                <!-- nếu có thêm ảnh khác, bạn có thể dùng vòng lặp hoặc thêm sau -->
                                <?php
                                for ($i = 1; $i <= 5; $i++) {
                                    $field = "Anh_San_Pham$i";
                                    if (!empty($product[$field])) {
                                        echo '<img src="data:image/jpeg;base64,' . base64_encode($product[$field]) . '" alt="Ảnh sản phẩm phụ" />';
                                    }
                                }
                                ?>
                            </div>
                        </div>
                    </div>

                    <!-- Thông tin sản phẩm -->
                    <div class="product-detail__info">
                        <h1 class="product-detail__name"><?php echo $product['Ten_San_Pham']; ?></h1>

                        <div class="product-detail__meta">
                            <div class="product-detail__rating">
                                <span><i class="fa-solid fa-star"></i> <?php echo $product['So_Sao_Danh_Gia']; ?></span>
                            </div>
                            <div class="product-detail__review">0 đánh giá</div>
                            <div class="product-detail__sold"><?php echo $product['Da_Ban']; ?> đã bán</div>
                        </div>

                        <div class="product-detail__price-wrap">
                            <span class="product-detail__price-new">
                                <?php echo number_format($product['Gia_Ban'], 0, ',', '.'); ?>₫
                            </span>
                            <span class="product-detail__price-old">
                                <?php echo number_format($product['Gia_Goc'], 0, ',', '.'); ?>₫
                            </span>
                        </div>

                        <div class="product-detail__quantity">
                            <label>Số lượng:</label>
                            <button class="product-detail__qty-btn">-</button>
                            <input type="text" value="1" class="product-detail__qty-input" />
                            <button class="product-detail__qty-btn">+</button>
                            <span class="product-detail__stock">
                                <?php echo $product['So_Luong_Ton']; ?> sản phẩm có sẵn
                            </span>
                        </div>

                        <div class="product-detail__actions">
                            <button class="product-detail__btn detail__btn--cart">
                                <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                            </button>
                            <button class="product-detail__btn detail__btn--buy">Mua ngay</button>
                        </div>
                    </div>
                </div>

                <div class="product-detail__shop-info">
                    <div class="shop__info">
                        <img src="data:image/jpeg;base64,<?php echo base64_encode($shop['Anh_Nguoi_Mua']); ?>" alt="Shop" class="shop__avatar" />
                        <div class="shop__name"><?php echo $shop['Ten_Cua_Hang']; ?></div>
                    </div>

                    <div class="shop__extra">
                        <div class="shop__star-col">
                            <div class="shop__stats">
                                <div class="shop__stat">
                                    <div class="shop__stat-value"><?php echo $soSanPham; ?></div>
                                    <div class="shop__stat-label">Sản phẩm</div>
                                </div>
                                <?php
                                function timeAgo($date)
                                {
                                    $now = new DateTime();
                                    $joined = new DateTime($date);
                                    $diff = $now->diff($joined);

                                    if ($diff->y > 0) {
                                        return $diff->y . ' năm trước';
                                    } elseif ($diff->m > 0) {
                                        return $diff->m . ' tháng trước';
                                    } elseif ($diff->d >= 7) {
                                        $weeks = floor($diff->d / 7);
                                        return $weeks . ' tuần trước';
                                    } elseif ($diff->d > 0) {
                                        return $diff->d . ' ngày trước';
                                    } else {
                                        return 'Hôm nay';
                                    }
                                }
                                ?>
                                <div class="shop__stat">
                                    <div class="shop__stat-value"><?php echo timeAgo($shop['Ngay_Tham_Gia']); ?></div>
                                    <div class="shop__stat-label">Tham gia</div>
                                </div>
                            </div>
                        </div>

                        <div class="shop__actions">
                            <button class="shop__btn">Xem Shop</button>
                            <button class="shop__btn">Chat ngay</button>
                        </div>
                    </div>
                </div>

                <!-- Chi tiết sản phẩm -->
                <section class="detail__section product-detail__section">
                    <h2 class="product-detail__title">Chi tiết sản phẩm</h2>
                    <ul class="product-detail__info-list">
                        <li class="product-detail__info-item">
                            Danh Mục <span class="product-detail__info-value">Shopee &gt; Điện thoại</span>
                        </li>
                        <li class="product-detail__info-item">
                            Số lượng hàng khuyến mãi <span class="product-detail__info-value">64</span>
                        </li>
                        <li class="product-detail__info-item">
                            Số sản phẩm còn lại <span class="product-detail__info-value">307</span>
                        </li>
                        <li class="product-detail__info-item">
                            Loại bảo hành <span class="product-detail__info-value">Bảo hành nhà sản xuất</span>
                        </li>
                        <li class="product-detail__info-item">
                            Hạn bảo hành <span class="product-detail__info-value">12 tháng</span>
                        </li>
                        <li class="product-detail__info-item">
                            Tình trạng <span class="product-detail__info-value">Mới</span>
                        </li>
                        <li class="product-detail__info-item">
                            Gửi từ <span class="product-detail__info-value">Hà Nội</span>
                        </li>
                    </ul>
                </section>

                <!-- Mô tả sản phẩm -->
                <section class="detail__section product-detail__section">
                    <h2 class="product-detail__title">Mô tả sản phẩm</h2>
                    <div class="product-detail__description">
                        <p>- Hệ thống Siêu thị Viettel Store cam kết cung cấp các sản phẩm chính hãng tới người tiêu
                            dùng (TẤT CẢ SẢN
                            PHẨM ĐỀU NGUYÊN SEAL).</p>
                        <p>- Hỗ trợ xuất hóa đơn VAT (Quý khách hàng vui lòng để lại email đặt hàng để nhận hóa đơn điện
                            tử).</p>
                        <p>- Tất cả các gói hàng Viettel Store gửi tới Quý khách hàng đều được dán tem niêm phong trên
                            kiện hàng. Quý
                            khách hàng lưu ý dấu hiệu của tem niêm phong trên kiện hàng trước khi nhận hàng.</p>
                        <p>- Khách hàng vui lòng chụp/ quay lại lúc nhận/ bóc sản phẩm để đảm bảo quyền lợi về bảo hành,
                            đổi trả sản
                            phẩm.</p>
                        <p>- Viettel nhận bảo hành sản phẩm tại tất cả siêu thị Viettel Store đang kinh doanh trên toàn
                            quốc. Không hỗ
                            trợ Quý khách hàng trả lại sản phẩm khi đã bóc tem niêm phong gói hàng, bóc seal sản phẩm,
                            đã qua sử dụng.
                        </p>

                        <p><strong>iPhone 13</strong> – Hệ thống camera kép tiên tiến nhất từng có trên iPhone. Chip A15
                            Bionic thần
                            tốc. Thời lượng pin dài hơn. Thiết kế bền bỉ. Mạng 5G siêu nhanh. Màn hình Super Retina XDR
                            sáng hơn.</p>

                        <p><strong>Tính năng nổi bật</strong></p>
                        <ul>
                            <li>Màn hình Super Retina XDR 6.1 inch</li>
                            <li>Chế độ Điện Ảnh tự động thay đổi tiêu cự trong video</li>
                            <li>Camera kép 12MP: Wide & Ultra Wide, HDR thế hệ 4, quay video Dolby Vision 4K</li>
                            <li>Camera trước TrueDepth 12MP, quay video HDR Dolby Vision 4K</li>
                            <li>Chip A15 Bionic cho hiệu năng vượt trội</li>
                            <li>Thời gian xem video: lên đến 19 giờ</li>
                            <li>Thiết kế bền bỉ với Ceramic Shield</li>
                            <li>Chống nước IP68</li>
                            <li>5G tốc độ cao</li>
                            <li>iOS 15 với nhiều tính năng mới</li>
                        </ul>

                        <p><strong>Pháp lý:</strong></p>
                        <ul>
                            <li>(1) 5G chỉ khả dụng ở một số khu vực, cần gói cước dữ liệu.</li>
                            <li>(2) Màn hình 6.06 inch tính theo đường chéo. Diện tích hiển thị thực tế nhỏ hơn.</li>
                            <li>(3) Thời lượng pin có thể thay đổi tùy cách sử dụng.</li>
                            <li>(4) IP68 – không bảo hành sản phẩm bị thấm nước.</li>
                            <li>(5) Một số tính năng có thể không hỗ trợ tại Việt Nam.</li>
                        </ul>

                        <p><strong>Bộ sản phẩm bao gồm:</strong></p>
                        <ul>
                            <li>Điện thoại</li>
                            <li>Dây sạc</li>
                            <li>Hướng dẫn sử dụng – Bảo hành điện tử 12 tháng</li>
                        </ul>

                        <p><strong>Thông tin bảo hành:</strong> Bảo hành 12 tháng từ ngày kích hoạt sản phẩm.</p>
                        <p><strong>Kích hoạt bảo hành:</strong></p>
                        <ol>
                            <li>Truy cập đường link nhà sản xuất</li>
                            <li>Chọn sản phẩm</li>
                            <li>Nhập Apple ID và mật khẩu</li>
                        </ol>
                        <p>Sau khi hoàn tất, hệ thống sẽ hiển thị trung tâm bảo hành gần nhất.</p>
                    </div>
                </section>


                <!-- Đánh giá sản phẩm -->
                <div class="detail__section">
                    <h2 class="detail__title">Đánh giá sản phẩm</h2>

                    <div class="review__overview">
                        <span class="review__score">4.9 trên 5</span>
                        <span class="review__star">★★★★★</span>
                        <span class="review__total">(183 đánh giá)</span>
                        <!-- Filter đánh giá -->
                        <div class="review__filters">
                            <button class="review__filter-btn active">Tất cả</button>
                            <button class="review__filter-btn">5 sao</button>
                            <button class="review__filter-btn">4 sao</button>
                            <button class="review__filter-btn">3 sao</button>
                            <button class="review__filter-btn">2 sao</button>
                            <button class="review__filter-btn">1 sao</button>
                            <button class="review__filter-btn">Có bình luận</button>
                            <button class="review__filter-btn">Có hình ảnh / video</button>
                        </div>
                    </div>


                    <!-- Danh sách đánh giá -->
                    <div class="review__list">
                        <!-- review item -->
                        <div class="review__item">
                            <div class="review__user">
                                <span class="review__user-name">Cường Ymir</span>
                                <span class="review__star">★★★★★</span>
                            </div>
                            <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                có 15 củ</p>
                            <div class="review__images">
                                <img src="../assets/images/product__detail/detail__media-review-img-1.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-2.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-3.webp"
                                    alt="ảnh đánh giá">
                            </div>
                        </div>
                        <!-- review item -->
                        <div class="review__item">
                            <div class="review__user">
                                <span class="review__user-name">Cường Ymir</span>
                                <span class="review__star">★★★★★</span>
                            </div>
                            <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                có 15 củ</p>
                            <div class="review__images">
                                <img src="../assets/images/product__detail/detail__media-review-img-1.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-2.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-3.webp"
                                    alt="ảnh đánh giá">
                            </div>
                        </div>
                        <!-- review item -->
                        <div class="review__item">
                            <div class="review__user">
                                <span class="review__user-name">Cường Ymir</span>
                                <span class="review__star">★★★★★</span>
                            </div>
                            <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                có 15 củ</p>
                            <div class="review__images">
                                <img src="../assets/images/product__detail/detail__media-review-img-1.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-2.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-3.webp"
                                    alt="ảnh đánh giá">
                            </div>
                        </div>
                        <!-- review item -->
                        <div class="review__item">
                            <div class="review__user">
                                <span class="review__user-name">Cường Ymir</span>
                                <span class="review__star">★★★★★</span>
                            </div>
                            <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                có 15 củ</p>
                            <div class="review__images">
                                <img src="../assets/images/product__detail/detail__media-review-img-1.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-2.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-3.webp"
                                    alt="ảnh đánh giá">
                            </div>
                        </div>
                        <!-- review item -->
                        <div class="review__item">
                            <div class="review__user">
                                <span class="review__user-name">Cường Ymir</span>
                                <span class="review__star">★★★★★</span>
                            </div>
                            <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                có 15 củ</p>
                            <div class="review__images">
                                <img src="../assets/images/product__detail/detail__media-review-img-1.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-2.webp"
                                    alt="ảnh đánh giá">
                                <img src="../assets/images/product__detail/detail__media-review-img-3.webp"
                                    alt="ảnh đánh giá">
                            </div>
                        </div>
                    </div>

                    <!-- Phân trang đánh giá -->
                    <div class="review__pagination">
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">3</button>
                        <button class="page-btn">...</button>
                        <button class="page-btn">21</button>
                    </div>
                </div>
            </div>
        </section>
        <!-- End product-detail -->

        <!-- Sản phẩm gợi ý -->
        <div id="product"></div>
    </div>



    <!-- Start footer -->
    <footer id="footer"></footer>
    <!-- End footer -->

    <!-- JS: load component header/footer -->
    <script type="module" src="../js/utils/components-loader-pages.js"></script>

</body>

</html>