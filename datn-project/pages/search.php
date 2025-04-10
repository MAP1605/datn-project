<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'datn'; 

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$keyword = isset($_GET['q']) ? trim($_GET['q']) : '';
$sql = "SELECT ID_San_Pham, Ten_San_Pham, Gia_Ban, Anh_San_Pham1 
        FROM san_pham 
        WHERE Ten_San_Pham LIKE ? AND Trang_Thai_San_Pham = 'Đang bán'";

$stmt = $conn->prepare($sql);
$searchTerm = "%" . $keyword . "%";
$stmt->bind_param("s", $searchTerm);
$stmt->execute();
$result = $stmt->get_result();
?>


<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tìm kiếm: <?php echo htmlspecialchars($keyword); ?></title>
    <!-- CSS (main) -->
    <link rel="stylesheet" href="/datn-project/css/main.css">
    <!-- CSS (font) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <!-- CSS (icon) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <!-- logo ở tên miền -->
    <link rel="icon" type="image/png" href="/datn-project/assets/images/CuongDao__Logo-PEARNK.png" sizes="16x16">

</head>

<body>

    <!-- Start header -->
    <header id="header">
    </header>
    <!-- End header -->

    <main class="search-result container">
    <h2 class="search-result__title">Kết quả cho: "<?php echo htmlspecialchars($keyword); ?>"</h2>
    <div class="product-list">
      <?php if ($result->num_rows > 0): ?>
        <?php while ($row = $result->fetch_assoc()): ?>
          <div class="product-item">
            <a href="product-detail.php?id=<?php echo $row['ID_San_Pham']; ?>">
              <img class="product-item__img" src="../get-image.php?id=<?php echo $row['ID_San_Pham']; ?>" alt="">
              <h4 class="product-item__name"><?php echo $row['Ten_San_Pham']; ?></h4>
              <div class="product-item__price">
                <?php echo number_format($row['Gia_Ban'], 0, ',', '.') . '₫'; ?>
              </div>
            </a>
          </div>
        <?php endwhile; ?>
      <?php else: ?>
        <p>Không tìm thấy sản phẩm nào.</p>
      <?php endif; ?>
    </div>
  </main>


    <!-- Start footer -->
    <footer id="footer">
    </footer>
    <!-- End footer -->

    <!-- JS: load component header/footer -->
    <script type="module" src="/datn-project/js/utils/components-loader-pages.js"></script>
    <script type="module" src="/datn-project/js/pages/search.js"></script>

</body>

</html>