<?php
session_start();

// Kết nối CSDL
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'DATN';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  die("❌ Kết nối thất bại: " . $conn->connect_error);
}

$thongbao = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = trim($_POST['email']);
  $matkhau = trim($_POST['password']);

  if (empty($input) || empty($matkhau)) {
    $thongbao = 'Vui lòng nhập đầy đủ thông tin.';
  } else {
    $query = "
      SELECT * FROM Người_Mua 
      WHERE Email = ? OR So_Dien_Thoai = ? OR Ten_Dang_Nhap = ?
      LIMIT 1
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('sss', $input, $input, $input);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($user = $result->fetch_assoc()) {
      $matkhauTrongDB = $user['Mat_Khau'];

      // Nếu mật khẩu đã mã hóa bằng password_hash
      if (password_verify($matkhau, $matkhauTrongDB)) {
        $_SESSION['ID_Nguoi_Mua'] = $user['ID_Nguoi_Mua'];
        // lấy tên người dúng đang sai 
        $_SESSION['Ten_Dang_Nhap'] = $row['Ten_Dang_Nhap']; // hoặc Ho_Va_Ten

        
        header('Location: ../index.php');
        exit;
      }

      // Nếu là plain-text (tạm thời hỗ trợ khi chưa mã hóa)
      if ($matkhau === $matkhauTrongDB) {
        $_SESSION['ID_Nguoi_Mua'] = $user['ID_Nguoi_Mua'];
        // lấy tên người dúng đang sai 
        $_SESSION['Ten_Dang_Nhap'] = $row['Ten_Dang_Nhap']; // hoặc Ho_Va_Ten     


        header('Location: ../index.php');
        exit;
      }

      $thongbao = 'Mật khẩu không chính xác.';
    } else {
      $thongbao = 'Tài khoản không tồn tại.';
    }
  }
  
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../css/main.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <title>Đăng nhập</title>
</head>

<body>
  <div id="header"></div>

  <main>
    <div class="container">
      <form class="login login--form" method="POST">
        <div class="login__wrapper">
          <div class="login__form">
            <div class="login__form-box">
              <h2 class="login__title">Đăng nhập</h2>

              <?php if (!empty($thongbao)): ?>
                <p style="color: red; font-weight: bold;"><?= $thongbao ?></p>
              <?php endif; ?>

              <input type="text" name="email" placeholder="Email/SĐT/Tên đăng nhập" class="login__input login__input--email" />
              <input type="password" name="password" placeholder="Nhập mật khẩu" class="login__input login__input--password" />
              <button type="submit" class="login__button login__button--submit">ĐĂNG NHẬP</button>
         
              <p class="login__terms">
                Bằng việc đăng nhập, bạn đã đồng ý với Shopee về
                <a href="#" class="login__link">Điều khoản dịch vụ</a> &
                <a href="#" class="login__link">Chính sách bảo mật</a>
              </p>

              <p class="login__register-link">
                Bạn chưa có tài khoản?
                <a href="dangky.php" class="login__link">Đăng ký</a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>

  <div id="footer"></div>

  <script type="module" src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>
  <script type="module" src="/datn-project/datn-project/js/components/dangnhap.js"></script>

</body>

</html>