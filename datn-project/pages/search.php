<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli('localhost', 'root', '', 'datn');
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$category_id = intval($_GET['category_id'] ?? 0);

$keyword = trim($_GET['q'] ?? '');
$min_price = $_GET['min_price'] ?? '';
$max_price = $_GET['max_price'] ?? '';
$rating = intval($_GET['rating'] ?? 0);
$location = $_GET['location'] ?? '';
$sort = $_GET['sort'] ?? 'asc';
$page = intval($_GET['page'] ?? 1);
$limit = 20;
$offset = ($page - 1) * $limit;

$bindTypes = '';
$bindValues = [];
$where = "WHERE 1";

// 1. Tìm theo tên
if ($keyword !== '') {
    $where .= " AND LOWER(sp.Ten_San_Pham) LIKE LOWER(?)";
    $bindTypes .= 's';
    $bindValues[] = '%' . $keyword . '%';
}

if ($category_id > 0) {
    $where .= " AND sp.ID_Danh_Muc = ?";
    $bindTypes .= 'i';
    $bindValues[] = $category_id;
}


// 2. Lọc khoảng giá
if (($min_price !== '' && is_numeric($min_price)) || ($max_price !== '' && is_numeric($max_price))) {
    $min_price = intval($min_price ?: 0);
    $max_price = intval($max_price ?: 1000000000);
    if ($min_price > $max_price) {
        [$min_price, $max_price] = [$max_price, $min_price];
    }
    $where .= " AND sp.Gia_Goc BETWEEN ? AND ?";
    $bindTypes .= 'ii';
    $bindValues[] = $min_price;
    $bindValues[] = $max_price;
} else {
    $min_price = 0;
    $max_price = 0;
}

// 3. Lọc theo địa chỉ người mua đã đăng ký làm người bán
if (!empty($location)) {
    $where .= " AND dcn.Tinh_Thanh_Pho LIKE ?";
    $bindTypes .= 's';
    $bindValues[] = '%' . $location . '%';
}

// 4. Lọc số sao đánh giá
if ($rating > 0) {
  if ($rating == 5) {
    $where .= " AND sp.So_Sao_Danh_Gia = 5";
  } else {
    $where .= " AND sp.So_Sao_Danh_Gia >= ? AND sp.So_Sao_Danh_Gia < ?";
    $bindTypes .= 'ii';
    $bindValues[] = $rating;
    $bindValues[] = $rating + 1;
  }
}


$sql = "SELECT sp.* 
        FROM san_pham sp
        JOIN nguoi_ban nb ON sp.ID_Nguoi_Ban = nb.ID_Nguoi_Ban
        JOIN `người_mua` nm ON nb.ID_Nguoi_Mua = nm.ID_Nguoi_Mua
        LEFT JOIN dia_chi_nhan_hang dcn ON nm.ID_Nguoi_Mua = dcn.ID_Nguoi_Mua
        $where
        GROUP BY sp.ID_San_Pham
        ORDER BY sp.Gia_Ban " . ($sort === 'desc' ? 'DESC' : 'ASC') . 
        " LIMIT $limit OFFSET $offset";

$stmt = $conn->prepare($sql);
$stmt->bind_param($bindTypes, ...$bindValues);
$stmt->execute();
$result = $stmt->get_result();

$countSql = "SELECT COUNT(DISTINCT sp.ID_San_Pham)
             FROM san_pham sp
             JOIN nguoi_ban nb ON sp.ID_Nguoi_Ban = nb.ID_Nguoi_Ban
             JOIN `người_mua` nm ON nb.ID_Nguoi_Mua = nm.ID_Nguoi_Mua
             LEFT JOIN dia_chi_nhan_hang dcn ON nm.ID_Nguoi_Mua = dcn.ID_Nguoi_Mua
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

    <!-- GIỮ TỪ KHÓA -->
    <input type="hidden" name="q" value="<?= htmlspecialchars($keyword) ?>">
    <input type="hidden" name="category_id" value="<?= $category_id ?>">


    <aside class="search-filter">
      <h3 class="search-filter__title">Bộ lọc tìm kiếm</h3>
      <div class="search-filter__group">
  <p class="search-filter__heading">Nơi bán</p>
  <input type="text"
         id="province-input"
         name="location"
         placeholder="Nhập nơi bán..."
         list="province-list"
         class="search-filter__input"
         value="<?= htmlspecialchars($location) ?>">
            <datalist id="province-list">
              <option value="An Giang">
              <option value="Bà Rịa - Vũng Tàu">
              <option value="Bắc Giang">
              <option value="Bắc Kạn">
              <option value="Bạc Liêu">
              <option value="Bắc Ninh">
              <option value="Bến Tre">
              <option value="Bình Định">
              <option value="Bình Dương">
              <option value="Bình Phước">
              <option value="Bình Thuận">
              <option value="Cà Mau">
              <option value="Cần Thơ">
              <option value="Cao Bằng">
              <option value="Đà Nẵng">
              <option value="Đắk Lắk">
              <option value="Đắk Nông">
              <option value="Điện Biên">
              <option value="Đồng Nai">
              <option value="Đồng Tháp">
              <option value="Gia Lai">
              <option value="Hà Giang">
              <option value="Hà Nam">
              <option value="Hà Nội">
              <option value="Hà Tĩnh">
              <option value="Hải Dương">
              <option value="Hải Phòng">
              <option value="Hậu Giang">
              <option value="Hòa Bình">
              <option value="Hưng Yên">
              <option value="Khánh Hòa">
              <option value="Kiên Giang">
              <option value="Kon Tum">
              <option value="Lai Châu">
              <option value="Lâm Đồng">
              <option value="Lạng Sơn">
              <option value="Lào Cai">
              <option value="Long An">
              <option value="Nam Định">
              <option value="Nghệ An">
              <option value="Ninh Bình">
              <option value="Ninh Thuận">
              <option value="Phú Thọ">
              <option value="Phú Yên">
              <option value="Quảng Bình">
              <option value="Quảng Nam">
              <option value="Quảng Ngãi">
              <option value="Quảng Ninh">
              <option value="Quảng Trị">
              <option value="Sóc Trăng">
              <option value="Sơn La">
              <option value="Tây Ninh">
              <option value="Thái Bình">
              <option value="Thái Nguyên">
              <option value="Thanh Hóa">
              <option value="Thừa Thiên Huế">
              <option value="Tiền Giang">
              <option value="TP Hồ Chí Minh">
              <option value="Trà Vinh">
              <option value="Tuyên Quang">
              <option value="Vĩnh Long">
              <option value="Vĩnh Phúc">
              <option value="Yên Bái">
            </datalist>
          </div>

      <div class="search-filter__group">
        <p class="search-filter__heading">Khoảng giá</p>
        <input
          type="number"
          min="0"
          name="min_price"
          class="search-filter__input"
          value="<?= $min_price ?>"
          placeholder="Giá từ..."
        />
        <input
          type="number"
          min="0"
          name="max_price"
          class="search-filter__input"
          value="<?= $max_price ?>"
          placeholder="Đến..."
        />
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
        <!-- ✅ Thêm nút reset filter -->
  <button type="button" class="search-filter__reset" onclick="resetFilters()">Xoá bộ lọc</button>
      </div>
    </aside>

    <section class="search-result">
      <div class="search-result__header">
        <p class="search-result__count">
          <?php if ($category_id > 0): ?>
            Kết quả cho danh mục:
            <?php
              $cateName = $conn->query("SELECT Ten_Danh_Muc FROM danh_muc WHERE ID_Danh_Muc = $category_id")->fetch_assoc()['Ten_Danh_Muc'] ?? 'Không rõ';
              echo htmlspecialchars($cateName);
            ?>
          <?php else: ?>
            Kết quả cho từ khóa: "<?= htmlspecialchars($keyword) ?>"
          <?php endif; ?>
        </p>

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
        'sort' => $sort,
        'category_id' => $category_id
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

function resetFilters() {
  const form = document.getElementById('searchFilterForm');

  // Reset radio buttons (location + rating)
  form.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);

  // Reset price
  form.querySelector('input[name="min_price"]').value = '';
  form.querySelector('input[name="max_price"]').value = '';

  // Submit lại form giữ nguyên từ khóa
  form.submit();
}

</script>


  <footer id="footer"></footer>

  <script type="module" src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>
  <!-- <script type="module" src="/datn-project/datn-project/js/pages/search.js"></script> -->

</body>

</html>