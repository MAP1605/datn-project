<?php
session_start();
include '../connect.php';

// Kiểm tra đăng nhập
if (!isset($_SESSION['ID_Nguoi_Mua'])) {
    header("Location: dangnhap.php");
    exit;
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'];

// Kiểm tra người mua đã có trong bảng Người Bán chưa
$stmt = $conn->prepare("SELECT ID_Nguoi_Ban FROM Nguoi_Ban WHERE ID_Nguoi_Mua = ?");
$stmt->bind_param("i", $idNguoiMua);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Đã là người bán
    header("Location: KenhNguoiBan.html");
} else {
    // Chưa đăng ký kênh người bán
    header("Location: Dangkykenh.html");
}
exit;
