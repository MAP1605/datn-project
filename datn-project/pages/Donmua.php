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

// ✅ ẢNH ĐẠI DIỆN NGƯỜI DÙNG
$user = null;
$sqlUser = "SELECT Anh_Nguoi_Mua FROM Người_Mua WHERE ID_Nguoi_Mua = ?";
$stmtUser = $conn->prepare($sqlUser);
$stmtUser->bind_param("i", $idNguoiMua);
$stmtUser->execute();
$resultUser = $stmtUser->get_result();
$user = $resultUser->fetch_assoc();


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
        <aside class="user-main__sidebar">
          <?php
          if (!empty($user['Anh_Nguoi_Mua'])) {
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mime = $finfo->buffer($user['Anh_Nguoi_Mua']);
            if (strpos($mime, 'image/') !== 0) $mime = 'image/jpeg';
            $base64 = base64_encode($user['Anh_Nguoi_Mua']);
            echo '<img src="data:' . $mime . ';base64,' . $base64 . '" alt="Avatar" class="user-main__avatar">';
          } else {
            echo '<img src="../assets/images/Phanthedung/song.jpg" alt="Avatar" class="user-main__avatar">';
          }
          ?>
          <nav class="user-main__nav">
            <ul class="user-main__nav-list">
              <li>
                <h2 class="user-main__nav-title">Sửa hồ sơ</h2>
              </li>
              <li><a class="user-main__nav-link" href="../pages/Giaodiennguoidung.php">Hồ sơ</a></li>
              <li><a class="user-main__nav-link" href="../pages/DiachiUse.php">Địa chỉ</a></li>
              <li><a class="user-main__nav-link" href="../pages/doimatkhau.php">Đổi mật khẩu</a></li>
              <li><a class="user-main__nav-link Select-screen-function" href="../pages/Donmua.php">Đơn mua</a></li>

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

                // Kiểm tra sản phẩm này đã được người dùng đánh giá chưa
                $idSanPham = $row['ID_San_Pham'];
                $isReviewed = false;
                $sqlCheckReview = "SELECT 1 FROM Danh_Gia_San_Pham 
                     WHERE ID_Nguoi_Mua = $idNguoiMua 
                     AND ID_San_Pham = $idSanPham LIMIT 1";
                $resultCheck = $conn->query($sqlCheckReview);
                if ($resultCheck && $resultCheck->num_rows > 0) {
                  $isReviewed = true;
                }
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
                      <?php if ($isReviewed): ?>
                        <button disabled style="background-color: #ccc; cursor: not-allowed;">Đã đánh giá</button>
                      <?php else: ?>
                        <button class="openModalBtn"
                          data-id="<?= $row['ID_San_Pham'] ?>"
                          data-name="<?= htmlspecialchars($row['Ten_San_Pham']) ?>"
                          data-img="../pages/api/get-image.php?id=<?= $row['ID_San_Pham'] ?>"
                          data-qty="<?= $row['So_Luong'] ?>"
                          data-price="<?= $row['Gia_Ban'] ?>"
                          data-total="<?= $row['Thanh_Tien'] ?>">
                          Đánh giá
                        </button>
                      <?php endif; ?>
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

  <!-- Modal Chi tiết đơn hàng -->
  <div class="modal" id="orderDetailModal">

    <div class="modal__content order-detail-modal">
      <span class="modal__close" id="closeOrderDetail">&times;</span>
      <h2 class="modal__title">Chi tiết đơn hàng</h2>
      <div class="order-detail__info">
        <div class="order-detail__image">
          <img src="../assets/images/Phanthedung/images (2).jpg" alt="Ảnh sản phẩm">
        </div>
        <div class="order-detail__text">
          <p><strong>Tên sản phẩm:</strong> Áo thun PEARNK</p>
          <p><strong>Số lượng:</strong> 2</p>
          <p><strong>Giá:</strong> <span class="price">200.000đ</span></p>
          <p><strong>Thành tiền:</strong> <span class="total">400.000đ</span></p>
          <hr>
          <p><strong>Tên người nhận:</strong> Nguyễn Văn A</p>
          <p><strong>Số điện thoại:</strong> 0987654321</p>
          <p><strong>Địa chỉ:</strong> 123 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội</p>
          <p><strong>Phí vận chuyển:</strong> <span class="price">25.000đ</span></p>
          <p><strong>Phương thức thanh toán:</strong> <span class="label">Thanh toán khi nhận hàng</span></p>
          <p><strong>Ngày đặt:</strong> <span class="label">10/04/2025</span></p>
          <p><strong>Trạng thái:</strong> <span class="label">Hoàn thành</span></p>
          <p><strong>Shop:</strong> <span class="label">PEARNK Store</span></p>
        </div>
      </div>
    </div>
  </div>

  </div>
  <div class="modal" id="reviewModal">
    <div class="modal__content">
      <span class="modal__close" id="closeModal">&times;</span>
      <h2 class="modal__title">ĐÁNH GIÁ SẢN PHẨM</h2>
      <input type="hidden" id="reviewProductId" />

      <div class="modal__product-info">
        <div class="modal__product-image">
          <img id="review-image" src="" alt="" style="max-width: 100px;" />
        </div>
        <div class="modal__product-details">
          <h3 class="modal__product-name" id="review-name">Tên sản phẩm</h3>
          <p>Giá: <span id="review-price"></span></p>
          <p>Số lượng: <span id="review-qty"></span></p>
          <p>Thành tiền: <span id="review-total"></span></p>
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
  <script src="../js/components/Donmua.js?v=<?= time() ?>"></script>

  <script type="module" src="../js/utils/components-loader-pages.js"></script>
  <script src="../js/components/Giaodiennguoidung.js"></script>

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

</body>

</html>