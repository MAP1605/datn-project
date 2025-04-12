<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$keyword = $_GET['q'] ?? '';
$min_price = intval($_GET['min_price'] ?? 0);
$max_price = intval($_GET['max_price'] ?? 1000000000);
$rating = intval($_GET['rating'] ?? 0);
$location = $_GET['location'] ?? '';
$sort = $_GET['sort'] ?? 'asc';
$page = intval($_GET['page'] ?? 1);
$limit = 20;
$offset = ($page - 1) * $limit;

if ($min_price > $max_price) {
    [$min_price, $max_price] = [$max_price, $min_price];
}

$bindTypes = '';
$bindValues = [];

// Luôn có 1 điều kiện tìm tên
$where = "WHERE sp.Ten_San_Pham LIKE ?";
$bindTypes .= 's';
$bindValues[] = '%' . $keyword . '%';

// Lọc giá
if ($min_price || $max_price < 1000000000) {
  $where .= " AND sp.Gia_Ban BETWEEN ? AND ?";
  $bindTypes .= 'ii'; 
  $bindValues[] = $min_price;
  $bindValues[] = $max_price;
}

// Lọc địa chỉ người bán (join bảng Nguoi_Ban)
if (!empty($location)) {
  $where .= " AND nb.Dia_Chi LIKE ?";
  $bindTypes .= 's';
  $bindValues[] = '%' . $location . '%';
}

// Lọc sao
if ($rating > 0) {
  $where .= " AND sp.So_Sao_Danh_Gia >= ?";
  $bindTypes .= 'i';
  $bindValues[] = $rating;
}

// SQL có JOIN
$sql = "SELECT sp.* FROM San_Pham sp 
        JOIN Nguoi_Ban nb ON sp.ID_Nguoi_Ban = nb.ID_Nguoi_Ban 
        $where 
        ORDER BY sp.Gia_Ban " . ($sort === 'desc' ? 'DESC' : 'ASC') . 
        " LIMIT $limit OFFSET $offset";

$stmt = $conn->prepare($sql);
$stmt->bind_param($bindTypes, ...$bindValues);
$stmt->execute();
$result = $stmt->get_result();

// Đếm tổng
$countSql = "SELECT COUNT(*) FROM San_Pham sp 
             JOIN Nguoi_Ban nb ON sp.ID_Nguoi_Ban = nb.ID_Nguoi_Ban 
             $where";

$stmtCount = $conn->prepare($countSql);
$stmtCount->bind_param($bindTypes, ...$bindValues);
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
        <p class="search-filter__heading">Nơi bán</p>
        <label class="search-filter__checkbox">
          <input type="radio" name="location" value="Hà Nội" <?= $location == 'Hà Nội' ? 'checked' : '' ?>> Hà Nội
        </label>
        <label class="search-filter__checkbox">
          <input type="radio" name="location" value="Hồ Chí Minh" <?= $location == 'Hồ Chí Minh' ? 'checked' : '' ?>> Hồ Chí Minh
        </label>
        <label class="search-filter__checkbox">
          <input type="radio" name="location" value="Thái Bình" <?= $location == 'Thái Bình' ? 'checked' : '' ?>> Thái Bình
        </label>
        <button type="button" class="search-filter__more">Xem thêm</button>
      </div>

      <div class="search-filter__group">
        <p class="search-filter__heading">Khoảng giá</p>
        <input type="number" class="search-filter__input" name="min_price" placeholder="MIN" value="<?= $min_price ?>">
        <span class="search-filter__dash">-</span>
        <input type="number" class="search-filter__input" name="max_price" placeholder="MAX" value="<?= $max_price ?>">
        <button class="search-filter__btn" type="submit">Áp dụng</button>
      </div>

      <div class="search-filter__group">
        <p class="search-filter__heading">Đánh giá</p>
        <label class="search-filter__rating">
          <input type="radio" name="rating" value="5" <?= $rating == 5 ? 'checked' : '' ?>> ★★★★★
        </label>
        <label class="search-filter__rating">
          <input type="radio" name="rating" value="4" <?= $rating == 4 ? 'checked' : '' ?>> ★★★★☆
        </label>
        <label class="search-filter__rating">
          <input type="radio" name="rating" value="3" <?= $rating == 3 ? 'checked' : '' ?>> ★★★☆☆
        </label>
        <label class="search-filter__rating">
          <input type="radio" name="rating" value="2" <?= $rating == 2 ? 'checked' : '' ?>> ★★☆☆☆
        </label>
        <label class="search-filter__rating">
          <input type="radio" name="rating" value="1" <?= $rating == 1 ? 'checked' : '' ?>> ★☆☆☆☆
        </label>
      </div>
    </aside>

    <section class="search-result">
      <div class="search-result__header">
        <p class="search-result__count">Kết quả cho từ khóa: "<?= htmlspecialchars($keyword) ?>"</p>
        <div class="search-result__sort">
          <label for="sort-select" class="search-result__sort-label">Sắp xếp theo</label>
          <select id="sort-select" name="sort" class="search-result__sort-select" onchange="this.form.submit()">
            <option value="asc" <?= $sort === 'asc' ? 'selected' : '' ?>>Giá tăng dần</option>
            <option value="desc" <?= $sort === 'desc' ? 'selected' : '' ?>>Giá giảm dần</option>
          </select>
        </div>
      </div>

      <div class="search__list">
        <?php if ($result->num_rows > 0): ?>
          <?php while ($row = $result->fetch_assoc()):
            $base64Img = base64_encode($row['Anh_San_Pham1']);
            $id = $row['ID_San_Pham'];
            $discount = 0;
            if ($row['Gia_Goc'] > 0) {
              $discount = round((($row['Gia_Goc'] - $row['Gia_Ban']) / $row['Gia_Goc']) * 100);
            }
          ?>
            <a href="/datn-project/datn-project/pages/product-detail.php?id=<?= $id ?>" class="search__item" data-id="<?= $id ?>">
              <div class="search__img-wrap">
                <img src="data:image/jpeg;base64,<?= $base64Img ?>" alt="<?= $row['Ten_San_Pham'] ?>" class="search__img" />
                <?php if ($discount > 0): ?>
                  <span class="search__discount-tag">-<?= $discount ?>%</span>
                <?php endif; ?>
              </div>
              <h3 class="search__name"><?= $row['Ten_San_Pham'] ?></h3>
              <div class="search__price-wrap">
                <span class="search__price"><?= number_format($row['Gia_Ban'], 0, ',', '.') ?>đ</span>
                <span class="search__price-old"><?= number_format($row['Gia_Goc'], 0, ',', '.') ?>đ</span>
              </div>
              <div class="search__meta">
                <span class="search__stars">⭐ <?= $row['So_Sao_Danh_Gia'] ?></span>
                <span class="search__sold">Đã bán <?= $row['Da_Ban'] ?></span>
              </div>
            </a>
          <?php endwhile; ?>
        <?php else: ?>
          <p>Không tìm thấy sản phẩm nào.</p>
        <?php endif; ?>
      </div>

      <?php
      $query = http_build_query([
        'q' => $keyword,
        'min_price' => $min_price,
        'max_price' => $max_price,
        'rating' => $rating,
        'location' => $location,
        'sort' => $sort
      ]);
      ?>
      <div class="pagination">
        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
          <a href="?<?= $query ?>&page=<?= $i ?>" class="pagination__link <?= $i == $page ? 'active' : '' ?>">
            <?= $i ?>
          </a>
        <?php endfor; ?>
      </div>
    </section>
  </form>
</main>

<script>
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

  <script type="module" src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>
  <!-- <script type="module" src="/datn-project/datn-project/js/pages/search.js"></script> -->

</body>

</html>