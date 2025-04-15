<?php
session_start();
$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
  die("Kết nối lỗi: " . $conn->connect_error);
}

$sql = "SELECT * FROM Dia_Chi_Nhan_Hang WHERE ID_Nguoi_Mua = $idNguoiMua";
$result = $conn->query($sql);
?>


<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ho so nguoi dung</title>
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

  <div id="header">


  </div>
  <div class="container">
      
    <div class="main">


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
              <li><a class="user-main__nav-link Select-screen-function" href="../pages/DiachiUse.php">Địa chỉ</a></li>
              <li><a class="user-main__nav-link" href="../pages/doimatkhau.php">Đổi mật khẩu</a></li>
              <li><a class="user-main__nav-link" href="../pages/Donmua.php">Đơn mua</a></li>

            </ul>
          </nav>
        </aside>
        <main class="content">
          <!-- Khối chứa tiêu đề và nút thêm -->
          <div class="from-use" id="address-container">
            <div class="from-use__tabs">
              <h2>Địa chỉ của tôi</h2>
              <button id="openModalBtn">Thêm địa chỉ</button>
            </div>
          </div>

          <!-- Hiển thị danh sách địa chỉ lấy từ CSDL -->
          <?php if ($result->num_rows > 0): ?>
            <div class="address-list">
              <?php while ($row = $result->fetch_assoc()): ?>
                <form class="ModelInfo">
                  <p><strong>Địa chỉ nhà:</strong> <?= htmlspecialchars($row['Dia_Chi']) ?>,
                    <?= htmlspecialchars($row['Phuong_Xa']) ?>,
                    <?= htmlspecialchars($row['Quan_Huyen']) ?>,
                    <?= htmlspecialchars($row['Tinh_Thanh_Pho']) ?>
                  </p>
                  <p><strong>Tên:</strong> <?= htmlspecialchars($row['Ho_Va_Ten']) ?></p>
                  <p><strong>Email:</strong> <?= htmlspecialchars($row['Email']) ?></p>
                  <p><strong>Số điện thoại:</strong> <?= htmlspecialchars($row['So_Dien_Thoai']) ?></p>
                </form>
              <?php endwhile; ?>
            </div>
          <?php else: ?>
            <p class="address-empty">Bạn chưa có địa chỉ nào</p>
          <?php endif; ?>
        </main>
      </div>
    </div>
  </div>
  <!-- modal-->

  <div id="storeOwnerModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="document.getElementById('storeOwnerModal').style.display='none'">&times;</span>
      <div class="modal-header">
        <h3>Thêm địa chỉ</h3>
      </div>

      <!-- ✅ Gộp form bọc cả body + footer -->
      <form class="modal-from" method="POST" id="addressForm" action="../pages/api/them-diachi.php">
        <div class="modal-body">
          <label for="province">Tỉnh / Thành phố</label>
          <select id="province" name="province" required>
            <option value="">-- Chọn Tỉnh / Thành phố --</option>
          </select>

          <label for="district">Quận / Huyện</label>
          <select id="district" name="district" required>
            <option value="">-- Chọn Quận / Huyện --</option>
          </select>

          <label for="ward">Phường / Xã</label>
          <select id="ward" name="ward" required>
            <option value="">-- Chọn Phường / Xã --</option>
          </select>

          <label>Địa chỉ cụ thể</label>
          <input type="text" name="diachicuthe" id="diachicuthe" placeholder="Nhập địa chỉ cụ thể" required>

          <label>Tên</label>
          <input type="text" name="Ten" id="Ten" placeholder="Nhập tên" required>

          <label>Email</label>
          <input type="email" name="Email" id="Email" placeholder="Nhập email" required>

          <label>Số Điện Thoại</label>
          <input type="text" name="SDT" id="SDT" placeholder="Nhập số điện thoại" required>
        </div>

        <!-- ✅ Nút nằm bên trong form -->
        <div class="modal-footer">
          <button type="submit" name="submit_address" class="Themdiachi">Thêm địa chỉ</button>
        </div>
      </form>
    </div>
  </div>


  <div class="alert" id="alertBox"></div>
  <div id="alert" class="alert-message"></div>
  <div id="footer"> </div>
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
  <script type="module" src="../js/utils/components-loader-pages.js"></script>

</body>

</html>


<?php if (basename($_SERVER['PHP_SELF']) === 'DiachiUse.php'): ?>
  <script src="../js/components/diachi.js"></script>
<?php endif; ?>