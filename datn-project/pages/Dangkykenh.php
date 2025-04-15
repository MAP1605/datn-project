<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
  die("❌ Lỗi kết nối CSDL: " . $conn->connect_error);
}

// 1. Kiểm tra đăng nhập
if (!isset($_SESSION['ID_Nguoi_Mua'])) {
  header('Location: dangnhap.php');
  exit;
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'];
$currentPage = basename($_SERVER['PHP_SELF']);

// 2. Xử lý đăng ký nếu có POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $shop_name = trim($_POST['shop_name']);
  $shop_address = trim($_POST['shop_address']);
  $cccd = trim($_POST['cccd']);
  $phone = trim($_POST['phone']);
  $email = trim($_POST['email']);

  if (empty($shop_name) || empty($shop_address) || empty($cccd) || empty($phone) || empty($email)) {
    echo "<script>alert('Vui lòng nhập đầy đủ thông tin!');</script>";
  } else {
    $stmtCheck = $conn->prepare("SELECT * FROM Duyet_Nguoi_Mua WHERE ID_Nguoi_Mua = ?");
    $stmtCheck->bind_param("i", $idNguoiMua);
    $stmtCheck->execute();
    $check = $stmtCheck->get_result();

    if ($check->num_rows > 0) {
      echo "<script>alert('Bạn đã gửi đăng ký trước đó!');</script>";
    } else {
      $stmtInsert = $conn->prepare("
                INSERT INTO Duyet_Nguoi_Mua 
                (ID_Nguoi_Mua, Ten_Shop, Dia_Chi_Lay_Hang, CCCD, Trang_Thai, Ngay_Gui_Duyet, Role)
                VALUES (?, ?, ?, ?, 'Chờ duyệt', NOW(), 2)
            ");
      $stmtInsert->bind_param("isss", $idNguoiMua, $shop_name, $shop_address, $cccd);

      if ($stmtInsert->execute()) {
        echo "<script>alert('Đăng ký thành công! Vui lòng chờ xét duyệt.'); window.location.href='../index.php';</script>";
        exit;
      } else {
        echo "<script>alert('Lỗi khi lưu đăng ký: " . $conn->error . "');</script>";
      }
    }
  }
}

// 3. Kiểm tra trạng thái đăng ký nếu không phải POST
$stmtCheck = $conn->prepare("SELECT * FROM Duyet_Nguoi_Mua WHERE ID_Nguoi_Mua = ?");
$stmtCheck->bind_param("i", $idNguoiMua);
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();
$rowDuyet = $resultCheck->fetch_assoc();

// ❗Chưa từng đăng ký → về trang đăng ký (trừ chính trang đăng ký)
if (!$rowDuyet && $currentPage !== 'Dangkykenh.php') {
  header('Location: Dangkykenh.php');
  exit;
}

$trangThai = $rowDuyet['Trang_Thai'] ?? '';

if ($trangThai === 'Đã duyệt') {
  $stmtBan = $conn->prepare("SELECT * FROM Nguoi_Ban WHERE ID_Nguoi_Mua = ? AND Trang_Thai = 'Banned'");
  $stmtBan->bind_param("i", $idNguoiMua);
  $stmtBan->execute();
  $banResult = $stmtBan->get_result();

  if ($banResult->num_rows > 0) {
    echo "<script>
        alert('Tài khoản của bạn đã bị cấm. Không thể vào kênh người bán.');
        window.location.href = '../index.php';
        </script>";
    exit;
  }

  // ✅ Nếu được duyệt và không bị banned → CHO VÀO
  header('Location: KenhNguoiBan.php');
  exit;
} elseif ($trangThai === 'Chờ duyệt') {
  echo "<script>
    alert('Tài khoản đang chờ duyệt. Vui lòng quay lại sau!');
    window.location.href = '../index.php';
    </script>";
  exit;
} elseif ($trangThai === 'Hủy duyệt') {
  echo "<script>
  alert('Yêu cầu đăng ký kênh của bạn đã bị từ chối.');
  window.location.href = '../index.php';
  </script>";
  exit;
}

// 4. Lấy email + sdt
$stmt2 = $conn->prepare("SELECT Email, So_Dien_Thoai FROM Người_Mua WHERE ID_Nguoi_Mua = ?");
$stmt2->bind_param("i", $idNguoiMua);
$stmt2->execute();
$info = $stmt2->get_result()->fetch_assoc();

$email = $info['Email'] ?? '';
$sdt = $info['So_Dien_Thoai'] ?? '';
?>

<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kênh người bán</title>
  <link rel="stylesheet" href="../css/main.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>

<body>
  <div id="header"></div>
  <main>
    <div class="container">
      <form class="seller-register__form" method="POST">
        <div class="seller-register__form-box">
          <h2 class="seller-register__title">Đăng ký người bán</h2>

          <div class="seller-register__form-group">
            <label for="shop-name" class="seller-register__label">
              <span class="seller-register__label--required">*</span> Tên Shop
            </label>
            <input type="text" id="shop-name" name="shop_name" class="seller-register__input" placeholder="Nhập tên shop" required />
          </div>

          <div class="seller-register__form-group">
            <label for="shop-address" class="seller-register__label">
              <span class="seller-register__label--required">*</span> Địa chỉ lấy hàng
            </label>
            <input type="text" id="shop-address" name="shop_address" class="seller-register__input" placeholder="Nhập địa chỉ" required />
          </div>

          <div class="seller-register__form-group">
            <label for="shop-email" class="seller-register__label">
              <span class="seller-register__label--required">*</span> Email
            </label>
            <input type="email" id="shop-email" name="email" class="seller-register__input" value="<?= htmlspecialchars($email) ?>" readonly />
          </div>

          <div class="seller-register__form-group">
            <label for="shop-cccd" class="seller-register__label">
              <span class="seller-register__label--required">*</span> Số CCCD
            </label>
            <input type="text" id="shop-cccd" name="cccd" class="seller-register__input" placeholder="Nhập số CCCD" required />
          </div>

          <div class="seller-register__form-group">
            <label for="shop-phone" class="seller-register__label">
              <span class="seller-register__label--required">*</span> Số điện thoại
            </label>
            <input type="text" id="shop-phone" name="phone" class="seller-register__input" value="<?= htmlspecialchars($sdt) ?>" readonly />
          </div>

          <div class="seller-register__button-group">
            <button type="submit" class="seller-register__button seller-register__button--next">Đăng ký</button>
          </div>
        </div>
      </form>
    </div>
  </main>
  <div id="footer"></div>
  <script type="module" src="../js/utils/components-loader-pages.js"></script>
  <script type="module" src="../js/components/Dangkykenh.js"></script>
</body>

</html>