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

$sqlChiTietSanPham = "
    SELECT 
        sp.*,
        dm.Ten_Danh_Muc,
        dc.Tinh_Thanh_Pho,
        ctsp.Tinh_Trang,
        ctsp.Han_Bao_Hanh,
        ctsp.Loai_Bao_Hanh,
        ctsp.Mo_Ta_Chi_Tiet
    FROM San_Pham sp
    LEFT JOIN Chi_Tiet_San_Pham ctsp ON sp.ID_San_Pham = ctsp.ID_San_Pham
    LEFT JOIN Danh_Muc dm ON sp.ID_Danh_Muc = dm.ID_Danh_Muc
    LEFT JOIN Nguoi_Ban nb ON sp.ID_Nguoi_Ban = nb.ID_Nguoi_Ban
    LEFT JOIN Dia_Chi_Nhan_Hang dc ON nb.ID_Nguoi_Mua = dc.ID_Nguoi_Mua
    WHERE sp.ID_San_Pham = $id
";
$result = $conn->query($sqlChiTietSanPham);
if (!$result || $result->num_rows == 0) {
    die("❌ Không tìm thấy sản phẩm");
}
$product = $result->fetch_assoc();

// Lấy đánh giá của sản phẩm từ bảng Danh_Gia_San_Pham
$sqlReview = "
    SELECT dg.*, nm.Ho_Ten
    FROM Danh_Gia_San_Pham dg
    JOIN Người_Mua nm ON dg.ID_Nguoi_Mua = nm.ID_Nguoi_Mua
    WHERE dg.ID_San_Pham = $id
    ORDER BY dg.Ngay_Danh_Gia DESC
";
$resultReview = $conn->query($sqlReview);

$sqlCapNhatSaoDB = "SELECT AVG(So_Sao) AS avg_rating FROM Danh_Gia_San_Pham WHERE ID_San_Pham = $id";
$resultAvg = $conn->query($sqlCapNhatSaoDB);

if ($resultAvg && $rowAvg = $resultAvg->fetch_assoc()) {
    $avgRating = round($rowAvg['avg_rating'], 1); // Làm tròn 1 chữ số thập phân

    // Cập nhật lại cột So_Sao_Danh_Gia trong bảng San_Pham
    $sqlUpdate = "UPDATE San_Pham SET So_Sao_Danh_Gia = $avgRating WHERE ID_San_Pham = $id";
    $conn->query($sqlUpdate);
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
    <!-- logo ở tên miền -->
    <link rel="icon" type="image/png" href="../assets/images/logo/CuongDao__Logo-PEARNK.png " sizes="16x16">
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
                                <span id="productRating">
                                    <i class="fa-solid fa-star"></i> <?php echo $product['So_Sao_Danh_Gia']; ?>
                                </span>
                            </div>
                            <div id="productTotalReview" class="product-detail__review"></div>
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

                <!-- Thông tin shop -->
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
                            Danh Mục <span class="product-detail__info-value">
                                <?php echo htmlspecialchars($product['Ten_Danh_Muc']); ?>
                            </span>
                        </li>
                        <li class="product-detail__info-item">
                            Kho <span class="product-detail__info-value">
                                <?php echo (int)$product['So_Luong_Ton']; ?>
                            </span>
                        </li>

                        <?php if (!empty($product['Loai_Bao_Hanh'])): ?>
                            <li class="product-detail__info-item">
                                Loại bảo hành <span class="product-detail__info-value">
                                    <?php echo htmlspecialchars($product['Loai_Bao_Hanh']); ?>
                                </span>
                            </li>
                        <?php endif; ?>

                        <?php if (!empty($product['Han_Bao_Hanh'])): ?>
                            <li class="product-detail__info-item">
                                Hạn bảo hành <span class="product-detail__info-value">
                                    <?php echo htmlspecialchars($product['Han_Bao_Hanh']); ?>
                                </span>
                            </li>
                        <?php endif; ?>

                        <?php if (!empty($product['Tinh_Trang'])): ?>
                            <li class="product-detail__info-item">
                                Tình trạng <span class="product-detail__info-value">
                                    <?php echo htmlspecialchars($product['Tinh_Trang']); ?>
                                </span>
                            </li>
                        <?php endif; ?>


                        <li class="product-detail__info-item">
                            Gửi từ <span class="product-detail__info-value">
                                <?php echo htmlspecialchars($product['Tinh_Thanh_Pho']); ?>
                            </span>
                        </li>
                    </ul>
                </section>

                <!-- Mô tả sản phẩm -->

                <section class="detail__section product-detail__section">
                    <h2 class="product-detail__title">Mô tả sản phẩm</h2>
                    <div class="product-detail__description">
                        <?php
                        $raw = $product['Mo_Ta_Chi_Tiet'] ?? '';
                        $paragraphs = preg_split("/\n\s*\n/", trim($raw)); // Tách đoạn theo 2 dòng trống

                        foreach ($paragraphs as $para) {
                            $safeText = nl2br(htmlspecialchars(trim($para))); // Giữ xuống dòng bên trong đoạn
                            echo "<p>$safeText</p>"; // Mỗi đoạn là 1 thẻ <p>
                        }
                        ?>
                    </div>
                </section>


                <!-- Đánh giá sản phẩm -->
                <div class="detail__section">
                    <h2 class="detail__title">Đánh giá sản phẩm</h2>

                    <div class="review__overview">
                        <span class="review__score"></span>
                        <span class="review__star">★★★★★</span>

                        <!-- Filter đánh giá -->
                        <div class="review__filters">
                            <button class="review__filter-btn active" data-filter="all">Tất cả</button>
                            <button class="review__filter-btn" data-filter="5">5 sao</button>
                            <button class="review__filter-btn" data-filter="4">4 sao</button>
                            <button class="review__filter-btn" data-filter="3">3 sao</button>
                            <button class="review__filter-btn" data-filter="2">2 sao</button>
                            <button class="review__filter-btn" data-filter="1">1 sao</button>
                            <button class="review__filter-btn" data-filter="comment">Có bình luận</button>
                            <button class="review__filter-btn" data-filter="image">Có hình ảnh / video</button>
                        </div>

                    </div>


                    <!-- Danh sách đánh giá -->
                    <?php if (!empty($review['Anh_Danh_Gia1'])): ?>
                        <img src="data:image/webp;base64,<?php echo base64_encode($review['Anh_Danh_Gia1']); ?>" alt="ảnh đánh giá">
                    <?php endif; ?>
                    <div class="review__list" id="review__list">
                        <!-- review item (có bl + ảnh)-->
                        <div class="review__list">
                            <?php while ($review = $resultReview->fetch_assoc()): ?>
                                <div class="review__item"
                                    data-rating="<?php echo $review['So_Sao']; ?>"
                                    data-has-comment="<?php echo !empty($review['Binh_Luan']) ? 'true' : 'false'; ?>"
                                    data-has-image="<?php echo (!empty($review['Anh_Danh_Gia1']) || !empty($review['Anh_Danh_Gia2']) || !empty($review['Anh_Danh_Gia3'])) ? 'true' : 'false'; ?>">

                                    <div class="review__user">
                                        <span class="review__user-name"><?php echo htmlspecialchars($review['Ho_Ten']); ?></span>
                                        <span class="review__star"><?php echo str_repeat("★", $review['So_Sao']); ?></span>
                                    </div>

                                    <div class="review__date"><?php echo $review['Ngay_Danh_Gia']; ?></div>

                                    <p class="review__content"><?php echo nl2br(htmlspecialchars($review['Binh_Luan'])); ?></p>

                                    <div class="review__images">
                                        <?php if (!empty($review['Anh_Danh_Gia1'])): ?>
                                            <img src="data:image/webp;base64,<?php echo base64_encode($review['Anh_Danh_Gia1']); ?>" alt="ảnh đánh giá">
                                        <?php endif; ?>
                                        <?php if (!empty($review['Anh_Danh_Gia2'])): ?>
                                            <img src="data:image/webp;base64,<?php echo base64_encode($review['Anh_Danh_Gia2']); ?>" alt="ảnh đánh giá">
                                        <?php endif; ?>
                                        <?php if (!empty($review['Anh_Danh_Gia3'])): ?>
                                            <img src="data:image/webp;base64,<?php echo base64_encode($review['Anh_Danh_Gia3']); ?>" alt="ảnh đánh giá">
                                        <?php endif; ?>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        </div>

                        <!-- Phân trang đánh giá -->
                        <div class="review__pagination" id="review__pagination">
                            <button class="page-btn"><i class="fa-solid fa-angle-left"></i></button>
                            <button class="page-btn active">1</button>
                            <button class="page-btn">2</button>
                            <button class="page-btn">3</button>
                            <button class="page-btn">4</button>
                            <button class="page-btn">5</button>
                            <button class="page-btn">...</button>
                            <button class="page-btn">6</button>
                            <button class="page-btn">7</button>
                            <button class="page-btn">8</button>
                            <button class="page-btn"><i class="fa-solid fa-angle-right"></i></button>
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
    <script type="module" src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>

    <script type="module" src="/datn-project/datn-project/js/pages/product.js"></script>



    <!-- Popup ảnh -->
    <div class="popup-overlay" id="popupOverlay">
        <div class="popup-content">
            <button class="popup-btn prev" id="popupPrevBtn">&#8592;</button>
            <img id="popupImage" src="" alt="Ảnh đánh giá">
            <button class="popup-btn next" id="popupNextBtn">&#8594;</button>
        </div>
    </div>

    <!-- js cho product-detail -->
    <script type="module" src="/datn-project/datn-project/js/pages/product-detail.js"></script>

</body>

</html>