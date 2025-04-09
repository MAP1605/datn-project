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
                        // Chuyển \n\n thành <p>, \n thường thành <br>
                        $converted = nl2br(htmlspecialchars($raw));
                        echo "<p>$converted</p>";
                        ?>
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
                        <div class="review__list" id="review__list">
                            <!-- review item (có bl + ảnh)-->
                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>
                            </div>
                            <!-- review item (có bl + ko ảnh)-->
                            <div class="review__item " data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                            </div>
                            <!-- review item (có bl + ảnh)-->
                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>
                            </div>
                            <!-- review item (có bl + ko ảnh)-->
                            <div class="review__item " data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                            </div>
                            <!-- review item (ko bl + ko ảnh)-->
                            <div class="review__item" data-rating="3" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            </div>
                            <!-- review item (có bl + ảnh)-->
                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>
                            </div>
                            <!-- review item (có bl + ko ảnh)-->
                            <div class="review__item " data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                            </div>
                            <!-- review item (ko bl + ko ảnh)-->
                            <div class="review__item" data-rating="3" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            </div>
                            <!-- review item (có bl + ảnh)-->
                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>
                            </div>
                            <!-- review item (có bl + ko ảnh)-->
                            <div class="review__item " data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                            </div>
                            <!-- review item (có bl + ảnh)-->
                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>
                            </div>
                            <!-- review item (có bl + ko ảnh)-->
                            <div class="review__item " data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                            </div>
                            <!-- review item (ko bl + ko ảnh)-->
                            <div class="review__item" data-rating="3" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            </div>
                            <!-- review item (có bl + ảnh)-->
                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>
                            </div>
                            <!-- review item (có bl + ko ảnh)-->
                            <div class="review__item " data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Lần đầu mua hàng giá trị cao cũng hốt. Mà mua máy thấy đúng chính
                                    hãng. Sử dụng thấy mướt. Mua đúng 5/5 được trợ giá tốt
                                    có 15 củ</p>
                            </div>
                            <!-- review item (ko bl + ko ảnh)-->
                            <div class="review__item" data-rating="3" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cường Ymir</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-12-25 | Phân loại hàng: Midnight</div>
                            </div>
                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Thomas Holland</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-05-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Myself radio teacher great resource paper key may manager
                                    everything heart foot.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Priscilla Goodwin</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-09 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Forward decision skin collection piece bag everyone reason
                                    officer little away national
                                    look policy summer.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Susan Oneal</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-11-23 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Edge land cut two thing personal bit even protect school else
                                    choice worker a.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Lauren Ramirez</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-06-01 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Timothy Russell</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Be peace process use government expert teacher among position
                                    member family sister begin
                                    speak paper base.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Sabrina Middleton</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-06-14 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Bag politics street contain evidence it style camera child
                                    particularly oil day.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Gerald Garcia</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-10-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Woman foot outside so customer stock where themselves strategy
                                    within.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Karen Velazquez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-10-05 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Entire amount key heavy religious environmental generation trade
                                    pressure tonight watch
                                    arrive hear require let health reflect talk.</p>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Craig Hopkins</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-12-20 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Because should its available good middle population challenge
                                    happy choose raise concern
                                    lot many single yard coach.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Joseph Peterson</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-09-20 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Green common sit seat data although land heart need computer dog
                                    ready mouth player most
                                    guess often ago.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Rachael Browning</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-05-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">They serve major check body official do expect card.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Laura Adams</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-04-10 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Evidence though at build at prepare finally tough remember even
                                    skill share what.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Chelsey Morris</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-11-25 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Kenneth Martinez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-04-16 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Late strategy street suggest heavy firm cup minute daughter
                                    people economy performance
                                    interest forget great tell all fine century produce.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Robert Reed</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-03-10 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Another fight direction raise we arm according practice million
                                    together good about
                                    include security.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Andrew Schultz</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-09-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Among professor security team computer behavior city pressure
                                    member candidate.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Alan Barrett</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-07-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Act official score quality we bad outside real should center wait
                                    product wear hear
                                    explain every join hair save.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Emily King</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2025-02-09 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Leg discuss project author set scene maybe floor reveal line
                                    child war officer force main
                                    continue turn safe hope.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">George Perez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-05-19 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Consumer issue news others operation small woman glass product
                                    white its official watch
                                    five coach TV old especially.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Tabitha Vasquez</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2025-01-28 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Into hand time wide hour enter interest yourself everybody prove
                                    ask whose establish
                                    never organization.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">William Chaney</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-08-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Fast brother seek agent fine campaign increase wife through
                                    community person teach south
                                    not.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Emily Esparza</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-09-10 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Record family different ahead already the form view mention play
                                    remember wrong moment
                                    behavior anyone recently.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Kevin Tucker</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-05-26 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Sometimes authority young role sit worry some prepare until
                                    contain wrong almost might.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Charles Cooley</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2025-03-20 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Model wonder structure herself decade moment but west church
                                    generation why general woman
                                    executive arm college face.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Briana Marshall</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-10-28 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Bag forget environmental degree hard security performance food
                                    increase hard a five there
                                    year story bit either relationship PM hard.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Jeffrey Smith</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-07-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Beyond billion community whole machine ago everyone receive
                                    marriage cup organization
                                    send another appear.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Travis Wilson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-17 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Know executive minute investment stuff organization source home
                                    strong.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Ralph Hayes</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-05-29 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Total happen stage cut task though involve ok probably single say
                                    cover glass worker
                                    teacher nor phone.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Marilyn Martinez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-09 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Mark Blanchard</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-08-02 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Study stage something like physical court beautiful debate take
                                    rather level next ground
                                    focus near speak stand.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Gabrielle White</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-07-30 | Phân loại hàng: Midnight</div>
                                <p class="review__content">General later book spring suddenly just manage everyone already
                                    necessary hotel will when
                                    age report allow argue training network decade.</p>

                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Dr. John Barker</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2023-05-22 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Once country suddenly laugh high within watch rest popular
                                    despite entire argue herself
                                    away require forget.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Andrew Solomon</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-12-31 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Michelle Miller</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-01-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Environment exist political record us too between protect
                                    available side.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Valerie Reid</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-22 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Fire season certain peace simply huge discussion hot how kitchen
                                    medical claim market
                                    along level cell.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Shannon Parker</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-09-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Else whom energy before fill purpose theory fish unit coach work
                                    benefit class hear cover
                                    but find child.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Ashley Lewis</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Campaign call Congress realize push within show care stand number
                                    compare fall finish
                                    probably something maintain statement success network.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Alexandra Sullivan</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-07-23 | Phân loại hàng: Midnight</div>
                                <p class="review__content">East affect central whom couple material understand since ever
                                    organization set maybe.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Ryan Lopez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-07-18 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Student have process current who break development role happy
                                    certainly animal position
                                    account should western conference miss color short.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Brianna Knight</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-08-09 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Minute source this company response subject national area
                                    southern wish tough beautiful
                                    close lose stuff positive statement for then.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Frances Martinez PhD</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-08-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Student share to evidence sign specific keep agreement project
                                    knowledge forget really.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Russell Oliver</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-07-26 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Less wait president he professor source sister challenge rather
                                    share garden food main
                                    soldier pay life yet control produce play sea.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Sara Nelson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-12-01 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Offer ability until dark alone purpose thousand movement single
                                    hotel hot weight once
                                    region smile action.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Laurie Chavez</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-08-02 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Sister travel cultural other interest eat remember great
                                    interview process bill little
                                    once.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Lee Larsen</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-08-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Senior forward physical politics my coach change various assume
                                    little stand teacher kind
                                    interview call fund white fish pull.</p>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Leslie Morris</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-08-27 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Three continue well although age wife pretty walk political
                                    understand doctor religious
                                    thank special again bar situation once begin.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Megan Shelton</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-09-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Case fine imagine travel trip win school design firm billion
                                    follow simply high bed this
                                    deep since center.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Ricardo Richardson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-11-09 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Simply car often raise natural thing see get ever dinner during
                                    hot feel understand fact
                                    artist.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Rachel Rowe</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-11-10 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Morning store much defense would bank continue soldier until
                                    season decade again together
                                    involve easy.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Charles Long</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-12-12 | Phân loại hàng: Midnight</div>
                                <p class="review__content">First how go rise real skin middle paper table past two defense
                                    interview certain form.
                                </p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Joyce Clark</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-12-29 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Katherine Chase</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-05-30 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Small police stand real article real see face cause work over.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Lucas Hooper</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-03-27 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Chance imagine group fear heavy see hope better our benefit pull
                                    ask.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Keith Gates</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2025-01-23 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Nicole Brown</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-12-26 | Phân loại hàng: Midnight</div>
                                <p class="review__content">That I degree beautiful stuff determine career low those middle
                                    address range blue
                                    western strategy drug attack state.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Jeffrey Sullivan</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2023-06-01 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Think color pressure compare pattern but lose task shake million
                                    chair country thus
                                    number candidate our care camera company.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Maria Elliott DDS</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-05-01 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Language thus already speak building whose end next change thing
                                    pay in experience admit
                                    operation share.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Jason Richards</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-10-30 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Price late prepare religious deal force challenge all forward
                                    body interest these owner
                                    federal ago everything whose.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Veronica Henderson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-04-01 | Phân loại hàng: Midnight</div>
                                <p class="review__content">College half step TV low after save much role.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Sarah Ross</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-03-01 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Individual station less this process career dinner trade day
                                    impact sort story buy bad
                                    simple play economic nearly.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Angel White</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-18 | Phân loại hàng: Midnight</div>
                                <p class="review__content">The senior bank security reason final type sound wall.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Carol Robinson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-06-22 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Thing may security college list national mother happen among tend
                                    strong Republican order
                                    oil lot manage reach total two attack.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Nicholas Romero</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-07-15 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Patrick Bailey</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-11-08 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Year lawyer walk economic radio pay hospital outside establish
                                    determine.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Angela Wright</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-12-23 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Test blue store yeah catch similar answer tax news tell these
                                    matter enough good
                                    interesting.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Daniel Padilla</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-11-03 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Lori Harper</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-09-04 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Enjoy store child prepare top science which piece where eat film.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Mr. Lonnie Kelley Jr.</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-10-31 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Meet factor give option similar in choose you should idea
                                    political college run improve.
                                </p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Ashley Rojas</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-04-17 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Start wide girl high factor student list their it believe charge
                                    see what beautiful coach
                                    gas energy unit.</p>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Jacob Hall</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-06-28 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Rest smile near on believe table owner green floor final word leg
                                    sign including front
                                    myself up police board seem.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Elizabeth Good</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-08-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">This forget responsibility side fact about green moment reflect.
                                </p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Anne Benson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-20 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Tax suddenly senior answer full range lawyer out specific.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Philip Carter</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-09-26 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Door star yard offer tend summer consumer the meeting young
                                    himself condition color
                                    position plant our behavior.</p>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">John Kelly</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2023-06-17 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Attention shoulder miss two fine very human discuss time recently
                                    father read finally.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Taylor Jones</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-10-14 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Worker focus middle debate as political wait simple cost recent
                                    again majority small
                                    magazine present agency ready peace amount.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Kristin Campbell</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2024-12-22 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Range politics animal term speech specific yet trial someone
                                    others charge state into
                                    chair action watch that foot great loss.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">John Hill</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-09-14 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Develop responsibility from it government girl bill just six
                                    meeting step because concern
                                    health life college.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Jessica Cochran</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-11-26 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Real democratic child development site science home factor share
                                    rest including use bar
                                    minute management word experience product four else it.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Brian Smith</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-07-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Respond one any cup never particular same item fact star
                                    interview require generation
                                    artist second.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Emily Smith</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-11-04 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Give per girl wife heavy work imagine economic serious year have
                                    between represent group
                                    audience back example people feeling.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Helen Pace</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-07-18 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Even series compare start language eat computer well participant
                                    market world success
                                    most scientist recent hear their wear miss.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Joan Greer</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-01-03 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Analysis rest way possible course push role child everyone
                                    difficult role should blood.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Keith Farrell</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-01-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Record worker second bring music treatment or far friend city.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Amy Clayton</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-10-01 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Young word significant woman magazine under often fine conference
                                    then fill air serve
                                    choice other camera away today.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Kelsey Santos</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-10-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Expert movie impact international foot trade idea necessary
                                    section.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Kyle Foster</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-10-05 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Close child must hear into near last instead north lawyer miss
                                    piece world position raise
                                    player cold.</p>

                            </div>


                            <div class="review__item" data-rating="1" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cody Parker</span>
                                    <span class="review__star">★</span>
                                </div>
                                <div class="review__date">2023-05-27 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Magazine program television enter area off toward head compare
                                    test him model look
                                    represent budget walk.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Craig Gibson</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-06-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Father task eat alone Mrs address laugh attention former card
                                    affect him society.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Danielle Garcia</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-01-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Machine catch environment believe list have laugh cover player
                                    government three try him
                                    skill office head.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">James Hancock</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2023-09-03 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">James Carlson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-09-13 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Whatever instead glass help peace eye surface recent which Mrs
                                    five value data watch
                                    father letter field fine ready shake among.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Marcus Patterson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-04-19 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Remain civil dinner window may dark particularly expert happy
                                    home easy season media
                                    maybe consumer wind bed finally bad wide.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Vanessa Young</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-12 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Do fact within eight loss teach by none speak among positive.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Brenda Williams</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-07-23 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Assume learn somebody deal oil effort experience himself
                                    represent other.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Matthew King</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-01-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Prevent mother young little relate produce food card rest visit
                                    election he shake.</p>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Shawn Knight</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-12-22 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Marriage view win worry fly growth together some party view
                                    police person rather
                                    commercial create memory language process fill husband.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Shelby Brown</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-06-28 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Vote least share still his figure address cut difficult this
                                    professor entire laugh
                                    official.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="1" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cory Taylor</span>
                                    <span class="review__star">★</span>
                                </div>
                                <div class="review__date">2023-10-16 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Jeremy Costa</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-01-20 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Remember standard vote standard cost voice across thought hundred
                                    data interest wish
                                    inside free court apply.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Janet Sanchez</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2023-10-02 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">David Stewart</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2024-08-02 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Rise black board work important ok over leader own thank in
                                    commercial discussion someone
                                    safe activity.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Elizabeth Gomez</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2025-03-28 | Phân loại hàng: Midnight</div>
                                <p class="review__content">During quality end plant wear want new pressure class kind police
                                    instead ok social.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Theresa Mullins</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">For force husband anyone window would nice eight baby plant
                                    forget describe chance.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Lori Harris</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-12-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Feel cold strong boy career case wide want business speak teacher
                                    room behavior audience
                                    manage somebody care bar.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Richard Moore</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-05-20 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Student figure myself care address down give owner receive
                                    political something author
                                    tree hear believe.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Lisa Fitzgerald</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Sound huge challenge theory young arm visit act less up arrive
                                    understand return.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Matthew Carter</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-07-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Work two late seat region rest moment first fast.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Peter Yates</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-12-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Key former anyone theory project process become to computer
                                    specific such both sound six
                                    protect data dark rock goal.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Andrew Williams</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-09-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Skill national house station guy away good away TV.</p>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Michelle Davis</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-10-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Within business during common feeling someone simply win center
                                    no indeed fish room bring
                                    pass record yes thought drug.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Colleen Cooper</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-07-07 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Price operation expect deep seat fund increase quite seat film
                                    interesting city federal
                                    serve rise.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Brian Hale</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-06-02 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Voice seek Congress get although ago per myself too before
                                    community enjoy attack budget
                                    support professor one threat.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Vincent Mercado</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-03-19 | Phân loại hàng: Midnight</div>
                                <p class="review__content">During play keep investment surface century live everybody kind
                                    movie middle.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Dennis Bates</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-11-08 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Rest cut major north quality allow mind worry pull individual
                                    nature land.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Collin Baker</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-08 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Return other cut visit how each why allow anything scientist not
                                    oil pass reduce pass.
                                </p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Dawn Valencia</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-11-14 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Carol Gilbert</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-04-19 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Event together community use commercial analysis continue
                                    difference agree part
                                    collection.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Ashley Murphy</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2024-04-27 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Town paper politics traditional page win sit manage far guy large
                                    and this.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Krystal Moore</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-11-16 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Sandra Murray</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-07-25 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Christine Mueller</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-07-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Like read out theory between form partner course home character
                                    hit.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Toni Hernandez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-03-04 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Strong heart data choose option produce animal great support eye.
                                </p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Anna Johnson</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-02-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Live end police every degree receive if role debate election.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cheryl Brewer</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-06-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Apply seat argue room travel eye assume risk try onto.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Ashley Cunningham</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-07-16 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Miss deep magazine according month opportunity main special per
                                    leader trade tell good
                                    kind.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="1" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Emily Meyers</span>
                                    <span class="review__star">★</span>
                                </div>
                                <div class="review__date">2023-05-05 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Jimmy Hayes MD</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-06-22 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Level religious city Congress throughout have ago decade race
                                    small knowledge move
                                    behind.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Andrea Bennett</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Thing say service occur audience force describe officer save
                                    professional attention
                                    including level authority turn small commercial.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">William Wood</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-09-02 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Approach treatment personal value gun next term leader might
                                    though development avoid at
                                    sister stay ok control push course traditional.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">James Martinez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-09-29 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Card economic relationship office over well tonight agree stuff
                                    either.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Travis Robles</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-29 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Guess PM respond art leave agency young measure appear.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Wendy Gordon</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-10-29 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Deep hospital themselves turn most girl first carry fact check
                                    standard most fine try
                                    might her.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Kayla Carlson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-09-04 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Fast easy involve machine man decision or interview wall five
                                    arrive.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Rodney Lane</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-07-30 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Guy population region high seat wind another answer company.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Kimberly Ball</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-05-13 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Walter Cook</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2025-02-24 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Somebody near whatever send his air inside build recent very he
                                    great.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="2" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Andrew Martinez</span>
                                    <span class="review__star">★★</span>
                                </div>
                                <div class="review__date">2023-04-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Beyond health among film top help return south second head up me.
                                </p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Gregory Wade</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-07-02 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Wear newspaper form quality vote market government bag determine
                                    life its up
                                    environmental light game.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Richard Hernandez</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2025-02-07 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Debate represent sign audience wrong machine school story in
                                    later shoulder increase
                                    three only one.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">David Crawford</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-01-07 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Decade hour other military admit color give we make speak alone
                                    step apply.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Thomas Jimenez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-07-17 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Design cost gun any choose force financial memory citizen high
                                    front from field evening
                                    trip chair little thus.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Emily Jacobs</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-06-30 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Official movement wonder scene follow moment laugh consider
                                    enough system product threat
                                    news measure fast wall land.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Michael Hughes</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-10-26 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Margaret Robinson</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-03-24 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Work physical property begin read herself gas sign together role
                                    true meet network
                                    hospital word mention.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Kari Keith</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-07-21 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Show suggest investment thus environmental our political table
                                    reality less blood civil
                                    can international fall question career.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Roberto Carter</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-05-09 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Start better where close paper population this official PM degree
                                    board organization.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Patricia Thomas</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2025-03-12 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Far stay would energy bring raise fish deal draw family
                                    professional into blood deal head
                                    which region real.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Patricia Flores</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-02-06 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Beautiful open Congress reveal speech particular group require
                                    idea across hard run four.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Anna Miller</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-03-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">East write process building tax two mind moment drug.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Gregory Jones</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-01-05 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Steven Floyd</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-06-01 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Whether go single foot face election run because wall something
                                    forward suffer can
                                    daughter wall subject land guy imagine per.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Melanie Flores</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-02-11 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Form reveal authority house among run thus thank pressure teacher
                                    perform half only ask
                                    near kid important base time any.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Peter Riley</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-06-20 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Issue reduce my stand check task generation discuss major history
                                    both including drive
                                    meet cup kitchen result.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Stacey Davis</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-06-17 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Diana Johnson</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-04-08 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Those success teacher nothing significant game court economy idea
                                    behind role.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Elizabeth Smith</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-03-22 | Phân loại hàng: Midnight</div>
                                <p class="review__content">White indeed year my clear nature win medical system since term
                                    significant.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Joseph Sanchez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-08-23 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Either she agency community both purpose per son dream tax real
                                    including.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Nicole Huynh</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-03-27 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Include truth speak describe onto lay number long discuss effect
                                    traditional exist
                                    however TV.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Elizabeth Combs</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2023-06-16 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Fast city event else series involve ready vote sell moment think
                                    why work card figure.
                                </p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Mark Chen</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2024-11-08 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cory Bennett</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-11-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Ever to able recognize institution article cell shoulder occur.
                                </p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Cynthia Davenport</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-10 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Measure suggest cut fish vote similar try dog design after I
                                    speak themselves.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Stephen Dean</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-08-23 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Strategy stock door kid eat feeling president most politics whose
                                    customer amount because
                                    half our get serve describe.</p>

                            </div>


                            <div class="review__item" data-rating="3" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Patrick Gonzalez</span>
                                    <span class="review__star">★★★</span>
                                </div>
                                <div class="review__date">2025-02-25 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Group hope simple between generation season fight change save boy
                                    medical since within
                                    floor oil own job store every do.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Brooke Le</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-06-24 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Virginia Banks</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-03-25 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Jonathan Carter</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-09 | Phân loại hàng: Midnight</div>
                                <p class="review__content">History step what against of development his discuss news high
                                    want mind peace
                                    administration term fill present standard program party.</p>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Stuart Berger</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-11-29 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Allow Republican even good recognize toward left drive sing.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Nicole Spencer</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2023-11-26 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Kitchen collection you nature much everything writer serve
                                    responsibility eight city.</p>

                            </div>


                            <div class="review__item" data-rating="1" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Michelle Brooks</span>
                                    <span class="review__star">★</span>
                                </div>
                                <div class="review__date">2025-02-24 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Onto management market pressure address common break enjoy speech
                                    upon buy personal
                                    skill.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Lauren Stevens</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-04-10 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Challenge language consumer notice thus consider watch thought
                                    just say behind hit
                                    recently own.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Ariel Thomas</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2025-03-15 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Town knowledge student camera sense war few step song site.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="true" data-has-image="true">
                                <div class="review__user">
                                    <span class="review__user-name">Alec Shea</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-10-04 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Over wife great above tough remember even hot best buy most coach
                                    shoulder well thank
                                    push.</p>

                                <div class="review__images">
                                    <img src="../assets/images/product__detail/detail__media-review-img-1.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-2.1.webp"
                                        alt="ảnh đánh giá">
                                    <img src="../assets/images/product__detail/detail__media-review-img-3.1.webp"
                                        alt="ảnh đánh giá">
                                </div>

                            </div>


                            <div class="review__item" data-rating="4" data-has-comment="true" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Tiffany Sawyer</span>
                                    <span class="review__star">★★★★</span>
                                </div>
                                <div class="review__date">2024-11-05 | Phân loại hàng: Midnight</div>
                                <p class="review__content">Hospital rest peace hundred red prepare usually community then
                                    hundred add our because
                                    bring how while.</p>

                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Andrea Perez</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2023-06-14 | Phân loại hàng: Midnight</div>


                            </div>


                            <div class="review__item" data-rating="5" data-has-comment="false" data-has-image="false">
                                <div class="review__user">
                                    <span class="review__user-name">Maria Rowe</span>
                                    <span class="review__star">★★★★★</span>
                                </div>
                                <div class="review__date">2024-09-24 | Phân loại hàng: Midnight</div>


                            </div>
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