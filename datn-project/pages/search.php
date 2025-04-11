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
$min_price = isset($_GET['min_price']) ? intval($_GET['min_price']) : 0;
$max_price = isset($_GET['max_price']) ? intval($_GET['max_price']) : 1000000000;
$brands = isset($_GET['brand']) ? $_GET['brand'] : [];
$categories = isset($_GET['category']) ? $_GET['category'] : [];
$rating = isset($_GET['rating']) ? intval($_GET['rating']) : 0;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 20;
$offset = ($page - 1) * $limit;

$where = "WHERE Ten_San_Pham LIKE ? AND Trang_Thai_San_Pham = 'Đang bán' AND Gia_Ban BETWEEN $min_price AND $max_price";

if (!empty($brands)) {
    $inBrands = implode("','", array_map([$conn, 'real_escape_string'], $brands));
    $where .= " AND Thuong_Hieu IN ('$inBrands')";
}
if (!empty($categories)) {
    $inCats = implode("','", array_map([$conn, 'real_escape_string'], $categories));
    $where .= " AND Danh_Muc IN ('$inCats')";
}
if ($rating > 0) {
    $where .= " AND So_Sao_Danh_Gia >= $rating";
}

$sql = "SELECT * FROM san_pham $where LIMIT $limit OFFSET $offset";
$stmt = $conn->prepare($sql);
$searchTerm = "%" . $keyword . "%";
$stmt->bind_param("s", $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

// Đếm tổng số sản phẩm để tính tổng số trang
$countSql = "SELECT COUNT(*) FROM san_pham $where";
$stmtCount = $conn->prepare($countSql);
$stmtCount->bind_param("s", $searchTerm);
$stmtCount->execute();
$stmtCount->bind_result($totalProducts);
$stmtCount->fetch();
$totalPages = ceil($totalProducts / $limit);
$stmtCount->close();
?>


<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PEARNK - Tìm kiếm</title>
    <!-- CSS (main) -->
    <link rel="stylesheet" href="../css/main.css">
    <!-- CSS (font) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <!-- CSS (icon) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <!-- logo ở tên miền -->
    <link rel="icon" type="image/png" href="../assets/images/CuongDao__Logo-PEARNK.png" sizes="16x16">

</head>

<body>

    <!-- Start header -->
    <header id="header">
    </header>
    <!-- End header -->

    <main class="search-page container">
    <form id="searchFilterForm" method="GET" class="search-page__content">
      <aside class="search-filter">
        <h3 class="search-filter__title">Bộ lọc tìm kiếm</h3>

        <div class="search-filter__group">
          <p class="search-filter__heading">Tất cả danh mục</p>
          <label class="search-filter__checkbox"><input type="checkbox" name="category[]" value="Pin laptop"> Pin laptop</label>
          <label class="search-filter__checkbox"><input type="checkbox" name="category[]" value="Bộ sạc laptop"> Bộ sạc laptop</label>
          <label class="search-filter__checkbox"><input type="checkbox" name="category[]" value="Gaming"> Gaming</label>
          <button type="button" class="search-filter__more">Xem thêm</button>
        </div>

        <div class="search-filter__group">
          <p class="search-filter__heading">Nơi bán</p>
          <label class="search-filter__checkbox"><input type="checkbox" name="location[]" value="Hà Nội"> Hà Nội</label>
          <label class="search-filter__checkbox"><input type="checkbox" name="location[]" value="Hồ Chí Minh"> Hồ Chí Minh</label>
          <label class="search-filter__checkbox"><input type="checkbox" name="location[]" value="Thái Bình"> Thái Bình</label>
          <button type="button" class="search-filter__more">Xem thêm</button>
        </div>

        <div class="search-filter__group">
          <p class="search-filter__heading">Thương hiệu</p>
          <label class="search-filter__checkbox"><input type="checkbox" name="brand[]" value="ASUS"> ASUS</label>
          <label class="search-filter__checkbox"><input type="checkbox" name="brand[]" value="MSI"> MSI</label>
          <label class="search-filter__checkbox"><input type="checkbox" name="brand[]" value="Lenovo"> Lenovo</label>
          <button type="button" class="search-filter__more">Xem thêm</button>
        </div>

        <div class="search-filter__group">
          <p class="search-filter__heading">Khoảng giá</p>
          <input type="number" class="search-filter__input" name="min_price" placeholder="MIN">
          <span class="search-filter__dash">-</span>
          <input type="number" class="search-filter__input" name="max_price" placeholder="MAX">
          <button class="search-filter__btn" type="submit">Áp dụng</button>
        </div>

        <div class="search-filter__group">
          <p class="search-filter__heading">Đánh giá</p>
          <label class="search-filter__rating"><input type="radio" name="rating" value="5"> ★★★★★</label>
          <label class="search-filter__rating"><input type="radio" name="rating" value="4"> ★★★★☆</label>
          <label class="search-filter__rating"><input type="radio" name="rating" value="3"> ★★★☆☆</label>
        </div>
      </aside>

      <section class="search-result">
        <div class="search-result__header">
          <p class="search-result__count">Kết quả cho từ khóa: "<?php echo htmlspecialchars($keyword); ?>"</p>
          <div class="search-result__sort">
            <label for="sort-select" class="search-result__sort-label">Sắp xếp theo</label>
            <select id="sort-select" class="search-result__sort-select">
              <option>Giá tăng dần</option>
              <option>Giá giảm dần</option>
            </select>
          </div>
        </div>

        <div class="product__list">
          <?php if ($result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): 
              $base64Img = base64_encode($row['Anh_San_Pham1']);
              $id = $row['ID_San_Pham'];
              $discount = 0;
              if ($row['Gia_Goc'] > 0) {
                $discount = round((($row['Gia_Goc'] - $row['Gia_Ban']) / $row['Gia_Goc']) * 100);
              }
            ?>
              <a href="/datn-project/datn-project/pages/product-detail.php?id=<?php echo $id; ?>" class="product__item" data-id="<?php echo $id; ?>">
                <div class="product__img-wrap">
                  <img src="data:image/jpeg;base64,<?php echo $base64Img; ?>" alt="<?php echo $row['Ten_San_Pham']; ?>" class="product__img" />
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
            <?php endwhile; ?>
          <?php else: ?>
            <p>Không tìm thấy sản phẩm nào.</p>
          <?php endif; ?>
        </div>

        <div class="pagination">
          <?php for ($i = 1; $i <= $totalPages; $i++): ?>
            <a href="?q=<?php echo urlencode($keyword); ?>&page=<?php echo $i; ?>" class="pagination__link <?php echo $i == $page ? 'active' : ''; ?>"><?php echo $i; ?></a>
          <?php endfor; ?>
        </div>
      </section>
    </form>
  </main>

  <script>
    document.querySelectorAll('.search-filter input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        document.getElementById('searchFilterForm').submit();
      });
    });
    document.querySelectorAll('.search-filter input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        document.getElementById('searchFilterForm').submit();
      });
    });
    document.querySelectorAll('.search-filter__more').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.search-filter__group');
        group.classList.toggle('expanded');
        btn.textContent = group.classList.contains('expanded') ? 'Thu gọn' : 'Xem thêm';
      });
    });
  </script>

    <footer id="footer"></footer>
  
  <script type="module" src="../js/utils/components-loader-pages.js"></script>
  <script type="module" src="../js/pages/search.js"></script>

</body>

</html>