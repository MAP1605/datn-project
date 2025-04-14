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
    die("<p class='error'>❌ Kết nối CSDL thất bại: " . $conn->connect_error . "</p>");
}

// Truy vấn danh mục
$sql = "SELECT * FROM Danh_Muc WHERE Trang_Thai = 'Hoạt động' LIMIT 20";
$result = $conn->query($sql);

if (!$result) {
    die("<p class='error'>❌ Lỗi truy vấn SQL: " . $conn->error . "</p>");
}

// Kiểm tra không có dòng nào
if ($result->num_rows === 0) {
    echo "<p class='warning'>⚠️ Hiện chưa có danh mục nào đang hiển thị!</p>";
}
?>

<!-- Start category (danh mục) -->
<section class="category2">
    <div class="container container__category">
        <h2 class="category__title">Danh mục</h2>
        <div class="category__list-wrapper">
            <div class="category__list">

                <?php while ($row = $result->fetch_assoc()) { ?>
                    <a href="/datn-project/datn-project/pages/search.php?category_id=<?= $row['ID_Danh_Muc'] ?>" class="category__item">
                        <img src="data:image/jpeg;base64,<?= base64_encode($row['Anh_Danh_Muc_Blob']); ?>" alt="<?= $row['Ten_Danh_Muc'] ?>" class="category__icon">
                        <span class="category__name"><?= $row['Ten_Danh_Muc'] ?></span>
                    </a>

                <?php } ?>

            </div>
        </div>
    </div>
</section>
<!-- End category -->