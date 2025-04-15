<?php

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

// 2. Kiểm tra đã từng gửi đăng ký chưa
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

// 3. Nếu đã duyệt → tiếp tục kiểm tra bị Banned
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
    return;
}

// 4. Chờ duyệt
if ($trangThai === 'Chờ duyệt') {
    echo "<script>
    alert('Tài khoản đang chờ duyệt. Vui lòng quay lại sau!');
    window.location.href = '../index.php';
  </script>";
    exit;
}
