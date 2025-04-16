<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die("Lỗi kết nối CSDL: " . $conn->connect_error);
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $old = $_POST['oldPassword'] ?? '';
    $new = $_POST['newPassword'] ?? '';
    $confirm = $_POST['confirmPassword'] ?? '';

    $result = $conn->query("SELECT Mat_Khau FROM Người_Mua WHERE ID_Nguoi_Mua = $idNguoiMua");
    $user = $result->fetch_assoc();

    if (!$user || !password_verify($old, $user['Mat_Khau'])) {
        $error = "Mật khẩu cũ không đúng!";
    } elseif ($new !== $confirm) {
        $error = "Mật khẩu mới không khớp!";
    } else {
        $hashed = password_hash($new, PASSWORD_DEFAULT);
        $conn->query("UPDATE Người_Mua SET Mat_Khau = '$hashed' WHERE ID_Nguoi_Mua = $idNguoiMua");
        $success = "Đổi mật khẩu thành công!";
    }
}

?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đổi mật khẩu</title>
    <link rel="stylesheet" href="../css/main.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
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
                    <img src="" alt="Avatar" class="user-main__avatar" />
                    <nav class="user-main__nav">
                        <ul class="user-main__nav-list">
                            <li>
                                <h2 class="user-main__nav-title">Sửa hồ sơ</h2>
                            </li>
                            <li><a class="user-main__nav-link" href="../pages/Giaodiennguoidung.php">Hồ sơ</a></li>
                            <li><a class="user-main__nav-link" href="../pages/DiachiUse.php">Địa chỉ</a></li>
                            <li><a class="user-main__nav-link Select-screen-function" href="../pages/doimatkhau.php">Đổi mật khẩu</a></li>
                            <li><a class="user-main__nav-link" href="../pages/Donmua.php">Đơn mua</a></li>
                        </ul>
                    </nav>
                </aside>

                <main class="user-main__content">
                    <div class="user-main__form-wrapper">
                        <form class="profile__form" method="post">
                            <h2 class="profile__heading">Đổi mật khẩu</h2>
                            <?php if (isset($error)): ?>
                                <p style="color:red"><?= $error ?></p>
                            <?php elseif (isset($success)): ?>
                                <p style="color:green"><?= $success ?></p>
                            <?php endif; ?>
                            <label class="profile__label">Mật khẩu cũ</label>
                            <input class="profile__input" type="password" name="oldPassword" required>

                            <label class="profile__label">Mật khẩu mới</label>
                            <input class="profile__input" type="password" name="newPassword" required>

                            <label class="profile__label">Nhập lại mật khẩu</label>
                            <input class="profile__input" type="password" name="confirmPassword" required>

                            <div class="profile__button-save">
                                <button class="profile__submit" type="submit">Chấp nhận thay đổi</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    </div>
    <div id="footer"></div>
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
    <script  src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>
 
</body>

</html>