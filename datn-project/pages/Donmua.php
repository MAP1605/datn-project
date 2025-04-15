<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

// ✅ 1. Xử lý cập nhật trạng thái nếu là POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
  $id = intval($_POST['id']);

  $conn = new mysqli('localhost', 'root', '', 'DATN');
  if ($conn->connect_error) {
    http_response_code(500);
    echo "Lỗi kết nối CSDL";
    exit;
  }

  $sql = "UPDATE Don_Hang_Seller SET Trang_Thai_Don_Hang = 'Hoàn thành' WHERE ID_Hoa_Don = $id";
  if ($conn->query($sql)) {
    echo "success";
  } else {
    http_response_code(500);
    echo "Cập nhật thất bại";
  }
  exit; // ❗ Dừng lại sau khi xử lý POST, không render HTML
}

// ✅ 2. Nếu không phải POST thì hiển thị giao diện
$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
  die("Kết nối thất bại: " . $conn->connect_error);
}

$sql = "SELECT 
    dhs.Trang_Thai_Don_Hang,
    dhs.ID_Hoa_Don,
    nb.Ten_Cua_Hang,
    sp.Ten_San_Pham,
    sp.ID_San_Pham,
    sp.Gia_Ban,
    sp.Anh_San_Pham1,
    cthd.So_Luong,
    (sp.Gia_Ban * cthd.So_Luong) AS Thanh_Tien
FROM Don_Hang_Seller dhs
JOIN Hoa_Don hd ON dhs.ID_Hoa_Don = hd.ID_Hoa_Don
JOIN Chi_Tiet_Hoa_Don cthd ON dhs.ID_Hoa_Don = cthd.ID_Hoa_Don
JOIN San_Pham sp ON cthd.ID_San_Pham = sp.ID_San_Pham
JOIN Nguoi_Ban nb ON dhs.ID_Nguoi_Ban = nb.ID_Nguoi_Ban
WHERE hd.ID_Nguoi_Mua = $idNguoiMua
ORDER BY dhs.Thoi_Gian_Dat_Hang DESC";

$result = $conn->query($sql);

$statusMap = [
  'Chờ xác nhận' => 'choxacnhan',
  'Đang vận chuyển' => 'dangvanchuyen',
  'Chờ giao hàng' => 'chogiaohang',
  'Hoàn thành' => 'hoanthanh',
  'Đã hủy' => 'dahuy'
];
?>

<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hồ Sơ Người Dùng</title>

  <!-- CSS (main) -->
  <link rel="stylesheet" href="../css/main.css">
  <!-- CSS (font) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <!-- CSS (icon) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">


</head>

<body>

  <div id="header"></div>

  <div class="main">

    <div class="container">
      <div class="user-main user-main--Address">
      <div class="mobile-menu-toggle-wrapper">
                    <button class="mobile-menu-toggle" id="mobileMenuToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                
              
                <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
        <aside class="user-main__sidebar">
          <img src="" alt="Avatar" class="user-main__avatar">


          <nav class="user-main__nav">
            <ul class="user-main__nav-list">
              <li>
                <h2 class="user-main__nav-title">Sửa hồ sơ</h2>
              </li>
              <li><a class="user-main__nav-link" href="../pages/Giaodiennguoidung.php">Hồ sơ</a></li>
              <li><a class="user-main__nav-link" href="../pages/DiachiUse.php">Địa chỉ</a></li>
              <li><a class="user-main__nav-link" href="../pages/doimatkhau.php">Đổi mật khẩu</a></li>
              <li><a class="user-main__nav-link Select-screen-function" href="Donmua.php">Đơn mua</a></li>

            </ul>
          </nav>
        </aside>
        <main class="content">
          <div class="user-orders">
            <div class="user-orders__tabs" role="tablist">
              <button class="user-orders__tab-btn user-orders__tab-btn--active" data-tab="all">Tất cả</button>
              <button class="user-orders__tab-btn" data-tab="choxacnhan">Chờ xác nhận</button>
              <button class="user-orders__tab-btn" data-tab="dangvanchuyen">Đang vận chuyển</button>
              <button class="user-orders__tab-btn" data-tab="Chogiaohang">Chờ giao hàng</button>
              <button class="user-orders__tab-btn" data-tab="hoanthanh">Đã nhận được đơn hàng</button>
              <button class="user-orders__tab-btn" data-tab="dahuy">Đã hủy</button>
            </div>

            <div class="user-orders__list">
              <?php while ($row = $result->fetch_assoc()):
                $statusKey = $statusMap[$row['Trang_Thai_Don_Hang']] ?? 'all';
              ?>
                <div class="user-orders__item" data-status="<?= $statusKey ?>">
                  <div class="user-orders__shop">
                    <div class="user-orders__shop-left">
                      <span><?= htmlspecialchars($row['Ten_Cua_Hang']) ?></span>
                      <button>Chat</button>
                      <button>Xem shop</button>
                    </div>
                    <div class="user-orders__shop-right">
                      <h4><?= htmlspecialchars($row['Trang_Thai_Don_Hang']) ?></h4>
                    </div>
                  </div>

                  <div class="user-orders__details">
                    <div class="user-orders__details-img">
                      <img src="../pages/api/get-image.php?id=<?= $row['ID_San_Pham'] ?>" alt="Ảnh" class="user-orders__details-img-1">
                    </div>
                    <div class="user-orders__product-info">
                      <p><?= htmlspecialchars($row['Ten_San_Pham']) ?></p>
                      <p>Số lượng: <?= $row['So_Luong'] ?></p>
                      <p class="user-orders__price">₫<?= number_format($row['Gia_Ban'], 0, ',', '.') ?></p>
                    </div>
                  </div>

                  <div class="user-orders__total">Thành tiền: ₫<?= number_format($row['Thanh_Tien'], 0, ',', '.') ?></div>

                  <div class="user-orders__actions">
                    <?php if ($statusKey == 'hoanthanh'): ?>
                      <button class="openModalBtn">Đánh giá</button>
                      <button>Yêu cầu trả hàng/Hoàn tiền</button>
                    <?php elseif ($statusKey == 'chogiaohang'): ?>
                      <button class="confirm-received" data-id="<?= $row['ID_Hoa_Don'] ?>">Đã nhận được hàng</button>
                    <?php elseif ($statusKey == 'dahuy'): ?>
                      <button>Mua lại</button>
                    <?php endif; ?>
                  </div>
                </div>
              <?php endwhile; ?>
            </div>
          </div>
      </div>
    </div>
  </div>

  </div>
  <div class="modal" id="reviewModal">
    <div class="modal__content">
      <span class="modal__close" id="closeModal">&times;</span>
      <h2 class="modal__title">ĐÁNH GIÁ SẢN PHẨM</h2>

      <div class="modal__product-info">
        <div class="modal__product-image">HÌNH ẢNH</div>
        <div class="modal__product-details">
          <h3 class="modal__product-name">Tên sản phẩm</h3>
          <div class="modal__rating">
            <label class="modal__rating-label">Chất lượng sản phẩm</label>
            <div class="modal__stars" id="starContainer">
              <span class="star" data-value="1">&#9733;</span>
              <span class="star" data-value="2">&#9733;</span>
              <span class="star" data-value="3">&#9733;</span>
              <span class="star" data-value="4">&#9733;</span>
              <span class="star" data-value="5">&#9733;</span>
            </div>
          </div>
        </div>
      </div>

      <textarea class="modal__textarea review-textarea"
        placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé!"></textarea>

      <div class="modal__images">
        <input type="file" id="imageInput" multiple hidden accept="image/*">
        <button class="modal__add-image" id="addImageBtn">Thêm hình ảnh</button>
        <div class="modal__preview" id="imagesPreview"></div>
      </div>

      <button class="modal__submit" id="completeBtn">Hoàn Thành</button>
    </div>
  </div>
  </div>

  <div id="footer"></div>
  <script>
        document.addEventListener("DOMContentLoaded", function() {
            const toggleBtn = document.getElementById("menuToggle");
            const sidebar = document.querySelector(".user-main__sidebar");
            const overlay = document.getElementById("mobileOverlay");

            if (toggleBtn && sidebar && overlay) {
                toggleBtn.addEventListener("click", () => {
                    sidebar.classList.toggle("active");

                });

                overlay.addEventListener("click", () => {
                    sidebar.classList.remove("active");
                    overlay.classList.remove("active");
                });
            }
        });
    </script>
  <script src="../js/components/Donmua.js"></script>
  <script type="module" src="../js/utils/components-loader-pages.js"></script>
  

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const buttons = document.querySelectorAll('.confirm-received');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          if (!id) return;

          if (confirm("Bạn xác nhận đã nhận được hàng?")) {
            fetch('/datn-project/datn-project/pages/update-status.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'id=' + encodeURIComponent(id)
              })
              .then(res => res.text())
              .then(data => {
                if (data.trim() === 'success') {
                  alert('Đã cập nhật trạng thái thành Hoàn thành!');
                  location.reload();
                } else {
                  alert('Có lỗi xảy ra!');
                }
              });
          }
        });
      });
    });
  </script>
 <script>
       document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const sidebar = document.querySelector(".user-main__nav");
  const overlay = document.getElementById("mobileMenuOverlay");

  if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
});
    </script>
    <script src="/datn-project/datn-project/js/components/Giaodiennguoidung.js"></script>
</body>

</html>