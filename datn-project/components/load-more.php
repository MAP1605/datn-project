<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'DATN';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Nhận danh sách ID đã hiển thị từ JS
$data = json_decode(file_get_contents("php://input"), true);
$loaded = isset($data['loaded']) ? $data['loaded'] : [];

// Chuyển danh sách ID thành chuỗi
$idList = implode(",", array_map('intval', $loaded));

// Lọc sản phẩm "Đang bán" và loại ID đã hiển thị
$where = $idList
    ? "WHERE ID_San_Pham NOT IN ($idList) AND Trang_Thai_San_Pham = 'Đang bán'"
    : "WHERE Trang_Thai_San_Pham = 'Đang bán'";

// Truy vấn lấy sản phẩm
$sql = "SELECT * FROM San_Pham $where ORDER BY RAND() LIMIT 3";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $img = base64_encode($row['Anh_San_Pham1']);
?>
    <div class="product__item" data-id="<?php echo $row['ID_San_Pham']; ?>">
        <div class="product__img-wrap">
            <img src="data:image/jpeg;base64,<?php echo $img; ?>" class="product__img" />
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
            <span class="product__stars">⭐ <?php echo $row['So_Sao_Danh_Gia']; ?></span>
            <span class="product__sold">Đã bán <?php echo $row['Da_Ban']; ?></span>
        </div>
    </div>
<?php
}
?>