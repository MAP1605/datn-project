<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối CSDL trực tiếp
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'DATN';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("❌ Kết nối thất bại: " . $conn->connect_error);
}

// Lấy 40 sản phẩm ngẫu nhiên
$sql = "SELECT * FROM San_Pham ORDER BY RAND() LIMIT 3";
$result = $conn->query($sql);

if (!$result) {
    die("❌ Lỗi truy vấn: " . $conn->error);
}

$count = 0;
?>

<!-- Start product (Gợi ý hôm nay) -->
<section class="products">
    <div class="container container__product">
        <h2 class="product__title">GỢI Ý HÔM NAY</h2>

        <div class="product__list" id="product-list">
            <?php while ($row = $result->fetch_assoc()) {
                $isHidden = $count >= 20 ? ' product__item--hidden' : '';
                $base64Img = base64_encode($row['Anh_San_Pham']);
            ?>
                <div class="product__item<?php echo $isHidden; ?>" data-id="<?php echo $row['ID_San_Pham']; ?>">
                    <div class="product__img-wrap">
                        <img src="data:image/jpeg;base64,<?php echo $base64Img; ?>" alt="<?php echo $row['Ten_San_Pham']; ?>" class="product__img" />
                        <span class="product__discount-tag">
                            <?php
                            $discount = 0;
                            if ($row['Gia_Goc'] > 0) {
                                $discount = round((($row['Gia_Goc'] - $row['Gia_Ban']) / $row['Gia_Goc']) * 100);
                            }
                            echo $discount > 0 ? "-{$discount}%" : "";
                            ?>
                        </span>
                    </div>

                    <h3 class="product__name"><?php echo $row['Ten_San_Pham']; ?></h3>
                    <div class="product__price-wrap">
                        <span class="product__price"><?php echo number_format($row['Gia_Ban'], 0, ',', '.') . 'đ'; ?></span>
                        <span class="product__price-old"><?php echo number_format($row['Gia_Goc'], 0, ',', '.') . 'đ'; ?></span>
                    </div>
                    <div class="product__meta">
                        <span class="product__stars"> ⭐ <?php echo $row['So_Sao_Danh_Gia']; ?></span>
                        <span class="product__sold">Đã bán <?php echo $row['Da_Ban']; ?></span>
                    </div>
                </div>

                <div class="product__item product__item--hidden<?php echo $isHidden; ?>">
                    <div class="product__img-wrap">
                        <img src="data:image/jpeg;base64,<?php echo $base64Img; ?>" alt="<?php echo $row['Ten_San_Pham']; ?>" class="product__img" />
                        <span class="product__discount-tag">
                            <?php
                            $discount = 0;
                            if ($row['Gia_Goc'] > 0) {
                                $discount = round((($row['Gia_Goc'] - $row['Gia_Ban']) / $row['Gia_Goc']) * 100);
                            }
                            echo $discount > 0 ? "-{$discount}%" : "";
                            ?>
                        </span>
                    </div>

                    <h3 class="product__name"><?php echo $row['Ten_San_Pham']; ?></h3>
                    <div class="product__price-wrap">
                        <span class="product__price"><?php echo number_format($row['Gia_Ban'], 0, ',', '.') . 'đ'; ?></span>
                        <span class="product__price-old"><?php echo number_format($row['Gia_Goc'], 0, ',', '.') . 'đ'; ?></span>
                    </div>
                    <div class="product__meta">
                        <span class="product__stars"> ⭐ <?php echo $row['So_Sao_Danh_Gia']; ?></span>
                        <span class="product__sold">Đã bán <?php echo $row['Da_Ban']; ?></span>
                    </div>
                </div>
            <?php $count++;
            } ?>
        </div>

        <!-- Button xem thêm -->
        <div class="product__see-more-wrap">
            <button class="product__see-more-btn" id="show-more-product">Xem thêm</button>
        </div>
    </div>
</section>
<!-- End product -->