<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'DATN';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  die("❌ Kết nối thất bại: " . $conn->connect_error);
}

$errors = [];
$success = false;

// Bắt sự kiện submit form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $phone = trim($_POST['phone']);
  $username = trim($_POST['username']);
  $email = trim($_POST['email']);
  $password = $_POST['password'];
  $repassword = $_POST['repassword'];

  // Validate
  if (empty($phone) || empty($username) || empty($email) || empty($password) || empty($repassword)) {
    $errors[] = "Vui lòng nhập đầy đủ thông tin.";
  } elseif ($password !== $repassword) {
    $errors[] = "Mật khẩu không khớp.";
  } else {
    // Mã hóa mật khẩu
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO Người_Mua (Ten_Dang_Nhap, Email, Mat_Khau, So_Dien_Thoai, Ho_Ten, Trang_Thai, Role, Ngay_Tao)
    VALUES (?, ?, ?, ?, ?, 'Hoạt động', 1, NOW())");

    $stmt->bind_param("sssss", $username, $email, $hashedPassword, $phone, $username);

    if ($stmt->execute()) {
      $success = true;
    } else {
      $errors[] = "Lỗi khi thêm tài khoản: " . $conn->error;
    }
  }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- CSS (main) -->
  <link rel="stylesheet" href="../css/main.css" />
  <!-- CSS (font) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    rel="stylesheet" />

  <!-- CSS (icon) -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <title>PEARNK-Đăng ký</title>
</head>

<body>
  <div id="header"></div>

  <main>
    <div class="container">
      <form method="POST" class="register-form">

        <!-- Hiển thị thông báo -->
        <?php if (!empty($errors)): ?>
          <div class="auth__error">
            <?php foreach ($errors as $e): ?>
              <p style="color: red;"><?= htmlspecialchars($e) ?></p>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <?php if ($success): ?>
          <div class="auth__success">
            <p style="color: green;">🎉 Đăng ký thành công!</p>
          </div>
        <?php endif; ?>

        <!-- STEP 1: Nhập số điện thoại -->
        <div class="auth-step1">
          <div class="auth__form">
            <div class="auth__form-box">
              <h2 class="auth__title">Đăng ký</h2>
              <input type="text" name="phone" placeholder="Số điện thoại" class="auth__input auth__input--phone" required />
              <button type="button" class="auth__button auth__button--next">TIẾP THEO</button>

              <p class="auth__terms">
                Bằng việc đăng ký, bạn đã đồng ý với Shopee về
                <a href="#" class="auth__link">Điều khoản dịch vụ</a> &
                <a href="#" class="auth__link">Chính sách bảo mật</a>
              </p>

              <p class="auth__login-link">
                Bạn đã có tài khoản?
                <a href="#" class="auth__link">Đăng nhập</a>
              </p>
            </div>
          </div>
        </div>

        <!-- STEP 2: Nhập thông tin tài khoản -->
        <div class="auth-step2" style="display: none;">
          <div class="register-step__form">
            <div class="register-step__form-box">
              <h2 class="register-step__title">Đăng ký</h2>
              <input type="text" name="username" placeholder="Tên đăng nhập" class="register-step__input" required />
              <input type="text" name="email" placeholder="Email" class="register-step__input" required />
              <input type="password" name="password" placeholder="Nhập mật khẩu" class="register-step__input" required />
              <input type="password" name="repassword" placeholder="Nhập lại mật khẩu" class="register-step__input" required />
              <button type="submit" class="register-step__button register-step__button--submit">ĐĂNG KÝ</button>

              <p class="register-step__terms">
                Bằng việc đăng ký, bạn đã đồng ý với Shopee về
                <a href="#" class="register-step__link">Điều khoản dịch vụ</a> &
                <a href="#" class="register-step__link">Chính sách bảo mật</a>
              </p>

              <p class="register-step__login-link">
                Bạn đã có tài khoản?
                <a href="#" class="register-step__link">Đăng nhập</a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>

  <div id="footer"></div>
  <script type="module" src="../js/utils/components-loader-pages.js"></script>
  <script type="module" src="../js/components/dangky.js"></script>
</body>

</html>