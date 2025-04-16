<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối với CSDL
$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Giả sử người dùng đã đăng nhập và có ID trong session
$user_id = $_SESSION['ID_Nguoi_Mua'];

// Lấy thông tin người dùng từ CSDL
$sql = "SELECT * FROM Người_Mua WHERE ID_Nguoi_Mua = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Kiểm tra xem người dùng có tồn tại không
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    echo "Không tìm thấy thông tin người dùng.";
}

// Xử lý form khi người dùng nhấn "Lưu"
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Gán dữ liệu từ form
    $ho_ten = $_POST['ho_ten'] ?? '';
    $email = $_POST['email'] ?? '';
    $so_dien_thoai = $_POST['so_dien_thoai'] ?? '';
    $gioi_tinh = $_POST['gender'] ?? '';
    $ngay_sinh = $_POST['ngay_sinh'] ?? '';
    // Kiểm tra có file mới được chọn không
    if (!empty($_FILES['avatar']) && $_FILES['avatar']['error'] === 0) {
        $avatarBlob = file_get_contents($_FILES['avatar']['tmp_name']);
    } else {
        $avatarBlob = $user['Anh_Nguoi_Mua'];
    }

    // Cập nhật vào DB
    $sql = "UPDATE Người_Mua 
            SET Ho_Ten = ?, Email = ?, So_Dien_Thoai = ?, Gioi_Tinh = ?, Ngay_Sinh = ?, Anh_Nguoi_Mua = ? 
            WHERE ID_Nguoi_Mua = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $ho_ten, $email, $so_dien_thoai, $gioi_tinh, $ngay_sinh, $avatarBlob, $user_id);
    $stmt->send_long_data(5, $avatarBlob); // Tham số ảnh là vị trí 5 (bắt đầu từ 0)
    $stmt->execute();
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ người dùng</title>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
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
                    <div class="mobile-overlay" id="mobileOverlay"></div>
                    <!-- Hiển thị ảnh từ CSDL -->
                    <?php
                    if (!empty($user['Anh_Nguoi_Mua'])) {
                        $mime = (new finfo(FILEINFO_MIME_TYPE))->buffer($user['Anh_Nguoi_Mua']);
                        if (strpos($mime, 'image/') !== 0) $mime = 'image/jpeg';
                        $base64 = base64_encode($user['Anh_Nguoi_Mua']);
                        echo '<img src="data:' . $mime . ';base64,' . $base64 . '" alt="Avatar" class="user-main__avatar">';
                    } else {
                        echo '<img src="../assets/images/Anh_Khoi_Tao/datn-project/assets/images/Anh_Khoi_Tao/avatar_trang_1_cd729c335b.jpg" alt="Avatar" class="user-main__avatar">';
                    }
                    ?>

                    <nav class="user-main__nav">
                        <ul class="user-main__nav-list">
                            <li>
                                <h2 class="user-main__nav-title">Sửa hồ sơ</h2>
                            </li>
                            <li><a class="user-main__nav-link Select-screen-function" href="../pages/Giaodiennguoidung.php">Hồ sơ</a></li>
                            <li><a class="user-main__nav-link" href="../pages/DiachiUse.php">Địa chỉ</a></li>
                            <li><a class="user-main__nav-link" href="../pages/doimatkhau.php">Đổi mật khẩu</a></li>
                            <li><a class="user-main__nav-link" href="../pages/Donmua.php">Đơn mua</a></li>
                        </ul>
                    </nav>
                </aside>

                <main class="content">
                    <div class="profile">
                        <form class="profile__form" method="POST" action="Giaodiennguoidung.php" enctype="multipart/form-data">
                            <h2 class="profile__heading">Hồ sơ của tôi</h2>

                            <!-- Các input khác -->
                            <label class="profile__label">Tên đăng nhập</label>
                            <input class="profile__input" type="text" value="<?= htmlspecialchars($user['Ten_Dang_Nhap']) ?>" readonly>

                            <label class="profile__label">Tên</label>
                            <input class="profile__input" type="text" name="ho_ten" value="<?= htmlspecialchars($user['Ho_Ten']) ?>">

                            <label class="profile__label">Email</label>
                            <input class="profile__input" type="email" name="email" value="<?= htmlspecialchars($user['Email']) ?>">

                            <label class="profile__label">Số điện thoại</label>
                            <input class="profile__input" type="tel" name="so_dien_thoai" value="<?= htmlspecialchars($user['So_Dien_Thoai']) ?>" readonly>

                            <div class="profile__gender">
                                <label class="profile__label">Giới tính</label>
                                <input type="radio" name="gender" value="Nam" <?= $user['Gioi_Tinh'] == 'Nam' ? 'checked' : '' ?>> Nam
                                <input type="radio" name="gender" value="Nữ" <?= $user['Gioi_Tinh'] == 'Nữ' ? 'checked' : '' ?>> Nữ
                                <input type="radio" name="gender" value="Khác" <?= $user['Gioi_Tinh'] == 'Khác' ? 'checked' : '' ?>> Khác
                            </div>

                            <label class="profile__label">Ngày sinh</label>
                            <input class="profile__input" type="date" name="ngay_sinh" value="<?= htmlspecialchars($user['Ngay_Sinh']) ?>">

                            <!-- 👇 CHUYỂN phần ảnh vào trong form -->
                            <label class="profile__label">Ảnh đại diện</label>
                            <div class="profile__image-section">
                                <?php
                                if (!empty($user['Anh_Nguoi_Mua'])) {
                                    $finfo = new finfo(FILEINFO_MIME_TYPE);
                                    $mime = $finfo->buffer($user['Anh_Nguoi_Mua']);
                                    if (strpos($mime, 'image/') !== 0) $mime = 'image/jpeg';

                                    $base64Img = base64_encode($user['Anh_Nguoi_Mua']);
                                    echo '<img src="data:' . $mime . ';base64,' . $base64Img . '" alt="Ảnh đại diện" class="profile__avatar" id="avatarPreview">';
                                } else {
                                    echo '<img src="../assets/images/Anh_Khoi_Tao/datn-project/assets/images/Anh_Khoi_Tao/avatar_trang_1_cd729c335b.jpg" alt="Ảnh đại diện" class="profile__avatar" id="avatarPreview">';
                                }
                                ?>

                                <button type="button" class="profile__choose-btn" id="chooseBtn">Chọn ảnh</button>
                                <input type="file" name="avatar" id="imageInput" accept="image/*" hidden>
                            </div>

                            <!-- Nút lưu -->
                            <div class="profile__buttonsave">
                                <button type="submit" class="profile__submit">Lưu</button>
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
    <script type="module" src="../js/utils/components-loader-pages.js?v=<?= time() ?>"></script>
    <script  src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>

</body>

</html>