<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'DATN';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("❌ Kết nối thất bại: " . $conn->connect_error);
}

// Lấy ID sản phẩm hiện tại
$currentId = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Lấy sản phẩm khác sản phẩm hiện tại
$sql = "
    SELECT * FROM San_Pham 
    WHERE Trang_Thai_San_Pham = 'Đang bán'
    " . ($currentId > 0 ? "AND ID_San_Pham != $currentId" : "") . "
    ORDER BY RAND()
    LIMIT 30
";

$result = $conn->query($sql);
if (!$result) {
    die("❌ Lỗi truy vấn: " . $conn->error);
}

$count = 0;
?>

<div class="product__list">
    <?php while ($row = $result->fetch_assoc()) {
        $id = $row['ID_San_Pham'];
        $isHidden = $count >= 20 ? ' product__item--hidden' : '';
        $base64Img = base64_encode($row['Anh_San_Pham1']);
        $discount = ($row['Gia_Goc'] > 0) ? round((($row['Gia_Goc'] - $row['Gia_Ban']) / $row['Gia_Goc']) * 100) : 0;
    ?>
        <a href="/datn-project/datn-project/pages/product-detail.php?id=<?php echo $id; ?>" class="product__item<?php echo $isHidden; ?>" data-id="<?php echo $id; ?>">
            <div class="product__img-wrap">
                <img src="data:image/jpeg;base64,<?php echo $base64Img; ?>" alt="<?php echo htmlspecialchars($row['Ten_San_Pham']); ?>" class="product__img" />
                <?php if ($discount > 0): ?>
                    <span class="product__discount-tag">-<?php echo $discount; ?>%</span>
                <?php endif; ?>
            </div>

            <h3 class="product__name"><?php echo $row['Ten_San_Pham']; ?></h3>
            <div class="product__price-wrap">
                <span class="product__price"><?php echo number_format($row['Gia_Ban'], 0, ',', '.') . 'đ'; ?></span>
                <span class="product__price-old"><?php echo number_format($row['Gia_Goc'], 0, ',', '.') . 'đ'; ?></span>
            </div>
            <div class="product__meta">
                <span class="product__stars">⭐ <?php echo $row['So_Sao_Danh_Gia']; ?></span>
                <span class="product__sold">Đã bán <?php echo $row['Da_Ban']; ?></span>
            </div>
        </a>
    <?php $count++;
    } ?>
</div>